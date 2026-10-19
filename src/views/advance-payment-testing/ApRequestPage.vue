<template>
  <div>
    <div class="apt-pagehead">
      <div class="apt-pagehead-left">
        <button type="button" class="apt-back" aria-label="กลับไปหน้ารายการ" @click="go('list')"><AptIcon name="back" /></button>
        <h1>{{ isNew ? 'สร้างคำขอเงินทดรองจ่าย' : 'แก้ไขคำขอเงินทดรองจ่าย' }}</h1>
      </div>
      <div class="apt-pagehead-actions">
        <template v-if="!isNew">
          <button type="button" class="apt-btn apt-btn-danger" @click="onCancel"><AptIcon name="cancel" /> ยกเลิก</button>
          <button type="button" class="apt-btn apt-btn-outline" @click="showToast('เปิดหน้าพิมพ์คำขอ (ตัวอย่างสาธิต)')"><AptIcon name="print" /> พิมพ์คำขอ</button>
        </template>
        <button type="button" class="apt-btn apt-btn-primary" @click="onSave"><AptIcon name="save" /> บันทึก</button>
        <template v-if="primary">
          <span class="apt-vsep" aria-hidden="true"></span>
          <button type="button" class="apt-btn apt-btn-primary" @click="primary.run">{{ primary.label }} <AptIcon name="next" /></button>
        </template>
      </div>
    </div>

    <div class="apt-content">
      <div v-if="status === 'rejected' && doc.rejection" class="apt-banner apt-banner--error" role="alert">
        <AptIcon name="alert" />
        <div>
          <b>เอกสารเคลียร์ไม่ผ่านการอนุมัติ</b>
          {{ doc.rejection.reason }} · โดย {{ doc.rejection.by }} · {{ fmtDate(doc.rejection.at) }}
          <button type="button" class="apt-link" @click="go('clear', doc.id)">ไปแก้ไขเอกสารเคลียร์</button>
        </div>
      </div>
      <div v-if="status === 'cancelled' && doc.cancellation" class="apt-banner apt-banner--muted">
        <AptIcon name="info" />
        <div><b>คำขอนี้ถูกยกเลิกแล้ว</b>ยกเลิกโดย {{ doc.cancellation.by }} · {{ fmtDate(doc.cancellation.at) }}</div>
      </div>

      <section class="apt-card">
        <div class="apt-card-head">
          <h2 class="apt-card-title">รายละเอียดคำขอ</h2>
          <StatusChip v-if="status" :status="status" />
          <span class="apt-spacer"></span>
          <button v-if="glButton" type="button" class="apt-btn apt-btn-outline" @click="onGl"><AptIcon name="ledger" /> {{ glButton }}</button>
        </div>

        <div class="apt-grid apt-grid-req">
          <div class="apt-field">
            <label class="apt-label" for="rq-docno">เลขที่เอกสาร<span class="apt-req">*</span></label>
            <input id="rq-docno" class="apt-input" :value="isNew ? '(ระบบออกเลขให้อัตโนมัติ)' : doc.docNo" readonly />
          </div>
          <div class="apt-field" :class="{ 'apt-field--error': errors.createdAt }">
            <label class="apt-label" for="rq-created">วันที่สร้าง<span class="apt-req">*</span></label>
            <input id="rq-created" v-model="draft.createdAt" type="date" class="apt-input" :readonly="locked" />
            <span v-if="errors.createdAt" class="apt-error">กรุณาระบุวันที่สร้าง</span>
          </div>
          <div class="apt-field">
            <label class="apt-label" for="rq-due">วันที่ครบกำหนดเคลียร์</label>
            <input id="rq-due" v-model="draft.dueDate" type="date" class="apt-input" :readonly="locked" />
          </div>
          <div class="apt-grid-spacer"></div>
          <div class="apt-field" :class="{ 'apt-field--error': errors.vendorId }">
            <label class="apt-label" for="rq-vendor">ผู้จัดจำหน่าย/ผู้เบิก<span class="apt-req">*</span></label>
            <select id="rq-vendor" v-model="draft.vendorId" class="apt-select" :disabled="locked">
              <option value="" disabled>เลือกผู้จัดจำหน่าย/ผู้เบิก</option>
              <option v-for="v in VENDORS" :key="v.id" :value="v.id">{{ v.name }}</option>
            </select>
            <span v-if="errors.vendorId" class="apt-error">กรุณาเลือกผู้จัดจำหน่าย/ผู้เบิก</span>
          </div>
          <div class="apt-field apt-span-desc" :class="{ 'apt-field--error': errors.description }">
            <div class="apt-label-row">
              <label class="apt-label" for="rq-desc">คำอธิบาย<span class="apt-req">*</span></label>
              <span class="apt-count">{{ draft.description.length }}/250</span>
            </div>
            <input id="rq-desc" v-model="draft.description" type="text" class="apt-input" maxlength="250" placeholder="จะเอาไปใช้อะไร, จำนวนเงินที่ขอเบิก ฯลฯ" :readonly="locked" />
            <span v-if="errors.description" class="apt-error">กรุณาระบุคำอธิบาย</span>
          </div>
        </div>

        <FileGallery :files="draft.files" :max="5" :locked="locked" @locked="warnEdit" />
      </section>

      <section ref="payCard" class="apt-card" :class="{ 'apt-card--highlight': highlight }">
        <div class="apt-card-head"><h2 class="apt-card-title">การชำระเงิน</h2></div>
        <div class="apt-field" style="max-width: 360px; margin-bottom: 20px;">
          <label class="apt-label" for="rq-total">จำนวนเงินทั้งหมด</label>
          <input id="rq-total" class="apt-input" :value="fmtMoney(requestTotal(draft))" readonly />
        </div>
        <PaymentsTable
          :payments="draft.payments"
          :locked="locked"
          :coach="coach"
          @locked="warnEdit"
          @create="openPayment(null)"
          @edit="openPayment"
          @remove="removePayment"
          @import="openImport"
          @print="p => showToast(`พิมพ์เอกสาร ${p.docNo} (ตัวอย่างสาธิต)`)"
        />
      </section>
    </div>

    <PaymentEntryDialog v-if="paymentDlg" :payment="paymentDlg.payment" :vendor-id="draft.vendorId" @save="savePayment" @close="paymentDlg = null" />
    <ImportPaymentDialog v-if="importOpen" :exclude="draft.payments.map(p => p.id)" @confirm="importPayments" @close="importOpen = false" />
    <GlEntryDialog v-if="glDlg" :doc="doc" :readonly="glDlg.readonly" @save="saveGl" @later="glLater" @close="glDlg = null" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import AptIcon from './AptIcon.vue'
