<template>
  <div class="tsw-page">
    <div class="tsw-topbar">
      <router-link class="tsw-exit" to="/">← หน้าหลัก</router-link>
      <div class="tsw-breadcrumb">
        ตั้งค่าโครงการ <span class="tsw-sep">›</span>
        บัญชีการเงิน <span class="tsw-sep">›</span>
        ตั้งค่าเอกสาร <span class="tsw-sep">›</span>
        <span class="tsw-bc-muted">เอกสารที่สามารถตั้งค่า</span> <span class="tsw-sep">›</span>
        <span class="tsw-bc-current">รายละเอียดเอกสาร</span>
      </div>
      <div class="tsw-topbar-spacer"></div>
      <span class="tsw-project-badge">T-001 : โครงการนิติบุคคล หมื่นสิริ คอนโดมิเนียม เขตบางนา</span>
      <button type="button" class="tsw-btn-ghost tsw-btn-sm" @click="previewOpen = true" :disabled="!activeTemplate">
        👁 ดูตัวอย่าง
      </button>
      <button type="button" class="tsw-btn-primary tsw-btn-sm" @click="saveTemplate" :disabled="!activeTemplate">
        💾 บันทึก
      </button>
    </div>

    <div class="tsw-intro">
      <h1>รายละเอียดเอกสาร — แก้ไขฟอร์มเช็ค</h1>
      <p>
        ตั้งค่ารูปแบบเช็คจ่าย: เลือก/จัดการเทมเพลต, กำหนดขอบกระดาษ, เลือกข้อมูลที่จะแสดง
        และลากวางเพื่อจัดตำแหน่งแต่ละช่องบน canvas ได้โดยตรง
      </p>
    </div>

    <div v-if="activeTemplate" class="tsw-editor">
      <!-- Settings panel -->
      <div class="tsw-settings">
        <div class="tsw-field">
          <label class="tsw-field-label">รูปแบบ</label>
          <div class="tsw-switcher" ref="switcherRef">
            <button
              type="button"
              class="tsw-trigger"
              aria-haspopup="listbox"
              :aria-expanded="open"
              @click="toggleOpen"
            >
              <span class="tsw-trigger-ic">📄</span>
              <span class="tsw-trigger-name" :title="activeTemplate.name">{{ activeTemplate.name }}</span>
              <span class="tsw-trigger-chev" :class="{ open }">▾</span>
            </button>

            <div
              v-if="open"
              class="tsw-popover"
              role="listbox"
              tabindex="-1"
              ref="popoverRef"
              @keydown="onPopoverKeydown"
            >
              <div v-if="templates.length > 8" class="tsw-search">
                <input ref="searchInputRef" v-model="search" type="text" placeholder="ค้นหาเทมเพลต..." />
              </div>

              <ul class="tsw-list">
                <li
                  v-for="(tpl, idx) in filteredTemplates"
                  :key="tpl.id"
                  class="tsw-row"
                  role="option"
                  :aria-selected="tpl.id === activeId"
                  :class="{ active: tpl.id === activeId, highlighted: idx === highlightedIndex }"
                  @mouseenter="highlightedIndex = idx"
                >
                  <template v-if="editingId === tpl.id">
                    <div class="tsw-rename-wrap">
                      <input
                        ref="renameInputRef"
                        v-model="editingValue"
                        class="tsw-rename-input"
                        type="text"
                        @keydown.enter.prevent="commitRename"
                        @keydown.esc.prevent="cancelRename"
                        @blur="commitRename"
                      />
                      <span v-if="editingError" class="tsw-rename-error">{{ editingError }}</span>
                    </div>
                  </template>

                  <template v-else-if="confirmDeleteId === tpl.id">
                    <div class="tsw-confirm-wrap">
                      <span class="tsw-confirm-text">ลบ "{{ tpl.name }}"?</span>
                      <div class="tsw-confirm-actions">
                        <button type="button" class="tsw-btn-danger tsw-btn-xs" @click="confirmDelete(tpl.id)">ลบ</button>
                        <button type="button" class="tsw-btn-ghost tsw-btn-xs" @click="cancelDelete">ยกเลิก</button>
                      </div>
                    </div>
                  </template>

                  <template v-else>
                    <span class="tsw-check">{{ tpl.id === activeId ? '✓' : '' }}</span>
                    <button type="button" class="tsw-row-name" :title="tpl.name" @click="selectTemplate(tpl.id)">
                      {{ tpl.name }}<span v-if="tpl.isDefault" class="tsw-default-tag">เริ่มต้น</span>
                    </button>
                    <span class="tsw-row-actions">
                      <button type="button" class="tsw-icon-btn" title="แก้ไขชื่อ" @click.stop="startRename(tpl)">✎</button>
                      <button type="button" class="tsw-icon-btn" title="ทำสำเนา" @click.stop="duplicateTemplate(tpl)">⧉</button>
                      <button type="button" class="tsw-icon-btn" title="ลบ" @click.stop="startDelete(tpl.id)">🗑</button>
                    </span>
                  </template>
                </li>
                <li v-if="filteredTemplates.length === 0" class="tsw-no-result">ไม่พบเทมเพลตที่ค้นหา</li>
              </ul>

              <button type="button" class="tsw-add-new" @click="createNew">+ สร้างเทมเพลตใหม่</button>

              <div class="tsw-popover-footer">
                <a href="#" class="tsw-overview-link" @click.prevent="goOverview">ดูภาพรวมทั้งหมด →</a>
              </div>
            </div>
          </div>
        </div>

        <label class="tsw-checkbox-row tsw-default-row">
          <input
            type="checkbox"
            :checked="activeTemplate.isDefault"
            @change="setDefault(activeTemplate, $event.target.checked)"
          />
          ให้รูปแบบนี้เป็นรูปแบบเริ่มต้น
        </label>

        <div class="tsw-section">
          <h3 class="tsw-section-title">ตั้งค่าขอบกระดาษ (นิ้ว)</h3>
          <div class="tsw-margins">
            <div class="tsw-margin-field">
              <label>ซ้าย</label>
              <input type="number" step="0.1" min="0" v-model.number="activeTemplate.margins.left" />
            </div>
            <div class="tsw-margin-field">
              <label>ขวา</label>
              <input type="number" step="0.1" min="0" v-model.number="activeTemplate.margins.right" />
            </div>
            <div class="tsw-margin-field">
              <label>บน</label>
              <input type="number" step="0.1" min="0" v-model.number="activeTemplate.margins.top" />
            </div>
            <div class="tsw-margin-field">
              <label>ล่าง</label>
              <input type="number" step="0.1" min="0" v-model.number="activeTemplate.margins.bottom" />
            </div>
          </div>
        </div>

        <div class="tsw-section">
          <h3 class="tsw-section-title">ข้อมูลที่แสดงบนเช็ค</h3>
          <div v-for="fd in FIELD_DEFS" :key="fd.key" class="tsw-checkbox-row tsw-field-row">
            <label class="tsw-checkbox-inline">
              <input type="checkbox" v-model="fieldEl(fd.key).visible" />
              {{ fd.label }}
            </label>
            <select
              v-if="fd.hasLanguage"
              class="tsw-lang-select"
              :value="fieldEl(fd.key).meta.lang"
              @change="setAmountLang($event.target.value)"
            >
              <option value="th">ไทย</option>
              <option value="en">อังกฤษ</option>
            </select>
          </div>
        </div>

        <div class="tsw-section">
          <h3 class="tsw-section-title">ข้อมูลเพิ่มเติม</h3>
          <div class="tsw-palette-item" @pointerdown="onPalettePointerDown">
            <span class="tsw-palette-handle">⠿</span>
            ตัวอักษรอิสระ
          </div>
          <p class="tsw-palette-hint">ลากไปวางบน canvas เพื่อเพิ่มข้อความอิสระ</p>
        </div>
      </div>

      <!-- Canvas -->
      <div class="tsw-canvas-wrap">
        <div class="tsw-canvas-toolbar-slot">
          <div v-if="selectedElement" class="tsw-toolbar">
            <span class="tsw-toolbar-label">{{ fieldLabel(selectedElement) }}</span>
            <button type="button" class="tsw-toolbar-btn" @click="adjustFont(-1)">−</button>
            <input type="number" class="tsw-toolbar-fontsize" v-model.number="selectedElement.fontSize" />
            <button type="button" class="tsw-toolbar-btn" @click="adjustFont(1)">+</button>
            <span class="tsw-toolbar-divider"></span>
            <button type="button" class="tsw-toolbar-btn" :class="{ active: selectedElement.bold }" @click="selectedElement.bold = !selectedElement.bold"><b>B</b></button>
            <button type="button" class="tsw-toolbar-btn" :class="{ active: selectedElement.underline }" @click="selectedElement.underline = !selectedElement.underline"><u>U</u></button>
            <button type="button" class="tsw-toolbar-btn" :class="{ active: selectedElement.italic }" @click="selectedElement.italic = !selectedElement.italic"><i>I</i></button>
            <span class="tsw-toolbar-divider"></span>
            <button
              v-for="a in ALIGNS"
              :key="a"
              type="button"
              class="tsw-toolbar-btn tsw-align-btn"
              :class="{ active: selectedElement.align === a }"
              :title="a"
              @click="selectedElement.align = a"
            >
              <span class="tsw-align-bars" :class="'align-' + a">
                <span></span><span></span><span></span>
              </span>
            </button>
            <span class="tsw-toolbar-divider"></span>
            <button type="button" class="tsw-toolbar-btn tsw-toolbar-delete" title="ลบ" @click="deleteSelected">🗑</button>
          </div>
        </div>

        <div class="tsw-paper-viewport" @click.self="selectedElId = null">
          <div
            class="tsw-paper"
            ref="paperRef"
            :style="{ width: PAPER_W + 'px', height: PAPER_H + 'px', transform: `scale(${zoomScale})` }"
            @click.self="selectedElId = null"
          >
            <div class="tsw-ruler-x">
              <span v-for="n in rulerTicksX" :key="'x' + n" class="tsw-tick" :style="{ left: n + 'px' }">{{ n % 40 === 0 ? n / 20 : '' }}</span>
            </div>
            <div class="tsw-ruler-y">
              <span v-for="n in rulerTicksY" :key="'y' + n" class="tsw-tick" :style="{ top: n + 'px' }">{{ n % 40 === 0 ? n / 20 : '' }}</span>
            </div>

            <div class="tsw-margin-box" :style="marginBoxStyle"></div>

            <div
              v-for="el in visibleElements"
              :key="el.id"
              class="tsw-el"
              :class="[
                el.variant ? `tsw-el-${el.variant}` : '',
                { selected: el.id === selectedElId, 'tsw-el-bold': el.bold, 'tsw-el-underline': el.underline, 'tsw-el-italic': el.italic }
              ]"
              :style="elStyle(el)"
              :contenteditable="el.editing"
              @pointerdown="onElPointerDown($event, el)"
              @dblclick="onElDblClick(el)"
              @blur="onElBlur(el, $event)"
            >{{ el.text }}</div>
          </div>
        </div>

        <div v-if="paletteDragging" class="tsw-ghost" :style="{ left: ghostPos.x + 'px', top: ghostPos.y + 'px' }">
          ตัวอักษรอิสระ
        </div>

        <p class="tsw-canvas-caption">(prototype canvas — ลากช่องเพื่อจัดตำแหน่ง, คลิกเพื่อเลือกและปรับรูปแบบ)</p>

        <div class="tsw-zoom-control">
          <button type="button" @click="setZoom(-25)">−</button>
          <span>{{ zoom }}%</span>
          <button type="button" @click="setZoom(25)">+</button>
        </div>
      </div>
    </div>

    <div v-else class="tsw-empty-state">
      <p>ยังไม่มีเทมเพลตให้แสดง</p>
      <button type="button" class="tsw-btn-primary tsw-btn-xs" @click="createNew">สร้างเทมเพลตแรก</button>
    </div>

    <div class="tsw-dev-actions">
      <button type="button" class="tsw-btn-ghost tsw-btn-xs" @click="clearAll">🧪 ทดสอบ empty state</button>
      <button type="button" class="tsw-btn-ghost tsw-btn-xs" @click="resetPrototype">↺ รีเซ็ต prototype</button>
    </div>

    <!-- Preview modal -->
    <div v-if="previewOpen" class="tsw-modal-backdrop" @click.self="previewOpen = false">
      <div class="tsw-modal tsw-preview-modal">
        <h3 class="tsw-preview-title">ตัวอย่าง — {{ activeTemplate?.name }}</h3>
        <div class="tsw-paper tsw-paper-preview" :style="{ width: PAPER_W + 'px', height: PAPER_H + 'px' }">
          <div class="tsw-margin-box" :style="marginBoxStyle"></div>
          <div
            v-for="el in visibleElements"
            :key="el.id"
            class="tsw-el tsw-el-static"
            :class="el.variant ? `tsw-el-${el.variant}` : ''"
            :style="elStyle(el)"
          >{{ el.text }}</div>
        </div>
        <div class="tsw-modal-actions">
          <button type="button" class="tsw-btn-ghost" @click="previewOpen = false">ปิด</button>
        </div>
      </div>
    </div>

    <!-- Unsaved changes 3-way prompt -->
    <div v-if="showUnsavedPrompt" class="tsw-modal-backdrop">
      <div class="tsw-modal">
        <p>มีการแก้ไขที่ยังไม่บันทึกอยู่ ต้องการทำอย่างไรก่อนสลับ template?</p>
        <div class="tsw-modal-actions">
          <button type="button" class="tsw-btn-primary" @click="resolveUnsaved('save')">บันทึก</button>
          <button type="button" class="tsw-btn-ghost" @click="resolveUnsaved('discard')">ไม่บันทึก</button>
          <button type="button" class="tsw-btn-ghost" @click="resolveUnsaved('cancel')">ยกเลิก</button>
        </div>
      </div>
    </div>

    <transition name="tsw-toast-fade">
      <div v-if="toast" class="tsw-toast">{{ toast }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

let uid = 100
const makeId = () => `tpl-${uid++}`
const makeFreeId = () => `free-${uid++}`

const PAPER_W = 820
const PAPER_H = 300
const ALIGNS = ['left', 'center', 'right', 'justify']

const FIELD_DEFS = [
  { key: 'acPayeeOnly', label: 'A/C PAYEE ONLY' },
  { key: 'payeeName', label: 'ชื่อผู้รับ' },
  { key: 'amountNumber', label: 'จำนวนเงิน (ตัวเลข)' },
  { key: 'amountWords', label: 'จำนวนเงิน (ตัวหนังสือ)', hasLanguage: true },
  { key: 'payDateWords', label: 'วันที่สั่งจ่าย (ตัวหนังสือ)' },
  { key: 'payDateBoxes', label: 'วันที่สั่งจ่าย (เป็นช่อง)' },
  { key: 'strikethrough', label: 'ขีดคร่อม (////)' }
]

function defaultElements() {
  return [
    { id: 'acPayeeOnly', key: 'acPayeeOnly', type: 'fixed', variant: 'acpayee', text: 'A/C PAYEE ONLY', x: 32, y: 24, fontSize: 14, bold: false, underline: false, italic: false, align: 'left', visible: true },
    { id: 'payDateWords', key: 'payDateWords', type: 'fixed', text: '[วันที่สั่งจ่าย]', x: 560, y: 24, fontSize: 14, bold: false, underline: false, italic: false, align: 'right', visible: true },
    { id: 'payDateBoxes', key: 'payDateBoxes', type: 'fixed', variant: 'datebox', text: 'DD / MM / YYYY', x: 560, y: 58, fontSize: 12, bold: false, underline: false, italic: false, align: 'right', visible: true },
    { id: 'payeeName', key: 'payeeName', type: 'fixed', text: '[ชื่อผู้รับ]', x: 32, y: 100, fontSize: 16, bold: false, underline: false, italic: false, align: 'left', visible: true },
    { id: 'amountNumber', key: 'amountNumber', type: 'fixed', text: '[จำนวนเงิน (ตัวเลข)]', x: 560, y: 100, fontSize: 14, bold: false, underline: false, italic: false, align: 'right', visible: true },
    { id: 'strikethrough', key: 'strikethrough', type: 'fixed', text: '/////', x: 660, y: 150, fontSize: 24, bold: false, underline: false, italic: false, align: 'center', visible: true },
    { id: 'amountWords', key: 'amountWords', type: 'fixed', text: '[จำนวนเงิน (ตัวหนังสือไทย)]', x: 230, y: 220, fontSize: 16, bold: false, underline: false, italic: false, align: 'center', visible: true, meta: { lang: 'th' } }
  ]
}

function makeTemplate(name, isDefault) {
  return {
    id: makeId(),
    name,
    isDefault,
    margins: { left: 0.5, right: 0.5, top: 0.5, bottom: 0.5 },
    elements: defaultElements()
  }
}

const initialTemplates = () => ([
  makeTemplate('SCB Cheque (แนวตั้ง)', true),
  makeTemplate('ธนาคารกสิกรไทย', false),
  makeTemplate('ธนาคารไทยพาณิชย์', false),
  makeTemplate('ธนาคารกรุงเทพ', false)
])

function snapshotTemplate(tpl) {
  return JSON.stringify({ margins: tpl.margins, elements: tpl.elements })
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

const templates = ref(initialTemplates())
const activeId = ref(templates.value[0].id)
const savedSnapshots = ref({})
templates.value.forEach(t => { savedSnapshots.value[t.id] = snapshotTemplate(t) })

const open = ref(false)
const search = ref('')
const highlightedIndex = ref(0)

const switcherRef = ref(null)
const popoverRef = ref(null)
const searchInputRef = ref(null)
const renameInputRef = ref(null)

const editingId = ref(null)
const editingValue = ref('')
const editingError = ref('')

const confirmDeleteId = ref(null)

const showUnsavedPrompt = ref(false)
const pendingSwitchId = ref(null)

const previewOpen = ref(false)

const selectedElId = ref(null)
const paperRef = ref(null)
const zoom = ref(100)

const paletteDragging = ref(false)
const ghostPos = ref({ x: 0, y: 0 })

const toast = ref('')
let toastTimer = null

const activeTemplate = computed(() => templates.value.find(t => t.id === activeId.value) || null)

const isDirty = computed(() => {
  const t = activeTemplate.value
  if (!t) return false
  return snapshotTemplate(t) !== savedSnapshots.value[t.id]
})

const filteredTemplates = computed(() => {
  if (!search.value.trim()) return templates.value
  const q = search.value.trim().toLowerCase()
  return templates.value.filter(t => t.name.toLowerCase().includes(q))
})

const zoomScale = computed(() => zoom.value / 100)

const visibleElements = computed(() => activeTemplate.value?.elements.filter(e => e.visible) || [])

const selectedElement = computed(() => activeTemplate.value?.elements.find(e => e.id === selectedElId.value) || null)

const rulerTicksX = computed(() => {
  const ticks = []
  for (let n = 0; n <= PAPER_W; n += 10) ticks.push(n)
  return ticks
})
const rulerTicksY = computed(() => {
  const ticks = []
  for (let n = 0; n <= PAPER_H; n += 10) ticks.push(n)
  return ticks
})

const PX_PER_INCH = 60
const marginBoxStyle = computed(() => {
  const m = activeTemplate.value?.margins || { left: 0, right: 0, top: 0, bottom: 0 }
  const left = m.left * PX_PER_INCH
  const top = m.top * PX_PER_INCH
  const right = m.right * PX_PER_INCH
  const bottom = m.bottom * PX_PER_INCH
  return {
    left: left + 'px',
    top: top + 'px',
    width: Math.max(0, PAPER_W - left - right) + 'px',
    height: Math.max(0, PAPER_H - top - bottom) + 'px'
  }
})

function fieldEl(key) {
  return activeTemplate.value?.elements.find(e => e.key === key) || { visible: false, meta: {} }
}

function fieldLabel(el) {
  if (el.type === 'free') return 'ข้อความอิสระ'
  return FIELD_DEFS.find(fd => fd.key === el.key)?.label || el.key
}

function elStyle(el) {
  return {
    left: el.x + 'px',
    top: el.y + 'px',
    fontSize: el.fontSize + 'px',
    textAlign: el.align,
    fontWeight: el.bold ? '700' : '400',
    textDecoration: el.underline ? 'underline' : 'none',
    fontStyle: el.italic ? 'italic' : 'normal'
  }
}

function showToast(msg) {
  toast.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 2200)
}

function toggleOpen() {
  open.value = !open.value
  if (open.value) {
    highlightedIndex.value = templates.value.findIndex(t => t.id === activeId.value)
    search.value = ''
    nextTick(() => {
      if (templates.value.length > 8 && searchInputRef.value) searchInputRef.value.focus()
    })
  } else {
    cancelRename()
    cancelDelete()
  }
}

function closePopover() {
  open.value = false
  cancelRename()
  cancelDelete()
}

function onClickOutside(e) {
  if (open.value && switcherRef.value && !switcherRef.value.contains(e.target)) {
    closePopover()
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside)
  clearTimeout(toastTimer)
})

