// Step version: maps the 6 statuses onto 4 steps (สร้างคำขอ → จ่ายชำระ → เคลียร์เงิน → ยืนยันการเคลียร์).
// The page has 3 sections; the last step (approval) is reviewed inside the เคลียร์เงิน section.
import { fmtDate, fmtMoney, requestTotal } from '../store.js'

export const STEP_TITLES = ['สร้างคำขอ', 'จ่ายชำระ', 'เคลียร์เงิน', 'ยืนยันการเคลียร์']

/** Which step a status is working on: 0 request, 1 disburse, 2 clear, 3 approve, 4 all done, -1 cancelled. */
export function currentStep(status) {
  switch (status) {
    case null: return 0
    case 'awaiting-disburse': return 1
    case 'awaiting-clear': return 2
    case 'awaiting-confirm':
    case 'rejected': return 3
    case 'cleared': return 4
    case 'cancelled': return -1
    default: return 0
  }
}

/** 'done' | 'active' | 'pending' for step i (cancelled docs: only the request counts as done). */
export function stepState(i, status) {
  const cur = currentStep(status)
  if (cur === -1) return i === 0 ? 'done' : 'pending'
  if (i < cur) return 'done'
  if (i === cur) return 'active'
  return 'pending'
}

/** Section shown for step i (the approval step lives in the clearing section). */
export const sectionOfStep = i => Math.min(i, 2)

/** State of section s: the clearing section stays active while it's sent back (ไม่ผ่าน). */
export function sectionState(s, status) {
  if (s === 2 && status === 'rejected') return 'active'
  return stepState(s, status)
}

// รอเคลียร์ isn't urgent: people clear weeks later, once the money is spent
const CLEAR_SUB = { 'awaiting-clear': 'ทำได้เมื่อใช้เงินเสร็จ' }
const CONFIRM_SUB = { 'awaiting-confirm': 'รออนุมัติ', rejected: 'ไม่ผ่าน · แก้ไขแล้วยื่นใหม่', cleared: 'อนุมัติแล้ว' }

/** Steps for StepperBar: [{ key, title, sub, state }]. */
export function buildSteps(doc) {
  const status = doc?.status ?? null
  const gone = status === 'cancelled' && 'ยกเลิกแล้ว'
  const subs = [
    doc ? `บันทึก ${fmtDate(doc.createdAt)}` : 'กำลังทำ',
    gone || (!doc ? 'หลังบันทึกคำขอ' : status === 'awaiting-disburse' ? 'กำลังทำ' : `จ่ายแล้ว ${fmtMoney(requestTotal(doc))} บาท`),
    gone || CLEAR_SUB[status] || (doc?.clearing && ['awaiting-confirm', 'rejected', 'cleared'].includes(status) ? `ยื่นแล้ว ${fmtDate(doc.clearing.date)}` : 'ยังไม่ถึง'),
    gone || CONFIRM_SUB[status] || 'ยังไม่ถึง'
  ]
  return STEP_TITLES.map((title, i) => ({ key: `s${i}`, title, sub: subs[i], state: stepState(i, status) }))
}
