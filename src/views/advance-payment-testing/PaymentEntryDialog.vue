<template>
  <div class="apt-overlay" role="dialog" aria-modal="true" aria-label="สร้างรายการจ่าย">
    <div class="apt-dialog apt-dialog--lg">
      <div class="apt-dialog-toolbar">
        <button type="button" class="apt-btn apt-btn-slate" @click="resetForm"><AptIcon name="doc" /> สร้างใหม่</button>
        <button type="button" class="apt-btn apt-btn-primary" @click="save"><AptIcon name="save" /> บันทึก</button>
        <button type="button" class="apt-btn apt-btn-primary" :disabled="!saved" @click="onPdf"><AptIcon name="download" /> ดาวน์โหลด PDF</button>
        <button type="button" class="apt-btn apt-btn-danger" @click="emit('close')"><AptIcon name="x" /> ยกเลิก</button>
      </div>
      <div class="apt-dialog-body">
        <h3 class="apt-section-title">ประเภทและบัญชี</h3>
        <div class="apt-grid apt-grid-2">
          <div class="apt-field" :class="{ 'apt-field--error': errors.typeCode }">
            <label class="apt-label" for="pe-type">ประเภทการชำระ<span class="apt-req">*</span></label>
            <select id="pe-type" v-model="form.typeCode" class="apt-select">
              <option v-for="t in PAY_TYPES" :key="t.code" :value="t.code">{{ t.label }}</option>
            </select>
          </div>
          <div class="apt-field" :class="{ 'apt-field--error': errors.account }">
            <label class="apt-label" for="pe-account">จ่ายจากบัญชี<span class="apt-req">*</span></label>
            <select id="pe-account" v-model="form.account" class="apt-select">
              <option value="" disabled>เลือกบัญชี</option>
              <option v-for="a in PAY_FROM_ACCOUNTS" :key="a" :value="a">{{ a }}</option>
            </select>
            <span v-if="errors.account" class="apt-error">กรุณาเลือกบัญชีที่จ่าย</span>
          </div>
          <!-- CQW takes its number from ข้อมูลเช็ค below, so no free-text field -->
          <div v-if="form.typeCode !== 'CQW'" class="apt-field">
            <label class="apt-label" for="pe-docno">เลขที่เอกสารชำระ/เลขที่เช็ค</label>
            <input id="pe-docno" v-model="form.docNo" type="text" class="apt-input" />
          </div>
        </div>

        <div v-if="form.typeCode === 'CQW'" class="apt-section-box">
          <h3 class="apt-section-title">ข้อมูลเช็ค</h3>
          <div class="apt-grid apt-grid-4" style="margin-bottom: 0;">
            <div class="apt-field">
              <label class="apt-label" for="pe-chq">เลขที่เช็ค</label>
              <select id="pe-chq" v-model="form.chequeNo" class="apt-select" @change="onCheque">
                <option value="">เลือกเลขที่เช็ค</option>
                <option v-for="c in CHEQUE_STOCK" :key="c.no" :value="c.no">{{ c.no }}</option>
              </select>
            </div>
            <div class="apt-field">
              <label class="apt-label" for="pe-book">เล่มที่</label>
              <input id="pe-book" :value="form.chequeBook" type="text" class="apt-input" readonly />
            </div>
            <div class="apt-field">
              <label class="apt-label" for="pe-chqstatus">สถานะ</label>
              <select id="pe-chqstatus" v-model="form.chequeStatus" class="apt-select" @change="onChequeStatus">
                <option v-for="s in CHEQUE_STATUSES" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div class="apt-field">
              <label class="apt-label" for="pe-pass">วันที่ผ่าน</label>
              <!-- a cheque still in hand hasn't cleared, so it has no pass date yet -->
              <input id="pe-pass" v-model="form.passDate" type="date" class="apt-input" :disabled="inHand" />
            </div>
          </div>
        </div>

        <h3 class="apt-section-title">ผู้รับเงิน</h3>
        <div class="apt-grid apt-grid-2">
          <div class="apt-field" :class="{ 'apt-field--error': errors.vendorId }">
            <label class="apt-label" for="pe-vendor">ผู้จัดจำหน่าย/ผู้เบิก<span class="apt-req">*</span></label>
            <select id="pe-vendor" v-model="form.vendorId" class="apt-select">
              <option value="" disabled>เลือกผู้จัดจำหน่าย/ผู้เบิก</option>
              <option v-for="v in VENDORS" :key="v.id" :value="v.id">{{ v.code }} : {{ v.name }}</option>
            </select>
            <span v-if="errors.vendorId" class="apt-error">กรุณาเลือกผู้จัดจำหน่าย/ผู้เบิก</span>
          </div>
          <div class="apt-field">
            <label class="apt-label" for="pe-payee">ชื่อผู้รับ</label>
            <input id="pe-payee" v-model="form.payeeName" type="text" class="apt-input" :placeholder="vendorById(form.vendorId)?.name || '(อ้างอิงผู้จัดจำหน่าย)'" />
          </div>
        </div>

        <h3 class="apt-section-title">วันที่ ยอดเงิน และหมายเหตุ</h3>
        <div class="apt-grid apt-grid-112">
          <div class="apt-field" :class="{ 'apt-field--error': errors.payDate }">
            <label class="apt-label" for="pe-paydate">วันที่ชำระ<span class="apt-req">*</span></label>
            <input id="pe-paydate" v-model="form.payDate" type="date" class="apt-input" />
            <span v-if="errors.payDate" class="apt-error">กรุณาระบุวันที่ชำระ</span>
          </div>
          <div class="apt-field" :class="{ 'apt-field--error': errors.amount }">
            <label class="apt-label" for="pe-amount">จำนวนเงินที่ชำระ</label>
            <input id="pe-amount" v-model.number="form.amount" type="number" min="0" step="0.01" class="apt-input apt-input--num" />
            <span v-if="errors.amount" class="apt-error">จำนวนเงินต้องมากกว่า 0</span>
          </div>
          <div class="apt-field">
            <div class="apt-label-row">
              <label class="apt-label" for="pe-note">หมายเหตุ</label>
              <span class="apt-count">{{ form.note.length }}/300</span>
            </div>
            <input id="pe-note" v-model="form.note" type="text" class="apt-input" maxlength="300" />
          </div>
        </div>
      </div>
      <div class="apt-dialog-close">
        <button type="button" class="apt-link apt-link--plain" @click="emit('close')"><AptIcon name="x" /> ปิด</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import AptIcon from './AptIcon.vue'
