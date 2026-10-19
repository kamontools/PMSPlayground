<template>
  <div>
    <div class="apt-table-head">
      <h3 class="apt-subtitle">รายการโอน / เช็ค</h3>
      <div class="apt-table-head-actions">
        <button type="button" class="apt-btn apt-btn-outline" @click="act('import')"><AptIcon name="plus" /> นำเข้าเอกสาร</button>
        <button type="button" class="apt-btn apt-btn-primary" @click="act('create')"><AptIcon name="doc" /> สร้างใหม่</button>
      </div>
      <div v-if="coach" class="apt-coach" role="status">กรุณากรอกข้อมูล ในส่วนนี้ แล้วกดบันทึก</div>
    </div>
    <div class="apt-table-wrap">
      <table class="apt-table">
        <thead>
          <tr>
            <th>วันที่ชำระ</th><th>วันที่ผ่าน</th><th>เลขที่เอกสาร</th><th>รหัสผู้รับ</th><th>ชื่อผู้รับ</th>
            <th>ประเภทชำระ</th><th class="num">จำนวนเงิน</th><th>สถานะ</th><th class="actions"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pageRows" :key="p.id">
            <td>{{ fmtDate(p.payDate) }}</td><td>{{ fmtDate(p.passDate) }}</td><td>{{ p.docNo }}</td>
            <td>{{ p.payeeCode }}</td><td>{{ p.payeeName }}</td><td>{{ payTypeByCode(p.typeCode)?.label }}</td>
            <td class="num">{{ fmtMoney(p.amount) }}</td>
            <td><span class="apt-dot" :class="{ 'apt-dot--blue': p.typeCode === 'CQW' }" :title="p.typeCode === 'CQW' ? 'เช็คในมือ' : 'ผ่านรายการแล้ว'"></span></td>
            <td class="actions">
              <button type="button" class="apt-icon-btn" :aria-label="`แก้ไข ${p.docNo}`" @click="act('edit', p)"><AptIcon name="edit" /></button>
              <button type="button" class="apt-icon-btn" :aria-label="`พิมพ์ ${p.docNo}`" @click="emit('print', p)"><AptIcon name="print" /></button>
              <button type="button" class="apt-icon-btn apt-icon-btn--danger" :aria-label="`ลบ ${p.docNo}`" @click="act('remove', p)"><AptIcon name="trash" /></button>
            </td>
          </tr>
          <tr v-if="!payments.length"><td colspan="9" class="empty">ไม่พบรายการ</td></tr>
        </tbody>
      </table>
    </div>
    <PagerBar v-model:page="page" v-model:size="size" :total="payments.length" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AptIcon from './AptIcon.vue'
import PagerBar from './PagerBar.vue'
import { fmtDate, fmtMoney, payTypeByCode } from './store.js'

const props = defineProps({
  payments: { type: Array, required: true },
  locked: { type: Boolean, default: false },
  coach: { type: Boolean, default: false }
})
const emit = defineEmits(['locked', 'create', 'import', 'edit', 'remove', 'print'])

const page = ref(1)
const size = ref(10)
const pageRows = computed(() => props.payments.slice((page.value - 1) * size.value, page.value * size.value))

function act(name, p) {
  if (props.locked) return emit('locked')
  emit(name, p)
}
</script>
