import { reactive, ref, computed, watch } from 'vue'

// Shared state for the self-onboard wizard (Intro + Setup).
// Sample data only — fictional project, no real customer data (PDPA).

const STORAGE_KEY = 'los-sso-wizard-v1'

export const SECTIONS = [
  {
    key: 'general', no: 1, title: 'ข้อมูลทั่วไป', sub: 'โครงการ & รอบบัญชี', mins: 10,
    items: [
      { key: 'project', title: 'ข้อมูลโครงการ' },
      { key: 'accounting', title: 'รอบบัญชี & วันเริ่มใช้ระบบ' },
    ],
  },
  {
    key: 'ar', no: 2, title: 'ข้อมูล AR', sub: 'รายรับ & การแจ้งหนี้', mins: 30,
    items: [
      { key: 'arOverview', title: 'ลำดับรายการ (1-11 ข้อมูลพื้นฐาน)' },
      { key: 'incomes', title: 'รายการและราคารายรับ' },
      { key: 'unitRules', title: 'เงื่อนไขการแจ้งหนี้ของแต่ละห้อง/บ้าน' },
      { key: 'billCycle', title: 'รอบวันที่แจ้งหนี้ / วันครบกำหนดจ่าย' },
      { key: 'billSets', title: 'ชุดเรียกเก็บ' },
      { key: 'penalty', title: 'อัตราค่าปรับ' },
      { key: 'billPayment', title: 'Bill Payment' },
    ],
  },
  {
    key: 'gl', no: 3, title: 'ข้อมูล GL', sub: 'รายจ่าย & นโยบายบัญชี', mins: 15,
    items: [
      { key: 'glOverview', title: 'ลำดับรายการ' },
      { key: 'expenses', title: 'รายจ่าย' },
      { key: 'policy', title: 'นโยบายบันทึกบัญชี' },
    ],
  },
  {
    key: 'ap', no: 4, title: 'ข้อมูล AP', sub: 'ผังบัญชี & การผูกบัญชี', mins: 20,
    items: [
      { key: 'apOverview', title: 'ลำดับรายการ' },
      { key: 'coa', title: 'ผังบัญชี' },
      { key: 'incomeMap', title: 'เซ็ตรายรับ' },
      { key: 'expenseMap', title: 'เซ็ตรายจ่าย' },
      { key: 'favorites', title: 'บัญชีใช้บ่อย' },
    ],
  },
]

export const ALL_ITEMS = SECTIONS.flatMap(s => s.items.map(i => ({ ...i, section: s.key })))
export const TOTAL_MINS = SECTIONS.reduce((n, s) => n + s.mins, 0)

export const BASE_DATASETS = [
  'ข้อมูลโครงการ / นิติบุคคล',
  'ทะเบียนห้อง/บ้าน',
  'พื้นที่ (ตร.ม.) / อัตราส่วนกรรมสิทธิ์',
  'เจ้าของร่วม / สมาชิก',
  'ทะเบียนมิเตอร์น้ำ',
  'รายการรายรับ',
  'รายการรายจ่าย',
  'ผังบัญชี',
  'ผู้ขาย / supplier',
  'ยอดหนี้ค้างชำระเดิม',
  'เงินรับล่วงหน้า / เงินประกัน',
]

export const RATE_TYPES = {
  area: { label: 'ต่อ ตร.ม.', unit: 'บาท/ตร.ม./เดือน' },
  fixed: { label: 'คงที่ต่อห้อง', unit: 'บาท/ห้อง/เดือน' },
  meter: { label: 'ตามมิเตอร์', unit: 'บาท/หน่วย' },
}

export const FREQS = {
  monthly: { label: 'รายเดือน', months: 1 },
  quarterly: { label: 'รายไตรมาส', months: 3 },
  yearly: { label: 'รายปี', months: 12 },
}

