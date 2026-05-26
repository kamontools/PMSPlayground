<template>
  <div class="pms-ju-drawer-page">
    <router-link class="pms-ju-exit" to="/">← หน้าหลัก</router-link>

    <header class="topbar">
      <div class="topbar-logo">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        </div>
        <div>
          <div class="logo-text-main">PMS LivingOS</div>
          <div class="logo-text-sub">ชีวิตที่ดีขึ้นในทุกๆวัน</div>
        </div>
      </div>
      <div style="flex:1" />
      <div class="topbar-actions">
        <div class="project-chip">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          โครงการนิติบุคคล หมู่บ้านสิริ คอนโดมิเนียม เขตบางนา
        </div>
        <button type="button" class="demo-btn" :class="{ open: demoOpen }" @click.stop="demoOpen = !demoOpen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Demo
          </button>
        <div class="topbar-actions-divider" role="presentation" />
        <div ref="juBtnRef" class="ju-button">
          <div v-show="hasImportant" class="ju-pulse-ring" />
          <div v-show="hasImportant" class="ju-pulse-ring ju-pulse-ring--delay" />
          <span v-show="unreadCount > 0 || hasImportant" class="ju-btn-badge" />
          <button
            type="button"
            class="ju-btn-inner"
            :class="{ active: drawerOpen }"
            @click.stop="toggleDrawer"
          >
            <svg class="ju-cloud-face" viewBox="0 0 251 171" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="ju-cloud-clip">
                  <path d="M115.789 0C138.463 0 158.152 12.7789 168.048 31.5273C170.209 31.1816 172.426 31 174.685 31C197.158 31.0002 215.473 48.7844 216.333 71.0469C236.283 76.281 251 94.4343 251 116.026C251 141.708 230.181 162.526 204.5 162.526C203.563 162.526 202.633 162.497 201.71 162.442C200.031 162.806 198.288 163 196.5 163H61.5C59.4281 163 57.4167 162.741 55.4951 162.257C24.3656 159.35 0.000239031 133.153 0 101.264C0 67.8936 26.6804 40.7547 59.873 40.0156C67.7942 16.7425 89.8362 0.000165719 115.789 0Z"/>
                </clipPath>
                <radialGradient id="paint0_radial_32004_8" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(183.5 31) rotate(135.83) scale(146.386 225.417)">
                  <stop stop-color="#6CB0FF"/>
                  <stop offset="0.221154" stop-color="#298DFF"/>
                  <stop offset="0.711538" stop-color="#1C70F7"/>
                  <stop offset="1" stop-color="#005BEF"/>
                </radialGradient>
              </defs>
              <path d="M115.789 0C138.463 0 158.152 12.7789 168.048 31.5273C170.209 31.1816 172.426 31 174.685 31C197.158 31.0002 215.473 48.7844 216.333 71.0469C236.283 76.281 251 94.4343 251 116.026C251 141.708 230.181 162.526 204.5 162.526C203.563 162.526 202.633 162.497 201.71 162.442C200.031 162.806 198.288 163 196.5 163H61.5C59.4281 163 57.4167 162.741 55.4951 162.257C24.3656 159.35 0.000239031 133.153 0 101.264C0 67.8936 26.6804 40.7547 59.873 40.0156C67.7942 16.7425 89.8362 0.000165719 115.789 0Z" fill="url(#paint0_radial_32004_8)" stroke="white" stroke-width="12"/>
              <rect :transform="leftEyeTransform" x="68" y="67" width="17" height="38" rx="8.5" fill="white"/>
              <rect :transform="rightEyeTransform" x="117" y="67" width="17" height="38" rx="8.5" fill="white"/>
            </svg>
          </button>
          <div v-show="tooltipVisible" class="ju-tooltip">
            <span class="ju-tooltip-icon">{{ activeTooltip?.icon ?? '👉' }}</span>
            <span>{{ activeTooltip?.message }}</span>
            <button type="button" class="ju-tooltip-close" @click.stop="tooltipHidden = true">✕</button>
          </div>
        </div>
      </div>
    </header>

    <nav class="sidebar">
      <div class="sidebar-body">
      <div class="nav-section-label">เมนูใช้บ่อย</div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        ผังบัญชี
      </div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ใบแจ้งหนี้
      </div>
      <div class="nav-section-label" style="margin-top:8px">หน้าหลัก</div>
      <div class="nav-item active">
        <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        ภาพรวมโครงการ
      </div>
      <div class="nav-section-label" style="margin-top:8px">จัดการผู้พักอาศัย</div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        ผู้พักอาศัย
      </div>
      <div class="nav-section-label" style="margin-top:8px">บัญชีการเงิน</div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        ลูกหนี้ AR
        <svg viewBox="0 0 24 24" style="width:12px;height:12px;margin-left:auto"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
      <div class="nav-sub nav-item">ทะเบียนมิเตอร์</div>
      <div class="nav-sub nav-item">ใบแจ้งหนี้</div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        บัญชี GL
      </div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        ทรัพย์สิน
      </div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        งบประมาณ
        <span class="nav-badge">New</span>
      </div>
      <div class="nav-section-label" style="margin-top:8px">ตั้งค่าโครงการ</div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        บัญชีการเงิน
      </div>
      </div>
      <div class="sidebar-footer">
        <div class="user-chip user-chip--sidebar">
          <div class="user-avatar">KM</div>
          <span>kamon_manager</span>
        </div>
      </div>
    </nav>

    <main class="main">
      <div class="announce-bar">
        <span class="announce-badge">ประกาศ</span>
        <span>ยกเลิกการเข้าสู่ระบบด้วย username รูปแบบเดิมตั้งแต่วันที่ 1 ก.ค. 69 เป็นต้นไป
        โปรดดำเนินการลงทะเบียนและเข้าใช้งานด้วยสิทธิ์รูปแบบใหม่ให้เสร็จสิ้นก่อนวันที่ 30 มิ.ย. 69
        <a href="#" style="color:var(--blue-600);font-weight:500">(ลงทะเบียนย้าย)</a></span>
      </div>
      <div class="news-header">
        <span class="news-toggle">
          <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
          ซ่อนรายการข่าวสาร
        </span>
      </div>
      <div class="news-grid">
        <div class="news-card">
          <div class="news-img orange">📋 ประกันความเสียหาย</div>
          <div class="news-text">บริการตรวจสอบงานโครงสร้างอาคาร ประเมินความเสียหายโครงสร้าง</div>
        </div>
        <div class="news-card">
          <div class="news-img blue">🗳️ i-Vote</div>
          <div class="news-text">เพราะความปลอดภัยของทุกคนสำคัญที่สุด เลือกประชุมใหญ่สามัญประจำปีแบบออนไลน์</div>
        </div>
        <div class="news-card">
          <div class="news-img teal">📢 ประกาศสำคัญ</div>
          <div class="news-text">แจ้งหยุดให้บริการระบบชั่วคราว กรุณาติดต่อดำเนินการย้ายระบบ</div>
        </div>
        <div class="news-card">
          <div class="news-img purple">🎓 คอร์สเรียน</div>
          <div class="news-text">เปิดรับสมัครแล้ว! คอร์สเรียนระบบบัญชีสำหรับนิติบุคคล</div>
        </div>
      </div>
      <div class="section-title">ภาพรวมในส่วนงานต่างๆ</div>
      <div class="tabs">
        <div class="tab active">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>
          หนี้คงค้าง
        </div>
        <div class="tab">
          <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
          พัสดุ
        </div>
        <div class="tab">
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          สถานะพักอาศัย
        </div>
        <div class="tab tab-special">
          ดูสลิปตรวจสอบ <span class="tab-badge">1</span>
        </div>
      </div>
      <div class="overview-card">
        <div class="ov-header">
          <div class="ov-title">ภาพรวมในส่วนงาน หนี้คงค้าง <span style="font-size:11px;color:var(--gray-400);font-weight:400">(ณ วันที่ 28 เม.ย. 2569)</span></div>
          <div class="ov-date-select">
            04/2569
            <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="rate-label">อัตราการชำระ แยกตามประเภทหนี้คงค้าง</div>
        <div class="rate-cards">
          <div class="rate-card active-rate">
            <div class="rate-label2">ค่าส่วนกลาง</div>
            <div class="rate-val">96.41% <div class="rate-warn" /></div>
          </div>
          <div class="rate-card">
            <div class="rate-label2">ค่าน้ำ</div>
            <div class="rate-val" style="color:var(--gray-400)">0.00% <div class="rate-warn" /></div>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-title">รายละเอียดสถานะหนี้คงค้าง : ค่าส่วนกลาง</div>
          <table class="detail-table">
            <thead>
              <tr>
                <th>สถานะ</th>
                <th style="text-align:right">ยูนิต</th>
                <th style="text-align:right">จำนวนเงิน (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ยอดแจ้งหนี้</td>
                <td style="text-align:right">6</td>
                <td style="text-align:right">฿ 18,670.00</td>
              </tr>
              <tr>
                <td><span class="status-dot dot-green" />ชำระแล้ว</td>
                <td style="text-align:right">1</td>
                <td style="text-align:right">฿ 18,000.00 <span style="color:var(--blue-600)">(96.41%)</span></td>
              </tr>
              <tr>
                <td><span class="status-dot dot-gray" />ยังไม่ชำระ</td>
                <td style="text-align:right">5</td>
                <td style="text-align:right">฿ 670.00 <span style="color:var(--gray-400)">(3.59%)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <aside ref="juDrawerRef" class="ju-drawer" :class="{ open: drawerOpen }">
      <div class="drawer-head">
        <span class="head-title">การแจ้งเตือน</span>
        <div class="head-actions">
          <button type="button" class="head-read-all" @click="readAll">อ่านทั้งหมด</button>
          <span class="head-actions-divider" />
          <button type="button" class="head-settings-btn" @click="settingsOpen = true" title="ตั้งค่าการแจ้งเตือน">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
        </div>
      </div>

      <!-- Settings overlay panel -->
      <div class="settings-panel" :class="{ open: settingsOpen }">
        <div class="settings-head">
          <div class="settings-title">
            <svg class="settings-cloudee-icon" viewBox="0 0 251 171" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="sg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(183.5 31) rotate(135.83) scale(146.386 225.417)">
                  <stop stop-color="#6CB0FF"/><stop offset="0.22" stop-color="#298DFF"/><stop offset="0.71" stop-color="#1C70F7"/><stop offset="1" stop-color="#005BEF"/>
                </radialGradient>
              </defs>
              <path d="M115.789 0C138.463 0 158.152 12.7789 168.048 31.5273C170.209 31.1816 172.426 31 174.685 31C197.158 31.0002 215.473 48.7844 216.333 71.0469C236.283 76.281 251 94.4343 251 116.026C251 141.708 230.181 162.526 204.5 162.526C203.563 162.526 202.633 162.497 201.71 162.442C200.031 162.806 198.288 163 196.5 163H61.5C59.4281 163 57.4167 162.741 55.4951 162.257C24.3656 159.35 0.000239031 133.153 0 101.264C0 67.8936 26.6804 40.7547 59.873 40.0156C67.7942 16.7425 89.8362 0.000165719 115.789 0Z" fill="url(#sg)" stroke="white" stroke-width="12"/>
              <rect x="68" y="67" width="17" height="38" rx="8.5" fill="white"/>
              <rect x="117" y="67" width="17" height="38" rx="8.5" fill="white"/>
            </svg>
            ตั้งค่าการแจ้งเตือน
          </div>
          <button type="button" class="settings-close" @click="settingsOpen = false">✕</button>
        </div>
        <div class="settings-body">
          <p class="settings-intro">เลือกหัวข้อที่ต้องการรับแจ้งเตือน Cloudee จะแสดงเฉพาะรายการที่เปิดไว้เท่านั้น</p>
          <div v-for="group in topicGroups" :key="group.id" class="settings-group">
            <div class="settings-group-header">
              <span class="settings-group-dot" :class="'dot-' + group.id" />
              <span class="settings-group-label">{{ group.label }}</span>
            </div>
            <div v-for="topic in group.topics" :key="topic.key" class="settings-row" :class="'row-' + group.id">
              <div class="settings-row-left">
                <div class="settings-info">
                  <div class="settings-name">{{ topic.label }}</div>
                  <div class="settings-desc">{{ topic.desc }}</div>
                </div>
              </div>
              <button
                type="button"
                class="stg-switch"
                :class="{ on: notifSettings[topic.key] }"
                @click="notifSettings[topic.key] = !notifSettings[topic.key]"
              >
                <span class="stg-thumb" />
              </button>
            </div>
          </div>
        </div>
        <div class="settings-footer">
          <button type="button" class="settings-done-btn" @click="settingsOpen = false">เสร็จสิ้น</button>
        </div>
      </div>
      <div class="drawer-scroll">
        <div class="drawer-highlights">
          <div class="hl-viewport">
            <div class="hl-track" ref="hlTrackRef" :style="{ transform: `translateX(${-hlOffset}px)` }">
              <div v-for="hl in highlights" :key="hl.id" class="hl-card" :class="'hl-' + hl.color">
                <div class="hl-cover">
                  <span class="hl-cover-emoji">{{ hl.emoji }}</span>
                </div>
                <div class="hl-card-body">
                  <div class="hl-title">{{ hl.title }}</div>
                  <div class="hl-card-footer">
                    <button type="button" class="hl-see-more">ดูเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="hl-footer">
            <div class="hl-dots">
              <span
                v-for="(hl, i) in highlights"
                :key="hl.id"
                class="hl-dot"
                :class="{ active: hlIndex === i }"
                @click="goToHl(i)"
              />
            </div>
            <div class="hl-arrows">
              <button type="button" class="hl-arrow" :disabled="hlIndex === 0" @click="hlPrev">‹</button>
              <button type="button" class="hl-arrow" :disabled="hlIndex === highlights.length - 1" @click="hlNext">›</button>
            </div>
          </div>
        </div>
        <div class="drawer-tasks">
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-row"
          :class="{ unread: task.unread }"
          @click="markTaskRead(task)"
        >
          <div class="tr-icon" :class="'icon-' + (topicGroupMap[task.topic] ?? 'reminder')">
            <!-- reminder: bell -->
            <svg v-if="topicGroupMap[task.topic] === 'reminder'" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <!-- success: checkmark -->
            <svg v-else-if="topicGroupMap[task.topic] === 'success'" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <!-- action: stopwatch -->
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="13" r="8"/>
              <polyline points="12 9 12 13 14.5 15.5"/>
              <path d="M9 3h6"/>
              <path d="M12 3v2"/>
            </svg>
          </div>
          <div class="tr-body">
            <div class="tr-title">{{ task.title }}</div>
            <div class="tr-desc-row">
              <div class="tr-desc">{{ task.description }}</div>
              <div v-if="task.unread" class="tr-unread-dot" />
            </div>
            <div class="tr-footer">
              <div class="tr-time">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ task.time }}
              </div>
              <button type="button" class="tr-see-more">ดูเพิ่มเติม</button>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="drawer-footer">
        <button type="button" class="drawer-footer-btn">ดูแจ้งเตือนก่อนหน้า</button>
      </div>
    </aside>

    <!-- Demo modal -->
    <teleport to="body">
      <transition name="demo-fade">
        <div v-if="demoOpen" class="demo-overlay" @click="demoOpen = false">
          <div class="demo-panel" @click.stop>
            <div class="demo-panel-header">
              <span class="demo-panel-title">Demo Controller</span>
              <button type="button" class="demo-panel-close" @click="demoOpen = false">✕</button>
            </div>
            <div class="demo-panel-section-label">สถานะปุ่ม</div>
            <div class="demo-state-pills">
              <button
                v-for="s in demoStates" :key="s.id"
                type="button"
                class="demo-pill"
                :class="{ active: selectedStateId === s.id }"
                @click="applyState(s.id)"
              >{{ s.label }}</button>
            </div>
            <div class="demo-panel-divider" />
            <div class="demo-panel-section-label">Tooltip ที่ Cloudee แสดง</div>
            <div class="demo-tooltip-list">
              <button
                v-for="t in tooltipScenarios" :key="t.id"
                type="button"
                class="demo-tooltip-row"
                :class="{ active: selectedTooltipId === t.id }"
                @click="applyTooltip(t.id)"
              >
                <div class="demo-tooltip-row-top">
                  <span class="demo-tooltip-icon-sm">{{ t.icon }}</span>
                  <span class="demo-tooltip-label">{{ t.label }}</span>
                  <span v-if="t.priority" class="demo-priority-chip">P{{ t.priority }}</span>
                </div>
                <div v-if="t.message" class="demo-tooltip-preview">{{ t.message }}</div>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const drawerOpen = ref(false)
