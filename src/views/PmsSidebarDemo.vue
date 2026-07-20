<template>
  <div class="sidebar-demo-page">
    <div class="top-right-controls">
      <router-link class="exit-link" to="/">← หน้าหลัก</router-link>

      <button type="button" class="demo-toggle" @click.stop="demoOpen = !demoOpen">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="1.2"/><rect x="11" y="3" width="6" height="6" rx="1.2"/><rect x="3" y="11" width="6" height="6" rx="1.2"/><rect x="11" y="11" width="6" height="6" rx="1.2"/></svg>
        Demo: {{ mode === 'collapse' ? 'Type 1 — Always Collapse' : 'Type 2 — Always Expand' }}
        <svg class="chev-down" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
      </button>
    </div>

    <transition name="demo-fade">
      <div v-if="demoOpen" class="demo-overlay" @click="demoOpen = false">
        <div class="demo-panel" @click.stop>
          <div class="demo-panel-header">
            <span class="demo-panel-title">Demo Controller — Sidebar Type</span>
            <button type="button" class="demo-panel-close" @click="demoOpen = false">✕</button>
          </div>
          <button
            type="button"
            class="demo-option"
            :class="{ active: mode === 'collapse' }"
            @click="mode = 'collapse'"
          >
            <span class="demo-option-title">Type 1 — Always Collapse</span>
            <span class="demo-option-desc">Rail stays at {{ 72 }}px and expands over the content on hover, exactly like the reference HTML.</span>
          </button>
          <button
            type="button"
            class="demo-option"
            :class="{ active: mode === 'expand' }"
            @click="mode = 'expand'"
          >
            <span class="demo-option-title">Type 2 — Always Expand</span>
            <span class="demo-option-desc">Rail stays permanently expanded and pushes the page content instead of overlaying it.</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- ============ SIDEBAR ============ -->
    <aside
      id="sidebar"
      ref="sidebarRef"
      :class="{ 'rail-expanded': isRailExpanded, 'mode-expand': mode === 'expand' }"
      @mouseleave="onRailLeave"
      @mouseenter="onRailEnter"
    >
      <div class="rail-inner">
        <div class="brand">
          <div class="brand-mark">LOS</div>
          <div class="brand-text"><span class="los">The Living OS</span><span class="pms">PMS</span></div>
        </div>

        <!-- ---- SEARCH ---- -->
        <div class="search-slot" ref="searchSlotRef" @click.stop="focusSearch">
          <svg class="ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5"/><path d="M15 15l-3-3"/></svg>
          <input
            v-show="isRailExpanded"
            ref="searchInputRef"
            class="search-input-field"
            v-model="searchQuery"
            placeholder="ค้นหาเมนู..."
            @focus="onSearchFocus"
            @blur="onSearchBlur"
            @keydown.escape="closeSearch"
            @click.stop
          />
        </div>

        <!-- ---- FAVORITES ---- -->
        <div
          class="menu-item fav-menu-item"
          :class="{ 'mega-open': favPanelVisible }"
          @mouseenter="openFavPanel($event.currentTarget)"
          @mouseleave="scheduleFavClose"
        >
          <svg class="ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" :style="favorites.length ? 'fill:#EE9F00;stroke:#EE9F00' : ''"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z"/></svg>
          <span class="lbl">รายการโปรด</span>
          <span v-if="favorites.length" class="fav-badge">{{ favorites.length }}</span>
        </div>

        <template v-for="(section, si) in SIDEBAR_SECTIONS" :key="si">
          <div class="divider"></div>

          <div
            v-for="item in section"
            :key="item.id"
            class="menu-item"
            :class="{ active: activeId === item.id, 'mega-open': openRowId === item.id }"
            @mouseenter="item.lv3 && item.lv3.length ? openMega($event.currentTarget, item.lv1, item) : closeMegaSoon()"
            @mouseleave="item.lv3 && item.lv3.length ? scheduleClose() : null"
            @click="selectLeaf(item)"
          >
            <svg class="ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[item.icon] || ICONS.doc"></svg>
            <span class="lbl">{{ item.label }}</span>
            <span class="right-actions">
              <button class="star-btn" :class="{ starred: isFavorited(item.id) }" @click.stop="toggleFavorite({ id: item.id, label: item.label, path: item.lv1, icon: item.icon })" title="เพิ่มในรายการโปรด">
                <svg viewBox="0 0 20 20" :fill="isFavorited(item.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z"/></svg>
              </button>
              <svg v-if="item.lv3 && item.lv3.length" class="chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4l6 6-6 6"/></svg>
            </span>
          </div>
        </template>

        <div class="rail-bottom-space"></div>
      </div>

      <!-- ---- MEGA MENU ---- -->
      <div
        ref="megaRef"
        class="mega-menu"
        :class="{ visible: megaVisible }"
        :style="{ top: megaTop + 'px' }"
        @mouseenter="megaHovering = true; clearTimeout(closeTimer)"
        @mouseleave="megaHovering = false; scheduleClose()"
      >
        <div class="mega-head"><span class="dot"></span><span>{{ megaLv1 }}</span>&nbsp;/&nbsp;<b>{{ megaLv2 }}</b></div>
        <div class="mega-body">
          <div v-for="(lv3, i) in megaLv3" :key="i" class="mega-col" :class="{ leaf: !(lv3.lv4 && lv3.lv4.length) }">
            <div class="lv3-title" @click="selectLeaf({ id: 'lv3-' + megaLv2 + '-' + lv3.label, label: lv3.label })">
              <span class="dot"></span>{{ lv3.label }}
              <button class="mega-star-btn" :class="{ starred: isFavorited('lv3-' + megaLv2 + '-' + lv3.label) }" @click.stop="toggleFavorite({ id: 'lv3-' + megaLv2 + '-' + lv3.label, label: lv3.label, path: megaLv1 + ' › ' + megaLv2, icon: megaParentIcon })">
                <svg viewBox="0 0 20 20" :fill="isFavorited('lv3-' + megaLv2 + '-' + lv3.label) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z"/></svg>
              </button>
            </div>
            <div
              v-for="(l4, j) in (lv3.lv4 || [])"
              :key="j"
              class="lv4-item"
              @click="selectLeaf({ id: 'lv4-' + lv3.label + '-' + l4, label: l4 })"
            >
              <span class="dot"></span>{{ l4 }}
              <button class="mega-star-btn lv4-star" :class="{ starred: isFavorited('lv4-' + lv3.label + '-' + l4) }" @click.stop="toggleFavorite({ id: 'lv4-' + lv3.label + '-' + l4, label: l4, path: megaLv2 + ' › ' + lv3.label, icon: megaParentIcon })">
                <svg viewBox="0 0 20 20" :fill="isFavorited('lv4-' + lv3.label + '-' + l4) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ---- FAVORITES PANEL ---- -->
      <div
        ref="favPanelRef"
        class="fav-panel"
        :class="{ visible: favPanelVisible }"
        :style="{ top: favPanelTop + 'px' }"
        @mouseenter="favHovering = true; clearTimeout(favCloseTimer)"
        @mouseleave="favHovering = false; scheduleFavClose()"
      >
        <div class="fav-panel-head">
          <svg viewBox="0 0 20 20" fill="#EE9F00" style="width:13px;height:13px;flex-shrink:0"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z"/></svg>
          รายการโปรด
        </div>
        <div v-if="favItems.length === 0" class="fav-panel-empty">
          ยังไม่มีรายการโปรด<br/>กดดาว ★ ที่เมนูเพื่อเพิ่ม
        </div>
        <div v-else class="fav-panel-list">
          <div
            v-for="fav in favItems"
            :key="fav.id"
            class="fav-panel-item"
            @click="selectLeaf(fav); favPanelVisible = false"
          >
            <span class="fav-panel-label">{{ fav.label }}</span>
          </div>
        </div>
      </div>

      <!-- ---- USER SECTION ---- -->
      <div class="rail-user">
        <div class="rail-user-avatar">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="14" r="6" fill="#1C70F7" opacity="0.15"/>
            <circle cx="18" cy="14" r="6" stroke="#1C70F7" stroke-width="1.8"/>
            <path d="M8 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#1C70F7" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span class="rail-user-online-dot"></span>
        </div>
        <div class="rail-user-info">
          <span class="rail-user-name">boy test</span>
          <span class="rail-user-status">ออนไลน์</span>
        </div>
        <button class="rail-user-more" title="เพิ่มเติม">
          <svg viewBox="0 0 20 20" fill="currentColor"><circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/></svg>
        </button>
      </div>

      <!-- ---- SEARCH RESULTS OVERLAY ---- -->
      <div
        v-if="searchOpen && searchResults.length > 0"
        class="search-results-overlay"
        :style="{ top: searchOverlayTop + 'px' }"
      >
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="search-result-item"
          @mousedown.prevent="selectSearchResult(result)"
        >
          <svg class="search-result-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[result.icon] || ICONS.doc"></svg>
          <div class="search-result-info">
            <span class="search-result-label">{{ result.label }}</span>
            <span class="search-result-path">{{ result.path }}</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- ============ PAGE ============ -->
    <div class="page" :style="{ marginLeft: mode === 'expand' ? '268px' : '72px' }">
      <div class="app-topbar">
        <div class="breadcrumb">
          <span v-for="(crumb, i) in breadcrumb" :key="i" class="crumb-item">
            <span :class="{ 'crumb-current': i === breadcrumb.length - 1 }">{{ crumb }}</span>
            <span v-if="i < breadcrumb.length - 1" class="crumb-sep">›</span>
          </span>
        </div>
        <div class="topbar-right">
          <div class="project-chip">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3l-4 3v11h4V9h6v8h4V6l-4-3"/></svg>
            <span>โครงการนิติบุคคล หมู่บ้านสิริ คอนโดมิเนียม เขตบางนา</span>
            <svg class="swap-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10l-3-3M16 13H6l3 3"/></svg>
          </div>
          <button type="button" class="app-grid-btn" title="สลับแอปพลิเคชัน">
            <svg viewBox="0 0 20 20" fill="currentColor"><circle cx="5" cy="5" r="1.6"/><circle cx="10" cy="5" r="1.6"/><circle cx="15" cy="5" r="1.6"/><circle cx="5" cy="10" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="15" cy="10" r="1.6"/><circle cx="5" cy="15" r="1.6"/><circle cx="10" cy="15" r="1.6"/><circle cx="15" cy="15" r="1.6"/></svg>
          </button>
        </div>
      </div>

      <div class="page-content">
        <div class="page-header-row">
          <div class="page-header-left">
            <button type="button" class="back-btn" title="ย้อนกลับ">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>
            </button>
            <h1 class="page-title">สร้างใบแจ้งหนี้</h1>
            <a href="#" class="howto-pill" @click.prevent>
              ดูวิธีใช้งาน
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14L14 6M8 6h6v6"/></svg>
            </a>
          </div>
          <div class="page-header-actions">
            <button type="button" class="btn btn-outline-danger">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="12" height="12" rx="2"/><path d="M10 4v12"/></svg>
              ยกเลิก
            </button>
            <button type="button" class="btn btn-outline-primary">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h9l3 3v9H4z"/><path d="M4 4v4h9V4"/></svg>
              สร้างใหม่
            </button>
            <button type="button" class="btn btn-outline-primary">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="7" width="10" height="6"/><path d="M6 7V4h8v3M6 13v3h8v-3"/></svg>
              พิมพ์
            </button>
            <button type="button" class="btn btn-primary">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h10l2 2v10H4z"/><path d="M7 4v4h6V4M6 16v-5h8v5"/></svg>
              บันทึก
            </button>
          </div>
        </div>

        <div class="invoice-card">
          <h2 class="card-title">รายละเอียดใบแจ้งหนี้</h2>

          <div class="form-grid form-grid-4">
            <div class="field">
              <label>เลขที่เอกสาร</label>
              <input type="text" v-model="form.docNo" placeholder="ระบบสร้างอัตโนมัติ" />
            </div>
            <div class="field">
              <label>ค้นหายูนิต</label>
              <div class="input-with-icon">
                <input type="text" v-model="form.unit" placeholder="ค้นหายูนิต" />
                <svg class="field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
              </div>
            </div>
            <div class="field">
              <label>วันที่ออกเอกสาร</label>
              <div class="input-with-icon">
                <input type="text" v-model="form.docDate" />
                <svg class="field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v3M13 2v3"/></svg>
              </div>
            </div>
            <div class="field">
              <label>วันที่ครบกำหนด</label>
              <div class="input-with-icon">
                <input type="text" v-model="form.dueDate" />
                <svg class="field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v3M13 2v3"/></svg>
              </div>
            </div>
          </div>

          <div class="form-grid form-grid-4">
            <div class="field">
              <label>บ้านเลขที่</label>
              <input type="text" v-model="form.houseNo" />
            </div>
            <div class="field">
              <label>ชื่อลูกค้า</label>
              <input type="text" v-model="form.customerName" />
            </div>
            <div class="field">
              <label>เบอร์ติดต่อ</label>
              <input type="text" v-model="form.phone" />
            </div>
            <div class="field field-link">
              <a href="#" class="notes-link" @click.prevent="showNotes = !showNotes">
                แสดงข้อมูลหมายเหตุ
                <svg class="chev-down" :class="{ open: showNotes }" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
              </a>
            </div>
          </div>

          <div v-if="showNotes" class="form-grid form-grid-1">
            <div class="field">
              <label>หมายเหตุ</label>
              <textarea v-model="form.notes" rows="2" placeholder="ระบุหมายเหตุ (ถ้ามี)"></textarea>
            </div>
          </div>

          <div class="charges-header">
            <h2 class="card-title" style="margin:0">รายการใช้จ่าย</h2>
            <button type="button" class="btn btn-outline-primary btn-sm" @click="addRow">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>
              เพิ่มรายการ
            </button>
          </div>

          <div class="charges-table-wrap">
            <table class="charges-table">
              <thead>
                <tr>
                  <th class="col-num">ลำดับ</th>
                  <th>รหัสรายรับ</th>
                  <th>ชื่อรายรับ</th>
                  <th>รายละเอียด</th>
                  <th>งวด</th>
                  <th class="col-num">ราคา</th>
                  <th class="col-num">หน่วย</th>
                  <th class="col-num">ยอดรวม</th>
                  <th class="col-num">ยอดชำระ</th>
                  <th class="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in rows" :key="row.id" :class="{ 'row-active': idx === 0 }">
                  <td class="col-num">{{ idx + 1 }}</td>
                  <td>{{ row.code }}</td>
                  <td>{{ row.name }}</td>
                  <td>{{ row.detail || '—' }}</td>
                  <td>{{ row.period }}</td>
                  <td class="col-num">{{ formatAmount(row.price) }}</td>
                  <td class="col-num">{{ formatAmount(row.qty) }}</td>
                  <td class="col-num">{{ formatAmount(row.total) }}</td>
                  <td class="col-num">{{ formatAmount(row.paid) }}</td>
                  <td class="col-actions">
                    <button type="button" class="row-ic-btn" title="แก้ไข">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3l4 4-9 9H4v-4z"/></svg>
                    </button>
                    <button type="button" class="row-ic-btn" title="คัดลอก" @click="duplicateRow(idx)">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="9" height="9" rx="1.5"/><path d="M4 13V5a1 1 0 011-1h8"/></svg>
                    </button>
                    <button type="button" class="row-ic-btn row-ic-danger" title="ลบ" @click="removeRow(idx)">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10"/></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="charges-footer">
            <span>ยอดรวมทั้งหมด</span>
            <div class="total-box">{{ formatAmount(totalAmount) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const ICONS = {
  doc: '<path d="M5 2h7l3 3v13a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M12 2v3h3"/><line x1="7" y1="10" x2="13" y2="10"/><line x1="7" y1="13" x2="13" y2="13"/><line x1="7" y1="16" x2="11" y2="16"/>',
  home: '<path d="M3 10.5L10 4l7 6.5"/><path d="M5 9v8a1 1 0 001 1h3v-5h2v5h3a1 1 0 001-1V9"/>',
  users: '<circle cx="7.2" cy="7" r="2.4"/><path d="M2.3 16.2c.5-3.2 2.3-4.7 4.9-4.7s4.4 1.5 4.9 4.7"/><circle cx="14.3" cy="7.6" r="1.9"/><path d="M12.8 11.9c1.9.2 3.4 1.7 3.9 4"/>',
  wallet: '<rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 8.3h16"/><circle cx="14.3" cy="12" r="1.1"/>',
  card: '<rect x="2" y="5" width="16" height="11" rx="2"/><line x1="2" y1="9" x2="18" y2="9"/><line x1="5" y1="13" x2="9" y2="13"/>',
  book: '<path d="M4.5 3h8.5a2 2 0 012 2v12h-8.5a2 2 0 00-2 2V3z"/><line x1="7" y1="7" x2="12" y2="7"/><line x1="7" y1="10" x2="12" y2="10"/>',
  building: '<rect x="4" y="3" width="12" height="14" rx="1"/><rect x="6.3" y="5.8" width="2" height="2"/><rect x="11.7" y="5.8" width="2" height="2"/><rect x="6.3" y="9.6" width="2" height="2"/><rect x="11.7" y="9.6" width="2" height="2"/><rect x="8.3" y="13.4" width="3.4" height="3.6"/>',
  chart: '<line x1="3" y1="17" x2="17" y2="17"/><rect x="4.5" y="11" width="2.6" height="6"/><rect x="8.7" y="7" width="2.6" height="10"/><rect x="12.9" y="4" width="2.6" height="13"/>',
  gear: '<line x1="4" y1="6" x2="16" y2="6"/><circle cx="8" cy="6" r="1.6"/><line x1="4" y1="10" x2="16" y2="10"/><circle cx="13" cy="10" r="1.6"/><line x1="4" y1="14" x2="16" y2="14"/><circle cx="9" cy="14" r="1.6"/>',
  layers: '<path d="M10 3l7 4-7 4-7-4 7-4z"/><path d="M3 11l7 4 7-4"/><path d="M3 14.5l7 4 7-4"/>',
  headset: '<path d="M4 12v-2a6 6 0 0112 0v2"/><rect x="3" y="12" width="3" height="4.5" rx="1"/><rect x="14" y="12" width="3" height="4.5" rx="1"/>',
  bookopen: '<path d="M10 5c-1.5-1-4-1.5-6-1v11c2-.5 4.5 0 6 1"/><path d="M10 5c1.5-1 4-1.5 6-1v11c-2-.5-4.5 0-6 1"/><line x1="10" y1="5" x2="10" y2="16"/>',
  inbox: '<path d="M3 10l2-6h10l2 6"/><path d="M3 10v6a1 1 0 001 1h12a1 1 0 001-1v-6"/><path d="M3 10h4l1 2h4l1-2h4"/>',
  'text-ar': '<text x="10" y="10" text-anchor="middle" dominant-baseline="central" font-size="13.5" font-weight="800" fill="currentColor" stroke="none">AR</text>',
  'text-ap': '<text x="10" y="10" text-anchor="middle" dominant-baseline="central" font-size="13.5" font-weight="800" fill="currentColor" stroke="none">AP</text>',
  'text-gl': '<text x="10" y="10" text-anchor="middle" dominant-baseline="central" font-size="13.5" font-weight="800" fill="currentColor" stroke="none">GL</text>'
}

const DATA = [
  { lv1: 'หน้าหลัก', items: [
    { id: 'overview', label: 'ภาพรวมโครงการ', icon: 'home', lv3: [] }
  ] },
  { lv1: 'จัดการผู้พักอาศัย', items: [
    { id: 'residents', label: 'ผู้พักอาศัย', icon: 'users', lv3: [
      { label: 'ห้อง/บ้าน' },
      { label: 'สมาชิก/ลูกค้า' },
      { label: 'ช่องทางการส่งเอกสาร' },
      { label: 'ปลอดหนี้', lv4: ['ขอหนังสือรับรองหนี้', 'อนุมัติปลอดหนี้', 'พิมพ์ใบปลอดหนี้', 'ติดตามสถานะปลอดหนี้', 'รายงานปลอดหนี้'] }
    ] }
  ] },
  { lv1: 'บัญชีการเงิน', items: [
    { id: 'ar', label: 'ลูกหนี้ AR', icon: 'text-ar', lv3: [
      { label: 'ทะเบียนมิเตอร์', lv4: ['บันทึกมิเตอร์ประปา', 'บันทึกมิเตอร์ไฟ', 'บันทึกมิเตอร์ความเย็น'] },
      { label: 'แจ้งหนี้', lv4: ['ใบแจ้งหนี้', 'คำนวณใบแจ้งหนี้', 'หนังสือยืนยันยอดค้าง'] },
      { label: 'ทวงถาม', lv4: ['หนังสือทวงถาม', 'คำนวณหนังสือทวงถาม', 'หนังสือทวงถามกำหนดเอง'] },
      { label: 'รับชำระ', lv4: ['ใบเสร็จ', 'ตรวจสอบเงินโอน', 'ใบรับฝากเงิน', 'ใบลดหนี้', 'ใบนำฝาก (Bank AR)', 'ตัดรับล่วงหน้าและเงินฝาก'] },
      { label: 'คืนเงิน', lv4: ['คืนเงินรับล่วงหน้า', 'คืนเงินค้ำประกัน'] },
      { label: 'คีย์การ์ด', lv4: ['ทะเบียนคีย์การ์ด', 'รายงานคีย์การ์ด'] },
      { label: 'รายงานลูกหนี้' }
    ] },
    { id: 'ap', label: 'เจ้าหนี้ AP', icon: 'text-ap', lv3: [
      { label: 'ใบขอซื้อ PR' },
      { label: 'ใบสั่งซื้อ PO' },
      { label: 'ใบรับสินค้า/ใบรับวางบิล' },
      { label: 'ใบเสร็จด้านจ่าย' },
      { label: 'ใบตั้งเบิก', lv4: ['จัดการใบตั้งเบิก', 'รายงานใบตั้งเบิก', 'ตั้งค่าใบตั้งเบิก'] },
      { label: 'จ่ายชำระ' },
      { label: 'ภาษีหัก ณ ที่จ่าย' },
      { label: 'รายงานเจ้าหนี้' },
      { label: 'รายงาน ภ.ง.ด.' }
    ] },
    { id: 'gl', label: 'บัญชี GL', icon: 'text-gl', lv3: [
      { label: 'เงินสดย่อย' },
      { label: 'รายงานเงินสดย่อย' },
      { label: 'ใบแจ้งหนี้มาลงบัญชี (ลูกหนี้)' },
      { label: 'ใบเสร็จมาลงบัญชี (ลูกหนี้)' },
      { label: 'บันทึกบัญชี-ทั่วไป' },
      { label: 'ปิดรอบบัญชี' },
      { label: 'รายงานบัญชี' },
      { label: 'ทรัพย์สิน', lv4: ['ทะเบียนทรัพย์สิน', 'รายงานทรัพย์สิน'] },
      { label: 'งบประมาณ', lv4: ['ภาพรวมงบประมาณ', 'จัดการงบประมาณ', 'งบประมาณยกมา', 'รายงานงบประมาณ'] }
    ] }
  ] },
  { lv1: 'ตั้งค่าโครงการ', items: [
    { id: 'setting-finance', label: 'บัญชีการเงิน', icon: 'gear', lv3: [
      { label: 'ทะเบียนมิเตอร์' },
      { label: 'รูปแบบการคำนวณมิเตอร์' },
      { label: 'รายรับ' },
      { label: 'ชุดเรียกเก็บ' },
      { label: 'กำหนดอัตราค่าปรับ' },
      { label: 'ผู้จัดจำหน่าย' },
      { label: 'รายจ่าย' },
      { label: 'สต๊อกคีย์การ์ด' },
      { label: 'ตั้งค่าบัญชี', lv4: ['ผังบัญชี', 'บัญชีธนาคาร', 'ตั้งค่าสมุดบัญชี', 'รูปแบบบัญชีใช้บ่อย', 'นโยบายการบันทึกบัญชี'] },
      { label: 'ตั้งค่าเอกสาร', lv4: ['เอกสารที่สามารถตั้งค่า', 'ผู้ลงนามในเอกสาร'] }
    ] },
    { id: 'setting-project', label: 'โครงการ', icon: 'layers', lv3: [
      { label: 'ข้อมูลโครงการ' },
      { label: 'เอกสารโครงการ' },
      { label: 'ประชาสัมพันธ์ - โฆษณา' }
    ] }
  ] },
  { lv1: 'ช่วยเหลือ', items: [
    { id: 'help-contact', label: 'ติดต่อเจ้าหน้าที่', icon: 'headset', lv3: [] }
  ] },
  { lv1: 'อื่นๆ', items: [
    { id: 'manual', label: 'คู่มือการใช้งาน', icon: 'bookopen', lv3: [] },
    { id: 'requests', label: 'รายการคำขอ', icon: 'inbox', lv3: [] }
  ] }
]

const flatItems = DATA.flatMap(group => group.items.map(item => ({ ...item, lv1: group.lv1 })))

const SIDEBAR_SECTIONS = [
  flatItems.filter(i => ['overview', 'residents', 'ar', 'ap', 'gl'].includes(i.id)),
  flatItems.filter(i => ['setting-finance', 'setting-project'].includes(i.id)),
  flatItems.filter(i => ['help-contact', 'manual', 'requests'].includes(i.id)),
]

const breadcrumb = ['บัญชีการเงิน', 'ลูกหนี้ AR', 'แจ้งหนี้', 'ใบแจ้งหนี้', 'สร้างใบแจ้งหนี้']

// ---- sidebar type demo switch ----
const mode = ref('collapse') // 'collapse' | 'expand'
const demoOpen = ref(false)
const hovering = ref(false)
const isRailExpanded = computed(() => mode.value === 'expand' || hovering.value || megaVisible.value || megaHovering.value || favPanelVisible.value || favHovering.value)

function onRailEnter() {
  if (mode.value === 'collapse') hovering.value = true
}
function onRailLeave() {
  if (mode.value === 'collapse') hovering.value = false
  scheduleClose()
  scheduleFavClose()
}

// ---- mega menu ----
const sidebarRef = ref(null)
const megaRef = ref(null)
const megaVisible = ref(false)
const megaHovering = ref(false)
const megaLv1 = ref('')
const megaLv2 = ref('')
const megaLv3 = ref([])
const megaTop = ref(0)
const openRowId = ref(null)
const activeId = ref('overview')
let closeTimer = null

function openMega(rowEl, lv1Name, item) {
  scheduleFavClose()
  clearTimeout(closeTimer)
  openRowId.value = item.id
  megaLv1.value = lv1Name
  megaLv2.value = item.label
  megaLv3.value = item.lv3
  megaVisible.value = true
  nextTick(() => {
    if (!sidebarRef.value || !rowEl) return
    const sbRect = sidebarRef.value.getBoundingClientRect()
    const rowRect = rowEl.getBoundingClientRect()
    let top = rowRect.top - sbRect.top
    requestAnimationFrame(() => {
      const megaH = megaRef.value ? megaRef.value.offsetHeight : 0
      const maxTop = window.innerHeight - sbRect.top - megaH - 12
      if (top > maxTop) top = Math.max(8, maxTop)
      megaTop.value = top
    })
  })
}
function scheduleClose() {
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    if (!megaHovering.value) {
      megaVisible.value = false
      openRowId.value = null
    }
  }, 160)
}
function closeMegaSoon() {
  scheduleClose()
  scheduleFavClose()
}
function selectLeaf(item) {
  activeId.value = item.id
  scheduleClose()
}