export const BANKS = ['ธนาคารกสิกรไทย', 'ธนาคารไทยพาณิชย์', 'ธนาคารกรุงเทพ', 'ธนาคารกรุงไทย', 'ธนาคารกรุงศรีอยุธยา']

// Standard CoA template for a juristic person (นิติบุคคลอาคารชุด/หมู่บ้านจัดสรร)
export const PRESET_COA = [
  { code: '1111-00', name: 'เงินสด', type: 'asset' },
  { code: '1112-00', name: 'เงินฝากธนาคาร - ออมทรัพย์', type: 'asset' },
  { code: '1113-00', name: 'เงินฝากธนาคาร - กระแสรายวัน', type: 'asset' },
  { code: '1130-00', name: 'ลูกหนี้ค่าส่วนกลาง', type: 'asset' },
  { code: '1131-00', name: 'ลูกหนี้ค่าน้ำประปา', type: 'asset' },
  { code: '1132-00', name: 'ลูกหนี้อื่น', type: 'asset' },
  { code: '2110-00', name: 'เจ้าหนี้การค้า', type: 'liability' },
  { code: '2120-00', name: 'เงินรับล่วงหน้า', type: 'liability' },
  { code: '2130-00', name: 'ภาษีหัก ณ ที่จ่ายค้างจ่าย', type: 'liability' },
  { code: '3100-00', name: 'เงินกองทุน', type: 'equity' },
  { code: '4101-00', name: 'รายได้ค่าส่วนกลาง', type: 'income' },
  { code: '4102-00', name: 'รายได้ค่าน้ำประปา', type: 'income' },
  { code: '4103-00', name: 'รายได้ค่าที่จอดรถ', type: 'income' },
  { code: '4104-00', name: 'รายได้ค่าปรับ', type: 'income' },
  { code: '4190-00', name: 'รายได้อื่น', type: 'income' },
  { code: '5101-00', name: 'ค่ารักษาความปลอดภัย', type: 'expense' },
  { code: '5102-00', name: 'ค่าทำความสะอาด', type: 'expense' },
  { code: '5103-00', name: 'ค่าไฟฟ้าส่วนกลาง', type: 'expense' },
  { code: '5104-00', name: 'ค่าน้ำประปาส่วนกลาง', type: 'expense' },
  { code: '5105-00', name: 'ค่าซ่อมแซมบำรุงรักษา', type: 'expense' },
  { code: '5106-00', name: 'ค่าบริหารจัดการ', type: 'expense' },
  { code: '5190-00', name: 'ค่าใช้จ่ายอื่น', type: 'expense' },
]

export const ACCOUNT_TYPES = {
  asset: 'สินทรัพย์', liability: 'หนี้สิน', equity: 'ทุน', income: 'รายได้', expense: 'ค่าใช้จ่าย',
}

// Finance setup (AR/GL/AP) is shown as one combined topic on the overview page
export const FINANCE_SECTIONS = SECTIONS.filter(s => s.key !== 'general')
export const FINANCE_KEYS = new Set(FINANCE_SECTIONS.flatMap(s => s.items.map(i => i.key)))

export const INCOME_PRESETS = [
  { name: 'เงินกองทุน', rateType: 'area', rate: 0 },
  { name: 'ค่าเก็บขยะ', rateType: 'fixed', rate: 0 },
  { name: 'ค่าบัตรผ่านเข้า-ออก', rateType: 'fixed', rate: 0 },
  { name: 'ค่าเช่าพื้นที่ส่วนกลาง', rateType: 'fixed', rate: 0 },
]
export const EXPENSE_PRESETS = ['ค่าน้ำประปาส่วนกลาง', 'ค่าบริหารจัดการ', 'ค่าเบี้ยประกันภัยอาคาร', 'ค่าสอบบัญชี']
export const DEFAULT_FAVORITE_PICKS = ['1111-00', '1112-00', '1130-00', '2110-00', '4101-00']

