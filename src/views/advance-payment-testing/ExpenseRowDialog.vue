<template>
  <div class="apt-overlay" role="dialog" aria-modal="true" aria-label="เพิ่ม/แก้ไขรายการ">
    <div class="apt-dialog apt-dialog--md">
      <div class="apt-dialog-head"><h2>เพิ่ม/แก้ไขรายการ</h2></div>
      <div class="apt-dialog-body">
        <div class="apt-field" :class="{ 'apt-field--error': errors.account }" style="margin-bottom: 16px;">
          <label class="apt-label" for="ex-account">รายจ่าย<span class="apt-req">*</span></label>
          <select id="ex-account" ref="firstEl" v-model="form.code" class="apt-select">
            <option value="" disabled>เลือกรายจ่าย</option>
            <option v-for="e in EXPENSE_TYPES" :key="e.code" :value="e.code">{{ e.code }} : {{ e.name }}</option>
          </select>
          <span v-if="errors.account" class="apt-error">กรุณาเลือกรายจ่าย</span>
        </div>
        <div class="apt-field" style="margin-bottom: 16px;">
          <div class="apt-label-row">
            <label class="apt-label" for="ex-detail">รายละเอียด</label>
            <span class="apt-count">{{ form.detail.length }}/100</span>
          </div>
          <input id="ex-detail" v-model="form.detail" type="text" class="apt-input" maxlength="100" />
        </div>
        <div class="apt-field" :class="{ 'apt-field--error': errors.amount }" style="max-width: 260px;">
          <label class="apt-label" for="ex-amount">จำนวนเงิน<span class="apt-req">*</span></label>
          <input id="ex-amount" v-model.number="form.amount" type="number" min="0" step="0.01" class="apt-input apt-input--num" @keydown.enter="save" />
          <span v-if="errors.amount" class="apt-error">จำนวนเงินต้องมากกว่า 0</span>
        </div>
      </div>
      <div class="apt-dialog-foot apt-dialog-foot--end">
        <button type="button" class="apt-btn apt-btn-ghost" @click="emit('close')">ปิด</button>
        <button type="button" class="apt-btn apt-btn-primary" @click="save">ตกลง</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { EXPENSE_TYPES, uid } from './store.js'

const props = defineProps({ row: { type: Object, default: null } })
const emit = defineEmits(['save', 'close'])

const form = reactive(props.row ? { ...props.row } : { id: uid('R'), code: '', detail: '', amount: null })
const errors = reactive({ account: false, amount: false })
const firstEl = ref(null)
onMounted(() => firstEl.value?.focus())

function save() {
  errors.account = !form.code
  errors.amount = !(Number(form.amount) > 0)
  if (errors.account || errors.amount) return
  emit('save', { ...form, amount: Number(form.amount) })
}
</script>