// ---- favorites ----
// Each entry: { id, label, path, icon }
const favorites = ref([])
const favPanelRef = ref(null)
const favPanelVisible = ref(false)
const favPanelTop = ref(0)
const favHovering = ref(false)
let favCloseTimer = null

const favItems = computed(() => favorites.value)

function isFavorited(id) {
  return favorites.value.some(f => f.id === id)
}

function toggleFavorite(item) {
  if (isFavorited(item.id)) {
    favorites.value = favorites.value.filter(f => f.id !== item.id)
  } else {
    favorites.value = [...favorites.value, item]
  }
}

const megaParentIcon = computed(() => {
  for (const group of DATA) {
    for (const item of group.items) {
      if (item.label === megaLv2.value) return item.icon
    }
  }
  return 'doc'
})

function openFavPanel(rowEl) {
  clearTimeout(favCloseTimer)
  scheduleClose()
  favPanelVisible.value = true
  nextTick(() => {
    if (!sidebarRef.value || !rowEl) return
    const sbRect = sidebarRef.value.getBoundingClientRect()
    const rowRect = rowEl.getBoundingClientRect()
    favPanelTop.value = rowRect.top - sbRect.top
  })
}

function scheduleFavClose() {
  clearTimeout(favCloseTimer)
  favCloseTimer = setTimeout(() => {
    if (!favHovering.value) {
      favPanelVisible.value = false
    }
  }, 160)
}

