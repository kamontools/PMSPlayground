<template>
  <div>
    <div class="apt-pagehead">
      <div class="apt-pagehead-left">
        <button type="button" class="apt-back" aria-label="กลับไปหน้ารายการ" @click="go('list')"><AptIcon name="back" /></button>
        <h1>{{ rf.isNew ? 'สร้างคำขอเงินทดรองจ่าย' : 'แก้ไขคำขอเงินทดรองจ่าย' }}</h1>
      </div>
      <div class="apt-pagehead-actions">
        <template v-if="!rf.isNew">
          <button type="button" class="apt-btn apt-btn-danger" @click="rf.onCancel"><AptIcon name="cancel" /> ยกเลิก</button>
          <button type="button" class="apt-btn apt-btn-outline" @click="showToast('เปิดหน้าพิมพ์คำขอ (ตัวอย่างสาธิต)')"><AptIcon name="print" /> พิมพ์คำขอ</button>
        </template>
        <button type="button" class="apt-btn apt-btn-primary" @click="rf.onSave"><AptIcon name="save" /> บันทึก</button>
        <template v-if="primary">
          <span class="apt-vsep" aria-hidden="true"></span>
          <button type="button" class="apt-btn apt-btn-primary" @click="primary.run">{{ primary.label }} <AptIcon name="next" /></button>
        </template>
      </div>
    </div>

    <div class="apt-content">
      <div v-if="rf.status === 'rejected' && rf.doc.rejection" class="apt-banner apt-banner--error" role="alert">
        <AptIcon name="alert" />
        <div>
          <b>เอกสารเคลียร์ไม่ผ่านการอนุมัติ</b>
          {{ rf.doc.rejection.reason }} · โดย {{ rf.doc.rejection.by }} · {{ fmtDate(rf.doc.rejection.at) }}
          <button type="button" class="apt-link" @click="goClear">ไปแก้ไขเอกสารเคลียร์</button>
        </div>
      </div>
      <div v-if="rf.status === 'cancelled' && rf.doc.cancellation" class="apt-banner apt-banner--muted">
        <AptIcon name="info" />
        <div><b>คำขอนี้ถูกยกเลิกแล้ว</b>ยกเลิกโดย {{ rf.doc.cancellation.by }} · {{ fmtDate(rf.doc.cancellation.at) }}</div>
      </div>

      <section class="apt-card">
        <div class="apt-card-head">
          <h2 class="apt-card-title">รายละเอียดคำขอ</h2>
          <StatusChip v-if="rf.status" :status="rf.status" />
          <span class="apt-spacer"></span>
          <button v-if="rf.glButton" type="button" class="apt-btn apt-btn-outline" @click="rf.onGl"><AptIcon name="ledger" /> {{ rf.glButton }}</button>
        </div>
        <RequestFields :rf="rf" />
      </section>

      <section ref="payCard" class="apt-card" :class="{ 'apt-card--highlight': highlight }">
        <div class="apt-card-head"><h2 class="apt-card-title">การชำระเงิน</h2></div>
        <RequestPayments :rf="rf" :coach="coach" />
      </section>
    </div>
    <RequestDialogs :rf="rf" />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, nextTick } from 'vue'
import AptIcon from './AptIcon.vue'
import StatusChip from './StatusChip.vue'
import RequestFields from './RequestFields.vue'
import RequestPayments from './RequestPayments.vue'
import RequestDialogs from './RequestDialogs.vue'
import { useRequestForm } from './useRequestForm.js'
import { useAptStore, fmtDate } from './store.js'

const props = defineProps({ docId: { type: String, default: null } })
const { go, showToast } = useAptStore()

function goClear() { go('clear', props.docId) }
const rf = useRequestForm({ docId: props.docId, detailPage: 'request', onGoClear: goClear, onPaymentAdded: () => dismissCoach() })

const primary = computed(() => {
  if (rf.isNew) return null
  switch (rf.status) {
    case 'awaiting-disburse': return { label: 'ระบุการชำระเงิน', run: focusPayment }
    case 'awaiting-clear': return { label: 'เคลียร์เงิน', run: goClear }
    case 'awaiting-confirm':
    case 'rejected':
    case 'cleared': return { label: 'ดูเอกสารเคลียร์', run: goClear }
    default: return null
  }
})

// ---------- "ระบุการชำระเงิน" coach mark ----------
const payCard = ref(null)
const highlight = ref(false)
const coach = ref(false)
function dismissCoach() {
  coach.value = false
  highlight.value = false
  document.removeEventListener('click', dismissCoach, true)
}
async function focusPayment() {
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  payCard.value?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  highlight.value = true
  coach.value = true
  await nextTick()
  setTimeout(() => document.addEventListener('click', dismissCoach, true), 0)
}
onBeforeUnmount(() => document.removeEventListener('click', dismissCoach, true))
</script>