import StatusChip from './StatusChip.vue'
import FileGallery from './FileGallery.vue'
import PaymentsTable from './PaymentsTable.vue'
import PaymentEntryDialog from './PaymentEntryDialog.vue'
import ImportPaymentDialog from './ImportPaymentDialog.vue'
import GlEntryDialog from './GlEntryDialog.vue'
import { guard, canPay, roleLabel } from './machine.js'
import {
  state, VENDORS, docById, nextDocNo, go, ask, warnLocked, move, showToast, notifySuccess,
  fmtDate, fmtMoney, requestTotal, clone, todayIso, PAY_FROM_ACCOUNTS
} from './store.js'

const props = defineProps({ docId: { type: String, default: null } })

const isNew = !props.docId
const doc = isNew ? null : docById(props.docId)
const status = computed(() => doc?.status ?? null)

function blankDraft() {
  return { createdAt: todayIso(), dueDate: '', vendorId: '', description: '', files: [], payments: [] }
}
function draftOf(d) {
  return { createdAt: d.createdAt, dueDate: d.dueDate, vendorId: d.vendorId, description: d.description, files: clone(d.files), payments: clone(d.payments) }
}
const draft = reactive(isNew ? blankDraft() : draftOf(doc))
const errors = reactive({ createdAt: false, vendorId: false, description: false })

// Form edits are frozen once the request is in clearing, cleared or cancelled.
const locked = computed(() => !isNew && !!guard(status.value, 'request', 'edit'))
function warnEdit() { warnLocked(guard(status.value, 'request', 'edit'), doc?.id) }

const primary = computed(() => {
  if (isNew) return null
  switch (status.value) {
    case 'awaiting-disburse': return { label: 'ระบุการชำระเงิน', run: focusPayment }
    case 'awaiting-clear': return { label: 'เคลียร์เงิน', run: () => go('clear', doc.id) }
    case 'awaiting-confirm':
    case 'rejected':
    case 'cleared': return { label: 'ดูเอกสารเคลียร์', run: () => go('clear', doc.id) }
    default: return null
  }
})

