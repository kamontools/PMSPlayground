<template>
  <div class="tpl-grid">
    <button
      v-for="(t, key) in TEMPLATES" :key="key" type="button"
      class="tpl-card" :class="{ on: current === key }"
      @click="$emit('pick', key)"
    >
      <div class="tpl-card-head">
        <b>{{ t.label }}</b>
        <span v-if="t.recommended" class="wz-tag ok">แนะนำ</span>
        <span v-else-if="current === key" class="wz-tag info">ใช้อยู่</span>
      </div>
      <p class="wz-muted">{{ t.desc }}</p>
      <ul class="tpl-facts">
        <li><b>รายรับ</b> {{ t.incomes.map(i => i.name).join(' · ') }}</li>
        <li><b>ชุดเรียกเก็บ</b> {{ t.billSets.map(b => `${b.name} (${FREQS[b.freq].label})`).join(' · ') }}</li>
        <li><b>ค่าปรับ</b> {{ t.penalty.none ? 'ไม่มี' : t.penalty.type === 'step' ? 'ขั้นบันได' : `${t.penalty.value}% ต่อปี` }}</li>
        <li><b>รายจ่าย</b> {{ t.expenses.length }} รายการ</li>
        <li><b>ผังบัญชี</b> {{ PRESET_COA.length }} บัญชีมาตรฐาน</li>
      </ul>
      <span class="wz-hint">~{{ t.mins }} นาที</span>
    </button>
  </div>
</template>

<script setup>
import { TEMPLATES, FREQS, PRESET_COA } from './store.js'

defineProps({ current: { type: String, default: null } })
defineEmits(['pick'])
</script>

<style scoped src="./wizard.css"></style>
<style scoped>
.tpl-grid{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:14px; }
.tpl-card{ display:flex; flex-direction:column; align-items:flex-start; gap:4px; text-align:left; font:inherit; padding:18px; border:2px solid var(--bl); border-radius:16px; background:#fff; cursor:pointer; }
.tpl-card:hover{ border-color:var(--blue400); }
.tpl-card.on{ border-color:var(--blue); background:var(--blue50); box-shadow:0 0 0 3px var(--blue100); }
.tpl-card-head{ display:flex; align-items:center; gap:8px; }
.tpl-card-head b{ font-size:17px; color:var(--t1); }
.tpl-facts{ list-style:none; margin:10px 0 0; padding:0; display:flex; flex-direction:column; gap:5px; font-size:12.5px; color:var(--t2); }
.tpl-facts b{ color:var(--t1); font-weight:600; }
.tpl-card .wz-hint{ margin-top:10px; }

@media (max-width:900px){
  .tpl-grid{ grid-template-columns:1fr; }
}
</style>
