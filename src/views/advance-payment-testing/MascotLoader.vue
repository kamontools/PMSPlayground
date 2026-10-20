<template>
  <div class="ml" role="img" aria-label="น้องลีวิ่งกำลังพิมพ์ เดี๋ยวจัดให้นะ">
    <!-- equations drift up around the mascot while it "works it out" -->
    <div class="ml-math" aria-hidden="true">
      <span v-for="(m, i) in MATH" :key="i" class="ml-eq" :style="{ left: m.x, top: m.y, fontSize: m.size, animationDuration: m.dur, animationDelay: m.delay }">{{ m.t }}</span>
    </div>

    <!-- body, typing hand and eyelids rock together; the hand was cut out of the body layer so it can move freely -->
    <div class="ml-rig">
      <img :src="base" alt="" class="ml-base" draggable="false" />
      <span class="ml-part ml-type" :style="{ ...box(HAND), ...crop(hand, HAND) }"></span>
      <span v-for="(s, i) in SPARKS" :key="i" class="ml-spark" :style="{ ...box(s), transform: `rotate(${s.rot}deg)`, animationDelay: s.delay }"></span>
      <span v-for="e in EYES" :key="e.key" class="ml-lid" :style="{ ...box(e), borderRadius: e.radius }"></span>
    </div>

    <!-- text, sweat drops and hurry lines live on their own layer -->
    <span v-for="p in PARTS" :key="p.key" class="ml-part" :class="`ml-${p.anim}`" :style="{ ...box(p), ...crop(parts, p), animationDelay: p.delay || '0s' }"></span>
  </div>
</template>

<script setup>
import base from './assets/mascot-base.png'
import parts from './assets/mascot-parts.png'
import hand from './assets/mascot-hand.png'

// Loading mascot (น้องลีวิ่ง typing on a laptop), built from three layers of the original 866 × 786 sticker:
// mascot-base (body/laptop/desk with the hand cut out), mascot-parts (text, sweat drops, hurry lines) and
// mascot-hand. Regions below are in source pixels and scale with the component's width.
const W = 866
const H = 786
const PARTS = [
  { key: 'text', x: 94, y: 82, w: 330, h: 316, anim: 'pop' },
  { key: 'drops', x: 622, y: 140, w: 100, h: 98, anim: 'drip' },
  { key: 'line-1', x: 510, y: 168, w: 66, h: 38, anim: 'flick' },
  { key: 'line-2', x: 648, y: 256, w: 38, h: 32, anim: 'flick', delay: '.2s' },
  { key: 'line-3', x: 722, y: 296, w: 42, h: 44, anim: 'flick', delay: '.4s' }
]
const HAND = { x: 530, y: 566, w: 88, h: 68 }
// little "tap" marks around the fingers, in time with the keystrokes
const SPARKS = [
  { x: 532, y: 628, w: 14, h: 4, rot: -35, delay: '0s' },
  { x: 548, y: 640, w: 14, h: 4, rot: -10, delay: '.18s' },
  { x: 604, y: 622, w: 14, h: 4, rot: 30, delay: '.36s' }
]
// the left eye's lower half is behind the laptop, so its lid stops flat at the laptop's edge
const EYES = [
  { key: 'left', x: 410, y: 378, w: 50, h: 46, radius: '50% 50% 10% 10% / 60% 60% 10% 10%' },
  { key: 'right', x: 526, y: 371, w: 56, h: 69, radius: '50%' }
]
// positions are relative to the mascot box; negative / >100% values spill around it
const MATH = [
  { t: 'Σ', x: '-18%', y: '30%', size: '30px', dur: '3.2s', delay: '0s' },
  { t: '√(4K(1+K))', x: '72%', y: '8%', size: '15px', dur: '3.6s', delay: '.4s' },
  { t: 'cos θ', x: '-30%', y: '62%', size: '16px', dur: '3s', delay: '.9s' },
  { t: '(A + η)²', x: '58%', y: '58%', size: '18px', dur: '3.4s', delay: '1.3s' },
  { t: 'Dr = Cr', x: '-24%', y: '4%', size: '15px', dur: '3.8s', delay: '1.7s' },
  { t: '∫ f(x) dx', x: '88%', y: '40%', size: '15px', dur: '3.1s', delay: '.2s' },
  { t: 'π', x: '22%', y: '-6%', size: '24px', dur: '2.8s', delay: '2.1s' },
  { t: 'x² + y²', x: '96%', y: '74%', size: '14px', dur: '3.5s', delay: '1s' },
  { t: '3×2', x: '-12%', y: '86%', size: '18px', dur: '3.3s', delay: '2.4s' },
  { t: 'κ²', x: '80%', y: '-4%', size: '18px', dur: '2.9s', delay: '1.5s' },
  { t: 'Δ', x: '44%', y: '-10%', size: '22px', dur: '3.2s', delay: '2.8s' },
  { t: '%', x: '104%', y: '18%', size: '20px', dur: '3s', delay: '2.6s' }
]

