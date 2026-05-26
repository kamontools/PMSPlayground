<template>
  <div class="quiz-bg">
    <div class="quiz-shell">

      <!-- Progress bar (hidden on welcome + result) -->
      <div v-if="currentStep > 0 && currentStep < TOTAL_STEPS" class="progress-wrap">
        <button class="back-btn" @click="back">←</button>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <span class="progress-label">{{ currentStep }}/{{ TOTAL_STEPS - 1 }}</span>
      </div>

      <!-- Slide transition wrapper -->
      <transition :name="direction === 'forward' ? 'slide-left' : 'slide-right'" mode="out-in">

        <!-- STEP 0: Welcome -->
        <div v-if="currentStep === 0" key="step0" class="step-card welcome-card">
          <HomeIcon class="welcome-icon" />
          <h1 class="welcome-title">รู้มั้ย...<br>ห้องของคุณ ราคาเท่าไหร่?</h1>
          <p class="welcome-sub">ตอบ {{ TOTAL_STEPS - 1 }} ข้อ รู้ราคาทันที!</p>
          <button class="cta-btn" @click="goForward()">เริ่มเลย →</button>
        </div>

        <!-- STEP 1: Zone -->
        <div v-else-if="currentStep === 1" key="step1" class="step-card zone-step">
          <div class="zone-sticky">
            <MapPinIcon class="q-icon" />
            <h2 class="q-title">คุณอยู่แถวไหน?</h2>
            <div class="zone-search-wrap">
              <MagnifyingGlassIcon class="zone-search-icon" />
              <input
                v-model="zoneSearch"
                class="zone-search-input"
                type="text"
                placeholder="ค้นหาเขต..."
                autocomplete="off"
              />
              <button v-if="zoneSearch" class="zone-search-clear" @click="zoneSearch = ''">✕</button>
            </div>
            <div class="filter-row">
              <button class="pager-btn" @click="scrollFilterTabs(-1)">‹</button>
              <div class="filter-tabs" ref="filterTabsRef">
                <button
                  class="filter-tab"
                  :class="{ active: activeGroup === null }"
                  @click="activeGroup = null"
                >ทั้งหมด</button>
                <button
                  v-for="g in zoneGroups"
                  :key="g.group"
                  class="filter-tab"
                  :class="{ active: activeGroup === g.group }"
                  @click="activeGroup = g.group"
                >{{ g.group }}</button>
              </div>
              <button class="pager-btn" @click="scrollFilterTabs(1)">›</button>
            </div>
          </div>
          <div class="zone-scroll">
            <div class="chip-grid">
              <button
                v-for="zone in displayedZones"
                :key="zone.value"
                class="chip-btn"
                :class="{ selected: answers.zone === zone.value }"
                @click="selectAndNext('zone', zone.value)"
              >{{ zone.label }}</button>
            </div>
            <p v-if="displayedZones.length === 0" class="zone-no-result">ไม่พบเขตที่ค้นหา</p>
          </div>
        </div>

        <!-- STEP 2: Room Type -->
        <div v-else-if="currentStep === 2" key="step2" class="step-card">
          <HomeModernIcon class="q-icon" />
          <h2 class="q-title">ห้องของคุณเป็นแบบไหน?</h2>
          <div class="room-type-grid">
            <button class="room-card" style="background:#FFD166" @click="selectAndNext('roomType', 'studio')">
              <HomeIcon class="room-icon" />
              <span class="room-label">สตูดิโอ</span>
            </button>
            <button class="room-card" style="background:#B8F0CC" @click="selectAndNext('roomType', '1br')">
              <HomeModernIcon class="room-icon" />
              <span class="room-label">1 ห้องนอน</span>
            </button>
            <button class="room-card" style="background:#FFCCD5" @click="selectAndNext('roomType', '2br')">
              <BuildingOfficeIcon class="room-icon" />
              <span class="room-label">2 ห้องนอน</span>
            </button>
            <button class="room-card" style="background:#BDE0FF" @click="selectAndNext('roomType', '3br')">
              <BuildingOffice2Icon class="room-icon" />
              <span class="room-label">3 ห้องนอน</span>
            </button>
            <button class="room-card full-width" style="background:#E9D5FF" @click="selectAndNext('roomType', 'penthouse')">
              <StarIcon class="room-icon" />
              <span class="room-label">เพนต์เฮาส์</span>
            </button>
          </div>
        </div>

        <!-- STEP 3: Floor -->
        <div v-else-if="currentStep === 3" key="step3" class="step-card">
          <BuildingOffice2Icon class="q-icon" />
          <h2 class="q-title">ห้องอยู่ชั้นที่เท่าไหร่?</h2>
          <div class="stepper-wrap">
            <button class="stepper-btn" @click="changeFloor(-1)" :disabled="answers.floor <= 1">−</button>
            <span class="stepper-value">{{ answers.floor }}</span>
            <button class="stepper-btn" @click="changeFloor(1)" :disabled="answers.floor >= 50">+</button>
          </div>
          <p class="stepper-hint">ชั้น 1 – 50</p>
          <button class="cta-btn" @click="goForward()">ต่อไป →</button>
        </div>

        <!-- STEP 4: Furnishing -->
        <div v-else-if="currentStep === 4" key="step4" class="step-card">
          <SwatchIcon class="q-icon" />
          <h2 class="q-title">ห้องตกแต่งแบบไหน?</h2>
          <div class="option-col">
            <button class="option-card" style="background:#FFD166" @click="selectAndNext('furnishing', 'none')">
              <CubeTransparentIcon class="opt-icon" />
              <div>
                <div class="opt-title">ไม่มีเฟอร์นิเจอร์</div>
                <div class="opt-sub">Unfurnished</div>
              </div>
            </button>
            <button class="option-card" style="background:#B8F0CC" @click="selectAndNext('furnishing', 'partial')">
              <Square2StackIcon class="opt-icon" />
              <div>
                <div class="opt-title">มีบางส่วน</div>
                <div class="opt-sub">Partly Furnished</div>
              </div>
            </button>
            <button class="option-card" style="background:#BDE0FF" @click="selectAndNext('furnishing', 'full')">
              <SparklesIcon class="opt-icon" />
              <div>
                <div class="opt-title">ครบครัน</div>
                <div class="opt-sub">Fully Furnished</div>
              </div>
            </button>
          </div>
        </div>

        <!-- STEP 5: Parking -->
        <div v-else-if="currentStep === 5" key="step5" class="step-card">
          <TruckIcon class="q-icon" />
          <h2 class="q-title">มีที่จอดรถมั้ย?</h2>
          <div class="two-col">
            <button class="big-card" style="background:#B8F0CC" @click="selectAndNext('parking', true)">
              <CheckCircleIcon class="big-icon" />
              <span class="big-label">มี</span>
            </button>
            <button class="big-card" style="background:#FFCCD5" @click="selectAndNext('parking', false)">
              <XCircleIcon class="big-icon" />
              <span class="big-label">ไม่มี</span>
            </button>
          </div>
        </div>

        <!-- STEP 6: Pets -->
        <div v-else-if="currentStep === 6" key="step6" class="step-card">
          <HeartIcon class="q-icon" />
          <h2 class="q-title">โครงการอนุญาต<br>เลี้ยงสัตว์มั้ย?</h2>
          <div class="two-col">
            <button class="big-card" style="background:#FFD166" @click="selectAndNext('pets', true)">
              <CheckCircleIcon class="big-icon" />
              <span class="big-label">เลี้ยงได้</span>
            </button>
            <button class="big-card" style="background:#FFCCD5" @click="selectAndNext('pets', false)">
              <NoSymbolIcon class="big-icon" />
              <span class="big-label">ไม่อนุญาต</span>
            </button>
          </div>
        </div>

        <!-- STEP 7: Target Price -->
        <div v-else-if="currentStep === 7" key="step7" class="step-card">
          <TagIcon class="q-icon" />
          <h2 class="q-title">ปัจจุบันปล่อยเช่า<br>อยู่ที่เท่าไหร่?</h2>
          <div class="price-input-wrap">
            <input
              ref="priceInput"
              class="price-input"
              type="text"
              inputmode="numeric"
              placeholder="0"
              :value="targetPriceDisplay"
              @input="onPriceInput"
            />
            <span class="price-unit">บาท / เดือน</span>
          </div>
          <button class="cta-btn" :disabled="!answers.targetPrice" @click="goForward()">ต่อไป →</button>
          <button class="skip-btn" @click="skipTargetPrice">ยังไม่ได้ปล่อยเช่า</button>
        </div>

        <!-- STEP 8: Result -->
        <div v-else-if="currentStep === 8" key="step8" class="step-card result-card">
          <TrophyIcon class="q-icon" />
          <h2 class="result-title">ผลการประเมิน</h2>

          <!-- Market price -->
          <div class="result-box" style="background:#FFD166">
            <div class="result-box-label">ราคาตลาดทั่วไป</div>
            <div class="result-price">{{ formatPrice(marketPrice.min) }} – {{ formatPrice(marketPrice.max) }}</div>
            <div class="result-price-unit">บาท / เดือน</div>
          </div>

          <!-- Target price comparison -->
          <div v-if="answers.targetPrice !== null" class="result-box" style="background:#BDE0FF">
            <div class="result-box-label">ราคาปล่อยเช่าปัจจุบัน</div>
            <div class="result-price">{{ formatPrice(answers.targetPrice) }}</div>
            <div class="result-price-unit">บาท / เดือน</div>
            <div class="result-compare">
              <component :is="priceComparison.icon" class="compare-icon" />
              {{ priceComparison.text }}
            </div>
          </div>

          <!-- Summary -->
          <div class="result-summary">
            <div class="summary-row"><span class="summary-key">เขต</span><span class="summary-val">{{ zoneLabel }}</span></div>
            <div class="summary-row"><span class="summary-key">ประเภทห้อง</span><span class="summary-val">{{ roomTypeLabel }}</span></div>
            <div class="summary-row"><span class="summary-key">ชั้น</span><span class="summary-val">{{ answers.floor }}</span></div>
            <div class="summary-row"><span class="summary-key">ตกแต่ง</span><span class="summary-val">{{ furnishingLabel }}</span></div>
            <div class="summary-row"><span class="summary-key">ที่จอดรถ</span><span class="summary-val">{{ answers.parking ? 'มี' : 'ไม่มี' }}</span></div>
          </div>

          <div class="result-actions">
            <button class="cta-btn" @click="restart">
              <ArrowPathIcon class="btn-icon" /> ลองใหม่
            </button>
          </div>
        </div>

      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import {
  HomeIcon, HomeModernIcon, BuildingOfficeIcon, BuildingOffice2Icon,
  MapPinIcon, TruckIcon, HeartIcon, TagIcon, StarIcon, TrophyIcon,
  SparklesIcon, SwatchIcon, CubeTransparentIcon, Square2StackIcon,
  CheckCircleIcon, XCircleIcon, NoSymbolIcon,
  LightBulbIcon, ExclamationTriangleIcon, ArrowPathIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'

const TOTAL_STEPS = 8

const zoneGroups = [
  {
    group: '🏙️ ใจกลางเมือง',
    zones: [
      { value: 'pathumwan',      label: 'ปทุมวัน' },
      { value: 'sathorn',        label: 'สาทร' },
      { value: 'bangrak',        label: 'บางรัก' },
      { value: 'watthana',       label: 'วัฒนา' },
      { value: 'khlongtoei',     label: 'คลองเตย' },
      { value: 'yannawa',        label: 'ยานนาวา' },
      { value: 'phayathai',      label: 'พญาไท' },
      { value: 'ratchathewi',    label: 'ราชเทวี' },
      { value: 'dusit',          label: 'ดุสิต' },
      { value: 'phranakhon',     label: 'พระนคร' },
      { value: 'pomprap',        label: 'ป้อมปราบฯ' },
      { value: 'samphanthawong', label: 'สัมพันธวงศ์' },
    ],
  },
  {
    group: '🌅 ฝั่งตะวันออก',
    zones: [
      { value: 'phrakhanong',   label: 'พระโขนง' },
      { value: 'bangna',        label: 'บางนา' },
      { value: 'bangkholaem',   label: 'บางคอแหลม' },
      { value: 'huaikhwang',    label: 'ห้วยขวาง' },
      { value: 'wangthonglang', label: 'วังทองหลาง' },
      { value: 'bangkapi',      label: 'บางกะปิ' },
      { value: 'buengkum',      label: 'บึงกุ่ม' },
      { value: 'saphansung',    label: 'สะพานสูง' },
      { value: 'prawet',        label: 'ประเวศ' },
      { value: 'suanluang',     label: 'สวนหลวง' },
      { value: 'latkrabang',    label: 'ลาดกระบัง' },
      { value: 'minburi',       label: 'มีนบุรี' },
      { value: 'khannayao',     label: 'คันนายาว' },
      { value: 'khlongsamwa',   label: 'คลองสามวา' },
      { value: 'nongjok',       label: 'หนองจอก' },
    ],
  },
  {
    group: '🌿 ฝั่งเหนือ',
    zones: [
      { value: 'chatuchak', label: 'จตุจักร' },
      { value: 'latphrao',  label: 'ลาดพร้าว' },
      { value: 'bangkhen',  label: 'บางเขน' },
      { value: 'laksi',     label: 'หลักสี่' },
      { value: 'donmueang', label: 'ดอนเมือง' },
      { value: 'saimai',    label: 'สายไหม' },
      { value: 'bangkwang', label: 'บางซื่อ' },
    ],
  },
  {
    group: '🌉 ฝั่งธนบุรี',
    zones: [
      { value: 'thonburi',      label: 'ธนบุรี' },
      { value: 'bangkokyai',    label: 'บางกอกใหญ่' },
      { value: 'bangkoknoi',    label: 'บางกอกน้อย' },
      { value: 'khlongsan',     label: 'คลองสาน' },
      { value: 'talingchan',    label: 'ตลิ่งชัน' },
      { value: 'thawiwatthana', label: 'ทวีวัฒนา' },
      { value: 'bangkhunthian', label: 'บางขุนเทียน' },
      { value: 'chomthong',     label: 'จอมทอง' },
      { value: 'ratburana',     label: 'ราษฎร์บูรณะ' },
      { value: 'thungkhru',     label: 'ทุ่งครุ' },
      { value: 'phasicharoen',  label: 'ภาษีเจริญ' },
      { value: 'nongkhaem',     label: 'หนองแขม' },
      { value: 'bangbon',       label: 'บางบอน' },
    ],
  },
]

const zoneSearch = ref('')
const activeGroup = ref(null)
const filterTabsRef = ref(null)

function scrollFilterTabs(dir) {
  filterTabsRef.value?.scrollBy({ left: dir * 140, behavior: 'smooth' })
}

const displayedZones = computed(() => {
  const q = zoneSearch.value.trim()
  const all = zoneGroups.flatMap(g => g.zones)
  if (q) return all.filter(z => z.label.includes(q))
  if (activeGroup.value) return zoneGroups.find(g => g.group === activeGroup.value)?.zones ?? []
  return all
})

const currentStep = ref(0)
const direction = ref('forward')

const answers = reactive({
  zone: null,
  roomType: null,
  floor: 10,
  furnishing: null,
  parking: null,
  pets: null,
  targetPrice: null,
})

// Target price display
const targetPriceRaw = ref('')
const targetPriceDisplay = computed(() => {
  if (!targetPriceRaw.value) return ''
  return Number(targetPriceRaw.value).toLocaleString('th-TH')
})

function onPriceInput(e) {
  const raw = e.target.value.replace(/[^0-9]/g, '')
  targetPriceRaw.value = raw
  answers.targetPrice = raw ? Number(raw) : null
}

// Progress
const progressPercent = computed(() => ((currentStep.value - 1) / (TOTAL_STEPS - 1)) * 100)

function goForward() {
  direction.value = 'forward'
  currentStep.value++
}

function selectAndNext(field, value) {
  answers[field] = value
  goForward()
}

function back() {
  if (currentStep.value === 0) return
  direction.value = 'backward'
  currentStep.value--
  if (currentStep.value === 1) { zoneSearch.value = ''; activeGroup.value = null }
}

function changeFloor(delta) {
  const next = answers.floor + delta
  if (next >= 1 && next <= 50) answers.floor = next
}

function skipTargetPrice() {
  answers.targetPrice = null
  targetPriceRaw.value = ''
  goForward()
}


// Price calculation
const BASE_PRICE = { studio: 8000, '1br': 12000, '2br': 18000, '3br': 28000, penthouse: 50000 }
const ZONE_MULT = {
  // Premium (1.3–1.5)
  pathumwan: 1.5, sathorn: 1.4, watthana: 1.4, bangrak: 1.35, khlongtoei: 1.3,
  // High (1.15–1.25)
  yannawa: 1.25, phrakhanong: 1.2, bangkholaem: 1.2, ratchathewi: 1.2,
  phayathai: 1.15, huaikhwang: 1.15, dusit: 1.1,
  // Mid (1.0–1.1)
  chatuchak: 1.1, latphrao: 1.1, wangthonglang: 1.05, bangkapi: 1.05,
  bangna: 1.05, bangkwang: 1.0, phranakhon: 1.0, khlongsan: 1.0,
  thonburi: 1.0, pomprap: 1.0, samphanthawong: 1.0,
  // Below mid (0.85–0.95)
  suanluang: 0.95, prawet: 0.95, buengkum: 0.9, saphansung: 0.9,
  bangkhen: 0.9, laksi: 0.9, bangkokyai: 0.9, bangkoknoi: 0.9,
  talingchan: 0.9, phasicharoen: 0.9, chomthong: 0.9,
  donmueang: 0.88, ratburana: 0.88, nongkhaem: 0.88, bangkhunthian: 0.88,
  // Outer (0.7–0.85)
  latkrabang: 0.85, minburi: 0.82, saimai: 0.82, thawiwatthana: 0.82,
  khannayao: 0.8, khlongsamwa: 0.78, nongjok: 0.75,
  thungkhru: 0.8, bangbon: 0.78,
}
const FURNISH_MULT = { none: 0.85, partial: 1.0, full: 1.2 }

const marketPrice = computed(() => {
  const base = BASE_PRICE[answers.roomType] ?? 10000
  const zoneMult = ZONE_MULT[answers.zone] ?? 1.0
  const floorBonus = answers.floor > 15 ? 1.1 : 1.0
  const furnishMult = FURNISH_MULT[answers.furnishing] ?? 1.0
  const parkingBonus = answers.parking ? 1500 : 0
  const price = base * zoneMult * floorBonus * furnishMult + parkingBonus
  return {
    min: Math.round(price * 0.9 / 500) * 500,
    max: Math.round(price * 1.1 / 500) * 500,
  }
})

const priceComparison = computed(() => {
  if (answers.targetPrice === null) return null
  const mid = (marketPrice.value.min + marketPrice.value.max) / 2
  const diff = ((answers.targetPrice - mid) / mid) * 100
  if (diff < -10) return { icon: LightBulbIcon, text: `ต่ำกว่าตลาด ${Math.abs(Math.round(diff))}% — ลองปรับราคาขึ้นได้!` }
  if (diff > 10) return { icon: ExclamationTriangleIcon, text: `สูงกว่าตลาด ${Math.round(diff)}% — อาจหาผู้เช่าได้ยาก` }
  return { icon: CheckCircleIcon, text: 'อยู่ในช่วงราคาตลาด — โอเคเลย!' }
})

// Labels for summary
const zoneLabel = computed(() => {
  for (const g of zoneGroups) {
    const found = g.zones.find(z => z.value === answers.zone)
    if (found) return found.label
  }
  return '-'
})
const roomTypeLabel = computed(() => {
  const map = { studio: 'สตูดิโอ', '1br': '1 ห้องนอน', '2br': '2 ห้องนอน', '3br': '3 ห้องนอน', penthouse: 'เพนต์เฮาส์' }
  return map[answers.roomType] ?? '-'
})
const furnishingLabel = computed(() => {
  const map = { none: 'ไม่มีเฟอร์นิเจอร์', partial: 'มีบางส่วน', full: 'ครบครัน' }
  return map[answers.furnishing] ?? '-'
})

function formatPrice(n) {
  return Number(n).toLocaleString('th-TH')
}

function restart() {
  direction.value = 'backward'
  Object.assign(answers, { zone: null, roomType: null, floor: 10, furnishing: null, parking: null, pets: null, targetPrice: null })
  targetPriceRaw.value = ''
  currentStep.value = 0
}
</script>

<style scoped>
/* ===== Layout ===== */
.quiz-bg {
  min-height: 100dvh;
  background: #FFFBF0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 0 40px;
  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
}

.quiz-shell {
  width: 100%;
  max-width: 480px;
  padding: 0;
}

/* ===== Progress ===== */
.progress-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px 0;
}

