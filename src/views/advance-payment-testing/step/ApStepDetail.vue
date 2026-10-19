<template>
  <div>
    <div class="apt-pagehead">
      <div class="apt-pagehead-left">
        <button type="button" class="apt-back" aria-label="กลับไปหน้ารายการ" @click="go('list')"><AptIcon name="back" /></button>
        <h1>{{ rf.isNew ? 'สร้างคำขอเงินทดรองจ่าย' : `รายละเอียดเงินทดรองจ่าย ${rf.doc.docNo}` }}</h1>
        <StatusChip v-if="rf.status" :status="rf.status" />
      </div>
      <div v-if="!rf.isNew" class="apt-pagehead-actions">
        <button type="button" class="apt-btn apt-btn-danger" @click="rf.onCancel"><AptIcon name="cancel" /> ยกเลิกคำขอ</button>
        <GlMenu :doc="rf.doc" />
        <PrintMenu :doc="rf.doc" />
      </div>
    </div>

    <div class="apt-content">
      <div v-if="rf.status === 'cancelled' && rf.doc.cancellation" class="apt-banner apt-banner--muted">
        <AptIcon name="info" />
        <div><b>คำขอนี้ถูกยกเลิกแล้ว</b>ยกเลิกโดย {{ rf.doc.cancellation.by }} · {{ fmtDate(rf.doc.cancellation.at) }}</div>
      </div>

      <div class="apt-step-grid">
        <aside class="apt-step-rail">
          <StepperBar :steps="steps" vertical :class="{ 'apt-stp--rejected': rf.status === 'rejected' }" @select="goToSection" />
          <dl class="apt-step-facts">
            <div><dt>ผู้เบิก</dt><dd>{{ vendorById(factSource.vendorId)?.name || '—' }}</dd></div>
            <div><dt>ครบกำหนดเคลียร์</dt><dd>{{ factSource.dueDate ? fmtDate(factSource.dueDate) : '—' }}</dd></div>
            <div><dt>เงินที่ขอเบิก</dt><dd>{{ factSource.requestedAmount ? `${fmtMoney(factSource.requestedAmount)} บาท` : '—' }}</dd></div>
            <div><dt>ยอดจ่ายชำระ</dt><dd>{{ factSource.payments.length ? `${fmtMoney(requestTotal(factSource))} บาท` : '—' }}</dd></div>
            <div v-if="cf && cf.draft.rows.length"><dt>ยอดเคลียร์</dt><dd>{{ fmtMoney(cf.clrTotal) }} บาท</dd></div>
          </dl>
        </aside>

        <div class="apt-step-main">
          <StepperBar :steps="steps" class="apt-step-hbar" :class="{ 'apt-stp--rejected': rf.status === 'rejected' }" @select="goToSection" />

          <!-- 1 · ข้อมูลคำขอ -->
          <StepSection
            id="aps-0" :num="1" title="ข้อมูลคำขอ"
            :state="state0" :badge="state0 === 'active' ? 'ต้องทำตอนนี้' : ''" :summary="summary0"
            :open="isOpen(0)" :toggleable="!rf.isNew" @update:open="v => setOpen(0, v)"
          >
            <template v-if="rf.isNew || editing">
              <RequestFields :rf="rf" />
              <div v-if="!rf.isNew || !payOpen" class="apt-sec-actions">
                <button type="button" class="apt-btn apt-btn-primary" @click="saveRequest"><AptIcon name="save" /> {{ saveLabel }}</button>
                <button v-if="editing" type="button" class="apt-btn apt-btn-ghost" @click="cancelEdit">ยกเลิกการแก้ไข</button>
                <span v-if="rf.isNew" class="apt-sec-hint">ยังไม่ได้จ่ายเงิน? บันทึกได้เลย คำขอจะเป็นสถานะ “รอเบิก”</span>
              </div>
            </template>
            <template v-else>
              <dl class="apt-kv">
                <div><dt>เลขที่เอกสาร</dt><dd>{{ rf.doc.docNo }}</dd></div>
                <div><dt>วันที่สร้าง</dt><dd>{{ fmtDate(rf.doc.createdAt) }}</dd></div>
                <div><dt>วันที่ครบกำหนดเคลียร์</dt><dd>{{ fmtDate(rf.doc.dueDate) }}</dd></div>
                <div><dt>เงินที่ขอเบิก</dt><dd>{{ rf.doc.requestedAmount ? `${fmtMoney(rf.doc.requestedAmount)} บาท` : '—' }}</dd></div>
                <div><dt>ผู้จัดจำหน่าย/ผู้เบิก</dt><dd>{{ vendorById(rf.doc.vendorId)?.name || '—' }}</dd></div>
                <div class="apt-kv-wide"><dt>คำอธิบาย</dt><dd>{{ rf.doc.description }}</dd></div>
                <div class="apt-kv-full"><dt>เอกสารประกอบ</dt><dd>{{ rf.doc.files.length ? rf.doc.files.map(f => f.name).join(', ') : '—' }}</dd></div>
              </dl>
              <div class="apt-sec-actions">
                <button type="button" class="apt-btn apt-btn-outline" @click="startEdit"><AptIcon name="edit" /> แก้ไขข้อมูลคำขอ</button>
              </div>
            </template>
          </StepSection>

          <!-- 2 · จ่ายชำระ -->
          <StepSection
            id="aps-1" :num="2" title="จ่ายชำระ"
            :state="rf.isNew ? 'optional' : state1" :tone="rf.status === 'cancelled' ? 'muted' : ''"
            :badge="state1 === 'active' && !rf.isNew ? 'ต้องทำตอนนี้' : ''" :summary="summary1"
            :open="isOpen(1)" :toggleable="rf.isNew || state1 !== 'pending'" :toggle-label="rf.isNew ? 'กรอกตอนนี้' : 'ดูรายละเอียด'"
            @update:open="v => (rf.isNew ? (payOpen = v) : setOpen(1, v))"
          >
            <template #chip><span v-if="rf.isNew" class="apt-optional-tag">ไม่บังคับ</span></template>
            <RequestPayments :rf="rf" />
            <div class="apt-sec-actions">
              <button v-if="rf.isNew || ['awaiting-disburse', 'awaiting-clear'].includes(rf.status)" type="button" class="apt-btn apt-btn-primary" @click="saveRequest">
                <AptIcon name="save" /> {{ rf.isNew ? saveLabel : 'บันทึกการจ่ายชำระ' }}
              </button>
              <span v-if="rf.status === 'awaiting-disburse'" class="apt-sec-hint">เพิ่มรายการโอน/เช็คอย่างน้อย 1 รายการ แล้วกดบันทึก สถานะจะเป็น “รอเคลียร์”</span>
              <span v-else-if="rf.status === 'awaiting-clear'" class="apt-sec-hint">ลบรายการชำระออกทั้งหมดแล้วบันทึก เพื่อถอยกลับเป็น “รอเบิก”</span>
            </div>
          </StepSection>

          <!-- 3 · เคลียร์เงิน -->
          <StepSection
            id="aps-2" :num="3" title="เคลียร์เงิน"
            :state="state2" :tone="rf.status === 'rejected' ? 'error' : rf.status === 'cancelled' ? 'muted' : ''"
            :badge="badge2" :summary="summary2"
            :open="isOpen(2)" :toggleable="state2 !== 'pending'" @update:open="v => setOpen(2, v)"
          >
            <template #chip><StatusChip v-if="['awaiting-confirm', 'rejected'].includes(rf.status)" :status="rf.status" /></template>
            <template v-if="cf">
              <div v-if="rf.status === 'rejected' && rf.doc.rejection" class="apt-banner apt-banner--error" role="alert">
                <AptIcon name="alert" />
                <div><b>ไม่ผ่านการอนุมัติ</b>{{ rf.doc.rejection.reason }} · โดย {{ rf.doc.rejection.by }} · {{ fmtDate(rf.doc.rejection.at) }}</div>
              </div>
              <ClearingFields :cf="cf" :show-request="false" />
              <div class="apt-sec-actions">
                <template v-if="rf.status === 'awaiting-clear'">
                  <button type="button" class="apt-btn apt-btn-primary" @click="cf.onSave"><AptIcon name="save" /> บันทึกเอกสารเคลียร์</button>
                  <span class="apt-sec-hint">บันทึกแล้วสถานะจะเป็น “รอยืนยันเคลียร์” เพื่อรอผู้อนุมัติ</span>
                </template>
                <!-- edit actions first, then a divider, then the decision -->
                <template v-else-if="rf.status === 'awaiting-confirm'">
                  <button type="button" class="apt-btn apt-btn-outline" @click="cf.onSave"><AptIcon name="save" /> บันทึก</button>
                  <button type="button" class="apt-btn apt-btn-ghost" @click="cf.onCancel">ยกเลิกการเคลียร์</button>
                  <span class="apt-vsep" aria-hidden="true"></span>
                  <button type="button" class="apt-btn apt-btn-danger" @click="cf.onReject">ไม่อนุมัติ</button>
                  <button type="button" class="apt-btn apt-btn-primary" @click="cf.onApprove">อนุมัติ <AptIcon name="next" /></button>
                </template>
                <template v-else-if="rf.status === 'rejected'">
                  <button type="button" class="apt-btn apt-btn-outline" @click="cf.onSave"><AptIcon name="save" /> บันทึก</button>
                  <button type="button" class="apt-btn apt-btn-ghost" @click="cf.onCancel">ยกเลิกการเคลียร์</button>
                  <span class="apt-vsep" aria-hidden="true"></span>
                  <button type="button" class="apt-btn apt-btn-primary" @click="cf.onResubmit">ยื่นคำขออนุมัติ <AptIcon name="next" /></button>
                </template>
                <template v-else-if="rf.status === 'cleared'">
                  <button type="button" class="apt-btn apt-btn-outline" @click="showToast('เปิดหน้าพิมพ์เอกสารเคลียร์ (ตัวอย่างสาธิต)')"><AptIcon name="print" /> พิมพ์เอกสารเคลียร์</button>
                </template>
              </div>
            </template>
          </StepSection>
        </div>
      </div>
    </div>

    <!-- outside the sections so a dialog survives its section folding on a status change -->
    <RequestDialogs :rf="rf" />
    <ClearingDialogs v-if="cf" :cf="cf" />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import AptIcon from '../AptIcon.vue'
