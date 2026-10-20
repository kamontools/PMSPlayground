<template>
  <div v-if="file" class="apt-overlay" role="dialog" aria-modal="true" :aria-label="`ดูไฟล์ ${file.name}`" @click.self="closeFile" @keydown.esc="closeFile">
    <div class="apt-dialog apt-dialog--md apt-preview">
      <div class="apt-dialog-head apt-preview-head">
        <h2>{{ file.name }}</h2>
        <span class="apt-preview-meta">{{ meta }}</span>
      </div>
      <div class="apt-dialog-body apt-preview-body">
        <img v-if="file.url && isImage" :src="file.url" :alt="file.name" />
        <iframe v-else-if="file.url" :src="file.url" :title="file.name"></iframe>
        <!-- sample files carry no content: show a stand-in page -->
        <div v-else class="apt-preview-mock" aria-hidden="true">
          <AptIcon name="file" />
          <b>{{ file.name }}</b>
          <span>ตัวอย่างเอกสาร (ไฟล์สาธิต ไม่มีเนื้อหาจริง)</span>
          <i></i><i></i><i></i><i class="short"></i>
        </div>
      </div>
      <div class="apt-dialog-foot apt-dialog-foot--end">
        <button ref="closeEl" type="button" class="apt-btn apt-btn-ghost" @click="closeFile">ปิด</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import AptIcon from './AptIcon.vue'
import { useAptStore, fmtDate } from './store.js'

// App-wide file preview: uploaded files show their real content (object URL), sample files a stand-in page.
const { state, closeFile } = useAptStore()
const file = computed(() => state.preview)
const isImage = computed(() => /\.(jpe?g|png)$/i.test(file.value?.name || ''))
const meta = computed(() => {
  const f = file.value
  if (!f) return ''
  const size = f.size >= 1024 * 1024 ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`
  return `${size} · ${fmtDate(f.date)}`
})
const closeEl = ref(null)
watch(file, async f => { if (f) { await nextTick(); closeEl.value?.focus() } }) // keeps Esc working
</script>