// ---- search ----
const searchQuery = ref('')
const searchOpen = ref(false)
const searchInputRef = ref(null)
const searchSlotRef = ref(null)
const searchOverlayTop = ref(0)

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  const results = []
  for (const group of DATA) {
    for (const item of group.items) {
      if (item.label.toLowerCase().includes(q)) {
        results.push({ id: item.id, label: item.label, path: group.lv1, icon: item.icon })
      }
      for (const lv3 of (item.lv3 || [])) {
        if (lv3.label.toLowerCase().includes(q)) {
          results.push({ id: `lv3-${item.id}-${lv3.label}`, label: lv3.label, path: `${group.lv1} › ${item.label}`, icon: item.icon })
        }
        for (const lv4 of (lv3.lv4 || [])) {
          if (lv4.toLowerCase().includes(q)) {
            results.push({ id: `lv4-${lv4}`, label: lv4, path: `${item.label} › ${lv3.label}`, icon: item.icon })
          }
        }
      }
    }
  }
  return results.slice(0, 12)
})

async function focusSearch() {
  hovering.value = true
  await nextTick()
  searchOpen.value = true
  searchInputRef.value?.focus()
  await nextTick()
  if (searchSlotRef.value && sidebarRef.value) {
    const sbRect = sidebarRef.value.getBoundingClientRect()
    const slotRect = searchSlotRef.value.getBoundingClientRect()
    searchOverlayTop.value = slotRect.bottom - sbRect.top + 4
  }
}

