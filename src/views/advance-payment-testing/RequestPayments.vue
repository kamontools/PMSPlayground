<template>
  <div>
    <PaymentsTable
      :payments="rf.draft.payments"
      :locked="rf.locked"
      :readonly="readonly"
      :total="readonly ? fmtMoney(requestTotal(rf.draft)) : ''"
      :coach="coach"
      :max-rows="3"
      @locked="rf.warnEdit"
      @create="rf.openPayment(null)"
      @edit="rf.openPayment"
      @remove="rf.removePayment"
      @import="rf.openImport"
      @print="p => showToast(`พิมพ์เอกสาร ${p.docNo} (ตัวอย่างสาธิต)`)"
    />
    <!-- editing: the total sits under the amount column at the table's bottom right · view-only: next to the title -->
    <div v-if="!readonly" class="apt-table-foot">
      <label class="apt-label" for="rq-total">จำนวนเงินทั้งหมด</label>
      <input id="rq-total" class="apt-input apt-input--num" :value="fmtMoney(requestTotal(rf.draft))" readonly />
    </div>
  </div>
</template>

<script setup>
import PaymentsTable from './PaymentsTable.vue'
import { useAptStore, fmtMoney, requestTotal } from './store.js'

// rf: the object returned by useRequestForm() · its dialogs live in RequestDialogs (rendered at page level)
defineProps({ rf: { type: Object, required: true }, coach: { type: [Boolean, String], default: false }, readonly: { type: Boolean, default: false } })
const { showToast } = useAptStore()
</script>
