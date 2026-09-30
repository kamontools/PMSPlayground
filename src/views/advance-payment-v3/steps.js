// The three stages every เงินทดรองจ่าย goes through.
export const WORKFLOW_STEPS = [
  { key: 'request', title: 'สร้างคำขอ' },
  { key: 'disburse', title: 'เบิกเงิน' },
  { key: 'clear', title: 'เคลียร์เงิน' }
]

// status -> index of the step the item is currently on (3 = every step done)
export function stepIndexForStatus(status) {
  if (status === 'awaiting-disburse') return 1
  if (status === 'awaiting-clear') return 2
  if (status === 'cleared') return 3
  return 0
}

// 'done' | 'active' | 'pending' for step i when the item is on `current`
export function stepState(i, current) {
  if (i < current) return 'done'
  if (i === current) return 'active'
  return 'pending'
}