async function onSearchFocus() {
  searchOpen.value = true
  await nextTick()
  if (searchSlotRef.value && sidebarRef.value) {
    const sbRect = sidebarRef.value.getBoundingClientRect()
    const slotRect = searchSlotRef.value.getBoundingClientRect()
    searchOverlayTop.value = slotRect.bottom - sbRect.top + 4
  }
}

function onSearchBlur() {
  setTimeout(() => { searchOpen.value = false }, 150)
}

function closeSearch() {
  searchQuery.value = ''
  searchOpen.value = false
}

function selectSearchResult(result) {
  activeId.value = result.id
  closeSearch()
}

// ---- invoice form (mock) ----
const showNotes = ref(false)
const form = ref({
  docNo: '',
  unit: '',
  docDate: '20/07/2026',
  dueDate: '31/07/2026',
  houseNo: '',
  customerName: '',
  phone: '',
  notes: ''
})

let rowSeq = 7
const rows = ref([
  { id: 1, code: 'CM01', name: 'ค่าใช้พื้นที่ส่วนกลาง', detail: '', period: '07/2569', price: 2200, qty: 1, total: 2200, paid: 0 },
  { id: 2, code: 'CM01', name: 'ค่าใช้พื้นที่ส่วนกลาง', detail: '', period: '08/2569', price: 2200, qty: 1, total: 2200, paid: 0 },
  { id: 3, code: 'CM01', name: 'ค่าใช้พื้นที่ส่วนกลาง', detail: '', period: '09/2569', price: 2200, qty: 1, total: 2200, paid: 0 },
  { id: 4, code: 'CM01', name: 'ค่าใช้พื้นที่ส่วนกลาง', detail: '', period: '10/2569', price: 2200, qty: 1, total: 2200, paid: 0 },
  { id: 5, code: 'CM01', name: 'ค่าใช้พื้นที่ส่วนกลาง', detail: '', period: '11/2569', price: 2200, qty: 1, total: 2200, paid: 0 },
  { id: 6, code: 'CM01', name: 'ค่าใช้พื้นที่ส่วนกลาง', detail: '', period: '12/2569', price: 2200, qty: 1, total: 2200, paid: 0 }
])