const juBtnRef = ref(null)
const juDrawerRef = ref(null)
const demoOpen = ref(false)

const demoStates = [
  { id: 'none',      label: 'ไม่มีแจ้งเตือน' },
  { id: 'normal',    label: 'ทั่วไป' },
  { id: 'important', label: '🔴 สำคัญ' },
]
const tooltipScenarios = [
  { id: 'none',     icon: '—',  priority: null, label: 'ซ่อน tooltip',              message: null },
  { id: 'transfer', icon: '⚠️', priority: 1,    label: 'เงินโอนรอตรวจสอบ',         message: 'พบยอดโอน ฿1,500.50 ไม่ตรงกับบิล ฿1,510 — Cloudee คิดว่าอาจเป็นค่าธรรมเนียมธนาคารค่ะ ช่วยตรวจสอบหน่อยนะคะ?' },
  { id: 'payment',  icon: '💳', priority: 2,    label: 'พบการชำระเงิน',             message: 'ข่าวดีค่ะ! บ้านเลขที่ 99/1 ชำระแล้ว Cloudee ออกใบเสร็จและส่งให้ลูกบ้านเรียบร้อยแล้วนะคะ' },
  { id: 'complete', icon: '✅', priority: 3,    label: 'คำนวณใบแจ้งหนี้เสร็จแล้ว', message: 'คำนวณรอบ 05/2569 เสร็จแล้วค่ะ! พบ 2 ยูนิตค่าไฟสูงผิดปกติ — พี่จะตรวจ 2 ห้องนี้ก่อน หรือส่งบิลทั้งหมดเลยดีคะ?' },
  { id: 'billing',  icon: '🧾', priority: 4,    label: 'เตือนคำนวณใบแจ้งหนี้',     message: 'ข้อมูลมิเตอร์ครบแล้วค่ะ! Cloudee พร้อมคำนวณใบแจ้งหนี้ให้เลย ใช้เวลาประมาณ 2 นาทีค่ะ กดเริ่มได้เลยนะคะ' },
  { id: 'meter',    icon: '📋', priority: 5,    label: 'เตือนจดมิเตอร์',           message: 'ถึงรอบจดมิเตอร์แล้วค่ะ! Cloudee เตรียมรายการทั้ง 200 ยูนิตไว้ให้แล้ว เริ่มจดตอนนี้เลยไหมคะ?' },
]

