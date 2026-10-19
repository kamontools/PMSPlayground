<template>
  <div v-if="dlg" class="apt-overlay" role="dialog" aria-modal="true" :aria-label="dlg.title" @keydown.esc="close('cancel')">
    <div class="apt-dialog" :class="`apt-dialog--${dlg.tone}`">
      <div class="apt-dialog-head"><h2>{{ dlg.title }}</h2></div>
      <div class="apt-dialog-body">
        <p v-if="dlg.message">{{ dlg.message }}</p>
        <dl v-if="dlg.summary?.length" class="apt-summary">
          <template v-for="row in dlg.summary" :key="row.label">
            <dt>{{ row.label }}</dt><dd>{{ row.value }}</dd>
          </template>
        </dl>
        <div v-if="dlg.reason" class="apt-field" :class="{ 'apt-field--error': reasonError }">
          <div class="apt-label-row">
            <label class="apt-label" for="apt-dialog-reason">{{ dlg.reason.label }}<span class="apt-req">*</span></label>
            <span class="apt-count">{{ reason.length }}/{{ dlg.reason.max || 250 }}</span>
          </div>
          <textarea id="apt-dialog-reason" ref="reasonEl" v-model="reason" class="apt-textarea" rows="3" :maxlength="dlg.reason.max || 250"></textarea>
          <span v-if="reasonError" class="apt-error">กรุณาระบุ{{ dlg.reason.label }}</span>
        </div>
      </div>
      <div class="apt-dialog-foot">
        <button v-if="dlg.cancelLabel" type="button" class="apt-btn apt-btn-ghost" @click="close('cancel')">{{ dlg.cancelLabel }}</button>
        <button v-if="dlg.secondaryLabel" type="button" class="apt-btn apt-btn-outline" @click="close('secondary')">{{ dlg.secondaryLabel }}</button>
        <button v-if="dlg.confirmLabel" ref="confirmEl" type="button" class="apt-btn" :class="dlg.tone === 'danger' ? 'apt-btn-danger' : 'apt-btn-primary'" @click="confirm">{{ dlg.confirmLabel }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { state, closeDialog } from './store.js'

const dlg = computed(() => state.dialog)
const reason = ref('')
const reasonError = ref(false)
const reasonEl = ref(null)
const confirmEl = ref(null)

watch(dlg, async d => {
  reason.value = ''
  reasonError.value = false
  if (!d) return
  await nextTick()
  ;(reasonEl.value || confirmEl.value)?.focus()
})

function confirm() {
  if (dlg.value.reason && !reason.value.trim()) {
    reasonError.value = true
    return
  }
  closeDialog('confirm', reason.value.trim())
}
function close(choice) { closeDialog(choice) }
</script>