function selectTemplate(id) {
  if (editingId.value != null || confirmDeleteId.value != null) return
  if (id === activeId.value) { closePopover(); return }
  if (isDirty.value) {
    pendingSwitchId.value = id
    showUnsavedPrompt.value = true
    closePopover()
    return
  }
  activeId.value = id
  selectedElId.value = null
  closePopover()
}

function resolveUnsaved(action) {
  showUnsavedPrompt.value = false
  if (action === 'cancel') { pendingSwitchId.value = null; return }
  if (action === 'save') saveTemplate()
  else if (action === 'discard') discardChanges()
  activeId.value = pendingSwitchId.value
  selectedElId.value = null
  pendingSwitchId.value = null
}

function saveTemplate() {
  const t = activeTemplate.value
  if (!t) return
  savedSnapshots.value[t.id] = snapshotTemplate(t)
  showToast('บันทึกแล้ว')
}

function discardChanges() {
  const t = activeTemplate.value
  if (!t || !savedSnapshots.value[t.id]) return
  const snap = JSON.parse(savedSnapshots.value[t.id])
  t.margins = snap.margins
  t.elements = snap.elements
}

function setDefault(tpl, val) {
  if (val) {
    templates.value.forEach(t => { t.isDefault = t.id === tpl.id })
  } else {
    tpl.isDefault = false
  }
}