const selectedStateId = ref('important')
const selectedTooltipId = ref('meter')
const tooltipHidden = ref(false)

const activeTooltip = computed(() =>
  tooltipScenarios.find(t => t.id === selectedTooltipId.value) ?? null
)
const tooltipVisible = computed(() =>
  selectedTooltipId.value !== 'none' && !tooltipHidden.value && !!activeTooltip.value?.message
)

function applyState(id) {
  selectedStateId.value = id
  tasks.value.forEach(t => {
    if (id === 'none')      t.unread = false
    else if (id === 'normal')    t.unread = t.group === 'notify'
    else if (id === 'important') t.unread = t.group === 'important'
  })
}

function applyTooltip(id) {
  selectedTooltipId.value = id
  tooltipHidden.value = false
}

const blinkScale = ref(1)
let blinkTimer = null

const L = { cx: 76.5, cy: 86 }
const R = { cx: 125.5, cy: 86 }

const leftEyeTransform = computed(() =>
  `translate(${L.cx},${L.cy}) scale(1,${blinkScale.value}) translate(${-L.cx},${-L.cy})`
)
const rightEyeTransform = computed(() =>
  `translate(${R.cx},${R.cy}) scale(1,${blinkScale.value}) translate(${-R.cx},${-R.cy})`
)

