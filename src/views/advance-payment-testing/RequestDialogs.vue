<template>
  <div>
    <PaymentEntryDialog v-if="rf.paymentDlg" :payment="rf.paymentDlg.payment" :vendor-id="rf.draft.vendorId" :amount="rf.unpaid" @save="rf.savePayment" @close="rf.paymentDlg = null" />
    <ImportPaymentDialog v-if="rf.importOpen" :exclude="rf.draft.payments.map(p => p.id)" @confirm="rf.importPayments" @close="rf.importOpen = false" />
    <GlEntryDialog v-if="rf.glDlg" :entry="rf.doc.pv || buildPv(rf.doc, '')" type="PV" :readonly="rf.glDlg.readonly" @save="rf.saveGl" @later="rf.glLater" @close="rf.glDlg = null" />
  </div>
</template>

<script setup>
import PaymentEntryDialog from './PaymentEntryDialog.vue'
import ImportPaymentDialog from './ImportPaymentDialog.vue'
import GlEntryDialog from './GlEntryDialog.vue'
import { buildPv } from './store.js'

// Dialogs driven by useRequestForm (payment entry, import, PV). Render at page level, outside any
// collapsible section, so they survive the section folding when the status changes.
defineProps({ rf: { type: Object, required: true } })
</script>
