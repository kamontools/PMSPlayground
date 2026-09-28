<template>
  <div class="ap" ref="root">
    <button type="button" class="ap-trigger" :class="{ empty: !modelValue }" @click="toggle">
      <span v-if="modelValue"><span class="ap-code">{{ modelValue }}</span> {{ accountName(modelValue) }}</span>
      <span v-else>— เลือกบัญชี —</span>
      <span class="ap-caret">▾</span>
    </button>
    <div v-if="open" class="ap-pop">
      <input
        ref="search"
        v-model="q"
        class="ap-search"
        placeholder="ค้นหารหัส / ชื่อบัญชี"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="pick(filtered[hi])"
        @keydown.esc="open = false"
      />
      <ul>
        <li
          v-for="(a, i) in filtered"
          :key="a.code"
          :class="{ hi: i === hi, sel: a.code === modelValue }"
          @mouseenter="hi = i"
          @mousedown.prevent="pick(a)"
        >
          <span class="ap-code">{{ a.code }}</span> {{ a.name }}
          <span v-if="state.favorites.includes(a.code)" class="ap-fav">★</span>
        </li>
        <li v-if="!filtered.length" class="ap-none">ไม่พบบัญชี</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { state, accountName } from './store.js'

const props = defineProps({
  modelValue: { type: String, default: '' },
  prefix: { type: String, default: '' }, // restrict to codes starting with this
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const q = ref('')
const hi = ref(0)
const root = ref(null)
const search = ref(null)

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return state.coa.accounts
    .filter(a => !props.prefix || a.code.startsWith(props.prefix))
    .filter(a => !term || a.code.includes(term) || a.name.toLowerCase().includes(term))
    // favorites first
    .sort((a, b) => Number(state.favorites.includes(b.code)) - Number(state.favorites.includes(a.code)))
})

function toggle() {
  open.value = !open.value
  if (open.value) {
    q.value = ''
    hi.value = 0
    nextTick(() => search.value?.focus())
  }
}
function move(d) {
  const n = filtered.value.length
  if (n) hi.value = (hi.value + d + n) % n
}
function pick(a) {
  if (!a) return
  emit('update:modelValue', a.code)
  open.value = false
}
function onDoc(e) {
  if (root.value && !root.value.contains(e.target)) open.value = false
}
onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDoc))
</script>

<style scoped>
.ap{ position:relative; min-width:220px; }
.ap-trigger{ width:100%; display:flex; justify-content:space-between; align-items:center; gap:8px; font:inherit; font-size:13.5px; padding:6px 10px; border:1.5px solid var(--bm); border-radius:8px; background:#fff; color:var(--t1); cursor:pointer; text-align:left; }
.ap-trigger.empty{ color:var(--t4); border-style:dashed; border-color:var(--yellow-bd); background:var(--yellow-bg); }
.ap-trigger:focus{ outline:none; border-color:var(--blue); box-shadow:0 0 0 3px var(--blue100); }
.ap-caret{ color:var(--t4); font-size:11px; }
.ap-code{ font-family:var(--font-family); font-size:12px; color:var(--t3); }
.ap-pop{ position:absolute; z-index:30; top:calc(100% + 4px); left:0; width:max(100%, 300px); background:#fff; border:1.5px solid var(--bl); border-radius:12px; box-shadow:var(--shadow-md); padding:8px; }
.ap-search{ width:100%; font:inherit; font-size:13.5px; padding:7px 10px; border:1.5px solid var(--bm); border-radius:8px; margin-bottom:6px; }
.ap-search:focus{ outline:none; border-color:var(--blue); }
.ap-pop ul{ list-style:none; margin:0; padding:0; max-height:220px; overflow-y:auto; }
.ap-pop li{ padding:7px 10px; border-radius:8px; font-size:13.5px; cursor:pointer; display:flex; gap:6px; align-items:center; }
.ap-pop li.hi{ background:var(--blue50); }
.ap-pop li.sel{ font-weight:600; }
.ap-fav{ margin-left:auto; color:var(--yellow); }
.ap-none{ color:var(--t4); cursor:default; }
</style>
