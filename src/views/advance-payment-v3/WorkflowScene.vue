<template>
  <div class="wfs" :class="{ 'wfs--compact': compact, 'wfs--no-gl': webglFailed }">
    <div v-show="!webglFailed" ref="stage" class="wfs-stage">
      <canvas ref="canvas" class="wfs-canvas" aria-hidden="true"></canvas>
    </div>
    <ol v-if="showLabels" class="wfs-labels">
      <li
        v-for="(s, i) in steps"
        :key="s.key"
        class="wfs-label"
        :class="'wfs-label--' + stateOf(i)"
        :aria-current="stateOf(i) === 'active' ? 'step' : undefined"
      >
        <span class="wfs-num">
          <svg v-if="stateOf(i) === 'done'" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10.5l3.2 3L15 6.5"/></svg>
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span class="wfs-text">
          <span class="wfs-title">{{ s.title }}</span>
          <span class="wfs-state">{{ stateText(i) }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  steps: { type: Array, required: true },
  // -1 = overview tour (highlight cycles through the steps), 0..2 = current step, 3 = all done
  activeStep: { type: Number, default: -1 },
  compact: { type: Boolean, default: false },
  showLabels: { type: Boolean, default: true }
})
const emit = defineEmits(['highlight'])

const stage = ref(null)
const canvas = ref(null)
const webglFailed = ref(false)
const tourIndex = ref(0)

const TOUR_STEP_SECONDS = 2.6

function stateOf(i) {
  if (props.activeStep < 0) return i === tourIndex.value ? 'active' : 'idle'
  if (i < props.activeStep) return 'done'
  if (i === props.activeStep) return 'active'
  return 'pending'
}
function stateText(i) {
  if (props.activeStep < 0) return props.steps[i].subtitle
  return { done: 'เสร็จแล้ว', active: 'กำลังทำ', pending: 'ยังไม่ถึง' }[stateOf(i)]
}

// ---------------------------------------------------------------- three.js
let renderer, scene, camera
let startedAt = 0
let rafId = 0
let running = false
let inView = true
let resizeObs, viewObs, motionQuery
let reducedMotion = false

const nodes = [] // { group, base, ring, icon, iconMats, pop }
let track = null // full grey path
let progress = null // coloured path up to the current step
let curve = null
const coins = []
let burst = null // { from, to, until } — fast coin run when a step completes

const VIEW_H = props.compact ? 2.1 : 2.7 // visible world height; width follows the canvas aspect
let halfW = 5
let nodeScale = 1 // shrinks the stations when the canvas is too narrow for full-size ones

function cssColor(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return new THREE.Color(v || fallback)
}
let COLORS
function readColors() {
  COLORS = {
    done: cssColor('--color-success', '#05A861'),
    active: cssColor('--color-primary-500', '#1C70F7'),
    idle: new THREE.Color('#8DB7FB'),
    pending: new THREE.Color('#CBD3E1'),
    track: new THREE.Color('#DDE3EC'),
    coin: new THREE.Color('#F5B820')
  }
}

function std(color, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.05, ...extra })
}

function buildDocIcon(accent) {
  const g = new THREE.Group()
  const mats = []
  const paper = std(0xffffff, { transparent: true })
  mats.push(paper)
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.6, 0.05), paper))
  const ink = std(accent.clone(), { transparent: true })
  mats.push(ink)
  ;[[0.3, 0.15], [0.3, 0.03], [0.2, -0.09], [0.26, -0.19]].forEach(([w, y]) => {
    const line = new THREE.Mesh(new THREE.BoxGeometry(w, 0.045, 0.02), ink)
    line.position.set(-(0.3 - w) / 2, y, 0.035)
    g.add(line)
  })
  return { group: g, mats, accentMats: [ink] }
}

function buildCoinIcon() {
  const g = new THREE.Group()
  const gold = std(COLORS.coin.clone(), { metalness: 0.35, roughness: 0.3, transparent: true })
  const geo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 36)
  ;[[0, -0.2, 0], [0.03, -0.11, 0.02], [-0.02, -0.02, -0.01], [0.02, 0.07, 0.01]].forEach(([x, y, z]) => {
    const c = new THREE.Mesh(geo, gold)
    c.position.set(x, y, z)
    g.add(c)
  })
  return { group: g, mats: [gold], accentMats: [] }
}

