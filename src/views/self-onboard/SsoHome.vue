<template>
  <div class="home-wrap">
    <!-- ============ PROMO / NEWS CAROUSEL ============ -->
    <div class="home-promo">
      <button type="button" class="home-promo-toggle" @click="showPromo = !showPromo">
        {{ showPromo ? 'ซ่อนรายการข่าวสาร' : 'แสดงรายการข่าวสาร' }}
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" :class="{ flip: !showPromo }"><path d="M5 12l5-5 5 5"/></svg>
      </button>

      <div v-if="showPromo" class="home-promo-track">
        <div v-for="p in PROMOS" :key="p.title" class="home-promo-card" :style="{ background: p.bg }">
          <div class="home-promo-ic">{{ p.icon }}</div>
          <p class="home-promo-caption">{{ p.caption }}</p>
        </div>
      </div>
    </div>

    <!-- ============ SECTION TABS ============ -->
    <h2 class="home-h2">ภาพรวมในส่วนงานต่างๆ</h2>
    <div class="home-tabs">
      <button type="button" class="home-tab" :class="{ on: tab === 'debt' }" @click="tab = 'debt'">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3.5h10v13H5z"/><line x1="7.5" y1="7" x2="12.5" y2="7"/><line x1="7.5" y1="10" x2="12.5" y2="10"/><line x1="7.5" y1="13" x2="11" y2="13"/></svg>
        หนี้คงค้าง
      </button>
      <button type="button" class="home-tab" :class="{ on: tab === 'occupancy' }" @click="tab = 'occupancy'">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7.5" r="3"/><path d="M4.5 16c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/></svg>
        สถานะพักอาศัย
      </button>
      <button type="button" class="home-tab cta">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8v13.5L10 14l-4 2.5z"/></svg>
        ดูสลิปรอตรวจสอบ
      </button>
    </div>

    <!-- ============ DEBT PANEL ============ -->
    <div v-if="tab === 'debt'" class="wz-card home-panel">
      <div class="home-panel-head">
        <h3>ภาพรวมในส่วนงาน หนี้คงค้าง <span class="wz-muted">(ณ วันที่ {{ asOfDate }})</span></h3>
        <div class="home-period">
          <span class="wz-muted">ข้อมูลแจ้งหนี้ ประจำงวด</span>
          <div class="home-period-pill">{{ periodLabel }}<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5"/></svg></div>
        </div>
      </div>

      <div class="home-cols">
        <div class="home-col">
          <h4>การชำระหนี้แยกตามรายรับ</h4>
          <div class="home-income-list">
            <button v-for="(inc, idx) in incomeSplit" :key="inc.code" type="button" class="home-income-btn" :class="{ on: idx === 0 }">
              <span>{{ inc.name }}</span><b>{{ inc.pct.toFixed(2) }}%</b>
            </button>
          </div>
        </div>

        <div class="home-col home-col--chart">
          <h4>สถานะการจัดเก็บหนี้ : {{ primaryIncomeName }}</h4>
          <div class="home-donut-row">
            <div class="home-donut">
              <span>100.00%</span>
            </div>
            <table class="home-mini-table">
              <thead><tr><th></th><th>ยูนิต</th><th>จำนวนเงิน (%)</th></tr></thead>
              <tbody>
                <tr><td><span class="home-dot ok"></span>ยอดแจ้งหนี้</td><td>{{ billedUnits }}</td><td>฿{{ billedAmount }}</td></tr>
                <tr><td><span class="home-dot ok"></span>ชำระแล้ว</td><td>{{ billedUnits }}</td><td>฿{{ billedAmount }}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="home-col">
          <h4>สัดส่วนค้างชำระตามสัญชาติ</h4>
          <div class="home-nat-card">
            <div class="home-nat-flag">🇹🇭</div>
            <div class="home-nat-body">
              <span class="wz-muted">ไทย</span>
              <b class="home-nat-pct">0.00%</b>
              <span class="wz-muted home-nat-sub">(0 ยูนิต / ฿0.00)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ OCCUPANCY PANEL (placeholder) ============ -->
    <div v-else class="wz-card home-panel">
      <div class="home-panel-head">
        <h3>สถานะพักอาศัย <span class="wz-muted">(ณ วันที่ {{ asOfDate }})</span></h3>
      </div>
      <div class="home-cols">
        <div class="home-col">
          <h4>ภาพรวมยูนิต</h4>
          <div class="home-mini-table-wrap">
            <table class="home-mini-table">
              <tbody>
                <tr><td>ยูนิตทั้งหมด</td><td class="r">{{ totalUnits }}</td></tr>
                <tr><td>มีผู้พักอาศัย</td><td class="r">{{ totalUnits }}</td></tr>
                <tr><td>ว่าง</td><td class="r">0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p class="wz-hint">ข้อมูลตัวอย่าง — จะแสดงผลจริงหลังเริ่มใช้งานระบบ</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { state, fmtTHB } from './store.js'

const PROMOS = [
  { icon: '🧾', bg: 'linear-gradient(135deg,#EAF2FF,#D6E6FF)', caption: 'ปรับฟอร์มใบเสร็จได้เองแล้ว! คลิกเพื่อเริ่มใช้เลยวันนี้' },
  { icon: '📢', bg: '#FFF3F3', caption: 'ประกาศสำคัญ: แบบฟอร์มใบแจ้งหนี้/ใบเสร็จรุ่นเก่าจะปิดใช้งานสิ้นปีนี้' },
  { icon: '🛡️', bg: 'linear-gradient(135deg,#123A7A,#1C70F7)', caption: 'โปรแกรมยกระดับมาตรฐานความปลอดภัยประจำโครงการ' },
  { icon: '📅', bg: 'linear-gradient(135deg,#0B3D91,#1C70F7)', caption: 'เลือกประชุมใหญ่สามัญประจำปีแบบออนไลน์ได้แล้ว' },
]