// Quick-setup templates: pick one to prefill AR/GL/AP, still editable at every step afterward
export const TEMPLATES = {
  basic: {
    label: 'Basic', mins: 10,
    desc: 'เรียกเก็บค่าส่วนกลางอย่างเดียว เหมาะกับโครงการเล็กที่ยังไม่มีค่าใช้จ่ายซับซ้อน',
    incomes: [
      { code: 'R01', name: 'ค่าส่วนกลาง', rateType: 'area', rate: 35 },
    ],
    billSets: [
      { name: 'ชุดแจ้งหนี้รายเดือน', freq: 'monthly', incomes: ['R01'] },
    ],
    penalty: { none: true, type: 'percent', value: 12, graceDays: 0, stepAfter: 6, stepValue: 20 },
    expenses: [
      { code: 'E01', name: 'ค่ารักษาความปลอดภัย' },
      { code: 'E02', name: 'ค่าทำความสะอาด' },
      { code: 'E03', name: 'ค่าไฟฟ้าส่วนกลาง' },
    ],
    policy: { basis: 'accrual', revenue: 'invoice', advance: 'liability', wht: true },
  },
  standard: {
    label: 'Standard', mins: 20, recommended: true,
    desc: 'ค่าส่วนกลาง + ค่าน้ำตามมิเตอร์ + ที่จอดรถคันที่สอง พร้อมค่าปรับชำระล่าช้า เหมาะกับโครงการทั่วไป',
    incomes: [
      { code: 'R01', name: 'ค่าส่วนกลาง', rateType: 'area', rate: 35 },
      { code: 'R02', name: 'ค่าน้ำประปา', rateType: 'meter', rate: 18 },
      { code: 'R03', name: 'ค่าที่จอดรถ (คันที่ 2)', rateType: 'fixed', rate: 500 },
    ],
    billSets: [
      { name: 'ชุดแจ้งหนี้รายเดือน', freq: 'monthly', incomes: ['R01', 'R02', 'R03'] },
    ],
    penalty: { none: false, type: 'percent', value: 12, graceDays: 0, stepAfter: 6, stepValue: 20 },
    expenses: [
      { code: 'E01', name: 'ค่ารักษาความปลอดภัย' },
      { code: 'E02', name: 'ค่าทำความสะอาด' },
      { code: 'E03', name: 'ค่าไฟฟ้าส่วนกลาง' },
      { code: 'E04', name: 'ค่าซ่อมแซมบำรุงรักษา' },
    ],
    policy: { basis: 'accrual', revenue: 'invoice', advance: 'liability', wht: true },
  },
  advanced: {
    label: 'Advanced', mins: 40,
    desc: 'ครบทุกรายรับ-รายจ่าย พร้อมเงินกองทุน ค่าปรับขั้นบันได และรอบเรียกเก็บรายปีแยกต่างหาก เหมาะกับโครงการขนาดใหญ่',
    incomes: [
      { code: 'R01', name: 'ค่าส่วนกลาง', rateType: 'area', rate: 35 },
      { code: 'R02', name: 'ค่าน้ำประปา', rateType: 'meter', rate: 18 },
      { code: 'R03', name: 'ค่าที่จอดรถ (คันที่ 2)', rateType: 'fixed', rate: 500 },
      { code: 'R04', name: 'เงินกองทุน', rateType: 'area', rate: 5 },
      { code: 'R05', name: 'ค่าเก็บขยะ', rateType: 'fixed', rate: 50 },
    ],
    billSets: [
      { name: 'ชุดแจ้งหนี้รายเดือน', freq: 'monthly', incomes: ['R01', 'R02', 'R03', 'R05'] },
      { name: 'ชุดแจ้งหนี้รายปี', freq: 'yearly', incomes: ['R04'] },
    ],
    penalty: { none: false, type: 'step', value: 12, graceDays: 0, stepAfter: 6, stepValue: 20 },
    expenses: [
      { code: 'E01', name: 'ค่ารักษาความปลอดภัย' },
      { code: 'E02', name: 'ค่าทำความสะอาด' },
      { code: 'E03', name: 'ค่าไฟฟ้าส่วนกลาง' },
      { code: 'E04', name: 'ค่าน้ำประปาส่วนกลาง' },
      { code: 'E05', name: 'ค่าซ่อมแซมบำรุงรักษา' },
      { code: 'E06', name: 'ค่าบริหารจัดการ' },
      { code: 'E07', name: 'ค่าเบี้ยประกันภัยอาคาร' },
    ],
    policy: { basis: 'accrual', revenue: 'invoice', advance: 'liability', wht: true },
  },
}

