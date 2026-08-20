<template>
  <div class="agl-page">
    <div class="agl-topbar">
      <router-link class="agl-exit" to="/">← หน้าหลัก</router-link>
      <div class="agl-breadcrumb">
        ตั้งค่าโครงการ <span class="agl-sep">›</span>
        บัญชีการเงิน <span class="agl-sep">›</span>
        ตั้งค่าบัญชี <span class="agl-sep">›</span>
        <span class="agl-bc-current">ตั้งค่าการบันทึกบัญชี</span>
      </div>
      <div class="agl-topbar-spacer"></div>
      <span class="agl-project-badge">T-001 : โครงการนิติบุคคล หมื่นสิริ คอนโดมิเนียม เขตบางนา</span>
      <button type="button" class="agl-btn-primary agl-btn-sm" @click="save">
        💾 บันทึก
      </button>
    </div>

    <div class="agl-intro">
      <h1>ตั้งค่าการบันทึกบัญชี</h1>
      <p>
        ระบบสร้างเอกสารบัญชีแยกประเภท (GL Voucher) ให้อัตโนมัติจากรายรับ-รายจ่ายของโครงการ
        เริ่มต้นเฟสแรกรองรับเฉพาะ <strong>ใบเสร็จ</strong> — เอกสารประเภทอื่นจะตามมาในเฟสถัดไป
      </p>
    </div>

    <div class="agl-panel">
      <h2 class="agl-panel-title">ตั้งค่าบันทึกบัญชีอัตโนมัติ</h2>

      <!-- Receipt row (active, phase 1) -->
      <div class="agl-doctype-row agl-doctype-active">
        <div class="agl-doctype-left">
          <span class="agl-doctype-name">ใบเสร็จ</span>
          <span class="agl-phase-tag">เฟส 1</span>
        </div>
        <button type="button" class="agl-toggle-link" @click="expanded = !expanded">
          {{ expanded ? 'ซ่อน' : 'แสดง' }}
        </button>
      </div>

      <div v-if="expanded" class="agl-doctype-body">
        <label class="agl-switch-row">
          <span class="agl-switch">
            <input type="checkbox" v-model="enabled" />
            <span class="agl-switch-track"><span class="agl-switch-thumb"></span></span>
          </span>
          <span class="agl-switch-label">บันทึกบัญชีใบเสร็จอัตโนมัติ — {{ enabled ? 'ใช้งาน' : 'ไม่ใช้งาน' }}</span>
        </label>

        <template v-if="enabled">
          <div class="agl-section-title">รูปแบบบันทึกบัญชีกึ่งอัตโนมัติ</div>

          <div class="agl-fields">
            <div class="agl-field">
              <label class="agl-field-label">วิธีการบันทึก</label>
              <select class="agl-select" v-model="recordingMethod">
                <option v-for="opt in RECORDING_METHODS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="agl-field">
              <label class="agl-field-label">ตอนที่บันทึก รวมรายการ (compound cash/slip) หรือไม่</label>
              <select class="agl-select" v-model="compoundMode">
                <option v-for="opt in COMPOUND_MODES" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
          </div>

          <div class="agl-sample-note">
            ตัวอย่างสมมติ: เดือนนี้มีใบเสร็จ {{ sampleReceipts }} ใบ กระจายอยู่ {{ sampleDays }} วัน
          </div>

          <div class="agl-preview">
            <div class="agl-preview-title">ตัวอย่างการทำงานของระบบ ตามการตั้งค่า</div>
            <div class="agl-steps">
              <div class="agl-step" v-for="(step, i) in steps" :key="i">
                <div class="agl-step-head">
                  <span class="agl-step-num">{{ i + 1 }}</span>
                  <span class="agl-step-title">{{ step.title }}</span>
                </div>
                <div class="agl-step-icon">{{ step.icon }}</div>
                <p class="agl-step-desc">{{ step.desc }}</p>
              </div>
            </div>

            <div class="agl-estimate">
              <span class="agl-estimate-label">ผลลัพธ์: จะเกิด Voucher ประมาณ</span>
              <span class="agl-estimate-value">{{ voucherEstimate }}</span>
            </div>
          </div>
        </template>

        <div v-else class="agl-disabled-note">
          ปิดการใช้งานอยู่ — ระบบจะไม่สร้าง Voucher ให้อัตโนมัติ ต้องบันทึกบัญชีสำหรับใบเสร็จด้วยมือ
        </div>
      </div>

      <!-- Future doc types, disabled -->
      <div class="agl-doctype-row agl-doctype-future" v-for="dt in FUTURE_DOC_TYPES" :key="dt">
        <div class="agl-doctype-left">
          <span class="agl-doctype-name agl-doctype-name-disabled">{{ dt }}</span>
          <span class="agl-future-tag">เร็วๆ นี้ — เฟสต่อไป</span>
        </div>
      </div>
    </div>

    <transition name="agl-toast-fade">
      <div v-if="toast" class="agl-toast">{{ toast }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const RECORDING_METHODS = [
  { value: 'daily', label: 'สรุปเมื่อสิ้นวัน' },
  { value: 'monthly-split', label: 'สรุปเมื่อสิ้นเดือน แต่แยก Voucher ตามวันที่ใบเสร็จ' },
  { value: 'monthly-single', label: 'สรุปเมื่อสิ้นเดือน สรุปเป็น 1 Voucher' }
]

const COMPOUND_MODES = [
  { value: 'compound', label: 'รวมรายการ' },
  { value: 'none', label: 'ไม่รวมรายการ' }
]

const FUTURE_DOC_TYPES = ['ใบแจ้งหนี้ (Invoice)', 'ใบลดหนี้ (Credit Note)', 'รายจ่าย (Expense)']

const expanded = ref(true)
const enabled = ref(true)
const recordingMethod = ref('monthly-split')
const compoundMode = ref('none')

const sampleReceipts = 30
const sampleDays = 22

const toast = ref('')
let toastTimer = null
function save() {
  toast.value = 'บันทึกการตั้งค่าแล้ว'
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 2200)
}

