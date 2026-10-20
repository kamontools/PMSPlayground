<template>
  <div>
    <div class="apt-pagehead">
      <div class="apt-pagehead-left">
        <button type="button" class="apt-back" aria-label="กลับไปหน้ารายการ" @click="backToList"><AptIcon name="back" /></button>
        <h1>{{ rf.isNew ? 'สร้างคำขอเงินทดรองจ่าย' : `รายละเอียดเงินทดรองจ่าย ${rf.doc.docNo}` }}</h1>
        <StatusChip v-if="rf.status" :status="rf.status" />
      </div>
      <!-- creating: the only action is saving, kept in the sticky toolbar -->
      <div v-if="rf.isNew" class="apt-pagehead-actions">
        <button type="button" class="apt-btn apt-btn-primary" @click="saveRequest"><AptIcon name="save" /> {{ saveLabel }}</button>
      </div>
      <div v-else class="apt-pagehead-actions">
        <GlMenu :doc="rf.doc" />
        <PrintMenu :doc="rf.doc" />
        <!-- the next thing to do: jump to its section and point at where to fill it in -->
        <template v-if="['awaiting-disburse', 'awaiting-clear', 'awaiting-confirm'].includes(rf.status)">
          <span class="apt-vsep" aria-hidden="true"></span>
          <button v-if="rf.status === 'awaiting-disburse'" type="button" class="apt-btn apt-btn-primary" @click="jumpTo(1)"><AptIcon name="next" /> จ่ายชำระ</button>
          <button v-else-if="rf.status === 'awaiting-clear'" type="button" class="apt-btn apt-btn-primary" @click="jumpTo(2)"><AptIcon name="next" /> เคลียร์เงิน</button>
          <!-- รอยืนยันเคลียร์: the approver reviews the clearing (read-only), its decision buttons sit on that section -->
          <button v-else type="button" class="apt-btn apt-btn-primary" @click="goToSection(2)"><AptIcon name="next" /> ตรวจสอบ</button>
        </template>
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
        </aside>

        <div class="apt-step-main">
          <StepperBar :steps="steps" class="apt-step-hbar" :class="{ 'apt-stp--rejected': rf.status === 'rejected' }" @select="goToSection" />

          <!-- 1 · ข้อมูลคำขอ -->
          <StepSection
            id="aps-0" :num="1" title="ข้อมูลคำขอ"
            :state="state0" :badge="rf.isNew ? 'ต้องทำตอนนี้' : ''"
            :open="isOpen(0)" :toggleable="false"
          >
            <template v-if="editing" #action>
              <!-- editing: cancel + save take แก้ไข's place (save rightmost); save waits for a change so a double-click on แก้ไข can't save -->
              <button type="button" class="apt-btn apt-btn-ghost" @click="cancelEdit">ยกเลิกการแก้ไข</button>
              <button type="button" class="apt-btn apt-btn-primary" :disabled="!rf.dirty" @click="saveRequest"><AptIcon name="save" /> บันทึก</button>
            </template>
            <template v-else-if="!rf.isNew" #action>
              <!-- locked statuses keep the button so the guard() warning still explains why -->
              <button type="button" class="apt-btn apt-btn-danger" @click="rf.onCancel"><AptIcon name="cancel" /> ยกเลิกคำขอ</button>
              <button type="button" class="apt-btn apt-btn-outline" @click="startEdit"><AptIcon name="edit" /> แก้ไข</button>
            </template>
            <RequestFields v-if="rf.isNew || editing" :rf="rf" />
            <template v-else>
              <dl class="apt-kv">
                <div><dt>เลขที่เอกสาร</dt><dd>{{ rf.doc.docNo }}</dd></div>
                <div><dt>วันที่สร้าง</dt><dd>{{ fmtDate(rf.doc.createdAt) }}</dd></div>
                <div><dt>วันที่ครบกำหนดเคลียร์</dt><dd>{{ fmtDate(rf.doc.dueDate) }}</dd></div>
                <div><dt>เงินที่ขอเบิก</dt><dd>{{ rf.doc.requestedAmount ? `${fmtMoney(rf.doc.requestedAmount)} บาท` : '—' }}</dd></div>
                <div><dt>ผู้จัดจำหน่าย/ผู้เบิก</dt><dd>{{ vendorById(rf.doc.vendorId)?.name || '—' }}</dd></div>
                <div class="apt-kv-wide"><dt>คำอธิบาย</dt><dd>{{ rf.doc.description }}</dd></div>
                <div class="apt-kv-full"><dt>เอกสารประกอบ</dt><dd><FileLinks :files="rf.doc.files" /></dd></div>
              </dl>
            </template>
          </StepSection>

          <!-- 2 · การจ่ายชำระ (optional while creating) -->
          <StepSection
            id="aps-1" :num="2" title="การจ่ายชำระ"
            :state="rf.isNew ? 'optional' : state1" :tone="rf.status === 'cancelled' ? 'muted' : ''"
            :badge="state1 === 'active' && !rf.isNew ? 'ต้องทำตอนนี้' : ''"
            :open="isOpen(1)" :toggleable="false"
          >
            <template #chip><span v-if="rf.isNew" class="apt-optional-tag">ไม่บังคับ</span></template>
            <template v-if="payEditing" #action>
              <button type="button" class="apt-btn apt-btn-ghost" @click="cancelPayEdit">ยกเลิกการแก้ไข</button>
              <button type="button" class="apt-btn apt-btn-primary" :disabled="!rf.dirty" @click="savePayments"><AptIcon name="save" /> บันทึก</button>
            </template>
            <template v-else-if="!paymentsEditable" #action>
              <button type="button" class="apt-btn apt-btn-outline" @click="startPayEdit"><AptIcon name="edit" /> แก้ไข</button>
            </template>
            <!-- creating / รอเบิก with no payment yet: hidden behind one button until the user adds one -->
            <button v-if="!showPayments" type="button" class="apt-btn apt-btn-outline" @click="payOpen = true"><AptIcon name="plus" /> เพิ่มการจ่ายชำระ</button>
            <Transition :css="false" @enter="expandEnter">
              <RequestPayments v-if="showPayments" :rf="rf" :readonly="!paymentsEditable" :coach="coach === 1 && 'กรอกชำระที่นี่แล้วกดบันทึก'" />
            </Transition>
            <!-- creating: saved from the toolbar -->
            <!-- รอเบิก: first-time entry, so its save stays at the end of the form -->
            <div v-if="!rf.isNew && !payEditing && paymentsEditable && showPayments" class="apt-sec-actions">
              <button type="button" class="apt-btn apt-btn-primary" @click="saveRequest"><AptIcon name="save" /> {{ saveLabel }}</button>
              <span class="apt-sec-hint">{{ saveHint }}</span>
            </div>
          </StepSection>

          <!-- 3 · เคลียร์เงิน (locked while creating) -->
          <StepSection
            id="aps-2" :num="3" title="เคลียร์เงิน"
            :state="state2" :tone="rf.status === 'rejected' ? 'error' : rf.status === 'cancelled' ? 'muted' : ''"
            :badge="badge2"
            :open="isOpen(2)" :toggleable="false"
          >
            <template #chip><StatusChip v-if="['awaiting-confirm', 'rejected'].includes(rf.status)" :status="rf.status" /></template>
            <template v-if="cf && clearEditing" #action>
              <button type="button" class="apt-btn apt-btn-ghost" @click="cancelClearEdit">ยกเลิกการแก้ไข</button>
              <button type="button" class="apt-btn apt-btn-primary" :disabled="!cf.dirty" @click="saveClearing"><AptIcon name="save" /> บันทึก</button>
            </template>
            <!-- view state: edit, withdraw, then a divider and the decision — all at the section's top right -->
            <template v-else-if="cf && !clearEditable && ['awaiting-confirm', 'rejected'].includes(rf.status)" #action>
              <button type="button" class="apt-btn apt-btn-outline" @click="startClearEdit"><AptIcon name="edit" /> แก้ไข</button>
              <button type="button" class="apt-btn apt-btn-ghost" @click="cf.onCancel">ยกเลิกการเคลียร์</button>
              <span class="apt-vsep" aria-hidden="true"></span>
              <template v-if="rf.status === 'awaiting-confirm'">
                <button type="button" class="apt-btn apt-btn-danger" @click="cf.onReject">ไม่อนุมัติ</button>
                <button type="button" class="apt-btn apt-btn-primary" @click="cf.onApprove">อนุมัติ <AptIcon name="next" /></button>
              </template>
              <button v-else type="button" class="apt-btn apt-btn-primary" @click="cf.onResubmit">ยื่นคำขออนุมัติ <AptIcon name="next" /></button>
            </template>
            <template v-if="cf">
              <div v-if="rf.status === 'rejected' && rf.doc.rejection" class="apt-banner apt-banner--error" role="alert">
                <AptIcon name="alert" />
                <div><b>ไม่ผ่านการอนุมัติ</b>{{ rf.doc.rejection.reason }} · โดย {{ rf.doc.rejection.by }} · {{ fmtDate(rf.doc.rejection.at) }}</div>
              </div>
              <!-- รอเคลียร์ with nothing filled in yet: hidden behind one button, like the payment step -->
              <button v-if="!showClearing" type="button" class="apt-btn apt-btn-outline" @click="clearOpen = true"><AptIcon name="plus" /> เพิ่มการเคลียร์เงิน</button>
              <Transition :css="false" @enter="expandEnter">
                <ClearingFields v-if="showClearing && clearEditable" :cf="cf" :show-request="false" :coach="coach === 2 ? 'กรอกค่าใช้จ่ายที่นี่แล้วกดบันทึก' : ''" />
              </Transition>
              <ClearingView v-if="showClearing && !clearEditable" :cf="cf" />
              <!-- รอเคลียร์: first-time entry, so submitting stays at the end of the form; editing saves from the header -->
              <div v-if="showClearing && rf.status === 'awaiting-clear'" class="apt-sec-actions">
                <button type="button" class="apt-btn apt-btn-primary" @click="cf.onSave"><AptIcon name="save" /> บันทึกเอกสารเคลียร์</button>
                <span class="apt-sec-hint">บันทึกแล้วสถานะจะเป็น “รอยืนยันเคลียร์” เพื่อรอผู้อนุมัติ</span>
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
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import AptIcon from '../AptIcon.vue'
import StatusChip from '../StatusChip.vue'
import RequestFields from '../RequestFields.vue'
import RequestPayments from '../RequestPayments.vue'
import ClearingFields from '../ClearingFields.vue'
import ClearingView from '../ClearingView.vue'
import FileLinks from '../FileLinks.vue'
import RequestDialogs from '../RequestDialogs.vue'
import ClearingDialogs from '../ClearingDialogs.vue'
import GlMenu from '../GlMenu.vue'
import PrintMenu from '../PrintMenu.vue'
import StepperBar from '../../advance-payment-v3/StepperBar.vue'
import StepSection from './StepSection.vue'
import { expandEnter } from './expand.js'
import { useRequestForm } from '../useRequestForm.js'
import { useClearingForm } from '../useClearingForm.js'
import { useAptStore, vendorById, fmtDate, fmtMoney } from '../store.js'
import { buildSteps, currentStep, sectionState } from './steps.js'

