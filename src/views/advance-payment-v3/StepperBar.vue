<template>
  <ol class="stp" :class="{ 'stp--vertical': vertical }" aria-label="ขั้นตอนเงินทดรองจ่าย">
    <li
      v-for="(s, i) in steps"
      :key="s.key"
      class="stp-item"
      :class="['stp-item--' + s.state, { 'stp-item--selected': selected === i }]"
    >
      <button
        type="button"
        class="stp-btn"
        :disabled="s.state === 'pending'"
        :aria-current="s.state === 'active' ? 'step' : undefined"
        @click="$emit('select', i)"
      >
        <span class="stp-dot">
          <svg v-if="s.state === 'done'" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10.5l3.2 3L15 6.5"/></svg>
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span class="stp-text">
          <span class="stp-title">{{ s.title }}</span>
          <span class="stp-sub">{{ s.sub }}</span>
        </span>
      </button>
      <span v-if="i < steps.length - 1" class="stp-line" aria-hidden="true"></span>
    </li>
  </ol>
</template>

<script setup>
// steps: [{ key, title, sub, state: 'done' | 'active' | 'pending' }]
defineProps({
  steps: { type: Array, required: true },
  selected: { type: Number, default: -1 },
  vertical: { type: Boolean, default: false }
})
defineEmits(['select'])
</script>

<style scoped>
.stp {
  list-style: none; margin: 0; padding: 14px 20px;
  display: flex; align-items: center;
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-lg);
}
.stp-item { display: flex; align-items: center; flex: 1; min-width: 0; }
.stp-item:last-child { flex: 0 0 auto; }

.stp-btn {
  display: flex; align-items: center; gap: 10px;
  min-width: 0; padding: 4px 6px; margin: -4px -6px;
  font-family: inherit; text-align: left;
  background: none; border: none; border-radius: var(--radius-md);
  cursor: pointer;
}
.stp-btn:hover:not(:disabled) { background: var(--color-disabled-bg); }
.stp-btn:disabled { cursor: default; }
.stp-btn:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }

.stp-dot {
  width: 28px; height: 28px; flex-shrink: 0; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  background: var(--color-white); color: var(--color-text-tertiary);
  border: 1.5px solid var(--color-stroke);
  transition: background .25s, border-color .25s, color .25s, box-shadow .25s;
}
.stp-dot svg { width: 15px; height: 15px; }
.stp-text { display: flex; flex-direction: column; min-width: 0; }
.stp-title { font-size: var(--font-size-sm); font-weight: 700; color: var(--color-text-tertiary); white-space: nowrap; }
.stp-sub { font-size: 11px; color: var(--color-text-placeholder); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.stp-line {
  flex: 1; height: 2px; min-width: 16px; margin: 0 14px;
  border-radius: 999px; background: var(--color-dividers);
  transition: background .25s;
}

.stp-item--done .stp-dot { background: var(--color-success); border-color: var(--color-success); color: var(--color-white); }
.stp-item--done .stp-title { color: var(--color-text-primary); }
.stp-item--done .stp-sub { color: var(--color-text-tertiary); }
.stp-item--done .stp-line { background: var(--color-success); }

.stp-item--active .stp-dot { background: var(--color-primary-500); border-color: var(--color-primary-500); color: var(--color-white); box-shadow: 0 0 0 4px var(--color-primary-200); }
.stp-item--active .stp-title { color: var(--color-primary-click); }
.stp-item--active .stp-sub { color: var(--color-primary-500); font-weight: 600; }

.stp-item--selected .stp-btn { background: var(--color-disabled-bg); }

/* vertical: used in the detail page's side rail */
.stp--vertical { flex-direction: column; align-items: stretch; padding: 16px; }
.stp--vertical .stp-item { flex-direction: column; align-items: stretch; flex: none; }
.stp--vertical .stp-btn { margin: -4px -6px; }
.stp--vertical .stp-sub { white-space: normal; }
.stp--vertical .stp-line { flex: none; width: 2px; height: 22px; min-width: 0; margin: 6px 0 6px 13px; }

@media (max-width: 640px) {
  .stp:not(.stp--vertical) { padding: 12px; }
  .stp:not(.stp--vertical) .stp-btn { flex-direction: column; gap: 4px; text-align: center; }
  .stp:not(.stp--vertical) .stp-text { align-items: center; }
  .stp:not(.stp--vertical) .stp-sub { max-width: 84px; }
  .stp:not(.stp--vertical) .stp-line { margin: 0 6px; align-self: flex-start; margin-top: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .stp-dot, .stp-line { transition: none; }
}
</style>