const showPromo = ref(true)
const tab = ref('debt')

const totalUnits = computed(() => Number(state.general.units) || 0)
const primaryIncomeName = computed(() => state.incomes[0]?.name || 'ค่าส่วนกลาง')

// Illustrative split — first configured revenue item shown as fully billed this period
const incomeSplit = computed(() => state.incomes.map((inc, idx) => ({ code: inc.code, name: inc.name, pct: idx === 0 ? 100 : 0 })))

const billedUnits = computed(() => totalUnits.value || 1)
const billedAmount = computed(() => fmtTHB((Number(state.incomes[0]?.rate) || 0) * billedUnits.value))

const THAI_MONTHS_ABBR = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
const today = new Date()
const asOfDate = `${today.getDate()} ${THAI_MONTHS_ABBR[today.getMonth()]} ${today.getFullYear() + 543}`
const periodLabel = `${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear() + 543}`
</script>

<style scoped src="./wizard.css"></style>
<style scoped>
.home-wrap{ max-width:1400px; margin:0 auto; padding:24px 28px 64px; }

/* ---------- promo carousel ---------- */
.home-promo-toggle{ display:inline-flex; align-items:center; gap:6px; font:inherit; font-size:13.5px; font-weight:600; color:var(--blue600); background:none; border:none; cursor:pointer; padding:4px 0 14px; }
.home-promo-toggle svg{ width:14px; height:14px; transition:transform .15s; }
.home-promo-toggle svg.flip{ transform:rotate(180deg); }

.home-promo-track{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:16px; margin-bottom:8px; }
.home-promo-card{ border-radius:14px; padding:18px; min-height:150px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-sm); }
.home-promo-ic{ font-size:26px; }
.home-promo-caption{ margin:0; font-size:13px; line-height:1.5; color:var(--t1); }
.home-promo-card[style*="123A7A"] .home-promo-caption,
.home-promo-card[style*="0B3D91"] .home-promo-caption{ color:#fff; }
@media (max-width:1100px){ .home-promo-track{ grid-template-columns:repeat(2, minmax(0,1fr)); } }
@media (max-width:640px){ .home-promo-track{ grid-template-columns:1fr; } }

/* ---------- section heading + tabs ---------- */
.home-h2{ font-size:18px; font-weight:700; margin:28px 0 14px; }
.home-tabs{ display:flex; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
.home-tab{ display:inline-flex; align-items:center; gap:8px; font:inherit; font-size:14px; font-weight:600; color:var(--t2); background:#fff; border:1.5px solid var(--bl); border-radius:12px; padding:12px 20px; cursor:pointer; }
.home-tab svg{ width:17px; height:17px; flex-shrink:0; }
.home-tab.on{ border-color:var(--blue); color:var(--blue600); background:var(--blue50); }
.home-tab.cta{ border-color:var(--yellow-bd); color:var(--yellow); background:var(--yellow-bg); margin-left:auto; }

/* ---------- debt / occupancy panel ---------- */
.home-panel-head{ display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:18px; }
.home-panel-head h3{ font-size:16px; font-weight:700; }
.home-period{ display:flex; align-items:center; gap:10px; font-size:13px; }
.home-period-pill{ display:inline-flex; align-items:center; gap:8px; font-weight:600; color:var(--t1); background:var(--surface); border-radius:8px; padding:7px 12px; }
.home-period-pill svg{ width:14px; height:14px; color:var(--t3); }

.home-cols{ display:grid; grid-template-columns:1fr 1.4fr 1fr; gap:20px; }
.home-col h4{ font-size:13.5px; font-weight:600; color:var(--t1); margin-bottom:12px; }
@media (max-width:1000px){ .home-cols{ grid-template-columns:1fr; } }

.home-income-list{ display:flex; flex-direction:column; gap:8px; }
.home-income-btn{ display:flex; align-items:center; justify-content:space-between; font:inherit; font-size:13.5px; font-weight:600; color:var(--t2); background:#fff; border:1.5px solid var(--bl); border-radius:10px; padding:10px 14px; cursor:pointer; }
.home-income-btn.on{ border-color:var(--blue); color:var(--blue600); background:var(--blue50); }

.home-donut-row{ display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
.home-donut{ width:110px; height:110px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:conic-gradient(var(--green) 0 100%, var(--bl) 0); }
.home-donut span{ width:76px; height:76px; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:var(--t1); }

.home-mini-table-wrap{ border:1.5px solid var(--bl); border-radius:12px; overflow:hidden; }
.home-mini-table{ width:100%; border-collapse:collapse; font-size:13px; flex:1; min-width:220px; }
.home-mini-table th{ text-align:left; font-size:11px; font-weight:600; text-transform:uppercase; color:var(--t4); padding:6px 10px; }
.home-mini-table td{ padding:7px 10px; border-top:1px solid var(--bl); color:var(--t2); }
.home-mini-table td:last-child, .home-mini-table th:last-child{ text-align:right; }
.home-mini-table td.r{ text-align:right; }
.home-dot{ display:inline-block; width:8px; height:8px; border-radius:50%; margin-right:6px; }
.home-dot.ok{ background:var(--green); }

.home-nat-card{ display:flex; align-items:center; gap:14px; border:1.5px solid var(--bl); border-radius:12px; padding:16px; }
.home-nat-flag{ font-size:26px; }
.home-nat-body{ display:flex; flex-direction:column; gap:2px; }
.home-nat-pct{ font-size:20px; color:var(--t1); }
.home-nat-sub{ font-size:12px; }
</style>