const totalAmount = computed(() => rows.value.reduce((sum, r) => sum + r.total, 0))

function formatAmount(n) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function addRow() {
  const last = rows.value[rows.value.length - 1]
  rows.value.push({
    id: rowSeq++,
    code: 'CM01',
    name: 'ค่าใช้พื้นที่ส่วนกลาง',
    detail: '',
    period: last ? nextPeriod(last.period) : '01/2570',
    price: 2200,
    qty: 1,
    total: 2200,
    paid: 0
  })
}
function nextPeriod(period) {
  const [m, y] = period.split('/').map(Number)
  const next = m === 12 ? 1 : m + 1
  const nextYear = m === 12 ? y + 1 : y
  return String(next).padStart(2, '0') + '/' + nextYear
}
function duplicateRow(idx) {
  const src = rows.value[idx]
  rows.value.splice(idx + 1, 0, { ...src, id: rowSeq++ })
}
function removeRow(idx) {
  rows.value.splice(idx, 1)
}
</script>

<style scoped>
.sidebar-demo-page {
  --rail-collapsed: 72px;
  --rail-expanded: 268px;
  --rail-bg: #FFFFFF;
  --rail-bg-soft: #F2F6FC;
  --rail-border: #E4E7ED;
  --rail-text-main: #181819;
  --rail-text-muted: #787A7D;
  --rail-text-dim: #6E7073;
  --rail-accent: #1C70F7;
  --rail-accent-soft: #E9F1FF;
  --rail-lv1: #1C70F7;
  --rail-lv3: #05A861;
  --rail-lv4: #9747FF;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #F2F6FC;
  font-family: var(--font-family, 'Sarabun', sans-serif);
}
* { box-sizing: border-box; }