function setAmountLang(lang) {
  const el = fieldEl('amountWords')
  if (!el || el.type !== 'fixed') return
  el.meta.lang = lang
  el.text = `[จำนวนเงิน (ตัวหนังสือ${lang === 'en' ? 'อังกฤษ' : 'ไทย'})]`
}

function startRename(tpl) {
  confirmDeleteId.value = null
  editingId.value = tpl.id
  editingValue.value = tpl.name
  editingError.value = ''
  nextTick(() => {
    const el = Array.isArray(renameInputRef.value) ? renameInputRef.value[0] : renameInputRef.value
    el?.focus()
    el?.select()
  })
}

function commitRename() {
  if (editingId.value == null) return
  const value = editingValue.value.trim()
  if (!value) { editingError.value = 'กรุณาระบุชื่อเทมเพลต'; return }
  const isDuplicate = templates.value.some(
    t => t.id !== editingId.value && t.name.trim().toLowerCase() === value.toLowerCase()
  )
  if (isDuplicate) { editingError.value = 'ชื่อนี้ถูกใช้แล้ว'; return }
  const tpl = templates.value.find(t => t.id === editingId.value)
  if (tpl) tpl.name = value
  editingId.value = null
  editingError.value = ''
}

function cancelRename() {
  editingId.value = null
  editingError.value = ''
}

