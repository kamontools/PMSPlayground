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
        <li role="none"><button type="button" role="menuitem" @click="print('clearing')"><AptIcon name="file" /> พิมพ์คำขอเคลียร์</button></li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import AptIcon from './AptIcon.vue'
import { useAptStore } from './store.js'

// Toolbar print button. Once a clearing is in progress or done (รอเคลียร์, รอยืนยันเคลียร์, เคลียร์แล้ว) it becomes a
// dropdown that can also print the clearing request; otherwise it just prints the request.
const props = defineProps({ doc: { type: Object, required: true } })
const { showToast } = useAptStore()

const withClearing = computed(() => ['awaiting-clear', 'awaiting-confirm', 'cleared'].includes(props.doc.status))
const open = ref(false)

function print(kind) {
  open.value = false
  showToast(kind === 'clearing' ? `เปิดหน้าพิมพ์คำขอเคลียร์ ${props.doc.docNo} (ตัวอย่างสาธิต)` : `เปิดหน้าพิมพ์คำขอ ${props.doc.docNo} (ตัวอย่างสาธิต)`)
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