const glButton = computed(() => {
  if (isNew || ['awaiting-disburse', 'cancelled'].includes(status.value)) return ''
  return doc.pv ? 'ดูเอกสารที่บันทึกบัญชี' : 'บันทึกบัญชี'
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
  if (!canPay(state.role)) return warnRole()
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  payCard.value?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  highlight.value = true
  coach.value = true
  await nextTick()
  setTimeout(() => document.addEventListener('click', dismissCoach, true), 0)
}
onBeforeUnmount(() => document.removeEventListener('click', dismissCoach, true))

function warnRole() {
  return ask({
    title: 'ไม่มีสิทธิ์ระบุการชำระเงิน', tone: 'warning', cancelLabel: 'ปิด',
    message: 'เฉพาะเจ้าหน้าที่ส่วนกลางเท่านั้นที่ระบุการชำระเงินได้ (ใน prototype สลับ role ได้ที่แถบ Testing มุมขวาล่าง)'
  })
}

// ---------- payments ----------
const paymentDlg = ref(null)
const importOpen = ref(false)
function openPayment(payment) {
  if (!canPay(state.role)) return warnRole()
  paymentDlg.value = { payment }
}
function savePayment(p) {
  const i = draft.payments.findIndex(x => x.id === p.id)
  if (i >= 0) draft.payments.splice(i, 1, p)
  else draft.payments.push(p)
  paymentDlg.value = null
  dismissCoach()
  showToast('เพิ่มรายการชำระแล้ว กดบันทึกเพื่อยืนยัน')
}
async function removePayment(p) {
  if (!canPay(state.role)) return warnRole()
  const { choice } = await ask({ title: 'ลบรายการชำระ', tone: 'danger', message: `ต้องการลบรายการ ${p.docNo} จำนวน ${fmtMoney(p.amount)} บาท ออกจากคำขอนี้หรือไม่ (มีผลเมื่อกดบันทึก)`, cancelLabel: 'ยกเลิก', confirmLabel: 'ลบรายการ' })
  if (choice === 'confirm') draft.payments.splice(draft.payments.indexOf(p), 1)
}
function openImport() {
  if (!canPay(state.role)) return warnRole()
  importOpen.value = true
}
function importPayments(list) {
  list.forEach(r => {
    const vendor = VENDORS.find(v => v.code === r.payeeCode)
    draft.payments.push({
      ...clone(r), imported: true, vendorId: vendor?.id || draft.vendorId, account: PAY_FROM_ACCOUNTS[0],
      chequeNo: r.typeCode === 'CQW' ? r.docNo : '', chequeBook: '', chequeStatus: 'N : ในมือ', note: ''
    })
  })
  importOpen.value = false
  dismissCoach()
  showToast(`ผูกเอกสาร ${list.length} รายการแล้ว กดบันทึกเพื่อยืนยัน`)
}

// ---------- save ----------
function validate() {
  errors.createdAt = !draft.createdAt
  errors.vendorId = !draft.vendorId
  errors.description = !draft.description.trim()
  const firstBad = ['createdAt', 'vendorId', 'description'].find(k => errors[k])
  if (firstBad) {
    document.getElementById({ createdAt: 'rq-created', vendorId: 'rq-vendor', description: 'rq-desc' }[firstBad])?.focus()
    return false
  }
  return true
}

// Imported payment docs leave the import pool once saved on a request, and return if removed.
function syncImportPool(before, after) {
  const afterIds = after.map(p => p.id)
  state.importable = state.importable.filter(r => !afterIds.includes(r.id))
  before.filter(p => p.imported && !afterIds.includes(p.id)).forEach(p => {
    if (!state.importable.some(r => r.id === p.id)) {
      state.importable.push({ id: p.id, payDate: p.payDate, passDate: p.passDate, docNo: p.docNo, payeeCode: p.payeeCode, payeeName: p.payeeName, typeCode: p.typeCode, amount: p.amount, status: 'N' })
    }
  })
}
function commit(target) {
  syncImportPool(target.payments, draft.payments)
  Object.assign(target, clone(draft))
}

async function onSave() {
  if (!isNew) {
    const lock = guard(status.value, 'request', 'save')
    if (lock) return warnLocked(lock, doc.id)
  }
  if (!validate()) return
  if (draft.payments.length && !canPay(state.role) && (isNew || status.value === 'awaiting-disburse')) return warnRole()

  if (isNew) {
    const ids = nextDocNo()
    const created = { ...ids, status: null, pv: null, clearing: null, rejection: null, cancellation: null, log: [], payments: [], files: [] }
    commit(created)
    move(created, 'create')
    state.docs.unshift(created)
    if (created.payments.length) {
      move(created, 'pay')
      state.postPay = created.id
      go('request', created.id)
    } else {
      go('request', created.id)
      notifySuccess(`สร้างคำขอ ${created.docNo} เรียบร้อยแล้ว สถานะ “รอเบิก”`)
    }
    return
  }

  if (status.value === 'awaiting-disburse') {
    commit(doc)
    if (doc.payments.length) {
      move(doc, 'pay')
      await askPostPay()
    } else {
      notifySuccess('บันทึกคำขอเรียบร้อยแล้ว')
    }
    return
  }

  if (status.value === 'awaiting-clear' && !draft.payments.length) {
    const pvNote = doc.pv ? ` และกลับรายการบัญชี ${doc.pv.no}` : ''
    const { choice } = await ask({
      title: 'ถอยกลับเป็น “รอเบิก”', tone: 'warning', cancelLabel: 'ยกเลิก', confirmLabel: 'ยืนยัน',
      message: `คำขอนี้ไม่มีรายการชำระเหลืออยู่ ระบบจะเปลี่ยนสถานะกลับเป็น “รอเบิก”${pvNote} ต้องการดำเนินการต่อหรือไม่`
    })
    if (choice !== 'confirm') return
    const reversed = doc.pv?.no
    commit(doc)
    doc.pv = null
    move(doc, 'unpay', { reason: reversed ? `กลับรายการ ${reversed}` : '' })
    notifySuccess(reversed ? `กลับรายการบัญชี ${reversed} แล้ว สถานะเปลี่ยนเป็น “รอเบิก”` : 'สถานะเปลี่ยนเป็น “รอเบิก” แล้ว')
    return
  }

  commit(doc)
  notifySuccess('บันทึกคำขอเรียบร้อยแล้ว')
}

// ---------- after paying: offer to post the PV ----------
const glDlg = ref(null)
async function askPostPay() {
  const { choice } = await ask({
    title: 'บันทึกสำเร็จแล้ว', tone: 'success', cancelLabel: 'ปิด', confirmLabel: 'บันทึกบัญชีเลย',
    message: 'หลังจากเบิกคำขอ รายการคำขอนี้เปลี่ยนสถานะเป็น “รอเคลียร์” แล้ว คุณต้องการบันทึกบัญชีของรายการนี้เลยหรือไม่'
  })
  if (choice === 'confirm') glDlg.value = { readonly: false }
  else showToast('ยังไม่ได้บันทึกบัญชี กดปุ่ม “บันทึกบัญชี” ได้ภายหลัง')
}
onMounted(() => {
  if (doc && state.postPay === doc.id) {
    state.postPay = null
    askPostPay()
  }
})

function onGl() {
  if (doc.pv) glDlg.value = { readonly: true }
  else if (status.value === 'awaiting-clear') glDlg.value = { readonly: false }
  else warnEdit()
}
function saveGl(pv) {
  doc.pv = { no: `PV-${doc.docNo}`, ...pv }
  glDlg.value = null
  notifySuccess(`บันทึกบัญชีเรียบร้อยแล้ว เลขที่ ${doc.pv.no}`)
}
function glLater() {
  glDlg.value = null
  showToast('ยังไม่ได้บันทึกบัญชี กดปุ่ม “บันทึกบัญชี” ได้ภายหลัง')
}

// ---------- cancel (T2) ----------
async function onCancel() {
  const lock = guard(status.value, 'request', 'cancel')
  if (lock) return warnLocked(lock, doc.id)
  const { choice } = await ask({
    title: 'ยกเลิกคำขอ', tone: 'danger', cancelLabel: 'ไม่ยกเลิก', confirmLabel: 'ยืนยันยกเลิกคำขอ',
    message: `ต้องการยกเลิกคำขอ ${doc.docNo} หรือไม่ เมื่อยกเลิกแล้วจะแก้ไขเอกสารนี้ไม่ได้อีก`
  })
  if (choice !== 'confirm') return
  move(doc, 'cancel')
  doc.cancellation = { by: roleLabel(state.role), at: new Date().toISOString() }
  notifySuccess(`ยกเลิกคำขอ ${doc.docNo} เรียบร้อยแล้ว`, 'ยกเลิกคำขอสำเร็จ')
}
</script>