import StatusChip from '../StatusChip.vue'
import RequestFields from '../RequestFields.vue'
import RequestPayments from '../RequestPayments.vue'
import ClearingFields from '../ClearingFields.vue'
import RequestDialogs from '../RequestDialogs.vue'
import ClearingDialogs from '../ClearingDialogs.vue'
import GlMenu from '../GlMenu.vue'
import PrintMenu from '../PrintMenu.vue'
import StepperBar from '../../advance-payment-v3/StepperBar.vue'
import StepSection from './StepSection.vue'
import { useRequestForm } from '../useRequestForm.js'
import { useClearingForm } from '../useClearingForm.js'
import { useAptStore, vendorById, fmtDate, fmtMoney, requestTotal, clearTotal } from '../store.js'
import { buildSteps, currentStep, sectionState } from './steps.js'

const props = defineProps({ docId: { type: String, default: null } })
const { go, showToast } = useAptStore()

// locked-action warnings jump to the clearing section on this page instead of another page
const rf = useRequestForm({ docId: props.docId, detailPage: 'detail', onGoClear: () => goToSection(2) })
const cf = props.docId ? useClearingForm({ docId: props.docId, onLeave: () => setOpen(2, false) }) : null

const payOpen = ref(false) // new request: fill the payment now (T1+T3) or later
const editing = ref(false) // section 1 switched from summary to form

