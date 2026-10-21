<template>
  <div ref="rootEl" class="apt-menu">
    <button v-if="!withClearing" type="button" class="apt-btn apt-btn-outline" @click="print('request')">
      <AptIcon name="print" /> พิมพ์คำขอ
    </button>
    <template v-else>
      <button type="button" class="apt-btn apt-btn-outline" aria-haspopup="menu" :aria-expanded="open" @click="open = !open">
        <AptIcon name="print" /> พิมพ์ <AptIcon name="chevron" class="apt-menu-caret" />
      </button>
      <ul v-if="open" class="apt-menu-list" role="menu">
        <li role="none"><button type="button" role="menuitem" @click="print('request')"><AptIcon name="doc" /> พิมพ์คำขอ</button></li>
        <li role="none"><button type="button" role="menuitem" @click="print('clearing')"><AptIcon name="file" /> พิมพ์เอกสารเคลียร์</button></li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import AptIcon from './AptIcon.vue'
import { useAptStore } from './store.js'
import { printRequest, printClearing } from './printDocs.js'

// Toolbar print button. Once a clearing is in progress or done (รอเคลียร์, รอยืนยันเคลียร์, ไม่ผ่าน, เคลียร์แล้ว) it becomes a
// dropdown that can also print the clearing document; otherwise it just prints the request. Both open an A4 preview tab.
const props = defineProps({ doc: { type: Object, required: true } })
const { showToast } = useAptStore()

const withClearing = computed(() => ['awaiting-clear', 'awaiting-confirm', 'rejected', 'cleared'].includes(props.doc.status))
const open = ref(false)

function print(kind) {
  open.value = false
  if (kind === 'request') return printRequest(props.doc)
  if (!props.doc.clearing) return showToast('ยังไม่มีเอกสารเคลียร์ให้พิมพ์ บันทึกเอกสารเคลียร์ก่อนนะ')
  printClearing(props.doc)
}

// close on an outside click or Esc
const rootEl = ref(null)
function onDocClick(e) { if (!rootEl.value?.contains(e.target)) open.value = false }
function onKey(e) { if (e.key === 'Escape') open.value = false }
watch(open, v => {
  const fn = v ? 'addEventListener' : 'removeEventListener'
  document[fn]('click', onDocClick, true)
  document[fn]('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick, true)
  document.removeEventListener('keydown', onKey)
})
</script>