.back-btn {
  font-size: 20px;
  font-weight: 900;
  background: #fff;
  border: 3px solid #000;
  border-radius: 8px;
  box-shadow: 3px 3px 0 #000;
  width: 40px;
  height: 40px;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.1s, box-shadow 0.1s;
}
.back-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #000;
}

.progress-track {
  flex: 1;
  height: 10px;
  background: #E0D8C8;
  border-radius: 99px;
  border: 2px solid #000;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #1C70F7;
  border-radius: 99px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-label {
  font-size: 13px;
  font-weight: 700;
  color: #000;
  flex-shrink: 0;
}

/* ===== Step Card ===== */
.step-card {
  padding: 24px 20px 32px;
  min-height: calc(100dvh - 80px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.q-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.q-title {
  font-size: 26px;
  font-weight: 900;
  color: #000;
  line-height: 1.3;
}

/* ===== Welcome ===== */
.welcome-card {
  min-height: 100dvh;
  justify-content: center;
  background: #FFD166;
  border-bottom: 3px solid #000;
}
.welcome-icon {
  width: 72px;
  height: 72px;
}
.welcome-title {
  font-size: 36px;
  font-weight: 900;
  color: #000;
  line-height: 1.2;
}
.welcome-sub {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* ===== Buttons ===== */
.cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 16px;
  font-size: 18px;
  font-weight: 900;
  font-family: inherit;
  background: #000;
  color: #fff;
  border: 3px solid #000;
  border-radius: 12px;
  box-shadow: 4px 4px 0 #555;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
  margin-top: 8px;
}
.cta-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 #555;
}
.cta-btn:disabled {
  background: #aaa;
  border-color: #aaa;
  box-shadow: none;
  cursor: not-allowed;
}

.skip-btn {
  display: block;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  background: transparent;
  color: #555;
  border: 3px solid #999;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
  box-shadow: 3px 3px 0 #999;
}
.skip-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #999;
}

/* ===== Zone Step ===== */
.zone-step {
  min-height: unset;
  height: calc(100dvh - 64px); /* 64px = progress bar */
  padding: 0;
  gap: 0;
  overflow: hidden;
}
.zone-sticky {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 20px 12px;
  background: #FFFBF0;
  border-bottom: 2px solid #E0D8C8;
}
.zone-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.zone-search-icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: #888;
  pointer-events: none;
  flex-shrink: 0;
}
.zone-search-input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  font-size: 16px;
  font-family: inherit;
  font-weight: 600;
  background: #fff;
  border: 3px solid #000;
  border-radius: 12px;
  box-shadow: 3px 3px 0 #000;
  outline: none;
}
.zone-search-input:focus {
  border-color: #1C70F7;
  box-shadow: 3px 3px 0 #1C70F7;
}
.zone-search-clear {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  line-height: 1;
  padding: 2px;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.filter-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.filter-tabs::-webkit-scrollbar { display: none; }

.filter-tab {
  flex-shrink: 0;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  background: #fff;
  border: 2px solid #000;
  border-radius: 99px;
  box-shadow: 2px 2px 0 #000;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s, background 0.1s;
  white-space: nowrap;
}
.filter-tab:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}
.filter-tab.active {
  background: #000;
  color: #fff;
  box-shadow: none;
}

