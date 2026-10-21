<template>
  <div>
    <GlEntryDialog
      v-if="cf.glDlg"
      type="JV"
      :entry="cf.doc.clearing.gl || buildClearingGl(cf.doc, cf.doc.clearing)"
      :readonly="cf.glDlg.readonly"
      @save="cf.saveGl"
      @later="cf.glLater"
      @close="cf.glDlg = null"
    />
    <ExpenseRowDialog v-if="cf.rowDlg" :row="cf.rowDlg.row" @save="cf.saveRow" @close="cf.rowDlg = null" />
    <PaymentEntryDialog v-if="cf.chequeDlg?.mode === 'create'" :payment="cf.chequeDlg.payment" :vendor-id="cf.doc.vendorId" :amount="cf.chequeRemaining" @save="cf.saveCheque" @close="cf.chequeDlg = null" />
    <ImportPaymentDialog v-if="cf.chequeDlg?.mode === 'import'" :exclude="cf.s.payments.map(p => p.id)" @confirm="cf.importCheques" @close="cf.chequeDlg = null" />
  </div>
</template>

<script setup>
import ExpenseRowDialog from './ExpenseRowDialog.vue'
import PaymentEntryDialog from './PaymentEntryDialog.vue'
import ImportPaymentDialog from './ImportPaymentDialog.vue'
import GlEntryDialog from './GlEntryDialog.vue'
import { buildClearingGl } from './store.js'

// Dialogs driven by useClearingForm (expense row, settlement cheques, JV). Render at page level, outside any
// collapsible section, so the JV preview survives the section folding after approval.
defineProps({ cf: { type: Object, required: true } })
</script>
