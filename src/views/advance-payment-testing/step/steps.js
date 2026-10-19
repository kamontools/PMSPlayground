// Step version: maps the 6 statuses onto the 3 v3-style steps (สร้างคำขอ → เบิกเงิน → เคลียร์เงิน).
// รอยืนยันเคลียร์ and ไม่ผ่าน stay inside step 3 as sub-states.
import { fmtDate, fmtMoney, requestTotal } from '../store.js'

export const STEP_TITLES = ['สร้างคำขอ', 'เบิกเงิน', 'เคลียร์เงิน']

/** Which section a status is working on: 0 request, 1 disburse, 2 clear, 3 all done, -1 cancelled. */
export function currentStep(status) {
  switch (status) {
    case null: return 0
    case 'awaiting-disburse': return 1
    case 'awaiting-clear':
    case 'awaiting-confirm':
    case 'rejected': return 2
    case 'cleared': return 3
    case 'cancelled': return -1
    default: return 0
  }
}

/** 'done' | 'active' | 'pending' for section i (cancelled docs: only the request counts as done). */
export function sectionState(i, status) {
  const cur = currentStep(status)
  if (cur === -1) return i === 0 ? 'done' : 'pending'
  if (i < cur) return 'done'
  if (i === cur) return 'active'
  return 'pending'
}

const CLEAR_SUB = { 'awaiting-clear': 'กำลังทำ', 'awaiting-confirm': 'รออนุมัติ', rejected: 'ไม่ผ่าน · แก้ไขแล้วยื่นใหม่' }

/** Steps for StepperBar: [{ key, title, sub, state }]. */
export function buildSteps(doc, { payOpen = false } = {}) {
  const status = doc?.status ?? null
  const subs = [
    doc ? `บันทึก ${fmtDate(doc.createdAt)}` : 'กำลังทำ',
    !doc ? (payOpen ? 'กรอกพร้อมคำขอ' : 'ไม่บังคับ')
      : status === 'cancelled' ? 'ยกเลิกแล้ว'
      : status === 'awaiting-disburse' ? 'กำลังทำ'
      : `เบิกแล้ว ${fmtMoney(requestTotal(doc))} บาท`,
    status === 'cancelled' ? 'ยกเลิกแล้ว'
      : status === 'cleared' ? `เคลียร์แล้ว ${fmtDate(doc.clearing?.date)}`
      : CLEAR_SUB[status] || 'ยังไม่ถึง'
  ]
  return STEP_TITLES.map((title, i) => ({ key: `s${i}`, title, sub: subs[i], state: sectionState(i, status) }))
}
