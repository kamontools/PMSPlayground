<template>
  <div class="pca-page" @click="onDateInputClick">
    <!-- ============ SIDEBAR ============ -->
    <aside class="pca-sidebar">
      <div class="pca-brand">
        <div class="pca-brand-mark">LOS</div>
        <div class="pca-brand-text">
          <span class="pca-brand-los">The Living OS</span>
          <span class="pca-brand-pms">PMS</span>
        </div>
      </div>

      <div class="pca-search">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5"/><path d="M15 15l-3-3"/></svg>
        <input type="text" placeholder="ค้นหาเมนู..." readonly />
      </div>

      <nav class="pca-nav">
        <div class="pca-nav-group pca-nav-group--open">
          <div class="pca-nav-group-head">
            <svg class="pca-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="12" height="14" rx="1"/><rect x="6.3" y="5.8" width="2" height="2"/><rect x="11.7" y="5.8" width="2" height="2"/><rect x="6.3" y="9.6" width="2" height="2"/><rect x="11.7" y="9.6" width="2" height="2"/></svg>
            <span>เจ้าหนี้ AP</span>
            <svg class="pca-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
          </div>

          <div class="pca-nav-leaf">ใบขอซื้อ PR</div>
          <div class="pca-nav-leaf">ใบสั่งซื้อ PO</div>
          <div class="pca-nav-leaf">ใบรับสินค้า/ใบรับวางบิล</div>
          <div class="pca-nav-leaf">ใบเสร็จด้านจ่าย</div>

          <div class="pca-nav-subgroup pca-nav-subgroup--open">
            <div class="pca-nav-subgroup-head">
              <span>ใบตั้งเบิก</span>
              <svg class="pca-chev" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
            </div>
            <div class="pca-nav-leaf pca-nav-leaf--sub">จัดการใบตั้งเบิก</div>
            <div class="pca-nav-leaf pca-nav-leaf--sub">รายงานใบตั้งเบิก</div>
            <div class="pca-nav-leaf pca-nav-leaf--sub">ตั้งค่าใบตั้งเบิก</div>
            <div class="pca-nav-leaf pca-nav-leaf--sub pca-nav-leaf--active">เงินทดรองจ่าย</div>
          </div>

          <div class="pca-nav-leaf">จ่ายชำระ</div>
          <div class="pca-nav-leaf">ภาษีหัก ณ ที่จ่าย</div>
          <div class="pca-nav-leaf">รายงานเจ้าหนี้</div>
          <div class="pca-nav-leaf">รายงาน ภ.ง.ด.</div>
        </div>
      </nav>

      <div class="pca-sidebar-bottom">
        <div class="pca-nav-leaf pca-nav-leaf--flat">
          <svg class="pca-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5c-1.5-1-4-1.5-6-1v11c2-.5 4.5 0 6 1"/><path d="M10 5c1.5-1 4-1.5 6-1v11c-2-.5-4.5 0-6 1"/><line x1="10" y1="5" x2="10" y2="16"/></svg>
          <span>คู่มือการใช้งาน</span>
        </div>
        <div class="pca-nav-leaf pca-nav-leaf--flat">
          <svg class="pca-nav-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l2-6h10l2 6"/><path d="M3 10v6a1 1 0 001 1h12a1 1 0 001-1v-6"/><path d="M3 10h4l1 2h4l1-2h4"/></svg>
          <span>รายการคำขอ</span>
        </div>
        <div class="pca-divider"></div>
        <div class="pca-user">
          <div class="pca-user-avatar">
            <svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="14" r="6" fill="#1C70F7" opacity=".15"/><circle cx="18" cy="14" r="6" stroke="#1C70F7" stroke-width="1.8"/><path d="M8 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#1C70F7" stroke-width="1.8" stroke-linecap="round"/></svg>
            <span class="pca-user-dot"></span>
          </div>
          <div class="pca-user-info">
            <span class="pca-user-name">boy test</span>
            <span class="pca-user-status">ออนไลน์</span>
          </div>
          <button type="button" class="pca-user-more">
            <svg viewBox="0 0 20 20" fill="currentColor"><circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/></svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- ============ MAIN ============ -->
    <div class="pca-main">
      <div class="pca-topbar">
        <div class="pca-breadcrumb">
          <span v-for="(crumb, i) in breadcrumb" :key="i" class="pca-crumb">
            <span :class="{ 'pca-crumb-current': i === breadcrumb.length - 1 }">{{ crumb }}</span>
            <span v-if="i < breadcrumb.length - 1" class="pca-crumb-sep">›</span>
          </span>
        </div>
        <div class="pca-topbar-right">
          <div class="pca-project-chip">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3l-4 3v11h4V9h6v8h4V6l-4-3"/></svg>
            <span>T-001 : โครงการนิติบุคคล หมื่นสิริ คอนโดมิเนียม เขตบางนา</span>
            <svg class="pca-swap-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10l-3-3M16 13H6l3 3"/></svg>
          </div>
          <router-link class="pca-exit" to="/prototype/advance-payment">← v1 เดิม</router-link>
          <router-link class="pca-exit" to="/">หน้าหลัก</router-link>
        </div>
      </div>

      <div class="pca-content">
        <!-- ================= LIST ================= -->
        <template v-if="page === 'list'">
          <div class="pca-header-row">
            <h1 class="pca-title">เงินทดรองจ่าย</h1>
            <button type="button" class="pca-btn pca-btn-primary" @click="openCreate">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>
              สร้างเงินทดรองจ่าย
            </button>
          </div>

          <div class="pcv2-filters">
            <button
              v-for="f in FILTERS"
              :key="f.value"
              type="button"
              class="pcv2-filter-pill"
              :class="{ active: activeFilter === f.value }"
              @click="activeFilter = f.value"
            >
              {{ f.label }}
              <span class="pcv2-filter-count">{{ filterCounts[f.value] }}</span>
            </button>
          </div>

          <div class="pca-card">
            <div class="pca-table-wrap pcv2-list-table-wrap">
              <table class="pca-table">
                <thead>
                  <tr>
                    <th>เลขที่เอกสาร</th>
                    <th>สถานะ</th>
                    <th>วันที่บันทึก</th>
                    <th>วันที่ครบกำหนดเคลียร์</th>
                    <th>ผู้เบิก</th>
                    <th>คำอธิบาย</th>
                    <th>ชำระโดย</th>
                    <th class="pca-col-num">จำนวนเงิน</th>
                    <th class="pca-col-actions pcv2-col-sticky"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="filteredItems.length === 0">
                    <td colspan="9" class="pca-empty">ไม่มีรายการเงินทดรองจ่าย</td>
                  </tr>
                  <tr v-for="item in filteredItems" :key="item.id" class="pcv2-row-clickable" title="ดับเบิลคลิกเพื่อดูรายละเอียด" @dblclick="openDetail(item)">
                    <td class="pca-cell-strong">{{ item.docNo }}</td>
                    <td><span class="pca-status" :class="'pca-status--' + item.status">{{ statusLabel(item.status) }}</span></td>
                    <td>{{ item.bookDate }}</td>
                    <td>{{ item.dueDate }}</td>
                    <td>{{ item.payee }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.payMethod || '—' }}</td>
                    <td class="pca-col-num">{{ item.payMethod ? formatAmount(item.amount) : '—' }}</td>
                    <td class="pca-col-actions pcv2-col-sticky">
                      <div class="pcv2-row-actions">
                        <button type="button" class="pca-icon-btn" title="ดูรายละเอียด" @click="openDetail(item)">
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6z"/><circle cx="10" cy="10" r="2.4"/></svg>
                        </button>
                        <button v-if="item.status === 'awaiting-disburse'" type="button" class="pca-btn pca-btn-outline pca-btn-sm" @click="openDisburse(item)">เบิกเงินทดรองจ่าย</button>
                        <button v-else-if="item.status === 'awaiting-clear'" type="button" class="pca-btn pca-btn-outline pca-btn-sm" @click="openClear(item)">เคลียร์เงินทดรองจ่าย</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>

        <!-- ================= CREATE ================= -->
        <template v-else-if="page === 'create'">
          <div class="pca-header-row">
            <div class="pca-header-left">
              <button type="button" class="pca-back-btn" @click="page = 'list'">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>
              </button>
              <h1 class="pca-title">สร้างเงินทดรองจ่าย</h1>
            </div>
            <button type="button" class="pca-btn pca-btn-primary" :disabled="!canSaveCreate" @click="saveCreate">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h10l2 2v10H4z"/><path d="M7 4v4h6V4M6 16v-5h8v5"/></svg>
              บันทึก
            </button>
          </div>

          <div class="pca-card">
            <h2 class="pca-card-title">รายละเอียด</h2>

            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>เลขที่เอกสาร</label>
                <input type="text" :value="nextDocNo" disabled />
              </div>
              <div class="pca-field">
                <label>วันที่บันทึก<span class="pca-req">*</span></label>
                <input type="date" v-model="createForm.bookDate" />
              </div>
              <div class="pca-field">
                <label>วันที่ครบกำหนดเคลียร์<span class="pca-req">*</span></label>
                <input type="date" v-model="createForm.dueDate" />
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-1">
              <div class="pca-field">
                <div class="pca-field-label-row">
                  <label>คำอธิบาย</label>
                  <span class="pca-char-count">{{ createForm.description.length }}/255</span>
                </div>
                <textarea v-model="createForm.description" rows="2" maxlength="255" placeholder="ระบุคำอธิบาย"></textarea>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>ผู้เบิก</label>
                <input type="text" v-model="createForm.payee" placeholder="ระบุชื่อผู้เบิก" />
              </div>
              <div class="pca-field">
                <label>เอกสารประกอบ</label>
                <button type="button" class="pca-btn pca-btn-primary pca-btn-sm" @click="showUploadToast">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13V4M6.5 7.5L10 4l3.5 3.5"/><path d="M4 13v2a1 1 0 001 1h10a1 1 0 001-1v-2"/></svg>
                  อัปโหลดไฟล์
                </button>
              </div>
            </div>
          </div>

          <div class="pca-card">
            <h2 class="pca-card-title">วิธีการชำระ <span class="pcv2-optional-tag">ไม่บังคับ กรอกภายหลังได้</span></h2>
            <div class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>ชำระโดย</label>
                <div class="pca-input-icon">
                  <select v-model="createForm.payMethod">
                    <option v-for="opt in PAY_METHODS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-if="createForm.payMethod === 'cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="createForm.amount" min="0" placeholder="0.00" />
              </div>
            </div>

            <div v-else-if="createForm.payMethod === 'petty-cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="createForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>รายการเงินสดย่อย (เลขที่เอกสาร)</label>
                <div class="pca-input-icon">
                  <select v-model="createForm.pettyCashDocNo">
                    <option value="" disabled>เลือกเลขที่เอกสาร</option>
                    <option v-for="doc in PETTY_CASH_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-else-if="createForm.payMethod === 'advance-received'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="createForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>อ้างอิงรับเงินล่วงหน้า</label>
                <div class="pca-input-icon">
                  <select v-model="createForm.advanceRefNo">
                    <option value="" disabled>เลือกเอกสารอ้างอิง</option>
                    <option v-for="doc in ADVANCE_RECEIVED_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-else-if="createForm.payMethod === 'bank-kbank'" class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="createForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>วันที่</label>
                <input type="date" v-model="createForm.bankDate" />
              </div>
              <div class="pca-field">
                <label>หลักฐานการชำระเงิน</label>
                <button type="button" class="pca-btn pca-btn-primary pca-btn-sm" @click="showUploadToast">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13V4M6.5 7.5L10 4l3.5 3.5"/><path d="M4 13v2a1 1 0 001 1h10a1 1 0 001-1v-2"/></svg>
                  อัปโหลดไฟล์
                </button>
              </div>
            </div>

            <template v-else-if="createForm.payMethod === 'check'">
              <div class="pca-form-grid pca-form-grid-1">
                <div class="pca-field">
                  <label>เลือกเอกสารเลขที่ หรือสร้างใหม่</label>
                  <div class="pca-check-mode-toggle">
                    <button type="button" class="pca-mode-btn" :class="{ active: createForm.checkMode === 'existing' }" @click="createForm.checkMode = 'existing'">เลือกเอกสารเดิม</button>
                    <button type="button" class="pca-mode-btn" :class="{ active: createForm.checkMode === 'new' }" @click="createForm.checkMode = 'new'">สร้างใหม่</button>
                  </div>
                </div>
              </div>

              <div class="pca-form-grid" :class="createForm.checkMode === 'existing' ? 'pca-form-grid-3' : 'pca-form-grid-2'">
                <div class="pca-field" v-if="createForm.checkMode === 'existing'">
                  <label>เลขที่เช็ค</label>
                  <div class="pca-input-icon">
                    <select v-model="createForm.checkDocNo">
                      <option value="" disabled>เลือกเลขที่เช็ค</option>
                      <option v-for="chq in CHECK_DOCS" :key="chq.docNo" :value="chq.docNo">{{ chq.docNo }} — {{ formatAmount(chq.amount) }} บาท</option>
                    </select>
                    <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                  </div>
                </div>
                <div class="pca-field" v-else>
                  <label>เลขที่เช็คใหม่</label>
                  <input type="text" v-model="createForm.checkNewNo" placeholder="ระบุเลขที่เช็ค" />
                </div>
                <div class="pca-field">
                  <label>จำนวนเงิน (ขึ้นตามเช็ค)</label>
                  <input type="number" :value="createCheckAmount" @input="onCheckAmountInput(createForm, $event)" :disabled="createForm.checkMode === 'existing'" placeholder="0.00" />
                </div>
              </div>

              <div v-if="createForm.checkMode === 'new'" class="pca-paired-check-title">รายละเอียดเช็คประกบ</div>

              <div v-if="createForm.checkMode === 'new'" class="pca-paired-check">
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>รายละเอียดเช็ค</label>
                    <textarea v-model="createForm.pairedCheck.detail" rows="2" placeholder="ระบุรายละเอียดเช็ค"></textarea>
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-2">
                  <div class="pca-field">
                    <label>วันที่ชำระ</label>
                    <input type="date" v-model="createForm.pairedCheck.paymentDate" />
                  </div>
                  <div class="pca-field">
                    <label>วันที่ครบกำหนด</label>
                    <input type="date" v-model="createForm.pairedCheck.dueDate" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>ผู้จัดจำหน่าย</label>
                    <input type="text" v-model="createForm.pairedCheck.vendor" placeholder="ระบุผู้จัดจำหน่าย" />
                  </div>
                  <div class="pca-field">
                    <label>ประเภทการชำระ</label>
                    <div class="pca-input-icon">
                      <select v-model="createForm.pairedCheck.paymentType">
                        <option value="" disabled>เลือกประเภทการชำระ</option>
                        <option v-for="t in PAYMENT_TYPES" :key="t" :value="t">{{ t }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>ชื่อพนักงาน</label>
                    <input type="text" v-model="createForm.pairedCheck.employeeName" placeholder="ระบุชื่อพนักงาน" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>จ่ายจากบัญชี</label>
                    <div class="pca-input-icon">
                      <select v-model="createForm.pairedCheck.payFromAccount">
                        <option value="" disabled>เลือกบัญชี</option>
                        <option v-for="a in PAY_FROM_ACCOUNTS" :key="a" :value="a">{{ a }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>สถานะ</label>
                    <div class="pca-input-icon">
                      <select v-model="createForm.pairedCheck.status">
                        <option value="" disabled>เลือกสถานะ</option>
                        <option v-for="s in CHECK_STATUSES" :key="s" :value="s">{{ s }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>วันที่หักจากบัญชี</label>
                    <input type="date" v-model="createForm.pairedCheck.accountDeductDate" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>ชื่อผู้รับ</label>
                    <input type="text" v-model="createForm.pairedCheck.payeeName" placeholder="ระบุชื่อผู้รับ" />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>

        <!-- ================= DETAIL ================= -->
        <template v-else-if="page === 'detail' && selectedItem">
          <div class="pca-header-row">
            <div class="pca-header-left">
              <button type="button" class="pca-back-btn" @click="page = 'list'">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>
              </button>
              <h1 class="pca-title">รายละเอียดเงินทดรองจ่าย {{ selectedItem.docNo }}</h1>
            </div>
            <div v-if="selectedItem.status !== 'awaiting-disburse'" class="pcv2-layout-toggle" role="group" aria-label="รูปแบบการแสดงผล">
              <button type="button" class="pcv2-layout-btn" :class="{ active: detailLayout === '1col' }" title="แสดงผล 1 คอลัมน์" :aria-pressed="detailLayout === '1col'" @click="setDetailLayout('1col')">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3.5" y="3.5" width="13" height="5" rx="1.2"/><rect x="3.5" y="11.5" width="13" height="5" rx="1.2"/></svg>
                <span>1 คอลัมน์</span>
              </button>
              <button type="button" class="pcv2-layout-btn" :class="{ active: detailLayout === '2col' }" title="แสดงผล 2 คอลัมน์" :aria-pressed="detailLayout === '2col'" @click="setDetailLayout('2col')">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3.5" y="3.5" width="5.5" height="13" rx="1.2"/><rect x="11" y="3.5" width="5.5" height="13" rx="1.2"/></svg>
                <span>2 คอลัมน์</span>
              </button>
            </div>
          </div>

          <div class="pcv2-detail-layout" :class="selectedItem.status !== 'awaiting-disburse' && 'pcv2-detail-layout--' + detailLayout">
          <div class="pca-card">
            <div class="pca-charges-header">
              <h2 class="pca-card-title" style="margin:0">ส่วน คำขอเงินทดรองจ่าย</h2>
            </div>
            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>เลขที่เอกสาร</label>
                <input type="text" :value="selectedItem.docNo" disabled />
              </div>
              <div class="pca-field">
                <label>วันที่บันทึก</label>
                <input type="text" :value="selectedItem.bookDate" disabled />
              </div>
              <div class="pca-field">
                <label>วันที่ครบกำหนดเคลียร์</label>
                <input type="text" :value="selectedItem.dueDate" disabled />
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-1">
              <div class="pca-field">
                <label>คำอธิบาย</label>
                <textarea :value="selectedItem.description" rows="2" disabled></textarea>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>ผู้เบิก</label>
                <input type="text" :value="selectedItem.payee" disabled />
              </div>
              <div class="pca-field">
                <label>สถานะ</label>
                <div><span class="pca-status" :class="'pca-status--' + selectedItem.status">{{ statusLabel(selectedItem.status) }}</span></div>
              </div>
            </div>

            <template v-if="selectedItem.payMethod">
              <div class="pca-form-grid pca-form-grid-2">
                <div class="pca-field">
                  <label>ชำระโดย</label>
                  <input type="text" :value="selectedItem.payMethod" disabled />
                </div>
                <div class="pca-field">
                  <label>จำนวนเงิน</label>
                  <input type="text" :value="formatAmount(selectedItem.amount) + ' บาท'" disabled />
                </div>
              </div>
            </template>
            <div v-else class="pcv2-inline-pay">
              <div class="pcv2-inline-pay-title">วิธีการชำระ</div>
            <div class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>ชำระโดย<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <select v-model="disburseForm.payMethod">
                    <option v-for="opt in PAY_METHODS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-if="disburseForm.payMethod === 'cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน<span class="pca-req">*</span></label>
                <input type="number" v-model.number="disburseForm.amount" min="0" placeholder="0.00" />
              </div>
            </div>

            <div v-else-if="disburseForm.payMethod === 'petty-cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน<span class="pca-req">*</span></label>
                <input type="number" v-model.number="disburseForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>รายการเงินสดย่อย (เลขที่เอกสาร)</label>
                <div class="pca-input-icon">
                  <select v-model="disburseForm.pettyCashDocNo">
                    <option value="" disabled>เลือกเลขที่เอกสาร</option>
                    <option v-for="doc in PETTY_CASH_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-else-if="disburseForm.payMethod === 'advance-received'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน<span class="pca-req">*</span></label>
                <input type="number" v-model.number="disburseForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>อ้างอิงรับเงินล่วงหน้า</label>
                <div class="pca-input-icon">
                  <select v-model="disburseForm.advanceRefNo">
                    <option value="" disabled>เลือกเอกสารอ้างอิง</option>
                    <option v-for="doc in ADVANCE_RECEIVED_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-else-if="disburseForm.payMethod === 'bank-kbank'" class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>จำนวนเงิน<span class="pca-req">*</span></label>
                <input type="number" v-model.number="disburseForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>วันที่</label>
                <input type="date" v-model="disburseForm.bankDate" />
              </div>
              <div class="pca-field">
                <label>หลักฐานการชำระเงิน</label>
                <button type="button" class="pca-btn pca-btn-primary pca-btn-sm" @click="showUploadToast">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13V4M6.5 7.5L10 4l3.5 3.5"/><path d="M4 13v2a1 1 0 001 1h10a1 1 0 001-1v-2"/></svg>
                  อัปโหลดไฟล์
                </button>
              </div>
            </div>

            <template v-else-if="disburseForm.payMethod === 'check'">
              <div class="pca-form-grid pca-form-grid-1">
                <div class="pca-field">
                  <label>เลือกเอกสารเลขที่ หรือสร้างใหม่</label>
                  <div class="pca-check-mode-toggle">
                    <button type="button" class="pca-mode-btn" :class="{ active: disburseForm.checkMode === 'existing' }" @click="disburseForm.checkMode = 'existing'">เลือกเอกสารเดิม</button>
                    <button type="button" class="pca-mode-btn" :class="{ active: disburseForm.checkMode === 'new' }" @click="disburseForm.checkMode = 'new'">สร้างใหม่</button>
                  </div>
                </div>
              </div>

              <div class="pca-form-grid" :class="disburseForm.checkMode === 'existing' ? 'pca-form-grid-3' : 'pca-form-grid-2'">
                <div class="pca-field" v-if="disburseForm.checkMode === 'existing'">
                  <label>เลขที่เช็ค</label>
                  <div class="pca-input-icon">
                    <select v-model="disburseForm.checkDocNo">
                      <option value="" disabled>เลือกเลขที่เช็ค</option>
                      <option v-for="chq in CHECK_DOCS" :key="chq.docNo" :value="chq.docNo">{{ chq.docNo }} — {{ formatAmount(chq.amount) }} บาท</option>
                    </select>
                    <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                  </div>
                </div>
                <div class="pca-field" v-else>
                  <label>เลขที่เช็คใหม่</label>
                  <input type="text" v-model="disburseForm.checkNewNo" placeholder="ระบุเลขที่เช็ค" />
                </div>
                <div class="pca-field">
                  <label>จำนวนเงิน (ขึ้นตามเช็ค)</label>
                  <input type="number" :value="disburseCheckAmount" @input="onCheckAmountInput(disburseForm, $event)" :disabled="disburseForm.checkMode === 'existing'" placeholder="0.00" />
                </div>
              </div>

              <div v-if="disburseForm.checkMode === 'new'" class="pca-paired-check-title">รายละเอียดเช็คประกบ<span class="pca-req">*</span></div>

              <div v-if="disburseForm.checkMode === 'new'" class="pca-paired-check">
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>รายละเอียดเช็ค</label>
                    <textarea v-model="disburseForm.pairedCheck.detail" rows="2" placeholder="ระบุรายละเอียดเช็ค"></textarea>
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-2">
                  <div class="pca-field">
                    <label>วันที่ชำระ</label>
                    <input type="date" v-model="disburseForm.pairedCheck.paymentDate" />
                  </div>
                  <div class="pca-field">
                    <label>วันที่ครบกำหนด</label>
                    <input type="date" v-model="disburseForm.pairedCheck.dueDate" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>ผู้จัดจำหน่าย</label>
                    <input type="text" v-model="disburseForm.pairedCheck.vendor" placeholder="ระบุผู้จัดจำหน่าย" />
                  </div>
                  <div class="pca-field">
                    <label>ประเภทการชำระ</label>
                    <div class="pca-input-icon">
                      <select v-model="disburseForm.pairedCheck.paymentType">
                        <option value="" disabled>เลือกประเภทการชำระ</option>
                        <option v-for="t in PAYMENT_TYPES" :key="t" :value="t">{{ t }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>ชื่อพนักงาน</label>
                    <input type="text" v-model="disburseForm.pairedCheck.employeeName" placeholder="ระบุชื่อพนักงาน" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>จ่ายจากบัญชี</label>
                    <div class="pca-input-icon">
                      <select v-model="disburseForm.pairedCheck.payFromAccount">
                        <option value="" disabled>เลือกบัญชี</option>
                        <option v-for="a in PAY_FROM_ACCOUNTS" :key="a" :value="a">{{ a }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>สถานะ</label>
                    <div class="pca-input-icon">
                      <select v-model="disburseForm.pairedCheck.status">
                        <option value="" disabled>เลือกสถานะ</option>
                        <option v-for="s in CHECK_STATUSES" :key="s" :value="s">{{ s }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>วันที่หักจากบัญชี</label>
                    <input type="date" v-model="disburseForm.pairedCheck.accountDeductDate" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>ชื่อผู้รับ</label>
                    <input type="text" v-model="disburseForm.pairedCheck.payeeName" placeholder="ระบุชื่อผู้รับ" />
                  </div>
                </div>
              </div>
            </template>
              <div class="pcv2-inline-pay-actions">
                <button type="button" class="pca-btn pca-btn-primary" :disabled="!canSaveDisburse" @click="saveDisburse">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h10l2 2v10H4z"/><path d="M7 4v4h6V4M6 16v-5h8v5"/></svg>
                  บันทึกวิธีการชำระ
                </button>
              </div>
            </div>
          </div>

          <div v-if="selectedItem.status !== 'awaiting-disburse'" class="pca-card">
            <div class="pca-charges-header">
              <h2 class="pca-card-title" style="margin:0">ส่วน เคลียร์เงินทดรองจ่าย</h2>
            </div>

            <template v-if="selectedItem.clearing">
              <div class="pca-form-grid pca-form-grid-2">
                <div class="pca-field">
                  <label>วันที่บันทึก</label>
                  <input type="text" :value="selectedItem.clearing.bookDate" disabled />
                </div>
                <div class="pca-field">
                  <label>ชำระโดย</label>
                  <input type="text" :value="selectedItem.clearing.payMethodLabel || 'ยอดตรงตามยอดเบิก — ไม่มีการชำระเพิ่มเติม'" disabled />
                </div>
              </div>

              <div class="pca-form-grid pca-form-grid-1" v-if="selectedItem.clearing.note">
                <div class="pca-field">
                  <label>หมายเหตุ</label>
                  <textarea :value="selectedItem.clearing.note" rows="2" disabled></textarea>
                </div>
              </div>

              <div class="pca-table-wrap">
                <table class="pca-table">
                  <thead>
                    <tr>
                      <th class="pca-col-num">ลำดับ</th>
                      <th>รหัสรายจ่าย</th>
                      <th>ชื่อรายจ่าย</th>
                      <th>รายละเอียด</th>
                      <th class="pca-col-num">จำนวนเงิน</th>
                      <th>เอกสารอ้างอิง</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in selectedItem.clearing.rows" :key="row.id">
                      <td class="pca-col-num">{{ idx + 1 }}</td>
                      <td>{{ row.code }}</td>
                      <td>{{ row.name }}</td>
                      <td>{{ row.detail }}</td>
                      <td class="pca-col-num">{{ formatAmount(row.amount) }}</td>
                      <td>{{ row.docRef }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="pca-charges-footer">
                <div class="pca-footer-row">
                  <span>ยอดเคลียร์รวม</span>
                  <div class="pca-total-box">{{ formatAmount(selectedItem.clearing.total) }} บาท</div>
                </div>
              </div>
            </template>
            <template v-else-if="selectedItem.status === 'awaiting-clear'">

            <div class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>วันที่บันทึก<span class="pca-req">*</span></label>
                <input type="date" v-model="clearForm.bookDate" />
              </div>
              <div class="pca-field">
                <label>วันที่ครบกำหนดเคลียร์<span class="pca-req">*</span></label>
                <input type="date" v-model="clearForm.dueDate" />
              </div>
            </div>

            <div class="pca-charges-header">
              <h2 class="pca-card-title" style="margin:0">รายการค่าใช้จ่าย</h2>
              <button type="button" class="pca-btn pca-btn-outline pca-btn-sm" @click="addClearRow">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>
                เพิ่มรายการ
              </button>
            </div>

            <div class="pca-table-wrap">
              <table class="pca-table">
                <thead>
                  <tr>
                    <th class="pca-col-num">ลำดับ</th>
                    <th>รหัสรายจ่าย</th>
                    <th>ชื่อรายจ่าย</th>
                    <th>รายละเอียด</th>
                    <th class="pca-col-num">จำนวนเงิน</th>
                    <th>เอกสารอ้างอิง</th>
                    <th class="pca-col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="clearRows.length === 0">
                    <td colspan="7" class="pca-empty">ไม่มีรายการค่าใช้จ่าย</td>
                  </tr>
                  <tr v-for="(row, idx) in clearRows" :key="row.id">
                    <td class="pca-col-num">{{ idx + 1 }}</td>
                    <td><input type="text" v-model="row.code" class="pca-table-input" placeholder="รหัส" /></td>
                    <td>
                      <input
                        type="text"
                        v-model="row.name"
                        class="pca-table-input"
                        autocomplete="off"
                        placeholder="เลือก หรือ พิมพ์ชื่อรายจ่าย"
                        @focus="openExpenseMenu(row, $event)"
                        @click="openExpenseMenu(row, $event)"
                        @blur="closeExpenseMenu"
                        @keydown.esc="closeExpenseMenu"
                      />
                    </td>
                    <td><input type="text" v-model="row.detail" class="pca-table-input" maxlength="100" placeholder="รายละเอียด" /></td>
                    <td class="pca-col-num"><input type="number" v-model.number="row.amount" class="pca-table-input pca-table-input-num" placeholder="0.00" /></td>
                    <td><input type="text" v-model="row.docRef" class="pca-table-input" placeholder="เอกสารอ้างอิง" /></td>
                    <td class="pca-col-actions">
                      <button type="button" class="pca-row-ic-btn pca-row-ic-danger" title="ลบ" @click="removeClearRow(idx)">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10"/></svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Teleport to="body">
                <ul
                  v-if="expenseMenu"
                  class="pcv2-expense-menu"
                  :style="{ top: expenseMenu.top + 'px', left: expenseMenu.left + 'px', minWidth: expenseMenu.width + 'px', maxHeight: expenseMenu.maxH + 'px' }"
                >
                  <li
                    v-for="n in EXPENSE_NAMES"
                    :key="n"
                    class="pcv2-expense-option"
                    :class="{ active: expenseMenu.row.name === n }"
                    @mousedown.prevent="pickExpenseName(n)"
                  >{{ n }}</li>
                </ul>
              </Teleport>
            </div>

            <div class="pca-charges-footer">
              <div class="pca-footer-row">
                <span v-if="clearDiff < 0" class="pcv2-diff-tag pcv2-diff-tag--under">น้อยกว่ายอดเบิก</span>
                <span v-else-if="clearDiff > 0" class="pcv2-diff-tag pcv2-diff-tag--over">มากกว่ายอดเบิก</span>
                <span>ยอดรวม</span>
                <div class="pca-total-box">{{ formatAmount(clearTotal) }} บาท</div>
              </div>
              <div class="pca-footer-row">
                <span>ยอดเบิก</span>
                <div class="pca-total-box">{{ formatAmount(selectedItem.amount) }} บาท</div>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-1" style="margin-top:16px">
              <div class="pca-field">
                <div class="pca-field-label-row">
                  <label>หมายเหตุ</label>
                  <span class="pca-char-count">{{ clearForm.note.length }}/255</span>
                </div>
                <textarea v-model="clearForm.note" rows="2" maxlength="255" placeholder="ระบุหมายเหตุ"></textarea>
              </div>
            </div>
              <div v-if="clearDiff !== 0" class="pcv2-inline-pay">
              <div class="pcv2-inline-pay-title">วิธีการชำระ</div>
            <div class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>ชำระโดย<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <select v-model="clearForm.payMethod">
                    <option v-for="opt in PAY_METHODS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-if="clearForm.payMethod === 'cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="clearForm.amount" min="0" placeholder="0.00" />
              </div>
            </div>

            <div v-else-if="clearForm.payMethod === 'petty-cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="clearForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>รายการเงินสดย่อย (เลขที่เอกสาร)</label>
                <div class="pca-input-icon">
                  <select v-model="clearForm.pettyCashDocNo">
                    <option value="" disabled>เลือกเลขที่เอกสาร</option>
                    <option v-for="doc in PETTY_CASH_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-else-if="clearForm.payMethod === 'advance-received'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="clearForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>อ้างอิงรับเงินล่วงหน้า</label>
                <div class="pca-input-icon">
                  <select v-model="clearForm.advanceRefNo">
                    <option value="" disabled>เลือกเอกสารอ้างอิง</option>
                    <option v-for="doc in ADVANCE_RECEIVED_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <div v-else-if="clearForm.payMethod === 'bank-kbank'" class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="clearForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>วันที่</label>
                <input type="date" v-model="clearForm.bankDate" />
              </div>
              <div class="pca-field">
                <label>หลักฐานการชำระเงิน</label>
                <button type="button" class="pca-btn pca-btn-primary pca-btn-sm" @click="showUploadToast">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13V4M6.5 7.5L10 4l3.5 3.5"/><path d="M4 13v2a1 1 0 001 1h10a1 1 0 001-1v-2"/></svg>
                  อัปโหลดไฟล์
                </button>
              </div>
            </div>

            <template v-else-if="clearForm.payMethod === 'check'">
              <div class="pca-form-grid pca-form-grid-1">
                <div class="pca-field">
                  <label>เลือกเอกสารเลขที่ หรือสร้างใหม่</label>
                  <div class="pca-check-mode-toggle">
                    <button type="button" class="pca-mode-btn" :class="{ active: clearForm.checkMode === 'existing' }" @click="clearForm.checkMode = 'existing'">เลือกเอกสารเดิม</button>
                    <button type="button" class="pca-mode-btn" :class="{ active: clearForm.checkMode === 'new' }" @click="clearForm.checkMode = 'new'">สร้างใหม่</button>
                  </div>
                </div>
              </div>

              <div class="pca-form-grid" :class="clearForm.checkMode === 'existing' ? 'pca-form-grid-3' : 'pca-form-grid-2'">
                <div class="pca-field" v-if="clearForm.checkMode === 'existing'">
                  <label>เลขที่เช็ค</label>
                  <div class="pca-input-icon">
                    <select v-model="clearForm.checkDocNo">
                      <option value="" disabled>เลือกเลขที่เช็ค</option>
                      <option v-for="chq in CHECK_DOCS" :key="chq.docNo" :value="chq.docNo">{{ chq.docNo }} — {{ formatAmount(chq.amount) }} บาท</option>
                    </select>
                    <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                  </div>
                </div>
                <div class="pca-field" v-else>
                  <label>เลขที่เช็คใหม่</label>
                  <input type="text" v-model="clearForm.checkNewNo" placeholder="ระบุเลขที่เช็ค" />
                </div>
                <div class="pca-field">
                  <label>จำนวนเงิน (ขึ้นตามเช็ค)</label>
                  <input type="number" :value="clearCheckAmount" @input="onCheckAmountInput(clearForm, $event)" :disabled="clearForm.checkMode === 'existing'" placeholder="0.00" />
                </div>
              </div>

              <div v-if="clearForm.checkMode === 'new'" class="pca-paired-check-title">รายละเอียดเช็คประกบ<span class="pca-req">*</span></div>

              <div v-if="clearForm.checkMode === 'new'" class="pca-paired-check">
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>รายละเอียดเช็ค</label>
                    <textarea v-model="clearForm.pairedCheck.detail" rows="2" placeholder="ระบุรายละเอียดเช็ค"></textarea>
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-2">
                  <div class="pca-field">
                    <label>วันที่ชำระ</label>
                    <input type="date" v-model="clearForm.pairedCheck.paymentDate" />
                  </div>
                  <div class="pca-field">
                    <label>วันที่ครบกำหนด</label>
                    <input type="date" v-model="clearForm.pairedCheck.dueDate" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>ผู้จัดจำหน่าย</label>
                    <input type="text" v-model="clearForm.pairedCheck.vendor" placeholder="ระบุผู้จัดจำหน่าย" />
                  </div>
                  <div class="pca-field">
                    <label>ประเภทการชำระ</label>
                    <div class="pca-input-icon">
                      <select v-model="clearForm.pairedCheck.paymentType">
                        <option value="" disabled>เลือกประเภทการชำระ</option>
                        <option v-for="t in PAYMENT_TYPES" :key="t" :value="t">{{ t }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>ชื่อพนักงาน</label>
                    <input type="text" v-model="clearForm.pairedCheck.employeeName" placeholder="ระบุชื่อพนักงาน" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>จ่ายจากบัญชี</label>
                    <div class="pca-input-icon">
                      <select v-model="clearForm.pairedCheck.payFromAccount">
                        <option value="" disabled>เลือกบัญชี</option>
                        <option v-for="a in PAY_FROM_ACCOUNTS" :key="a" :value="a">{{ a }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>สถานะ</label>
                    <div class="pca-input-icon">
                      <select v-model="clearForm.pairedCheck.status">
                        <option value="" disabled>เลือกสถานะ</option>
                        <option v-for="s in CHECK_STATUSES" :key="s" :value="s">{{ s }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>วันที่หักจากบัญชี</label>
                    <input type="date" v-model="clearForm.pairedCheck.accountDeductDate" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>ชื่อผู้รับ</label>
                    <input type="text" v-model="clearForm.pairedCheck.payeeName" placeholder="ระบุชื่อผู้รับ" />
                  </div>
                </div>
              </div>
            </template>
              </div>
              <div class="pcv2-inline-pay-actions">
                <button type="button" class="pca-btn pca-btn-primary" :disabled="!canSaveClear" @click="saveClear">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h10l2 2v10H4z"/><path d="M7 4v4h6V4M6 16v-5h8v5"/></svg>
                  บันทึกการเคลียร์
                </button>
              </div>
            </template>
            <div v-else class="pca-empty">{{ selectedItem.status === 'awaiting-disburse' ? 'ต้องเบิกเงินทดรองจ่ายก่อน จึงจะสามารถเคลียร์ได้' : 'ยังไม่มีการเคลียร์เงินทดรองจ่ายรายการนี้' }}</div>
          </div>
          </div>
        </template>
      </div>
    </div>

    <transition name="pca-toast-fade">
      <div v-if="toast" class="pca-toast">{{ toast }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const PAY_METHODS = [
  { value: 'cash', label: 'เงินสด' },
  { value: 'petty-cash', label: 'เงินสดย่อย' },
  { value: 'advance-received', label: 'รับเงินล่วงหน้า' },
  { value: 'bank-kbank', label: 'ธนาคารกสิกรไทย ออมทรัพย์ 718-2-68929-1' },
  { value: 'check', label: 'เช็ค' }
]
const PETTY_CASH_DOCS = ['PC-0001', 'PC-0002', 'PC-0003']
const ADVANCE_RECEIVED_DOCS = ['ADR-0001', 'ADR-0002']
const CHECK_DOCS = [
  { docNo: 'CHQ-1001', amount: 15000 },
  { docNo: 'CHQ-1002', amount: 8000 },
  { docNo: 'CHQ-1003', amount: 22000 }
]
const PAYMENT_TYPES = ['เช็คสั่งจ่ายตรง', 'เช็คขีดคร่อม A/C Payee Only']
const PAY_FROM_ACCOUNTS = ['ธนาคารกสิกรไทย ออมทรัพย์ 718-2-68929-1', 'ธนาคารไทยพาณิชย์ ออมทรัพย์ 111-2-22222-3']
const CHECK_STATUSES = ['รอสั่งจ่าย', 'สั่งจ่ายแล้ว', 'ยกเลิก']
const EXPENSE_NAMES = ['ค่าเดินทาง', 'ค่าที่พัก', 'ค่าอาหาร', 'ค่าน้ำมันเชื้อเพลิง', 'ค่าจัดซื้ออุปกรณ์สำนักงาน', 'ค่าซ่อมบำรุง', 'ค่าใช้จ่ายจัดกิจกรรม', 'อื่นๆ']

const FILTERS = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'awaiting-disburse', label: 'รอเบิก' },
  { value: 'awaiting-clear', label: 'รอเคลียร์' },
  { value: 'cleared', label: 'เคลียร์แล้ว' }
]
const STATUS_LABELS = { 'awaiting-disburse': 'รอเบิก', 'awaiting-clear': 'รอเคลียร์', cleared: 'เคลียร์แล้ว' }
function statusLabel(status) {
  return STATUS_LABELS[status] || status
}

// ---- date helpers (native date input <-> Thai display DD/MM/YYYY, พ.ศ.) ----
function pad(n) { return String(n).padStart(2, '0') }
function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
function isoToThaiDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${Number(y) + 543}`
}

function formatAmount(n) {
  return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const page = ref('list') // 'list' | 'create' | 'detail'

const breadcrumbMap = {
  list: ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย'],
  create: ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'สร้างเงินทดรองจ่าย'],
  detail: ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'รายละเอียดเงินทดรองจ่าย'],
  disburse: ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'เบิกเงินทดรองจ่าย'],
  clear: ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'เคลียร์เงินทดรองจ่าย']
}
const breadcrumb = computed(() => breadcrumbMap[page.value])

let itemSeq = 5
const items = ref([
  {
    id: 1, docNo: 'ADV-0001', bookDate: '01/09/2569', dueDate: '15/09/2569', payee: 'สมชาย ใจดี',
    description: 'ค่าเดินทางไปดูงานโครงการ', payMethod: 'เงินสด', amount: 5000, status: 'cleared',
    clearing: {
      bookDate: '16/09/2569', payMethodLabel: 'เงินสด', note: 'ค่าเดินทางไปดูงานโครงการ', total: 5000,
      rows: [{ id: 1, code: 'ADV', name: 'ค่าเดินทางไปดูงานโครงการ', detail: '', amount: 5000, docRef: 'ADV-0001' }]
    }
  },
  { id: 2, docNo: 'ADV-0002', bookDate: '05/09/2569', dueDate: '20/09/2569', payee: 'วรรณา สุขใจ', description: 'สำรองจ่ายค่าซ่อมบำรุงส่วนกลาง', payMethod: 'เช็ค', amount: 12000, status: 'awaiting-clear' },
  { id: 3, docNo: 'ADV-0003', bookDate: '10/09/2569', dueDate: '25/09/2569', payee: 'ประยุทธ มั่นคง', description: 'ค่าใช้จ่ายจัดกิจกรรมนิติบุคคล', payMethod: 'ธนาคารกสิกรไทย ออมทรัพย์ 718-2-68929-1', amount: 8500, status: 'awaiting-clear' },
  { id: 4, docNo: 'ADV-0004', bookDate: '20/09/2569', dueDate: '05/10/2569', payee: 'กมล ตั้งใจ', description: 'ค่าจัดซื้ออุปกรณ์สำนักงานส่วนกลาง', payMethod: '', amount: null, status: 'awaiting-disburse' }
])

const activeFilter = ref('all')
const filterCounts = computed(() => ({
  all: items.value.length,
  'awaiting-disburse': items.value.filter(i => i.status === 'awaiting-disburse').length,
  'awaiting-clear': items.value.filter(i => i.status === 'awaiting-clear').length,
  cleared: items.value.filter(i => i.status === 'cleared').length
}))
const filteredItems = computed(() =>
  items.value
    .filter(i => activeFilter.value === 'all' || i.status === activeFilter.value)
    .slice()
    .sort((a, b) => b.id - a.id)
)

const nextDocNo = computed(() => 'ADV-' + String(itemSeq).padStart(4, '0'))

const toast = ref('')
let toastTimer = null
function showToast(message) {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 2200)
}
function showUploadToast() {
  showToast('อัปโหลดไฟล์ (ตัวอย่างสาธิต)')
}

function onDateInputClick(event) {
  const target = event.target
  if (target?.tagName === 'INPUT' && target.type === 'date' && typeof target.showPicker === 'function') {
    try { target.showPicker() } catch { /* ignored: unsupported in this browser */ }
  }
}

function checkAmountFor(form) {
  if (form.checkMode === 'existing') {
    const found = CHECK_DOCS.find(c => c.docNo === form.checkDocNo)
    return found ? found.amount : 0
  }
  return form.amount || 0
}
function onCheckAmountInput(form, event) {
  form.amount = event.target.value === '' ? null : Number(event.target.value)
}

// ---- create ----
function blankCreateForm() {
  return {
    bookDate: todayIso(),
    dueDate: '',
    description: '',
    payee: '',
    ...blankPayMethodForm()
  }
}
const createForm = ref(blankCreateForm())
const createCheckAmount = computed(() => checkAmountFor(createForm.value))
const createAmount = computed(() => createForm.value.payMethod === 'check' ? createCheckAmount.value : (createForm.value.amount || 0))

const canSaveCreate = computed(() =>
  createForm.value.bookDate !== '' && createForm.value.dueDate !== ''
)

function openCreate() {
  createForm.value = blankCreateForm()
  page.value = 'create'
}

function saveCreate() {
  const amount = createAmount.value
  const payMethodLabel = PAY_METHODS.find(m => m.value === createForm.value.payMethod)?.label || createForm.value.payMethod
  items.value.push({
    id: itemSeq,
    docNo: nextDocNo.value,
    bookDate: isoToThaiDate(createForm.value.bookDate),
    dueDate: isoToThaiDate(createForm.value.dueDate),
    payee: createForm.value.payee || '—',
    description: createForm.value.description || '—',
    payMethod: amount > 0 ? payMethodLabel : '',
    amount: amount > 0 ? amount : null,
    status: amount > 0 ? 'awaiting-clear' : 'awaiting-disburse'
  })
  itemSeq++
  showToast('สร้างเงินทดรองจ่ายเรียบร้อยแล้ว')
  page.value = 'list'
}

// ---- detail ----
const selectedItem = ref(null)

const DETAIL_LAYOUT_KEY = 'pcv2-detail-layout'
function readDetailLayout() {
  try { return localStorage.getItem(DETAIL_LAYOUT_KEY) === '2col' ? '2col' : '1col' } catch { return '1col' }
}
const detailLayout = ref(readDetailLayout()) // '1col' | '2col'
function setDetailLayout(layout) {
  detailLayout.value = layout
  try { localStorage.setItem(DETAIL_LAYOUT_KEY, layout) } catch {}
}
function openDetail(item) {
  selectedItem.value = item
  disburseForm.value = blankPayMethodForm()
  clearForm.value = blankClearForm(item)
  clearRows.value = []
  page.value = 'detail'
}

// ---- disburse ----
function blankPayMethodForm() {
  return {
    payMethod: 'cash',
    amount: null,
    pettyCashDocNo: '',
    advanceRefNo: '',
    bankDate: '',
    checkMode: 'existing',
    checkDocNo: '',
    checkNewNo: '',
    pairedCheck: {
      detail: '', paymentDate: '', dueDate: '', vendor: '', paymentType: '',
      employeeName: '', payFromAccount: '', status: '', accountDeductDate: '', payeeName: ''
    }
  }
}
const disburseForm = ref(blankPayMethodForm())
const disburseCheckAmount = computed(() => checkAmountFor(disburseForm.value))
const disburseAmount = computed(() => disburseForm.value.payMethod === 'check' ? disburseCheckAmount.value : (disburseForm.value.amount || 0))

const canSaveDisburse = computed(() => disburseAmount.value > 0)

function openDisburse(item) {
  selectedItem.value = item
  disburseForm.value = blankPayMethodForm()
  page.value = 'detail'
}

function saveDisburse() {
  const item = selectedItem.value
  if (!item) return
  const payMethodLabel = PAY_METHODS.find(m => m.value === disburseForm.value.payMethod)?.label || disburseForm.value.payMethod
  item.payMethod = payMethodLabel
  item.amount = disburseAmount.value
  item.status = 'awaiting-clear'
  showToast('บันทึกการเบิกเงินทดรองจ่ายเรียบร้อยแล้ว')
}

// ---- clear ----
let clearRowSeq = 100
function blankClearForm(item) {
  return {
    bookDate: todayIso(),
    dueDate: isoOfThaiDate(item.dueDate),
    note: item.description === '—' ? '' : item.description,
    payMethod: 'cash',
    amount: null,
    pettyCashDocNo: '',
    advanceRefNo: '',
    bankDate: '',
    checkMode: 'existing',
    checkDocNo: '',
    checkNewNo: '',
    pairedCheck: {
      detail: '', paymentDate: '', dueDate: '', vendor: '', paymentType: '',
      employeeName: '', payFromAccount: '', status: '', accountDeductDate: '', payeeName: ''
    }
  }
}
function isoOfThaiDate(thai) {
  if (!thai) return ''
  const [d, m, y] = thai.split('/')
  if (!d || !m || !y) return ''
  return `${Number(y) - 543}-${m}-${d}`
}

const clearForm = ref(blankClearForm({ dueDate: '', description: '' }))
const clearRows = ref([])

// dropdown for expense names — fixed-position so the scrollable table can't clip it
const expenseMenu = ref(null)
function openExpenseMenu(row, e) {
  const r = e.target.getBoundingClientRect()
  const menuH = Math.min(260, EXPENSE_NAMES.length * 37 + 10)
  const below = window.innerHeight - r.bottom - 8
  // not enough room under the input -> open upwards, so the list is never pushed off-screen
  const flip = below < menuH && r.top > below
  const maxH = Math.max(120, Math.min(menuH, flip ? r.top - 8 : below))
  const top = flip ? r.top - 4 - maxH : r.bottom + 4
  expenseMenu.value = { row, top, left: r.left, width: r.width, maxH }
}
function closeExpenseMenu() { expenseMenu.value = null }
function pickExpenseName(name) {
  if (expenseMenu.value) expenseMenu.value.row.name = name
  closeExpenseMenu()
}
onMounted(() => {
  window.addEventListener('scroll', closeExpenseMenu, true)
  window.addEventListener('resize', closeExpenseMenu)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', closeExpenseMenu, true)
  window.removeEventListener('resize', closeExpenseMenu)
})
const clearCheckAmount = computed(() => checkAmountFor(clearForm.value))
const clearTotal = computed(() => clearRows.value.reduce((sum, r) => sum + (Number(r.amount) || 0), 0))
const clearDiff = computed(() => selectedItem.value ? clearTotal.value - selectedItem.value.amount : 0)

const canSaveClear = computed(() =>
  clearForm.value.bookDate !== '' && clearForm.value.dueDate !== '' && clearRows.value.length > 0
)

function openClear(item) {
  selectedItem.value = item
  clearForm.value = blankClearForm(item)
  clearRows.value = []
  page.value = 'detail'
}

function addClearRow() {
  clearRows.value.push({ id: clearRowSeq++, code: '', name: '', detail: '', amount: 0, docRef: '' })
}
function removeClearRow(idx) {
  clearRows.value.splice(idx, 1)
}

function saveClear() {
  const item = selectedItem.value
  if (!item) return
  const total = clearTotal.value
  const payMethodLabel = clearDiff.value !== 0
    ? (PAY_METHODS.find(m => m.value === clearForm.value.payMethod)?.label || clearForm.value.payMethod)
    : ''
  item.clearing = {
    bookDate: isoToThaiDate(clearForm.value.bookDate),
    payMethodLabel,
    note: clearForm.value.note,
    total,
    rows: clearRows.value.map(r => ({ ...r }))
  }
  item.dueDate = isoToThaiDate(clearForm.value.dueDate)
  item.status = 'cleared'
  showToast('บันทึกการเคลียร์เงินทดรองจ่ายเรียบร้อยแล้ว')
}
</script>

<style scoped>
.pca-page {
  --pca-sidebar-w: 264px;
  font-family: var(--font-family);
  background: var(--color-disabled-bg);
  min-height: 100vh;
  color: var(--color-text-primary);
}
.pca-page * { box-sizing: border-box; }

.pca-exit {
  flex-shrink: 0;
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-primary-click);
  text-decoration: none;
  background: var(--color-white);
  padding: 6px 12px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-dividers);
  white-space: nowrap;
}
.pca-exit:hover { background: var(--color-disabled-bg); }

/* ---------- SIDEBAR ---------- */
.pca-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--pca-sidebar-w);
  height: 100vh;
  background: var(--color-white);
  border-right: 1px solid var(--color-dividers);
  display: flex;
  flex-direction: column;
  z-index: 40;
}

.pca-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid var(--color-dividers);
  flex-shrink: 0;
}
.pca-brand-mark {
  width: 32px; height: 32px; border-radius: var(--radius-lg); flex-shrink: 0;
  background: linear-gradient(135deg, var(--color-primary-500), #5b9fff);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-white); font-weight: 700; font-size: 13px;
}
.pca-brand-text { display: flex; flex-direction: column; }
.pca-brand-los { font-size: 9px; letter-spacing: 1.5px; color: var(--color-text-tertiary); text-transform: uppercase; }
.pca-brand-pms { font-size: var(--font-size-md); font-weight: 700; color: var(--color-text-primary); }

.pca-search {
  display: flex; align-items: center; gap: 10px;
  margin: 10px 12px; padding: 8px 12px;
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-lg);
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}
.pca-search svg { width: 16px; height: 16px; flex-shrink: 0; }
.pca-search input {
  border: none; outline: none; background: transparent;
  font-family: inherit; font-size: var(--font-size-sm); color: var(--color-text-primary);
  width: 100%; cursor: default;
}
.pca-search input::placeholder { color: var(--color-text-placeholder); }

.pca-nav { flex: 1; overflow-y: auto; padding-bottom: 8px; }

.pca-nav-group-head {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 20px; margin: 3px 8px;
  font-size: var(--font-size-sm); font-weight: 700;
  color: var(--color-primary-500);
  border-radius: var(--radius-lg);
}
.pca-nav-ic { width: 18px; height: 18px; flex-shrink: 0; }
.pca-chev { width: 13px; height: 13px; margin-left: auto; flex-shrink: 0; }

.pca-nav-leaf {
  padding: 8px 20px 8px 46px;
  margin: 1px 8px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  border-radius: var(--radius-lg);
  cursor: default;
}
.pca-nav-leaf--flat { padding-left: 20px; display: flex; align-items: center; gap: 10px; color: var(--color-text-secondary); }

.pca-nav-subgroup-head {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 20px 8px 46px; margin: 1px 8px;
  font-size: var(--font-size-sm); font-weight: 600;
  color: var(--color-text-secondary);
}
.pca-nav-subgroup-head .pca-chev { margin-left: auto; }

.pca-nav-leaf--sub { padding-left: 62px; position: relative; }
.pca-nav-leaf--active {
  background: var(--color-primary-200);
  color: var(--color-primary-500);
  font-weight: 700;
}
.pca-nav-leaf--active::before {
  content: '';
  position: absolute;
  left: 8px; top: 6px; bottom: 6px;
  width: 3px;
  background: var(--color-primary-500);
  border-radius: 0 3px 3px 0;
}

.pca-sidebar-bottom { flex-shrink: 0; padding-top: 6px; }
.pca-divider { height: 1px; background: var(--color-dividers); margin: 6px 16px; }

.pca-user {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px;
}
.pca-user-avatar { position: relative; width: 32px; height: 32px; flex-shrink: 0; }
.pca-user-avatar svg { width: 100%; height: 100%; }
.pca-user-dot {
  position: absolute; right: -2px; bottom: -2px; width: 9px; height: 9px;
  background: var(--color-success); border: 2px solid var(--color-white); border-radius: 50%;
}
.pca-user-info { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.pca-user-name { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-primary); }
.pca-user-status { font-size: 11px; color: var(--color-success); }
.pca-user-more {
  border: none; background: none; cursor: pointer; color: var(--color-text-tertiary);
  width: 22px; height: 22px; flex-shrink: 0;
}

/* ---------- MAIN ---------- */
.pca-main { margin-left: var(--pca-sidebar-w); }

.pca-topbar {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 12px 28px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-dividers);
}
.pca-breadcrumb { font-size: var(--font-size-xs); color: var(--color-text-tertiary); flex-shrink: 0; }
.pca-crumb-sep { margin: 0 6px; color: var(--color-text-placeholder); }
.pca-crumb-current { color: var(--color-text-primary); font-weight: 700; }

.pca-topbar-right { display: flex; align-items: center; gap: 10px; min-width: 0; }

.pca-project-chip {
  display: flex; align-items: center; gap: 8px;
  font-size: var(--font-size-xs); color: var(--color-text-secondary);
  background: var(--color-disabled-bg);
  padding: 6px 12px; border-radius: var(--radius-md);
  min-width: 0;
}
.pca-project-chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pca-project-chip svg { width: 14px; height: 14px; flex-shrink: 0; }
.pca-swap-ic { color: var(--color-text-tertiary); cursor: pointer; }

.pca-content { padding: 24px 28px 60px; }

.pca-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.pca-header-left { display: flex; align-items: center; gap: 10px; }
.pca-title { font-size: 20px; font-weight: 700; color: var(--color-text-primary); }

.pca-back-btn {
  width: 30px; height: 30px; border-radius: 50%;
  border: 1px solid var(--color-stroke); background: var(--color-white);
  color: var(--color-text-secondary); display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
}
.pca-back-btn:hover { border-color: var(--color-primary-500); color: var(--color-primary-500); }
.pca-back-btn svg { width: 16px; height: 16px; }

.pca-btn {
  display: flex; align-items: center; gap: 6px;
  font-family: inherit; font-size: var(--font-size-sm); font-weight: 600;
  border-radius: var(--radius-md);
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid transparent;
}
.pca-btn svg { width: 16px; height: 16px; flex-shrink: 0; }
.pca-btn:disabled { opacity: .5; cursor: not-allowed; }
.pca-btn-sm { padding: 6px 12px; font-size: var(--font-size-xs); }

.pca-btn-primary { background: var(--color-primary-500); color: var(--color-white); }
.pca-btn-primary:hover:not(:disabled) { background: var(--color-primary-click); }

.pca-btn-outline { background: var(--color-white); border-color: var(--color-primary-500); color: var(--color-primary-500); }
.pca-btn-outline:hover:not(:disabled) { background: var(--color-primary-200); }

.pca-card {
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 20px;
}
.pca-card-title { font-size: var(--font-size-md); font-weight: 700; color: var(--color-text-primary); margin-bottom: 16px; }

.pca-form-grid { display: grid; gap: 16px; margin-bottom: 16px; }
.pca-form-grid-1 { grid-template-columns: 1fr; }
.pca-form-grid-2 { grid-template-columns: 1fr 1fr; }
.pca-form-grid-3 { grid-template-columns: 1fr 1fr 1fr; }

.pca-field { display: flex; flex-direction: column; gap: 6px; }
.pca-field > button { align-self: flex-start; width: auto; }
.pca-field label { font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text-secondary); }
.pca-req { color: var(--color-error); margin-left: 2px; }
.pca-field-label-row { display: flex; align-items: center; justify-content: space-between; }
.pca-char-count { font-size: 11px; color: var(--color-text-placeholder); }

.pca-field input[type="text"],
.pca-field input[type="number"],
.pca-field input[type="date"],
.pca-field select,
.pca-field textarea {
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-md);
  padding: 9px 10px;
  font-size: var(--font-size-sm);
  font-family: inherit;
  color: var(--color-text-primary);
  background: var(--color-white);
  width: 100%;
}
.pca-field input:disabled { background: var(--color-disabled-bg); color: var(--color-text-disabled); }
.pca-field input:focus, .pca-field select:focus, .pca-field textarea:focus { outline: none; border-color: var(--color-primary-500); }
.pca-field textarea { resize: vertical; }

.pca-input-icon { position: relative; display: flex; align-items: center; }
.pca-input-icon select { padding-right: 32px; appearance: none; }
.pca-field-ic {
  position: absolute; right: 10px; width: 16px; height: 16px;
  color: var(--color-text-tertiary); pointer-events: none;
}

.pca-check-mode-toggle { display: flex; gap: 8px; }
.pca-mode-btn {
  font-family: inherit; font-size: var(--font-size-sm); font-weight: 600;
  padding: 8px 16px; border-radius: var(--radius-md);
  border: 1px solid var(--color-stroke); background: var(--color-white);
  color: var(--color-text-secondary); cursor: pointer;
}
.pca-mode-btn:hover { border-color: var(--color-primary-500); color: var(--color-primary-500); }
.pca-mode-btn.active { border-color: var(--color-primary-500); background: var(--color-primary-200); color: var(--color-primary-500); }

.pca-paired-check-title {
  font-size: var(--font-size-sm); font-weight: 700; color: var(--color-text-primary);
  margin-bottom: 12px;
}

.pca-paired-check {
  border: 1px dashed var(--color-dividers);
  border-radius: var(--radius-lg);
  padding: 16px;
  background: var(--color-disabled-bg);
}

.pca-charges-header { display: flex; align-items: center; justify-content: space-between; margin: 8px 0 12px; }

.pca-table-wrap { overflow-x: auto; }
.pca-table { width: 100%; border-collapse: collapse; }
.pca-table th {
  text-align: left; font-size: var(--font-size-xs); font-weight: 700;
  color: var(--color-text-tertiary); padding: 10px 12px;
  border-bottom: 1px solid var(--color-dividers);
  white-space: nowrap;
}
.pca-table td {
  font-size: var(--font-size-sm); color: var(--color-text-primary);
  padding: 10px 12px; border-bottom: 1px solid var(--color-dividers);
  vertical-align: middle;
}
.pca-col-num { text-align: right; }
.pca-col-actions { text-align: right; width: 1%; white-space: nowrap; }
.pca-cell-strong { font-weight: 700; color: var(--color-text-primary); }
.pca-empty { text-align: center; color: var(--color-text-tertiary); padding: 24px 12px; }

.pca-table-input {
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-sm);
  padding: 6px 8px;
  font-family: inherit;
  font-size: var(--font-size-sm);
  width: 100%;
  min-width: 100px;
}
.pca-table-input:focus { outline: none; border-color: var(--color-primary-500); }
.pca-table-input-num { text-align: right; min-width: 90px; }

.pca-row-ic-btn {
  border: none; background: none; cursor: pointer;
  width: 28px; height: 28px; border-radius: var(--radius-sm);
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--color-text-tertiary);
}
.pca-row-ic-btn svg { width: 15px; height: 15px; }
.pca-row-ic-danger:hover { background: var(--color-error-bg); color: var(--color-error); }

.pca-charges-footer { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; margin-top: 16px; }
.pca-footer-row { display: flex; align-items: center; gap: 12px; font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.pca-total-box {
  min-width: 160px; text-align: right;
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-md);
  background: var(--color-disabled-bg);
  padding: 8px 12px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.pca-link-btn {
  border: none; background: none; cursor: pointer;
  font-size: var(--font-size-sm); font-weight: 600; color: var(--color-primary-500);
  padding: 4px 6px;
}
.pca-link-btn:hover { text-decoration: underline; }
.pca-link-btn + .pca-link-btn { margin-left: 4px; }

.pca-status {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: var(--font-size-xs); font-weight: 600;
  padding: 3px 10px; border-radius: 999px;
  white-space: nowrap;
}
.pca-status--awaiting-disburse { background: var(--color-attention-bg); color: var(--color-attention); }
.pca-status--awaiting-clear { background: var(--color-primary-200); color: var(--color-primary-click); }
.pca-status--cleared { background: var(--color-success-bg); color: var(--color-success); }

.pca-toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  background: var(--color-text-primary); color: var(--color-white);
  padding: 10px 18px; border-radius: var(--radius-md);
  font-size: var(--font-size-sm); z-index: 200;
}
.pca-toast-fade-enter-active, .pca-toast-fade-leave-active { transition: opacity .2s ease; }
.pca-toast-fade-enter-from, .pca-toast-fade-leave-to { opacity: 0; }

/* ---------- V2-SPECIFIC ---------- */
.pcv2-filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.pcv2-filter-pill {
  display: flex; align-items: center; gap: 8px;
  font-family: inherit; font-size: var(--font-size-sm); font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: 999px;
  padding: 7px 14px;
  cursor: pointer;
}
.pcv2-filter-pill:hover { border-color: var(--color-primary-500); color: var(--color-primary-500); }
.pcv2-filter-pill.active { background: var(--color-primary-500); border-color: var(--color-primary-500); color: var(--color-white); }
.pcv2-filter-count {
  font-size: 11px; font-weight: 700;
  background: rgba(0,0,0,.08);
  border-radius: 999px;
  padding: 1px 7px;
  min-width: 20px; text-align: center;
}
.pcv2-filter-pill.active .pcv2-filter-count { background: rgba(255,255,255,.25); }

.pcv2-summary-card { padding: 16px 24px; }
.pcv2-summary-card .pca-card-title { margin-bottom: 10px; font-size: var(--font-size-sm); }
.pcv2-summary-row { display: flex; flex-wrap: wrap; gap: 20px; }
.pcv2-summary-item { display: flex; flex-direction: column; gap: 2px; min-width: 120px; }
.pcv2-summary-item-grow { flex: 1; min-width: 200px; }
.pcv2-summary-label { font-size: 11px; color: var(--color-text-tertiary); }
.pcv2-summary-value { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-primary); }

.pcv2-optional-tag {
  font-size: 11px; font-weight: 500;
  color: var(--color-text-tertiary);
  background: var(--color-disabled-bg);
  padding: 2px 8px;
  border-radius: 999px;
  margin-left: 8px;
  vertical-align: middle;
}

.pcv2-diff-tag {
  font-size: var(--font-size-xs); font-weight: 600;
  padding: 3px 10px; border-radius: 999px;
  margin-right: auto;
}
.pcv2-diff-tag--under { background: var(--color-attention-bg); color: var(--color-attention); }
.pcv2-diff-tag--over { background: var(--color-error-bg); color: var(--color-error); }

.pcv2-list-table-wrap td, .pcv2-list-table-wrap th { white-space: nowrap; }
.pcv2-list-table-wrap .pca-table { min-width: 1100px; }

.pcv2-row-clickable { cursor: pointer; user-select: none; }
.pcv2-row-clickable:hover td { background: var(--color-disabled-bg); }

.pcv2-col-sticky {
  position: sticky;
  right: 0;
  background: var(--color-white);
  box-shadow: -8px 0 8px -8px rgba(0,0,0,.2);
}
th.pcv2-col-sticky { z-index: 2; }
td.pcv2-col-sticky { z-index: 1; }

.pcv2-row-actions { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }

.pca-icon-btn {
  width: 32px; height: 32px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-text-secondary);
  cursor: pointer;
}
.pca-icon-btn svg { width: 17px; height: 17px; }
.pca-icon-btn:hover { border-color: var(--color-primary-500); color: var(--color-primary-500); }

.pcv2-inline-pay { border-top: 1px solid var(--color-dividers); margin-top: 4px; padding-top: 16px; }
.pcv2-inline-pay-title { font-size: var(--font-size-sm); font-weight: 700; color: var(--color-text-primary); margin-bottom: 12px; }
.pcv2-inline-pay-actions { display: flex; justify-content: flex-start; margin-top: 4px; }

.pcv2-expense-menu {
  position: fixed; z-index: 300;
  margin: 0; padding: 4px; list-style: none;
  max-height: 260px; overflow-y: auto;
  background: var(--color-white);
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 24px rgba(0,0,0,.14);
  font-family: var(--font-family);
}
.pcv2-expense-option {
  padding: 8px 10px; border-radius: var(--radius-sm);
  font-size: var(--font-size-sm); color: var(--color-text-primary);
  cursor: pointer;
}
.pcv2-expense-option:hover { background: var(--color-disabled-bg); }
.pcv2-expense-option.active { background: var(--color-primary-200); color: var(--color-primary-click); font-weight: 600; }

/* ---------- DETAIL LAYOUT TOGGLE ---------- */
.pcv2-layout-toggle {
  display: inline-flex; gap: 2px; padding: 3px;
  background: var(--color-white);
  border: 1px solid var(--color-dividers);
  border-radius: var(--radius-md);
}
.pcv2-layout-btn {
  display: flex; align-items: center; gap: 6px;
  font-family: inherit; font-size: var(--font-size-xs); font-weight: 600;
  color: var(--color-text-secondary);
  background: transparent; border: none;
  border-radius: var(--radius-sm);
  padding: 6px 10px; cursor: pointer;
}
.pcv2-layout-btn svg { width: 16px; height: 16px; flex-shrink: 0; }
.pcv2-layout-btn:hover:not(.active) { color: var(--color-primary-500); }
.pcv2-layout-btn.active { background: var(--color-primary-200); color: var(--color-primary-click); }

.pcv2-detail-layout--2col {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}
.pcv2-detail-layout--2col > .pca-card { margin-bottom: 0; }
/* each column is half-width, so squeeze the inner 3-column rows */
.pcv2-detail-layout--2col .pca-form-grid-3 { grid-template-columns: 1fr 1fr; }

/* ---------- RESPONSIVE ---------- */
.pca-content { width: 100%; }
.pca-header-row { gap: 12px; flex-wrap: wrap; }
.pca-header-left { min-width: 0; }
.pca-charges-header { gap: 12px; flex-wrap: wrap; }
.pca-table-wrap { -webkit-overflow-scrolling: touch; }

@media (max-width: 1200px) {
  .pca-form-grid-3 { grid-template-columns: 1fr 1fr; }
  .pcv2-detail-layout--2col .pca-form-grid-2,
  .pcv2-detail-layout--2col .pca-form-grid-3 { grid-template-columns: 1fr; }
}

@media (max-width: 1024px) {
  .pcv2-layout-toggle { display: none; }
  .pcv2-detail-layout--2col { display: block; }
  .pcv2-detail-layout--2col > .pca-card { margin-bottom: 20px; }
}

@media (max-width: 900px) {
  .pca-sidebar { display: none; }
  .pca-main { margin-left: 0; }
  .pca-topbar { padding: 12px 20px; }
  .pca-content { padding: 20px 20px 48px; }
  .pca-form-grid-2, .pca-form-grid-3 { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .pca-topbar { padding: 10px 16px; gap: 8px; }
  .pca-breadcrumb { display: none; }
  .pca-topbar-right { flex: 1; justify-content: flex-end; }
  .pca-content { padding: 16px 16px 40px; }
  .pca-card { padding: 16px; margin-bottom: 16px; }
  .pca-title { font-size: 18px; }
  .pca-header-row > .pca-btn,
  .pca-header-row > div:last-child:not(.pca-header-left) { flex-shrink: 0; }
  .pca-charges-footer { align-items: stretch; }
  .pca-footer-row { justify-content: space-between; }
  .pca-total-box { min-width: 0; flex: 1; }
  .pca-toast { width: calc(100% - 32px); text-align: center; }
  .pca-modal-toolbar { margin-bottom: 8px; }
}
</style>