function doBlink() {
  const min = 0.05
  const closeMs = 90
  const openMs = 120
  let t0 = null
  let phase = 'close'
  function step(ts) {
    if (t0 === null) t0 = ts
    const p = Math.min((ts - t0) / (phase === 'close' ? closeMs : openMs), 1)
    blinkScale.value = phase === 'close'
      ? 1 - (1 - min) * (p * p)
      : min + (1 - min) * (1 - (1 - p) ** 2)
    if (p < 1) { requestAnimationFrame(step); return }
    if (phase === 'close') { phase = 'open'; t0 = null; requestAnimationFrame(step) }
    else { blinkScale.value = 1; blinkTimer = setTimeout(doBlink, 2500 + Math.random() * 2000) }
  }
  requestAnimationFrame(step)
}


const hlIndex = ref(0)
const hlTrackRef = ref(null)
const hlStepPx = ref(0)
const hlMaxOffset = ref(0)

function measureStep() {
  if (!hlTrackRef.value) return
  const W = hlTrackRef.value.parentElement.clientWidth
  const cardW = W * 0.4
  const gap = 8
  hlStepPx.value = cardW + gap
  hlMaxOffset.value = Math.max(0, highlights.length * cardW + (highlights.length - 1) * gap - W)
}

const hlOffset = computed(() =>
  Math.min(hlIndex.value * hlStepPx.value, hlMaxOffset.value)
)

