<template>
  <div>
    <!-- view-only: the total sits next to the table title instead of taking its own row -->
    <div v-if="!readonly" class="apt-field" style="max-width: 360px; margin-bottom: 20px;">
      <label class="apt-label" for="rq-total">จำนวนเงินทั้งหมด</label>
      <input id="rq-total" class="apt-input" :value="fmtMoney(requestTotal(rf.draft))" readonly />
    </div>
    <PaymentsTable
      :payments="rf.draft.payments"
      :locked="rf.locked"
      :readonly="readonly"
      :total="readonly ? fmtMoney(requestTotal(rf.draft)) : ''"
      :coach="coach"
      @locked="rf.warnEdit"
      @create="rf.openPayment(null)"
      @edit="rf.openPayment"
      @remove="rf.removePayment"
      @import="rf.openImport"
      @print="p => showToast(`พิมพ์เอกสาร ${p.docNo} (ตัวอย่างสาธิต)`)"
    />
  </div>
</template>

<script setup>
import PaymentsTable from './PaymentsTable.vue'
import { useAptStore, fmtMoney, requestTotal } from './store.js'

// rf: the object returned by useRequestForm() · its dialogs live in RequestDialogs (rendered at page level)
defineProps({ rf: { type: Object, required: true }, coach: { type: [Boolean, String], default: false }, readonly: { type: Boolean, default: false } })
const { showToast } = useAptStore()
</script>
