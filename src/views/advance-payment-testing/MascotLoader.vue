<template>
  <div class="ml" role="img" aria-label="น้องลีวิ่งกำลังพิมพ์ เดี๋ยวจัดให้นะ">
    <img :src="mascot" alt="" class="ml-base" draggable="false" />
    <!-- parts that move are painted over: hide the original with a white patch, then draw an animated copy -->
    <template v-for="p in MOVING" :key="p.key">
      <span class="ml-cover" :style="box(p)"></span>
      <span class="ml-part" :class="`ml-${p.anim}`" :style="{ ...box(p), ...crop(p), animationDelay: p.delay || '0s' }"></span>
    </template>
    <!-- the typing hand is drawn on top of itself (keyboard behind it), so it only nudges a few px -->
    <span class="ml-part ml-type" :style="{ ...box(HAND), ...crop(HAND) }"></span>
    <!-- eyelids: white lids drop over each eye now and then -->
    <span v-for="e in EYES" :key="e.key" class="ml-lid" :style="{ ...box(e), borderRadius: e.radius }"></span>
  </div>
</template>

<script setup>
import mascot from './assets/mascot-typing.png'

// Loading mascot (น้องลีวิ่ง typing on a laptop). One flat PNG, animated by cropping regions of it:
// regions are in source pixels of the 866 × 786 image and scale with the component's width.
const W = 866
const H = 786
const MOVING = [
  { key: 'text-top', x: 100, y: 85, w: 320, h: 235, anim: 'pop' },
  { key: 'text-bottom', x: 100, y: 320, w: 200, h: 90, anim: 'pop', delay: '.12s' },
  { key: 'drops', x: 615, y: 135, w: 115, h: 110, anim: 'drip' },
  { key: 'line-1', x: 512, y: 166, w: 62, h: 38, anim: 'flick' },
  { key: 'line-2', x: 646, y: 256, w: 44, h: 33, anim: 'flick', delay: '.25s' },
  { key: 'line-3', x: 721, y: 296, w: 44, h: 40, anim: 'flick', delay: '.5s' }
]
const HAND = { x: 538, y: 573, w: 70, h: 53 }
// the left eye's lower half is behind the laptop, so its lid stops flat at the laptop's edge
const EYES = [
  { key: 'left', x: 410, y: 378, w: 50, h: 46, radius: '50% 50% 10% 10% / 60% 60% 10% 10%' },
  { key: 'right', x: 526, y: 371, w: 56, h: 69, radius: '50%' }
]

const pct = n => `${(n * 100).toFixed(3)}%`
function box(r) {
  return { left: pct(r.x / W), top: pct(r.y / H), width: pct(r.w / W), height: pct(r.h / H) }
}
function crop(r) {
  return {
    backgroundImage: `url(${mascot})`,
    backgroundSize: `${pct(W / r.w)} ${pct(H / r.h)}`,
    backgroundPosition: `${pct(r.x / (W - r.w))} ${pct(r.y / (H - r.h))}`
  }
}
</script>

<style scoped>
.ml { position: relative; width: 100%; aspect-ratio: 866 / 786; user-select: none; }
.ml-base { display: block; width: 100%; height: 100%; }
.ml-cover, .ml-part, .ml-lid { position: absolute; }
.ml-cover { background: #fff; }
.ml-part { background-repeat: no-repeat; will-change: transform, opacity; }

/* "เดี๋ยวจัดให้นะ" breathes */
.ml-pop { animation: ml-pop 1.6s ease-in-out infinite; }
@keyframes ml-pop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

/* sweat drops wobble up and down */
.ml-drip { animation: ml-drip 1.4s ease-in-out infinite; transform-origin: 30% 80%; }
@keyframes ml-drip { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-6%) rotate(-6deg); } }

/* hurry lines flicker in turn */
.ml-flick { animation: ml-flick .9s ease-in-out infinite; }
@keyframes ml-flick { 0%, 100% { opacity: 1; transform: translateX(0); } 50% { opacity: .15; transform: translateX(-12%); } }

/* typing: quick taps with a short pause, like real keystrokes */
.ml-type { animation: ml-type 1.1s ease-in-out infinite; }
@keyframes ml-type {
  0%, 100% { transform: translateY(0); }
  8% { transform: translateY(5%); } 16% { transform: translateY(0); }
  24% { transform: translateY(5%); } 32% { transform: translateY(0); }
  40% { transform: translateY(6%); } 48% { transform: translateY(0); }
  62% { transform: translateY(4%); } 70% { transform: translateY(0); }
}

/* blink every few seconds */
.ml-lid { background: #fff; transform-origin: top; transform: scaleY(0); animation: ml-blink 3.6s ease-in-out infinite; }
@keyframes ml-blink { 0%, 90%, 100% { transform: scaleY(0); } 94% { transform: scaleY(1); } }

@media (prefers-reduced-motion: reduce) {
  .ml-part, .ml-lid { animation: none; }
}
</style>