.zone-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px 32px;
  -webkit-overflow-scrolling: touch;
}
.zone-pager {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pager-btn {
  width: 44px;
  height: 44px;
  font-size: 22px;
  font-weight: 900;
  font-family: inherit;
  background: #fff;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 3px 3px 0 #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s, box-shadow 0.1s;
}
.pager-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #000;
}
.pager-btn:disabled {
  background: #F0EDE4;
  border-color: #ccc;
  box-shadow: none;
  color: #bbb;
  cursor: not-allowed;
}
.pager-info {
  font-size: 14px;
  font-weight: 700;
  color: #555;
  margin-left: 4px;
}
.zone-no-result {
  text-align: center;
  color: #888;
  font-size: 14px;
  font-weight: 600;
  padding: 24px 0;
}

/* ===== Zone Chips ===== */
.chip-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.chip-btn {
  padding: 14px 10px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  background: #fff;
  border: 3px solid #000;
  border-radius: 12px;
  box-shadow: 4px 4px 0 #000;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s, background 0.1s;
}
.chip-btn:active, .chip-btn.selected {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 #000;
  background: #FFD166;
}

/* ===== Room Type Grid ===== */
.room-type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.room-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 10px;
  border: 3px solid #000;
  border-radius: 12px;
  box-shadow: 4px 4px 0 #000;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.1s, box-shadow 0.1s;
  min-height: 100px;
}
.room-card:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 #000;
}
.room-card.full-width {
  grid-column: 1 / -1;
  flex-direction: row;
  gap: 12px;
  padding: 16px 20px;
  min-height: 72px;
}
.room-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}
.room-label {
  font-size: 15px;
  font-weight: 800;
  color: #000;
}

