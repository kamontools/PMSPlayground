<template>
  <div>
    <h3 class="apt-subtitle">เอกสารประกอบ<span v-if="max"> ({{ files.length }}/{{ max }})</span></h3>
    <p class="apt-hint">{{ hint }}</p>
    <div class="apt-files">
      <div v-for="f in files" :key="f.id" class="apt-file">
        <div class="apt-file-box" role="button" tabindex="0" :aria-label="`ดูไฟล์ ${f.name}`" @click="openFile(f)" @keydown.enter="openFile(f)">
          <AptIcon name="file" />
          <span class="apt-file-tag">{{ ext(f.name) }}</span>
          <button type="button" class="apt-file-del" :aria-label="`ลบไฟล์ ${f.name}`" @click.stop="remove(f)"><AptIcon name="trash" /></button>
        </div>
        <button type="button" class="apt-file-name" :title="f.name" @click="openFile(f)">{{ f.name }}</button>
        <div class="apt-file-meta">{{ size(f.size) }} · {{ fmtDate(f.date) }}</div>
      </div>
      <button v-if="!max || files.length < max" type="button" class="apt-file-add" @click="pick">
        <AptIcon name="plus" />
        เพิ่มไฟล์
      </button>
    </div>
    <input ref="inputEl" type="file" accept=".jpg,.jpeg,.png,.pdf" multiple hidden @change="onFiles" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AptIcon from './AptIcon.vue'
import { useAptStore, fmtDate, todayIso, uid } from './store.js'

const { showToast, openFile } = useAptStore()

// Files stay in memory (name/size/date + an object URL for previewing) — nothing is uploaded anywhere.
const props = defineProps({
  files: { type: Array, required: true },
  max: { type: Number, default: 0 },
  hint: { type: String, default: 'รองรับไฟล์ .jpeg, .png, .pdf และแต่ละไฟล์ไม่เกิน 10 mb' },
  locked: { type: Boolean, default: false }
})
const emit = defineEmits(['locked'])
const inputEl = ref(null)
const LIMIT = 10 * 1024 * 1024

function ext(name) { return (name.split('.').pop() || '').toUpperCase() }
function size(bytes) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}
function pick() {
  if (props.locked) return emit('locked')
  inputEl.value.click()
}
function remove(f) {
  if (props.locked) return emit('locked')
  props.files.splice(props.files.indexOf(f), 1)
}
function onFiles(e) {
  const picked = [...e.target.files]
  e.target.value = ''
  for (const file of picked) {
    if (props.max && props.files.length >= props.max) { showToast(`แนบได้สูงสุด ${props.max} ไฟล์`); break }
    if (!/\.(jpe?g|png|pdf)$/i.test(file.name)) { showToast(`${file.name}: รองรับเฉพาะ .jpeg, .png, .pdf`); continue }
    if (file.size > LIMIT) { showToast(`${file.name}: ไฟล์ใหญ่เกิน 10 MB`); continue }
    props.files.push({ id: uid('f'), name: file.name, size: file.size, date: todayIso(), url: URL.createObjectURL(file) })
  }
}
</script>