function duplicateTemplate(tpl) {
  const newTpl = {
    id: makeId(),
    name: `${tpl.name} (สำเนา)`,
    isDefault: false,
    margins: { ...tpl.margins },
    elements: JSON.parse(JSON.stringify(tpl.elements))
  }
  savedSnapshots.value[newTpl.id] = snapshotTemplate(newTpl)
  const idx = templates.value.findIndex(t => t.id === tpl.id)
  templates.value.splice(idx + 1, 0, newTpl)
  showToast('ทำสำเนาแล้ว')
}

function startDelete(id) {
  editingId.value = null
  confirmDeleteId.value = id
}

function cancelDelete() {
  confirmDeleteId.value = null
}

function confirmDelete(id) {
  if (templates.value.length <= 1) {
    showToast('ต้องมีเทมเพลตเหลืออย่างน้อย 1 รายการ')
    confirmDeleteId.value = null
    return
  }
  const idx = templates.value.findIndex(t => t.id === id)
  const wasActive = id === activeId.value
  templates.value.splice(idx, 1)
  delete savedSnapshots.value[id]
  confirmDeleteId.value = null
  if (wasActive) {
    const next = templates.value[0]
    activeId.value = next.id
    selectedElId.value = null
    showToast(`ลบแล้ว — สลับไปที่ "${next.name}" อัตโนมัติ`)
  } else {
    showToast('ลบแล้ว')
  }
}

