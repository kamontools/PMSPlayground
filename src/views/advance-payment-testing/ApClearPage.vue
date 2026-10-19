<template>
  <div>
    <div class="apt-pagehead">
      <div class="apt-pagehead-left">
        <button type="button" class="apt-back" aria-label="กลับไปหน้าคำขอ" @click="go('request', doc.id)"><AptIcon name="back" /></button>
        <h1>เคลียร์เงินทดรองจ่าย</h1>
      </div>
      <div class="apt-pagehead-actions">
        <button type="button" class="apt-btn apt-btn-danger" @click="onCancel"><AptIcon name="cancel" /> ยกเลิก</button>
        <button type="button" class="apt-btn apt-btn-outline" @click="showToast('เปิดหน้าพิมพ์เอกสารเคลียร์ (ตัวอย่างสาธิต)')"><AptIcon name="print" /> พิมพ์เอกสารเคลียร์</button>
        <button type="button" class="apt-btn apt-btn-primary" @click="onSave"><AptIcon name="save" /> บันทึก</button>
        <template v-if="status === 'awaiting-confirm' && canApprove(state.role)">
          <span class="apt-vsep" aria-hidden="true"></span>
          <button type="button" class="apt-btn apt-btn-danger" @click="onReject">ไม่อนุมัติ</button>
          <button type="button" class="apt-btn apt-btn-primary" @click="onApprove">อนุมัติ <AptIcon name="next" /></button>
        </template>
        <template v-if="status === 'rejected'">
          <span class="apt-vsep" aria-hidden="true"></span>
          <button type="button" class="apt-btn apt-btn-primary" @click="onResubmit">ยื่นคำขออนุมัติ <AptIcon name="next" /></button>
        </template>
      </div>
    </div>

    <div class="apt-content">
      <div v-if="status === 'rejected' && doc.rejection" class="apt-banner apt-banner--error" role="alert">
        <AptIcon name="alert" />
        <div><b>ไม่ผ่านการอนุมัติ</b>{{ doc.rejection.reason }} · โดย {{ doc.rejection.by }} · {{ fmtDate(doc.rejection.at) }}</div>
      </div>
      <div v-if="status === 'awaiting-confirm' && !canApprove(state.role)" class="apt-banner apt-banner--info">
        <AptIcon name="info" />
        <div>เอกสารเคลียร์นี้รอผู้อนุมัติตรวจสอบ (ใน prototype สลับ role เป็น “ผู้อนุมัติ” ได้ที่แถบ Testing มุมขวาล่าง)</div>
      </div>

      <section class="apt-card">
        <div class="apt-card-head">
          <h2 class="apt-card-title">รายละเอียดคำขอ</h2>
          <StatusChip v-if="status !== 'awaiting-clear' || doc.clearing" :status="status" />
        </div>
        <div class="apt-grid apt-grid-112">
          <div class="apt-field">
            <label class="apt-label" for="cl-req">รายการคำขอที่เคลียร์</label>
            <select id="cl-req" class="apt-select" disabled><option>{{ doc.docNo }}</option></select>
          </div>
          <div class="apt-field">
            <label class="apt-label" for="cl-reqamt">จำนวนเงิน<span class="apt-req">*</span></label>
            <input id="cl-reqamt" class="apt-input apt-input--num" :value="fmtMoney(reqTotal)" readonly />
          </div>
          <div class="apt-field">
            <label class="apt-label" for="cl-reqdesc">คำอธิบาย<span class="apt-req">*</span></label>
            <input id="cl-reqdesc" class="apt-input" :value="doc.description" readonly />
          </div>
        </div>

        <hr class="apt-hr" />
        <h3 class="apt-subtitle" style="margin-bottom: 12px;">รายละเอียดการเคลียร์</h3>
        <div class="apt-grid apt-grid-112">
          <div class="apt-field">
            <label class="apt-label" for="cl-docno">เลขที่เอกสารเคลียร์</label>
            <input id="cl-docno" class="apt-input" :value="draft.docNo" readonly />
          </div>
          <div class="apt-field" :class="{ 'apt-field--error': errors.date }">
            <label class="apt-label" for="cl-date">วันที่เคลียร์<span class="apt-req">*</span></label>
            <input id="cl-date" v-model="draft.date" type="date" class="apt-input" :readonly="locked" />
            <span v-if="errors.date" class="apt-error">กรุณาระบุวันที่เคลียร์</span>
          </div>
          <div class="apt-field">
            <div class="apt-label-row">
              <label class="apt-label" for="cl-note">หมายเหตุประกอบการเคลียร์</label>
              <span class="apt-count">{{ draft.note.length }}/250</span>
            </div>
            <input id="cl-note" v-model="draft.note" type="text" class="apt-input" maxlength="250" :readonly="locked" />
          </div>
        </div>

        <FileGallery :files="draft.files" hint="รองรับไฟล์ .jpeg, .png, .pdf และไฟล์รวมไม่เกิน 10 mb" :locked="locked" @locked="warnEdit" />

        <div class="apt-table-head" style="margin-top: 24px;">
          <h3 class="apt-subtitle">รายการค่าใช้จ่าย</h3>
          <button type="button" class="apt-btn apt-btn-outline" @click="openRow(null)"><AptIcon name="plus" /> เพิ่มรายการ</button>
        </div>
        <div class="apt-table-wrap" :class="{ 'apt-field--error': errors.rows }">
          <table class="apt-table">
            <thead>
              <tr><th style="width: 70px;">ลำดับ</th><th>รหัสรายจ่าย</th><th>ชื่อรายจ่าย</th><th>รายละเอียด</th><th class="num">จำนวนเงิน</th><th class="actions"></th></tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in draft.rows" :key="r.id">
                <td>{{ i + 1 }}</td><td>{{ r.account }}</td><td>{{ accountName(r.account) }}</td>
                <td class="wrap">{{ r.detail || '-' }}</td><td class="num">{{ fmtMoney(r.amount) }}</td>
                <td class="actions">
                  <button type="button" class="apt-icon-btn" :aria-label="`แก้ไขรายการที่ ${i + 1}`" @click="openRow(r)"><AptIcon name="edit" /></button>
                  <button type="button" class="apt-icon-btn apt-icon-btn--danger" :aria-label="`ลบรายการที่ ${i + 1}`" @click="removeRow(r)"><AptIcon name="trash" /></button>
                </td>
              </tr>
              <tr v-if="!draft.rows.length"><td colspan="6" class="empty">ไม่พบรายการ</td></tr>
            </tbody>
          </table>
        </div>
        <p v-if="errors.rows" class="apt-error" style="margin-top: 8px;">เพิ่มรายการค่าใช้จ่ายอย่างน้อย 1 รายการ</p>

        <div class="apt-totals">
          <div class="apt-total-row">
            <span>รวมยอดคำขอ ทั้งหมด</span>
            <span title="ผลรวมรายการโอน/เช็คของคำขอ"><AptIcon name="info" /></span>
            <span class="apt-total-box">{{ fmtMoney(reqTotal) }}</span>
          </div>
          <div class="apt-total-row">
            <span>รวมยอดเคลียร์ ทั้งหมด</span>
            <span title="ผลรวมรายการค่าใช้จ่ายด้านบน"><AptIcon name="info" /></span>
            <span class="apt-total-box">{{ fmtMoney(clrTotal) }}</span>
          </div>
          <div class="apt-total-row">
            <span>ส่วนต่าง</span>
            <span class="apt-diff-tag" :class="`apt-diff-tag--${diffTag.tone}`">{{ diffTag.label }}</span>
            <span class="apt-total-box">{{ fmtMoney(Math.abs(diff)) }}</span>
          </div>
        </div>


        <!-- settle the difference: under the totals, inside the clearing card -->
        <div v-if="diff !== 0 && draft.rows.length" ref="settleEl" class="apt-settle">
          <h3 class="apt-settle-title">{{ diff > 0 ? 'การชำระเงินส่วนที่เกิน' : 'การชำระเงินส่วนที่เหลือ' }}</h3>
          <div class="apt-grid apt-grid-3">
            <div class="apt-field" :class="{ 'apt-field--error': errors.settle && !s.method }">
              <label class="apt-label" for="st-method">วิธีการชำระ<span class="apt-req">*</span></label>
              <select id="st-method" class="apt-select apt-select--plain" :value="s.method" :disabled="locked" @change="pickMethod($event.target.value)">
                <option value="" disabled>เลือกวิธีการชำระ</option>
                <option v-for="m in methods" :key="m.value" :value="m.value">{{ m.label }}</option>
              </select>
              <span v-if="errors.settle && !s.method" class="apt-error">กรุณาเลือกวิธีการชำระ</span>
            </div>
            <!-- amount-based -->
            <div v-if="['cash', 'transfer', 'other'].includes(s.method)" class="apt-field" :class="{ 'apt-field--error': errors.settle && !amountOk }">
              <label class="apt-label" for="st-amount">จำนวนเงิน<span class="apt-req">*</span></label>
              <input id="st-amount" v-model.number="s.amount" type="number" min="0" step="0.01" placeholder="0.00" class="apt-input apt-input--num" :readonly="locked" />
              <span v-if="s.amount && !amountOk" class="apt-error">ต้องเท่ากับส่วนต่าง {{ fmtMoney(Math.abs(diff)) }}</span>
            </div>
            <!-- document pickers -->
            <div v-if="docOptions" class="apt-field" :class="{ 'apt-field--error': errors.settle && !s.docRef }">
              <label class="apt-label" for="st-doc">เลขที่เอกสาร<span class="apt-req">*</span></label>
              <select id="st-doc" v-model="s.docRef" class="apt-select apt-select--btn" :disabled="locked">
                <option value="" disabled>เลือกเลขที่เอกสาร</option>
                <option v-for="d in docOptions" :key="d" :value="d">{{ d }}</option>
              </select>
            </div>
            <template v-if="s.method === 'transfer'">
              <div class="apt-field apt-col-start" :class="{ 'apt-field--error': errors.settle && !s.account }">
                <label class="apt-label" for="st-acc">โอนเข้าบัญชี<span class="apt-req">*</span></label>
                <select id="st-acc" v-model="s.account" class="apt-select apt-select--btn" :disabled="locked">
                  <option value="" disabled>เลือกบัญชี</option>
                  <option v-for="a in PAY_FROM_ACCOUNTS" :key="a" :value="a">{{ a }}</option>
                </select>
              </div>
              <div class="apt-field" :class="{ 'apt-field--error': errors.settle && !s.date }">
                <label class="apt-label" for="st-date">วันที่โอน<span class="apt-req">*</span></label>
                <input id="st-date" v-model="s.date" type="date" class="apt-input" :readonly="locked" />
              </div>
            </template>
            <div v-if="s.method === 'other'" class="apt-field" :class="{ 'apt-field--error': errors.settle && !s.note.trim() }">
              <div class="apt-label-row">
                <label class="apt-label" for="st-note">หมายเหตุ<span class="apt-req">*</span></label>
                <span class="apt-count">{{ s.note.length }}/100</span>
              </div>
              <input id="st-note" v-model="s.note" type="text" class="apt-input" maxlength="100" :readonly="locked" />
            </div>
            <div v-if="s.method === 'cheque'" class="apt-field apt-col-start">
              <label class="apt-label" for="st-cheque-total">จำนวนเงินทั้งหมด</label>
              <input id="st-cheque-total" class="apt-input" :value="fmtMoney(chequeTotal)" readonly />
            </div>
          </div>

          <!-- cheque: same payment table + dialogs as the request page -->
          <template v-if="s.method === 'cheque'">
            <PaymentsTable
              :payments="s.payments"
              :locked="locked"
              @locked="warnEdit"
              @create="chequeDlg = { mode: 'create', payment: null }"
              @edit="p => { chequeDlg = { mode: 'create', payment: p } }"
              @remove="removeCheque"
              @import="chequeDlg = { mode: 'import' }"
              @print="p => showToast(`พิมพ์เอกสาร ${p.docNo} (ตัวอย่างสาธิต)`)"
            />
            <p v-if="s.payments.length && !amountOk" class="apt-error">ยอดรวมรายการโอน/เช็คต้องเท่ากับส่วนต่าง {{ fmtMoney(Math.abs(diff)) }}</p>
            <p v-if="errors.settle && !s.payments.length" class="apt-error">กรุณาสร้างหรือนำเข้ารายการโอน/เช็ค</p>
          </template>
        </div>
      </section>
    </div>

    <ExpenseRowDialog v-if="rowDlg" :row="rowDlg.row" @save="saveRow" @close="rowDlg = null" />
    <PaymentEntryDialog v-if="chequeDlg?.mode === 'create'" :payment="chequeDlg.payment" :vendor-id="doc.vendorId" :amount="chequeRemaining" @save="saveCheque" @close="chequeDlg = null" />
    <ImportPaymentDialog v-if="chequeDlg?.mode === 'import'" :exclude="s.payments.map(p => p.id)" @confirm="importCheques" @close="chequeDlg = null" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AptIcon from './AptIcon.vue'