/* ===== Stepper ===== */
.stepper-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 8px 0;
}
.stepper-btn {
  width: 56px;
  height: 56px;
  font-size: 28px;
  font-weight: 900;
  font-family: inherit;
  background: #FFD166;
  border: 3px solid #000;
  border-radius: 12px;
  box-shadow: 4px 4px 0 #000;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stepper-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 #000;
}
.stepper-btn:disabled {
  background: #E0D8C8;
  border-color: #aaa;
  box-shadow: none;
  cursor: not-allowed;
}
.stepper-value {
  font-size: 64px;
  font-weight: 900;
  color: #000;
  min-width: 80px;
  text-align: center;
  line-height: 1;
}
.stepper-hint {
  text-align: center;
  font-size: 13px;
  color: #666;
  font-weight: 600;
}

/* ===== Option Cards (3-col) ===== */
.option-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.option-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border: 3px solid #000;
  border-radius: 12px;
  box-shadow: 4px 4px 0 #000;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: transform 0.1s, box-shadow 0.1s;
}
.option-card:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 #000;
}
.opt-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}
.opt-title {
  font-size: 16px;
  font-weight: 800;
  color: #000;
}
.opt-sub {
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-top: 2px;
}

/* ===== Two-col Big Cards ===== */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.big-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 10px;
  border: 3px solid #000;
  border-radius: 16px;
  box-shadow: 5px 5px 0 #000;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.1s, box-shadow 0.1s;
}
.big-card:active {
  transform: translate(4px, 4px);
  box-shadow: 1px 1px 0 #000;
}
.big-icon {
  width: 48px;
  height: 48px;
}
.big-label {
  font-size: 18px;
  font-weight: 900;
  color: #000;
}