function createNew() {
  const newTpl = makeTemplate('เทมเพลตใหม่', false)
  savedSnapshots.value[newTpl.id] = snapshotTemplate(newTpl)
  templates.value.push(newTpl)
  activeId.value = newTpl.id
  selectedElId.value = null
  open.value = true
  search.value = ''
  nextTick(() => startRename(newTpl))
}

function resetPrototype() {
  templates.value = initialTemplates()
  savedSnapshots.value = {}
  templates.value.forEach(t => { savedSnapshots.value[t.id] = snapshotTemplate(t) })
  activeId.value = templates.value[0].id
  selectedElId.value = null
  closePopover()
  showToast('รีเซ็ต prototype แล้ว')
}

function clearAll() {
  templates.value = []
  activeId.value = null
  closePopover()
}

function goOverview() {
  showToast('จะลิงก์ไปหน้า "เอกสารที่สามารถตั้งค่า" (ภาพรวม) — เป็น optional overview')
}

function onPopoverKeydown(e) {
  const list = filteredTemplates.value
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlightedIndex.value = Math.min(highlightedIndex.value + 1, list.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    if (editingId.value != null) return
    const tpl = list[highlightedIndex.value]
    if (tpl) selectTemplate(tpl.id)
  } else if (e.key === 'Escape') {
    closePopover()
  }
}

