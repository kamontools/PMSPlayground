<template>
  <div class="apt-overlay" role="dialog" aria-modal="true" aria-label="นำเข้าเอกสาร">
    <div class="apt-dialog apt-dialog--lg">
      <div class="apt-dialog-toolbar">
        <button type="button" class="apt-btn apt-btn-slate" @click="emit('close')"><AptIcon name="back" /> กลับ</button>
        <button type="button" class="apt-btn apt-btn-primary" :disabled="!selected.length" @click="confirm"><AptIcon name="check" /> ยืนยันผูกเอกสาร<span v-if="selected.length"> ({{ selected.length }})</span></button>
      </div>
      <div class="apt-dialog-body">
        <div class="apt-grid apt-grid-3">
          <div class="apt-field"><label class="apt-label" for="im-from">วันที่เริ่ม</label><input id="im-from" v-model="f.from" type="date" class="apt-input" /></div>
          <div class="apt-field"><label class="apt-label" for="im-to">วันที่สิ้นสุด</label><input id="im-to" v-model="f.to" type="date" class="apt-input" /></div>
          <div class="apt-field"><label class="apt-label" for="im-doc">เลขที่เอกสาร</label><input id="im-doc" v-model="f.docNo" type="text" class="apt-input" placeholder="6909xxxxxx" /></div>
          <div class="apt-field"><label class="apt-label" for="im-payee">รหัสหรือชื่อผู้รับ</label><input id="im-payee" v-model="f.payee" type="text" class="apt-input" /></div>
          <div class="apt-field">
            <label class="apt-label" for="im-type">ประเภทการชำระ</label>
            <select id="im-type" v-model="f.typeCode" class="apt-select">
              <option value="">ทั้งหมด</option>
              <option v-for="t in PAY_TYPES" :key="t.code" :value="t.code">{{ t.label }}</option>
            </select>
          </div>
          <div class="apt-field">
            <label class="apt-label" for="im-status">สถานะ</label>
            <select id="im-status" v-model="f.status" class="apt-select">
              <option value="N">N : ในมือ</option>
              <option value="">ทั้งหมด</option>
            </select>
          </div>
        </div>
        <button type="button" class="apt-btn apt-btn-primary" style="margin-bottom: 16px;" @click="applied = { ...f }"><AptIcon name="search" /> ค้นหา</button>

        <div class="apt-table-wrap">
          <table class="apt-table">
            <thead>
              <tr>
                <th style="width: 44px;"><input type="checkbox" :checked="allChecked" :disabled="!rows.length" aria-label="เลือกทั้งหมด" @change="toggleAll" /></th>
                <th>วันที่ชำระ</th><th>วันที่ผ่าน</th><th>เลขที่เอกสาร</th><th>รหัสผู้รับ</th><th>ชื่อผู้รับ</th>
                <th class="num">จำนวนเงิน</th><th>ประเภทชำระ</th><th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r.id" class="clickable" @click="toggle(r.id)">
                <td><input type="checkbox" :checked="selected.includes(r.id)" :aria-label="`เลือก ${r.docNo}`" @click.stop @change="toggle(r.id)" /></td>
                <td>{{ fmtDate(r.payDate) }}</td><td>{{ fmtDate(r.passDate) }}</td><td>{{ r.docNo }}</td><td>{{ r.payeeCode }}</td><td>{{ r.payeeName }}</td>
                <td class="num">{{ fmtMoney(r.amount) }}</td><td>{{ payTypeByCode(r.typeCode)?.label }}</td><td>{{ r.status }}</td>
              </tr>
              <tr v-if="!rows.length"><td colspan="9" class="empty">ไม่พบเอกสารที่ยังไม่ได้ผูก</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="apt-dialog-close">
        <button type="button" class="apt-link apt-link--plain" @click="emit('close')"><AptIcon name="x" /> ปิด</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import AptIcon from './AptIcon.vue'
import { state, PAY_TYPES, payTypeByCode, fmtDate, fmtMoney } from './store.js'

const props = defineProps({ exclude: { type: Array, default: () => [] } })
const emit = defineEmits(['confirm', 'close'])

const f = reactive({ from: '2026-10-01', to: '2026-10-31', docNo: '', payee: '', typeCode: '', status: 'N' })
const applied = ref({ ...f })
const selected = ref([])

// state.importable only holds documents not yet linked to a saved request; exclude ones already in this draft
const rows = computed(() => {
  const a = applied.value
  return state.importable.filter(r => !props.exclude.includes(r.id) &&
    (!a.from || r.payDate >= a.from) && (!a.to || r.payDate <= a.to) &&
    (!a.docNo || r.docNo.includes(a.docNo.trim())) &&
    (!a.payee || `${r.payeeCode} ${r.payeeName}`.toLowerCase().includes(a.payee.trim().toLowerCase())) &&
    (!a.typeCode || r.typeCode === a.typeCode) && (!a.status || r.status === a.status)
  )
})
const allChecked = computed(() => rows.value.length > 0 && rows.value.every(r => selected.value.includes(r.id)))

function toggle(id) {
  selected.value = selected.value.includes(id) ? selected.value.filter(x => x !== id) : [...selected.value, id]
}
function toggleAll() {
  selected.value = allChecked.value ? [] : rows.value.map(r => r.id)
}
function confirm() {
  emit('confirm', state.importable.filter(r => selected.value.includes(r.id)))
}
</script>
