<template>
  <div class="apt-page">
    <aside class="apt-sidebar" aria-label="เมนูหลัก">
      <div class="apt-brand">
        <div class="apt-brand-mark">LOS</div>
        <div class="apt-brand-text">
          <span class="apt-brand-name">PMS LivingOS</span>
          <span class="apt-brand-sub">ชีวิตที่ดีขึ้นในทุกๆวัน</span>
        </div>
      </div>
      <div class="apt-menu-search">
        <AptIcon name="search" />
        <input type="text" placeholder="ค้นหาเมนู" readonly aria-label="ค้นหาเมนู" />
      </div>
      <nav class="apt-nav">
        <div class="apt-nav-group"><AptIcon name="calc" /> บัญชี GL</div>
        <div class="apt-nav-leaf apt-nav-leaf--active">เงินทดรองจ่าย</div>
        <div class="apt-nav-leaf">เงินสดย่อย</div>
        <div class="apt-nav-leaf">ใบแจ้งหนี้มาลงบัญชี (ลูกหนี้)</div>
        <div class="apt-nav-leaf">ใบเสร็จมาลงบัญชี (ลูกหนี้)</div>
        <div class="apt-nav-leaf">บันทึกบัญชี-ทั่วไป</div>
        <div class="apt-nav-leaf">ปิดรอบบัญชี</div>
        <div class="apt-nav-leaf">รายงานบัญชี</div>
        <div class="apt-nav-group"><AptIcon name="chair" /> ทรัพย์สิน</div>
        <div class="apt-nav-leaf">ทะเบียนทรัพย์สิน</div>
        <div class="apt-nav-leaf">รายงานทรัพย์สิน</div>
        <div class="apt-nav-label">ตั้งค่าโครงการ</div>
        <div class="apt-nav-group"><AptIcon name="card" /> บัญชีการเงิน</div>
        <div class="apt-nav-leaf">มิเตอร์</div>
      </nav>
      <div class="apt-sidebar-bottom">
        <div class="apt-nav-flat"><AptIcon name="book" /> คู่มือการใช้งาน</div>
        <div class="apt-nav-flat"><AptIcon name="download" /> รายการคำขอ</div>
        <div class="apt-user">
          <div class="apt-user-avatar">{{ roleLabel(state.role).slice(0, 1) }}</div>
          <div>
            <div class="apt-user-name">ผู้ใช้ทดสอบ · {{ roleLabel(state.role) }}</div>
            <div class="apt-user-status">ออนไลน์</div>
          </div>
        </div>
      </div>
    </aside>

    <div class="apt-main">
      <header class="apt-topbar">
        <nav class="apt-breadcrumb" aria-label="breadcrumb">
          <span>บัญชีการเงิน</span><span class="sep">›</span><span>บัญชี GL</span><span class="sep">›</span><span>เงินทดรองจ่าย</span>
        </nav>
        <div class="apt-topbar-right">
          <div class="apt-project-chip">
            <span>T-001 : โครงการตัวอย่าง คอนโดมิเนียม</span>
            <AptIcon name="swap" />
          </div>
          <router-link class="apt-exit" to="/prototype/advance-payment-v3">← v3</router-link>
          <router-link class="apt-exit" to="/">หน้าหลัก</router-link>
        </div>
      </header>

      <ApListPage v-if="state.nav.page === 'list'" />
      <ApRequestPage v-else-if="state.nav.page === 'request'" :key="`rq-${state.nav.docId}`" :doc-id="state.nav.docId" />
      <ApClearPage v-else-if="state.nav.page === 'clear'" :key="`cl-${state.nav.docId}`" :doc-id="state.nav.docId" />
    </div>

    <!-- tucked against the right edge; slides out on hover (or keyboard/tap focus) -->
    <div class="apt-devbar" role="region" aria-label="แถบควบคุมสำหรับทดสอบ">
      <button type="button" class="apt-devbar-handle" aria-label="เปิดแถบทดสอบ"><AptIcon name="back" /></button>
      <strong>Testing</strong>
      <label>
        Role
        <select v-model="state.role" aria-label="สลับ role">
          <option v-for="r in ROLES" :key="r.value" :value="r.value">{{ r.label }}</option>
        </select>
      </label>
      <button type="button" @click="onReset">รีเซ็ตข้อมูล</button>
    </div>

    <AppDialog />
    <transition name="apt-toast-fade">
      <div v-if="state.toast" class="apt-toast" role="status">{{ state.toast }}</div>
    </transition>
  </div>
</template>

<script setup>
import './advance-payment-testing/testing.css'
import AptIcon from './advance-payment-testing/AptIcon.vue'
import AppDialog from './advance-payment-testing/AppDialog.vue'
import ApListPage from './advance-payment-testing/ApListPage.vue'
import ApRequestPage from './advance-payment-testing/ApRequestPage.vue'
import ApClearPage from './advance-payment-testing/ApClearPage.vue'
import { ROLES, roleLabel } from './advance-payment-testing/machine.js'
import { state, resetAll, ask } from './advance-payment-testing/store.js'

async function onReset() {
  const { choice } = await ask({
    title: 'รีเซ็ตข้อมูลตัวอย่าง', tone: 'warning', cancelLabel: 'ยกเลิก', confirmLabel: 'รีเซ็ต',
    message: 'ข้อมูลทั้งหมดที่ทำไว้ในรอบนี้จะหายไป และกลับเป็นข้อมูลตัวอย่างเริ่มต้น (ใช้ก่อนเริ่มทดสอบกับผู้ใช้คนถัดไป)'
  })
  if (choice === 'confirm') resetAll()
}
</script>