// --- Canvas element drag / select / edit ---

function onElPointerDown(e, el) {
  if (el.editing) return
  e.stopPropagation()
  e.preventDefault()
  selectedElId.value = el.id
  const startX = e.clientX
  const startY = e.clientY
  const startElX = el.x
  const startElY = el.y
  const scale = zoomScale.value

  function move(ev) {
    const dx = (ev.clientX - startX) / scale
    const dy = (ev.clientY - startY) / scale
    el.x = clamp(startElX + dx, 0, PAPER_W - 20)
    el.y = clamp(startElY + dy, 0, PAPER_H - 16)
  }
  function up() {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}

function onElDblClick(el) {
  if (el.type !== 'free') return
  el.editing = true
  nextTick(() => {
    const dom = paperRef.value?.querySelector(`[data-el-id="${el.id}"]`)
    dom?.focus()
  })
}

function onElBlur(el, e) {
  if (!el.editing) return
  el.text = e.target.innerText.trim() || 'ข้อความ'
  el.editing = false
}

function adjustFont(delta) {
  const el = selectedElement.value
  if (!el) return
  el.fontSize = clamp(el.fontSize + delta, 8, 48)
}

function deleteSelected() {
  const el = selectedElement.value
  if (!el) return
  const t = activeTemplate.value
  if (el.type === 'free') {
    t.elements = t.elements.filter(e => e.id !== el.id)
  } else {
    el.visible = false
  }
  selectedElId.value = null
}

function setZoom(delta) {
  zoom.value = clamp(zoom.value + delta, 50, 200)
}

function onPalettePointerDown(e) {
  paletteDragging.value = true
  ghostPos.value = { x: e.clientX, y: e.clientY }

  function move(ev) {
    ghostPos.value = { x: ev.clientX, y: ev.clientY }
  }
  function up(ev) {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
    paletteDragging.value = false
    const rect = paperRef.value?.getBoundingClientRect()
    if (!rect) return
    if (ev.clientX < rect.left || ev.clientX > rect.right || ev.clientY < rect.top || ev.clientY > rect.bottom) return
    const scale = zoomScale.value
    const x = clamp((ev.clientX - rect.left) / scale - 50, 0, PAPER_W - 20)
    const y = clamp((ev.clientY - rect.top) / scale - 10, 0, PAPER_H - 16)
    addFreeText(x, y)
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}

function addFreeText(x, y) {
  const t = activeTemplate.value
  if (!t) return
  const el = {
    id: makeFreeId(),
    key: null,
    type: 'free',
    text: 'ข้อความใหม่',
    x, y,
    fontSize: 14,
    bold: false,
    underline: false,
    italic: false,
    align: 'left',
    visible: true
  }
  t.elements.push(el)
  selectedElId.value = el.id
  nextTick(() => onElDblClick(el))
}
</script>

<style scoped>
.tsw-page {
  padding: 32px 40px 80px;
  max-width: 1240px;
  margin: 0 auto;
  font-family: var(--font-family);
}

.tsw-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.tsw-exit {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  flex: none;
}
.tsw-exit:hover { color: var(--color-primary-500); }

.tsw-breadcrumb {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}
.tsw-sep { margin: 0 4px; color: var(--color-text-placeholder); }
.tsw-bc-current { color: var(--color-text-primary); font-weight: 600; }

.tsw-topbar-spacer { flex: 1; }

.tsw-project-badge {
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

.tsw-intro { margin-bottom: 24px; }
.tsw-intro h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}
.tsw-intro p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-sm);
}

.tsw-editor {
  display: flex;
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-lg);
  overflow: hidden;
  align-items: stretch;
}

/* Settings panel */
.tsw-settings {
  width: 340px;
  flex: none;
  padding: 20px;
  border-right: 1px solid var(--color-dividers);
  overflow-y: auto;
}

.tsw-field { margin-bottom: 16px; }
.tsw-field-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.tsw-checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  padding: 6px 0;
}
.tsw-checkbox-inline { display: flex; align-items: center; gap: 8px; cursor: pointer; }

.tsw-default-row {
  background: var(--color-attention-bg);
  border: 1px solid var(--color-attention);
  padding: 8px 12px;
  border-radius: var(--radius-md);
  margin-bottom: 20px;
  cursor: pointer;
}

.tsw-section { margin-bottom: 22px; }
.tsw-section:last-child { margin-bottom: 0; }
.tsw-section-title {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-text-secondary);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.tsw-margins { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.tsw-margin-field { display: flex; flex-direction: column; gap: 4px; }
.tsw-margin-field label { font-size: 11px; color: var(--color-text-tertiary); }
.tsw-margin-field input {
  width: 100%;
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-sm);
  padding: 6px 8px;
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
}
.tsw-margin-field input:focus { outline: none; border-color: var(--color-primary-500); }

.tsw-field-row { justify-content: space-between; }
.tsw-lang-select {
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-sm);
  padding: 4px 8px;
  font-size: var(--font-size-xs);
  font-family: var(--font-family);
  background: var(--color-white);
}