.top-right-controls {
  position: fixed;
  top: 10px;
  right: 12px;
  z-index: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.exit-link {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary-click, #004ECC);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: var(--radius-lg, 8px);
  border: 1px solid var(--color-dividers, #dde1e7);
  white-space: nowrap;
}
.exit-link:hover { background: #fff; }

.demo-toggle {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  color: var(--color-text-primary, #181819);
  background: #fff;
  border: 1px solid var(--color-stroke, #CED0D6);
  padding: 7px 12px;
  border-radius: var(--radius-lg, 8px);
  cursor: pointer;
  box-shadow: var(--shadow-header, 2px 2px 5px rgba(0, 0, 0, .05));
}
.demo-toggle:hover { border-color: var(--color-primary-500, #1C70F7); color: var(--color-primary-500, #1C70F7); }
.demo-toggle svg { width: 15px; height: 15px; flex-shrink: 0; }
.demo-toggle .chev-down { width: 12px; height: 12px; }

.demo-overlay {
  position: fixed; inset: 0; z-index: 600;
  background: rgba(15, 18, 32, .32);
  display: flex; align-items: flex-start; justify-content: flex-end;
  padding: 52px 12px 0 0;
}
.demo-panel {
  width: 320px;
  background: #fff;
  border-radius: var(--radius-xl, 12px);
  border: 1px solid var(--color-dividers, #E4E7ED);
  box-shadow: var(--shadow-modal, 0 4px 10px rgba(132, 132, 132, .1));
  padding: 14px;
}
.demo-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.demo-panel-title { font-size: 13px; font-weight: 700; color: var(--color-text-primary, #181819); }
.demo-panel-close {
  border: none; background: none; cursor: pointer; font-size: 13px;
  color: var(--color-text-tertiary, #6E7073); width: 22px; height: 22px; border-radius: 6px;
}
.demo-panel-close:hover { background: var(--color-disabled-bg, #F2F6FC); }
.demo-option {
  display: flex; flex-direction: column; align-items: flex-start; gap: 3px;
  width: 100%; text-align: left; font-family: inherit;
  border: 1px solid var(--color-dividers, #E4E7ED); background: #fff;
  border-radius: var(--radius-lg, 8px); padding: 10px 12px; margin-top: 8px; cursor: pointer;
}
.demo-option:hover { background: var(--color-disabled-bg, #F2F6FC); }
.demo-option.active { border-color: var(--color-primary-500, #1C70F7); background: var(--color-primary-200, #E9F1FF); }
.demo-option-title { font-size: 13px; font-weight: 700; color: var(--color-text-primary, #181819); }
.demo-option-desc { font-size: 11.5px; color: var(--color-text-secondary, #585A5C); line-height: 1.5; }
.demo-fade-enter-active, .demo-fade-leave-active { transition: opacity .15s ease; }
.demo-fade-enter-from, .demo-fade-leave-to { opacity: 0; }

/* ---------- SIDEBAR ---------- */
#sidebar {
  position: fixed; top: 0; left: 0; height: 100vh;
  width: var(--rail-collapsed);
  background: var(--rail-bg);
  z-index: 40;
  transition: width .28s cubic-bezier(.4, 0, .2, 1);
  overflow: visible;
}
#sidebar.rail-expanded { width: var(--rail-expanded); }
#sidebar { border-right: 1px solid var(--rail-border); }
#sidebar.rail-expanded:not(.mode-expand) { box-shadow: 4px 0 16px rgba(0, 0, 0, .08); }

.rail-inner {
  height: 100%; width: 100%;
  overflow-y: auto; overflow-x: hidden;
  display: flex; flex-direction: column;
  padding-bottom: 68px;
  scrollbar-width: thin; scrollbar-color: #CED0D6 transparent;
}
.rail-inner::-webkit-scrollbar { width: 6px; }
.rail-inner::-webkit-scrollbar-thumb { background: #CED0D6; border-radius: 3px; }

.brand {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 16px; min-height: 52px; flex-shrink: 0;
  border-bottom: 1px solid var(--rail-border);
}
.brand-mark {
  width: 32px; height: 32px; border-radius: var(--radius-lg, 8px); flex-shrink: 0;
  background: linear-gradient(135deg, #1C70F7, #5b9fff);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .5px;
}
.brand-text { white-space: nowrap; opacity: 0; transition: opacity .18s ease; }
#sidebar.rail-expanded .brand-text { opacity: 1; transition-delay: .08s; }
.brand-text .los { font-size: 9px; letter-spacing: 1.5px; color: var(--rail-text-dim); text-transform: uppercase; display: block; }
.brand-text .pms { font-size: 14px; font-weight: 700; color: var(--rail-text-main); }


.menu-item {
  position: relative; display: flex; align-items: center; gap: 14px;
  padding: 8px 20px; margin: 1px 6px; border-radius: var(--radius-lg, 8px);
  cursor: pointer; color: var(--rail-text-main); user-select: none;
  transition: background .15s ease, color .15s ease;
}
.menu-item:hover, .menu-item.mega-open { background: var(--rail-bg-soft); color: var(--rail-accent); }
.menu-item.active {
  background: var(--rail-accent-soft); color: var(--rail-accent);
}
.menu-item.active::after {
  content: ''; position: absolute; left: 0; top: 6px; bottom: 6px;
  width: 3px; background: var(--rail-accent); border-radius: 0 3px 3px 0;
}
.menu-item .ic { width: 20px; height: 20px; flex-shrink: 0; color: var(--rail-text-muted); transition: color .15s ease; }
.menu-item:hover .ic, .menu-item.active .ic, .menu-item.mega-open .ic { color: var(--rail-accent); }
.menu-item .lbl {
  white-space: nowrap; font-size: 13.5px; font-weight: 500; opacity: 0; transition: opacity .15s ease;
  overflow: hidden; text-overflow: ellipsis;
}
#sidebar.rail-expanded .menu-item .lbl { opacity: 1; transition-delay: .08s; }
.menu-item .chev {
  width: 14px; height: 14px; color: var(--rail-text-dim); flex-shrink: 0;
}

.rail-bottom-space { flex: 1; }
.divider { height: 1px; background: var(--rail-border); margin: 5px 16px; flex-shrink: 0; }

/* ---- SEARCH ---- */
.search-slot {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 20px; margin: 3px 6px;
  border-radius: var(--radius-lg, 8px);
  cursor: pointer; color: var(--rail-text-muted);
  transition: background .15s ease;
}
.search-slot:hover { background: var(--rail-bg-soft); color: var(--rail-accent); }
.search-slot .ic { width: 20px; height: 20px; flex-shrink: 0; }
.search-input-field {
  flex: 1; border: none; outline: none; background: transparent;
  font-family: inherit; font-size: 13.5px; color: var(--rail-text-main);
  min-width: 0;
}
.search-input-field::placeholder { color: var(--rail-text-dim); }

.search-results-overlay {
  position: absolute; left: 0; width: var(--rail-expanded);
  background: #FFFFFF; border: 1px solid var(--rail-border);
  border-radius: var(--radius-lg, 8px);
  box-shadow: var(--shadow-modal, 0px 4px 10px rgba(132, 132, 132, 0.1)), 0 8px 24px rgba(0,0,0,.08);
  overflow: hidden; z-index: 50; max-height: 320px; overflow-y: auto;
}
.search-result-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 16px; cursor: pointer;
  border-bottom: 1px solid var(--rail-border);
}
.search-result-item:last-child { border-bottom: none; }
.search-result-item:hover { background: var(--rail-bg-soft); }
.search-result-ic { width: 16px; height: 16px; flex-shrink: 0; color: var(--rail-text-muted); }
.search-result-info { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.search-result-label { font-size: 13px; font-weight: 500; color: var(--rail-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.search-result-path { font-size: 11px; color: var(--rail-text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ---- ICON BUTTON ROW ---- */
.icon-btn-row {
  display: flex;
  gap: 6px;
  padding: 3px 6px;
  margin: 2px 6px;
}
.icon-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 9px 4px 7px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid transparent;
  background: none;
  font-family: inherit;
  color: var(--rail-text-main);
  transition: background .15s ease, color .15s ease, border-color .15s ease;
  min-width: 0;
}
#sidebar.rail-expanded .icon-btn { border-color: var(--rail-border); }
.icon-btn:hover { background: var(--rail-bg-soft); color: var(--rail-accent); border-color: var(--rail-accent); }
.icon-btn.active { background: var(--rail-accent-soft); color: var(--rail-accent); border-color: var(--rail-accent); }
.icon-btn .ic {
  width: 20px; height: 20px; flex-shrink: 0;
  color: var(--rail-text-muted); transition: color .15s ease;
}
.icon-btn:hover .ic, .icon-btn.active .ic { color: var(--rail-accent); }
.icon-btn .lbl {
  font-size: 11px; font-weight: 500;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  width: 100%; text-align: center;
  opacity: 0; transition: opacity .15s ease;
}
#sidebar.rail-expanded .icon-btn .lbl { opacity: 1; transition-delay: .08s; }

/* ---- FAVORITES ---- */
.fav-badge {
  min-width: 18px; height: 18px; border-radius: 9px;
  background: var(--rail-accent); color: #fff;
  font-size: 10px; font-weight: 700;
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0 5px; flex-shrink: 0; margin-left: auto;
  opacity: 0; transition: opacity .15s ease;
}
#sidebar.rail-expanded .fav-badge { opacity: 1; transition-delay: .08s; }

.right-actions {
  margin-left: auto; display: flex; align-items: center; gap: 2px;
  opacity: 0; transition: opacity .15s ease; flex-shrink: 0;
}
#sidebar.rail-expanded .right-actions { opacity: 1; transition-delay: .08s; }

.star-btn {
  width: 22px; height: 22px; border: none; background: none;
  cursor: pointer; border-radius: var(--radius-sm, 4px); padding: 0;
  display: flex; align-items: center; justify-content: center;
  color: var(--rail-text-dim); flex-shrink: 0; transition: color .15s ease, background .15s ease;
}
.star-btn svg { width: 13px; height: 13px; }
.star-btn:hover { color: #EE9F00; background: rgba(238,159,0,.1); }
.star-btn.starred { color: #EE9F00; }

/* ---- FAVORITES PANEL ---- */
.fav-panel {
  position: absolute; left: 100%; top: 0;
  width: 240px;
  background: #FFFFFF; border: 1px solid var(--rail-border);
  border-radius: var(--radius-xl, 12px);
  box-shadow: var(--shadow-modal, 0px 4px 10px rgba(132, 132, 132, 0.1)), 0 8px 24px rgba(0,0,0,.08);
  opacity: 0; pointer-events: none; transition: opacity .14s ease;
  overflow: hidden;
}
.fav-panel.visible { opacity: 1; pointer-events: auto; }
.fav-panel-head {
  display: flex; align-items: center; gap: 7px;
  padding: 12px 16px; border-bottom: 1px solid var(--rail-border);
  font-size: 11px; font-weight: 700; color: var(--rail-text-main);
  letter-spacing: 0.8px; text-transform: uppercase;
}
.fav-panel-empty {
  padding: 20px 16px; font-size: 12.5px; color: var(--rail-text-dim);
  text-align: center; line-height: 1.8;
}
.fav-panel-list { padding: 6px 0; }
.fav-panel-item {
  display: flex; align-items: center;
  padding: 9px 16px; cursor: pointer; transition: background .12s ease;
}
.fav-panel-item:hover { background: var(--rail-bg-soft); }
.fav-panel-label { font-size: 13px; font-weight: 500; color: var(--rail-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ---------- MEGA MENU ---------- */
.mega-menu {
  position: absolute; left: 100%; top: 0;
  width: 0;
  background: #FFFFFF; border: 1px solid var(--color-dividers, #E4E7ED);
  border-radius: var(--radius-xl, 12px);
  box-shadow: var(--shadow-modal, 0px 4px 10px rgba(132, 132, 132, 0.1)), 0 8px 32px rgba(0, 0, 0, .08);
  overflow: hidden; opacity: 0; pointer-events: none;
  transition: opacity .14s ease;
}
.mega-menu.visible { opacity: 1; pointer-events: auto; width: auto; }
.mega-head {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 20px; border-bottom: 1px solid var(--color-dividers, #E4E7ED);
  font-size: 11px; color: var(--color-text-secondary, #585A5C); white-space: nowrap;
  letter-spacing: 0.5px;
}
.mega-head b { color: var(--color-text-primary, #181819); font-size: 13px; font-weight: 700; margin-left: 2px; }
.mega-head .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rail-accent); }
.mega-body {
  display: grid; grid-template-columns: auto auto;
  gap: 4px; padding: 14px;
}
.mega-col { padding: 6px 10px 10px; }
.mega-col .lv3-title {
  display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 700;
  color: var(--color-text-primary, #181819); padding: 6px 10px; white-space: nowrap;
  cursor: pointer; border-radius: var(--radius-md, 6px);
  transition: background .12s ease, color .12s ease;
}
.mega-col .lv3-title .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rail-lv3); flex-shrink: 0; }
.mega-col .lv3-title:hover { color: var(--rail-accent); background: var(--rail-accent-soft); }
.mega-col .lv4-item {
  display: flex; align-items: center; gap: 7px; font-size: 14px;
  color: var(--color-text-secondary, #585A5C);
  padding: 6px 10px 6px 22px; border-radius: var(--radius-md, 6px); cursor: pointer; white-space: nowrap;
  transition: background .12s ease, color .12s ease;
}
.mega-col .lv4-item:hover { color: var(--rail-accent); background: var(--rail-accent-soft); }
.mega-col .lv4-item .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--color-text-secondary, #585A5C); flex-shrink: 0; }
.mega-col.leaf .lv3-title { cursor: pointer; }

.mega-star-btn {
  width: 20px; height: 20px; border: none; background: none;
  cursor: pointer; border-radius: 4px; padding: 0; margin-left: auto;
  display: flex; align-items: center; justify-content: center;
  color: var(--rail-text-dim); flex-shrink: 0; opacity: 0;
  transition: opacity .12s ease, color .12s ease, background .12s ease;
}
.mega-star-btn svg { width: 11px; height: 11px; }
.mega-star-btn:hover { color: #EE9F00; background: rgba(238,159,0,.1); opacity: 1; }
.mega-star-btn.starred { color: #EE9F00; opacity: 1; }
.lv3-title:hover .mega-star-btn,
.lv4-item:hover .mega-star-btn { opacity: 1; }
.lv4-star { margin-left: auto; }

/* ---- USER SECTION ---- */
.rail-user {
  position: absolute; bottom: 0; left: 0; right: 0;
  display: flex; align-items: center; gap: 10px;
  padding: 10px 18px;
  background: var(--rail-bg);
  border-top: 1px solid var(--rail-border);
  min-height: 60px; overflow: hidden;
}
.rail-user-avatar {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  background: var(--rail-accent-soft);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.rail-user-avatar svg { width: 28px; height: 28px; }
.rail-user-online-dot {
  position: absolute; bottom: -1px; right: -1px;
  width: 10px; height: 10px; border-radius: 50%;
  background: #05A861; border: 2px solid var(--rail-bg);
}
.rail-user-info {
  flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px;
  opacity: 0; transition: opacity .15s ease; pointer-events: none;
}
#sidebar.rail-expanded .rail-user-info { opacity: 1; transition-delay: .08s; pointer-events: auto; }
.rail-user-name { font-size: 13.5px; font-weight: 700; color: var(--rail-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rail-user-status { font-size: 12px; font-weight: 500; color: #05A861; white-space: nowrap; }
.rail-user-more {
  width: 28px; height: 28px; flex-shrink: 0; border: none; background: none;
  cursor: pointer; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  color: var(--rail-text-dim);
  opacity: 0; transition: opacity .15s ease;
}
#sidebar.rail-expanded .rail-user-more { opacity: 1; transition-delay: .08s; }
.rail-user-more:hover { background: var(--rail-bg-soft); }
.rail-user-more svg { width: 16px; height: 16px; }

/* ---------- MAIN CONTENT (invoice page) ---------- */
.page {
  height: 100vh; overflow-y: auto;
  transition: margin-left .28s cubic-bezier(.4, 0, .2, 1);
}
.app-topbar {
  height: 52px; background: #fff; border-bottom: 1px solid var(--color-dividers, #e7e9f2);
  display: flex; align-items: center; justify-content: space-between; padding: 0 24px;
  position: sticky; top: 0; z-index: 10;
}
.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--color-text-tertiary, #6E7073); }
.crumb-item { display: flex; align-items: center; gap: 6px; }
.crumb-sep { color: var(--color-stroke, #CED0D6); }
.crumb-current { color: var(--color-text-primary, #1c2144); font-weight: 700; }

.topbar-right { display: flex; align-items: center; gap: 10px; }
.project-chip {
  display: flex; align-items: center; gap: 8px;
  background: var(--color-disabled-bg, #F2F6FC); border: 1px solid var(--color-dividers, #e7e9f2);
  border-radius: 999px; padding: 6px 12px; font-size: 12.5px; color: var(--color-text-secondary, #585A5C);
}
.project-chip svg { width: 15px; height: 15px; flex-shrink: 0; color: var(--color-text-tertiary, #6E7073); }
.project-chip .swap-ic { color: var(--color-primary-500, #1C70F7); cursor: pointer; }
.app-grid-btn {
  width: 34px; height: 34px; border-radius: var(--radius-md, 6px);
  background: var(--color-primary-200, #E9F1FF); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.app-grid-btn svg { width: 16px; height: 16px; color: var(--color-primary-500, #1C70F7); }

.page-content { padding: 24px 28px 60px; max-width: 1240px; }

.page-header-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; flex-wrap: wrap; }
.page-header-left { display: flex; align-items: center; gap: 12px; }
.back-btn {
  width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--color-stroke, #CED0D6);
  background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-text-secondary, #585A5C);
}
.back-btn svg { width: 14px; height: 14px; }
.page-title { font-size: 19px; font-weight: 700; color: var(--color-text-primary, #181819); margin: 0; }
.howto-pill {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--color-attention, #EE9F00); color: #fff; text-decoration: none;
  font-size: 12.5px; font-weight: 600; padding: 6px 14px; border-radius: 999px;
}
.howto-pill svg { width: 13px; height: 13px; }

.page-header-actions { display: flex; align-items: center; gap: 10px; }
.btn {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  padding: 8px 16px; border-radius: var(--radius-lg, 8px); cursor: pointer; white-space: nowrap;
}
.btn svg { width: 15px; height: 15px; }
.btn-outline-danger { background: #fff; border: 1px solid var(--color-error, #F03737); color: var(--color-error, #F03737); }
.btn-outline-danger:hover { background: var(--color-error-bg, #FFF5F5); }
.btn-outline-primary { background: #fff; border: 1px solid var(--color-primary-500, #1C70F7); color: var(--color-primary-500, #1C70F7); }
.btn-outline-primary:hover { background: var(--color-primary-200, #E9F1FF); }
.btn-primary { background: var(--color-primary-500, #1C70F7); border: 1px solid var(--color-primary-500, #1C70F7); color: #fff; }
.btn-primary:hover { background: var(--color-primary-click, #004ECC); }
.btn-sm { padding: 6px 12px; font-size: 12.5px; }

.invoice-card {
  background: #fff; border-radius: var(--radius-xl, 12px); border: 1px solid var(--color-dividers, #E4E7ED);
  box-shadow: var(--shadow-header, 2px 2px 5px rgba(0, 0, 0, .05));
  padding: 22px 24px 26px;
}
.card-title { font-size: 15px; font-weight: 700; color: var(--color-text-primary, #181819); margin: 0 0 16px; }

.form-grid { display: grid; gap: 16px; margin-bottom: 16px; }
.form-grid-4 { grid-template-columns: repeat(4, 1fr); }
.form-grid-1 { grid-template-columns: 1fr; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 12.5px; color: var(--color-text-secondary, #585A5C); }
.field input, .field textarea {
  font-family: inherit; font-size: 13.5px; color: var(--color-text-primary, #181819);
  border: 1px solid var(--color-stroke, #CED0D6); border-radius: var(--radius-md, 6px);
  padding: 9px 12px; background: var(--color-disabled-bg, #F2F6FC); outline: none; width: 100%;
}
.field input:focus, .field textarea:focus { border-color: var(--color-primary-500, #1C70F7); background: #fff; }
.field textarea { resize: vertical; }
.input-with-icon { position: relative; }
.input-with-icon input { padding-right: 34px; }
.field-ic { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; color: var(--color-primary-500, #1C70F7); pointer-events: none; }
.field-link { justify-content: flex-end; align-items: flex-end; padding-bottom: 9px; }
.notes-link { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; color: var(--color-primary-500, #1C70F7); text-decoration: none; }
.notes-link:hover { text-decoration: underline; }
.chev-down { width: 12px; height: 12px; transition: transform .15s ease; }
.chev-down.open { transform: rotate(180deg); }

.charges-header { display: flex; align-items: center; justify-content: space-between; margin: 20px 0 12px; }

.charges-table-wrap { max-height: 340px; overflow-y: auto; border: 1px solid var(--color-dividers, #E4E7ED); border-radius: var(--radius-lg, 8px); }
.charges-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.charges-table thead th {
  position: sticky; top: 0; background: var(--color-disabled-bg, #F2F6FC);
  text-align: left; font-weight: 700; color: var(--color-text-secondary, #585A5C);
  padding: 10px 14px; border-bottom: 1px solid var(--color-dividers, #E4E7ED); white-space: nowrap;
}
.charges-table th.col-num, .charges-table td.col-num { text-align: right; }
.charges-table th.col-actions, .charges-table td.col-actions { text-align: right; width: 100px; }
.charges-table td { padding: 10px 14px; border-bottom: 1px solid var(--color-dividers, #E4E7ED); color: var(--color-text-primary, #181819); white-space: nowrap; }
.charges-table tbody tr:last-child td { border-bottom: none; }
.charges-table tbody tr.row-active { background: var(--color-primary-200, #E9F1FF); }
.charges-table tbody tr.row-active td { color: var(--color-primary-500, #1C70F7); font-weight: 600; }
.charges-table tbody tr:hover:not(.row-active) { background: var(--color-disabled-bg, #F2F6FC); }

.row-ic-btn {
  width: 26px; height: 26px; border: none; background: none; cursor: pointer; border-radius: 6px;
  color: var(--color-icons, #787A7D); display: inline-flex; align-items: center; justify-content: center;
}
.row-ic-btn svg { width: 14px; height: 14px; }
.row-ic-btn:hover { background: var(--color-disabled-bg, #F2F6FC); color: var(--color-primary-500, #1C70F7); }
.row-ic-btn.row-ic-danger:hover { color: var(--color-error, #F03737); }

.charges-footer { display: flex; align-items: center; justify-content: flex-end; gap: 14px; margin-top: 16px; }
.charges-footer span { font-size: 13.5px; font-weight: 600; color: var(--color-text-secondary, #585A5C); }
.total-box {
  min-width: 160px; text-align: right; font-size: 14px; font-weight: 700;
  color: var(--color-text-primary, #181819); background: var(--color-disabled-bg, #F2F6FC);
  border: 1px solid var(--color-dividers, #E4E7ED); border-radius: var(--radius-md, 6px); padding: 9px 14px;
}
</style>
