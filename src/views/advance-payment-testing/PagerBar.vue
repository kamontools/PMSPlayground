<template>
  <div class="apt-pager">
    <span class="apt-pager-label">หน้า {{ page }}/{{ pages }}</span>
    <div class="apt-pager-ctrl">
      <button type="button" class="apt-pager-btn" :disabled="page === 1" aria-label="หน้าแรก" @click="set(1)">«</button>
      <button type="button" class="apt-pager-btn" :disabled="page === 1" aria-label="หน้าก่อน" @click="set(page - 1)">‹</button>
      <button v-for="n in pages" :key="n" type="button" class="apt-pager-btn" :class="{ active: n === page }" :aria-current="n === page ? 'page' : null" @click="set(n)">{{ n }}</button>
      <button type="button" class="apt-pager-btn" :disabled="page === pages" aria-label="หน้าถัดไป" @click="set(page + 1)">›</button>
      <button type="button" class="apt-pager-btn" :disabled="page === pages" aria-label="หน้าสุดท้าย" @click="set(pages)">»</button>
      <select class="apt-select apt-pager-size" :value="size" aria-label="จำนวนต่อหน้า" @change="emit('update:size', Number($event.target.value)); set(1)">
        <option :value="10">10</option><option :value="20">20</option><option :value="50">50</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({ page: { type: Number, required: true }, size: { type: Number, required: true }, total: { type: Number, required: true } })
const emit = defineEmits(['update:page', 'update:size'])
const pages = computed(() => Math.max(1, Math.ceil(props.total / props.size)))
function set(n) { emit('update:page', Math.min(Math.max(1, n), pages.value)) }
watch(pages, p => { if (props.page > p) set(p) })
</script>