function defaults() {
  return {
    started: false,
    demo: false,
    current: 'project',
    visited: [],
    live: false,
    general: {
      name: 'โครงการตัวอย่าง เดอะลิฟวิ่ง วิลล์',
      type: 'village',
      taxId: '',
      address: '',
      prefix: '777',
      units: 450,
      startDate: '',
      fiscalStartMonth: 1,
    },
    arOverview: { ack: false, ready: BASE_DATASETS.map(() => false) },
    incomes: [
      { code: 'R01', name: 'ค่าส่วนกลาง', rateType: 'area', rate: 35 },
      { code: 'R02', name: 'ค่าน้ำประปา', rateType: 'meter', rate: 18 },
      { code: 'R03', name: 'ค่าที่จอดรถ (คันที่ 2)', rateType: 'fixed', rate: 500 },
    ],
    unitRules: {
      mode: 'rules',
      rules: [{ id: 1, from: 1, to: 450, incomes: ['R01', 'R02'] }],
      importResult: null,
    },
    billCycle: { issueDay: 25, dueDays: 15 },
    billSets: [{ id: 1, name: 'ชุดแจ้งหนี้รายเดือน', freq: 'monthly', incomes: ['R01', 'R02'] }],
    penalty: { none: false, type: 'percent', value: 12, graceDays: 0, stepAfter: 6, stepValue: 20 },
    billPayment: { has: null, bank: '', billerId: '', suffix: '' },
    glOverview: { ack: false },
    expenses: [
      { code: 'E01', name: 'ค่ารักษาความปลอดภัย' },
      { code: 'E02', name: 'ค่าทำความสะอาด' },
      { code: 'E03', name: 'ค่าไฟฟ้าส่วนกลาง' },
      { code: 'E04', name: 'ค่าซ่อมแซมบำรุงรักษา' },
    ],
    policy: { basis: 'accrual', revenue: 'invoice', advance: 'liability', wht: true, confirmed: false },
    apOverview: { ack: false },
    coa: { source: null, accounts: [], importResult: null },
    incomeMap: {},
    expenseMap: { apAccount: '2110-00', map: {} },
    favorites: [],
    finance: { template: null },
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch (e) { /* storage unavailable — start fresh */ }
  return defaults()
}

export const state = reactive(load())
export const savedAt = ref(null)

watch(state, () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    savedAt.value = new Date()
  } catch (e) { /* ignore */ }
}, { deep: true })

export function resetState() {
  Object.assign(state, defaults())
  try { localStorage.removeItem(STORAGE_KEY) } catch (e) { /* ignore */ }
  savedAt.value = null
}

// Stable row keys for CoA rows (code is editable, so it can't be the key)
let keySeq = state.coa.accounts.reduce((m, a) => Math.max(m, a._k || 0), 0)
state.coa.accounts.forEach(a => { if (!a._k) a._k = ++keySeq })
export function withKey(a) { return { ...a, _k: ++keySeq } }

