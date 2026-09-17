<template>
  <div class="pca-page">
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
          <router-link class="pca-exit" to="/">← หน้าหลัก</router-link>
        </div>
      </div>

      <div class="pca-content">
        <!-- ================= REQUEST LIST ================= -->
        <template v-if="page === 'request-list'">
          <div class="pca-tabs">
            <button type="button" class="pca-tab" :class="{ active: true }">รายการคำขอ</button>
            <button type="button" class="pca-tab" @click="page = 'clearing-list'">รายการเคลียร์</button>
          </div>

          <div class="pca-header-row">
            <h1 class="pca-title">รายการเงินทดรองจ่าย</h1>
            <button type="button" class="pca-btn pca-btn-primary" @click="openCreateRequest">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>
              สร้างเงินทดรองจ่าย
            </button>
          </div>

          <div class="pca-card">
            <table class="pca-table">
              <thead>
                <tr>
                  <th>เลขที่เอกสาร</th>
                  <th>วันที่บันทึก</th>
                  <th>วันที่ครบกำหนดเคลียร์</th>
                  <th>ผู้เบิก</th>
                  <th>คำอธิบาย</th>
                  <th>ชำระโดย</th>
                  <th class="pca-col-num">จำนวนเงิน</th>
                  <th class="pca-col-num">เคลียร์แล้ว</th>
                  <th>สถานะ</th>
                  <th class="pca-col-actions"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="requests.length === 0">
                  <td colspan="10" class="pca-empty">ยังไม่มีรายการเงินทดรองจ่าย</td>
                </tr>
                <tr v-for="req in requests" :key="req.id" class="pca-row-clickable" @dblclick="openRequestDetail(req)" title="ดับเบิลคลิกเพื่อดูรายละเอียด">
                  <td class="pca-cell-strong">{{ req.docNo }}</td>
                  <td>{{ req.bookDate }}</td>
                  <td>{{ req.dueDate }}</td>
                  <td>{{ req.payee }}</td>
                  <td>{{ req.description }}</td>
                  <td>{{ req.payMethod }}</td>
                  <td class="pca-col-num">{{ formatAmount(req.amount) }}</td>
                  <td class="pca-col-num">{{ formatAmount(req.clearedAmount) }}</td>
                  <td><span class="pca-status" :class="'pca-status--' + req.status">{{ statusLabel(req.status) }}</span></td>
                  <td class="pca-col-actions">
                    <button
                      v-if="req.status !== 'cleared'"
                      type="button"
                      class="pca-link-btn"
                      @click="openClearingFor(req)"
                    >
                      เคลียร์
                    </button>
                    <span v-else class="pca-muted-text">เคลียร์แล้ว</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- ================= CREATE REQUEST ================= -->
        <template v-else-if="page === 'request-create'">
          <div class="pca-header-row">
            <div class="pca-header-left">
              <button type="button" class="pca-back-btn" @click="page = 'request-list'">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>
              </button>
              <h1 class="pca-title">สร้างเงินทดรองจ่าย</h1>
            </div>
            <button type="button" class="pca-btn pca-btn-primary" :disabled="!canSaveRequest" @click="saveRequest">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h10l2 2v10H4z"/><path d="M7 4v4h6V4M6 16v-5h8v5"/></svg>
              บันทึก
            </button>
          </div>

          <div class="pca-card">
            <h2 class="pca-card-title">รายละเอียด</h2>

            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>เลขที่เอกสาร</label>
                <input type="text" :value="nextRequestDocNo" disabled />
              </div>
              <div class="pca-field">
                <label>วันที่บันทึก<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <input type="text" v-model="requestForm.bookDate" placeholder="วว/ดด/ปปปป" />
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v3M13 2v3"/></svg>
                </div>
              </div>
              <div class="pca-field">
                <label>วันที่ครบกำหนดเคลียร์<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <input type="text" v-model="requestForm.dueDate" placeholder="วว/ดด/ปปปป" />
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v3M13 2v3"/></svg>
                </div>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-1">
              <div class="pca-field">
                <div class="pca-field-label-row">
                  <label>คำอธิบาย</label>
                  <span class="pca-char-count">{{ requestForm.description.length }}/255</span>
                </div>
                <textarea v-model="requestForm.description" rows="2" maxlength="255" placeholder="ระบุคำอธิบาย"></textarea>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>ผู้เบิก</label>
                <input type="text" v-model="requestForm.payee" placeholder="ระบุชื่อผู้เบิก" />
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-3">
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
            <h2 class="pca-card-title">วิธีการชำระ</h2>
            <div class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>ชำระโดย<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <select v-model="requestForm.payMethod">
                    <option v-for="opt in PAY_METHODS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <!-- 1. เงินสด -->
            <div v-if="requestForm.payMethod === 'cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="requestForm.amount" min="0" placeholder="0.00" />
              </div>
            </div>

            <!-- 2. เงินสดย่อย -->
            <div v-else-if="requestForm.payMethod === 'petty-cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="requestForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>รายการเงินสดย่อย (เลขที่เอกสาร)</label>
                <div class="pca-input-icon">
                  <select v-model="requestForm.pettyCashDocNo">
                    <option value="" disabled>เลือกเลขที่เอกสาร</option>
                    <option v-for="doc in PETTY_CASH_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <!-- 3. รับเงินล่วงหน้า -->
            <div v-else-if="requestForm.payMethod === 'advance-received'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="requestForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>อ้างอิงรับเงินล่วงหน้า</label>
                <div class="pca-input-icon">
                  <select v-model="requestForm.advanceRefNo">
                    <option value="" disabled>เลือกเอกสารอ้างอิง</option>
                    <option v-for="doc in ADVANCE_RECEIVED_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <!-- 4. ธนาคารกสิกรไทย -->
            <div v-else-if="requestForm.payMethod === 'bank-kbank'" class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="requestForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>วันที่</label>
                <div class="pca-input-icon">
                  <input type="text" v-model="requestForm.bankDate" placeholder="วว/ดด/ปปปป" />
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v3M13 2v3"/></svg>
                </div>
              </div>
              <div class="pca-field">
                <label>หลักฐานการชำระเงิน</label>
                <button type="button" class="pca-btn pca-btn-primary pca-btn-sm" @click="showUploadToast">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13V4M6.5 7.5L10 4l3.5 3.5"/><path d="M4 13v2a1 1 0 001 1h10a1 1 0 001-1v-2"/></svg>
                  อัปโหลดไฟล์
                </button>
              </div>
            </div>

            <!-- 5. เช็ค -->
            <template v-else-if="requestForm.payMethod === 'check'">
              <div class="pca-form-grid pca-form-grid-1">
                <div class="pca-field">
                  <label>เลือกเอกสารเลขที่ หรือสร้างใหม่</label>
                  <div class="pca-check-mode-toggle">
                    <button type="button" class="pca-mode-btn" :class="{ active: requestForm.checkMode === 'existing' }" @click="requestForm.checkMode = 'existing'">เลือกเอกสารเดิม</button>
                    <button type="button" class="pca-mode-btn" :class="{ active: requestForm.checkMode === 'new' }" @click="requestForm.checkMode = 'new'">สร้างใหม่</button>
                  </div>
                </div>
              </div>

              <div class="pca-form-grid" :class="requestForm.checkMode === 'existing' ? 'pca-form-grid-3' : 'pca-form-grid-2'">
                <div class="pca-field" v-if="requestForm.checkMode === 'existing'">
                  <label>เลขที่เช็ค</label>
                  <div class="pca-input-icon">
                    <select v-model="requestForm.checkDocNo">
                      <option value="" disabled>เลือกเลขที่เช็ค</option>
                      <option v-for="chq in CHECK_DOCS" :key="chq.docNo" :value="chq.docNo">{{ chq.docNo }} — {{ formatAmount(chq.amount) }} บาท</option>
                    </select>
                    <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                  </div>
                </div>
                <div class="pca-field" v-else>
                  <label>เลขที่เช็คใหม่</label>
                  <input type="text" v-model="requestForm.checkNewNo" placeholder="ระบุเลขที่เช็ค" />
                </div>
                <div class="pca-field">
                  <label>จำนวนเงิน (ขึ้นตามเช็ค)</label>
                  <input type="number" :value="checkAmount" @input="onCheckAmountInput" :disabled="requestForm.checkMode === 'existing'" placeholder="0.00" />
                </div>
                <div class="pca-field" v-if="requestForm.checkMode === 'existing'">
                  <label>&nbsp;</label>
                  <button type="button" class="pca-btn pca-btn-outline" @click="printCheck">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="7" width="10" height="6"/><path d="M6 7V4h8v3M6 13v3h8v-3"/></svg>
                    พิมพ์เช็ค
                  </button>
                </div>
              </div>

              <div v-if="requestForm.checkMode === 'new'" class="pca-paired-check-title">รายละเอียดเช็คประกบ<span class="pca-req">*</span></div>

              <div v-if="requestForm.checkMode === 'new'" class="pca-paired-check">
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>รายละเอียดเช็ค</label>
                    <textarea v-model="requestForm.pairedCheck.detail" rows="2" placeholder="ระบุรายละเอียดเช็ค"></textarea>
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-2">
                  <div class="pca-field">
                    <label>วันที่ชำระ</label>
                    <input type="text" v-model="requestForm.pairedCheck.paymentDate" placeholder="วว/ดด/ปปปป" />
                  </div>
                  <div class="pca-field">
                    <label>วันที่ครบกำหนด</label>
                    <input type="text" v-model="requestForm.pairedCheck.dueDate" placeholder="วว/ดด/ปปปป" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>ผู้จัดจำหน่าย</label>
                    <input type="text" v-model="requestForm.pairedCheck.vendor" placeholder="ระบุผู้จัดจำหน่าย" />
                  </div>
                  <div class="pca-field">
                    <label>ประเภทการชำระ</label>
                    <div class="pca-input-icon">
                      <select v-model="requestForm.pairedCheck.paymentType">
                        <option value="" disabled>เลือกประเภทการชำระ</option>
                        <option v-for="t in PAYMENT_TYPES" :key="t" :value="t">{{ t }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>ชื่อพนักงาน</label>
                    <input type="text" v-model="requestForm.pairedCheck.employeeName" placeholder="ระบุชื่อพนักงาน" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>จ่ายจากบัญชี</label>
                    <div class="pca-input-icon">
                      <select v-model="requestForm.pairedCheck.payFromAccount">
                        <option value="" disabled>เลือกบัญชี</option>
                        <option v-for="a in PAY_FROM_ACCOUNTS" :key="a" :value="a">{{ a }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>สถานะ</label>
                    <div class="pca-input-icon">
                      <select v-model="requestForm.pairedCheck.status">
                        <option value="" disabled>เลือกสถานะ</option>
                        <option v-for="s in CHECK_STATUSES" :key="s" :value="s">{{ s }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>วันที่หักจากบัญชี</label>
                    <input type="text" v-model="requestForm.pairedCheck.accountDeductDate" placeholder="วว/ดด/ปปปป" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>ชื่อผู้รับ</label>
                    <input type="text" v-model="requestForm.pairedCheck.payeeName" placeholder="ระบุชื่อผู้รับ" />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>

        <!-- ================= REQUEST DETAIL ================= -->
        <template v-else-if="page === 'request-detail' && selectedRequestDetail">
          <div class="pca-header-row">
            <div class="pca-header-left">
              <button type="button" class="pca-back-btn" @click="page = 'request-list'">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>
              </button>
              <h1 class="pca-title">รายละเอียดเงินทดรองจ่าย {{ selectedRequestDetail.docNo }}</h1>
            </div>
            <button type="button" class="pca-btn pca-btn-outline" @click="printVoucher">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="7" width="10" height="6"/><path d="M6 7V4h8v3M6 13v3h8v-3"/></svg>
              พิมพ์ใบสำคัญจ่าย
            </button>
          </div>

          <div class="pca-card">
            <h2 class="pca-card-title">รายละเอียด</h2>
            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>เลขที่เอกสาร</label>
                <input type="text" :value="selectedRequestDetail.docNo" disabled />
              </div>
              <div class="pca-field">
                <label>วันที่บันทึก</label>
                <input type="text" :value="selectedRequestDetail.bookDate" disabled />
              </div>
              <div class="pca-field">
                <label>วันที่ครบกำหนดเคลียร์</label>
                <input type="text" :value="selectedRequestDetail.dueDate" disabled />
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-1">
              <div class="pca-field">
                <label>คำอธิบาย</label>
                <textarea :value="selectedRequestDetail.description" rows="2" disabled></textarea>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>ผู้เบิก</label>
                <input type="text" :value="selectedRequestDetail.payee" disabled />
              </div>
              <div class="pca-field">
                <label>ชำระโดย</label>
                <input type="text" :value="selectedRequestDetail.payMethod" disabled />
              </div>
              <div class="pca-field">
                <label>สถานะ</label>
                <div><span class="pca-status" :class="'pca-status--' + selectedRequestDetail.status">{{ statusLabel(selectedRequestDetail.status) }}</span></div>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="text" :value="formatAmount(selectedRequestDetail.amount) + ' บาท'" disabled />
              </div>
              <div class="pca-field">
                <label>เคลียร์แล้ว</label>
                <input type="text" :value="formatAmount(selectedRequestDetail.clearedAmount) + ' บาท'" disabled />
              </div>
              <div class="pca-field">
                <label>คงเหลือ</label>
                <input type="text" :value="formatAmount(selectedRequestDetail.amount - selectedRequestDetail.clearedAmount) + ' บาท'" disabled />
              </div>
            </div>
          </div>
        </template>

        <!-- ================= CLEARING LIST ================= -->
        <template v-else-if="page === 'clearing-list'">
          <div class="pca-tabs">
            <button type="button" class="pca-tab" @click="page = 'request-list'">รายการคำขอ</button>
            <button type="button" class="pca-tab" :class="{ active: true }">รายการเคลียร์</button>
          </div>

          <div class="pca-header-row">
            <h1 class="pca-title">รายการเคลียร์เงินทดรองจ่าย</h1>
            <button type="button" class="pca-btn pca-btn-primary" :disabled="!openRequests.length" @click="openCreateClearing">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v12M4 10h12"/></svg>
              เคลียร์เงินทดรองจ่าย
            </button>
          </div>

          <div class="pca-card">
            <table class="pca-table">
              <thead>
                <tr>
                  <th>เลขที่เอกสาร</th>
                  <th>อ้างอิงจาก</th>
                  <th>วันที่บันทึก</th>
                  <th>วันที่ครบกำหนดเคลียร์</th>
                  <th class="pca-col-num">ยอดเบิก</th>
                  <th class="pca-col-num">ยอดเคลียร์</th>
                  <th class="pca-col-num">คงเหลือ</th>
                  <th>สถานะ</th>
                  <th class="pca-col-actions"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="clearings.length === 0">
                  <td colspan="9" class="pca-empty">ยังไม่มีรายการเคลียร์เงินทดรองจ่าย</td>
                </tr>
                <tr v-for="clr in clearings" :key="clr.id" class="pca-row-clickable" @dblclick="openClearingDetail(clr)" title="ดับเบิลคลิกเพื่อดูรายละเอียด">
                  <td class="pca-cell-strong">{{ clr.docNo }}</td>
                  <td>{{ clr.refDocNo }}</td>
                  <td>{{ clr.bookDate }}</td>
                  <td>{{ clr.dueDate }}</td>
                  <td class="pca-col-num">{{ formatAmount(clr.advanceAmount) }}</td>
                  <td class="pca-col-num">{{ formatAmount(clr.clearedAmount) }}</td>
                  <td class="pca-col-num">{{ formatAmount(clr.remaining) }}</td>
                  <td><span class="pca-status" :class="'pca-status--' + clr.status">{{ statusLabel(clr.status) }}</span></td>
                  <td class="pca-col-actions">
                    <button type="button" class="pca-link-btn" @click="openClearingDetail(clr)">ดูรายละเอียด</button>
                    <button v-if="clr.status !== 'cancelled'" type="button" class="pca-link-btn pca-link-btn-danger" @click="cancelClearing(clr)">ยกเลิก</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- ================= CLEARING DETAIL ================= -->
        <template v-else-if="page === 'clearing-detail' && selectedClearingDetail">
          <div class="pca-header-row">
            <div class="pca-header-left">
              <button type="button" class="pca-back-btn" @click="page = 'clearing-list'">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>
              </button>
              <h1 class="pca-title">รายละเอียดใบเคลียร์เงินทดรองจ่าย {{ selectedClearingDetail.docNo }}</h1>
            </div>
            <button
              v-if="selectedClearingDetail.status !== 'cancelled'"
              type="button"
              class="pca-btn pca-btn-outline pca-btn-danger"
              @click="cancelClearing(selectedClearingDetail)"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M7.2 7.2l5.6 5.6"/></svg>
              ยกเลิกใบเคลียร์เงินทดรองจ่าย
            </button>
          </div>

          <div class="pca-card">
            <h2 class="pca-card-title">รายละเอียด</h2>
            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>เลขที่เอกสาร</label>
                <input type="text" :value="selectedClearingDetail.docNo" disabled />
              </div>
              <div class="pca-field">
                <label>อ้างอิงจาก</label>
                <input type="text" :value="selectedClearingDetail.refDocNo" disabled />
              </div>
              <div class="pca-field">
                <label>สถานะ</label>
                <div><span class="pca-status" :class="'pca-status--' + selectedClearingDetail.status">{{ statusLabel(selectedClearingDetail.status) }}</span></div>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>วันที่บันทึก</label>
                <input type="text" :value="selectedClearingDetail.bookDate" disabled />
              </div>
              <div class="pca-field">
                <label>วันที่ครบกำหนดเคลียร์</label>
                <input type="text" :value="selectedClearingDetail.dueDate" disabled />
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-1" v-if="selectedClearingDetail.note">
              <div class="pca-field">
                <label>หมายเหตุ</label>
                <textarea :value="selectedClearingDetail.note" rows="2" disabled></textarea>
              </div>
            </div>

            <template v-if="selectedClearingDetail.rows && selectedClearingDetail.rows.length">
              <h2 class="pca-card-title" style="margin-top:8px">รายการค่าใช้จ่าย</h2>
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
                    <tr v-for="(row, idx) in selectedClearingDetail.rows" :key="row.id">
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
            </template>

            <div class="pca-form-grid pca-form-grid-3" style="margin-top:16px">
              <div class="pca-field">
                <label>ยอดเบิก</label>
                <input type="text" :value="formatAmount(selectedClearingDetail.advanceAmount) + ' บาท'" disabled />
              </div>
              <div class="pca-field">
                <label>ยอดเคลียร์</label>
                <input type="text" :value="formatAmount(selectedClearingDetail.clearedAmount) + ' บาท'" disabled />
              </div>
              <div class="pca-field">
                <label>คงเหลือ</label>
                <input type="text" :value="formatAmount(selectedClearingDetail.remaining) + ' บาท'" disabled />
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-3" v-if="selectedClearingDetail.payMethodLabel">
              <div class="pca-field">
                <label>ชำระโดย</label>
                <input type="text" :value="selectedClearingDetail.payMethodLabel" disabled />
              </div>
            </div>
          </div>
        </template>

        <!-- ================= CREATE CLEARING ================= -->
        <template v-else-if="page === 'clearing-create'">
          <div class="pca-header-row">
            <div class="pca-header-left">
              <button type="button" class="pca-back-btn" @click="page = 'clearing-list'">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>
              </button>
              <h1 class="pca-title">เคลียร์เงินทดรองจ่าย</h1>
            </div>
            <button type="button" class="pca-btn pca-btn-primary" :disabled="!canSaveClearing" @click="saveClearing">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h10l2 2v10H4z"/><path d="M7 4v4h6V4M6 16v-5h8v5"/></svg>
              บันทึก
            </button>
          </div>

          <div class="pca-card">
            <h2 class="pca-card-title">รายละเอียด</h2>

            <div class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>อ้างอิงจาก<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <select v-model.number="clearingForm.refId" @change="onRefChange">
                    <option value="" disabled>เลือกเงินทดรองจ่าย</option>
                    <option v-for="req in openRequests" :key="req.id" :value="req.id">
                      {{ req.docNo }} — {{ req.payee }} (คงเหลือ {{ formatAmount(req.amount - req.clearedAmount) }})
                    </option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
              <div class="pca-field">
                <label>วันที่บันทึก<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <input type="text" v-model="clearingForm.bookDate" placeholder="วว/ดด/ปปปป" />
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v3M13 2v3"/></svg>
                </div>
              </div>
              <div class="pca-field">
                <label>วันที่ครบกำหนดเคลียร์<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <input type="text" v-model="clearingForm.dueDate" placeholder="วว/ดด/ปปปป" />
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v3M13 2v3"/></svg>
                </div>
              </div>
            </div>

            <div class="pca-form-grid pca-form-grid-1">
              <div class="pca-field">
                <div class="pca-field-label-row">
                  <label>หมายเหตุ</label>
                  <span class="pca-char-count">{{ clearingForm.note.length }}/255</span>
                </div>
                <textarea v-model="clearingForm.note" rows="2" maxlength="255" placeholder="ระบุหมายเหตุ"></textarea>
              </div>
            </div>

            <div class="pca-charges-header">
              <h2 class="pca-card-title" style="margin:0">รายการค่าใช้จ่าย</h2>
              <button type="button" class="pca-btn pca-btn-outline pca-btn-sm" @click="addClearingRow">
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
                  <tr v-if="clearingRows.length === 0">
                    <td colspan="7" class="pca-empty">ไม่มีรายการค่าใช้จ่าย</td>
                  </tr>
                  <tr v-for="(row, idx) in clearingRows" :key="row.id">
                    <td class="pca-col-num">{{ idx + 1 }}</td>
                    <td><input type="text" v-model="row.code" class="pca-table-input" placeholder="รหัส" /></td>
                    <td><input type="text" v-model="row.name" class="pca-table-input" placeholder="ชื่อรายจ่าย" /></td>
                    <td><input type="text" v-model="row.detail" class="pca-table-input" maxlength="100" placeholder="รายละเอียด" /></td>
                    <td class="pca-col-num"><input type="number" v-model.number="row.amount" class="pca-table-input pca-table-input-num" placeholder="0.00" /></td>
                    <td><input type="text" v-model="row.docRef" class="pca-table-input" placeholder="เอกสารอ้างอิง" /></td>
                    <td class="pca-col-actions">
                      <button type="button" class="pca-row-ic-btn pca-row-ic-danger" title="ลบ" @click="removeClearingRow(idx)">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10"/></svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pca-charges-footer">
              <div class="pca-footer-row">
                <span>ยอดรวม</span>
                <div class="pca-total-box">{{ formatAmount(clearingTotal) }} บาท</div>
              </div>
              <div class="pca-footer-row">
                <span>ยอดเบิก</span>
                <div class="pca-total-box">{{ formatAmount(selectedRequestRemaining) }} บาท</div>
              </div>
            </div>
          </div>

          <div class="pca-card">
            <h2 class="pca-card-title">วิธีการชำระ</h2>
            <div class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>ชำระโดย<span class="pca-req">*</span></label>
                <div class="pca-input-icon">
                  <select v-model="clearingForm.payMethod">
                    <option v-for="opt in PAY_METHODS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <!-- 1. เงินสด -->
            <div v-if="clearingForm.payMethod === 'cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="clearingForm.amount" min="0" placeholder="0.00" />
              </div>
            </div>

            <!-- 2. เงินสดย่อย -->
            <div v-else-if="clearingForm.payMethod === 'petty-cash'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="clearingForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>รายการเงินสดย่อย (เลขที่เอกสาร)</label>
                <div class="pca-input-icon">
                  <select v-model="clearingForm.pettyCashDocNo">
                    <option value="" disabled>เลือกเลขที่เอกสาร</option>
                    <option v-for="doc in PETTY_CASH_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <!-- 3. รับเงินล่วงหน้า -->
            <div v-else-if="clearingForm.payMethod === 'advance-received'" class="pca-form-grid pca-form-grid-2">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="clearingForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>อ้างอิงรับเงินล่วงหน้า</label>
                <div class="pca-input-icon">
                  <select v-model="clearingForm.advanceRefNo">
                    <option value="" disabled>เลือกเอกสารอ้างอิง</option>
                    <option v-for="doc in ADVANCE_RECEIVED_DOCS" :key="doc" :value="doc">{{ doc }}</option>
                  </select>
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            <!-- 4. ธนาคารกสิกรไทย -->
            <div v-else-if="clearingForm.payMethod === 'bank-kbank'" class="pca-form-grid pca-form-grid-3">
              <div class="pca-field">
                <label>จำนวนเงิน</label>
                <input type="number" v-model.number="clearingForm.amount" min="0" placeholder="0.00" />
              </div>
              <div class="pca-field">
                <label>วันที่</label>
                <div class="pca-input-icon">
                  <input type="text" v-model="clearingForm.bankDate" placeholder="วว/ดด/ปปปป" />
                  <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v3M13 2v3"/></svg>
                </div>
              </div>
              <div class="pca-field">
                <label>หลักฐานการชำระเงิน</label>
                <button type="button" class="pca-btn pca-btn-primary pca-btn-sm" @click="showUploadToast">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13V4M6.5 7.5L10 4l3.5 3.5"/><path d="M4 13v2a1 1 0 001 1h10a1 1 0 001-1v-2"/></svg>
                  อัปโหลดไฟล์
                </button>
              </div>
            </div>

            <!-- 5. เช็ค -->
            <template v-else-if="clearingForm.payMethod === 'check'">
              <div class="pca-form-grid pca-form-grid-1">
                <div class="pca-field">
                  <label>เลือกเอกสารเลขที่ หรือสร้างใหม่</label>
                  <div class="pca-check-mode-toggle">
                    <button type="button" class="pca-mode-btn" :class="{ active: clearingForm.checkMode === 'existing' }" @click="clearingForm.checkMode = 'existing'">เลือกเอกสารเดิม</button>
                    <button type="button" class="pca-mode-btn" :class="{ active: clearingForm.checkMode === 'new' }" @click="clearingForm.checkMode = 'new'">สร้างใหม่</button>
                  </div>
                </div>
              </div>

              <div class="pca-form-grid" :class="clearingForm.checkMode === 'existing' ? 'pca-form-grid-3' : 'pca-form-grid-2'">
                <div class="pca-field" v-if="clearingForm.checkMode === 'existing'">
                  <label>เลขที่เช็ค</label>
                  <div class="pca-input-icon">
                    <select v-model="clearingForm.checkDocNo">
                      <option value="" disabled>เลือกเลขที่เช็ค</option>
                      <option v-for="chq in CHECK_DOCS" :key="chq.docNo" :value="chq.docNo">{{ chq.docNo }} — {{ formatAmount(chq.amount) }} บาท</option>
                    </select>
                    <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                  </div>
                </div>
                <div class="pca-field" v-else>
                  <label>เลขที่เช็คใหม่</label>
                  <input type="text" v-model="clearingForm.checkNewNo" placeholder="ระบุเลขที่เช็ค" />
                </div>
                <div class="pca-field">
                  <label>จำนวนเงิน (ขึ้นตามเช็ค)</label>
                  <input type="number" :value="clearingCheckAmount" @input="onClearingCheckAmountInput" :disabled="clearingForm.checkMode === 'existing'" placeholder="0.00" />
                </div>
                <div class="pca-field" v-if="clearingForm.checkMode === 'existing'">
                  <label>&nbsp;</label>
                  <button type="button" class="pca-btn pca-btn-outline" @click="printCheck">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="7" width="10" height="6"/><path d="M6 7V4h8v3M6 13v3h8v-3"/></svg>
                    พิมพ์เช็ค
                  </button>
                </div>
              </div>

              <div v-if="clearingForm.checkMode === 'new'" class="pca-paired-check-title">รายละเอียดเช็คประกบ<span class="pca-req">*</span></div>

              <div v-if="clearingForm.checkMode === 'new'" class="pca-paired-check">
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>รายละเอียดเช็ค</label>
                    <textarea v-model="clearingForm.pairedCheck.detail" rows="2" placeholder="ระบุรายละเอียดเช็ค"></textarea>
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-2">
                  <div class="pca-field">
                    <label>วันที่ชำระ</label>
                    <input type="text" v-model="clearingForm.pairedCheck.paymentDate" placeholder="วว/ดด/ปปปป" />
                  </div>
                  <div class="pca-field">
                    <label>วันที่ครบกำหนด</label>
                    <input type="text" v-model="clearingForm.pairedCheck.dueDate" placeholder="วว/ดด/ปปปป" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>ผู้จัดจำหน่าย</label>
                    <input type="text" v-model="clearingForm.pairedCheck.vendor" placeholder="ระบุผู้จัดจำหน่าย" />
                  </div>
                  <div class="pca-field">
                    <label>ประเภทการชำระ</label>
                    <div class="pca-input-icon">
                      <select v-model="clearingForm.pairedCheck.paymentType">
                        <option value="" disabled>เลือกประเภทการชำระ</option>
                        <option v-for="t in PAYMENT_TYPES" :key="t" :value="t">{{ t }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>ชื่อพนักงาน</label>
                    <input type="text" v-model="clearingForm.pairedCheck.employeeName" placeholder="ระบุชื่อพนักงาน" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-3">
                  <div class="pca-field">
                    <label>จ่ายจากบัญชี</label>
                    <div class="pca-input-icon">
                      <select v-model="clearingForm.pairedCheck.payFromAccount">
                        <option value="" disabled>เลือกบัญชี</option>
                        <option v-for="a in PAY_FROM_ACCOUNTS" :key="a" :value="a">{{ a }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>สถานะ</label>
                    <div class="pca-input-icon">
                      <select v-model="clearingForm.pairedCheck.status">
                        <option value="" disabled>เลือกสถานะ</option>
                        <option v-for="s in CHECK_STATUSES" :key="s" :value="s">{{ s }}</option>
                      </select>
                      <svg class="pca-field-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg>
                    </div>
                  </div>
                  <div class="pca-field">
                    <label>วันที่หักจากบัญชี</label>
                    <input type="text" v-model="clearingForm.pairedCheck.accountDeductDate" placeholder="วว/ดด/ปปปป" />
                  </div>
                </div>
                <div class="pca-form-grid pca-form-grid-1">
                  <div class="pca-field">
                    <label>ชื่อผู้รับ</label>
                    <input type="text" v-model="clearingForm.pairedCheck.payeeName" placeholder="ระบุชื่อผู้รับ" />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <transition name="pca-toast-fade">
      <div v-if="toast" class="pca-toast">{{ toast }}</div>
    </transition>

    <!-- ============ PAYMENT VOUCHER MODAL ============ -->
    <transition name="pca-modal-fade">
      <div v-if="voucherModalOpen && voucherData" class="pca-modal-overlay" @click.self="closeVoucherModal">
        <div class="pca-modal-toolbar">
          <span class="pca-modal-zoom-label">{{ Math.round(voucherZoom * 100) }}%</span>
          <button type="button" class="pca-modal-tool-btn" title="ซูมออก" @click="zoomVoucher(-0.1)">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M6 8.5h5"/><path d="M16 16l-3.4-3.4"/></svg>
          </button>
          <button type="button" class="pca-modal-tool-btn" title="ซูมเข้า" @click="zoomVoucher(0.1)">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M8.5 6v5M6 8.5h5"/><path d="M16 16l-3.4-3.4"/></svg>
          </button>
          <button type="button" class="pca-modal-tool-btn pca-modal-close-btn" title="ปิด" @click="closeVoucherModal">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l10 10M15 5L5 15"/></svg>
          </button>
        </div>

        <div class="pca-modal-scroll">
          <div class="pca-voucher-paper" :style="{ transform: 'scale(' + voucherZoom + ')' }">
            <div class="pcv-head">
              <div class="pcv-head-title">
                <h2>ใบสำคัญจ่าย</h2>
                <span>Payment Voucher</span>
              </div>
            </div>
            <div class="pcv-original">(ต้นฉบับ/Original)</div>

            <div class="pcv-meta-row">
              <div class="pcv-meta-left">
                <span class="pcv-meta-label">ผู้เบิก/Withdrawer:</span>
                <span class="pcv-meta-value">{{ voucherData.payee }}</span>
              </div>
              <div class="pcv-meta-right">
                <div><span class="pcv-meta-label">เลขที่/No:</span><span class="pcv-meta-value">{{ voucherData.docNo }}</span></div>
                <div><span class="pcv-meta-label">วันที่บันทึก/Date:</span><span class="pcv-meta-value">{{ voucherData.bookDate }}</span></div>
                <div><span class="pcv-meta-label">ครบกำหนด/Due date:</span><span class="pcv-meta-value">{{ voucherData.dueDate }}</span></div>
              </div>
            </div>

            <table class="pcv-table">
              <thead>
                <tr>
                  <th class="pcv-col-no">ลำดับ<br />No.</th>
                  <th>เลขใบสำคัญจ่าย<br />Ref. No.</th>
                  <th>วันที่บันทึก<br />Date</th>
                  <th>รายละเอียด<br />Description</th>
                  <th class="pcv-col-num">จำนวนหน่วย<br />Unit</th>
                  <th class="pcv-col-num">จำนวนเงิน<br />Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pcv-col-no pcv-row-tall">1</td>
                  <td class="pcv-row-tall">{{ voucherData.docNo }}</td>
                  <td class="pcv-row-tall">{{ voucherData.bookDate }}</td>
                  <td class="pcv-row-tall">{{ voucherData.description }}</td>
                  <td class="pcv-col-num pcv-row-tall">1</td>
                  <td class="pcv-col-num pcv-row-tall">{{ formatAmount(voucherData.amount) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="pcv-total-text">{{ voucherData.amountText }}</td>
                  <td class="pcv-total-label">จำนวนเงิน/Amount</td>
                  <td class="pcv-col-num pcv-total-amount">{{ formatAmount(voucherData.amount) }}</td>
                </tr>
              </tfoot>
            </table>

            <table class="pcv-table pcv-account-table">
              <thead>
                <tr>
                  <th class="pcv-col-code">รหัสบัญชี</th>
                  <th>ชื่อบัญชี</th>
                  <th class="pcv-col-num">เดบิต</th>
                  <th class="pcv-col-num">เครดิต</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pcv-col-code pcv-row-tall">{{ voucherData.debitAccount.code }}</td>
                  <td class="pcv-row-tall">{{ voucherData.debitAccount.name }} - {{ voucherData.description }} - #{{ voucherData.docNo }}</td>
                  <td class="pcv-col-num pcv-row-tall">{{ formatAmount(voucherData.amount) }}</td>
                  <td class="pcv-col-num pcv-row-tall">-</td>
                </tr>
                <tr>
                  <td class="pcv-col-code pcv-row-tall">{{ voucherData.creditAccount.code }}</td>
                  <td class="pcv-row-tall">{{ voucherData.creditAccount.name }} - {{ voucherData.description }} - #{{ voucherData.docNo }}</td>
                  <td class="pcv-col-num pcv-row-tall">-</td>
                  <td class="pcv-col-num pcv-row-tall">{{ formatAmount(voucherData.amount) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="pcv-total-label">รวม/Total</td>
                  <td class="pcv-total-text">{{ voucherData.amountText }}</td>
                  <td class="pcv-col-num pcv-total-amount">{{ formatAmount(voucherData.amount) }}</td>
                  <td class="pcv-col-num pcv-total-amount">{{ formatAmount(voucherData.amount) }}</td>
                </tr>
              </tfoot>
            </table>

            <div class="pcv-remarks">
              <div class="pcv-remarks-title">หมายเหตุ/Remarks:</div>
              <div>-</div>
            </div>

            <div class="pcv-conditions">
              <div class="pcv-remarks-title">การชำระเงิน(Conditions of Payments)</div>
              <div class="pcv-conditions-line">{{ voucherData.payMethod }}</div>
              <div class="pcv-conditions-line">- จำนวน {{ formatAmount(voucherData.amount) }} บาท วันที่ {{ voucherData.bookDate }}</div>
            </div>

            <div class="pcv-signatures">
              <div class="pcv-sig-col">
                <div class="pcv-sig-line"></div>
                <span>ผู้จัดทำ / Organizer</span>
              </div>
              <div class="pcv-sig-col">
                <div class="pcv-sig-line"></div>
                <span>ผู้ตรวจสอบ / Approver</span>
              </div>
              <div class="pcv-sig-col">
                <div class="pcv-sig-line"></div>
                <span>ผู้มีอำนาจลงนาม / Authorized</span>
              </div>
              <div class="pcv-sig-col">
                <div class="pcv-sig-line"></div>
                <span>ผู้รับเงิน / Receiver</span>
              </div>
            </div>

            <div class="pcv-page-no">1/1</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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

// ---- Thai baht text ----
const THAI_DIGIT_TEXT = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
const THAI_PLACE_TEXT = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน']
function thaiIntegerText(digits) {
  let out = ''
  const len = digits.length
  if (len > 7) {
    const cut = len - 6
    out += thaiIntegerText(digits.slice(0, cut)) + 'ล้าน'
    digits = digits.slice(cut)
  }
  const n = digits.length
  for (let i = 0; i < n; i++) {
    const d = Number(digits[i])
    if (d === 0) continue
    if (i === n - 1 && d === 1 && n > 1) out += 'เอ็ด'
    else if (i === n - 2 && d === 2) out += 'ยี่'
    else if (i === n - 2 && d === 1) out += ''
    else out += THAI_DIGIT_TEXT[d]
    out += THAI_PLACE_TEXT[n - i - 1]
  }
  return out || 'ศูนย์'
}
function numberToThaiBahtText(amount) {
  const fixed = Number(amount || 0).toFixed(2)
  const [intPart, decPart] = fixed.split('.')
  let text = thaiIntegerText(intPart.replace(/^0+(?=\d)/, '')) + 'บาท'
  text += decPart === '00' ? 'ถ้วน' : thaiIntegerText(decPart) + 'สตางค์'
  return text
}

function creditAccountForMethod(payMethodLabel) {
  if (/เช็ค/.test(payMethodLabel)) return { code: '2111-03', name: 'เช็คจ่ายลงวันที่ล่วงหน้า' }
  if (/เงินสดย่อย/.test(payMethodLabel)) return { code: '1112-00', name: 'เงินสดย่อย' }
  if (/รับเงินล่วงหน้า/.test(payMethodLabel)) return { code: '2113-00', name: 'เงินรับล่วงหน้า' }
  if (/ธนาคาร|โอนเงิน/.test(payMethodLabel)) return { code: '1121-01', name: payMethodLabel }
  return { code: '1111-00', name: 'เงินสด' }
}

const page = ref('request-list') // 'request-list' | 'request-create' | 'clearing-list' | 'clearing-create'

const breadcrumbMap = {
  'request-list': ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย'],
  'request-create': ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'สร้างเงินทดรองจ่าย'],
  'request-detail': ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'รายละเอียดเงินทดรองจ่าย'],
  'clearing-list': ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'เคลียร์เงินทดรองจ่าย'],
  'clearing-create': ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'เคลียร์เงินทดรองจ่าย', 'สร้างรายการเคลียร์'],
  'clearing-detail': ['เจ้าหนี้ AP', 'ใบตั้งเบิก', 'เงินทดรองจ่าย', 'เคลียร์เงินทดรองจ่าย', 'รายละเอียดใบเคลียร์']
}
const breadcrumb = computed(() => breadcrumbMap[page.value])

const STATUS_LABELS = { pending: 'รอเคลียร์', partial: 'เคลียร์บางส่วน', cleared: 'เคลียร์แล้ว', cancelled: 'ยกเลิกแล้ว' }
function statusLabel(status) {
  return STATUS_LABELS[status] || status
}

let requestSeq = 4
const requests = ref([
  { id: 1, docNo: 'ADV-0001', bookDate: '01/09/2569', dueDate: '15/09/2569', payee: 'สมชาย ใจดี', description: 'ค่าเดินทางไปดูงานโครงการ', payMethod: 'เงินสด', amount: 5000, clearedAmount: 5000, status: 'cleared' },
  { id: 2, docNo: 'ADV-0002', bookDate: '05/09/2569', dueDate: '20/09/2569', payee: 'วรรณา สุขใจ', description: 'สำรองจ่ายค่าซ่อมบำรุงส่วนกลาง', payMethod: 'เช็ค', amount: 12000, clearedAmount: 0, status: 'pending' },
  { id: 3, docNo: 'ADV-0003', bookDate: '10/09/2569', dueDate: '25/09/2569', payee: 'ประยุทธ มั่นคง', description: 'ค่าใช้จ่ายจัดกิจกรรมนิติบุคคล', payMethod: 'โอนเงิน', amount: 8500, clearedAmount: 3000, status: 'partial' }
])

let clearingSeq = 3
const clearings = ref([
  {
    id: 1, docNo: 'CLR-0001', refDocNo: 'ADV-0001', bookDate: '16/09/2569', dueDate: '15/09/2569',
    advanceAmount: 5000, clearedAmount: 5000, ownAmount: 5000, remaining: 0, status: 'cleared',
    note: 'ค่าเดินทางไปดูงานโครงการ', payMethodLabel: 'เงินสด',
    rows: [{ id: 1, code: 'ADV', name: 'ค่าเดินทางไปดูงานโครงการ', detail: '', amount: 5000, docRef: 'ADV-0001' }]
  },
  {
    id: 2, docNo: 'CLR-0002', refDocNo: 'ADV-0003', bookDate: '18/09/2569', dueDate: '25/09/2569',
    advanceAmount: 8500, clearedAmount: 3000, ownAmount: 3000, remaining: 5500, status: 'partial',
    note: 'ค่าใช้จ่ายจัดกิจกรรมนิติบุคคล', payMethodLabel: 'เงินสด',
    rows: [{ id: 2, code: 'ADV', name: 'ค่าใช้จ่ายจัดกิจกรรมนิติบุคคล', detail: '', amount: 3000, docRef: 'ADV-0003' }]
  }
])

const openRequests = computed(() => requests.value.filter(r => r.status !== 'cleared'))

const nextRequestDocNo = computed(() => 'ADV-' + String(requestSeq).padStart(4, '0'))

function formatAmount(n) {
  return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

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
function printCheck() {
  showToast('พิมพ์เช็ค (ตัวอย่างสาธิต)')
}
// ---- request detail ----
const selectedRequestDetail = ref(null)
function openRequestDetail(req) {
  selectedRequestDetail.value = req
  page.value = 'request-detail'
}

// ---- payment voucher modal ----
const voucherModalOpen = ref(false)
const voucherZoom = ref(0.9)

const voucherData = computed(() => {
  const req = selectedRequestDetail.value
  if (!req) return null
  return {
    docNo: req.docNo,
    payee: req.payee,
    bookDate: req.bookDate,
    dueDate: req.dueDate,
    description: req.description,
    amount: req.amount,
    amountText: numberToThaiBahtText(req.amount),
    payMethod: req.payMethod,
    debitAccount: { code: '1153-01', name: 'เงินทดรองจ่าย' },
    creditAccount: creditAccountForMethod(req.payMethod)
  }
})

function printVoucher() {
  voucherZoom.value = 0.9
  voucherModalOpen.value = true
}
function closeVoucherModal() {
  voucherModalOpen.value = false
}
function zoomVoucher(delta) {
  voucherZoom.value = Math.min(1.6, Math.max(0.5, Math.round((voucherZoom.value + delta) * 100) / 100))
}

// ---- create request ----
function blankRequestForm() {
  return {
    bookDate: '16/09/2569',
    dueDate: '',
    description: '',
    payee: '',
    payMethod: 'cash',
    amount: null,
    pettyCashDocNo: '',
    advanceRefNo: '',
    bankDate: '',
    checkMode: 'existing',
    checkDocNo: '',
    checkNewNo: '',
    pairedCheck: {
      detail: '',
      paymentDate: '',
      dueDate: '',
      vendor: '',
      paymentType: '',
      employeeName: '',
      payFromAccount: '',
      status: '',
      accountDeductDate: '',
      payeeName: ''
    }
  }
}

const requestForm = ref(blankRequestForm())

const canSaveRequest = computed(() =>
  requestForm.value.bookDate.trim() !== '' && requestForm.value.dueDate.trim() !== ''
)

const checkAmount = computed(() => {
  if (requestForm.value.checkMode === 'existing') {
    const found = CHECK_DOCS.find(c => c.docNo === requestForm.value.checkDocNo)
    return found ? found.amount : 0
  }
  return requestForm.value.amount || 0
})
function onCheckAmountInput(event) {
  requestForm.value.amount = event.target.value === '' ? null : Number(event.target.value)
}

function resetRequestForm() {
  requestForm.value = blankRequestForm()
}

function openCreateRequest() {
  resetRequestForm()
  page.value = 'request-create'
}

function saveRequest() {
  const amount = requestForm.value.payMethod === 'check' ? checkAmount.value : (requestForm.value.amount || 0)
  const payMethodLabel = PAY_METHODS.find(m => m.value === requestForm.value.payMethod)?.label || requestForm.value.payMethod
  requests.value.push({
    id: requestSeq,
    docNo: nextRequestDocNo.value,
    bookDate: requestForm.value.bookDate,
    dueDate: requestForm.value.dueDate,
    payee: requestForm.value.payee || '—',
    description: requestForm.value.description || '—',
    payMethod: payMethodLabel,
    amount,
    clearedAmount: 0,
    status: 'pending'
  })
  requestSeq++
  showToast('สร้างเงินทดรองจ่ายเรียบร้อยแล้ว')
  page.value = 'request-list'
}

// ---- create clearing ----
let clearingRowSeq = 3
function blankClearingForm() {
  return {
    refId: '',
    bookDate: '18/09/2569',
    dueDate: '',
    note: '',
    payMethod: 'cash',
    amount: null,
    pettyCashDocNo: '',
    advanceRefNo: '',
    bankDate: '',
    checkMode: 'existing',
    checkDocNo: '',
    checkNewNo: '',
    pairedCheck: {
      detail: '',
      paymentDate: '',
      dueDate: '',
      vendor: '',
      paymentType: '',
      employeeName: '',
      payFromAccount: '',
      status: '',
      accountDeductDate: '',
      payeeName: ''
    }
  }
}

const clearingForm = ref(blankClearingForm())
const clearingRows = ref([])

const selectedRequest = computed(() => requests.value.find(r => r.id === clearingForm.value.refId) || null)
const selectedRequestRemaining = computed(() => selectedRequest.value ? selectedRequest.value.amount - selectedRequest.value.clearedAmount : 0)
const clearingTotal = computed(() => clearingRows.value.reduce((sum, r) => sum + (Number(r.amount) || 0), 0))

const canSaveClearing = computed(() =>
  !!clearingForm.value.refId && clearingForm.value.bookDate.trim() !== '' && clearingForm.value.dueDate.trim() !== '' && clearingRows.value.length > 0
)

const clearingCheckAmount = computed(() => {
  if (clearingForm.value.checkMode === 'existing') {
    const found = CHECK_DOCS.find(c => c.docNo === clearingForm.value.checkDocNo)
    return found ? found.amount : 0
  }
  return clearingForm.value.amount || 0
})
function onClearingCheckAmountInput(event) {
  clearingForm.value.amount = event.target.value === '' ? null : Number(event.target.value)
}

function resetClearingForm() {
  clearingForm.value = blankClearingForm()
  clearingRows.value = []
}

function openCreateClearing() {
  resetClearingForm()
  page.value = 'clearing-create'
}

function openClearingFor(req) {
  resetClearingForm()
  clearingForm.value.refId = req.id
  onRefChange()
  page.value = 'clearing-create'
}

function onRefChange() {
  const req = selectedRequest.value
  if (!req) {
    clearingRows.value = []
    return
  }
  clearingForm.value.dueDate = req.dueDate
  clearingForm.value.note = req.description
  clearingRows.value = [
    { id: clearingRowSeq++, code: 'ADV', name: req.description, detail: '', amount: req.amount - req.clearedAmount, docRef: req.docNo }
  ]
}

function addClearingRow() {
  clearingRows.value.push({ id: clearingRowSeq++, code: '', name: '', detail: '', amount: 0, docRef: '' })
}
function removeClearingRow(idx) {
  clearingRows.value.splice(idx, 1)
}

function saveClearing() {
  const req = selectedRequest.value
  if (!req) return
  const total = clearingTotal.value
  const payMethodLabel = PAY_METHODS.find(m => m.value === clearingForm.value.payMethod)?.label || clearingForm.value.payMethod
  clearings.value.push({
    id: clearingSeq,
    docNo: 'CLR-' + String(clearingSeq).padStart(4, '0'),
    refDocNo: req.docNo,
    bookDate: clearingForm.value.bookDate,
    dueDate: clearingForm.value.dueDate,
    advanceAmount: req.amount,
    clearedAmount: req.clearedAmount + total,
    ownAmount: total,
    remaining: req.amount - (req.clearedAmount + total),
    status: (req.clearedAmount + total) >= req.amount ? 'cleared' : 'partial',
    note: clearingForm.value.note,
    payMethodLabel,
    rows: clearingRows.value.map(r => ({ ...r }))
  })
  clearingSeq++

  req.clearedAmount += total
  req.status = req.clearedAmount >= req.amount ? 'cleared' : (req.clearedAmount > 0 ? 'partial' : 'pending')

  showToast('บันทึกการเคลียร์เงินทดรองจ่ายเรียบร้อยแล้ว')
  page.value = 'clearing-list'
}

// ---- clearing detail ----
const selectedClearingDetail = ref(null)
function openClearingDetail(clr) {
  selectedClearingDetail.value = clr
  page.value = 'clearing-detail'
}

function cancelClearing(clr) {
  if (clr.status === 'cancelled') return
  const req = requests.value.find(r => r.docNo === clr.refDocNo)
  if (req) {
    req.clearedAmount = Math.max(0, req.clearedAmount - (clr.ownAmount ?? clr.clearedAmount))
    req.status = req.clearedAmount >= req.amount ? 'cleared' : (req.clearedAmount > 0 ? 'partial' : 'pending')
  }
  clr.status = 'cancelled'
  showToast('ยกเลิกใบเคลียร์เงินทดรองจ่ายเรียบร้อยแล้ว')
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

.pca-content { padding: 24px 28px 60px; max-width: 1120px; }

.pca-tabs { display: flex; gap: 4px; margin-bottom: 16px; }
.pca-tab {
  font-family: inherit; font-size: var(--font-size-sm); font-weight: 600;
  color: var(--color-text-tertiary); background: transparent;
  border: none; border-bottom: 2px solid transparent;
  padding: 8px 4px; margin-right: 20px; cursor: pointer;
}
.pca-tab:hover { color: var(--color-primary-500); }
.pca-tab.active { color: var(--color-primary-500); border-bottom-color: var(--color-primary-500); }

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
.pca-input-icon input, .pca-input-icon select { padding-right: 32px; appearance: none; }
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
.pca-link-btn-danger { color: var(--color-error); }
.pca-muted-text { font-size: var(--font-size-xs); color: var(--color-text-placeholder); }

.pca-row-clickable { cursor: pointer; }
.pca-row-clickable:hover { background: var(--color-disabled-bg); }

.pca-btn-danger { border-color: var(--color-error); color: var(--color-error); }
.pca-btn-danger:hover:not(:disabled) { background: var(--color-error-bg); }

.pca-status {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: var(--font-size-xs); font-weight: 600;
  padding: 3px 10px; border-radius: 999px;
  white-space: nowrap;
}
.pca-status--pending { background: var(--color-attention-bg); color: var(--color-attention); }
.pca-status--partial { background: var(--color-primary-200); color: var(--color-primary-click); }
.pca-status--cleared { background: var(--color-success-bg); color: var(--color-success); }
.pca-status--cancelled { background: var(--color-disabled-bg); color: var(--color-text-tertiary); }

.pca-toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  background: var(--color-text-primary); color: var(--color-white);
  padding: 10px 18px; border-radius: var(--radius-md);
  font-size: var(--font-size-sm); z-index: 200;
}
.pca-toast-fade-enter-active, .pca-toast-fade-leave-active { transition: opacity .2s ease; }
.pca-toast-fade-enter-from, .pca-toast-fade-leave-to { opacity: 0; }

/* ---------- PAYMENT VOUCHER MODAL ---------- */
.pca-modal-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(20, 24, 32, .6);
  display: flex; flex-direction: column; align-items: center;
  padding: 20px 0 40px;
  overflow: hidden;
}
.pca-modal-fade-enter-active, .pca-modal-fade-leave-active { transition: opacity .18s ease; }
.pca-modal-fade-enter-from, .pca-modal-fade-leave-to { opacity: 0; }

.pca-modal-toolbar {
  flex-shrink: 0;
  display: flex; align-items: center; gap: 6px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 6px 8px;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,.25);
}
.pca-modal-zoom-label {
  font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text-tertiary);
  padding: 0 8px; min-width: 46px; text-align: center;
}
.pca-modal-tool-btn {
  width: 32px; height: 32px; border-radius: var(--radius-md);
  border: 1px solid var(--color-dividers); background: var(--color-white);
  color: var(--color-text-secondary); cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.pca-modal-tool-btn svg { width: 17px; height: 17px; }
.pca-modal-tool-btn:hover { border-color: var(--color-primary-500); color: var(--color-primary-500); }
.pca-modal-close-btn:hover { border-color: var(--color-error); color: var(--color-error); background: var(--color-error-bg); }

.pca-modal-scroll {
  flex: 1; width: 100%;
  overflow: auto;
  display: flex; justify-content: center;
}

.pca-voucher-paper {
  flex-shrink: 0;
  width: 820px; min-height: 1160px;
  background: var(--color-white);
  color: #1a1a1a;
  padding: 56px 64px;
  box-shadow: 0 8px 32px rgba(0,0,0,.35);
  transform-origin: top center;
  font-size: 13px;
  line-height: 1.5;
  margin: 0 auto 40px;
}

.pcv-head { text-align: right; }
.pcv-head-title h2 { font-size: 26px; margin: 0; }
.pcv-head-title span { font-size: 18px; color: #333; }
.pcv-original { text-align: right; margin-top: 10px; color: #333; }

.pcv-meta-row { display: flex; justify-content: space-between; gap: 24px; margin-top: 28px; }
.pcv-meta-left, .pcv-meta-right { display: flex; flex-direction: column; gap: 6px; }
.pcv-meta-right > div { display: flex; gap: 8px; }
.pcv-meta-label { font-weight: 700; }

.pcv-table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 12.5px; }
.pcv-table th, .pcv-table td {
  border: 1px solid #333; padding: 8px 10px; text-align: left; vertical-align: top;
}
.pcv-table th { font-weight: 700; background: #fafafa; }
.pcv-col-no { width: 56px; text-align: center; }
.pcv-col-num { text-align: right; }
.pcv-col-code { width: 90px; }
.pcv-row-tall { height: 90px; }
.pcv-total-text { font-weight: 700; text-align: center; }
.pcv-total-label { font-weight: 700; }
.pcv-total-amount { font-weight: 700; }

.pcv-account-table { margin-top: 20px; }

.pcv-remarks, .pcv-conditions { margin-top: 20px; }
.pcv-remarks-title { font-weight: 700; }
.pcv-conditions-line { margin-top: 4px; padding-left: 12px; }

.pcv-signatures { display: flex; justify-content: space-between; gap: 16px; margin-top: 72px; }
.pcv-sig-col { flex: 1; text-align: center; font-size: 12.5px; }
.pcv-sig-line { border-bottom: 1px dotted #555; height: 36px; }

.pcv-page-no { text-align: right; margin-top: 32px; color: #666; font-size: 12px; }

@media (max-width: 900px) {
  .pca-sidebar { display: none; }
  .pca-main { margin-left: 0; }
  .pca-form-grid-2, .pca-form-grid-3 { grid-template-columns: 1fr; }
}
</style>
