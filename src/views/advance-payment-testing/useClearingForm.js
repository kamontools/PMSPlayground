// Clearing-side logic (expense rows, difference settlement, JV, T5–T9) shared by the classic and step versions.
// Returns a reactive object so templates can read `cf.diff`, `cf.s.method`, … without `.value`.
import { ref, reactive, computed } from 'vue'
import { guard, ACTOR } from './machine.js'
import {
  useAptStore, requestTotal, clearTotal, expenseByCode, round2, clone, todayIso, fmtMoney,
  OVER_METHODS, UNDER_METHODS, PETTY_CASH_DOCS, PV_DOCS, RECEIPT_DOCS
} from './store.js'

/**
 * opts.docId    — the request being cleared
 * opts.onLeave  — what [ยกเลิก] does before anything was submitted (classic: back to the request page)
 */
export function useClearingForm({ docId, onLeave } = {}) {
  const { docById, ask, warnLocked, move, showToast, notifySuccess, refreshing } = useAptStore()
  const doc = docById(docId)
  const status = computed(() => doc.status)

  function blankSettle() { return { method: '', amount: null, docRef: '', account: '', date: todayIso(), note: '', payments: [] } }
  function settleOf(saved) {
    const { payment, ...rest } = clone(saved || {})
    const merged = { ...blankSettle(), ...rest }
    if (payment && !merged.payments.length) merged.payments = [payment] // older single-cheque shape
    return merged
  }
  function draftOf() {
    return doc.clearing
      ? { ...clone(doc.clearing), settle: settleOf(doc.clearing.settle) }
      : { docNo: `CL${doc.docNo}`, date: todayIso(), note: '', files: [], rows: [], settle: blankSettle() }
  }
  const draft = reactive(draftOf())
  const s = draft.settle
  const errors = reactive({ date: false, rows: false, settle: false })

  // cleared/cancelled freeze everything; awaiting-clear/confirm/rejected stay editable
  const locked = computed(() => !!guard(status.value, 'clear', 'edit'))
  function warnEdit() { warnLocked(guard(status.value, 'clear', 'edit')) }
  function lockedOr(fn) { return locked.value ? warnEdit() : fn() }

  const reqTotal = computed(() => requestTotal(doc))
  const clrTotal = computed(() => clearTotal(draft))
  // > 0: spent more than requested (pay the extra) · < 0: spent less (money comes back)
  const diff = computed(() => round2(clrTotal.value - reqTotal.value))
  const methods = computed(() => (diff.value > 0 ? OVER_METHODS : UNDER_METHODS))
  const docOptions = computed(() => ({ 'petty-cash': PETTY_CASH_DOCS, pv: PV_DOCS, receipt: RECEIPT_DOCS })[s.method] || null)

  // unsaved edits (a balanced clearing drops its settlement on save, so ignore it when comparing)
  function snap(d) { return JSON.stringify({ ...d, settle: diff.value === 0 ? null : d.settle }) }
  const dirty = computed(() => snap(draft) !== snap(draftOf()))
  function resetDraft() {
    const fresh = draftOf()
    Object.assign(s, fresh.settle)
    delete fresh.settle
    Object.assign(draft, fresh)
    Object.keys(errors).forEach(k => { errors[k] = false })
  }

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

  // ---------- expense rows + settlement cheques ----------
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
    const { choice } = await ask({ title: 'ลบรายการค่าใช้จ่าย', tone: 'danger', message: `ต้องการลบ “${expenseByCode(row.code)?.name}” จำนวน ${fmtMoney(row.amount)} บาท หรือไม่`, cancelLabel: 'ยกเลิก', confirmLabel: 'ลบรายการ' })
    if (choice === 'confirm') draft.rows.splice(draft.rows.indexOf(row), 1)
  }

  // ---------- validation + persistence ----------
  let settleEl = null
  function setSettleEl(el) { settleEl = el }
  function validate() {
    errors.date = !draft.date
    errors.rows = !draft.rows.length
    errors.settle = !settled.value
    if (errors.date) { document.getElementById('cl-date')?.focus(); return false }
    if (errors.rows || errors.settle) {
      showToast(errors.rows ? 'เพิ่มรายการค่าใช้จ่ายอย่างน้อย 1 รายการ' : 'กรุณาระบุข้อมูลส่วนต่างให้ครบ')
      settleEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }
  function persist() {
    const data = clone(draft)
    if (diff.value === 0) data.settle = blankSettle()
    doc.clearing = data
  }

  /** Returns true once something was saved (the step version uses it to leave edit mode). */
  async function onSave() {
    const lock = guard(status.value, 'clear', 'save')
    if (lock) { warnLocked(lock); return false }
    // the dialog comes first, then refreshing() applies the change behind a loading overlay
    if (status.value === 'awaiting-clear') {
      if (!validate()) return false
      await notifySuccess('บันทึกเอกสารเคลียร์เรียบร้อยแล้ว สถานะ “รอยืนยันเคลียร์” รอผู้อนุมัติตรวจสอบ')
      await refreshing(() => { persist(); move(doc, 'submitClear') })
      return true
    }
    // waiting for approval or sent back: save the edits, status stays
    if (status.value === 'awaiting-confirm' && !validate()) return false
    await notifySuccess(status.value === 'rejected' ? 'บันทึกเอกสารเคลียร์เรียบร้อยแล้ว กด “ยื่นคำขออนุมัติ” เมื่อพร้อมให้ตรวจอีกครั้ง' : 'บันทึกเอกสารเคลียร์เรียบร้อยแล้ว')
    await refreshing(persist)
    return true
  }

  async function onCancel() {
    const lock = guard(status.value, 'clear', 'cancel')
    if (lock) return warnLocked(lock)
    if (status.value === 'awaiting-clear') return onLeave?.() // nothing submitted yet: just leave
    const { choice } = await ask({
      title: 'ยกเลิกคำขอเคลียร์', tone: 'danger', cancelLabel: 'ไม่ยกเลิก', confirmLabel: 'ยืนยันยกเลิกคำขอเคลียร์',
      message: 'สถานะจะกลับเป็น “รอเคลียร์” เพื่อให้แก้ไขคำขอหรือเอกสารเคลียร์ได้ ระบบจะเก็บประวัติการยกเลิกครั้งนี้ไว้'
    })
    if (choice !== 'confirm') return
    await notifySuccess('ยกเลิกคำขอเคลียร์เรียบร้อยแล้ว สถานะกลับเป็น “รอเคลียร์”', 'ยกเลิกคำขอเคลียร์สำเร็จ')
    await refreshing(() => { persist(); doc.rejection = null; move(doc, 'withdrawClear') })
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
    const post = await askPostGl()
    await refreshing(() => { persist(); doc.rejection = null; move(doc, 'approve') })
    if (post) glDlg.value = { readonly: false }
    else showToast('ยังไม่ได้บันทึกบัญชี กดปุ่ม “บันทึกบัญชี” ได้ภายหลัง')
  }

  // ---------- after approving: offer to post the clearing JV (same flow as the PV after paying) ----------
  const glDlg = ref(null)
  async function askPostGl() {
    const { choice } = await ask({
      title: 'อนุมัติสำเร็จ', tone: 'success', cancelLabel: 'ปิด', confirmLabel: 'บันทึกบัญชีเลย',
      message: 'อนุมัติแล้ว เอกสารนี้เปลี่ยนสถานะเป็น “เคลียร์แล้ว” คุณต้องการบันทึกบัญชีของรายการนี้เลยหรือไม่'
    })
    return choice === 'confirm'
  }
  function saveGl(entry) {
    doc.clearing.gl = { no: `JV-${doc.docNo}`, ...entry }
    glDlg.value = null
    notifySuccess(`บันทึกบัญชีเรียบร้อยแล้ว เลขที่ ${doc.clearing.gl.no}`)
  }
  function glLater() {
    glDlg.value = null
    showToast('ยังไม่ได้บันทึกบัญชี กดปุ่ม “บันทึกบัญชี” ได้ภายหลัง')
  }

  async function onReject() {
    const { choice, reason } = await ask({
      title: 'ไม่อนุมัติเอกสารเคลียร์', tone: 'danger', cancelLabel: 'ปิด', confirmLabel: 'ยืนยันไม่อนุมัติ',
      message: `ระบุเหตุผลให้ผู้เบิกทราบว่าต้องแก้ไขอะไรในเอกสาร ${draft.docNo}`,
      reason: { label: 'เหตุผลที่ไม่อนุมัติ', max: 250 }
    })
    if (choice !== 'confirm') return
    await notifySuccess('บันทึกการไม่อนุมัติเรียบร้อยแล้ว สถานะ “ไม่ผ่าน”')
    await refreshing(() => {
      persist()
      doc.rejection = { reason, by: ACTOR, at: new Date().toISOString() }
      move(doc, 'reject', { reason })
    })
  }

  async function onResubmit() {
    if (!validate()) return
    const { choice } = await ask({
      title: 'ยื่นคำขออนุมัติอีกครั้ง', tone: 'info', cancelLabel: 'ยกเลิก', confirmLabel: 'ยื่นคำขออนุมัติ',
      message: `ยื่นเอกสารเคลียร์ ${draft.docNo} ให้ผู้อนุมัติตรวจอีกครั้งหรือไม่`, summary: summary()
    })
    if (choice !== 'confirm') return
    await notifySuccess('ยื่นคำขออนุมัติเรียบร้อยแล้ว สถานะ “รอยืนยันเคลียร์”')
    await refreshing(() => { persist(); doc.rejection = null; move(doc, 'resubmit') })
  }

  return reactive({
    doc, status, draft, dirty, resetDraft, s, errors, locked, reqTotal, clrTotal, diff, methods, docOptions, chequeTotal, chequeRemaining,
    amountOk, settled, diffTag, rowDlg, chequeDlg, glDlg,
    warnEdit, pickMethod, openRow, saveRow, removeRow, saveCheque, importCheques, removeCheque, setSettleEl,
    onSave, onCancel, onApprove, onReject, onResubmit, saveGl, glLater
  })
}