// Prefill AR/GL/AP from a quick-setup template — every step is still editable afterward.
// Doesn't touch `visited`, so steps only count as done once the customer actually walks through them.
export function applyTemplate(level) {
  const t = TEMPLATES[level]
  if (!t) return
  state.incomes = t.incomes.map(i => ({ ...i }))
  state.unitRules = {
    mode: 'rules',
    rules: [{ id: 1, from: 1, to: Number(state.general.units) || 1, incomes: t.incomes.filter(i => i.rateType !== 'fixed').map(i => i.code) }],
    importResult: null,
  }
  state.billSets = t.billSets.map((b, i) => ({ id: i + 1, name: b.name, freq: b.freq, incomes: [...b.incomes] }))
  state.penalty = { ...t.penalty }
  state.expenses = t.expenses.map(e => ({ ...e }))
  state.policy = { ...t.policy, confirmed: false }
  state.coa = { source: 'preset', accounts: PRESET_COA.map(withKey), importResult: null }

  state.incomeMap = {}
  t.incomes.forEach(i => {
    state.incomeMap[i.code] = { rev: suggestAccount(i.name, '4', '4190-00'), ar: suggestAccount(i.name, '113', '1132-00') }
  })
  state.expenseMap = { apAccount: '2110-00', map: {} }
  t.expenses.forEach(e => {
    state.expenseMap.map[e.code] = suggestAccount(e.name, '5', '5190-00')
  })
  state.favorites = DEFAULT_FAVORITE_PICKS.filter(c => state.coa.accounts.some(a => a.code === c))

  state.finance.template = level
}

// Demo mode: a fully configured sample project to explore — fictional data only
export function loadDemo() {
  const d = defaults()
  Object.assign(d, {
    started: true,
    demo: true,
    current: 'review',
    visited: ALL_ITEMS.map(i => i.key).concat('review'),
    general: { ...d.general, name: 'โครงการ demo · เดอะลิฟวิ่ง วิลล์', taxId: '0000000000000', address: 'ที่อยู่ตัวอย่าง', startDate: '2026-10-01' },
    arOverview: { ack: true, ready: BASE_DATASETS.map(() => true) },
    unitRules: {
      mode: 'rules',
      rules: [
        { id: 1, from: 1, to: 400, incomes: ['R01', 'R02'] },
        { id: 2, from: 401, to: 450, incomes: ['R01', 'R02', 'R03'] },
      ],
      importResult: null,
    },
    billSets: [
      { id: 1, name: 'ชุดแจ้งหนี้รายเดือน', freq: 'monthly', incomes: ['R02', 'R03'] },
      { id: 2, name: 'ชุดแจ้งหนี้รายปี', freq: 'yearly', incomes: ['R01'] },
    ],
    billPayment: { has: true, bank: BANKS[0], billerId: '000000000000000', suffix: '' },
    glOverview: { ack: true },
    policy: { ...d.policy, confirmed: true },
    apOverview: { ack: true },
    coa: { source: 'preset', accounts: PRESET_COA.map(withKey), importResult: null },
    incomeMap: {
      R01: { rev: '4101-00', ar: '1130-00' },
      R02: { rev: '4102-00', ar: '1131-00' },
      R03: { rev: '4103-00', ar: '1132-00' },
    },
    expenseMap: { apAccount: '2110-00', map: { E01: '5101-00', E02: '5102-00', E03: '5103-00', E04: '5105-00' } },
    favorites: ['1111-00', '1112-00', '1130-00', '2110-00', '4101-00'],
    finance: { template: 'standard' },
  })
  Object.assign(state, d)
}

// ── Unit range helpers ───────────────────────────────────────────
export function ruleSize(r) {
  const a = Number(r.from), b = Number(r.to)
  return a > 0 && b >= a ? b - a + 1 : 0
}

export const unitCoverage = computed(() => {
  const total = Number(state.general.units) || 0
  const hits = new Array(total + 1).fill(0)
  let outOfRange = false
  for (const r of state.unitRules.rules) {
    if (!ruleSize(r)) continue
    for (let n = Number(r.from); n <= Number(r.to); n++) {
      if (n > total) { outOfRange = true; continue }
      hits[n]++
    }
  }
  const covered = hits.slice(1).filter(h => h > 0).length
  const overlap = hits.slice(1).filter(h => h > 1).length
  return { total, covered, overlap, outOfRange, missing: total - covered }
})

