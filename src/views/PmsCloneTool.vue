<template>
  <div class="pct-app">

    <!-- SIDEBAR -->
    <aside class="pct-sb">
      <div class="pct-sb-logo">
        <div class="pct-sb-logo-ic">🏠</div>
        <div>
          <div class="pct-sb-logo-nm">PMS LivingOS</div>
          <div class="pct-sb-logo-sb">ชีวิตที่ดีขึ้นในทุกๆวัน</div>
        </div>
      </div>
      <div class="pct-sb-srch">
        <div class="pct-sb-srch-w"><input type="text" placeholder="ค้นหาเมนู" /></div>
      </div>
      <div>
        <div class="pct-ng">⭐ เมนูใช้บ่อย <span class="pct-cv">▾</span></div>
        <div class="pct-ni pct-i1">📊 ผังบัญชี</div>
      </div>
      <div>
        <div class="pct-sb-sec">หน้าหลัก</div>
        <div class="pct-ni pct-act">🏗️ ภาพรวมโครงการ</div>
        <div class="pct-ni">📱 ลงทะเบียนอยู่</div>
      </div>
      <div>
        <div class="pct-sb-sec">จัดการผู้อยู่อาศัย</div>
        <div class="pct-ng">🏠 ผู้อยู่อาศัย <span class="pct-cv">▸</span></div>
      </div>
      <div>
        <div class="pct-sb-sec">บัญชีการเงิน</div>
        <div class="pct-ng pct-primary">💰 ลูกหนี้ AR <span class="pct-cv">▾</span></div>
        <div class="pct-ni pct-i1">💡 ตะแกรงมิเตอร์</div>
        <div class="pct-ng pct-i1 pct-primary" style="padding-left:32px">📄 ใบหนี้ <span class="pct-cv">▾</span></div>
        <div class="pct-ni pct-i2">📝 สร้างใบหนี้</div>
        <div class="pct-ni pct-i2">📢 คำนวณใบหนี้</div>
        <div class="pct-ni pct-i2">📜 หนังสือยืนยันยอดค้าง</div>
      </div>
      <div>
        <div class="pct-ni">📁 คู่มือการเข้าถาน</div>
        <div class="pct-ni">📃 รายงานคำขอ</div>
      </div>
      <div class="pct-sb-user">
        <div class="pct-sb-ua">👤</div>
        <div>
          <div class="pct-sb-un">kamon_manager</div>
          <div class="pct-sb-us">● ออนไลน์</div>
        </div>
        <div class="pct-sb-um">⋯</div>
      </div>
    </aside>

    <!-- MAIN -->
    <div class="pct-main">
      <div class="pct-topbar">
        <div class="pct-tb-bc">
          บัญชีการเงิน <span class="pct-sep">›</span> ลูกหนี้ AR <span class="pct-sep">›</span> ใบหนี้ <span class="pct-sep">›</span>
          <span class="pct-cur">สร้างใบหนี้</span>
        </div>
        <div class="pct-tb-proj"><strong>T-001</strong> : โครงการนิติบุคคล หมู่บ้านสิริ คอนโดมิเนียม เขตบางนา &nbsp;▾</div>
      </div>

      <div class="pct-content">
        <div class="pct-phdr">
          <span class="pct-ph-bk">‹</span>
          <span class="pct-ph-ti">รายการโครงการ</span>
          <button class="pct-ph-how">วิธีการเข้าถาน ▶</button>
          <div class="pct-ph-r">
            <button class="pct-btn pct-btn-o" @click="showToast('📥 กำลังดำเนินการ...')">⬇ นำเข้า</button>
            <button class="pct-btn pct-btn-p" @click="openModal">+ สร้างโครงการ</button>
          </div>
        </div>

        <div class="pct-inner">
          <div class="pct-tcard">
            <div class="pct-tcard-hd">
              <span class="pct-tcard-ti">รายการโครงการ</span>
              <button class="pct-btn pct-btn-o pct-btn-sm" @click="showToast('📤 ส่งออกแล้ว')">📤 ส่งออก</button>
              <button class="pct-btn pct-btn-o pct-btn-sm" @click="showToast('📋 ส่งพิมพ์แล้ว')">🖨 ส่งพิมพ์</button>
            </div>
            <div class="pct-filters">
              <div class="pct-fsearch-wrap">
                <span class="pct-fsearch-ic">🔍</span>
                <input class="pct-fsearch" v-model="filter.q" type="text" placeholder="ค้นหาชื่อหรือรหัสโครงการ..." />
              </div>
              <select class="pct-fsel" v-model="filter.st" :class="{ active: filter.st }">
                <option value="">สถานะ : ทั้งหมด</option>
                <option value="active">กำลังใช้งาน</option>
                <option value="closed">ปิดแล้ว</option>
                <option value="tpl">Template</option>
              </select>
              <select class="pct-fsel" v-model="filter.type" :class="{ active: filter.type }">
                <option value="">ประเภท : ทั้งหมด</option>
                <option value="อาคารชุด">อาคารชุด / คอนโด</option>
                <option value="หมู่บ้าน">หมู่บ้านจัดสรร</option>
                <option value="อาคารผสม">อาคารผสม</option>
                <option value="Template">Template</option>
              </select>
              <select class="pct-fsel" v-model="filter.pkg" :class="{ active: filter.pkg }">
                <option value="">Package : ทั้งหมด</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <button v-if="hasFilter" class="pct-btn-reset" @click="resetFilter">✕ ล้าง filter</button>
            </div>

            <table class="pct-tbl">
              <thead>
                <tr>
                  <th><span class="pct-srt">รหัสโครงการ <span class="pct-sar"><span>▲</span><span>▼</span></span></span></th>
                  <th><span class="pct-srt">ชื่อโครงการ <span class="pct-sar"><span>▲</span><span>▼</span></span></span></th>
                  <th><span class="pct-srt">ประเภท <span class="pct-sar"><span>▲</span><span>▼</span></span></span></th>
                  <th><span class="pct-srt">ยูนิต <span class="pct-sar"><span>▲</span><span>▼</span></span></span></th>
                  <th><span class="pct-srt">วันที่สร้าง <span class="pct-sar"><span>▲</span><span>▼</span></span></span></th>
                  <th><span class="pct-srt">สถานะ <span class="pct-sar"><span>▲</span><span>▼</span></span></span></th>
                  <th><span class="pct-srt">Package <span class="pct-sar"><span>▲</span><span>▼</span></span></span></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredRows.length === 0">
                  <td colspan="8" class="pct-tbl-empty">
                    <div style="font-size:28px;margin-bottom:8px">🔍</div>ไม่พบรายการที่ตรงกับเงื่อนไข
                  </td>
                </tr>
                <tr v-for="r in filteredRows" :key="r.id">
                  <td><a class="pct-tbl-link">{{ r.id }}</a></td>
                  <td>{{ r.name }}</td>
                  <td>{{ r.type }}</td>
                  <td>{{ r.units ?? '–' }}</td>
                  <td>{{ r.date }}</td>
                  <td><span class="pct-badge" :class="stClass(r.st)">{{ stLabel(r.st) }}</span></td>
                  <td>
                    <span v-if="r.pkg" class="pct-pkg-badge" :class="pkgClass(r.pkg)">{{ r.pkg }}</span>
                    <span v-else style="color:var(--pct-text3)">–</span>
                  </td>
                  <td>
                    <div class="pct-tbl-acts">
                      <div class="pct-bic" title="แก้ไข">✏️</div>
                      <div class="pct-bic" title="พิมพ์">🖨️</div>
                      <div class="pct-bic" title="คัดลอก">📋</div>
                      <div class="pct-bic" title="ลิงก์">🔗</div>
                      <div class="pct-bic pct-bic-del" @click="openDelModal(r.id)" title="ลบโครงการ">🗑️</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="pct-tbl-ft">
              <span>{{ tableCountText }}</span>
              <div class="pct-pgb">
                <div class="pct-pgbtn">«</div>
                <div class="pct-pgbtn">‹</div>
                <div class="pct-pgbtn pct-act">1</div>
                <div class="pct-pgbtn">›</div>
                <div class="pct-pgbtn">»</div>
              </div>
              <select class="pct-pgsz">
                <option>100</option><option>50</option><option>25</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- ─── CREATE PROJECT MODAL ─── -->
    <div v-if="modal.open" class="pct-overlay" @click.self="closeModal">
      <div class="pct-modal">
        <div class="pct-modal-hd">
          <div class="pct-modal-hd-ic">🏗️</div>
          <div>
            <div class="pct-modal-ti">{{ modalTitle }}</div>
            <div class="pct-modal-sub">{{ modalSub }}</div>
          </div>
          <button class="pct-modal-x" @click="closeModal">✕</button>
        </div>

        <div class="pct-modal-bd">
          <!-- Step indicator -->
          <div class="pct-m-steps">
            <div class="pct-ms-item" :class="stepClass(1)">
              <div class="pct-ms-dot">{{ modal.step > 1 ? '✓' : '1' }}</div> รูปแบบ
            </div>
            <div class="pct-ms-line" :class="{ done: modal.step > 1 }"></div>
            <div class="pct-ms-item" :class="stepClass(2)">
              <div class="pct-ms-dot">{{ modal.step > 2 ? '✓' : '2' }}</div> ข้อมูลโครงการ
            </div>
            <div class="pct-ms-line" :class="{ done: modal.step > 2 }"></div>
            <div class="pct-ms-item" :class="stepClass(3)">
              <div class="pct-ms-dot">3</div> ยืนยัน
            </div>
          </div>

          <!-- Step 1: Type -->
          <div v-if="modal.step === 1">
            <div class="pct-type-opts">
              <div class="pct-topt" :class="{ sel: form.type === 'empty' }" @click="selectType('empty')">
                <div class="pct-topt-top">
                  <div class="pct-topt-ic">🏗️</div>
                  <div class="pct-topt-radio"></div>
                </div>
                <div class="pct-topt-lbl">โครงการเปล่า</div>
                <div class="pct-topt-desc">สร้างโครงการใหม่โดยไม่มีข้อมูลใดๆ</div>
              </div>
              <div class="pct-topt" :class="{ sel: form.type === 'clone' }" @click="selectType('clone')">
                <div class="pct-topt-top">
                  <div class="pct-topt-ic">📋</div>
                  <div class="pct-topt-radio"></div>
                </div>
                <div class="pct-topt-lbl">โคลนโครงการที่มีอยู่</div>
                <div class="pct-topt-desc">คัดลอกโครงสร้างและข้อมูลจากโครงการที่มีอยู่ในระบบ</div>
              </div>
            </div>

            <!-- Clone picker -->
            <div v-if="form.type === 'clone'" class="pct-sec-box" style="margin-top:12px">
              <div class="pct-picker-lbl">เลือกโครงการต้นแบบ</div>
              <div class="pct-cp-srch">
                <input type="text" v-model="cloneSearch" placeholder="ค้นหาโครงการ..." />
              </div>
              <div class="pct-cp-list">
                <div
                  v-for="p in filteredProjects"
                  :key="p.id"
                  class="pct-cp-row"
                  :class="{ sel: form.srcId === p.id }"
                  @click="selectSource(p.id)"
                >
                  <div class="pct-cp-ava" :style="{ background: p.bg, color: p.fg }">{{ p.ini }}</div>
                  <div class="pct-cp-inf">
                    <div class="pct-cp-nm">{{ p.name }}</div>
                    <div class="pct-cp-id">{{ p.id }}{{ p.units ? ' · ' + p.units + ' ยูนิต' : '' }} · {{ p.type }}</div>
                  </div>
                  <span class="pct-badge" :class="p.st === 'tpl' ? 'b-tpl' : 'b-act'">{{ p.st === 'tpl' ? 'Template' : 'Active' }}</span>
                  <div class="pct-rdot"></div>
                </div>
              </div>

              <!-- Clone data checkboxes -->
              <div v-if="form.srcId" class="pct-sec-box" style="margin-top:12px">
                <div class="pct-sec-hd">
                  <span class="pct-sec-lbl">ข้อมูลที่ต้องการโคลน</span>
                  <span class="pct-lnk" @click="toggleAllClone">{{ allCloneOn ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด' }}</span>
                </div>
                <div class="pct-chk-grid">
                  <div
                    v-for="(label, key) in CLONE_LABELS"
                    :key="key"
                    class="pct-chk-item pct-purple"
                    :class="{ on: form.cloneData.has(key) }"
                    @click="toggleClone(key)"
                  >
                    <div class="pct-chkbox">{{ form.cloneData.has(key) ? '✓' : '' }}</div>
                    {{ label }}
                  </div>
                </div>
                <div class="pct-info-note">ℹ️ ข้อมูลจะถูกคัดลอกจากโครงการต้นแบบ สามารถแก้ไขได้ภายหลัง</div>
              </div>
            </div>
          </div>

          <!-- Step 2: Info -->
          <div v-if="modal.step === 2">
            <div class="pct-form-grp">
              <div class="pct-form-lbl">ชื่อโครงการ <span class="pct-req">*</span></div>
              <input class="pct-form-ctrl" v-model="form.name" type="text" placeholder="เช่น คอนโดมิเนียม เขต บางนา สุขุมวิท" @input="genCode" />
            </div>
            <div class="pct-form-grp">
              <div class="pct-form-lbl">
                รหัสโครงการ
                <span style="font-size:11px;color:var(--pct-text3);font-weight:400">สร้างอัตโนมัติ</span>
              </div>
              <div class="pct-code-wrap">
                <input class="pct-form-ctrl" v-model="form.code" type="text" disabled />
                <span class="pct-auto-badge">AUTO</span>
              </div>
            </div>
            <div class="pct-form-grp">
              <div class="pct-form-lbl">ประเภทอาคาร</div>
              <select class="pct-form-ctrl" v-model="form.buildingType">
                <option value="">— เลือกประเภท —</option>
                <option value="condo">อาคารชุด / คอนโด</option>
                <option value="village">หมู่บ้านจัดสรร</option>
                <option value="office">อาคารสำนักงาน</option>
                <option value="mixed">อาคารผสม</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>
            <div class="pct-form-grp">
              <div class="pct-form-lbl">จำนวนยูนิต</div>
              <input class="pct-form-ctrl" v-model="form.units" type="number" placeholder="เช่น 250" />
            </div>
          </div>

          <!-- Step 3: Summary -->
          <div v-if="modal.step === 3">
            <div class="pct-sum-rows">
              <div class="pct-sum-row">
                <span class="pct-sum-k">รูปแบบ</span>
                <span class="pct-sum-v">{{ form.type === 'empty' ? '🏗️ โครงการเปล่า' : '📋 โคลนโครงการต้นแบบ' }}</span>
              </div>
              <div v-if="form.type === 'clone' && sourceProject" class="pct-sum-row">
                <span class="pct-sum-k">โครงการต้นแบบ</span>
                <span class="pct-sum-v">
                  {{ sourceProject.name }}<br>
                  <span style="font-size:11px;color:var(--pct-text3)">{{ sourceProject.id }}</span>
                </span>
              </div>
              <div class="pct-sum-row">
                <span class="pct-sum-k">ชื่อโครงการ</span>
                <span class="pct-sum-v">{{ form.name }}</span>
              </div>
              <div class="pct-sum-row">
                <span class="pct-sum-k">รหัสโครงการ</span>
                <span class="pct-sum-v">{{ form.code }}</span>
              </div>
              <div v-if="form.buildingType" class="pct-sum-row">
                <span class="pct-sum-k">ประเภทอาคาร</span>
                <span class="pct-sum-v">{{ buildingTypeLabel }}</span>
              </div>
              <div v-if="form.units" class="pct-sum-row">
                <span class="pct-sum-k">จำนวนยูนิต</span>
                <span class="pct-sum-v">{{ parseInt(form.units).toLocaleString() }} ยูนิต</span>
              </div>
              <div v-if="form.type === 'clone' && form.cloneData.size > 0" class="pct-sum-row">
                <span class="pct-sum-k">โคลนข้อมูล</span>
                <div class="pct-sum-v">
                  <div class="pct-tag-wrap">
                    <span v-for="key in form.cloneData" :key="key" class="pct-stag pct-pu">{{ CLONE_LABELS[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pct-modal-ft">
          <button class="pct-btn pct-btn-g" @click="handleLeft">{{ modal.step === 1 ? 'ยกเลิก' : '← กลับ' }}</button>
          <div style="display:flex;gap:8px;align-items:center">
            <span style="font-size:12px;color:var(--pct-text3)">{{ modal.step }} / 3</span>
            <button class="pct-btn" :class="modal.step === 3 ? 'pct-btn-s' : 'pct-btn-p'" @click="handleRight">
              {{ modal.step === 3 ? '✓ สร้างโครงการ' : 'ถัดไป →' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRM MODAL -->
    <div v-if="delModal.open" class="pct-overlay" @click.self="closeDelModal">
      <div class="pct-del-modal">
        <div class="pct-del-modal-hd">
          <div class="pct-del-ic">🗑️</div>
          <div style="flex:1">
            <div class="pct-modal-ti">ยืนยันการลบโครงการ</div>
            <div class="pct-modal-sub">การดำเนินการนี้ไม่สามารถย้อนกลับได้</div>
          </div>
          <button class="pct-modal-x" @click="closeDelModal">✕</button>
        </div>
        <div class="pct-del-modal-bd">
          <div style="font-size:13px;color:var(--pct-text2);line-height:1.7">
            คุณต้องการลบโครงการ <strong style="color:var(--pct-text)">{{ delModal.projName }}</strong> ออกจากระบบ?
          </div>
          <div class="pct-del-warn">
            ⚠️ ข้อมูลทั้งหมดของโครงการนี้จะถูกลบออกอย่างถาวร รวมถึงข้อมูลผู้อยู่อาศัย บัญชีการเงิน และเอกสารทั้งหมด
          </div>
        </div>
        <div class="pct-del-modal-ft">
          <button class="pct-btn pct-btn-g" @click="closeDelModal">ยกเลิก</button>
          <button class="pct-btn pct-btn-danger" @click="confirmDelete">🗑️ ลบโครงการ</button>
        </div>
      </div>
    </div>

    <!-- TOAST -->
    <div class="pct-toast" :class="{ show: toast.show }">{{ toast.msg }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// ─── Static data ───
const PROJECTS = [
  { id: 'PRJ-2022-001', name: 'เดอะ การ์เด้น สุขุมวิท', units: 320, type: 'คอนโด', st: 'active', bg: '#dbeafe', fg: '#1d4ed8', ini: 'DP' },
  { id: 'PRJ-2022-008', name: 'เดอะ ลาเวนเดอร์ บางนา',  units: 180, type: 'คอนโด', st: 'active', bg: '#f3e8ff', fg: '#7c3aed', ini: 'TL' },
  { id: 'PRJ-2023-003', name: 'เวอร์แนนท์ พระราม 9',    units: 512, type: 'อาคารผสม', st: 'active', bg: '#fef3c7', fg: '#b45309', ini: 'VX' },
  { id: 'PRJ-2023-011', name: 'ริเวอร์แดนซ์ วิลล์',     units: 98,  type: 'หมู่บ้าน', st: 'active', bg: '#dcfce7', fg: '#15803d', ini: 'RV' },
  { id: 'TPL-STD-001',  name: 'Template Standard Condo', units: null, type: 'Template', st: 'tpl', bg: '#ffedd5', fg: '#c2410c', ini: 'TS' },
  { id: 'TPL-STD-002',  name: 'Template Village STD',    units: null, type: 'Template', st: 'tpl', bg: '#ffedd5', fg: '#c2410c', ini: 'TV' },
]

const CLONE_LABELS = {
  doc_channel:  '📨 ช่องทางส่งเอกสาร',
  income:       '💰 รายรับ',
  billing_set:  '🧾 ชุดเรียกเก็บ',
  expense:      '💸 รายจ่าย',
  coa:          '📊 ผังบัญชี',
  voucher:      '📁 แฟ้มเอกสาร Voucher',
  frequent_acc: '⭐ บัญชีใช้บ่อย',
  acc_policy:   '📋 นโยบายบันทึกบัญชี',
}

const BUILDING_TYPE_LABELS = {
  condo: 'อาคารชุด / คอนโด',
  village: 'หมู่บ้านจัดสรร',
  office: 'อาคารสำนักงาน',
  mixed: 'อาคารผสม',
  other: 'อื่นๆ',
}

// ─── Table rows ───
const rows = ref([
  { id: 'PRJ-2022-001', name: 'เดอะ การ์เด้น สุขุมวิท',   type: 'อาคารชุด',  units: 320,  date: '15/3/2565',  st: 'active', pkg: 'Premium' },
  { id: 'PRJ-2022-008', name: 'เดอะ ลาเวนเดอร์ บางนา',    type: 'อาคารชุด',  units: 180,  date: '22/7/2565',  st: 'active', pkg: 'Standard' },
  { id: 'PRJ-2023-003', name: 'เวอร์แนนท์ พระราม 9',       type: 'อาคารผสม',  units: 512,  date: '5/1/2566',   st: 'active', pkg: 'Enterprise' },
  { id: 'PRJ-2023-011', name: 'ริเวอร์แดนซ์ วิลล์',        type: 'หมู่บ้าน',  units: 98,   date: '18/4/2566',  st: 'active', pkg: 'Basic' },
  { id: 'PRJ-2024-002', name: 'เดอะ คอร์ท สาทร',           type: 'อาคารชุด',  units: 240,  date: '3/2/2567',   st: 'active', pkg: 'Standard' },
  { id: 'PRJ-2024-007', name: 'กรีนวิลล์ รังสิต',          type: 'หมู่บ้าน',  units: 150,  date: '11/5/2567',  st: 'closed', pkg: 'Basic' },
  { id: 'PRJ-2021-005', name: 'ดาราเดนส์ บางกล่ำ',          type: 'อาคารชุด',  units: 210,  date: '8/8/2564',   st: 'closed', pkg: 'Standard' },
  { id: 'TPL-STD-001',  name: 'Template Standard Condo',   type: 'Template',  units: null, date: '1/1/2565',   st: 'tpl',    pkg: null },
  { id: 'TPL-STD-002',  name: 'Template Village STD',      type: 'Template',  units: null, date: '1/1/2565',   st: 'tpl',    pkg: null },
])

// ─── Filter state ───
const filter = reactive({ q: '', st: '', type: '', pkg: '' })

const hasFilter = computed(() => filter.q || filter.st || filter.type || filter.pkg)

const filteredRows = computed(() => {
  return rows.value.filter(r => {
    const q = filter.q.toLowerCase()
    return (
      (!q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) &&
      (!filter.st || r.st === filter.st) &&
      (!filter.type || r.type === filter.type) &&
      (!filter.pkg || r.pkg === filter.pkg)
    )
  })
})

const tableCountText = computed(() => {
  const total = rows.value.length
  const shown = filteredRows.value.length
  return shown === total ? `ทั้งหมด ${total} รายการ` : `แสดง ${shown} จาก ${total} รายการ`
})

function resetFilter() {
  filter.q = ''; filter.st = ''; filter.type = ''; filter.pkg = ''
}

// ─── Badge helpers ───
function stLabel(st) { return { active: 'กำลังใช้งาน', closed: 'ปิดแล้ว', tpl: 'Template' }[st] }
function stClass(st) { return { active: 'b-act', closed: 'b-closed', tpl: 'b-tpl' }[st] }
function pkgClass(pkg) { return { Basic: 'pkg-basic', Standard: 'pkg-std', Premium: 'pkg-prem', Enterprise: 'pkg-ent' }[pkg] }

// ─── Modal state ───
let codeSeq = 12

const modal = reactive({ open: false, step: 1 })
const form = reactive({
  type: 'empty',
  srcId: null,
  cloneData: new Set(Object.keys(CLONE_LABELS)),
  name: '',
  code: '',
  buildingType: '',
  units: '',
})

const cloneSearch = ref('')

const MODAL_TITLES = ['เลือกรูปแบบโครงการ', 'ข้อมูลโครงการ', 'ยืนยันการสร้าง']
const MODAL_SUBS   = ['กำหนดรูปแบบและข้อมูลที่ต้องการ', 'กรอกรายละเอียดของโครงการใหม่', 'ตรวจสอบข้อมูลก่อนสร้างโครงการ']
const modalTitle = computed(() => MODAL_TITLES[modal.step - 1])
const modalSub   = computed(() => MODAL_SUBS[modal.step - 1])

const filteredProjects = computed(() => {
  const q = cloneSearch.value.toLowerCase()
  return PROJECTS.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
})

const sourceProject = computed(() => PROJECTS.find(p => p.id === form.srcId) ?? null)

const buildingTypeLabel = computed(() => BUILDING_TYPE_LABELS[form.buildingType] ?? '')

const allCloneOn = computed(() => form.cloneData.size === Object.keys(CLONE_LABELS).length)

function stepClass(n) {
  if (n < modal.step) return 'done'
  if (n === modal.step) return 'act'
  return ''
}

function openModal() {
  Object.assign(form, {
    type: 'empty', srcId: null, cloneData: new Set(Object.keys(CLONE_LABELS)),
    name: '', code: '', buildingType: '', units: '',
  })
  cloneSearch.value = ''
  modal.step = 1
  modal.open = true
}

function closeModal() { modal.open = false }

function selectType(t) {
  form.type = t
  form.srcId = null
}

function selectSource(id) { form.srcId = id }

function toggleClone(key) {
  if (form.cloneData.has(key)) form.cloneData.delete(key)
  else form.cloneData.add(key)
}

function toggleAllClone() {
  if (allCloneOn.value) form.cloneData.clear()
  else Object.keys(CLONE_LABELS).forEach(k => form.cloneData.add(k))
}

function genCode() {
  if (!form.name.trim()) { form.code = ''; return }
  const y = new Date().getFullYear()
  codeSeq++
  form.code = `PRJ-${y}-${String(codeSeq).padStart(3, '0')}`
}

function handleLeft() {
  if (modal.step === 1) closeModal()
  else modal.step--
}

function handleRight() {
  if (modal.step === 1) {
    if (form.type === 'clone' && !form.srcId) { showToast('⚠️ กรุณาเลือกโครงการต้นแบบ'); return }
    if (form.type === 'clone' && form.cloneData.size === 0) { showToast('⚠️ กรุณาเลือกข้อมูลที่ต้องการโคลน'); return }
    modal.step = 2
  } else if (modal.step === 2) {
    if (!form.name.trim()) { showToast('⚠️ กรุณากรอกชื่อโครงการ'); return }
    modal.step = 3
  } else {
    closeModal()
    showToast(`✅ สร้างโครงการ "${form.name}" เรียบร้อยแล้ว`)
  }
}

// ─── Delete modal ───
const delModal = reactive({ open: false, id: null, projName: '' })

function openDelModal(id) {
  const r = rows.value.find(r => r.id === id)
  delModal.id = id
  delModal.projName = `"${r.name}" (${r.id})`
  delModal.open = true
}

function closeDelModal() { delModal.open = false; delModal.id = null }

function confirmDelete() {
  const r = rows.value.find(r => r.id === delModal.id)
  rows.value = rows.value.filter(r => r.id !== delModal.id)
  closeDelModal()
  showToast(`🗑️ ลบโครงการ "${r.name}" เรียบร้อยแล้ว`)
}

// ─── Toast ───
const toast = reactive({ show: false, msg: '' })
let toastTimer = null

function showToast(msg) {
  clearTimeout(toastTimer)
  toast.msg = msg
  toast.show = true
  toastTimer = setTimeout(() => { toast.show = false }, 2800)
}

// Keyboard shortcut
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeDelModal() }
})
</script>

<style scoped>
/* ── Design tokens (local to this prototype) ── */
.pct-app {
  --pct-bg:       #f0f2f5;
  --pct-white:    #ffffff;
  --pct-border:   #e2e6ea;
  --pct-border2:  #d0d7de;
  --pct-text:     #1a2332;
  --pct-text2:    #5a6a7a;
  --pct-text3:    #9aabb8;
  --pct-primary:  var(--color-primary-500, #1c70f7);
  --pct-primary-h: #1566bb;
  --pct-primary-lt: var(--color-primary-200, #e9f1ff);
  --pct-primary-bd: #bee3f8;
  --pct-success:  var(--color-success, #05a861);
  --pct-success-lt: var(--color-success-bg, #f2fff9);
  --pct-success-bd: #b2f2bb;
  --pct-warn-lt:  #fff9db;
  --pct-danger:   var(--color-error, #f03737);
  --pct-purple:   #7950f2;
  --pct-purple-lt: #f3f0ff;
  --pct-shadow-sm: 0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04);
  --pct-shadow-lg: 0 8px 40px rgba(0,0,0,.13),0 2px 8px rgba(0,0,0,.07);

  font-family: var(--font-family, 'Sarabun', sans-serif);
  font-size: 14px;
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--pct-bg);
  color: var(--pct-text);
}

/* ── Sidebar ── */
.pct-sb { width: 240px; background: var(--pct-white); border-right: 1px solid var(--pct-border); display: flex; flex-direction: column; flex-shrink: 0; overflow-y: auto; }
.pct-sb-logo { padding: 14px 16px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--pct-border); }
.pct-sb-logo-ic { width: 36px; height: 36px; background: var(--pct-primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; flex-shrink: 0; }
.pct-sb-logo-nm { font-weight: 700; font-size: 14px; }
.pct-sb-logo-sb { font-size: 11px; color: var(--pct-text3); }
.pct-sb-srch { padding: 10px 12px; border-bottom: 1px solid var(--pct-border); }
.pct-sb-srch-w { position: relative; }
.pct-sb-srch-w input { width: 100%; background: var(--pct-bg); border: 1px solid var(--pct-border); border-radius: 6px; padding: 7px 10px; font-size: 13px; font-family: inherit; outline: none; color: var(--pct-text); }
.pct-sb-sec { font-size: 11px; font-weight: 600; color: var(--pct-text3); padding: 10px 16px 4px; text-transform: uppercase; letter-spacing: .04em; }
.pct-ni { display: flex; align-items: center; gap: 8px; padding: 8px 16px; cursor: pointer; font-size: 13px; color: var(--pct-text2); transition: background .1s; user-select: none; }
.pct-ni:hover { background: var(--pct-bg); color: var(--pct-text); }
.pct-ni.pct-act { background: var(--pct-primary-lt); color: var(--pct-primary); font-weight: 600; }
.pct-ni.pct-i1 { padding-left: 32px; }
.pct-ni.pct-i2 { padding-left: 48px; }
.pct-ng { display: flex; align-items: center; gap: 8px; padding: 8px 16px; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--pct-text2); transition: background .1s; }
.pct-ng:hover { background: var(--pct-bg); }
.pct-ng .pct-cv { margin-left: auto; font-size: 10px; color: var(--pct-text3); }
.pct-ng.pct-primary { color: var(--pct-primary); }
.pct-sb-user { margin-top: auto; padding: 12px 14px; border-top: 1px solid var(--pct-border); display: flex; align-items: center; gap: 10px; }
.pct-sb-ua { width: 32px; height: 32px; border-radius: 50%; background: var(--pct-success-lt); border: 2px solid var(--pct-success); display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.pct-sb-un { font-size: 13px; font-weight: 500; }
.pct-sb-us { font-size: 11px; color: var(--pct-success); }
.pct-sb-um { margin-left: auto; color: var(--pct-text3); cursor: pointer; font-size: 18px; line-height: 1; }

/* ── Main ── */
.pct-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.pct-topbar { height: 56px; background: var(--pct-white); border-bottom: 1px solid var(--pct-border); display: flex; align-items: center; padding: 0 24px; gap: 8px; flex-shrink: 0; }
.pct-tb-bc { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--pct-text2); flex: 1; }
.pct-sep { color: var(--pct-text3); }
.pct-cur { color: var(--pct-text); font-weight: 500; }
.pct-tb-proj { display: flex; align-items: center; gap: 8px; background: var(--pct-bg); border: 1px solid var(--pct-border); border-radius: 8px; padding: 6px 12px; font-size: 12px; color: var(--pct-text2); cursor: pointer; white-space: nowrap; }
.pct-content { flex: 1; overflow-y: auto; }

/* ── Page header ── */
.pct-phdr { background: var(--pct-white); border-bottom: 1px solid var(--pct-border); padding: 12px 24px; display: flex; align-items: center; gap: 10px; }
.pct-ph-bk { font-size: 18px; color: var(--pct-text3); cursor: pointer; padding: 2px 6px; border-radius: 4px; line-height: 1; }
.pct-ph-ti { font-size: 16px; font-weight: 600; }
.pct-ph-how { display: flex; align-items: center; gap: 6px; background: #fd7e14; color: #fff; border: none; border-radius: 20px; padding: 7px 16px; font-size: 13px; font-family: inherit; font-weight: 500; cursor: pointer; }
.pct-ph-how:hover { background: #e96b00; }
.pct-ph-r { margin-left: auto; display: flex; gap: 8px; }

/* ── Buttons ── */
.pct-btn { display: inline-flex; align-items: center; gap: 6px; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-family: inherit; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all .12s; white-space: nowrap; line-height: 1.4; }
.pct-btn-p { background: var(--pct-primary); color: #fff; border-color: var(--pct-primary); }
.pct-btn-p:hover { background: var(--pct-primary-h); }
.pct-btn-o { background: var(--pct-white); color: var(--pct-text2); border-color: var(--pct-border2); }
.pct-btn-o:hover { background: var(--pct-bg); border-color: var(--pct-text3); color: var(--pct-text); }
.pct-btn-g { background: transparent; color: var(--pct-text2); border-color: var(--pct-border); }
.pct-btn-g:hover { background: var(--pct-bg); }
.pct-btn-s { background: var(--pct-success); color: #fff; border-color: var(--pct-success); }
.pct-btn-s:hover { background: #04905a; }
.pct-btn-sm { padding: 5px 10px; font-size: 12px; border-radius: 6px; }
.pct-btn-danger { background: var(--pct-danger); color: #fff; border-color: var(--pct-danger); }
.pct-btn-danger:hover { background: #c92a2a; }
.pct-bic { width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; background: transparent; border: 1px solid var(--pct-border); cursor: pointer; font-size: 14px; color: var(--pct-text2); transition: all .1s; }
.pct-bic:hover { background: var(--pct-bg); }
.pct-bic-del:hover { background: #fff5f5 !important; border-color: #ffc9c9 !important; color: var(--pct-danger) !important; }

/* ── Table ── */
.pct-inner { padding: 20px 24px; }
.pct-tcard { background: var(--pct-white); border: 1px solid var(--pct-border); border-radius: 12px; box-shadow: var(--pct-shadow-sm); overflow: hidden; }
.pct-tcard-hd { padding: 14px 20px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--pct-border); }
.pct-tcard-ti { font-size: 15px; font-weight: 600; flex: 1; }
.pct-filters { display: flex; align-items: center; gap: 8px; padding: 12px 20px; border-bottom: 1px solid var(--pct-border); flex-wrap: wrap; }
.pct-fsearch-wrap { position: relative; flex: 1; min-width: 200px; }
.pct-fsearch-ic { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 12px; pointer-events: none; }
.pct-fsearch { width: 100%; border: 1px solid var(--pct-border2); border-radius: 8px; padding: 7px 12px 7px 30px; font-size: 13px; font-family: inherit; color: var(--pct-text); background: var(--pct-white); outline: none; }
.pct-fsearch:focus { border-color: var(--pct-primary); box-shadow: 0 0 0 3px rgba(28,112,247,.08); }
.pct-fsearch::placeholder { color: var(--pct-text3); }
.pct-fsel { border: 1px solid var(--pct-border2); border-radius: 8px; padding: 7px 28px 7px 10px; font-size: 13px; font-family: inherit; color: var(--pct-text); background: var(--pct-white); outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%235a6a7a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; }
.pct-fsel:focus { border-color: var(--pct-primary); }
.pct-fsel.active { border-color: var(--pct-primary); background-color: var(--pct-primary-lt); color: var(--pct-primary); }
.pct-btn-reset { display: inline-flex; align-items: center; gap: 4px; border: 1px solid #ffc9c9; border-radius: 8px; padding: 7px 12px; font-size: 12px; font-family: inherit; font-weight: 500; cursor: pointer; background: #fff5f5; color: #c92a2a; white-space: nowrap; transition: all .12s; }
.pct-btn-reset:hover { background: #ffe3e3; }
.pct-tbl { width: 100%; border-collapse: collapse; }
.pct-tbl thead tr { border-bottom: 1px solid var(--pct-border); }
.pct-tbl th { padding: 10px 16px; font-size: 13px; font-weight: 600; color: var(--pct-text2); text-align: left; white-space: nowrap; }
.pct-srt { display: inline-flex; align-items: center; gap: 3px; cursor: pointer; user-select: none; }
.pct-srt:hover { color: var(--pct-text); }
.pct-sar { display: flex; flex-direction: column; gap: 0; font-size: 8px; color: var(--pct-text3); line-height: 1; }
.pct-tbl tbody tr { border-bottom: 1px solid var(--pct-border); transition: background .1s; }
.pct-tbl tbody tr:last-child { border-bottom: none; }
.pct-tbl tbody tr:hover { background: #f8f9fb; }
.pct-tbl td { padding: 12px 16px; font-size: 13px; color: var(--pct-text); vertical-align: middle; }
.pct-tbl-link { color: var(--pct-primary); text-decoration: underline; text-underline-offset: 2px; cursor: pointer; }
.pct-tbl-acts { display: flex; align-items: center; gap: 6px; }
.pct-tbl-empty { text-align: center; padding: 40px 16px; color: var(--pct-text3); font-size: 13px; }
.pct-tbl-ft { padding: 12px 16px; display: flex; align-items: center; border-top: 1px solid var(--pct-border); font-size: 13px; color: var(--pct-text2); gap: 8px; }
.pct-pgb { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.pct-pgbtn { width: 30px; height: 30px; border: 1px solid var(--pct-border); border-radius: 6px; background: var(--pct-white); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; color: var(--pct-text2); transition: all .1s; }
.pct-pgbtn:hover { background: var(--pct-bg); }
.pct-pgbtn.pct-act { background: var(--pct-primary); color: #fff; border-color: var(--pct-primary); }
.pct-pgsz { border: 1px solid var(--pct-border2); border-radius: 6px; padding: 4px 20px 4px 8px; font-size: 12px; font-family: inherit; background: var(--pct-white); outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%235a6a7a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 6px center; }

/* ── Badges ── */
.pct-badge { font-size: 11px; padding: 2px 8px; border-radius: 20px; font-weight: 500; white-space: nowrap; }
.b-act    { background: var(--pct-success-lt); color: var(--pct-success); border: 1px solid var(--pct-success-bd); }
.b-tpl    { background: var(--pct-warn-lt); color: #b45309; border: 1px solid #ffe08a; }
.b-closed { background: #f1f3f5; color: #5a6a7a; border: 1px solid #dee2e6; }
.pct-pkg-badge { font-size: 11px; padding: 2px 8px; border-radius: 20px; font-weight: 600; white-space: nowrap; }
.pkg-basic { background: #f1f3f5; color: #5a6a7a; border: 1px solid #dee2e6; }
.pkg-std   { background: var(--pct-primary-lt); color: var(--pct-primary); border: 1px solid var(--pct-primary-bd); }
.pkg-prem  { background: #fff3bf; color: #b45309; border: 1px solid #ffe066; }
.pkg-ent   { background: var(--pct-purple-lt); color: var(--pct-purple); border: 1px solid #d0bfff; }

/* ── Modal ── */
.pct-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.38); z-index: 900; display: flex; align-items: center; justify-content: center; }
.pct-modal { background: var(--pct-white); border-radius: 14px; box-shadow: var(--pct-shadow-lg); width: 520px; max-width: 95vw; max-height: 92vh; display: flex; flex-direction: column; animation: pctMIn .16s ease; }
@keyframes pctMIn { from { opacity: 0; transform: translateY(-12px) } to { opacity: 1; transform: translateY(0) } }
.pct-modal-hd { padding: 18px 22px 14px; display: flex; align-items: flex-start; gap: 12px; border-bottom: 1px solid var(--pct-border); flex-shrink: 0; }
.pct-modal-hd-ic { width: 38px; height: 38px; border-radius: 10px; background: var(--pct-primary-lt); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.pct-modal-ti { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
.pct-modal-sub { font-size: 13px; color: var(--pct-text2); }
.pct-modal-x { margin-left: auto; width: 28px; height: 28px; border-radius: 6px; border: none; background: transparent; cursor: pointer; font-size: 18px; color: var(--pct-text3); display: flex; align-items: center; justify-content: center; transition: background .1s; line-height: 1; }
.pct-modal-x:hover { background: var(--pct-bg); color: var(--pct-text); }
.pct-modal-bd { padding: 22px; overflow-y: auto; flex: 1; }
.pct-modal-ft { padding: 14px 22px; border-top: 1px solid var(--pct-border); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }

/* Steps */
.pct-m-steps { display: flex; align-items: center; margin-bottom: 22px; }
.pct-ms-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--pct-text3); }
.pct-ms-item.act { color: var(--pct-primary); font-weight: 600; }
.pct-ms-item.done { color: var(--pct-success); }
.pct-ms-dot { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--pct-border2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; background: var(--pct-white); flex-shrink: 0; transition: all .2s; }
.pct-ms-item.act .pct-ms-dot { border-color: var(--pct-primary); background: var(--pct-primary); color: #fff; }
.pct-ms-item.done .pct-ms-dot { border-color: var(--pct-success); background: var(--pct-success); color: #fff; }
.pct-ms-line { flex: 1; height: 2px; background: var(--pct-border); margin: 0 8px; min-width: 20px; transition: background .3s; }
.pct-ms-line.done { background: var(--pct-success); }

/* Type options */
.pct-type-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.pct-topt { display: flex; flex-direction: column; border: 1.5px solid var(--pct-border); border-radius: 10px; padding: 16px; cursor: pointer; transition: all .14s; background: var(--pct-white); }
.pct-topt:hover { border-color: var(--pct-primary); background: var(--pct-primary-lt); }
.pct-topt.sel { border-color: var(--pct-primary); background: var(--pct-primary-lt); }
.pct-topt-top { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 12px; }
.pct-topt-radio { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--pct-border2); display: flex; align-items: center; justify-content: center; transition: all .14s; }
.pct-topt.sel .pct-topt-radio { border-color: var(--pct-primary); background: var(--pct-primary); }
.pct-topt-ic { font-size: 26px; }
.pct-topt-lbl { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.pct-topt-desc { font-size: 12px; color: var(--pct-text2); line-height: 1.5; }

/* Clone picker */
.pct-picker-lbl { font-size: 12px; font-weight: 600; color: var(--pct-text2); text-transform: uppercase; letter-spacing: .04em; margin-bottom: 8px; }
.pct-cp-srch { position: relative; margin-bottom: 8px; }
.pct-cp-srch input { width: 100%; border: 1px solid var(--pct-border2); border-radius: 8px; padding: 8px 12px; font-size: 13px; font-family: inherit; outline: none; background: var(--pct-white); color: var(--pct-text); }
.pct-cp-srch input:focus { border-color: var(--pct-primary); }
.pct-cp-srch input::placeholder { color: var(--pct-text3); }
.pct-cp-list { display: flex; flex-direction: column; gap: 5px; max-height: 188px; overflow-y: auto; }
.pct-cp-row { display: flex; align-items: center; gap: 10px; border: 1px solid var(--pct-border); border-radius: 8px; padding: 9px 12px; cursor: pointer; transition: all .13s; }
.pct-cp-row:hover { border-color: var(--pct-primary); background: var(--pct-primary-lt); }
.pct-cp-row.sel { border-color: var(--pct-primary); background: var(--pct-primary-lt); }
.pct-cp-ava { width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
.pct-cp-inf { flex: 1; min-width: 0; }
.pct-cp-nm { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pct-cp-id { font-size: 11px; color: var(--pct-text3); }
.pct-rdot { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--pct-border2); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all .13s; }
.pct-cp-row.sel .pct-rdot { background: var(--pct-primary); border-color: var(--pct-primary); }

/* Section box */
.pct-sec-box { background: #f8f9fb; border: 1px solid var(--pct-border); border-radius: 10px; padding: 14px; }
.pct-sec-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.pct-sec-lbl { font-size: 12px; font-weight: 600; color: var(--pct-text2); text-transform: uppercase; letter-spacing: .04em; }
.pct-lnk { font-size: 12px; color: var(--pct-primary); cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
.pct-chk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.pct-chk-item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--pct-white); border: 1px solid var(--pct-border); border-radius: 7px; cursor: pointer; transition: all .13s; font-size: 12px; }
.pct-chk-item:hover { border-color: var(--pct-border2); }
.pct-chk-item.pct-purple:hover { border-color: var(--pct-purple); background: var(--pct-purple-lt); }
.pct-chk-item.pct-purple.on { border-color: var(--pct-purple); background: var(--pct-purple-lt); }
.pct-chkbox { width: 14px; height: 14px; border-radius: 3px; border: 1.5px solid var(--pct-border2); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #fff; transition: all .13s; min-width: 14px; }
.pct-chk-item.pct-purple.on .pct-chkbox { background: var(--pct-purple); border-color: var(--pct-purple); }
.pct-info-note { display: flex; gap: 8px; background: var(--pct-primary-lt); border: 1px solid var(--pct-primary-bd); border-radius: 8px; padding: 9px 12px; font-size: 12px; color: var(--pct-primary); margin-top: 12px; line-height: 1.5; }

/* Form */
.pct-form-grp { margin-bottom: 16px; }
.pct-form-lbl { display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 500; color: var(--pct-text2); margin-bottom: 6px; }
.pct-req { color: var(--pct-danger); }
.pct-form-ctrl { width: 100%; border: 1px solid var(--pct-border2); border-radius: 8px; padding: 9px 12px; font-size: 13px; font-family: inherit; outline: none; background: var(--pct-white); transition: border-color .13s, box-shadow .13s; color: var(--pct-text); }
.pct-form-ctrl::placeholder { color: var(--pct-text3); }
.pct-form-ctrl:focus { border-color: var(--pct-primary); box-shadow: 0 0 0 3px rgba(28,112,247,.1); }
.pct-form-ctrl:disabled { background: #f7f8fa; color: var(--pct-text2); cursor: default; }
.pct-code-wrap { position: relative; }
.pct-code-wrap .pct-form-ctrl { padding-right: 90px; }
.pct-auto-badge { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; background: var(--pct-success-lt); color: var(--pct-success); border: 1px solid var(--pct-success-bd); border-radius: 4px; padding: 2px 7px; font-weight: 600; pointer-events: none; }

/* Summary */
.pct-sum-row { display: flex; align-items: flex-start; gap: 8px; padding: 9px 0; border-bottom: 1px solid var(--pct-border); font-size: 13px; }
.pct-sum-row:last-child { border-bottom: none; }
.pct-sum-k { color: var(--pct-text2); min-width: 130px; flex-shrink: 0; }
.pct-sum-v { color: var(--pct-text); font-weight: 500; flex: 1; }
.pct-tag-wrap { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 2px; }
.pct-stag { font-size: 11px; padding: 2px 8px; border-radius: 20px; background: var(--pct-primary-lt); color: var(--pct-primary); border: 1px solid var(--pct-primary-bd); }
.pct-stag.pct-pu { background: var(--pct-purple-lt); color: var(--pct-purple); border-color: #d0bfff; }

/* Delete modal */
.pct-del-modal { background: var(--pct-white); border-radius: 14px; box-shadow: var(--pct-shadow-lg); width: 420px; max-width: 95vw; animation: pctMIn .16s ease; }
.pct-del-modal-hd { padding: 18px 22px 14px; display: flex; align-items: flex-start; gap: 12px; border-bottom: 1px solid var(--pct-border); }
.pct-del-ic { width: 38px; height: 38px; border-radius: 10px; background: #fff5f5; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.pct-del-modal-bd { padding: 18px 22px; }
.pct-del-modal-ft { padding: 14px 22px; border-top: 1px solid var(--pct-border); display: flex; justify-content: flex-end; gap: 8px; }
.pct-del-warn { background: #fff5f5; border: 1px solid #ffc9c9; border-radius: 8px; padding: 10px 12px; margin-top: 12px; font-size: 12px; color: #c92a2a; line-height: 1.6; }

/* Toast */
.pct-toast { position: fixed; bottom: 20px; right: 20px; background: var(--pct-text); color: #fff; border-radius: 8px; padding: 10px 16px; font-size: 13px; box-shadow: 0 4px 16px rgba(0,0,0,.14); transform: translateY(60px); opacity: 0; transition: all .22s; z-index: 9999; pointer-events: none; }
.pct-toast.show { transform: translateY(0); opacity: 1; }

@media (max-width: 700px) { .pct-sb { display: none; } .pct-chk-grid { grid-template-columns: 1fr; } }
</style>
