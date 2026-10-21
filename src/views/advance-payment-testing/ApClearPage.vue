<template>
  <div>
    <div class="apt-pagehead">
      <div class="apt-pagehead-left">
        <button type="button" class="apt-back" aria-label="กลับไปหน้าคำขอ" @click="backToRequest"><AptIcon name="back" /></button>
        <h1>เคลียร์เงินทดรองจ่าย</h1>
      </div>
      <div class="apt-pagehead-actions">
        <button type="button" class="apt-btn apt-btn-danger" @click="cf.onCancel"><AptIcon name="cancel" /> ยกเลิก</button>
        <GlMenu :doc="cf.doc" />
        <button type="button" class="apt-btn apt-btn-outline" @click="printClear"><AptIcon name="print" /> พิมพ์เอกสารเคลียร์</button>
        <button type="button" class="apt-btn apt-btn-primary" @click="cf.onSave"><AptIcon name="save" /> บันทึก</button>
        <template v-if="cf.status === 'awaiting-confirm'">
          <span class="apt-vsep" aria-hidden="true"></span>
          <button type="button" class="apt-btn apt-btn-danger" @click="cf.onReject">ไม่อนุมัติ</button>
          <button type="button" class="apt-btn apt-btn-primary" @click="cf.onApprove">อนุมัติ <AptIcon name="next" /></button>
        </template>
        <template v-if="cf.status === 'rejected'">
          <span class="apt-vsep" aria-hidden="true"></span>
          <button type="button" class="apt-btn apt-btn-primary" @click="cf.onResubmit">ยื่นคำขออนุมัติ <AptIcon name="next" /></button>
        </template>
      </div>
    </div>

    <div class="apt-content">
      <div v-if="cf.status === 'rejected' && cf.doc.rejection" class="apt-banner apt-banner--error" role="alert">
        <AptIcon name="alert" />
        <div><b>ไม่ผ่านการอนุมัติ</b>{{ cf.doc.rejection.reason }} · โดย {{ cf.doc.rejection.by }} · {{ fmtDate(cf.doc.rejection.at) }}</div>
      </div>

      <section class="apt-card">
        <div class="apt-card-head">
          <h2 class="apt-card-title">รายละเอียดคำขอ</h2>
          <StatusChip v-if="cf.status !== 'awaiting-clear' || cf.doc.clearing" :status="cf.status" />
        </div>
        <ClearingFields :cf="cf" />
      </section>
    </div>
    <ClearingDialogs :cf="cf" />
  </div>
</template>

<script setup>
import AptIcon from './AptIcon.vue'
import StatusChip from './StatusChip.vue'
import ClearingFields from './ClearingFields.vue'
import ClearingDialogs from './ClearingDialogs.vue'
import GlMenu from './GlMenu.vue'
import { printClearing } from './printDocs.js'
import { useClearingForm } from './useClearingForm.js'
import { useAptStore, fmtDate } from './store.js'

const props = defineProps({ docId: { type: String, required: true } })
const { go, showToast } = useAptStore()

function backToRequest() { go('request', props.docId) }
const cf = useClearingForm({ docId: props.docId, onLeave: backToRequest })
// prints what's on screen, saved or not
function printClear() { printClearing({ ...cf.doc, clearing: cf.draft }) }
</script>