const highlights = [
  { id: 1, emoji: '📅', title: 'ใกล้ครบกำหนดจดมิเตอร์', content: 'เหลือ 3 วันก่อนปิดรอบจดมิเตอร์น้ำ/ไฟ เดือน พ.ค. 69 กรุณาดำเนินการให้เสร็จก่อนสิ้นเดือน', color: 'amber', action: 'ไปจดมิเตอร์' },
  { id: 2, emoji: '💳', title: 'ค่าส่วนกลางยังค้างอยู่', content: '5 ยูนิตยังไม่ชำระค่าส่วนกลาง เม.ย. 69 รวมยอดค้าง ฿ 3,350.00', color: 'red', action: 'ดูรายการค้างชำระ' },
  { id: 3, emoji: '🎉', title: 'ใบแจ้งหนี้ออกครบแล้ว', content: 'รอบ 04/2569 ออกครบ 97 ยูนิต — พร้อมส่งแจ้งลูกบ้านทาง LINE ได้เลย', color: 'blue', action: 'ส่งแจ้งลูกบ้าน' },
]

function goToHl(i) {
  hlIndex.value = Math.max(0, Math.min(i, highlights.length - 1))
}
function hlPrev() { goToHl(hlIndex.value - 1) }
function hlNext() { goToHl(hlIndex.value + 1) }

