<template>
  <span v-if="files.length" class="apt-file-links">
    <button v-for="f in files" :key="f.id" type="button" class="apt-link" @click="openFile(f)">{{ f.name }}</button>
  </span>
  <span v-else>—</span>
</template>

<script setup>
import { useAptStore } from './store.js'

// Read-only list of attached files; each name opens the preview dialog.
defineProps({ files: { type: Array, required: true } })
const { openFile } = useAptStore()
</script>
