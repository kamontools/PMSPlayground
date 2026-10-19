<template>
  <div>
    <div class="apt-pagehead">
      <div class="apt-pagehead-left"><h1>เงินทดรองจ่าย</h1></div>
      <div class="apt-pagehead-actions">
        <button type="button" class="apt-btn apt-btn-primary" @click="go(props.detailPage, null)"><AptIcon name="save" /> สร้างคำขอ</button>
      </div>
    </div>

    <div class="apt-content">
      <section class="apt-card">
        <div class="apt-card-head"><h2 class="apt-card-title">รายการคำขอ</h2></div>

        <div class="apt-tabs" role="tablist" aria-label="กรองตามสถานะ">
          <button
            v-for="f in FILTERS"
            :key="f.value"
            type="button"
            role="tab"
            class="apt-tab"
            :class="{ active: filter === f.value }"
            :aria-selected="filter === f.value"
            @click="filter = f.value; page = 1"
          >
            {{ f.label }} <b>{{ counts[f.value] }}</b>
          </button>
        </div>

        <form class="apt-filters" @submit.prevent="applySearch">
          <input v-model="draft.from" type="date" class="apt-input" aria-label="วันที่เริ่ม" />
          <span class="apt-filter-dash">-</span>
          <input v-model="draft.to" type="date" class="apt-input" aria-label="วันที่สิ้นสุด" />
          <input v-model="draft.q" type="search" class="apt-input apt-search" placeholder="ระบุเลขที่เอกสาร, คำอธิบาย เพื่อค้นหา" aria-label="ค้นหา" />
          <button type="submit" class="apt-btn apt-btn-primary">ค้นหา</button>
        </form>

        <div class="apt-table-wrap">
          <table class="apt-table">
            <thead>
              <tr>
                <th>
                  <button type="button" class="apt-sort" :aria-label="`เรียงเลขที่เอกสาร ${sortAsc ? 'น้อยไปมาก' : 'มากไปน้อย'}`" @click="sortAsc = !sortAsc">
                    เลขที่เอกสาร <AptIcon :name="sortAsc ? 'sortUp' : 'sortDown'" />
                  </button>
                </th>
                <th>สถานะ</th>
                <th>ลงบัญชี</th>
                <th>วันที่บันทึก</th>
                <th>วันครบกำหนด</th>
                <th>คำอธิบาย</th>
                <th>ชำระโดย</th>
                <th class="num">ยอดคำขอ</th>
                <th class="num">ยอดเคลียร์</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in pageRows" :key="d.id" class="clickable" tabindex="0" @click="go(props.detailPage, d.id)" @keydown.enter="go(props.detailPage, d.id)">
                <td><strong>{{ d.docNo }}</strong></td>
                <td><StatusChip :status="d.status" /></td>
                <td><span v-if="d.pv">{{ d.pv.no }}</span><span v-else class="apt-muted">ยังไม่ลง</span></td>
                <td>{{ fmtDate(d.createdAt) }}</td>
                <td>{{ fmtDate(d.dueDate) }}</td>
                <td class="wrap">{{ d.description }}</td>
                <td>{{ payBy(d) }}</td>
                <td class="num">{{ d.requestedAmount ? fmtMoney(d.requestedAmount) : '-' }}</td>
                <td class="num">{{ d.clearing ? fmtMoney(clearTotal(d.clearing)) : '-' }}</td>
              </tr>
              <tr v-if="!pageRows.length"><td colspan="9" class="empty">ไม่พบรายการ</td></tr>
            </tbody>
          </table>
        </div>
        <PagerBar v-model:page="page" v-model:size="size" :total="rows.length" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AptIcon from './AptIcon.vue'
import StatusChip from './StatusChip.vue'
import PagerBar from './PagerBar.vue'
import { FILTERS } from './machine.js'
import { useAptStore, fmtDate, fmtMoney, clearTotal, payTypeByCode } from './store.js'

// detailPage: where a row (or สร้างคำขอ) opens — 'request' in the classic version, 'detail' in the step version
const props = defineProps({ detailPage: { type: String, default: 'request' } })
const { state, go } = useAptStore()

const year = new Date().getFullYear()
const draft = reactive({ from: `${year}-01-01`, to: `${year}-12-31`, q: '' })
const applied = ref({ ...draft })
const filter = ref('all')
const sortAsc = ref(false)
const page = ref(1)
const size = ref(10)

function applySearch() {
  applied.value = { ...draft }
  page.value = 1
}

// Date range + keyword narrow the set first; tab counts are taken from that set.
const searched = computed(() => {
  const { from, to, q } = applied.value
  const kw = q.trim().toLowerCase()
  return state.docs.filter(d =>
    (!from || d.createdAt >= from) && (!to || d.createdAt <= to) &&
    (!kw || d.docNo.toLowerCase().includes(kw) || d.description.toLowerCase().includes(kw))
  )
})
const counts = computed(() => {
  const c = { all: searched.value.length }
  FILTERS.forEach(f => { if (f.value !== 'all') c[f.value] = searched.value.filter(d => d.status === f.value).length })
  return c
})
const rows = computed(() => {
  const list = filter.value === 'all' ? searched.value : searched.value.filter(d => d.status === filter.value)
  return [...list].sort((a, b) => (sortAsc.value ? 1 : -1) * a.docNo.localeCompare(b.docNo))
})
const pageRows = computed(() => rows.value.slice((page.value - 1) * size.value, page.value * size.value))

function payBy(d) {
  const types = [...new Set(d.payments.map(p => p.typeCode))]
  if (!types.length) return '-'
  return types.map(t => payTypeByCode(t)?.label.split(' : ')[1] || t).join(', ')
}
</script>
