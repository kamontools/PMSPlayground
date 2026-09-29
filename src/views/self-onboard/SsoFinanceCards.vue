<template>
  <div class="acc-card wz-card fin-card-wrap">
    <button type="button" class="acc-head" @click="open = !open">
      <svg class="acc-chev" :class="{ open }" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8l4 4 4-4"/></svg>
      <div class="acc-head-text">
        <b>2. ตั้งค่าบัญชีการเงิน</b>
        <span>AR · GL · AP · {{ financeDone }}/{{ financeTotal }} เสร็จแล้ว · ~{{ financeMins }} นาที</span>
      </div>
      <span v-if="financeDone === financeTotal" class="wz-tag ok">เสร็จแล้ว</span>
    </button>

    <div v-show="open" class="acc-body fin-body">
      <div class="fin-top-actions">
        <span v-if="state.finance.template" class="wz-tag info">Template: {{ TEMPLATES[state.finance.template].label }}</span>
        <button type="button" class="wz-btn sm" :class="{ primary: !anyVisited }" @click="$emit('open', entryKey)">
          {{ financeDone === financeTotal ? 'แก้ไข' : anyVisited ? 'ทำต่อ' : 'เริ่มกรอก' }}
        </button>
      </div>

      <div class="fin-cards">
        <div v-for="s in FINANCE_SECTIONS" :key="s.key" class="fin-card">
          <div class="fin-card-head">
            <b>{{ s.title }}</b>
            <span class="wz-tag" :class="sectionDone(s) === s.items.length ? 'ok' : 'warn'">{{ sectionDone(s) }}/{{ s.items.length }}</span>
          </div>
          <div class="wz-progress sm"><div :style="{ width: (sectionDone(s) / s.items.length * 100) + '%' }"></div></div>
          <ul class="fin-stats">
            <li v-for="st in statsFor(s.key)" :key="st">{{ st }}</li>
          </ul>
          <ul v-if="pendingItems(s).length" class="fin-pending">
            <li v-for="it in pendingItems(s).slice(0, 3)" :key="it.key">○ {{ it.title }}</li>
            <li v-if="pendingItems(s).length > 3" class="wz-muted">+{{ pendingItems(s).length - 3 }} อีก</li>
          </ul>
          <button type="button" class="wz-btn sm" @click="$emit('open', firstUnfinished(s))">
            {{ sectionDone(s) === s.items.length ? 'แก้ไข' : 'ไปกรอกต่อ →' }}
          </button>
        </div>
      </div>

      <button v-if="state.finance.template" type="button" class="linklike fin-change-tpl" @click="$emit('open', 'template')">เปลี่ยน template</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FINANCE_SECTIONS, TEMPLATES, state, sectionDone, isDone, unmappedIncomes, unmappedExpenses } from './store.js'

defineEmits(['open'])

const open = ref(true)

const financeTotal = computed(() => FINANCE_SECTIONS.reduce((n, s) => n + s.items.length, 0))
const financeDone = computed(() => FINANCE_SECTIONS.reduce((n, s) => n + sectionDone(s), 0))
const financeMins = computed(() => FINANCE_SECTIONS.reduce((n, s) => n + s.mins, 0))
const anyVisited = computed(() => FINANCE_SECTIONS.some(s => s.items.some(it => state.visited.includes(it.key))))
const entryKey = computed(() => {
  // First visit: always offer a template before jumping into any finance step
  if (!state.finance.template) return 'template'
  for (const s of FINANCE_SECTIONS) {
    const pending = s.items.find(it => !isDone(it.key))
    if (pending) return pending.key
  }
  return FINANCE_SECTIONS[0].items[0].key
})

function pendingItems(s) { return s.items.filter(it => !isDone(it.key)) }
function firstUnfinished(s) {
  const p = pendingItems(s)
  return p.length ? p[0].key : s.items[0].key
}

function statsFor(key) {
  if (key === 'ar') return [
    `รายรับ ${state.incomes.length} รายการ`,
    `บิลวันที่ ${state.billCycle.issueDay} · ครบกำหนด ${state.billCycle.dueDays} วัน`,
    state.penalty.none ? 'ไม่มีค่าปรับ' : `ค่าปรับ ${state.penalty.value}%`,
    state.billPayment.has === true ? `Bill Payment: ${state.billPayment.bank || 'มี'}` : state.billPayment.has === false ? 'ไม่มี Bill Payment' : 'ยังไม่ระบุ Bill Payment',
  ]
  if (key === 'gl') return [
    `รายจ่าย ${state.expenses.length} รายการ`,
    `นโยบาย: ${state.policy.basis === 'accrual' ? 'เกณฑ์คงค้าง' : 'เกณฑ์เงินสด'}`,
  ]
  return [
    `ผังบัญชี ${state.coa.accounts.length} บัญชี`,
    `ผูกรายรับ ${state.incomes.length - unmappedIncomes.value.length}/${state.incomes.length}`,
    `ผูกรายจ่าย ${state.expenses.length - unmappedExpenses.value.length}/${state.expenses.length}`,
    `ใช้บ่อย ${state.favorites.length} บัญชี`,
  ]
}
</script>

<style scoped src="./wizard.css"></style>
<style scoped>
.fin-card-wrap{ margin-bottom:14px; }

.acc-head{ width:100%; display:flex; align-items:center; gap:12px; padding:18px 22px; background:none; border:none; cursor:pointer; text-align:left; font:inherit; }
.acc-head:hover{ background:var(--surface); }
.acc-chev{ width:16px; height:16px; color:var(--t4); flex-shrink:0; transition:transform .15s ease; }
.acc-chev.open{ transform:rotate(180deg); color:var(--blue); }
.acc-head-text{ flex:1; min-width:0; display:flex; flex-direction:column; gap:2px; }
.acc-head-text b{ font-size:15px; color:var(--t1); }
.acc-head-text span{ font-size:12.5px; color:var(--t3); }
.acc-body{ padding:0 22px 18px; }

.fin-body{ display:flex; flex-direction:column; gap:16px; }
.fin-top-actions{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; }

.fin-cards{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; }
.fin-card{ border:1.5px solid var(--bl); border-radius:12px; padding:14px 16px; display:flex; flex-direction:column; gap:8px; }
.fin-card-head{ display:flex; justify-content:space-between; align-items:center; }
.fin-card-head b{ font-size:14px; color:var(--t1); }
.fin-stats{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:3px; font-size:12.5px; color:var(--t2); }
.fin-pending{ list-style:none; margin:0; padding:8px 0 0; border-top:1px dashed var(--bl); display:flex; flex-direction:column; gap:3px; font-size:12px; color:var(--t3); }
.fin-card .wz-btn{ margin-top:4px; align-self:flex-start; }
.fin-change-tpl{ align-self:flex-start; font-size:12.5px; }

@media (max-width:900px){
  .fin-cards{ grid-template-columns:1fr; }
}

@media (max-width:640px){
  .acc-head{ padding:14px 16px; }
  .acc-body{ padding:0 16px 14px; }
}
</style>
