// The three stages every เงินทดรองจ่าย goes through, shared by the 3D scene and the guide panels.
export const WORKFLOW_STEPS = [
  {
    key: 'request',
    title: 'สร้างคำขอ',
    subtitle: 'บันทึกคำขอเงินทดรองจ่าย',
    who: 'ผู้เบิก / เจ้าหน้าที่บัญชี',
    todo: [
      'ระบุวันที่บันทึกและวันครบกำหนดเคลียร์',
      'ใส่คำอธิบายและชื่อผู้เบิก',
      'แนบเอกสารประกอบ (ถ้ามี)'
    ],
    result: 'awaiting-disburse'
  },
  {
    key: 'disburse',
    title: 'เบิกเงิน',
    subtitle: 'จ่ายเงินให้ผู้เบิก',
    who: 'ฝ่ายการเงิน',
    todo: [
      'เลือกวิธีการชำระ (เงินสด / โอน / เช็ค ฯลฯ)',
      'ระบุจำนวนเงินที่จ่ายจริง',
      'กดบันทึกวิธีการชำระ'
    ],
    result: 'awaiting-clear'
  },
  {
    key: 'clear',
    title: 'เคลียร์เงิน',
    subtitle: 'ปิดยอดด้วยค่าใช้จ่ายจริง',
    who: 'ผู้เบิก + ฝ่ายบัญชี',
    todo: [
      'เพิ่มรายการค่าใช้จ่ายตามใบเสร็จ',
      'ตรวจยอดรวมเทียบกับยอดเบิก',
      'ถ้ายอดไม่ตรง ระบุวิธีคืน/จ่ายส่วนต่าง'
    ],
    result: 'cleared'
  }
]

// status -> index of the step the item is currently on (3 = every step done)
export function stepIndexForStatus(status) {
  if (status === 'awaiting-disburse') return 1
  if (status === 'awaiting-clear') return 2
  if (status === 'cleared') return 3
  return 0
}