import StatusChip from './StatusChip.vue'
import FileGallery from './FileGallery.vue'
import ExpenseRowDialog from './ExpenseRowDialog.vue'
import PaymentEntryDialog from './PaymentEntryDialog.vue'
import ImportPaymentDialog from './ImportPaymentDialog.vue'
import PaymentsTable from './PaymentsTable.vue'
import { guard, canApprove, roleLabel } from './machine.js'
import {
  state, docById, go, ask, warnLocked, move, showToast, notifySuccess, fmtDate, fmtMoney, requestTotal, clearTotal,
  accountName, payTypeByCode, round2, clone, todayIso, OVER_METHODS, UNDER_METHODS, PETTY_CASH_DOCS, PV_DOCS, RECEIPT_DOCS, PAY_FROM_ACCOUNTS
} from './store.js'

const props = defineProps({ docId: { type: String, required: true } })
const doc = docById(props.docId)
const status = computed(() => doc.status)

function blankSettle() { return { method: '', amount: null, docRef: '', account: '', date: todayIso(), note: '', payments: [] } }
function settleOf(saved) {
  const { payment, ...rest } = clone(saved || {})
  const merged = { ...blankSettle(), ...rest }
  if (payment && !merged.payments.length) merged.payments = [payment] // older single-cheque shape
  return merged
}
const draft = reactive(doc.clearing
  ? { ...clone(doc.clearing), settle: settleOf(doc.clearing.settle) }
  : { docNo: `CL${doc.docNo}`, date: todayIso(), note: '', files: [], rows: [], settle: blankSettle() })
