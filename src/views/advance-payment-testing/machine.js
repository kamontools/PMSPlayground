// State machine for เงินทดรองจ่าย (testing version).
// Statuses, which actions are locked in each status (and why), and the transition helper.

export const STATUSES = [
  { value: 'awaiting-disburse', label: 'รอเบิก', tone: 'neutral' },
  { value: 'awaiting-clear', label: 'รอเคลียร์', tone: 'attention' },
  { value: 'awaiting-confirm', label: 'รอยืนยันเคลียร์', tone: 'primary' },
  { value: 'rejected', label: 'ไม่ผ่าน', tone: 'error' },
  { value: 'cleared', label: 'เคลียร์แล้ว', tone: 'success' },
  { value: 'cancelled', label: 'ยกเลิก', tone: 'muted' }
]

export const FILTERS = [{ value: 'all', label: 'ทั้งหมด' }, ...STATUSES]

export function statusMeta(status) {
  return STATUSES.find(s => s.value === status) || { value: status, label: status, tone: 'neutral' }
}

// No role gating in the prototype: everyone sees every action, so testers don't switch roles mid-task.
export const ACTOR = 'ผู้ใช้ทดสอบ'

// Clearing has been submitted (or decided), so the request itself is frozen.
export function hasClearing(status) {
  return ['awaiting-confirm', 'rejected', 'cleared'].includes(status)
}

// Editing the clearing document is allowed while it is being written, waiting, or sent back.
export function clearingEditable(status) {
  return ['awaiting-clear', 'awaiting-confirm', 'rejected'].includes(status)
}

const MSG_IN_CLEARING = 'ไม่สามารถดำเนินการได้ เนื่องจากเอกสารนี้อยู่ระหว่างเคลียร์ หากต้องการแก้ไขคำขอ กรุณายกเลิกคำขอเคลียร์ก่อน'
const MSG_REJECTED = 'ไม่สามารถดำเนินการได้ เนื่องจากเอกสารเคลียร์ของคำขอนี้ไม่ผ่านการอนุมัติ กรุณาแก้ไขเอกสารเคลียร์แล้วยื่นใหม่ หรือยกเลิกคำขอเคลียร์ก่อน'
const MSG_CLEARED = 'เนื่องจากเอกสารยืนยันการเคลียร์แล้ว ไม่สามารถแก้ไขหรือยกเลิกได้'
const MSG_CANCELLED = 'เอกสารนี้ถูกยกเลิกแล้ว ไม่สามารถแก้ไขได้'
const MSG_PAID = 'ไม่สามารถยกเลิกได้ เนื่องจากจ่ายเงินแล้ว หากต้องการยกเลิก กรุณาลบรายการชำระเงินแล้วบันทึกก่อน'

/**
 * Why an action is locked, or null when it is allowed.
 * page: 'request' | 'clear'
 * action: 'cancel' | 'save' | 'edit' (payments, files, expense rows)
 * Returns { title, message, goClear } — goClear offers a jump to the clearing document.
 */
export function guard(status, page, action) {
  if (status === 'cancelled') return { title: 'ไม่สามารถดำเนินการได้', message: MSG_CANCELLED }
  if (status === 'cleared') return { title: 'ไม่สามารถดำเนินการได้', message: MSG_CLEARED }
  if (page === 'request') {
    if (status === 'awaiting-confirm') return { title: 'ไม่สามารถดำเนินการได้', message: MSG_IN_CLEARING, goClear: true }
    if (status === 'rejected') return { title: 'ไม่สามารถดำเนินการได้', message: MSG_REJECTED, goClear: true }
    if (status === 'awaiting-clear' && action === 'cancel') return { title: 'ไม่สามารถยกเลิกได้', message: MSG_PAID }
  }
  return null
}

export const TRANSITION_LABELS = {
  create: 'สร้างคำขอ',
  pay: 'ระบุการชำระเงิน',
  unpay: 'ลบการชำระเงิน',
  cancel: 'ยกเลิกคำขอ',
  submitClear: 'ยื่นเอกสารเคลียร์',
  withdrawClear: 'ยกเลิกคำขอเคลียร์',
  reject: 'ไม่อนุมัติ',
  resubmit: 'ยื่นคำขออนุมัติอีกครั้ง',
  approve: 'อนุมัติ'
}

// Allowed edges: action -> [from statuses] -> to
const EDGES = {
  create: { from: [null], to: 'awaiting-disburse' },
  pay: { from: ['awaiting-disburse'], to: 'awaiting-clear' },
  unpay: { from: ['awaiting-clear'], to: 'awaiting-disburse' },
  cancel: { from: ['awaiting-disburse'], to: 'cancelled' },
  submitClear: { from: ['awaiting-clear'], to: 'awaiting-confirm' },
  withdrawClear: { from: ['awaiting-confirm', 'rejected'], to: 'awaiting-clear' },
  reject: { from: ['awaiting-confirm'], to: 'rejected' },
  resubmit: { from: ['rejected'], to: 'awaiting-confirm' },
  approve: { from: ['awaiting-confirm'], to: 'cleared' }
}

/** Move a document along an allowed edge and append to its log. Throws on an illegal move. */
export function transition(doc, action, { reason } = {}) {
  const edge = EDGES[action]
  const from = doc.status ?? null
  if (!edge || !edge.from.includes(from)) {
    throw new Error(`transition "${action}" not allowed from "${from}"`)
  }
  doc.status = edge.to
  doc.log.push({ action, from, to: edge.to, by: ACTOR, at: new Date().toISOString(), reason: reason || '' })
  return doc
}
