// In-memory data for the testing versions: reference data, seed documents, and a per-version store
// (docs, navigation, the app-wide dialog, toast). All names below are fictional sample data.
import { reactive, provide, inject } from 'vue'
import { transition } from './machine.js'

// ---------- reference data ----------
export const VENDORS = [
  { id: 'V01', code: '10022', name: 'A-Z Company' },
  { id: 'V02', code: '00200', name: 'Water House' },
  { id: 'V03', code: '00160', name: 'Surgent' },
  { id: 'V04', code: 'S00001', name: 'Everything Jingle Bell' },
  { id: 'V05', code: 'E00012', name: 'พนักงานส่วนกลาง 01 (ตัวอย่าง)' },
  { id: 'V06', code: 'E00015', name: 'พนักงานส่วนกลาง 02 (ตัวอย่าง)' }
]
export function vendorById(id) { return VENDORS.find(v => v.id === id) }

export const PAY_TYPES = [
  { code: 'CQW', label: 'CQW : ถอนโดยเช็ค (เช็คจ่าย)', glAccount: '2-113-02' },
  { code: 'ATP', label: 'ATP : รายการบัญชีอัตโนมัติ (จ่าย)', glAccount: '1-112-01' },
  { code: 'CAW', label: 'CAW : ถอนเงินสด', glAccount: '1-111-01' }
]
export function payTypeByCode(code) { return PAY_TYPES.find(t => t.code === code) }

export const PAY_FROM_ACCOUNTS = [
  'ธนาคารตัวอย่าง A ออมทรัพย์ 000-0-00001-1',
  'ธนาคารตัวอย่าง B กระแสรายวัน 000-0-00002-2'
]
export const CHEQUE_STOCK = [
  { no: '00011201', book: 'B-0112' },
  { no: '00011202', book: 'B-0112' },
  { no: '00011203', book: 'B-0112' },
  { no: '00011204', book: 'B-0112' }
]
export const CHEQUE_STATUSES = ['N : ในมือ', 'P : ผ่านแล้ว', 'R : คืน']

export const GL_ACCOUNTS = [
  { code: '1-111-01', name: 'เงินสด' },
  { code: '1-111-02', name: 'เงินสดย่อย' },
  { code: '1-112-01', name: 'เงินฝากธนาคาร' },
  { code: '1-131-01', name: 'เงินทดรองจ่าย' },
  { code: '2-113-02', name: 'เช็คจ่าย' }
]
// Expense items use their own P00X codes (not GL codes) so they aren't confused with the chart of accounts;
// each one posts to a 5-xxx expense account.
export const EXPENSE_TYPES = [
  { code: 'P001', name: 'ค่าใช้จ่ายเบ็ดเตล็ด', account: '5-411-01' },
  { code: 'P002', name: 'ค่าดอกไม้', account: '5-412-01' },
  { code: 'P003', name: 'ค่าเครื่องดื่ม', account: '5-413-01' },
  { code: 'P004', name: 'ค่าเดินทาง', account: '5-414-01' },
  { code: 'P005', name: 'ค่าซ่อมบำรุง', account: '5-415-01' },
  { code: 'P006', name: 'ค่าวัสดุสำนักงาน', account: '5-416-01' },
  { code: 'P007', name: 'ค่าจัดกิจกรรม', account: '5-417-01' }
]
export function expenseByCode(code) { return EXPENSE_TYPES.find(e => e.code === code) }
export const EXPENSE_ACCOUNTS = EXPENSE_TYPES.map(e => ({ code: e.account, name: e.name }))
export function accountName(code) {
  return [...GL_ACCOUNTS, ...EXPENSE_ACCOUNTS].find(a => a.code === code)?.name || ''
}

// Settling the difference when clearing: over-spent (company pays more) vs under-spent (money returned).
export const OVER_METHODS = [
  { value: 'cash', label: 'เงินสด' },
  { value: 'petty-cash', label: 'เงินสดย่อย' },
  { value: 'pv', label: 'ใบสำคัญจ่าย : PV' },
  { value: 'cheque', label: 'เช็ค' }
]
export const UNDER_METHODS = [
  { value: 'cash', label: 'เงินสด' },
  { value: 'receipt', label: 'ใบเสร็จ' },
  { value: 'transfer', label: 'เงินโอน (กรณีไม่เปิดใบเสร็จ)' },
  { value: 'other', label: 'อื่นๆ' }
]
export const PETTY_CASH_DOCS = ['690001', '690002', '690003']
export const PV_DOCS = ['PV-2026-0101', 'PV-2026-0102', 'PV-2026-0103']
export const RECEIPT_DOCS = ['RC-690015', 'RC-690016', 'RC-690017']
// Where the settled difference posts, by settlement method.
const SETTLE_ACCOUNTS = { cash: '1-111-01', 'petty-cash': '1-111-02', pv: '1-112-01', cheque: '2-113-02', receipt: '1-111-01', transfer: '1-112-01', other: '1-111-01' }