const steps = computed(() => buildSteps(rf.doc, { payOpen: payOpen.value }))
const state0 = computed(() => (rf.isNew ? 'active' : sectionState(0, rf.status)))
const state1 = computed(() => sectionState(1, rf.status))
const state2 = computed(() => (rf.isNew ? 'pending' : sectionState(2, rf.status)))
// the facts rail follows the form while creating, the saved document afterwards
const factSource = computed(() => (rf.isNew ? rf.draft : rf.doc))
const saveLabel = computed(() => (rf.isNew && rf.draft.payments.length ? 'บันทึกคำขอและการจ่ายชำระ' : 'บันทึกคำขอ'))

const summary0 = computed(() => {
  if (rf.isNew) return 'ระบุวันที่ เงินที่ขอเบิก รายละเอียด และผู้เบิก'
  return `${vendorById(rf.doc.vendorId)?.name || '—'} · บันทึก ${fmtDate(rf.doc.createdAt)} · ครบกำหนดเคลียร์ ${fmtDate(rf.doc.dueDate)}`
})
const summary1 = computed(() => {
  if (rf.isNew) return payOpen.value ? 'ปิดเพื่อกรอกภายหลัง — คำขอจะเป็นสถานะรอเบิก' : 'จ่ายเงินแล้ว? กรอกตอนนี้เพื่อข้ามไปเป็นรอเคลียร์ทันที'
  if (rf.status === 'cancelled') return 'คำขอถูกยกเลิก'
  if (rf.status === 'awaiting-disburse') return 'เลือกวิธีการชำระและระบุจำนวนเงินที่จ่ายจริง'
  return `${rf.doc.payments.length} รายการ · ${fmtMoney(requestTotal(rf.doc))} บาท · ${rf.doc.pv ? `ลงบัญชี ${rf.doc.pv.no}` : 'ยังไม่ลงบัญชี'}`
})
const summary2 = computed(() => {
  switch (rf.status) {
    case 'awaiting-clear': return 'เมื่อใช้เงินเสร็จแล้ว (เช่น อีก 1–2 เดือน) ค่อยกลับมาบันทึกค่าใช้จ่ายจริง แล้วชำระหรือรับคืนส่วนต่าง'
    case 'awaiting-confirm': return 'ส่งเอกสารเคลียร์แล้ว รอผู้อนุมัติตรวจสอบ'
    case 'rejected': return `ไม่ผ่าน: ${rf.doc.rejection?.reason || ''}`
    case 'cleared': return `ยอดเคลียร์ ${fmtMoney(clearTotal(rf.doc.clearing))} บาท · ${rf.doc.clearing?.gl ? `ลงบัญชี ${rf.doc.clearing.gl.no}` : 'ยังไม่ลงบัญชี'}`
    case 'cancelled': return 'คำขอถูกยกเลิก'
    default: return 'เปิดให้กรอกหลังบันทึกการจ่ายชำระแล้ว'
  }
})
const badge2 = computed(() => ({ 'awaiting-clear': 'ทำภายหลังได้', rejected: 'ต้องแก้ไข' })[rf.status] || '')

