// Request-side logic (fields, payments, PV, T1/T2/T3/T4) shared by the classic and step versions.
// Returns a reactive object so templates can read `rf.draft`, `rf.locked`, … without `.value`.
import { ref, reactive, computed, onMounted } from 'vue'
import { guard, ACTOR } from './machine.js'
import { useAptStore, VENDORS, requestTotal, round2, clone, todayIso, fmtDate, fmtMoney, PAY_FROM_ACCOUNTS } from './store.js'

/**
 * opts.docId          — null for a new request
 * opts.detailPage     — nav page that shows a single request ('request' classic, 'detail' step)
 * opts.onGoClear      — how "ไปที่เอกสารเคลียร์" reaches the clearing (navigate vs. scroll)
 * opts.onPaymentAdded — called after a payment row is added/imported (classic uses it to dismiss the coach mark)
 */
export function useRequestForm({ docId = null, detailPage = 'request', onGoClear, onPaymentAdded } = {}) {
  const { state, docById, nextDocNo, go, ask, warnLocked, move, showToast, notifySuccess, refreshing } = useAptStore()

  const isNew = !docId
  const doc = isNew ? null : docById(docId)
  const status = computed(() => doc?.status ?? null)

  function blankDraft() {
    return { createdAt: todayIso(), dueDate: '', vendorId: '', description: '', requestedAmount: null, files: [], payments: [] }
  }
  function draftOf(d) {
    return { createdAt: d.createdAt, dueDate: d.dueDate, vendorId: d.vendorId, description: d.description, requestedAmount: d.requestedAmount ?? null, files: clone(d.files), payments: clone(d.payments) }
  }
  const draft = reactive(isNew ? blankDraft() : draftOf(doc))
  // unsaved edits: the form no longer matches the saved request (or the blank form)
  const blankSnap = JSON.stringify(draft)
  const dirty = computed(() => JSON.stringify(draft) !== (isNew ? blankSnap : JSON.stringify(draftOf(doc))))
  const errors = reactive({ createdAt: false, requestedAmount: false, vendorId: false, description: false })

  // Form edits are frozen once the request is in clearing, cleared or cancelled.
  const locked = computed(() => !isNew && !!guard(status.value, 'request', 'edit'))
  function warnEdit() { warnLocked(guard(status.value, 'request', 'edit'), onGoClear) }

  // ---------- payments ----------
  const paymentDlg = ref(null)
  const importOpen = ref(false)
  // new payment rows start with whatever is still unpaid against the requested amount
  const unpaid = computed(() => Math.max(0, round2(Number(draft.requestedAmount || 0) - requestTotal(draft))) || null)
  function openPayment(payment) { paymentDlg.value = { payment } }
  function savePayment(p) {
    const i = draft.payments.findIndex(x => x.id === p.id)
    if (i >= 0) draft.payments.splice(i, 1, p)
    else draft.payments.push(p)
    paymentDlg.value = null
    onPaymentAdded?.()
    showToast('เพิ่มรายการชำระแล้ว กดบันทึกเพื่อยืนยัน')
  }
  async function removePayment(p) {
    const { choice } = await ask({ title: 'ลบรายการชำระ', tone: 'danger', message: `ต้องการลบรายการ ${p.docNo} จำนวน ${fmtMoney(p.amount)} บาท ออกจากคำขอนี้หรือไม่ (มีผลเมื่อกดบันทึก)`, cancelLabel: 'ยกเลิก', confirmLabel: 'ลบรายการ' })
    if (choice === 'confirm') draft.payments.splice(draft.payments.indexOf(p), 1)
  }
  function openImport() { importOpen.value = true }
  function importPayments(list) {
    list.forEach(r => {
      const vendor = VENDORS.find(v => v.code === r.payeeCode)
      draft.payments.push({
        ...clone(r), imported: true, vendorId: vendor?.id || draft.vendorId, account: PAY_FROM_ACCOUNTS[0],
        chequeNo: r.typeCode === 'CQW' ? r.docNo : '', chequeBook: '', chequeStatus: 'N : ในมือ', note: ''
      })
    })
    importOpen.value = false
    onPaymentAdded?.()
    showToast(`ผูกเอกสาร ${list.length} รายการแล้ว กดบันทึกเพื่อยืนยัน`)
  }

  // ---------- save ----------
  function validate() {
    errors.createdAt = !draft.createdAt
    errors.vendorId = !draft.vendorId
    errors.description = !draft.description.trim()
    errors.requestedAmount = !(Number(draft.requestedAmount) > 0)
    const firstBad = ['createdAt', 'vendorId', 'requestedAmount', 'description'].find(k => errors[k])
    if (firstBad) {
      document.getElementById({ createdAt: 'rq-created', requestedAmount: 'rq-amount', vendorId: 'rq-vendor', description: 'rq-desc' }[firstBad])?.focus()
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

  /** Returns true once something was saved (callers use it to leave edit mode). */
  async function onSave() {
    if (!isNew) {
      const lock = guard(status.value, 'request', 'save')
      if (lock) { warnLocked(lock, onGoClear); return false }
    }
    if (!validate()) return false

    if (isNew) {
      const ids = nextDocNo()
      const created = { ...ids, status: null, pv: null, clearing: null, rejection: null, cancellation: null, log: [], payments: [], files: [] }
      commit(created)
      move(created, 'create')
      state.docs.unshift(created)
      // the success dialog comes first, on the create page; closing it opens the saved request
      if (created.payments.length) {
        move(created, 'pay')
        const { choice } = await ask(postPayDialog(created))
        state.postPay = choice === 'confirm' ? created.id : null // the detail page opens the PV preview
        await refreshing(() => go(detailPage, created.id))
      } else {
        await notifySuccess(`สร้างคำขอ ${created.docNo} เรียบร้อยแล้ว สถานะ “รอเบิก”`)
        await refreshing(() => go(detailPage, created.id))
      }
      return true
    }

    // Saves below: the dialog comes first, then refreshing() applies the change behind a loading overlay.
    if (status.value === 'awaiting-disburse') {
      if (draft.payments.length) {
        const { choice } = await ask(postPayDialog({ ...doc, ...draft }))
        await refreshing(() => { commit(doc); move(doc, 'pay') })
        if (choice === 'confirm') glDlg.value = { readonly: false }
      } else {
        await notifySuccess('บันทึกคำขอเรียบร้อยแล้ว')
        await refreshing(() => commit(doc))
      }
      return true
    }

    if (status.value === 'awaiting-clear' && !draft.payments.length) {
      const pvNote = doc.pv ? ` และกลับรายการบัญชี ${doc.pv.no}` : ''
      const { choice } = await ask({
        title: 'ถอยกลับเป็น “รอเบิก”', tone: 'warning', cancelLabel: 'ยกเลิก', confirmLabel: 'ยืนยัน',
        message: `คำขอนี้ไม่มีรายการชำระเหลืออยู่ ระบบจะเปลี่ยนสถานะกลับเป็น “รอเบิก”${pvNote} ต้องการดำเนินการต่อหรือไม่`
      })
      if (choice !== 'confirm') return false
      const reversed = doc.pv?.no
      await notifySuccess(reversed ? `กลับรายการบัญชี ${reversed} แล้ว สถานะเปลี่ยนเป็น “รอเบิก”` : 'สถานะเปลี่ยนเป็น “รอเบิก” แล้ว')
      await refreshing(() => {
        commit(doc)
        doc.pv = null
        move(doc, 'unpay', { reason: reversed ? `กลับรายการ ${reversed}` : '' })
      })
      return true
    }

    await notifySuccess('บันทึกคำขอเรียบร้อยแล้ว')
    await refreshing(() => commit(doc))
    return true
  }

  /** Throw away unsaved edits (step version's "ยกเลิกการแก้ไข"). */
  function resetDraft() {
    Object.assign(draft, isNew ? blankDraft() : draftOf(doc))
    Object.keys(errors).forEach(k => { errors[k] = false })
  }

  // ---------- after paying: say what changed (รอเคลียร์, clear later) and why the PV button is there ----------
  const glDlg = ref(null)
  function postPayDialog(d = doc) {
    const due = d?.dueDate ? ` (ภายในวันที่ ${fmtDate(d.dueDate)})` : ''
    return {
      title: 'จ่ายชำระเรียบร้อยแล้ว', tone: 'success', cancelLabel: 'ปิด', confirmLabel: 'บันทึกบัญชีเลย',
      message: `คำขอ ${d.docNo} เปลี่ยนสถานะเป็น “รอเคลียร์” แล้ว คุณสามารถเคลียร์เงินภายหลังได้เมื่อใช้เงินเสร็จ${due}`,
      question: 'ต้องการบันทึกบัญชีของการจ่ายชำระนี้เลยหรือไม่'
    }
  }
  // a new request saved with payments, and the user chose “บันทึกบัญชีเลย”: open the PV preview here
  onMounted(() => {
    if (doc && state.postPay === doc.id) {
      state.postPay = null
      glDlg.value = { readonly: false }
    }
  })

  function saveGl(entry) {
    doc.pv = { no: `${entry.type}-${doc.docNo}`, ...entry }
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
    if (lock) return warnLocked(lock, onGoClear)
    const { choice } = await ask({
      title: 'ยกเลิกคำขอ', tone: 'danger', cancelLabel: 'ไม่ยกเลิก', confirmLabel: 'ยืนยันยกเลิกคำขอ',
      message: `ต้องการยกเลิกคำขอ ${doc.docNo} หรือไม่ เมื่อยกเลิกแล้วจะแก้ไขเอกสารนี้ไม่ได้อีก`
    })
    if (choice !== 'confirm') return
    await notifySuccess(`ยกเลิกคำขอ ${doc.docNo} เรียบร้อยแล้ว`, 'ยกเลิกคำขอสำเร็จ')
    await refreshing(() => {
      move(doc, 'cancel')
      doc.cancellation = { by: ACTOR, at: new Date().toISOString() }
    })
  }

  return reactive({
    isNew, doc, status, draft, dirty, errors, locked, unpaid, paymentDlg, importOpen, glDlg,
    warnEdit, openPayment, savePayment, removePayment, openImport, importPayments,
    onSave, resetDraft, onCancel, saveGl, glLater
  })
}