const props = defineProps({ docId: { type: String, default: null } })
const { state, go, ask } = useAptStore()

// locked-action warnings jump to the clearing section on this page instead of another page
const rf = useRequestForm({ docId: props.docId, detailPage: 'detail', onGoClear: () => goToSection(2) })
const cf = props.docId ? useClearingForm({ docId: props.docId }) : null

const editing = ref(false) // section 1 switched from summary to form

const steps = computed(() => buildSteps(rf.doc, { draftPaid: rf.isNew && rf.draft.payments.length > 0 }))
const state0 = computed(() => (rf.isNew ? 'active' : sectionState(0, rf.status)))
const state1 = computed(() => sectionState(1, rf.status))
const state2 = computed(() => (rf.isNew ? 'pending' : sectionState(2, rf.status)))

// payments: always editable while creating / รอเบิก, otherwise view-only until “แก้ไขการจ่ายชำระ”
const payEditing = ref(false)
const paymentsEditable = computed(() => rf.isNew || rf.status === 'awaiting-disburse' || payEditing.value)
// no payment yet (creating / รอเบิก): the table stays behind “เพิ่มการจ่ายชำระ” until opened
const payOpen = ref(false)
const showPayments = computed(() => payOpen.value || rf.draft.payments.length > 0 || !(rf.isNew || rf.status === 'awaiting-disburse'))
// clearing: the form while รอเคลียร์, view-only once submitted until “แก้ไขการเคลียร์”
const clearEditing = ref(false)
const clearEditable = computed(() => rf.status === 'awaiting-clear' || clearEditing.value)
// รอเคลียร์ and no clearing saved yet (a withdrawn one keeps its data): the form stays behind “เพิ่มการเคลียร์เงิน”
const clearOpen = ref(false)
const showClearing = computed(() => clearOpen.value || rf.status !== 'awaiting-clear' || !!rf.doc?.clearing || !!(cf && cf.dirty))
const saveLabel = computed(() => {
  if (rf.isNew) return rf.draft.payments.length ? 'บันทึกคำขอและการจ่ายชำระ' : 'บันทึกคำขอ'
  return 'บันทึก'
})
const saveHint = computed(() => {
  if (rf.status === 'awaiting-disburse') return 'เพิ่มรายการโอน/เช็คอย่างน้อย 1 รายการ แล้วกดบันทึก สถานะจะเป็น “รอเคลียร์”'
  if (rf.status === 'awaiting-clear') return 'ลบรายการชำระออกทั้งหมดแล้วบันทึก เพื่อถอยกลับเป็น “รอเบิก”'
  return ''
})

