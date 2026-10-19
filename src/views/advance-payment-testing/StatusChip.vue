<template>
  <span class="apt-chip" :class="`apt-chip--${meta.tone}`">{{ meta.label }}</span>
</template>

<script setup>
import { computed } from 'vue'
import { statusMeta } from './machine.js'

const props = defineProps({ status: { type: String, required: true } })
const meta = computed(() => statusMeta(props.status))
</script>