/* ===== Target Price Input ===== */
.price-input-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.price-input {
  font-size: 40px;
  font-weight: 900;
  font-family: inherit;
  color: #000;
  background: #fff;
  border: 3px solid #000;
  border-radius: 12px;
  box-shadow: 4px 4px 0 #000;
  padding: 16px 20px;
  text-align: right;
  width: 100%;
  outline: none;
}
.price-input:focus {
  border-color: #1C70F7;
  box-shadow: 4px 4px 0 #1C70F7;
}
.price-unit {
  text-align: right;
  font-size: 14px;
  font-weight: 700;
  color: #555;
}


/* ===== Result ===== */
.result-card {
  gap: 14px;
}
.result-title {
  font-size: 28px;
  font-weight: 900;
  color: #000;
}
.result-box {
  border: 3px solid #000;
  border-radius: 16px;
  box-shadow: 5px 5px 0 #000;
  padding: 20px;
}
.result-box-label {
  font-size: 13px;
  font-weight: 700;
  color: #555;
  margin-bottom: 4px;
}
.result-price {
  font-size: 32px;
  font-weight: 900;
  color: #000;
  line-height: 1.1;
}
.result-price-unit {
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-top: 2px;
}
.result-compare {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 15px;
  font-weight: 700;
  color: #000;
  background: rgba(255,255,255,0.5);
  border: 2px solid #000;
  border-radius: 8px;
  padding: 8px 12px;
}
.compare-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.btn-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}

.result-summary {
  border: 3px solid #000;
  border-radius: 12px;
  box-shadow: 4px 4px 0 #000;
  background: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.summary-key {
  font-weight: 700;
  color: #555;
}
.summary-val {
  font-weight: 800;
  color: #000;
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ===== Transitions ===== */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from { transform: translateX(60px); opacity: 0; }
.slide-left-leave-to  { transform: translateX(-60px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-60px); opacity: 0; }
.slide-right-leave-to  { transform: translateX(60px); opacity: 0; }
</style>
