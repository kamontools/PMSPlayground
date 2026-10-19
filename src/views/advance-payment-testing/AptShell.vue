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
          <div class="apt-user-avatar">ผ</div>
          <div>
            <div class="apt-user-name">ผู้ใช้ทดสอบ</div>
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

      <slot />
    </div>

    <!-- tucked against the right edge; slides out on hover (or keyboard/tap focus) -->
    <div class="apt-devbar" role="region" aria-label="แถบควบคุมสำหรับทดสอบ">
      <button type="button" class="apt-devbar-handle" aria-label="เปิดแถบทดสอบ"><AptIcon name="back" /></button>
      <strong>Testing</strong>
      <button type="button" @click="onReset">รีเซ็ตข้อมูล</button>
    </div>

    <AppDialog />
    <transition name="apt-toast-fade">
      <div v-if="state.toast" class="apt-toast" role="status">{{ state.toast }}</div>
    </transition>
  </div>
</template>

<script setup>
// Page chrome shared by the testing versions: sidebar, topbar, slide-out Testing bar, app dialog and toast.
// The parent provides the store (createAptStore + provideAptStore) and passes its pages in the default slot.
import './testing.css'
import AptIcon from './AptIcon.vue'
import AppDialog from './AppDialog.vue'
import { useAptStore } from './store.js'

const { state, resetAll, ask } = useAptStore()

async function onReset() {
  const { choice } = await ask({
    title: 'รีเซ็ตข้อมูลตัวอย่าง', tone: 'warning', cancelLabel: 'ยกเลิก', confirmLabel: 'รีเซ็ต',
    message: 'ข้อมูลทั้งหมดที่ทำไว้ในรอบนี้จะหายไป และกลับเป็นข้อมูลตัวอย่างเริ่มต้น (ใช้ก่อนเริ่มทดสอบกับผู้ใช้คนถัดไป)'
  })
  if (choice === 'confirm') resetAll()
}
</script>
