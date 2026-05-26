<template>
  <div class="page">
    <div class="shell">
      <div class="card">
        <div class="left">
          <div class="promo">
            <div class="promo-title">ย้ายผู้ใช้งานสู่ระบบสิทธิ์ใหม่</div>
            <div class="promo-subtitle">
              ทำตามขั้นตอนเพื่อเสนอผู้ดูแลระบบ (Project Admin / Super Admin) และเปิดใช้งานระบบสิทธิ์ใหม่
            </div>
            <ul class="promo-list">
              <li>เข้าสู่ระบบ</li>
              <li>เลือกโครงการ</li>
              <li>กรอกข้อมูลผู้ดูแลระบบ</li>
              <li>รอการอนุมัติจาก CS และเปิดใช้งานผ่านอีเมล</li>
            </ul>
          </div>
        </div>

        <div class="right">
          <div class="step-header">
            <div class="step-title">{{ stepTitle }}</div>
            <div class="step-hint">{{ stepHint }}</div>
          </div>

          <div v-if="step === 'login'" class="panel">
            <div class="field">
              <label class="label">ชื่อผู้ใช้</label>
              <input v-model.trim="login.username" class="input" autocomplete="username" />
            </div>
            <div class="field">
              <label class="label">รหัสผ่าน</label>
              <div class="password">
                <input
                  v-model="login.password"
                  class="input"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                />
                <button class="icon-btn" type="button" @click="showPassword = !showPassword">
                  {{ showPassword ? 'ซ่อน' : 'แสดง' }}
                </button>
              </div>
            </div>
            <div class="actions">
              <button class="btn-primary" :disabled="!canLogin || isBusy" @click="onLogin">
                {{ isBusy ? 'กำลังโหลด...' : 'เข้าสู่ระบบ' }}
              </button>
            </div>
          </div>

          <div v-else-if="step === 'project'" class="panel">
            <div class="search-row">
              <div class="search">
                <span class="search-icon">⌕</span>
                <input v-model.trim="projectQuery" class="search-input" placeholder="ระบุคำค้นหา" />
              </div>
              <button class="btn-primary" :disabled="isBusy" @click="loadProjects">ค้นหา</button>
            </div>

            <div class="table">
              <div class="thead">
                <div class="th radio"></div>
                <div class="th code">รหัส</div>
                <div class="th name">ชื่อภาษาไทย</div>
              </div>
              <div v-if="projects.length === 0" class="empty">
                ไม่พบข้อมูลโครงการ
              </div>
              <div
                v-for="p in projects"
                :key="p.id"
                class="trow"
                :class="{ selected: selectedProject?.id === p.id }"
                @click="selectProject(p)"
              >
                <div class="td radio">
                  <input type="radio" :checked="selectedProject?.id === p.id" />
                </div>
                <div class="td code">{{ p.code }}</div>
                <div class="td name">{{ p.nameTh }}</div>
              </div>
            </div>

            <div class="footer-actions">
              <button class="btn-secondary" type="button" @click="goBackToLogin">ปิด</button>
              <button class="btn-primary" type="button" :disabled="!selectedProject" @click="onConfirmProject">
                ตกลง
              </button>
            </div>
          </div>

          <div v-else-if="step === 'adminForm'" class="panel">
            <div class="summary">
              <div class="summary-title">โครงการที่เลือก</div>
              <div class="summary-value">{{ selectedProject?.code }} - {{ selectedProject?.nameTh }}</div>
            </div>

            <div class="inline-info" v-if="selectedProject?.hasAdmin">
              โครงการนี้มีผู้ดูแลระบบอยู่แล้ว คุณไม่จำเป็นต้องเสนอผู้ดูแลระบบใหม่
            </div>

            <div class="form-grid">
              <div class="field">
                <label class="label">อีเมล (จำเป็น)</label>
                <input v-model.trim="admin.email" class="input" placeholder="name@example.com" />
              </div>
              <div class="field">
                <label class="label">เบอร์โทรศัพท์ (จำเป็น)</label>
                <input v-model.trim="admin.telephone" class="input" placeholder="0xx-xxx-xxxx" />
              </div>
              <div class="field full">
                <label class="label">ชื่อ - นามสกุล Super Admin (จำเป็น)</label>
                <input v-model.trim="admin.fullName" class="input" placeholder="ชื่อ - นามสกุล" />
              </div>
              <div class="field full">
                <label class="label">ไฟล์แนบสำเนาบัตรประชาชน (จำเป็น)</label>
                <input class="input file" type="file" multiple @change="onFilesSelected" />
                <div v-if="adminFiles.length" class="file-hint">
                  เลือกแล้ว {{ adminFiles.length }} ไฟล์
                </div>
              </div>
            </div>

            <div class="actions">
              <button class="btn-secondary" type="button" @click="step = 'project'">ย้อนกลับ</button>
              <button class="btn-primary" type="button" :disabled="!canSubmit || isBusy" @click="submitSuggestion">
                {{ isBusy ? 'กำลังส่ง...' : 'ส่งข้อมูล' }}
              </button>
            </div>
          </div>

          <div v-else-if="step === 'success'" class="panel">
            <div class="success">
              <div class="success-title">ส่งข้อมูลเรียบร้อย</div>
              <div class="success-desc">
                CS จะตรวจสอบข้อมูลและกดอนุมัติ จากนั้นระบบจะส่งอีเมลไปยังผู้ดูแลระบบที่เสนอ เพื่อสมัครและเปิดใช้งานระบบสิทธิ์ใหม่
              </div>
              <div class="success-box">
                <div class="success-row">
                  <div class="k">โครงการ</div>
                  <div class="v">{{ submitted.projectCode }} - {{ submitted.projectNameTh }}</div>
                </div>
                <div class="success-row">
                  <div class="k">อีเมล</div>
                  <div class="v">{{ submitted.email }}</div>
                </div>
                <div class="success-row">
                  <div class="k">เบอร์โทร</div>
                  <div class="v">{{ submitted.telephone }}</div>
                </div>
                <div class="success-row">
                  <div class="k">ชื่อ Super Admin</div>
                  <div class="v">{{ submitted.fullName }}</div>
                </div>
                <div class="success-row">
                  <div class="k">ไฟล์แนบ</div>
                  <div class="v">{{ submitted.filesCount }} ไฟล์</div>
                </div>
              </div>

              <div class="actions">
                <button class="btn-primary" type="button" @click="resetFlow">เริ่มใหม่</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showEducationModal" class="modal-overlay" @click.self="closeEducationModal(false)">
      <div class="modal">
        <div class="modal-title">ก่อนเริ่มย้ายสู่ระบบสิทธิ์ใหม่</div>
        <div class="modal-body">
          <p>
            โครงการนี้ยังไม่มี <b>Project Admin</b> หรือ <b>Super Admin</b> ในระบบสิทธิ์ใหม่
            เพื่อให้การย้ายระบบสมบูรณ์ จำเป็นต้องระบุอีเมลของผู้ดูแลระบบโดยตรง
          </p>
          <p class="muted">
            หลังจากส่งข้อมูล CS จะตรวจสอบและอนุมัติ จากนั้นระบบจะส่งอีเมลไปยังผู้ดูแลระบบที่เสนอ
          </p>
        </div>
        <div class="modal-actions">
          <button class="btn-secondary" type="button" @click="closeEducationModal(false)">ปิด</button>
          <button class="btn-primary" type="button" @click="closeEducationModal(true)">ถัดไป</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const step = ref('login') // login | project | adminForm | success