// Existing payment documents that can be linked via "นำเข้าเอกสาร".
const IMPORTABLE_SEED = [
  { id: 'IMP1', payDate: '2026-10-05', passDate: '2026-10-05', docNo: '6909000001', payeeCode: 'S00001', payeeName: 'Everything Jingle Bell', typeCode: 'CAW', amount: 24847.54, status: 'N' },
  { id: 'IMP2', payDate: '2026-10-08', passDate: '2026-10-09', docNo: '6909000002', payeeCode: '00200', payeeName: 'Water House', typeCode: 'ATP', amount: 5000, status: 'N' },
  { id: 'IMP3', payDate: '2026-10-10', passDate: '', docNo: '6909000003', payeeCode: '10022', payeeName: 'A-Z Company', typeCode: 'CQW', amount: 12000, status: 'N' },
  { id: 'IMP4', payDate: '2026-10-14', passDate: '2026-10-14', docNo: '6909000004', payeeCode: '00160', payeeName: 'Surgent', typeCode: 'CAW', amount: 3500, status: 'N' }
]

// ---------- helpers ----------
function pad(n) { return String(n).padStart(2, '0') }
export function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
/** ISO yyyy-mm-dd -> DD/MM/YYYY */
export function fmtDate(iso) {
  if (!iso) return '-'
  const [y, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}/${y}`
}
export function fmtMoney(n) {
  return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
export function clone(v) { return JSON.parse(JSON.stringify(v)) }
export function uid(prefix = 'id') { return `${prefix}-${Math.random().toString(36).slice(2, 9)}` }

export function requestTotal(doc) {
  return (doc.payments || []).reduce((s, p) => s + Number(p.amount || 0), 0)
}
export function clearTotal(clearing) {
  return (clearing?.rows || []).reduce((s, r) => s + Number(r.amount || 0), 0)
}
export function round2(n) { return Math.round(n * 100) / 100 }

// ---------- seed ----------
function pay(id, payDate, passDate, docNo, vendorId, typeCode, amount, extra = {}) {
  const v = vendorById(vendorId)
  return {
    id, payDate, passDate: typeCode === 'CQW' ? '' : passDate, docNo, payeeCode: v.code, payeeName: v.name, vendorId, typeCode, amount,
    status: 'N', account: PAY_FROM_ACCOUNTS[0], chequeNo: typeCode === 'CQW' ? docNo : '', chequeBook: typeCode === 'CQW' ? 'B-0112' : '',
    chequeStatus: 'N : ในมือ', note: '', ...extra
  }
}
function pvFor(doc, no) {
  const total = requestTotal(doc)
  const credits = {}
  doc.payments.forEach(p => {
    const acc = payTypeByCode(p.typeCode).glAccount
    credits[acc] = (credits[acc] || 0) + Number(p.amount)
  })
  return {
    no, date: doc.createdAt, detail: doc.description,
    lines: [
      { account: '1-131-01', detail: '', debit: total, credit: 0 },
      ...Object.entries(credits).map(([account, amt]) => ({ account, detail: '', debit: 0, credit: amt }))
    ]
  }
}
function file(name, size, date) { return { id: uid('f'), name, size, date } }
function logEntry(action, from, to, by, at, reason = '') { return { action, from, to, by, at, reason } }

function seedDocs() {
  const docs = []
  const REQUESTED = { 1: 8000, 2: 12000, 3: 12000, 4: 15000, 5: 12000, 6: 8000, 7: 12000, 8: 3000, 9: 10000, 10: 4500 }
  const base = (n, status, createdAt, dueDate, vendorId, description, extra = {}) => ({
    id: `D${n}`, docNo: `69000${pad(n)}`, status, createdAt, dueDate, vendorId, description, requestedAmount: REQUESTED[n],
    files: [], payments: [], pv: null, clearing: null, rejection: null, cancellation: null, log: [], ...extra
  })

  // รอเบิก
  docs.push(base(1, 'awaiting-disburse', '2026-10-15', '2026-10-30', 'V05', 'ค่าจัดซื้ออุปกรณ์สำนักงานส่วนกลาง', {
    log: [logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-10-15T09:10:00+07:00')]
  }))
  docs.push(base(2, 'awaiting-disburse', '2026-10-16', '2026-11-05', 'V01', 'เบิกเงินจัดประชุมใหญ่สามัญประจำปี (ค่าสถานที่ อาหารว่าง ของที่ระลึก)', {
    log: [logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-10-16T10:00:00+07:00')]
  }))

  // รอเคลียร์ (ยังไม่ลงบัญชี)
  const d3 = base(3, 'awaiting-clear', '2026-10-07', '2026-10-21', 'V01', 'จัดประชุมใหญ่สามัญประจำปี', {
    files: [file('มติประชุม.pdf', 820 * 1024, '2026-10-15')],
    payments: [pay('P31', '2026-10-07', '2026-10-09', '00011101', 'V01', 'CQW', 12000)]
  })
  d3.log = [logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-10-07T09:00:00+07:00'), logEntry('pay', 'awaiting-disburse', 'awaiting-clear', 'ส่วนกลาง', '2026-10-07T14:00:00+07:00')]
  docs.push(d3)

  // รอเคลียร์ (ลงบัญชีแล้ว)
  const d4 = base(4, 'awaiting-clear', '2026-10-02', '2026-10-16', 'V03', 'สำรองจ่ายค่าซ่อมบำรุงปั๊มน้ำส่วนกลาง', {
    payments: [
      pay('P41', '2026-10-02', '2026-10-02', '00181', 'V03', 'ATP', 10000),
      pay('P42', '2026-10-02', '2026-10-02', '00141', 'V03', 'CAW', 5000)
    ]
  })
  d4.pv = pvFor(d4, 'PV-6900004')
  d4.log = [logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-10-02T09:00:00+07:00'), logEntry('pay', 'awaiting-disburse', 'awaiting-clear', 'ส่วนกลาง', '2026-10-02T11:00:00+07:00')]
  docs.push(d4)

  // รอยืนยันเคลียร์
  const d5 = base(5, 'awaiting-confirm', '2026-09-28', '2026-10-12', 'V01', 'จัดงานประชุมคณะกรรมการ', {
    files: [file('มติประชุม.pdf', 820 * 1024, '2026-10-15')],
    payments: [pay('P51', '2026-09-28', '2026-09-30', '10002', 'V01', 'CQW', 12000)]
  })
  d5.pv = pvFor(d5, 'PV-6900005')
  d5.clearing = {
    docNo: 'CL6900005', date: '2026-10-10', note: '', files: [file('ใบเสร็จค่าส่วนกลาง-ตัวอย่าง.pdf', 1.2 * 1024 * 1024, '2026-10-15')],
    rows: [
      { id: 'R51', code: 'P002', detail: 'ประดับงานประชุม', amount: 4000 },
      { id: 'R52', code: 'P003', detail: 'เอาไว้เสิร์ฟแขก', amount: 4000 },
      { id: 'R53', code: 'P003', detail: 'เอาไว้เสิร์ฟแขก', amount: 4000 }
    ],
    settle: { method: '', amount: null, docRef: '', account: '', date: '', note: '', payments: [] }
  }
  d5.log = [
    logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-09-28T09:00:00+07:00'),
    logEntry('pay', 'awaiting-disburse', 'awaiting-clear', 'ส่วนกลาง', '2026-09-28T13:00:00+07:00'),
    logEntry('submitClear', 'awaiting-clear', 'awaiting-confirm', 'ผู้เบิก', '2026-10-10T16:00:00+07:00')
  ]
  docs.push(d5)

  // ไม่ผ่าน
  const d6 = base(6, 'rejected', '2026-09-20', '2026-10-05', 'V04', 'ค่าตกแต่งสถานที่งานลอยกระทง', {
    payments: [pay('P61', '2026-09-20', '2026-09-20', '00145', 'V04', 'CAW', 8000)]
  })
  d6.pv = pvFor(d6, 'PV-6900006')
  d6.clearing = {
    docNo: 'CL6900006', date: '2026-10-04', note: '', files: [],
    rows: [{ id: 'R61', code: 'P007', detail: 'ดอกไม้และอุปกรณ์ตกแต่ง', amount: 6500 }],
    settle: { method: 'cash', amount: 1500, docRef: '', account: '', date: '', note: '', payments: [] }
  }
  d6.rejection = { reason: 'ไม่มีใบเสร็จแนบสำหรับค่าตกแต่ง กรุณาแนบหลักฐานให้ครบ', by: 'ผู้อนุมัติ', at: '2026-10-06T10:30:00+07:00' }
  d6.log = [
    logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-09-20T09:00:00+07:00'),
    logEntry('pay', 'awaiting-disburse', 'awaiting-clear', 'ส่วนกลาง', '2026-09-20T13:00:00+07:00'),
    logEntry('submitClear', 'awaiting-clear', 'awaiting-confirm', 'ผู้เบิก', '2026-10-04T16:00:00+07:00'),
    logEntry('reject', 'awaiting-confirm', 'rejected', 'ผู้อนุมัติ', '2026-10-06T10:30:00+07:00', 'ไม่มีใบเสร็จแนบสำหรับค่าตกแต่ง กรุณาแนบหลักฐานให้ครบ')
  ]
  docs.push(d6)

  // เคลียร์แล้ว
  const d7 = base(7, 'cleared', '2026-09-10', '2026-09-25', 'V01', 'จัดประชุมไฮบริด ไตรมาส 3', {
    files: [file('มติประชุม.pdf', 820 * 1024, '2026-09-15')],
    payments: [pay('P71', '2026-09-10', '2026-09-12', '10001', 'V01', 'CQW', 12000)]
  })
  d7.pv = pvFor(d7, 'PV-6900007')
  d7.clearing = {
    docNo: 'CL6900007', date: '2026-09-24', note: '', files: [file('ใบเสร็จค่าส่วนกลาง-ตัวอย่าง.pdf', 1.2 * 1024 * 1024, '2026-09-24')],
    rows: [
      { id: 'R71', code: 'P002', detail: 'ประดับงานประชุม', amount: 4000 },
      { id: 'R72', code: 'P003', detail: 'เอาไว้เสิร์ฟแขก', amount: 8000 }
    ],
    settle: { method: '', amount: null, docRef: '', account: '', date: '', note: '', payments: [] }
  }
  d7.clearing.gl = buildClearingGl(d7, d7.clearing, 'JV-6900007')
  d7.log = [
    logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-09-10T09:00:00+07:00'),
    logEntry('pay', 'awaiting-disburse', 'awaiting-clear', 'ส่วนกลาง', '2026-09-10T13:00:00+07:00'),
    logEntry('submitClear', 'awaiting-clear', 'awaiting-confirm', 'ผู้เบิก', '2026-09-24T16:00:00+07:00'),
    logEntry('approve', 'awaiting-confirm', 'cleared', 'ผู้อนุมัติ', '2026-09-25T10:00:00+07:00')
  ]
  docs.push(d7)

  // รอเคลียร์ (U4: ใช้เงินไม่หมด)
  const d9 = base(9, 'awaiting-clear', '2026-10-08', '2026-10-22', 'V02', 'จัดประชุมใหญ่สามัญประจำปี (อาคาร B)', {
    payments: [pay('P91', '2026-10-08', '2026-10-08', '00191', 'V02', 'ATP', 10000)]
  })
  d9.log = [logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-10-08T09:00:00+07:00'), logEntry('pay', 'awaiting-disburse', 'awaiting-clear', 'ส่วนกลาง', '2026-10-08T13:00:00+07:00')]
  docs.push(d9)

  // รอเคลียร์ ยังไม่ลงบัญชี (U8)
  const d10 = base(10, 'awaiting-clear', '2026-10-12', '2026-10-26', 'V03', 'สำรองจ่ายค่าเปลี่ยนหลอดไฟทางเดินส่วนกลาง', {
    payments: [pay('P101', '2026-10-12', '2026-10-12', '00201', 'V03', 'CAW', 4500)]
  })
  d10.log = [logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-10-12T09:00:00+07:00'), logEntry('pay', 'awaiting-disburse', 'awaiting-clear', 'ส่วนกลาง', '2026-10-12T15:00:00+07:00')]
  docs.push(d10)

  // ยกเลิก
  const d8 = base(8, 'cancelled', '2026-09-05', '2026-09-20', 'V06', 'ค่าเดินทางไปอบรม (ยกเลิกการอบรม)')
  d8.cancellation = { by: 'ผู้เบิก', at: '2026-09-08T11:00:00+07:00' }
  d8.log = [logEntry('create', null, 'awaiting-disburse', 'ผู้เบิก', '2026-09-05T09:00:00+07:00'), logEntry('cancel', 'awaiting-disburse', 'cancelled', 'ผู้เบิก', '2026-09-08T11:00:00+07:00')]
  docs.push(d8)

  return docs
}

// ---------- per-version store ----------
// Each prototype shell creates its own store (own docs, nav, dialog, reset) and provides it to its pages,
// so the classic and step versions never share data.
const STORE_KEY = Symbol('apt-store')
export function provideAptStore(store) { provide(STORE_KEY, store) }
export function useAptStore() { return inject(STORE_KEY) }

// One store per version, kept for the whole browser session so leaving the route doesn't wipe a test in progress
// (same as the original module-level state); only the Testing bar's reset or a page reload starts over.
const storesByVersion = {}
export function aptStoreFor(version) {
  if (!storesByVersion[version]) storesByVersion[version] = createAptStore()
  return storesByVersion[version]
}

export function createAptStore() {
  const state = reactive({
    docs: seedDocs(),
    importable: clone(IMPORTABLE_SEED),
    nav: { page: 'list', docId: null },
    seq: 11,
    postPay: null,
    toast: '',
    dialog: null
  })

  function docById(id) { return state.docs.find(d => d.id === id) }

  function nextDocNo() {
    const n = state.seq++
    return { id: `D${n}`, docNo: `69000${pad(n)}` }
  }

  let toastTimer = null
  function showToast(msg) {
    state.toast = msg
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { state.toast = '' }, 2600)
  }

  function resetAll() {
    state.docs = seedDocs()
    state.importable = clone(IMPORTABLE_SEED)
    state.seq = 11
    state.nav = { page: 'list', docId: null }
    state.dialog = null
    showToast('รีเซ็ตข้อมูลตัวอย่างแล้ว')
  }

  function go(page, docId = null) {
    state.nav = { page, docId }
    window.scrollTo({ top: 0 })
  }

  /**
   * Open the app-wide dialog and wait for the user's choice.
   * opts: { title, message, tone: 'success'|'warning'|'danger'|'info', confirmLabel, cancelLabel,
   *         secondaryLabel, reason: { label, max } (required textarea), summary: [{ label, value }], note: { title, text } }
   * Resolves { choice: 'confirm' | 'secondary' | 'cancel', reason }.
   */
  function ask(opts) {
    return new Promise(resolve => {
      state.dialog = { tone: 'info', cancelLabel: 'ปิด', ...opts, resolve }
    })
  }
  function closeDialog(choice, reason = '') {
    const d = state.dialog
    state.dialog = null
    d?.resolve({ choice, reason })
  }

  /** Success feedback after a save: a dialog the user closes, staying on the current page. note: { title, text } callout. */
  function notifySuccess(message, title = 'บันทึกสำเร็จแล้ว', note = null) {
    return ask({ title, message, note, tone: 'success', cancelLabel: 'ปิด' })
  }

  /** Show the guard message for a locked action; onGoClear runs when the user picks "ไปที่เอกสารเคลียร์". */
  async function warnLocked(lock, onGoClear) {
    const { choice } = await ask({
      title: lock.title, message: lock.message, tone: 'warning',
      cancelLabel: 'ปิด', confirmLabel: lock.goClear && onGoClear ? 'ไปที่เอกสารเคลียร์' : null
    })
    if (choice === 'confirm' && lock.goClear) onGoClear?.()
  }

  function move(doc, action, extra = {}) {
    return transition(doc, action, extra)
  }

  return { state, docById, nextDocNo, resetAll, go, showToast, ask, closeDialog, notifySuccess, warnLocked, move }
}

export function buildPv(doc, no) { return pvFor(doc, no) }

/**
 * Journal for approving a clearing, as specified for the prototype:
 * Dr เงินทดรองจ่าย (amount paid out) / Cr each expense account, with the settled difference balancing it.
 */
export function buildClearingGl(doc, clearing, no = '') {
  const req = requestTotal(doc)
  const diff = round2(clearTotal(clearing) - req)
  const credits = {}
  clearing.rows.forEach(r => {
    const acc = expenseByCode(r.code)?.account || '5-411-01'
    credits[acc] = round2((credits[acc] || 0) + Number(r.amount))
  })
  const lines = [
    { account: '1-131-01', detail: '', debit: req, credit: 0 },
    ...Object.entries(credits).map(([account, amt]) => ({ account, detail: '', debit: 0, credit: amt }))
  ]
  const settleAcc = SETTLE_ACCOUNTS[clearing.settle?.method] || '1-111-01'
  if (diff > 0) lines.push({ account: settleAcc, detail: 'ชำระส่วนที่เกิน', debit: diff, credit: 0 })
  if (diff < 0) lines.push({ account: settleAcc, detail: 'รับคืนส่วนที่เหลือ', debit: 0, credit: -diff })
  return { no, date: clearing.date, detail: `เคลียร์เงินทดรองจ่าย ${doc.docNo}`, lines }
}