const tasks = ref([
  {
    id: '1',
    topic: 'meterReminder',
    group: 'important',
    unread: true,
    title: 'จดมิเตอร์น้ำ / ไฟ ประจำเดือนนี้',
    description: 'ครบกำหนดจด 30 เม.ย. — เหลือ 12 ยูนิตที่ยังไม่มีข้อมูล กรุณาดำเนินการก่อนสิ้นวัน',
    time: 'เมื่อ 09:00 น.',
    actionLabel: 'ไปจดมิเตอร์',
    btnClass: 'btn-red'
  },
  {
    id: '2',
    topic: 'billingReminder',
    group: 'important',
    unread: true,
    title: 'คำนวณใบแจ้งหนี้รอบ 05/2569',
    description: 'ข้อมูลมิเตอร์ครบ 85 ยูนิตแล้ว — ระบบพร้อมให้รันคำนวณใบแจ้งหนี้ได้ทันที',
    time: 'เมื่อ 10:30 น.',
    actionLabel: 'คำนวณเลย',
    btnClass: ''
  },
  {
    id: '3',
    topic: 'billingComplete',
    group: 'notify',
    unread: false,
    title: 'คำนวณใบแจ้งหนี้รอบ 04/2569 เสร็จแล้ว',
    description: 'ระบบออกใบแจ้งหนี้ครบ 97 ยูนิต — พร้อมส่งแจ้งลูกบ้านได้เลย',
    time: 'เมื่อสักครู่',
    actionLabel: 'ดูใบแจ้งหนี้',
    btnClass: 'btn-green'
  },
  {
    id: '4',
    topic: 'paymentFound',
    group: 'notify',
    unread: true,
    title: 'ลูกบ้านชำระออนไลน์ · ใบเสร็จเปิดแล้ว 3 รายการ',
    description: 'ห้อง A301, B204, C110 ชำระผ่าน QR Code — ใบเสร็จพร้อมส่งแล้ว',
    time: '14 นาทีที่แล้ว',
    actionLabel: 'ดูรายการชำระ',
    btnClass: 'btn-amber'
  }
])