const pct = n => `${(n * 100).toFixed(3)}%`
function box(r) {
  return { left: pct(r.x / W), top: pct(r.y / H), width: pct(r.w / W), height: pct(r.h / H) }
}
function crop(src, r) {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: `${pct(W / r.w)} ${pct(H / r.h)}`,
    backgroundPosition: `${pct(r.x / (W - r.w))} ${pct(r.y / (H - r.h))}`
  }
}
</script>

<style scoped>
.ml { position: relative; width: 100%; aspect-ratio: 866 / 786; user-select: none; }
.ml-rig { position: absolute; inset: 0; animation: ml-rock .55s ease-in-out infinite; transform-origin: 60% 90%; }
.ml-base { display: block; width: 100%; height: 100%; }
.ml-part, .ml-lid, .ml-spark { position: absolute; }
.ml-part { background-repeat: no-repeat; will-change: transform, opacity; }

/* the whole body leans into each keystroke a little */
@keyframes ml-rock { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(.8%) rotate(-.6deg); } }

/* typing: fast, clearly visible taps with a short pause, like real keystrokes */
.ml-type { transform-origin: 85% 15%; animation: ml-type .9s ease-in-out infinite; }
@keyframes ml-type {
  0%, 100% { transform: translate(0, 0) rotate(0); }
  10% { transform: translate(-3%, 14%) rotate(-7deg); } 20% { transform: translate(0, 0) rotate(0); }
  30% { transform: translate(4%, 12%) rotate(5deg); } 40% { transform: translate(0, 0) rotate(0); }
  50% { transform: translate(-2%, 15%) rotate(-6deg); } 60% { transform: translate(0, 0) rotate(0); }
  72% { transform: translate(3%, 11%) rotate(4deg); } 82% { transform: translate(0, 0) rotate(0); }
}
.ml-spark { background: #fff; border-radius: 2px; opacity: 0; animation: ml-spark .9s ease-out infinite; }
@keyframes ml-spark { 0%, 100% { opacity: 0; transform: scale(.4); } 12% { opacity: 1; transform: scale(1); } 30% { opacity: 0; transform: scale(1.3); } }

/* "เดี๋ยวจัดให้นะ" breathes */
.ml-pop { animation: ml-pop 1.6s ease-in-out infinite; }
@keyframes ml-pop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

/* sweat drops wobble up and down */
.ml-drip { animation: ml-drip 1.2s ease-in-out infinite; transform-origin: 30% 80%; }
@keyframes ml-drip { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-8%) rotate(-8deg); } }

/* hurry lines flicker in turn */
.ml-flick { animation: ml-flick .6s ease-in-out infinite; }
@keyframes ml-flick { 0%, 100% { opacity: 1; transform: translateX(0); } 50% { opacity: .15; transform: translateX(-14%); } }

/* blink every few seconds */
.ml-lid { background: #fff; transform-origin: top; transform: scaleY(0); animation: ml-blink 3.6s ease-in-out infinite; }
@keyframes ml-blink { 0%, 90%, 100% { transform: scaleY(0); } 94% { transform: scaleY(1); } }

/* floating equations (the "doing the maths" meme) */
.ml-math { position: absolute; inset: 0; pointer-events: none; }
.ml-eq {
  position: absolute; white-space: nowrap; color: #fff; opacity: 0;
  font-family: 'Times New Roman', Georgia, serif; font-style: italic;
  text-shadow: 0 0 8px rgba(255, 255, 255, .7), 0 0 18px rgba(120, 180, 255, .6);
  animation: ml-eq 3.2s ease-in-out infinite;
}
@keyframes ml-eq {
  0% { opacity: 0; transform: translateY(24px) scale(.8); }
  20% { opacity: .95; }
  70% { opacity: .7; }
  100% { opacity: 0; transform: translateY(-70px) scale(1.08); }
}

@media (prefers-reduced-motion: reduce) {
  .ml-rig, .ml-part, .ml-lid, .ml-spark, .ml-eq { animation: none; }
  .ml-eq { opacity: .6; }
}
</style>