const isBusy = ref(false)
const showPassword = ref(false)
const showEducationModal = ref(false)

const login = ref({
  username: '',
  password: ''
})

const projectQuery = ref('')
const projects = ref([])
const selectedProject = ref(null)

const admin = ref({
  email: '',
  telephone: '',
  fullName: ''
})
const adminFiles = ref([])

const submitted = ref({
  projectCode: '',
  projectNameTh: '',
  email: '',
  telephone: '',
  fullName: '',
  filesCount: 0
})

const canLogin = computed(() => login.value.username.length > 0 && login.value.password.length > 0)
const canSubmit = computed(() => {
  if (selectedProject.value?.hasAdmin) return false
  return (
    admin.value.email.length > 0 &&
    admin.value.telephone.length > 0 &&
    admin.value.fullName.length > 0 &&
    adminFiles.value.length > 0
  )
})

const stepTitle = computed(() => {
  if (step.value === 'login') return 'เข้าสู่ระบบ'
  if (step.value === 'project') return 'เลือกโครงการ'
  if (step.value === 'adminForm') return 'เสนอผู้ดูแลระบบ'
  if (step.value === 'success') return 'เสร็จสิ้น'
  return ''
})

const stepHint = computed(() => {
  if (step.value === 'login') return 'กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเริ่มต้น'
  if (step.value === 'project') return 'เลือกโครงการที่ต้องการย้ายสู่ระบบสิทธิ์ใหม่'
  if (step.value === 'adminForm') return 'กรอกข้อมูลผู้ดูแลระบบเพื่อให้ CS ตรวจสอบ'
  if (step.value === 'success') return 'ระบบบันทึกข้อมูลและรอการอนุมัติ'
  return ''
})