const s = draft.settle
const errors = reactive({ date: false, rows: false, settle: false })

// cleared/cancelled freeze everything; awaiting-clear/confirm/rejected stay editable
const locked = computed(() => !!guard(status.value, 'clear', 'edit'))
function warnEdit() { warnLocked(guard(status.value, 'clear', 'edit'), doc.id) }
function lockedOr(fn) { return locked.value ? warnEdit() : fn() }

const reqTotal = computed(() => requestTotal(doc))
const clrTotal = computed(() => clearTotal(draft))
// > 0: spent more than requested (pay the extra) · < 0: spent less (money comes back)
const diff = computed(() => round2(clrTotal.value - reqTotal.value))
const methods = computed(() => (diff.value > 0 ? OVER_METHODS : UNDER_METHODS))
const docOptions = computed(() => ({ 'petty-cash': PETTY_CASH_DOCS, pv: PV_DOCS, receipt: RECEIPT_DOCS })[s.method] || null)

const chequeTotal = computed(() => round2(s.payments.reduce((t, p) => t + Number(p.amount || 0), 0)))
const chequeRemaining = computed(() => Math.max(0, round2(Math.abs(diff.value) - chequeTotal.value)) || null)
const amountOk = computed(() => {
  const need = Math.abs(diff.value)
  if (s.method === 'cheque') return s.payments.length > 0 && chequeTotal.value === need
  return round2(Number(s.amount || 0)) === need
})
const settled = computed(() => {
  if (diff.value === 0) return true
  if (!methods.value.some(m => m.value === s.method)) return false
  switch (s.method) {
    case 'cash': return amountOk.value
    case 'petty-cash':
    case 'pv':
    case 'receipt': return !!s.docRef.trim()
    case 'transfer': return amountOk.value && !!s.account && !!s.date
    case 'other': return amountOk.value && !!s.note.trim()
    case 'cheque': return amountOk.value
    default: return false
  }
})
const diffTag = computed(() => {
  if (!draft.rows.length) return { tone: 'under', label: 'ยังไม่มีรายการ' }
  if (diff.value === 0) return { tone: 'ok', label: 'ครบ' }
  if (settled.value) return { tone: 'ok', label: diff.value > 0 ? 'ครบ (จ่ายเพิ่มแล้ว)' : 'ครบ (รับคืนแล้ว)' }
  return diff.value > 0 ? { tone: 'over', label: 'เกิน' } : { tone: 'under', label: 'เหลือ' }
})

