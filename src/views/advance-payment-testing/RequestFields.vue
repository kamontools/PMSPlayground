<template>
  <div>
    <div class="apt-grid apt-grid-req">
      <div class="apt-field">
        <label class="apt-label" for="rq-docno">เลขที่เอกสาร<span class="apt-req">*</span></label>
        <input id="rq-docno" class="apt-input" :value="rf.isNew ? '(ระบบออกเลขให้อัตโนมัติ)' : rf.doc.docNo" readonly />
      </div>
      <div class="apt-field" :class="{ 'apt-field--error': rf.errors.createdAt }">
        <label class="apt-label" for="rq-created">วันที่สร้าง<span class="apt-req">*</span></label>
        <input id="rq-created" v-model="rf.draft.createdAt" type="date" class="apt-input" :readonly="rf.locked" />
        <span v-if="rf.errors.createdAt" class="apt-error">กรุณาระบุวันที่สร้าง</span>
      </div>
      <div class="apt-field">
        <label class="apt-label" for="rq-due">วันที่ครบกำหนดเคลียร์</label>
        <input id="rq-due" v-model="rf.draft.dueDate" type="date" class="apt-input" :readonly="rf.locked" />
      </div>
      <div class="apt-field" :class="{ 'apt-field--error': rf.errors.requestedAmount }">
        <label class="apt-label" for="rq-amount">เงินที่ขอเบิก<span class="apt-req">*</span></label>
        <input id="rq-amount" v-model.number="rf.draft.requestedAmount" type="number" min="0" step="0.01" placeholder="0.00" class="apt-input apt-input--num" :readonly="rf.locked" />
        <span v-if="rf.errors.requestedAmount" class="apt-error">กรุณาระบุเงินที่ขอเบิก</span>
      </div>
      <div class="apt-field" :class="{ 'apt-field--error': rf.errors.vendorId }">
        <label class="apt-label" for="rq-vendor">ผู้จัดจำหน่าย/ผู้เบิก<span class="apt-req">*</span></label>
        <select id="rq-vendor" v-model="rf.draft.vendorId" class="apt-select" :disabled="rf.locked">
          <option value="" disabled>เลือกผู้จัดจำหน่าย/ผู้เบิก</option>
          <option v-for="v in VENDORS" :key="v.id" :value="v.id">{{ v.name }}</option>
        </select>
        <span v-if="rf.errors.vendorId" class="apt-error">กรุณาเลือกผู้จัดจำหน่าย/ผู้เบิก</span>
      </div>
      <div class="apt-field apt-span-desc" :class="{ 'apt-field--error': rf.errors.description }">
        <div class="apt-label-row">
          <label class="apt-label" for="rq-desc">คำอธิบาย<span class="apt-req">*</span></label>
          <span class="apt-count">{{ rf.draft.description.length }}/250</span>
        </div>
        <input id="rq-desc" v-model="rf.draft.description" type="text" class="apt-input" maxlength="250" placeholder="จะเอาไปใช้อะไร, จำนวนเงินที่ขอเบิก ฯลฯ" :readonly="rf.locked" />
        <span v-if="rf.errors.description" class="apt-error">กรุณาระบุคำอธิบาย</span>
      </div>
    </div>

    <FileGallery :files="rf.draft.files" :max="5" :locked="rf.locked" @locked="rf.warnEdit" />
  </div>
</template>

<script setup>
import FileGallery from './FileGallery.vue'
import { VENDORS } from './store.js'

// rf: the object returned by useRequestForm()
defineProps({ rf: { type: Object, required: true } })
</script>