const settingsOpen = ref(false)
const notifSettings = ref({
  meterReminder: true,
  billingReminder: true,
  billingComplete: true,
  paymentCheck: true,
  paymentFound: true,
})
const topicGroups = [
  {
    id: 'reminder',
    label: 'Reminder',
    topics: [
      { key: 'meterReminder',   label: 'เตือนจดมิเตอร์',         desc: 'แจ้งเตือนเมื่อถึงรอบจดมิเตอร์น้ำ/ไฟ' },
      { key: 'billingReminder', label: 'เตือนคำนวณใบแจ้งหนี้',   desc: 'แจ้งเตือนเมื่อข้อมูลมิเตอร์ครบแล้ว พร้อมรันคำนวณ' },
      { key: 'paymentCheck',    label: 'เตือนตรวจสอบเงินโอน',    desc: 'แจ้งเมื่อพบยอดโอนที่ไม่ตรงกับบิล รอ match' },
    ],
  },
  {
    id: 'success',
    label: 'Success',
    topics: [
      { key: 'billingComplete', label: 'คำนวณใบแจ้งหนี้เสร็จแล้ว', desc: 'แจ้งเมื่อระบบคำนวณเสร็จในพื้นหลัง รอตรวจสอบก่อนส่ง' },
    ],
  },
  {
    id: 'action',
    label: 'Action Required',
    topics: [
      { key: 'paymentFound', label: 'พบการชำระเงิน', desc: 'แจ้งเมื่อลูกบ้านชำระออนไลน์สำเร็จ รอลงทะเบียนใบเสร็จ' },
    ],
  },
]

const topicGroupMap = {
  meterReminder:   'reminder',
  billingReminder: 'reminder',
  paymentCheck:    'reminder',
  billingComplete: 'success',
  paymentFound:    'action',
}

const filteredTasks = computed(() =>
  tasks.value.filter(t => notifSettings.value[t.topic] !== false)
)

const unreadCount = computed(() => tasks.value.filter((t) => t.unread).length)
const hasImportant = computed(() => tasks.value.some((t) => t.unread && t.group === 'important'))

function markTaskRead(task) {
  if (task.unread) task.unread = false
}

function readAll() {
  tasks.value.forEach((t) => {
    t.unread = false
  })
}

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value
  if (drawerOpen.value) {
    requestAnimationFrame(measureStep)
  }
}