function pickMethod(m) {
  if (locked.value) return warnEdit()
  Object.assign(s, blankSettle(), { method: m })
}

// ---------- expense rows ----------
const rowDlg = ref(null)
const chequeDlg = ref(null)
function saveCheque(p) {
  const i = s.payments.findIndex(x => x.id === p.id)
  if (i >= 0) s.payments.splice(i, 1, p)
  else s.payments.push(p)
  chequeDlg.value = null
}
function importCheques(list) {
  list.forEach(r => s.payments.push({ ...clone(r), imported: true }))
  chequeDlg.value = null
}
async function removeCheque(p) {
  const { choice } = await ask({ title: 'ลบรายการชำระ', tone: 'danger', message: `ต้องการลบรายการ ${p.docNo} จำนวน ${fmtMoney(p.amount)} บาท หรือไม่`, cancelLabel: 'ยกเลิก', confirmLabel: 'ลบรายการ' })
  if (choice === 'confirm') s.payments.splice(s.payments.indexOf(p), 1)
}
function openRow(row) { lockedOr(() => { rowDlg.value = { row } }) }
function saveRow(row) {
  const i = draft.rows.findIndex(r => r.id === row.id)
  if (i >= 0) draft.rows.splice(i, 1, row)
  else draft.rows.push(row)
  errors.rows = false
  rowDlg.value = null
}
async function removeRow(row) {
  if (locked.value) return warnEdit()
  const { choice } = await ask({ title: 'ลบรายการค่าใช้จ่าย', tone: 'danger', message: `ต้องการลบ “${accountName(row.account)}” จำนวน ${fmtMoney(row.amount)} บาท หรือไม่`, cancelLabel: 'ยกเลิก', confirmLabel: 'ลบรายการ' })
  if (choice === 'confirm') draft.rows.splice(draft.rows.indexOf(row), 1)
}