const badge2 = computed(() => ({ 'awaiting-clear': 'ทำภายหลังได้', rejected: 'ต้องแก้ไข' })[rf.status] || '')

// ---------- sections: no collapsing, every reachable section stays open ----------
function isOpen(s) {
  if (rf.isNew) return s <= 1
  return sectionState(s, rf.status) !== 'pending'
}
async function goToSection(s) {
  if (sectionState(s, rf.status) === 'pending') return
  await nextTick()
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(`aps-${s}`)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

// after every status change: bring the current section into view
watch(() => rf.status, async () => {
  editing.value = false
  payEditing.value = false
  clearEditing.value = false
  payOpen.value = false
  clearOpen.value = false
  dismissCoach()
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
}
async function cancelEdit() {
  if (!(await confirmDiscard(rf.dirty))) return
  rf.resetDraft()
  editing.value = false
}async function saveRequest() {
  const saved = await rf.onSave()
  if (saved) editing.value = false
}

// ---------- payments / clearing edit mode ----------
function startPayEdit() {
  if (rf.locked) return rf.warnEdit()
  payEditing.value = true
}
async function cancelPayEdit() {
  if (!(await confirmDiscard(rf.dirty))) return
  rf.resetDraft()
  payEditing.value = false
}
async function savePayments() {
  if (await rf.onSave()) payEditing.value = false
}
function startClearEdit() {
  if (cf.locked) return cf.warnEdit()
  clearEditing.value = true
}
async function cancelClearEdit() {
  if (!(await confirmDiscard(cf.dirty))) return
  cf.resetDraft()
  clearEditing.value = false
}
async function saveClearing() {
  if (await cf.onSave()) clearEditing.value = false
}

// ---------- toolbar "จ่ายชำระ" / "เคลียร์เงิน": scroll to the section + tooltip ----------
const coach = ref(0) // section showing the tooltip (0 = none)
function dismissCoach() {
  coach.value = 0
  document.removeEventListener('click', dismissCoach, true)
}
async function jumpTo(i) {
  if (i === 1) payOpen.value = true
  if (i === 2) clearOpen.value = true
  await goToSection(i)
  coach.value = i
  setTimeout(() => document.addEventListener('click', dismissCoach, true), 0) // next click anywhere hides it
}
onBeforeUnmount(() => document.removeEventListener('click', dismissCoach, true))
// opened from a list-row shortcut: เพิ่มการชำระ / เคลียร์เงิน point at the form, ตรวจสอบ just shows the clearing
onMounted(() => {
  const focus = state.nav.focus
  state.nav.focus = null
  if (focus === 'pay') jumpTo(1)
  else if (focus === 'clear') jumpTo(2)
  else if (focus === 'review') goToSection(2)
})

// ---------- unsaved edits ----------
const dirty = computed(() => rf.dirty || !!(cf && cf.dirty))
async function confirmDiscard(isDirty = dirty.value) {
  if (!isDirty) return true
  const { choice } = await ask({ title: 'ข้อความแจ้งเตือน', message: 'คุณต้องการละทิ้งการแก้ไขใช่หรือไม่?', tone: 'warning', cancelLabel: 'ปิด', confirmLabel: 'ยืนยัน' })
  return choice === 'confirm'
}
async function backToList() {
  if (await confirmDiscard()) go('list')
}
// sidebar links, the version switch, browser back
onBeforeRouteLeave(() => confirmDiscard())
</script>