function buildCheckIcon(accent) {
  const g = new THREE.Group()
  const disc = std(0xffffff, { transparent: true })
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.07, 40), disc)
  face.rotation.x = Math.PI / 2
  g.add(face)
  const ink = std(accent.clone(), { transparent: true })
  const shortArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.06, 0.04), ink)
  shortArm.position.set(-0.085, -0.04, 0.05)
  shortArm.rotation.z = -0.74
  const longArm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.04), ink)
  longArm.position.set(0.065, 0.02, 0.05)
  longArm.rotation.z = 0.86
  g.add(shortArm, longArm)
  return { group: g, mats: [disc, ink], accentMats: [ink] }
}

function buildNode(i) {
  const group = new THREE.Group()

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.85, 40),
    new THREE.MeshBasicMaterial({ color: 0x0b1f44, transparent: true, opacity: 0.07, depthWrite: false })
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -0.1
  group.add(shadow)

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.18, 48), std(COLORS.pending.clone()))
  group.add(base)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.03, 10, 64),
    new THREE.MeshBasicMaterial({ color: COLORS.active.clone(), transparent: true, opacity: 0, depthWrite: false })
  )
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.02
  group.add(ring)

  const built = [buildDocIcon, buildCoinIcon, buildCheckIcon][i](COLORS.active)
  built.group.position.y = 0.66
  group.add(built.group)

  scene.add(group)
  return { group, base, ring, icon: built.group, iconMats: built.mats, accentMats: built.accentMats, pop: 0 }
}

function nodeX(i) { return (i - 1) * halfW * (2 / 3) } // centred in thirds -> lines up with a 3-column label grid

function rebuildTrack() {
  ;[track, progress].forEach(m => { if (m) { scene.remove(m); m.geometry.dispose(); m.material.dispose() } })
  track = progress = null

  const x0 = nodeX(0), x1 = nodeX(1), x2 = nodeX(2)
  curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(x0, 0, 0),
    new THREE.Vector3((x0 + x1) / 2, 0, 0.32),
    new THREE.Vector3(x1, 0, 0),
    new THREE.Vector3((x1 + x2) / 2, 0, 0.32),
    new THREE.Vector3(x2, 0, 0)
  ])
  track = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.035, 8, false), new THREE.MeshBasicMaterial({ color: COLORS.track }))
  scene.add(track)

  const [, end] = progressRange()
  if (end > 0.001) {
    const pts = []
    for (let k = 0; k <= 60; k++) pts.push(curve.getPointAt((k / 60) * end))
    const sub = new THREE.CatmullRomCurve3(pts)
    const color = props.activeStep >= 3 ? COLORS.done : props.activeStep < 0 ? COLORS.idle : COLORS.active
    progress = new THREE.Mesh(new THREE.TubeGeometry(sub, 120, 0.05, 8, false), new THREE.MeshBasicMaterial({ color }))
    progress.position.y = 0.005
    scene.add(progress)
  }
}

// the stretch of path (0..1) that is "lit" and that coins flow along
function progressRange() {
  const a = props.activeStep
  if (a < 0) return [0, 1]
  if (a >= 3) return [0, 1]
  return [0, a / 2]
}
function flowRange() {
  const a = props.activeStep
  if (a < 0) return [0, 1]
  if (a >= 1 && a <= 2) return [(a - 1) / 2, a / 2] // money moving into the current step
  return null
}

function buildCoins() {
  const geo = new THREE.CylinderGeometry(0.1, 0.1, 0.035, 24)
  const mat = std(COLORS.coin.clone(), { metalness: 0.4, roughness: 0.3 })
  for (let k = 0; k < 7; k++) {
    const m = new THREE.Mesh(geo, mat)
    m.rotation.x = Math.PI / 2
    m.visible = false
    scene.add(m)
    coins.push({ mesh: m, phase: k / 7 })
  }
}

