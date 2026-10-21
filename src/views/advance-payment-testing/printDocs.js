// Print previews for the toolbar's print menu: an A4 page opened in a new tab, laid out like the product's
// ใบสำคัญจ่าย (PV) print. คำขอเงินทดรองจ่าย = the PV layout without the GL table; เอกสารเคลียร์ = the clearing
// section in the same layout (fonts, header block, bordered tables, remarks, signature row).
import { vendorById, payTypeByCode, expenseByCode, OVER_METHODS, UNDER_METHODS, fmtDate, fmtMoney, requestTotal, clearTotal, round2 } from './store.js'

// ---------- Thai baht text: 5000 -> ห้าพันบาทถ้วน ----------
const DIGITS = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
const PLACES = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน']
function readInt(n) {
  if (n === 0) return ''
  if (n >= 1e6) return readInt(Math.floor(n / 1e6)) + 'ล้าน' + readInt(n % 1e6)
  const s = String(n)
  let out = ''
  for (let i = 0; i < s.length; i++) {
    const d = Number(s[i])
    const place = s.length - i - 1
    if (!d) continue
    if (place === 0 && d === 1 && s.length > 1) out += 'เอ็ด'
    else if (place === 1 && d === 1) out += 'สิบ'
    else if (place === 1 && d === 2) out += 'ยี่สิบ'
    else out += DIGITS[d] + PLACES[place]
  }
  return out
}
export function bahtText(amount) {
  const n = Math.round(Math.abs(Number(amount || 0)) * 100)
  const baht = Math.floor(n / 100)
  const satang = n % 100
  if (!baht && !satang) return 'ศูนย์บาทถ้วน'
  return (baht ? readInt(baht) + 'บาท' : '') + (satang ? readInt(satang) + 'สตางค์' : 'ถ้วน')
}