.tsw-palette-item {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px dashed var(--color-stroke);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  cursor: grab;
  user-select: none;
  background: var(--color-white);
}
.tsw-palette-item:hover { border-color: var(--color-primary-500); }
.tsw-palette-handle { color: var(--color-icons); }
.tsw-palette-hint { font-size: 11px; color: var(--color-text-tertiary); margin-top: 6px; }

/* Switcher */
.tsw-switcher { position: relative; }

.tsw-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-white);
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  cursor: pointer;
  width: 100%;
}
.tsw-trigger:hover { border-color: var(--color-primary-500); }

.tsw-trigger-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  text-align: left;
}

.tsw-trigger-chev {
  color: var(--color-icons);
  transition: transform 0.15s ease;
  font-size: 11px;
}
.tsw-trigger-chev.open { transform: rotate(180deg); }

.tsw-popover {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 300px;
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-modal);
  z-index: 40;
  padding: 6px 0;
}

.tsw-search { padding: 8px 10px; border-bottom: 1px solid var(--color-dividers); }
.tsw-search input {
  width: 100%;
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
}
.tsw-search input:focus { outline: none; border-color: var(--color-primary-500); }

.tsw-list { list-style: none; margin: 0; padding: 4px 0; max-height: 260px; overflow-y: auto; }

.tsw-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  cursor: pointer;
}
.tsw-row.highlighted { background: var(--color-disabled-bg); }
.tsw-row.active { background: var(--color-primary-200); }

.tsw-check {
  width: 16px;
  flex: none;
  color: var(--color-primary-500);
  font-weight: 700;
  font-size: 12px;
}

.tsw-row-name {
  flex: 1;
  min-width: 0;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  background: none;
  border: none;
  padding: 0;
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  color: var(--color-text-primary);
  cursor: pointer;
}
.tsw-row-name > :first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tsw-default-tag {
  flex: none;
  font-size: 10px;
  color: var(--color-primary-500);
  background: var(--color-primary-200);
  padding: 1px 6px;
  border-radius: var(--radius-sm);
}

.tsw-row-actions {
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.1s ease;
  flex: none;
}
.tsw-row:hover .tsw-row-actions,
.tsw-row.highlighted .tsw-row-actions { opacity: 1; }

.tsw-icon-btn {
  border: none;
  background: none;
  padding: 3px 5px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 13px;
  color: var(--color-icons);
}
.tsw-icon-btn:hover { background: var(--color-disabled-bg); color: var(--color-primary-500); }

.tsw-rename-wrap { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.tsw-rename-input {
  width: 100%;
  border: 1px solid var(--color-primary-500);
  border-radius: var(--radius-sm);
  padding: 4px 8px;
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
}
.tsw-rename-input:focus { outline: none; }
.tsw-rename-error { font-size: 11px; color: var(--color-error); }

.tsw-confirm-wrap { flex: 1; display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.tsw-confirm-text { font-size: var(--font-size-xs); color: var(--color-text-primary); flex: 1; min-width: 0; }
.tsw-confirm-actions { display: flex; gap: 6px; flex: none; }

.tsw-no-result { padding: 12px; text-align: center; font-size: var(--font-size-xs); color: var(--color-text-tertiary); }

.tsw-add-new {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 8px 14px;
  font-size: var(--font-size-sm);
  color: var(--color-primary-500);
  font-weight: 600;
  cursor: pointer;
}
.tsw-add-new:hover { background: var(--color-disabled-bg); }

.tsw-popover-footer { border-top: 1px solid var(--color-dividers); padding: 8px 14px 4px; }
.tsw-overview-link { font-size: var(--font-size-xs); color: var(--color-text-secondary); text-decoration: none; }
.tsw-overview-link:hover { color: var(--color-primary-500); }

/* Canvas */
.tsw-canvas-wrap {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F4F6FA;
  padding: 16px 24px 24px;
  position: relative;
}

.tsw-canvas-toolbar-slot { width: 100%; min-height: 44px; margin-bottom: 12px; }

.tsw-toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--color-text-primary);
  color: var(--color-white);
  border-radius: var(--radius-md);
  padding: 8px 10px;
  width: fit-content;
  box-shadow: var(--shadow-header);
}
.tsw-toolbar-label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0 8px 0 4px;
  border-right: 1px solid rgba(255,255,255,0.2);
  margin-right: 4px;
  white-space: nowrap;
}
.tsw-toolbar-btn {
  background: none;
  border: none;
  color: var(--color-white);
  border-radius: var(--radius-sm);
  padding: 5px 8px;
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
}
.tsw-toolbar-btn:hover { background: rgba(255,255,255,0.12); }
.tsw-toolbar-btn.active { background: var(--color-primary-500); }
.tsw-toolbar-fontsize {
  width: 40px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.08);
  color: var(--color-white);
  border-radius: var(--radius-sm);
  font-size: 12px;
  padding: 4px 2px;
}
.tsw-toolbar-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.2); margin: 0 2px; }
.tsw-toolbar-delete:hover { background: var(--color-error); }

.tsw-align-bars { display: flex; flex-direction: column; gap: 2px; width: 14px; }
.tsw-align-bars span { height: 2px; background: currentColor; border-radius: 1px; }
.tsw-align-bars span:nth-child(1) { width: 100%; }
.tsw-align-bars span:nth-child(2) { width: 65%; }
.tsw-align-bars span:nth-child(3) { width: 85%; }
.tsw-align-bars.align-left { align-items: flex-start; }
.tsw-align-bars.align-center { align-items: center; }
.tsw-align-bars.align-right { align-items: flex-end; }
.tsw-align-bars.align-justify span { width: 100% !important; }