function onDocumentClick(e) {
  const t = e.target
  if (!drawerOpen.value) return
  if (juDrawerRef.value?.contains(t) || juBtnRef.value?.contains(t)) return
  drawerOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  blinkTimer = setTimeout(doBlink, 1500 + Math.random() * 1000)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  clearTimeout(blinkTimer)
})
</script>

<style scoped src="./pmsJuDrawerStyles.css"></style>

<style scoped>
/* ── Demo panel ── */
.demo-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border-radius: 8px;
  border: 1px solid var(--gray-200, #dde1e7);
  background: #fff;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-600, #5a6170);
  cursor: pointer;
  transition: background .12s, border-color .12s, color .12s;
  font-family: var(--font, sans-serif);
  white-space: nowrap;
}
.demo-btn svg { width: 13px; height: 13px; flex-shrink: 0; }
.demo-btn:hover, .demo-btn.open {
  background: var(--blue-50, #e8f1fb);
  border-color: var(--blue-400, #3a7fd4);
  color: var(--blue-700, #154d8c);
}
.demo-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-panel {
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.10);
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.demo-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}
.demo-panel-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--gray-800, #1e2430);
}
.demo-panel-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--gray-400, #9aa0ac);
  padding: 2px 4px;
  border-radius: 6px;
  line-height: 1;
  transition: background .1s, color .1s;
  font-family: var(--font, sans-serif);
}
.demo-panel-close:hover { background: var(--gray-100, #eef0f3); color: var(--gray-700, #374151); }
.demo-fade-enter-active, .demo-fade-leave-active { transition: opacity .18s ease; }
.demo-fade-enter-from, .demo-fade-leave-to { opacity: 0; }
.demo-panel-section-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--gray-400, #9aa0ac);
  letter-spacing: .08em;
  text-transform: uppercase;
}
.demo-panel-divider {
  height: 1px;
  background: var(--gray-100, #eef0f3);
  margin: 2px 0;
}
.demo-state-pills {
  display: flex;
  gap: 6px;
}
.demo-pill {
  flex: 1;
  padding: 5px 8px;
  border-radius: 7px;
  border: 1px solid var(--gray-200, #dde1e7);
  background: #fff;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--gray-600, #5a6170);
  cursor: pointer;
  text-align: center;
  transition: background .12s, border-color .12s, color .12s;
  font-family: var(--font, sans-serif);
}
.demo-pill:hover { background: var(--gray-50, #f7f8fa); }
.demo-pill.active { background: var(--blue-50, #e8f1fb); border-color: var(--blue-400, #3a7fd4); color: var(--blue-700, #154d8c); font-weight: 600; }
.demo-tooltip-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.demo-tooltip-row {
  width: 100%;
  text-align: left;
  background: none;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  transition: background .1s, border-color .1s;
  font-family: var(--font, sans-serif);
}
.demo-tooltip-row:hover { background: var(--gray-50, #f7f8fa); }
.demo-tooltip-row.active { background: var(--blue-50, #e8f1fb); border-color: var(--blue-100, #c5d9f5); }
.demo-tooltip-row-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 3px;
}
.demo-tooltip-icon-sm { font-size: 14px; line-height: 1; flex-shrink: 0; }
.demo-tooltip-label { font-size: 12px; font-weight: 600; color: var(--gray-800, #1e2430); flex: 1; }
.demo-priority-chip {
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 5px;
  background: var(--gray-100, #eef0f3);
  color: var(--gray-400, #9aa0ac);
  flex-shrink: 0;
}
.demo-tooltip-row.active .demo-priority-chip { background: var(--blue-100, #c5d9f5); color: var(--blue-700, #154d8c); }
.demo-tooltip-preview {
  font-size: 11px;
  color: var(--gray-400, #9aa0ac);
  line-height: 1.5;
  padding-left: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.pms-ju-exit {
  position: fixed;
  top: 10px;
  left: 12px;
  z-index: 500;
  font-size: 12px;
  font-weight: 500;
  color: var(--blue-700, #154d8c);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--gray-200, #dde1e7);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.pms-ju-exit:hover {
  background: #fff;
  color: var(--blue-800, #0e3a6e);
}
</style>
