<template>
  <div>
    <dl class="apt-kv">
      <div><dt>เลขที่เอกสารเคลียร์</dt><dd>{{ cf.draft.docNo }}</dd></div>
      <div><dt>วันที่เคลียร์</dt><dd>{{ fmtDate(cf.draft.date) }}</dd></div>
      <div class="apt-kv-wide"><dt>หมายเหตุประกอบการเคลียร์</dt><dd>{{ cf.draft.note || '—' }}</dd></div>
      <div class="apt-kv-full"><dt>เอกสารแนบ</dt><dd><FileGallery :files="cf.draft.files" readonly /></dd></div>
    </dl>

    <div class="apt-table-head" style="margin-top: 24px;">
      <h3 class="apt-subtitle">รายการค่าใช้จ่าย</h3>
    </div>
    <div class="apt-table-wrap">
      <table class="apt-table">
        <thead>
          <tr><th style="width: 70px;">ลำดับ</th><th>รหัสรายจ่าย</th><th>ชื่อรายจ่าย</th><th>รายละเอียด</th><th class="num">จำนวนเงิน</th></tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in cf.draft.rows" :key="r.id">
            <td>{{ i + 1 }}</td><td>{{ r.code }}</td><td>{{ expenseByCode(r.code)?.name }}</td>
            <td class="wrap">{{ r.detail || '-' }}</td><td class="num">{{ fmtMoney(r.amount) }}</td>
          </tr>
          <tr v-if="!cf.draft.rows.length"><td colspan="5" class="empty">ไม่พบรายการ</td></tr>
        </tbody>
      </table>
    </div>

    <div class="apt-totals">
      <div class="apt-total-row"><span>รวมยอดคำขอ ทั้งหมด</span><span class="apt-total-box">{{ fmtMoney(cf.reqTotal) }}</span></div>
      <div class="apt-total-row"><span>รวมยอดเคลียร์ ทั้งหมด</span><span class="apt-total-box">{{ fmtMoney(cf.clrTotal) }}</span></div>
      <div class="apt-total-row">
        <span>ส่วนต่าง</span>
        <span class="apt-diff-tag" :class="`apt-diff-tag--${cf.diffTag.tone}`">{{ cf.diffTag.label }}</span>
        <span class="apt-total-box">{{ fmtMoney(Math.abs(cf.diff)) }}</span>
      </div>
    </div>

    <div v-if="cf.diff !== 0 && cf.draft.rows.length" class="apt-settle">
      <h3 class="apt-settle-title">{{ cf.diff > 0 ? 'การชำระเงินส่วนที่เกิน' : 'การชำระเงินส่วนที่เหลือ' }}</h3>
      <dl class="apt-kv">
        <div><dt>วิธีการชำระ</dt><dd>{{ methodLabel || '—' }}</dd></div>
        <div v-if="['cash', 'transfer', 'other'].includes(cf.s.method)"><dt>จำนวนเงิน</dt><dd>{{ fmtMoney(cf.s.amount) }} บาท</dd></div>
        <div v-if="cf.docOptions"><dt>เลขที่เอกสาร</dt><dd>{{ cf.s.docRef || '—' }}</dd></div>
        <template v-if="cf.s.method === 'transfer'">
          <div><dt>โอนเข้าบัญชี</dt><dd>{{ cf.s.account || '—' }}</dd></div>
          <div><dt>วันที่โอน</dt><dd>{{ fmtDate(cf.s.date) }}</dd></div>
        </template>
        <div v-if="cf.s.method === 'other'" class="apt-kv-wide"><dt>หมายเหตุ</dt><dd>{{ cf.s.note || '—' }}</dd></div>
        <div v-if="cf.s.method === 'cheque'"><dt>จำนวนเงินทั้งหมด</dt><dd>{{ fmtMoney(cf.chequeTotal) }} บาท</dd></div>
      </dl>
      <PaymentsTable
        v-if="cf.s.method === 'cheque'"
        :payments="cf.s.payments"
        readonly
        @print="p => showToast(`พิมพ์เอกสาร ${p.docNo} (ตัวอย่างสาธิต)`)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PaymentsTable from './PaymentsTable.vue'
import FileGallery from './FileGallery.vue'
import { useAptStore, fmtDate, fmtMoney, expenseByCode } from './store.js'

// Read-only clearing (step version's view state): same data as ClearingFields, no inputs or row actions.
const props = defineProps({ cf: { type: Object, required: true } })
const { showToast } = useAptStore()
const methodLabel = computed(() => props.cf.methods.find(m => m.value === props.cf.s.method)?.label)
</script>