async function onLogin() {
  isBusy.value = true
  try {
    // This demo flow does not authenticate. It simulates a login and proceeds.
    await new Promise(r => setTimeout(r, 350))
    step.value = 'project'
    await loadProjects()
  } finally {
    isBusy.value = false
  }
}

function goBackToLogin() {
  step.value = 'login'
  selectedProject.value = null
  projects.value = []
}

function selectProject(p) {
  selectedProject.value = p
}

async function loadProjects() {
  isBusy.value = true
  try {
    const qs = new URLSearchParams()
    if (projectQuery.value) qs.set('q', projectQuery.value)
    const res = await fetch(`/api/migrate/projects?${qs.toString()}`)
    const data = await res.json()
    projects.value = data.projects || []
    if (selectedProject.value) {
      selectedProject.value = projects.value.find(p => p.id === selectedProject.value.id) || null
    }
  } finally {
    isBusy.value = false
  }
}

function onConfirmProject() {
  if (!selectedProject.value) return
  if (selectedProject.value.hasAdmin) {
    step.value = 'adminForm'
    return
  }
  showEducationModal.value = true
}

function closeEducationModal(proceed) {
  showEducationModal.value = false
  if (proceed) {
    step.value = 'adminForm'
  }
}

function onFilesSelected(e) {
  const files = Array.from(e.target.files || [])
  adminFiles.value = files
}

async function submitSuggestion() {
  if (!selectedProject.value) return
  isBusy.value = true
  try {
    const fd = new FormData()
    fd.set('projectId', selectedProject.value.id)
    fd.set('projectCode', selectedProject.value.code)
    fd.set('projectNameTh', selectedProject.value.nameTh)
    fd.set('email', admin.value.email)
    fd.set('telephone', admin.value.telephone)
    fd.set('fullName', admin.value.fullName)
    adminFiles.value.forEach(f => fd.append('idCardFiles', f))

    const res = await fetch('/api/migrate/suggest-admin', {
      method: 'POST',
      body: fd
    })
    if (!res.ok) throw new Error(`submit failed: ${res.status}`)
    const data = await res.json()

    submitted.value = {
      projectCode: data.projectCode,
      projectNameTh: data.projectNameTh,
      email: data.email,
      telephone: data.telephone,
      fullName: data.fullName,
      filesCount: data.filesCount
    }
    step.value = 'success'
  } finally {
    isBusy.value = false
  }
}

function resetFlow() {
  step.value = 'login'
  login.value = { username: '', password: '' }
  projectQuery.value = ''
  projects.value = []
  selectedProject.value = null
  admin.value = { email: '', telephone: '', fullName: '' }
  adminFiles.value = []
  submitted.value = {
    projectCode: '',
    projectNameTh: '',
    email: '',
    telephone: '',
    fullName: '',
    filesCount: 0
  }
}