const START_TEXT = {
  daily: 'เริ่มทำงานเมื่อถึงเวลา 23:00 ของทุกวัน',
  'monthly-split': 'เริ่มทำงานเมื่อถึงเวลา 23:00 ของทุกวัน',
  'monthly-single': 'เริ่มทำงานเมื่อถึงเวลา 23:00 ของวันสุดท้ายของเดือน'
}

const COLLECT_TEXT = {
  daily: 'ระบบจะสรุปใบเสร็จของวันนั้นๆ (ยึดตาม receipt date) เป็น 1 Voucher ต่อวัน',
  'monthly-split': 'ระบบจะสรุปใบเสร็จของวันนั้นๆ (ยึดตาม receipt date) เป็น 1 Voucher',
  'monthly-single': 'ระบบจะรวบรวมใบเสร็จทั้งเดือนไว้รอสรุป จนกว่าจะถึงวันสิ้นเดือน'
}

const RESULT_TEXT = {
  daily: 'รายการผังบัญชีของวันนั้นจะถูกบันทึกเป็น Voucher แยกรายวัน',
  'monthly-split': 'รายการผังบัญชีที่ซ้ำซ้อนกัน จะถูกบันทึกในบรรทัดเดียว',
  'monthly-single': 'ทุก Voucher รายวันของเดือนนั้นจะถูกรวบเป็น Voucher เดียว ก่อนบันทึกเข้าบัญชี'
}

const steps = computed(() => {
  const compoundSuffix = compoundMode.value === 'compound'
    ? ' และรวมรายการที่ชำระด้วยวิธีเดียวกัน (เงินสด/สลิป) เข้าด้วยกันก่อนบันทึก'
    : ''
  return [
    { icon: '🕐', title: 'ถึงเวลา เริ่มรวบรวม', desc: START_TEXT[recordingMethod.value] },
    { icon: '🗂️', title: 'นำใบเสร็จลงบัญชีอัตโนมัติ', desc: COLLECT_TEXT[recordingMethod.value] + compoundSuffix },
    { icon: '🧾', title: 'รวมรายการในรายละเอียด', desc: RESULT_TEXT[recordingMethod.value] }
  ]
})

const voucherEstimate = computed(() => {
  switch (recordingMethod.value) {
    case 'daily': return `${sampleDays} Voucher (1 วัน = 1 Voucher)`
    case 'monthly-split': return `${sampleDays} Voucher (เท่ากับจำนวนวันที่มีใบเสร็จ)`
    case 'monthly-single': return '1 Voucher (รวมทั้งเดือน)'
    default: return ''
  }
})
</script>

<style scoped>
.agl-page {
  padding: 32px 40px 80px;
  max-width: 1080px;
  margin: 0 auto;
  font-family: var(--font-family);
}