// ---------- which sections are expanded ----------
const openSet = ref(new Set())
function resetOpen() {
  const cur = currentStep(rf.status)
  openSet.value = new Set(cur >= 0 && cur <= 2 ? [cur] : [])
}
resetOpen()
function isOpen(i) {
  if (rf.isNew) return i === 0 || (i === 1 && payOpen.value)
  return sectionState(i, rf.status) !== 'pending' && openSet.value.has(i)
}
function setOpen(i, v) {
  const next = new Set(openSet.value)
  if (v) next.add(i)
  else next.delete(i)
  openSet.value = next
}
async function goToSection(i) {
  if (sectionState(i, rf.status) === 'pending') return
  setOpen(i, true)
  await nextTick()
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(`aps-${i}`)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

// after every status change: fold finished steps and bring the current one into view (v3 behaviour)
watch(() => rf.status, async () => {
  editing.value = false
  resetOpen()
  const cur = currentStep(rf.status)
  if (cur >= 0 && cur <= 2) {
    await nextTick()
    goToSection(cur)
  }
})

// ---------- section 1 edit mode ----------
function startEdit() {
  if (rf.locked) return rf.warnEdit()
  editing.value = true
  setOpen(0, true)
}
function cancelEdit() {
  rf.resetDraft()
  editing.value = false
}
async function saveRequest() {
  const saved = await rf.onSave()
  if (saved) editing.value = false
}
</script>