.tsw-paper-viewport {
  overflow: auto;
  max-width: 100%;
  padding: 24px;
  background: repeating-linear-gradient(0deg, #E7EAF0 0, #E7EAF0 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(90deg, #E7EAF0 0, #E7EAF0 1px, transparent 1px, transparent 20px);
  background-color: #EEF1F6;
  border-radius: var(--radius-md);
}

.tsw-paper {
  position: relative;
  background: var(--color-white);
  transform-origin: top left;
  box-shadow: var(--shadow-header);
  padding: 24px 0 0 24px;
  box-sizing: border-box;
}

.tsw-ruler-x, .tsw-ruler-y { position: absolute; color: var(--color-text-placeholder); font-size: 9px; }
.tsw-ruler-x { top: 4px; left: 24px; right: 0; height: 18px; }
.tsw-ruler-y { top: 24px; left: 4px; bottom: 0; width: 18px; }
.tsw-ruler-x .tsw-tick { position: absolute; }
.tsw-ruler-y .tsw-tick { position: absolute; }

.tsw-margin-box {
  position: absolute;
  border: 1px dashed #B9C2D0;
  pointer-events: none;
}

.tsw-el {
  position: absolute;
  white-space: nowrap;
  cursor: move;
  padding: 2px 4px;
  border: 1px solid transparent;
  border-radius: 2px;
  color: var(--color-text-primary);
  font-family: var(--font-family);
}
.tsw-el:hover { border-color: var(--color-primary-200); }
.tsw-el.selected { border-color: var(--color-primary-500); background: rgba(28, 112, 247, 0.06); }
.tsw-el-static { cursor: default; }
.tsw-el-static:hover { border-color: transparent; }

.tsw-el-acpayee { border-top: 3px double var(--color-text-primary); border-bottom: 3px double var(--color-text-primary); }
.tsw-el-acpayee.selected,
.tsw-el-acpayee:hover { border-left-color: var(--color-primary-200); border-right-color: var(--color-primary-200); }
.tsw-el-datebox { border: 1px solid var(--color-text-primary) !important; letter-spacing: 3px; border-radius: var(--radius-sm); }

.tsw-ghost {
  position: fixed;
  transform: translate(-50%, -50%);
  background: var(--color-primary-500);
  color: var(--color-white);
  padding: 6px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  pointer-events: none;
  z-index: 300;
  box-shadow: var(--shadow-modal);
}

.tsw-canvas-caption { margin-top: 16px; font-size: 11px; color: var(--color-text-placeholder); font-style: italic; }

.tsw-zoom-control {
  position: sticky;
  bottom: 0;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: 999px;
  padding: 6px 10px;
  box-shadow: var(--shadow-header);
}
.tsw-zoom-control button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--color-stroke);
  background: var(--color-white);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}
.tsw-zoom-control button:hover { border-color: var(--color-primary-500); color: var(--color-primary-500); }
.tsw-zoom-control span { font-size: var(--font-size-xs); color: var(--color-text-secondary); min-width: 40px; text-align: center; }

.tsw-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 240px;
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
}

.tsw-dev-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }

/* Buttons */
.tsw-btn-primary, .tsw-btn-ghost, .tsw-btn-danger {
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  cursor: pointer;
  padding: 7px 14px;
  border: 1px solid transparent;
}
.tsw-btn-primary { background: var(--color-primary-500); color: var(--color-white); }
.tsw-btn-primary:hover { background: var(--color-primary-click); }
.tsw-btn-ghost { background: var(--color-white); border-color: var(--color-stroke); color: var(--color-text-secondary); }
.tsw-btn-ghost:hover { border-color: var(--color-primary-500); color: var(--color-primary-500); }
.tsw-btn-danger { background: var(--color-error); color: var(--color-white); }
.tsw-btn-danger:hover { background: var(--color-error-hover); }
.tsw-btn-xs { padding: 4px 10px; font-size: var(--font-size-xs); }
.tsw-btn-sm { padding: 6px 12px; font-size: var(--font-size-xs); flex: none; white-space: nowrap; }
button:disabled { opacity: 0.5; cursor: not-allowed; }

/* Modal */
.tsw-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(24, 24, 25, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.tsw-modal {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 24px;
  max-width: 360px;
  box-shadow: var(--shadow-modal);
}
.tsw-modal p { font-size: var(--font-size-sm); color: var(--color-text-primary); margin-bottom: 16px; }
.tsw-modal-actions { display: flex; gap: 8px; justify-content: flex-end; }

.tsw-preview-modal { max-width: none; width: fit-content; }
.tsw-preview-title { font-size: var(--font-size-md); font-weight: 700; color: var(--color-text-primary); margin-bottom: 16px; }
.tsw-paper-preview { box-shadow: none; border: 1px solid var(--color-dividers); margin-bottom: 16px; }

/* Toast */
.tsw-toast {
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
.tsw-toast-fade-enter-active, .tsw-toast-fade-leave-active { transition: opacity 0.2s ease; }
.tsw-toast-fade-enter-from, .tsw-toast-fade-leave-to { opacity: 0; }
</style>
