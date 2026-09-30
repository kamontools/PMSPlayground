<template>
  <div class="gcl">
    <div class="gcl-head">
      <span>สิ่งที่ต้องทำ</span>
      <span class="gcl-count" :class="{ 'gcl-count--ok': requiredDone === requiredTotal }">{{ requiredDone }}/{{ requiredTotal }}</span>
    </div>
    <div class="gcl-bar"><div class="gcl-bar-fill" :style="{ width: (requiredTotal ? requiredDone / requiredTotal * 100 : 0) + '%' }"></div></div>
    <ul class="gcl-list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="gcl-item"
        :class="{
          'gcl-item--done': item.done,
          'gcl-item--optional': item.optional,
          'gcl-item--warn': item.warn && !item.done,
          'gcl-item--action': item.action,
          'gcl-item--ready': item.action && item.ready
        }"
      >
        <span class="gcl-ic">
          <svg v-if="item.done" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10.5l3.2 3L15 6.5"/></svg>
          <svg v-else-if="item.action" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h11M11 6l4 4-4 4"/></svg>
          <svg v-else-if="item.warn" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6v5M10 14v.1"/></svg>
        </span>
        <span class="gcl-text">
          {{ item.text }}
          <span v-if="item.optional" class="gcl-opt">ไม่บังคับ</span>
          <span v-if="item.action && item.ready" class="gcl-opt gcl-opt--ready">พร้อมบันทึก</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// items: [{ text, done?, optional?, warn?, action?, ready? }] — `action` is the final "press save" step
const props = defineProps({ items: { type: Array, required: true } })

const required = computed(() => props.items.filter(i => !i.optional && !i.action))
const requiredTotal = computed(() => required.value.length)
const requiredDone = computed(() => required.value.filter(i => i.done).length)
</script>

<style scoped>
.gcl { min-width: 0; }
.gcl-head {
  display: flex; align-items: center; justify-content: space-between;
  font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text-secondary);
  margin-bottom: 6px;
}
.gcl-count { color: var(--color-text-tertiary); }
.gcl-count--ok { color: var(--color-success); }
.gcl-bar { height: 4px; border-radius: 999px; background: var(--color-dividers); overflow: hidden; margin-bottom: 10px; }
.gcl-bar-fill { height: 100%; background: var(--color-success); border-radius: inherit; transition: width .35s ease; }

.gcl-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.gcl-item { display: flex; align-items: flex-start; gap: 8px; font-size: var(--font-size-sm); color: var(--color-text-primary); line-height: 1.45; }
.gcl-ic {
  width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
  border-radius: 50%; border: 1.5px solid var(--color-stroke);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-white);
  transition: background .2s, border-color .2s;
}
.gcl-ic svg { width: 12px; height: 12px; }
.gcl-opt {
  display: inline-block; margin-left: 4px;
  font-size: 11px; font-weight: 500; color: var(--color-text-tertiary);
  background: var(--color-disabled-bg); border-radius: 999px; padding: 0 7px;
}

.gcl-item--done { color: var(--color-text-tertiary); }
.gcl-item--done .gcl-text { text-decoration: line-through; text-decoration-color: var(--color-stroke); }
.gcl-item--done .gcl-ic { background: var(--color-success); border-color: var(--color-success); }
.gcl-item--optional:not(.gcl-item--done) .gcl-ic { border-style: dashed; }
.gcl-item--warn .gcl-ic { background: var(--color-attention); border-color: var(--color-attention); }
.gcl-item--warn { color: var(--color-attention); }
.gcl-item--action { font-weight: 600; color: var(--color-text-tertiary); }
.gcl-item--action .gcl-ic { color: var(--color-text-tertiary); border-color: transparent; }
.gcl-item--ready { color: var(--color-primary-click); }
.gcl-item--ready .gcl-ic { background: var(--color-primary-500); border-color: var(--color-primary-500); color: var(--color-white); }
.gcl-opt--ready { background: var(--color-primary-200); color: var(--color-primary-click); font-weight: 600; }

@media (prefers-reduced-motion: reduce) {
  .gcl-bar-fill, .gcl-ic { transition: none; }
}
</style>