// ---------- validation + persistence ----------
const settleEl = ref(null)
function validate() {
  errors.date = !draft.date
  errors.rows = !draft.rows.length
  errors.settle = !settled.value
  if (errors.date) { document.getElementById('cl-date')?.focus(); return false }
  if (errors.rows || errors.settle) {
    showToast(errors.rows ? 'เพิ่มรายการค่าใช้จ่ายอย่างน้อย 1 รายการ' : 'กรุณาระบุข้อมูลส่วนต่างให้ครบ')
    settleEl.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return false
  }
  return true
}
function persist() {
  const data = clone(draft)
  if (diff.value === 0) data.settle = blankSettle()
  doc.clearing = data
}

async function onSave() {
  const lock = guard(status.value, 'clear', 'save')
  if (lock) return warnLocked(lock, doc.id)
  if (status.value === 'awaiting-clear') {
    if (!validate()) return
    persist()
    move(doc, 'submitClear')
    notifySuccess('บันทึกเอกสารเคลียร์เรียบร้อยแล้ว สถานะ “รอยืนยันเคลียร์” รอผู้อนุมัติตรวจสอบ')
    return
  }
  // waiting for approval or sent back: save the edits, status stays
  if (status.value === 'awaiting-confirm' && !validate()) return
  persist()
  notifySuccess(status.value === 'rejected' ? 'บันทึกเอกสารเคลียร์เรียบร้อยแล้ว กด “ยื่นคำขออนุมัติ” เมื่อพร้อมให้ตรวจอีกครั้ง' : 'บันทึกเอกสารเคลียร์เรียบร้อยแล้ว')
}

