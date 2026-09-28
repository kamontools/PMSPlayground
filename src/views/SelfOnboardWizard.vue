<template>
  <div class="sow-page">
    <!-- ============ SIDEBAR (real PMS shell, reference: LivingOS ACADEMY screenshot) ============ -->
    <aside class="sow-sidebar">
      <div class="sow-brand">
        <div class="sow-brand-mark">LOS</div>
        <div class="sow-brand-text">
          <span class="sow-brand-pms">PMS LivingOS</span>
          <span class="sow-brand-tag">ชีวิตที่ดีขึ้นในทุกๆวัน</span>
        </div>
      </div>

      <div class="sow-search">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5"/><path d="M15 15l-3-3"/></svg>
        <input type="text" placeholder="ค้นหาเมนู..." readonly />
      </div>

      <nav class="sow-nav">
        <div class="sow-nav-group-head">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7z"/></svg>
          <span>เมนูใช้บ่อย</span>
        </div>
        <div class="sow-nav-leaf">รายงานทรัพย์สิน</div>
        <div class="sow-nav-leaf">จ่ายชำระ</div>

        <div class="sow-nav-section">หน้าหลัก</div>
        <button type="button" class="sow-nav-leaf sow-nav-leaf--flat sow-nav-leaf--btn" :class="{ 'sow-nav-leaf--active': activeView === 'home' }" @click="activeView = 'home'">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/></svg>
          <span>ภาพรวมโครงการ</span>
        </button>

        <div class="sow-nav-group-head">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l7-5 7 5"/><path d="M5 8v8h10V8"/></svg>
          <span>จัดการผู้พักอาศัย</span>
          <svg class="sow-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5l5 5-5 5"/></svg>
        </div>

        <div class="sow-nav-section">บัญชีการเงิน</div>
        <div class="sow-nav-group-head">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="6.5"/><path d="M10 6.5v7M8 8.3c0-.9.9-1.6 2-1.6s2 .6 2 1.4c0 2-4 1.2-4 3.1 0 .8.9 1.4 2 1.4s2-.7 2-1.6"/></svg>
          <span>ลูกหนี้ AR</span>
          <svg class="sow-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5l5 5-5 5"/></svg>
        </div>
        <div class="sow-nav-group-head">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l7-5 7 5"/><rect x="4" y="8" width="12" height="8"/><line x1="4" y1="16" x2="16" y2="16"/></svg>
          <span>เจ้าหนี้ AP</span>
          <svg class="sow-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5l5 5-5 5"/></svg>
        </div>
        <div class="sow-nav-group-head">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="13" height="13" rx="1"/><line x1="3.5" y1="8.3" x2="16.5" y2="8.3"/><line x1="3.5" y1="12.7" x2="16.5" y2="12.7"/><line x1="10" y1="3.5" x2="10" y2="16.5"/></svg>
          <span>บัญชี GL</span>
          <svg class="sow-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5l5 5-5 5"/></svg>
        </div>
        <div class="sow-nav-group-head">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="4.5" height="9.5"/><rect x="11.5" y="3.5" width="4.5" height="13"/></svg>
          <span>ทรัพย์สิน</span>
          <svg class="sow-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5l5 5-5 5"/></svg>
        </div>
        <div class="sow-nav-group-head">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l1.5 4-5.5 10-5.5-10z"/><line x1="6.6" y1="7" x2="13.4" y2="7"/></svg>
          <span>งบประมาณ</span>
          <svg class="sow-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5l5 5-5 5"/></svg>
        </div>

        <button type="button" class="sow-nav-leaf sow-nav-leaf--flat sow-nav-leaf--btn" :class="{ 'sow-nav-leaf--active': activeView === 'setup' }" @click="activeView = 'setup'">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="2.4"/><path d="M10 3.5v2M10 14.5v2M16.5 10h-2M5.5 10h-2M14.8 5.2l-1.4 1.4M6.6 13.4l-1.4 1.4M14.8 14.8l-1.4-1.4M6.6 6.6l-1.4-1.4"/></svg>
          <span>ตั้งค่าโครงการ</span>
        </button>
      </nav>

      <div class="sow-sidebar-bottom">
        <div class="sow-nav-leaf sow-nav-leaf--flat">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5c-1.5-1-4-1.5-6-1v11c2-.5 4.5 0 6 1"/><path d="M10 5c1.5-1 4-1.5 6-1v11c-2-.5-4.5 0-6 1"/><line x1="10" y1="5" x2="10" y2="16"/></svg>
          <span>คู่มือการใช้งาน</span>
        </div>
        <div class="sow-nav-leaf sow-nav-leaf--flat">
          <svg class="sow-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l2-6h10l2 6"/><path d="M3 10v6a1 1 0 001 1h12a1 1 0 001-1v-6"/><path d="M3 10h4l1 2h4l1-2h4"/></svg>
          <span>รายการคำขอ</span>
        </div>
        <div class="sow-divider"></div>
        <div class="sow-user">
          <div class="sow-user-avatar">
            <svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="14" r="6" fill="#1C70F7" opacity=".15"/><circle cx="18" cy="14" r="6" stroke="#1C70F7" stroke-width="1.8"/><path d="M8 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#1C70F7" stroke-width="1.8" stroke-linecap="round"/></svg>
            <span class="sow-user-dot"></span>
          </div>
          <div class="sow-user-info">
            <span class="sow-user-name">boy test</span>
            <span class="sow-user-status">ออนไลน์</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- ============ MAIN ============ -->
    <div class="sow-main">
      <div class="sow-topbar">
        <div class="sow-breadcrumb">
          <template v-if="activeView === 'home'">
            <span class="sow-crumb">หน้าหลัก</span>
            <span class="sow-crumb-sep">›</span>
            <span class="sow-crumb sow-crumb-current">ภาพรวมโครงการ</span>
          </template>
          <template v-else>
            <span class="sow-crumb">ตั้งค่าโครงการ</span>
            <span class="sow-crumb-sep">›</span>
            <span class="sow-crumb sow-crumb-current">{{ state.demo ? 'Self-onboard (demo)' : 'Self-onboard' }}</span>
          </template>
        </div>
        <div class="sow-topbar-right">
          <div class="sow-project-chip">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3l-4 3v11h4V9h6v8h4V6l-4-3"/></svg>
            <span>{{ state.general.name || 'โครงการใหม่' }}</span>
            <svg class="sow-swap-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10l-3-3M16 13H6l3 3"/></svg>
          </div>
          <button type="button" class="sow-btn" :class="{ on: showWelcome }" @click="showWelcome = true">👋 แนะนำ platform</button>
          <router-link class="sow-btn" to="/prototype/self-service-onboarding">📄 Brief</router-link>
          <router-link class="sow-exit" to="/">← หน้าหลัก</router-link>
        </div>
      </div>

      <div class="sow-canvas">
        <SsoHome v-if="activeView === 'home'" />
        <SsoSetup v-else @intro="showWelcome = true" @live="activeView = 'home'" />
      </div>
    </div>

    <SsoWelcomeDialog v-if="showWelcome" @close="onClose" @start="onStart" @demo="onDemo" />
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import SsoSetup from './self-onboard/SsoSetup.vue'
import SsoHome from './self-onboard/SsoHome.vue'
import SsoWelcomeDialog from './self-onboard/SsoWelcomeDialog.vue'
import { state, resetState, loadDemo } from './self-onboard/store.js'

