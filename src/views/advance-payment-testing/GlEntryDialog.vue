<template>
  <div class="apt-overlay" role="dialog" aria-modal="true" :aria-label="title">
    <div class="apt-dialog apt-dialog--lg">
      <div class="apt-dialog-head">
        <h2>{{ title }}<span v-if="readonly && entry.no"> · {{ entry.no }}</span></h2>
      </div>
      <div class="apt-dialog-body">
        <div class="apt-grid apt-grid-12">
          <div class="apt-field" :class="{ 'apt-field--error': errors.date }">
            <label class="apt-label" for="gl-date">วันที่<span class="apt-req">*</span></label>
            <input id="gl-date" v-model="form.date" type="date" class="apt-input" :readonly="readonly" />
            <span v-if="errors.date" class="apt-error">กรุณาระบุวันที่</span>
          </div>
          <div class="apt-field">
            <div class="apt-label-row">
              <label class="apt-label" for="gl-detail">รายละเอียด</label>
              <span class="apt-count">{{ form.detail.length }}/500</span>
            </div>
            <input id="gl-detail" v-model="form.detail" type="text" class="apt-input" maxlength="500" :readonly="readonly" />
          </div>
        </div>

        <div class="apt-table-wrap">
          <table class="apt-table">
            <thead>
              <tr>
                <th style="width: 60px;">ลำดับ</th>
                <th>รหัสผังบัญชี</th>
                <th>รายละเอียด</th>
                <th class="num">เดบิต</th>
                <th class="num">เครดิต</th>
                <th v-if="!readonly" class="actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(line, i) in form.lines" :key="i">
                <td>{{ i + 1 }}</td>
                <td>
                  <span v-if="readonly">{{ line.account }} : {{ accountName(line.account) }}</span>
                  <select v-else v-model="line.account" class="apt-select" :aria-label="`รหัสผังบัญชี แถว ${i + 1}`">
                    <option value="" disabled>เลือกรหัสผังบัญชี</option>
                    <option v-for="a in accounts" :key="a.code" :value="a.code">{{ a.code }} : {{ a.name }}</option>
                  </select>
                </td>
                <td>
                  <span v-if="readonly">{{ line.detail || '-' }}</span>
                  <input v-else v-model="line.detail" type="text" class="apt-input" :aria-label="`รายละเอียด แถว ${i + 1}`" />
                </td>
                <td class="num">
                  <span v-if="readonly">{{ fmtMoney(line.debit) }}</span>
                  <input v-else v-model.number="line.debit" type="number" min="0" step="0.01" class="apt-input apt-input--num" :aria-label="`เดบิต แถว ${i + 1}`" />
                </td>
                <td class="num">
                  <span v-if="readonly">{{ fmtMoney(line.credit) }}</span>
                  <input v-else v-model.number="line.credit" type="number" min="0" step="0.01" class="apt-input apt-input--num" :aria-label="`เครดิต แถว ${i + 1}`" />
                </td>
                <td v-if="!readonly" class="actions">
                  <button type="button" class="apt-icon-btn apt-icon-btn--danger" :aria-label="`ลบแถว ${i + 1}`" @click="form.lines.splice(i, 1)"><AptIcon name="trash" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button v-if="!readonly" type="button" class="apt-btn apt-btn-outline" style="width: 100%; margin-top: 12px;" @click="addLine">
          <AptIcon name="plus" /> เพิ่มรายการ
        </button>

        <div class="apt-grid apt-grid-3" style="margin-top: 20px; padding-top: 16px; border-top: 1px dashed var(--color-dividers);">
          <div class="apt-field"><span class="apt-label">รวมเดบิต</span><input class="apt-input apt-input--num" :value="fmtMoney(totalDebit)" readonly aria-label="รวมเดบิต" /></div>
          <div class="apt-field"><span class="apt-label">รวมเครดิต</span><input class="apt-input apt-input--num" :value="fmtMoney(totalCredit)" readonly aria-label="รวมเครดิต" /></div>
          <div class="apt-field" :class="{ 'apt-field--error': !balanced }">
            <span class="apt-label">ผลต่าง</span>
            <input class="apt-input apt-input--num" :value="fmtMoney(diff)" readonly aria-label="ผลต่าง" />
            <span v-if="!balanced" class="apt-error">เดบิตและเครดิตต้องเท่ากันก่อนบันทึก</span>
          </div>
        </div>
      </div>
      <div class="apt-dialog-foot apt-dialog-foot--end">
        <template v-if="readonly">
          <button type="button" class="apt-btn apt-btn-ghost" @click="emit('close')">ปิด</button>
        </template>
        <template v-else>
          <button type="button" class="apt-btn apt-btn-ghost" @click="emit('later')">ลงบัญชีในภายหลัง</button>
          <button type="button" class="apt-btn apt-btn-primary" :disabled="!balanced || !form.lines.length" @click="save">บันทึกบัญชีเลย</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import AptIcon from './AptIcon.vue'
import { GL_ACCOUNTS, EXPENSE_ACCOUNTS, accountName, fmtMoney, round2, clone, todayIso } from './store.js'

// Used for both the PV (paying a request) and the JV (approving a clearing); the caller builds the starting entry.
const props = defineProps({
  entry: { type: Object, required: true },
  title: { type: String, default: 'บันทึกบัญชี : ใบสำคัญจ่าย : PV' },
  readonly: { type: Boolean, default: false }
})
const emit = defineEmits(['save', 'later', 'close'])

const accounts = [...GL_ACCOUNTS, ...EXPENSE_ACCOUNTS]
const start = clone(props.entry)
const form = reactive({ date: start.date || todayIso(), detail: start.detail || '', lines: start.lines })
const errors = reactive({ date: false })

const totalDebit = computed(() => round2(form.lines.reduce((s, l) => s + Number(l.debit || 0), 0)))
const totalCredit = computed(() => round2(form.lines.reduce((s, l) => s + Number(l.credit || 0), 0)))
const diff = computed(() => round2(totalDebit.value - totalCredit.value))
const balanced = computed(() => diff.value === 0 && totalDebit.value > 0)

function addLine() { form.lines.push({ account: '', detail: '', debit: 0, credit: 0 }) }

function save() {
  errors.date = !form.date
  if (errors.date || !balanced.value) return
  emit('save', { date: form.date, detail: form.detail, lines: form.lines.filter(l => l.account) })
}
</script>