function layout() {
  const el = stage.value
  if (!el || !renderer) return
  const w = Math.max(el.clientWidth, 1)
  const h = Math.max(el.clientHeight, 1)
  renderer.setSize(w, h, false)
  const aspect = w / h
  halfW = (VIEW_H * aspect) / 2
  camera.left = -halfW
  camera.right = halfW
  camera.top = VIEW_H / 2
  camera.bottom = -VIEW_H / 2
  camera.updateProjectionMatrix()
  nodeScale = Math.min(1, Math.max(0.6, (halfW * (2 / 3)) / 3.2))
  nodes.forEach((n, i) => { n.group.position.x = nodeX(i) })
  rebuildTrack()
}

function update(t, snap) {
  const lerpK = snap ? 1 : 0.12

  if (props.activeStep < 0 && !reducedMotion) {
    const idx = Math.floor(t / TOUR_STEP_SECONDS) % 3
    if (idx !== tourIndex.value) {
      tourIndex.value = idx
      emit('highlight', idx)
    }
  }

  nodes.forEach((n, i) => {
    const state = stateOf(i)
    const target = COLORS[state]
    n.base.material.color.lerp(target, lerpK)
    n.accentMats.forEach(m => m.color.lerp(state === 'pending' ? COLORS.pending : target, lerpK))

    const iconOpacity = state === 'pending' ? 0.45 : 1
    n.iconMats.forEach(m => { m.opacity += (iconOpacity - m.opacity) * lerpK })

    const isActive = state === 'active'
    const bob = isActive && !reducedMotion ? Math.sin(t * 2.2) * 0.06 : 0
    n.icon.position.y = 0.66 + bob + (isActive ? 0.06 : 0)
    const swing = isActive && !reducedMotion ? Math.sin(t * 1.2) * 0.4 : 0
    n.icon.rotation.y += (swing - n.icon.rotation.y) * (snap ? 1 : 0.2)

    // halo ring pulses outward around the active step
    if (isActive && !reducedMotion) {
      const p = (t * 0.7) % 1
      n.ring.scale.setScalar(1 + p * 0.45)
      n.ring.material.opacity = 0.55 * (1 - p)
      n.ring.material.color.copy(COLORS.active)
    } else {
      n.ring.material.opacity = isActive ? 0.35 : 0
      n.ring.scale.setScalar(1.08)
    }

    // "pop" when a step has just been reached
    n.pop = Math.max(0, n.pop - 0.025)
    n.group.scale.setScalar(nodeScale * (1 + Math.sin(n.pop * Math.PI) * 0.18))
  })

  // coins
  const now = performance.now()
  const bursting = burst && now < burst.until
  const range = bursting ? [burst.from, burst.to] : flowRange()
  const speed = bursting ? 0.9 : props.activeStep < 0 ? 0.16 : 0.32
  coins.forEach(c => {
    if (!range || reducedMotion || !curve) { c.mesh.visible = false; return }
    const f = (t * speed + c.phase) % 1
    const p = curve.getPointAt(range[0] + f * (range[1] - range[0]))
    c.mesh.visible = true
    c.mesh.position.set(p.x, (0.16 + Math.sin(f * Math.PI) * 0.4) * nodeScale, p.z)
    c.mesh.rotation.z = t * 4 + c.phase * 6
    const edgeFade = Math.min(f / 0.12, (1 - f) / 0.12, 1)
    c.mesh.scale.setScalar(Math.max(edgeFade, 0.01) * nodeScale)
  })
  if (burst && !bursting) burst = null
}

function renderFrame(snap = false) {
  if (!renderer) return
  update((performance.now() - startedAt) / 1000, snap)
  renderer.render(scene, camera)
}

function loop() {
  if (!running) return
  rafId = requestAnimationFrame(loop)
  renderFrame()
}
function start() {
  if (running || reducedMotion || !renderer || !inView || document.hidden) return
  running = true
  rafId = requestAnimationFrame(loop)
}
function stop() {
  running = false
  cancelAnimationFrame(rafId)
}
function onVisibility() { document.hidden ? stop() : start() }
function onMotionChange(e) {
  reducedMotion = e.matches
  if (reducedMotion) { stop(); tourIndex.value = -1; emit('highlight', -1); renderFrame(true) } else start()
}