import { PAY_TYPES, PAY_FROM_ACCOUNTS, CHEQUE_STOCK, CHEQUE_STATUSES, VENDORS, vendorById, todayIso, uid, clone, useAptStore } from './store.js'

const { showToast } = useAptStore()

const props = defineProps({
  payment: { type: Object, default: null },
  vendorId: { type: String, default: '' },
  amount: { type: Number, default: null }
})
const emit = defineEmits(['save', 'close'])

function blank() {
  return {
    id: uid('P'), typeCode: 'CQW', account: '', docNo: '', chequeNo: '', chequeBook: '', chequeStatus: 'N : ในมือ',
    passDate: '', vendorId: props.vendorId, payeeName: '', payDate: todayIso(), amount: props.amount, note: '', status: 'N'
  }
}
const form = reactive(props.payment ? { ...blank(), ...clone(props.payment) } : blank())
const errors = reactive({})
const saved = ref(!!props.payment)

function resetForm() {
  Object.assign(form, blank())
  Object.keys(errors).forEach(k => { errors[k] = false })
  saved.value = false
}
function onCheque() {
  const c = CHEQUE_STOCK.find(x => x.no === form.chequeNo)
  form.chequeBook = c ? c.book : ''
}
const inHand = computed(() => form.chequeStatus.startsWith('N'))
function onChequeStatus() { if (inHand.value) form.passDate = '' }
function onPdf() { showToast('ดาวน์โหลด PDF (ตัวอย่างสาธิต)') }

function save() {
  errors.typeCode = !form.typeCode
  errors.account = !form.account
  errors.vendorId = !form.vendorId
  errors.payDate = !form.payDate
  errors.amount = !(Number(form.amount) > 0)
  if (Object.values(errors).some(Boolean)) return
  const v = vendorById(form.vendorId)
  saved.value = true
  emit('save', {
    ...clone(form),
    amount: Number(form.amount),
    payeeCode: v.code,
    payeeName: form.payeeName || v.name,
    docNo: (form.typeCode === 'CQW' ? form.chequeNo : form.docNo) || `69${Math.floor(100000 + Math.random() * 899999)}`,
    passDate: form.typeCode === 'CQW' ? (inHand.value ? '' : form.passDate) : form.payDate
  })
}
</script>