// Which incomes a given unit number is billed for, according to rules
export function incomesForUnit(n) {
  const rule = state.unitRules.rules.find(r => n >= Number(r.from) && n <= Number(r.to))
  return rule ? rule.incomes : []
}

// ── Validation per item ──────────────────────────────────────────
const validators = {
  project: s => !!(s.general.name && /^\d{13}$/.test(s.general.taxId) && s.general.prefix && s.general.units > 0),
  accounting: s => !!(s.general.startDate && s.general.fiscalStartMonth),
  arOverview: s => s.arOverview.ack,
  incomes: s => s.incomes.length > 0 && s.incomes.every(i => i.name && Number(i.rate) > 0),
  unitRules: s => s.unitRules.mode === 'import'
    ? !!s.unitRules.importResult && s.unitRules.importResult.errors.length === 0
    : unitCoverage.value.missing === 0 && unitCoverage.value.overlap === 0 && !unitCoverage.value.outOfRange
      && s.unitRules.rules.every(r => r.incomes.length > 0),
  billCycle: s => s.billCycle.issueDay >= 1 && s.billCycle.issueDay <= 28 && s.billCycle.dueDays >= 0,
  billSets: s => s.billSets.length > 0 && s.billSets.every(b => b.name && b.incomes.length > 0),
  penalty: s => s.penalty.none || Number(s.penalty.value) > 0,
  billPayment: s => s.billPayment.has === false || (s.billPayment.has === true && !!s.billPayment.bank && /^\d{15}$/.test(s.billPayment.billerId)),
  glOverview: s => s.glOverview.ack,
  expenses: s => s.expenses.length > 0 && s.expenses.every(e => e.name),
  policy: s => s.policy.confirmed,
  apOverview: s => s.apOverview.ack,
  coa: s => s.coa.accounts.length > 0 && new Set(s.coa.accounts.map(a => a.code)).size === s.coa.accounts.length,
  incomeMap: s => s.incomes.every(i => s.incomeMap[i.code]?.rev && s.incomeMap[i.code]?.ar),
  expenseMap: s => !!s.expenseMap.apAccount && s.expenses.every(e => s.expenseMap.map[e.code]),
  favorites: s => s.favorites.length > 0,
}

// Presets make many items valid out of the box — only count them once the user has actually reviewed them
export function isDone(key) { return state.visited.includes(key) && validators[key](state) }

export function itemStatus(key) {
  if (isDone(key)) return 'done'
  return state.visited.includes(key) ? 'progress' : 'todo'
}

export const doneCount = computed(() => ALL_ITEMS.filter(i => isDone(i.key)).length)
export const progressPercent = computed(() => Math.round((doneCount.value / ALL_ITEMS.length) * 100))

export function sectionDone(sec) {
  return sec.items.filter(i => isDone(i.key)).length
}

export const unmappedIncomes = computed(() => state.incomes.filter(i => !(state.incomeMap[i.code]?.rev && state.incomeMap[i.code]?.ar)))
export const unmappedExpenses = computed(() => state.expenses.filter(e => !state.expenseMap.map[e.code]))

// ── Account helpers ──────────────────────────────────────────────
export function accountName(code) {
  return state.coa.accounts.find(a => a.code === code)?.name || ''
}

// Suggest an account by matching the item's name keyword, within a code prefix
export function suggestAccount(itemName, prefix, fallback) {
  const key = itemName.replace(/^ค่า/, '').split(/[\s(]/)[0]
  const hit = state.coa.accounts.find(a => a.code.startsWith(prefix) && a.name.includes(key))
  if (hit) return hit.code
  return state.coa.accounts.some(a => a.code === fallback) ? fallback : ''
}

// ── Formatting (THB, DD/MM/YYYY, ICT) ────────────────────────────
export function fmtTHB(n) {
  return Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function fmtDate(d) {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}/${d.getFullYear()}`
}

export function fmtTimeICT(d) {
  return d.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })
}
