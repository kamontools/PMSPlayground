<template>
  <div>
    <div class="apt-table-head">
      <h3 class="apt-subtitle">รายการโอน / เช็ค<span v-if="total" class="apt-table-total">รวม {{ total }} บาท</span></h3>
      <div v-if="!readonly" class="apt-table-head-actions">
        <button type="button" class="apt-btn apt-btn-outline" @click="act('import')"><AptIcon name="plus" /> นำเข้าเอกสาร</button>
        <button type="button" class="apt-btn apt-btn-primary" @click="act('create')"><AptIcon name="doc" /> สร้างใหม่</button>
      </div>
      <div v-if="coach" class="apt-coach" role="status">{{ typeof coach === 'string' ? coach : 'กรุณากรอกข้อมูล ในส่วนนี้ แล้วกดบันทึก' }}</div>
    </div>
    <div class="apt-table-wrap" :class="{ 'apt-table-wrap--rows': maxRows }" :style="maxRows ? { '--apt-max-rows': maxRows } : null">
      <table class="apt-table">
        <thead>
          <tr>
            <th>วันที่ชำระ</th><th>วันที่ผ่าน</th><th>เลขที่เอกสาร</th><th>รหัสผู้รับ</th><th>ชื่อผู้รับ</th>
            <th>ประเภทชำระ</th><th class="num">จำนวนเงิน</th><th>สถานะ</th><th class="actions apt-col-sticky" aria-label="จัดการรายการ"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in payments" :key="p.id">
            <td>{{ fmtDate(p.payDate) }}</td><td>{{ fmtDate(p.passDate) }}</td><td>{{ p.docNo }}</td>
            <td>{{ p.payeeCode }}</td><td>{{ p.payeeName }}</td><td>{{ payTypeByCode(p.typeCode)?.label }}</td>
            <td class="num">{{ fmtMoney(p.amount) }}</td>
            <td><span class="apt-dot" :class="{ 'apt-dot--blue': p.typeCode === 'CQW' }" :title="p.typeCode === 'CQW' ? 'เช็คในมือ' : 'ผ่านรายการแล้ว'"></span></td>
            <!-- row actions stay visible at the right edge while the table scrolls sideways -->
            <td class="actions apt-col-sticky">
              <button v-if="!readonly" type="button" class="apt-icon-btn" :aria-label="`แก้ไข ${p.docNo}`" @click="act('edit', p)"><AptIcon name="edit" /></button>
              <button type="button" class="apt-icon-btn" :aria-label="`พิมพ์ ${p.docNo}`" @click="emit('print', p)"><AptIcon name="print" /></button>
              <button v-if="!readonly" type="button" class="apt-icon-btn apt-icon-btn--danger" :aria-label="`ลบ ${p.docNo}`" @click="act('remove', p)"><AptIcon name="trash" /></button>
            </td>
          </tr>
          <tr v-if="!payments.length"><td colspan="9" class="empty">ไม่พบรายการ</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import AptIcon from './AptIcon.vue'
import { fmtDate, fmtMoney, payTypeByCode } from './store.js'

const props = defineProps({
  payments: { type: Array, required: true },
  locked: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false }, // view-only: no add/import/edit/remove, print stays
  total: { type: String, default: '' }, // shown next to the title (view-only request payments)
  coach: { type: [Boolean, String], default: false }, // true = default text, or the text to show
  maxRows: { type: Number, default: 0 } // > 0: body scrolls past this many rows, header stays put
})
const emit = defineEmits(['locked', 'create', 'import', 'edit', 'remove', 'print'])

function act(name, p) {
  if (props.locked) return emit('locked')
  emit(name, p)
}
</script>