// First visit opens the welcome dialog; returning users go straight to setup
const showWelcome = ref(!state.started)
// Home ("ภาพรวมโครงการ") is the landing page once a project is live; otherwise land in setup
const activeView = ref(state.live ? 'home' : 'setup')

function onClose() {
  state.started = true
  showWelcome.value = false
}
function onStart() {
  if (state.demo) resetState()
  state.started = true
  showWelcome.value = false
}
function onDemo() {
  loadDemo()
  showWelcome.value = false
}

// lock page scroll behind the dialog
watch(showWelcome, v => { document.body.style.overflow = v ? 'hidden' : '' }, { immediate: true })
onBeforeUnmount(() => { document.body.style.overflow = '' })
</script>

<style scoped>
/*
  Real PMS shell (sidebar + topbar), reference: LivingOS ACADEMY product screenshot.
  Palette vars below map to the design-system tokens in src/style.css (:root) so the
  self-onboard components (SsoSetup / SsoWelcomeDialog / SsoAccountPicker — via wizard.css)
  read the same values through CSS-variable inheritance without needing their own edits.
*/
.sow-page{
  --blue:var(--color-primary-500); --blue600:var(--color-primary-click); --blue400:#5B9FFF; --blue100:var(--color-primary-200); --blue50:#F5F9FF;
  --page:#FFFFFF; --surface:var(--color-disabled-bg); --overlay:var(--color-disabled-bg); --bl:var(--color-dividers); --bm:var(--color-stroke);
  --t1:var(--color-text-primary); --t2:var(--color-text-secondary); --t3:var(--color-text-tertiary); --t4:var(--color-text-placeholder);
  --green:var(--color-success); --green-bg:var(--color-success-bg); --green-bd:#BBF7D0;
  --yellow:var(--color-attention); --yellow-bg:var(--color-attention-bg); --yellow-bd:#FDE8B8;
  --red:var(--color-error); --red-bg:var(--color-error-bg); --red-bd:#FBC6C6;
  --shadow-sm:var(--shadow-header); --shadow-md:var(--shadow-modal);
  --sow-sidebar-w:264px;

  min-height:100vh; background:var(--color-disabled-bg); color:var(--t2); font-family:var(--font-family); line-height:1.65; font-size:15px;
}
.sow-page :deep(*){ box-sizing:border-box; }
.sow-page :deep(h1), .sow-page :deep(h2), .sow-page :deep(h3){ font-family:var(--font-family); color:var(--t1); margin:0; }

