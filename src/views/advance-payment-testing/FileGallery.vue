<template>
  <div>
    <!-- readonly: the same cards for viewing only (no heading, hint, add or delete — the view's label names it) -->
    <template v-if="!readonly">
      <h3 class="apt-subtitle">เอกสารประกอบ<span v-if="max"> ({{ files.length }}/{{ max }})</span></h3>
      <p class="apt-hint">{{ hint }}</p>
    </template>
    <span v-if="readonly && !files.length">—</span>
    <div v-else class="apt-files">
      <div v-for="f in files" :key="f.id" class="apt-file">
        <!-- view-only: hover shows an eye over the card; card and name open the file in a new tab -->
        <a v-if="readonly" class="apt-file-box apt-file-box--view" :href="hrefOf(f)" target="_blank" rel="noopener" :aria-label="`เปิดไฟล์ ${f.name} ในแท็บใหม่`">
          <AptIcon name="file" />
          <span class="apt-file-tag">{{ ext(f.name) }}</span>
          <span class="apt-file-eye" aria-hidden="true"><AptIcon name="eye" /></span>
        </a>
        <div v-else class="apt-file-box" role="button" tabindex="0" :aria-label="`ดูไฟล์ ${f.name}`" @click="openFile(f)" @keydown.enter="openFile(f)">
          <AptIcon name="file" />
          <span class="apt-file-tag">{{ ext(f.name) }}</span>
          <button type="button" class="apt-file-del" :aria-label="`ลบไฟล์ ${f.name}`" @click.stop="remove(f)"><AptIcon name="trash" /></button>
        </div>
        <a v-if="readonly" class="apt-file-name" :href="hrefOf(f)" target="_blank" rel="noopener" :title="f.name">{{ f.name }}</a>
        <button v-else type="button" class="apt-file-name" :title="f.name" @click="openFile(f)">{{ f.name }}</button>
        <div class="apt-file-meta">{{ size(f.size) }} · {{ fmtDate(f.date) }}</div>
      </div>
      <button v-if="!readonly && (!max || files.length < max)" type="button" class="apt-file-add" @click="pick">
        <AptIcon name="plus" />
        เพิ่มไฟล์
      </button>
    </div>
    <input v-if="!readonly" ref="inputEl" type="file" accept=".jpg,.jpeg,.png,.pdf" multiple hidden @change="onFiles" />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import AptIcon from './AptIcon.vue'
import { useAptStore, fmtDate, todayIso, uid } from './store.js'

const { showToast, openFile } = useAptStore()

// Files stay in memory (name/size/date + an object URL for previewing) — nothing is uploaded anywhere.
const props = defineProps({
  files: { type: Array, required: true },
  max: { type: Number, default: 0 },
  hint: { type: String, default: 'รองรับไฟล์ .jpeg, .png, .pdf และแต่ละไฟล์ไม่เกิน 10 mb' },
  locked: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false } // view-only: open/preview only
})
const emit = defineEmits(['locked'])
const inputEl = ref(null)
const LIMIT = 10 * 1024 * 1024

// Opening in a new tab: uploaded files use their object URL; sample files have no content, so they get a
// stand-in page (made once per file, released when the gallery goes away).
const standIns = new Map()
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
function hrefOf(f) {
  if (f.url) return f.url
  if (!standIns.has(f.id)) {
    const name = esc(f.name)
    const html = `<!doctype html><html lang="th"><head><meta charset="utf-8"><title>${name}</title>
<style>body{margin:0;background:#EFF3F8;font-family:Sarabun,system-ui,sans-serif;color:#181819}
.page{max-width:720px;margin:40px auto;background:#fff;border-radius:12px;padding:48px;box-shadow:0 2px 12px rgba(0,0,0,.06)}
h1{font-size:20px;margin:0 0 4px}p{color:#84868A;margin:0 0 32px}i{display:block;height:10px;border-radius:5px;background:#EFF3F8;margin:14px 0}i.s{width:60%}</style>
</head><body><div class="page"><h1>${name}</h1><p>ตัวอย่างเอกสาร (ไฟล์สาธิต ไม่มีเนื้อหาจริง)</p><i></i><i></i><i></i><i class="s"></i></div></body></html>`
    standIns.set(f.id, URL.createObjectURL(new Blob([html], { type: 'text/html' })))
  }
  return standIns.get(f.id)
}
onBeforeUnmount(() => standIns.forEach(url => URL.revokeObjectURL(url)))

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