async function onCancel() {
  const lock = guard(status.value, 'clear', 'cancel')
  if (lock) return warnLocked(lock, doc.id)
  if (status.value === 'awaiting-clear') return go('request', doc.id) // nothing submitted yet: just leave
  const { choice } = await ask({
    title: 'ยกเลิกคำขอเคลียร์', tone: 'danger', cancelLabel: 'ไม่ยกเลิก', confirmLabel: 'ยืนยันยกเลิกคำขอเคลียร์',
    message: 'สถานะจะกลับเป็น “รอเคลียร์” เพื่อให้แก้ไขคำขอหรือเอกสารเคลียร์ได้ ระบบจะเก็บประวัติการยกเลิกครั้งนี้ไว้'
  })
  if (choice !== 'confirm') return
  persist()
  doc.rejection = null
  move(doc, 'withdrawClear')
  notifySuccess('ยกเลิกคำขอเคลียร์เรียบร้อยแล้ว สถานะกลับเป็น “รอเคลียร์”', 'ยกเลิกคำขอเคลียร์สำเร็จ')
}

function summary() {
  return [
    { label: 'รวมยอดคำขอ', value: `${fmtMoney(reqTotal.value)} บาท` },
    { label: 'รวมยอดเคลียร์', value: `${fmtMoney(clrTotal.value)} บาท` },
    { label: 'ส่วนต่าง', value: diff.value === 0 ? 'ครบ' : `${diff.value > 0 ? 'เกิน' : 'เหลือ'} ${fmtMoney(Math.abs(diff.value))} บาท` }
  ]
}

async function onApprove() {
  if (!validate()) return
  const { choice } = await ask({
    title: 'ยืนยันการอนุมัติ', tone: 'info', cancelLabel: 'ยกเลิก', confirmLabel: 'ยืนยันอนุมัติ',
    message: `อนุมัติเอกสารเคลียร์ ${draft.docNo} ของคำขอ ${doc.docNo} หรือไม่ เมื่ออนุมัติแล้วจะแก้ไขหรือยกเลิกไม่ได้`,
    summary: summary()
  })
  if (choice !== 'confirm') return
  persist()
  doc.clearing.jv = `JV-${doc.docNo}`
  doc.rejection = null
  move(doc, 'approve')
  notifySuccess(`อนุมัติเรียบร้อยแล้ว สถานะ “เคลียร์แล้ว” · ลงบัญชี ${doc.clearing.jv}`, 'อนุมัติสำเร็จ')
}

async function onReject() {
  const { choice, reason } = await ask({
    title: 'ไม่อนุมัติเอกสารเคลียร์', tone: 'danger', cancelLabel: 'ปิด', confirmLabel: 'ยืนยันไม่อนุมัติ',
    message: `ระบุเหตุผลให้ผู้เบิกทราบว่าต้องแก้ไขอะไรในเอกสาร ${draft.docNo}`,
    reason: { label: 'เหตุผลที่ไม่อนุมัติ', max: 250 }
  })
  if (choice !== 'confirm') return
  persist()
  doc.rejection = { reason, by: roleLabel(state.role), at: new Date().toISOString() }
  move(doc, 'reject', { reason })
  notifySuccess('บันทึกการไม่อนุมัติเรียบร้อยแล้ว สถานะ “ไม่ผ่าน”')
}

async function onResubmit() {
  if (!validate()) return
  const { choice } = await ask({
    title: 'ยื่นคำขออนุมัติอีกครั้ง', tone: 'info', cancelLabel: 'ยกเลิก', confirmLabel: 'ยื่นคำขออนุมัติ',
    message: `ยื่นเอกสารเคลียร์ ${draft.docNo} ให้ผู้อนุมัติตรวจอีกครั้งหรือไม่`, summary: summary()
  })
  if (choice !== 'confirm') return
  persist()
  doc.rejection = null
  move(doc, 'resubmit')
  notifySuccess('ยื่นคำขออนุมัติเรียบร้อยแล้ว สถานะ “รอยืนยันเคลียร์”')
}
</script>