// ---------- shared page shell ----------
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #e9ecf1; font-family: 'Sarabun', sans-serif; color: #1f2329; font-size: 14px; }
  .bar { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 24px; background: #fff; border-bottom: 1px solid #d9dde3; }
  .bar span { color: #5b6470; }
  .bar button { font: inherit; font-weight: 600; color: #fff; background: #1c70f7; border: 0; border-radius: 6px; padding: 8px 18px; cursor: pointer; }
  .page { position: relative; width: 210mm; min-height: 297mm; margin: 24px auto; padding: 14mm 12mm 18mm; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,.12); display: flex; flex-direction: column; }
  .title { text-align: right; }
  .title h1 { margin: 0; font-size: 30px; font-weight: 700; line-height: 1.3; }
  .title .en { font-size: 19px; color: #3a4049; }
  .title .copy { margin-top: 10px; font-size: 13px; color: #3a4049; }
  .head { display: flex; justify-content: space-between; gap: 24px; margin: 28px 0 22px; }
  .head b { font-weight: 600; }
  .head .who div + div { margin-top: 8px; }
  .head dl { margin: 0; display: grid; grid-template-columns: auto auto; gap: 8px 8px; align-content: start; }
  .head dt { font-weight: 600; }
  .head dd { margin: 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  th, td { border: 1px solid #3a4049; padding: 10px 12px; text-align: left; vertical-align: top; }
  th { font-weight: 600; background: #f6f7f9; line-height: 1.5; }
  tbody tr.item td { border-top: 0; border-bottom: 0; height: 52px; }
  tbody tr.item:last-child td { padding-bottom: 48px; }
  tfoot td { font-weight: 600; border-top: 1px solid #3a4049; white-space: nowrap; }
  tfoot td:first-child { white-space: normal; }
  table.sum { width: 50%; margin-left: auto; }
  table.sum td:first-child { font-weight: 600; background: #f6f7f9; }
  table.sum .tag { font-weight: 400; color: #5b6470; }
  h3 { margin: 0 0 6px; font-size: 14px; font-weight: 600; }
  .block { margin-bottom: 20px; }
  .block p { margin: 0; }
  .block .indent { padding-left: 14px; }
  .signs { margin-top: auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding-top: 48px; }
  .signs div { border-top: 1px dotted #3a4049; padding-top: 6px; text-align: center; white-space: nowrap; font-size: 13px; }
  .pageno { position: absolute; right: 12mm; bottom: 8mm; font-size: 12px; color: #5b6470; }
  @page { size: A4; margin: 0; }
  @media print {
    body { background: #fff; }
    .bar { display: none; }
    .page { margin: 0; box-shadow: none; }
  }
`

function shell({ tabTitle, titleTh, titleEn, who, meta, body, signs }) {
  return `<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tabTitle)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>
<div class="bar"><span>ตัวอย่างเอกสาร (สาธิต · ข้อมูลสมมติ)</span><button type="button" onclick="window.print()">พิมพ์</button></div>
<div class="page">
  <div class="title"><h1>${esc(titleTh)}</h1><div class="en">${esc(titleEn)}</div><div class="copy">(ต้นฉบับ/Original)</div></div>
  <div class="head">
    <div class="who">${who.map(([k, v]) => `<div><b>${esc(k)}</b></div><div>${esc(v)}</div>`).join('')}</div>
    <dl>${meta.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
  </div>
  ${body}
  <div class="signs">${signs.map(s => `<div>${esc(s)}</div>`).join('')}</div>
  <div class="pageno">1/1</div>
</div></body></html>`
}

function openPage(html) {
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }))
  window.open(url, '_blank', 'noopener')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

function remarks(text) {
  return `<div class="block"><h3>หมายเหตุ/Remarks:</h3><p>${esc(text || '-')}</p></div>`
}

// ---------- คำขอเงินทดรองจ่าย ----------
const PAY_KIND = { CQW: 'เช็ค', ATP: 'เงินโอน', CAW: 'เงินสด' }

export function requestPrintHtml(doc) {
  const amount = Number(doc.requestedAmount || requestTotal(doc))
  const payments = doc.payments || []
  const conditions = payments.length
    ? Object.entries(payments.reduce((g, p) => ((g[p.typeCode] ||= []).push(p), g), {})).map(([code, list]) =>
        `<p class="indent">${esc(PAY_KIND[code] || payTypeByCode(code)?.label || code)}</p>` +
        list.map(p => `<p class="indent">- ${code === 'CQW' ? `เช็คเลขที่ ${esc(p.chequeNo || p.docNo)} ` : ''}จำนวน ${fmtMoney(p.amount)} บาท วันที่ ${fmtDate(p.payDate)}</p>`).join('')
      ).join('')
    : '<p class="indent">-</p>'

  const body = `
  <table>
    <thead><tr>
      <th style="width:8%">ลำดับ<br>No.</th><th style="width:15%">เลขที่คำขอ<br>Ref. No.</th><th style="width:14%">วันที่บันทึก<br>Date</th>
      <th>รายละเอียด<br>Description</th><th style="width:20%">จำนวนหน่วย<br>Unit</th><th style="width:13%">จำนวนเงิน<br>Amount</th>
    </tr></thead>
    <tbody><tr class="item">
      <td>1</td><td>${esc(doc.docNo)}</td><td>${fmtDate(doc.createdAt)}</td><td>${esc(doc.description)}</td><td>1</td><td>${fmtMoney(amount)}</td>
    </tr></tbody>
    <tfoot><tr><td colspan="4">${bahtText(amount)}</td><td>จำนวนเงิน/Amount</td><td>${fmtMoney(amount)}</td></tr></tfoot>
  </table>
  ${remarks('')}
  <div class="block"><h3>การชำระเงิน(Conditions of Payments)</h3>${conditions}</div>`

  return shell({
    tabTitle: `คำขอเงินทดรองจ่าย ${doc.docNo}`,
    titleTh: 'คำขอเงินทดรองจ่าย', titleEn: 'Advance Payment Request',
    who: [['ผู้เบิก/Withdrawer:', vendorById(doc.vendorId)?.name || '-']],
    meta: [['เลขที่/No:', doc.docNo], ['วันที่บันทึก/Date:', fmtDate(doc.createdAt)], ['ครบกำหนด/Due date:', fmtDate(doc.dueDate)]],
    body,
    signs: ['ผู้จัดทำ / Organizer', 'ผู้ตรวจสอบ / Approver', 'ผู้มีอำนาจลงนาม / Authorized', 'ผู้รับเงิน / Receiver']
  })
}

// ---------- เอกสารเคลียร์ ----------
export function clearingPrintHtml(doc) {
  const c = doc.clearing
  const rows = c.rows || []
  const req = requestTotal(doc)
  const clr = clearTotal(c)
  const diff = round2(clr - req)
  const s = c.settle || {}
  const method = (diff > 0 ? OVER_METHODS : UNDER_METHODS).find(m => m.value === s.method)?.label

  const items = rows.length
    ? rows.map((r, i) => `<tr class="item"><td>${i + 1}</td><td>${esc(r.code)}</td><td>${esc(expenseByCode(r.code)?.name || '')}</td><td>${esc(r.detail || '-')}</td><td>${fmtMoney(r.amount)}</td></tr>`).join('')
    : '<tr class="item"><td colspan="5">-</td></tr>'

  let settle = '<p class="indent">-</p>'
  if (diff !== 0) {
    const amt = s.method === 'cheque' ? (s.payments || []).reduce((t, p) => t + Number(p.amount || 0), 0) : (s.amount ?? Math.abs(diff))
    settle = `<p class="indent">${esc(diff > 0 ? 'จ่ายเพิ่มส่วนที่เกิน' : 'รับคืนส่วนที่เหลือ')}${method ? ` · ${esc(method)}` : ''}</p>` +
      `<p class="indent">- จำนวน ${fmtMoney(amt)} บาท${s.date ? ` วันที่ ${fmtDate(s.date)}` : ''}${s.docRef ? ` เลขที่เอกสาร ${esc(s.docRef)}` : ''}</p>`
  }

  const body = `
  <table>
    <thead><tr>
      <th style="width:8%">ลำดับ<br>No.</th><th style="width:14%">รหัสรายจ่าย<br>Code</th><th style="width:20%">ชื่อรายจ่าย<br>Expense</th>
      <th>รายละเอียด<br>Description</th><th style="width:13%">จำนวนเงิน<br>Amount</th>
    </tr></thead>
    <tbody>${items}</tbody>
    <tfoot><tr><td colspan="3">${bahtText(clr)}</td><td>รวมยอดเคลียร์/Total</td><td>${fmtMoney(clr)}</td></tr></tfoot>
  </table>
  <table class="sum">
    <tr><td>รวมยอดคำขอ/Requested</td><td>${fmtMoney(req)}</td></tr>
    <tr><td>รวมยอดเคลียร์/Cleared</td><td>${fmtMoney(clr)}</td></tr>
    <tr><td>ส่วนต่าง/Difference <span class="tag">${diff === 0 ? '(ครบ)' : diff > 0 ? '(เกิน)' : '(เหลือ)'}</span></td><td>${fmtMoney(Math.abs(diff))}</td></tr>
  </table>
  ${remarks(c.note)}
  <div class="block"><h3>การชำระส่วนต่าง(Settlement)</h3>${settle}</div>`

  return shell({
    tabTitle: `เอกสารเคลียร์ ${c.docNo}`,
    titleTh: 'เอกสารเคลียร์เงินทดรองจ่าย', titleEn: 'Advance Clearing',
    who: [['ผู้เบิก/Withdrawer:', vendorById(doc.vendorId)?.name || '-'], ['อ้างอิงคำขอ/Request No.:', `${doc.docNo} · ${doc.description}`]],
    meta: [['เลขที่/No:', c.docNo], ['วันที่เคลียร์/Date:', fmtDate(c.date)], ['ครบกำหนด/Due date:', fmtDate(doc.dueDate)]],
    body,
    signs: ['ผู้จัดทำ / Organizer', 'ผู้ตรวจสอบ / Approver', 'ผู้มีอำนาจลงนาม / Authorized', 'ผู้เบิก / Withdrawer']
  })
}

export function printRequest(doc) { openPage(requestPrintHtml(doc)) }
export function printClearing(doc) { openPage(clearingPrintHtml(doc)) }
