<template>
  <div>
    <template v-if="showRequest">
      <div class="apt-grid apt-grid-112">
        <div class="apt-field">
          <label class="apt-label" for="cl-req">รายการคำขอที่เคลียร์</label>
          <select id="cl-req" class="apt-select" disabled><option>{{ cf.doc.docNo }}</option></select>
        </div>
        <div class="apt-field">
          <label class="apt-label" for="cl-reqamt">จำนวนเงิน<span class="apt-req">*</span></label>
          <input id="cl-reqamt" class="apt-input apt-input--num" :value="fmtMoney(cf.reqTotal)" readonly />
        </div>
        <div class="apt-field">
          <label class="apt-label" for="cl-reqdesc">คำอธิบาย<span class="apt-req">*</span></label>
          <input id="cl-reqdesc" class="apt-input" :value="cf.doc.description" readonly />
        </div>
      </div>

      <hr class="apt-hr" />
    </template>
    <h3 class="apt-subtitle" style="margin-bottom: 12px;">รายละเอียดการเคลียร์</h3>
    <div class="apt-grid apt-grid-112">
      <div class="apt-field">
        <label class="apt-label" for="cl-docno">เลขที่เอกสารเคลียร์</label>
        <input id="cl-docno" class="apt-input" :value="cf.draft.docNo" readonly />
      </div>
      <div class="apt-field" :class="{ 'apt-field--error': cf.errors.date }">
        <label class="apt-label" for="cl-date">วันที่เคลียร์<span class="apt-req">*</span></label>
        <input id="cl-date" v-model="cf.draft.date" type="date" class="apt-input" :readonly="cf.locked" />
        <span v-if="cf.errors.date" class="apt-error">กรุณาระบุวันที่เคลียร์</span>
      </div>
      <div class="apt-field">
        <div class="apt-label-row">
          <label class="apt-label" for="cl-note">หมายเหตุประกอบการเคลียร์</label>
          <span class="apt-count">{{ cf.draft.note.length }}/250</span>
        </div>
        <input id="cl-note" v-model="cf.draft.note" type="text" class="apt-input" maxlength="250" :readonly="cf.locked" />
      </div>
    </div>

    <FileGallery :files="cf.draft.files" hint="รองรับไฟล์ .jpeg, .png, .pdf และไฟล์รวมไม่เกิน 10 mb" :locked="cf.locked" @locked="cf.warnEdit" />

    <div class="apt-table-head" style="margin-top: 24px;">
      <h3 class="apt-subtitle">รายการค่าใช้จ่าย</h3>
      <button type="button" class="apt-btn apt-btn-outline" @click="cf.openRow(null)"><AptIcon name="plus" /> เพิ่มรายการ</button>
      <div v-if="coach" class="apt-coach" role="status">{{ coach }}</div>
    </div>
    <div class="apt-table-wrap" :class="{ 'apt-field--error': cf.errors.rows }">
      <table class="apt-table">
        <thead>
          <tr><th style="width: 70px;">ลำดับ</th><th>รหัสรายจ่าย</th><th>ชื่อรายจ่าย</th><th>รายละเอียด</th><th class="num">จำนวนเงิน</th><th class="actions"></th></tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in cf.draft.rows" :key="r.id">
            <td>{{ i + 1 }}</td><td>{{ r.code }}</td><td>{{ expenseByCode(r.code)?.name }}</td>
            <td class="wrap">{{ r.detail || '-' }}</td><td class="num">{{ fmtMoney(r.amount) }}</td>
            <td class="actions">
              <button type="button" class="apt-icon-btn" :aria-label="`แก้ไขรายการที่ ${i + 1}`" @click="cf.openRow(r)"><AptIcon name="edit" /></button>
              <button type="button" class="apt-icon-btn apt-icon-btn--danger" :aria-label="`ลบรายการที่ ${i + 1}`" @click="cf.removeRow(r)"><AptIcon name="trash" /></button>
            </td>
          </tr>
          <tr v-if="!cf.draft.rows.length"><td colspan="6" class="empty">ไม่พบรายการ</td></tr>
        </tbody>
      </table>
    </div>
    <p v-if="cf.errors.rows" class="apt-error" style="margin-top: 8px;">เพิ่มรายการค่าใช้จ่ายอย่างน้อย 1 รายการ</p>

    <div class="apt-totals">
      <div class="apt-total-row">
        <span>รวมยอดคำขอ ทั้งหมด</span>
        <span title="ผลรวมรายการโอน/เช็คของคำขอ"><AptIcon name="info" /></span>
        <span class="apt-total-box">{{ fmtMoney(cf.reqTotal) }}</span>
      </div>
      <div class="apt-total-row">
        <span>รวมยอดเคลียร์ ทั้งหมด</span>
        <span title="ผลรวมรายการค่าใช้จ่ายด้านบน"><AptIcon name="info" /></span>
        <span class="apt-total-box">{{ fmtMoney(cf.clrTotal) }}</span>
      </div>
      <div class="apt-total-row">
        <span>ส่วนต่าง</span>
        <span class="apt-diff-tag" :class="`apt-diff-tag--${cf.diffTag.tone}`">{{ cf.diffTag.label }}</span>
        <span class="apt-total-box">{{ fmtMoney(Math.abs(cf.diff)) }}</span>
      </div>
    </div>


    <!-- settle the difference: under the totals, inside the clearing card -->
    <div v-if="cf.diff !== 0 && cf.draft.rows.length" :ref="cf.setSettleEl" class="apt-settle">
      <h3 class="apt-settle-title">{{ cf.diff > 0 ? 'การชำระเงินส่วนที่เกิน' : 'การชำระเงินส่วนที่เหลือ' }}</h3>
      <div class="apt-grid apt-grid-3">
        <div class="apt-field" :class="{ 'apt-field--error': cf.errors.settle && !cf.s.method }">
          <label class="apt-label" for="st-method">วิธีการชำระ<span class="apt-req">*</span></label>
          <select id="st-method" class="apt-select apt-select--plain" :value="cf.s.method" :disabled="cf.locked" @change="cf.pickMethod($event.target.value)">
            <option value="" disabled>เลือกวิธีการชำระ</option>
            <option v-for="m in cf.methods" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
          <span v-if="cf.errors.settle && !cf.s.method" class="apt-error">กรุณาเลือกวิธีการชำระ</span>
        </div>
        <!-- amount-based -->
        <div v-if="['cash', 'transfer', 'other'].includes(cf.s.method)" class="apt-field" :class="{ 'apt-field--error': cf.errors.settle && !cf.amountOk }">
          <label class="apt-label" for="st-amount">จำนวนเงิน<span class="apt-req">*</span></label>
          <input id="st-amount" v-model.number="cf.s.amount" type="number" min="0" step="0.01" placeholder="0.00" class="apt-input apt-input--num" :readonly="cf.locked" />
          <span v-if="cf.s.amount && !cf.amountOk" class="apt-error">ต้องเท่ากับส่วนต่าง {{ fmtMoney(Math.abs(cf.diff)) }}</span>
        </div>
        <!-- document pickers -->
        <div v-if="cf.docOptions" class="apt-field" :class="{ 'apt-field--error': cf.errors.settle && !cf.s.docRef }">
          <label class="apt-label" for="st-doc">เลขที่เอกสาร<span class="apt-req">*</span></label>
          <select id="st-doc" v-model="cf.s.docRef" class="apt-select apt-select--btn" :disabled="cf.locked">
            <option value="" disabled>เลือกเลขที่เอกสาร</option>
            <option v-for="d in cf.docOptions" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
        <template v-if="cf.s.method === 'transfer'">
          <div class="apt-field apt-col-start" :class="{ 'apt-field--error': cf.errors.settle && !cf.s.account }">
            <label class="apt-label" for="st-acc">โอนเข้าบัญชี<span class="apt-req">*</span></label>
            <select id="st-acc" v-model="cf.s.account" class="apt-select apt-select--btn" :disabled="cf.locked">
              <option value="" disabled>เลือกบัญชี</option>
              <option v-for="a in PAY_FROM_ACCOUNTS" :key="a" :value="a">{{ a }}</option>
            </select>
          </div>
          <div class="apt-field" :class="{ 'apt-field--error': cf.errors.settle && !cf.s.date }">
            <label class="apt-label" for="st-date">วันที่โอน<span class="apt-req">*</span></label>
            <input id="st-date" v-model="cf.s.date" type="date" class="apt-input" :readonly="cf.locked" />
          </div>
        </template>
        <div v-if="cf.s.method === 'other'" class="apt-field" :class="{ 'apt-field--error': cf.errors.settle && !cf.s.note.trim() }">
          <div class="apt-label-row">
            <label class="apt-label" for="st-note">หมายเหตุ<span class="apt-req">*</span></label>
            <span class="apt-count">{{ cf.s.note.length }}/100</span>
          </div>
          <input id="st-note" v-model="cf.s.note" type="text" class="apt-input" maxlength="100" :readonly="cf.locked" />
        </div>
        <div v-if="cf.s.method === 'cheque'" class="apt-field apt-col-start">
          <label class="apt-label" for="st-cheque-total">จำนวนเงินทั้งหมด</label>
          <input id="st-cheque-total" class="apt-input" :value="fmtMoney(cf.chequeTotal)" readonly />
        </div>
      </div>

      <!-- cheque: same payment table + dialogs as the request page -->
      <template v-if="cf.s.method === 'cheque'">
        <PaymentsTable
          :payments="cf.s.payments"
          :locked="cf.locked"
          @locked="cf.warnEdit"
          @create="cf.chequeDlg = { mode: 'create', payment: null }"
          @edit="p => { cf.chequeDlg = { mode: 'create', payment: p } }"
          @remove="cf.removeCheque"
          @import="cf.chequeDlg = { mode: 'import' }"
          @print="p => showToast(`พิมพ์เอกสาร ${p.docNo} (ตัวอย่างสาธิต)`)"
        />
        <p v-if="cf.s.payments.length && !cf.amountOk" class="apt-error">ยอดรวมรายการโอน/เช็คต้องเท่ากับส่วนต่าง {{ fmtMoney(Math.abs(cf.diff)) }}</p>
        <p v-if="cf.errors.settle && !cf.s.payments.length" class="apt-error">กรุณาสร้างหรือนำเข้ารายการโอน/เช็ค</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import AptIcon from './AptIcon.vue'
import FileGallery from './FileGallery.vue'
import PaymentsTable from './PaymentsTable.vue'
import { useAptStore, fmtMoney, expenseByCode, PAY_FROM_ACCOUNTS } from './store.js'

// cf: the object returned by useClearingForm() · its dialogs live in ClearingDialogs (rendered at page level)
// showRequest: the read-only "request being cleared" row (the step version already shows the request above)
defineProps({ cf: { type: Object, required: true }, showRequest: { type: Boolean, default: true }, coach: { type: String, default: '' } })
const { showToast } = useAptStore()
</script>