.agl-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.agl-exit {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  flex: none;
}
.agl-exit:hover { color: var(--color-primary-500); }

.agl-breadcrumb {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}
.agl-sep { margin: 0 4px; color: var(--color-text-placeholder); }
.agl-bc-current { color: var(--color-text-primary); font-weight: 600; }

.agl-topbar-spacer { flex: 1; }

.agl-project-badge {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  background: var(--color-disabled-bg);
  padding: 6px 12px;
  border-radius: var(--radius-md);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
}

.agl-intro { margin-bottom: 24px; }
.agl-intro h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}
.agl-intro p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-sm);
}

.agl-panel {
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.agl-panel-title {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.agl-doctype-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  margin-bottom: 8px;
}

.agl-doctype-active {
  background: var(--color-disabled-bg);
}

.agl-doctype-future {
  background: var(--color-white);
  border: 1px dashed var(--color-dividers);
}

.agl-doctype-left { display: flex; align-items: center; gap: 10px; }

.agl-doctype-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
}
.agl-doctype-name-disabled { color: var(--color-text-disabled); font-weight: 400; }

.agl-phase-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary-500);
  background: var(--color-primary-200);
  padding: 2px 8px;
  border-radius: 999px;
}

.agl-future-tag {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.agl-toggle-link {
  background: none;
  border: none;
  font-size: var(--font-size-sm);
  color: var(--color-primary-500);
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
}
.agl-toggle-link:hover { text-decoration: underline; }

.agl-doctype-body { padding: 20px 8px 4px; }

.agl-switch-row {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 24px;
}

.agl-switch { position: relative; display: inline-block; width: 40px; height: 22px; flex: none; }
.agl-switch input { position: absolute; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
.agl-switch-track {
  position: absolute;
  inset: 0;
  background: var(--color-stroke);
  border-radius: 999px;
  transition: background 0.15s ease;
}
.agl-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: var(--color-white);
  border-radius: 50%;
  transition: transform 0.15s ease;
  box-shadow: var(--shadow-header);
}
.agl-switch input:checked + .agl-switch-track { background: var(--color-primary-500); }
.agl-switch input:checked + .agl-switch-track .agl-switch-thumb { transform: translateX(18px); }

.agl-switch-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.agl-section-title {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}

.agl-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.agl-field { display: flex; flex-direction: column; gap: 6px; }
.agl-field-label { font-size: var(--font-size-xs); color: var(--color-text-secondary); font-weight: 600; }

.agl-select {
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-md);
  padding: 9px 10px;
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  background: var(--color-white);
  color: var(--color-text-primary);
}
.agl-select:focus { outline: none; border-color: var(--color-primary-500); }

.agl-sample-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-style: italic;
  margin-bottom: 20px;
}

.agl-preview {
  background: #F4F6FA;
  border-radius: var(--radius-lg);
  padding: 20px;
}

.agl-preview-title {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.agl-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.agl-step {
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-md);
  padding: 16px;
  text-align: center;
}

.agl-step-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  text-align: left;
}

.agl-step-num {
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-primary-500);
  color: var(--color-white);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.agl-step-title {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-primary-500);
}

.agl-step-icon { font-size: 32px; margin-bottom: 12px; }

.agl-step-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-xs);
}

.agl-estimate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-dividers);
}
.agl-estimate-label { font-size: var(--font-size-xs); color: var(--color-text-secondary); }
.agl-estimate-value { font-size: var(--font-size-sm); font-weight: 700; color: var(--color-success); }

.agl-disabled-note {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  background: var(--color-disabled-bg);
  border-radius: var(--radius-md);
  padding: 14px 16px;
}

.agl-btn-primary {
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  cursor: pointer;
  padding: 7px 14px;
  border: 1px solid transparent;
  background: var(--color-primary-500);
  color: var(--color-white);
}
.agl-btn-primary:hover { background: var(--color-primary-click); }
.agl-btn-sm { padding: 6px 12px; font-size: var(--font-size-xs); flex: none; white-space: nowrap; }

.agl-toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-text-primary);
  color: var(--color-white);
  padding: 10px 18px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  z-index: 200;
}
.agl-toast-fade-enter-active, .agl-toast-fade-leave-active { transition: opacity 0.2s ease; }
.agl-toast-fade-enter-from, .agl-toast-fade-leave-to { opacity: 0; }

@media (max-width: 760px) {
  .agl-fields { grid-template-columns: 1fr; }
  .agl-steps { grid-template-columns: 1fr; }
}
</style>