/* ---------- SIDEBAR ---------- */
.sow-sidebar{
  position:fixed; top:0; left:0; width:var(--sow-sidebar-w); height:100vh;
  background:#fff; border-right:1px solid var(--bl); display:flex; flex-direction:column; z-index:40;
}
.sow-brand{ display:flex; align-items:center; gap:12px; padding:13px 16px; border-bottom:1px solid var(--bl); flex-shrink:0; }
.sow-brand-mark{ width:32px; height:32px; border-radius:8px; flex-shrink:0; background:linear-gradient(135deg, var(--blue), var(--blue400)); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:13px; }
.sow-brand-text{ display:flex; flex-direction:column; min-width:0; }
.sow-brand-pms{ font-size:14px; font-weight:700; color:var(--t1); }
.sow-brand-tag{ font-size:10.5px; color:var(--t3); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

.sow-search{ display:flex; align-items:center; gap:10px; margin:10px 12px; padding:8px 12px; border:1px solid var(--bl); border-radius:8px; color:var(--t3); flex-shrink:0; }
.sow-search svg{ width:16px; height:16px; flex-shrink:0; }
.sow-search input{ border:none; outline:none; background:transparent; font-family:inherit; font-size:14px; color:var(--t1); width:100%; cursor:default; }
.sow-search input::placeholder{ color:var(--t4); }

.sow-nav{ flex:1; overflow-y:auto; padding-bottom:8px; }
.sow-nav-section{ padding:12px 20px 4px; font-size:11px; font-weight:600; color:var(--t4); text-transform:uppercase; letter-spacing:.04em; }
.sow-nav-group-head{ display:flex; align-items:center; gap:10px; padding:9px 20px; margin:2px 8px; font-size:14px; font-weight:700; color:var(--blue); border-radius:8px; }
.sow-nav-ic{ width:18px; height:18px; flex-shrink:0; }
.sow-chev{ width:13px; height:13px; margin-left:auto; flex-shrink:0; color:var(--t4); }
.sow-nav-leaf{ padding:8px 20px 8px 46px; margin:1px 8px; font-size:14px; color:var(--t2); border-radius:8px; cursor:default; }
.sow-nav-leaf--flat{ padding-left:20px; display:flex; align-items:center; gap:10px; color:var(--t2); }
.sow-nav-leaf--btn{ width:calc(100% - 16px); font:inherit; text-align:left; background:none; border:none; cursor:pointer; }
.sow-nav-leaf--btn:hover{ background:var(--surface); }
.sow-nav-leaf--active{ background:var(--blue100); color:var(--blue); font-weight:700; position:relative; }
.sow-nav-leaf--active::before{ content:''; position:absolute; left:8px; top:6px; bottom:6px; width:3px; background:var(--blue); border-radius:0 3px 3px 0; }

.sow-sidebar-bottom{ flex-shrink:0; padding-top:6px; }
.sow-divider{ height:1px; background:var(--bl); margin:6px 16px; }
.sow-user{ display:flex; align-items:center; gap:10px; padding:12px 16px; }
.sow-user-avatar{ position:relative; width:32px; height:32px; flex-shrink:0; }
.sow-user-avatar svg{ width:100%; height:100%; }
.sow-user-dot{ position:absolute; right:-2px; bottom:-2px; width:9px; height:9px; background:var(--green); border:2px solid #fff; border-radius:50%; }
.sow-user-info{ display:flex; flex-direction:column; flex:1; min-width:0; }
.sow-user-name{ font-size:14px; font-weight:600; color:var(--t1); }
.sow-user-status{ font-size:11px; color:var(--green); }

/* ---------- MAIN ---------- */
.sow-main{ margin-left:var(--sow-sidebar-w); }
.sow-topbar{ position:sticky; top:0; z-index:10; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:12px 28px; background:#fff; border-bottom:1px solid var(--bl); }
.sow-breadcrumb{ font-size:12.5px; color:var(--t3); flex-shrink:0; display:flex; align-items:center; }
.sow-crumb-sep{ margin:0 6px; color:var(--t4); }
.sow-crumb-current{ color:var(--t1); font-weight:700; }
.sow-topbar-right{ display:flex; align-items:center; gap:8px; min-width:0; flex-wrap:wrap; justify-content:flex-end; }
.sow-project-chip{ display:flex; align-items:center; gap:8px; font-size:12.5px; color:var(--t2); background:var(--surface); padding:6px 12px; border-radius:8px; min-width:0; max-width:260px; }
.sow-project-chip span{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.sow-project-chip svg{ width:14px; height:14px; flex-shrink:0; }
.sow-swap-ic{ color:var(--t3); cursor:pointer; }
.sow-btn{ font-family:inherit; font-size:12.5px; font-weight:600; color:var(--t2); background:#fff; border:1px solid var(--bl); padding:7px 13px; border-radius:8px; cursor:pointer; text-decoration:none; white-space:nowrap; }
.sow-btn:hover{ border-color:var(--blue400); color:var(--blue600); }
.sow-btn.on{ background:var(--blue100); border-color:var(--blue100); color:var(--blue600); }
.sow-exit{ flex-shrink:0; font-size:12.5px; font-weight:600; color:var(--blue600); text-decoration:none; background:var(--surface); padding:7px 13px; border-radius:8px; border:1px solid var(--bl); white-space:nowrap; }
.sow-exit:hover{ background:var(--blue100); }

.sow-canvas{ background:var(--color-disabled-bg); min-height:calc(100vh - 57px); }

@media (max-width:900px){
  .sow-sidebar{ display:none; }
  .sow-main{ margin-left:0; }
  .sow-topbar{ padding:10px 16px; flex-wrap:wrap; }
  .sow-project-chip{ display:none; }
}
</style>