onMounted(() => {
  // no-op; keeps component ready for future enhancements
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(90deg, #1f6ff0 0%, #2b84ff 45%, #f8f9fa 45%, #f8f9fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}

.shell {
  width: min(1100px, 100%);
}

.card {
  width: 100%;
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: var(--shadow-modal);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  min-height: 560px;
}

.left {
  background: transparent;
  padding: 34px 30px;
  display: flex;
  align-items: center;
}

.promo {
  color: rgba(255, 255, 255, 0.98);
  width: 100%;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 22px 22px 18px;
  backdrop-filter: blur(6px);
}

.promo-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.promo-subtitle {
  font-size: 14px;
  line-height: 20px;
  opacity: 0.95;
  margin-bottom: 14px;
}

.promo-list {
  padding-left: 18px;
  display: grid;
  gap: 6px;
  font-size: 14px;
}

.right {
  padding: 34px 34px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.step-header {
  margin-bottom: 18px;
}

.step-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.step-hint {
  margin-top: 6px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: grid;
  gap: 6px;
}

.field.full {
  grid-column: 1 / -1;
}

.label {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.input {
  width: 100%;
  height: 44px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-stroke);
  outline: none;
  font-size: 14px;
}

.input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(28, 112, 247, 0.16);
}

.input.file {
  height: auto;
  padding: 10px 12px;
}

.password {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
}

.icon-btn {
  height: 44px;
  padding: 0 12px;
  border: 1px solid var(--color-stroke);
  border-radius: 8px;
  background: var(--color-white);
  cursor: pointer;
  color: var(--color-text-secondary);
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 6px;
}

.btn-primary {
  height: 44px;
  padding: 10px 16px;
  background: var(--color-primary-500);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-white);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-click);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  height: 44px;
  padding: 10px 16px;
  background: var(--color-white);
  border: 1px solid var(--color-text-secondary);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--color-disabled-bg);
}

.search-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
}

.search {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  font-size: 14px;
}

.search-input {
  width: 100%;
  height: 44px;
  padding: 10px 12px 10px 34px;
  border-radius: 8px;
  border: 1px solid var(--color-stroke);
  outline: none;
  font-size: 14px;
}

.table {
  border: 1px solid var(--color-dividers);
  border-radius: 10px;
  overflow: hidden;
  background: var(--color-white);
}

.thead,
.trow {
  display: grid;
  grid-template-columns: 44px 120px 1fr;
  align-items: center;
}

.thead {
  background: #f5f6f7;
  border-bottom: 1px solid var(--color-dividers);
  height: 44px;
}

.th,
.td {
  padding: 0 12px;
  font-size: 13px;
}

.th {
  color: var(--color-text-secondary);
  font-weight: 700;
}

.trow {
  height: 46px;
  border-bottom: 1px solid var(--color-dividers);
  cursor: pointer;
}

.trow:last-child {
  border-bottom: none;
}

.trow:hover {
  background: rgba(28, 112, 247, 0.06);
}

.trow.selected {
  background: rgba(28, 112, 247, 0.1);
}

.empty {
  padding: 16px 12px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.footer-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.summary {
  border: 1px solid var(--color-dividers);
  background: #fbfcfd;
  border-radius: 10px;
  padding: 12px 14px;
  display: grid;
  gap: 4px;
}

.summary-title {
  font-weight: 700;
  color: var(--color-text-secondary);
  font-size: 12px;
}

.summary-value {
  font-size: 14px;
  color: var(--color-text-primary);
}

.inline-info {
  background: var(--color-attention-bg);
  border: 1px solid rgba(238, 159, 0, 0.35);
  color: #7a5200;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.file-hint {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.success-title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 6px;
  color: var(--color-success);
}

.success-desc {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 14px;
}

.success-box {
  border: 1px solid var(--color-dividers);
  border-radius: 10px;
  padding: 12px 14px;
  display: grid;
  gap: 8px;
}

.success-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  align-items: baseline;
}

.success-row .k {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 700;
}

.success-row .v {
  font-size: 14px;
  color: var(--color-text-primary);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(24, 24, 25, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 999;
}

.modal {
  width: min(560px, 100%);
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: var(--shadow-modal);
  padding: 18px 18px 16px;
}

.modal-title {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
}

.modal-body {
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-primary);
  display: grid;
  gap: 10px;
}

.modal-body .muted {
  color: var(--color-text-secondary);
}

.modal-actions {
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 920px) {
  .page {
    background: #f8f9fa;
  }
  .card {
    grid-template-columns: 1fr;
  }
  .left {
    display: none;
  }
}
</style>