onMounted(() => {
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true })
  } catch {
    webglFailed.value = true
    return
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)

  readColors()
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-5, 5, 1, -1, 0.1, 50)
  camera.position.set(0, 3.2, 6)
  camera.lookAt(0, props.compact ? 0.3 : 0.35, 0)

  scene.add(new THREE.HemisphereLight(0xffffff, 0xdde6f5, 1.6))
  const sun = new THREE.DirectionalLight(0xffffff, 1.6)
  sun.position.set(3, 6, 5)
  scene.add(sun)

  for (let i = 0; i < 3; i++) nodes.push(buildNode(i))
  buildCoins()
  startedAt = performance.now()

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)
  if (reducedMotion) { tourIndex.value = -1; emit('highlight', -1) } else emit('highlight', 0)

  layout()
  renderFrame(true)

  resizeObs = new ResizeObserver(() => { layout(); if (!running) renderFrame(true) })
  resizeObs.observe(stage.value)
  viewObs = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; inView ? start() : stop() })
  viewObs.observe(stage.value)
  document.addEventListener('visibilitychange', onVisibility)
  start()
})

watch(() => props.activeStep, (next, prev) => {
  if (!renderer) return
  if (prev >= 0 && next > prev) {
    // finishing the last step sends one celebratory run along the whole path
    burst = next >= 3
      ? { from: 0, to: 1, until: performance.now() + 1800 }
      : { from: prev / 2, to: next / 2, until: performance.now() + 1400 }
    const target = nodes[Math.min(next, 2)]
    if (target) target.pop = 1
  }
  rebuildTrack()
  if (!running) renderFrame(true)
})

onBeforeUnmount(() => {
  stop()
  resizeObs?.disconnect()
  viewObs?.disconnect()
  motionQuery?.removeEventListener('change', onMotionChange)
  document.removeEventListener('visibilitychange', onVisibility)
  if (scene) {
    scene.traverse(obj => {
      obj.geometry?.dispose()
      if (obj.material) [].concat(obj.material).forEach(m => m.dispose())
    })
  }
  renderer?.dispose()
  renderer?.forceContextLoss()
  renderer = null
})
</script>

<style scoped>
.wfs { position: relative; }
.wfs-stage {
  height: 168px;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(120% 90% at 50% 0%, #f4f8ff 0%, rgba(244, 248, 255, 0) 70%),
    linear-gradient(180deg, #fbfcff 0%, #f3f6fb 100%);
  overflow: hidden;
}
.wfs--compact .wfs-stage { height: 112px; }
.wfs-canvas { display: block; width: 100%; height: 100%; }

.wfs-labels {
  list-style: none; margin: 10px 0 0; padding: 0;
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
}
.wfs--no-gl .wfs-labels { margin-top: 0; }
.wfs-label {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  text-align: left; min-width: 0; padding: 0 4px;
}
.wfs-num {
  width: 24px; height: 24px; flex-shrink: 0; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700;
  background: var(--color-disabled-bg); color: var(--color-text-tertiary);
  border: 1px solid var(--color-dividers);
  transition: background .3s, color .3s, border-color .3s;
}
.wfs-num svg { width: 14px; height: 14px; }
.wfs-text { display: flex; flex-direction: column; min-width: 0; }
.wfs-title { font-size: var(--font-size-sm); font-weight: 700; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.wfs-state { font-size: 11px; color: var(--color-text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.wfs-label--active .wfs-num { background: var(--color-primary-500); border-color: var(--color-primary-500); color: var(--color-white); box-shadow: 0 0 0 4px var(--color-primary-200); }
.wfs-label--active .wfs-title { color: var(--color-primary-click); }
.wfs-label--active .wfs-state { color: var(--color-primary-500); font-weight: 600; }
.wfs-label--done .wfs-num { background: var(--color-success); border-color: var(--color-success); color: var(--color-white); }
.wfs-label--done .wfs-title { color: var(--color-text-primary); }
.wfs-label--done .wfs-state { color: var(--color-success); }
.wfs-label--idle .wfs-title { color: var(--color-text-primary); }

@media (max-width: 640px) {
  .wfs-stage { height: 132px; }
  .wfs--compact .wfs-stage { height: 96px; }
  .wfs-label { flex-direction: column; text-align: center; gap: 4px; }
  .wfs-text { align-items: center; }
}
@media (prefers-reduced-motion: reduce) {
  .wfs-num { transition: none; }
}
</style>
