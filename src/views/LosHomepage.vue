<template>
  <div class="los-page">
    <!-- ───────────────────── NAV ───────────────────── -->
    <nav class="los-nav" :class="{ scrolled: isScrolled }">
      <div class="nav-inner">
        <a href="#" class="nav-logo">
          <span class="logo-dot"></span>
          <span class="logo-text">The LivingOS</span>
        </a>

        <div class="nav-links">
          <a href="#juristic" class="nav-link">สำหรับนิติบุคคล</a>
          <a href="#residents" class="nav-link">สำหรับลูกบ้าน</a>
          <a href="#features" class="nav-link">ฟีเจอร์</a>
          <a href="#faq" class="nav-link">คำถาม</a>
        </div>

        <div class="nav-actions">
          <a href="#" class="btn btn-ghost btn-sm">เข้าสู่ระบบ</a>
          <a href="#" class="btn btn-primary btn-sm">เริ่มใช้งานฟรี</a>
        </div>
      </div>
    </nav>

    <!-- ───────────────────── HERO ───────────────────── -->
    <section class="hero-section">
      <!-- bg decorations -->
      <div class="hero-bg-grid"></div>
      <div class="hero-bg-glow"></div>

      <div class="container">
        <div class="hero-inner">
          <div class="eyebrow-badge">
            <span class="badge-dot"></span>
            No.1 Property Management · Thailand
          </div>

          <h1 class="hero-headline">
            จัดการนิติบุคคล<br>
            <span class="headline-accent">ครบจบในที่เดียว</span>
          </h1>

          <p class="hero-desc">
            แพลตฟอร์มบริหารคอนโดและหมู่บ้านที่นิติบุคคลกว่า 3,000 โครงการเลือกใช้
            ตั้งแต่บัญชี ธุรการ ไปจนถึงแอปลูกบ้าน — ทุกอย่างเชื่อมกัน
          </p>

          <div class="hero-ctas">
            <a href="#" class="btn btn-primary btn-lg">เริ่มใช้งานฟรี</a>
            <a href="#features" class="btn btn-warm btn-lg">
              ดูฟีเจอร์ทั้งหมด
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <!-- hero visual -->
          <div class="hero-card-preview">
            <div class="preview-bar">
              <span class="preview-dot red"></span>
              <span class="preview-dot yellow"></span>
              <span class="preview-dot green"></span>
              <span class="preview-title">ภาพรวมโครงการ · เดือนพฤษภาคม</span>
            </div>
            <div class="preview-body">
              <div class="preview-stats-row">
                <div class="preview-stat">
                  <span class="pstat-label">ค่าส่วนกลางรับชำระ</span>
                  <span class="pstat-value blue">฿ 2,841,500</span>
                  <span class="pstat-badge green">+12.4%</span>
                </div>
                <div class="preview-stat">
                  <span class="pstat-label">พัสดุรอรับ</span>
                  <span class="pstat-value">148 ชิ้น</span>
                  <span class="pstat-badge blue">วันนี้ 23 ใหม่</span>
                </div>
                <div class="preview-stat">
                  <span class="pstat-label">แจ้งซ่อมค้างดำเนินการ</span>
                  <span class="pstat-value">7 รายการ</span>
                  <span class="pstat-badge yellow">ด่วน 2 รายการ</span>
                </div>
              </div>
              <div class="preview-chart-row">
                <div class="chart-bars">
                  <div v-for="(h, i) in chartBars" :key="i" class="chart-bar" :style="{ height: h + 'px', '--delay': i * 0.05 + 's' }"></div>
                </div>
                <div class="preview-notif">
                  <div class="notif-item">
                    <span class="notif-icon blue">📦</span>
                    <span>พัสดุถึงห้อง 204 แล้ว</span>
                    <span class="notif-time">2 นาทีที่แล้ว</span>
                  </div>
                  <div class="notif-item">
                    <span class="notif-icon green">✅</span>
                    <span>ชำระค่าส่วนกลาง 304 สำเร็จ</span>
                    <span class="notif-time">5 นาทีที่แล้ว</span>
                  </div>
                  <div class="notif-item">
                    <span class="notif-icon yellow">🔧</span>
                    <span>แจ้งซ่อมไฟทางเดิน B2</span>
                    <span class="notif-time">18 นาทีที่แล้ว</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── STATS BAR ───────────────────── -->
    <section class="stats-bar">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" v-for="stat in stats" :key="stat.label">
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── PROBLEM ───────────────────── -->
    <section class="problem-section">
      <div class="container">
        <div class="section-label">ทำไมต้อง The LivingOS</div>
        <div class="problem-grid">
          <div class="problem-left">
            <h2 class="section-title">
              นิติบุคคลส่วนใหญ่<br>ยังติดอยู่กับ…
            </h2>
            <p class="section-desc">
              Excel กระจาย กระดาษหาย ข้อมูลไม่ตรงกัน — ทีมงานเสียเวลาหลายชั่วโมงต่อวัน
              กับงานที่ระบบดีๆ ทำให้อัตโนมัติได้ทั้งหมด
            </p>
          </div>
          <div class="problem-cards">
            <div class="problem-card" v-for="p in problems" :key="p.title">
              <span class="problem-icon">{{ p.icon }}</span>
              <div>
                <div class="problem-title">{{ p.title }}</div>
                <div class="problem-desc">{{ p.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── FEATURES BENTO ───────────────────── -->
    <section class="features-section" id="features">
      <div class="container">
        <div class="section-label">ฟีเจอร์หลัก</div>
        <h2 class="section-title center">ทุกสิ่งที่นิติบุคคลต้องการ<br>รวมไว้ในแพลตฟอร์มเดียว</h2>

        <div class="bento-grid">
          <!-- large card -->
          <div class="bento-card bento-large">
            <div class="bento-icon">🧾</div>
            <h3 class="bento-title">ระบบบัญชีครบวงจร</h3>
            <p class="bento-desc">ออกใบแจ้งหนี้ รับชำระ ปิดงบประมาณ พิมพ์รายงาน — ลดงานบัญชีจาก 4 ชั่วโมงเหลือ 1.5 ชั่วโมงต่อวัน</p>
            <div class="bento-pill blue">Juristic</div>
          </div>

          <!-- tall card -->
          <div class="bento-card bento-tall">
            <div class="bento-icon">📦</div>
            <h3 class="bento-title">ระบบพัสดุอัจฉริยะ</h3>
            <p class="bento-desc">แจ้งเตือนลูกบ้านทันที ติดตาม Real-time รองรับ Click & Drop ส่งพัสดุผ่านนิติ</p>
            <div class="bento-pill green">Auto-notify</div>
            <div class="bento-parcel-visual">
              <div class="parcel-row" v-for="n in 3" :key="n">
                <span class="parcel-icon">📬</span>
                <div class="parcel-bar"></div>
                <span class="parcel-status green">รับแล้ว</span>
              </div>
            </div>
          </div>

          <!-- small cards -->
          <div class="bento-card">
            <div class="bento-icon">🔧</div>
            <h3 class="bento-title">แจ้งซ่อม & ติดตาม</h3>
            <p class="bento-desc">ลูกบ้านแจ้งผ่านแอป นิติรับ assign และอัปเดตสถานะได้ทันที</p>
          </div>

          <div class="bento-card">
            <div class="bento-icon">📣</div>
            <h3 class="bento-title">ประกาศข่าวสาร</h3>
            <p class="bento-desc">Push notification ถึงลูกบ้านทุกคนในโครงการในคลิกเดียว</p>
          </div>

          <div class="bento-card bento-wide">
            <div class="bento-icon">🏛️</div>
            <h3 class="bento-title">จองพื้นที่ส่วนกลาง</h3>
            <p class="bento-desc">ลูกบ้านจองห้องประชุม สระว่ายน้ำ ฟิตเนส ผ่านแอป — นิติเห็นตารางแบบ Real-time ป้องกันการจองซ้อน</p>
            <div class="booking-visual">
              <div class="booking-slot taken">สระ 9:00</div>
              <div class="booking-slot available">ฟิตเนส 10:00</div>
              <div class="booking-slot taken">ห้องประชุม 11:00</div>
              <div class="booking-slot available">สระ 13:00</div>
            </div>
          </div>

          <div class="bento-card">
            <div class="bento-icon">💬</div>
            <h3 class="bento-title">แชทกับนิติ</h3>
            <p class="bento-desc">ลูกบ้านคุยตรงได้เลย ไม่ต้องโทรหาหน้าออฟฟิศ</p>
          </div>

          <div class="bento-card">
            <div class="bento-icon">👁️</div>
            <h3 class="bento-title">Smart Audit</h3>
            <p class="bento-desc">ตรวจจุด Real-time ด้วย NFC ป้องกันทุจริต รายงาน Excel อัตโนมัติ</p>
          </div>

          <div class="bento-card bento-accent">
            <div class="bento-icon">🚗</div>
            <h3 class="bento-title">Visitor & จอดรถ</h3>
            <p class="bento-desc">ระบบ i-Pass ควบคุมผู้มาติดต่อ คิดเงินจอดรถอัตโนมัติ E-Stamp</p>
            <div class="bento-pill blue">i-Pass VMS</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── PRODUCT JURISTIC ───────────────────── -->
    <section class="product-section" id="juristic">
      <div class="container">
        <div class="product-row">
          <div class="product-text">
            <div class="section-label">สำหรับนิติบุคคล</div>
            <h2 class="section-title">JuristicOS<br>ระบบหลังบ้านที่ทีมงานรัก</h2>
            <p class="section-desc">
              จัดการทุกอย่างจาก Web App ตัวเดียว ไม่ว่าจะเป็นบัญชี พัสดุ แจ้งซ่อม
              หรือดูรายงาน — ทำงานได้ทุกที่ผ่านเบราว์เซอร์
            </p>
            <ul class="feature-list">
              <li v-for="f in juristicFeatures" :key="f">
                <span class="feature-check">✓</span>{{ f }}
              </li>
            </ul>
            <div class="product-ctas">
              <a href="#" class="btn btn-primary">ดูรายละเอียด</a>
              <a href="#" class="btn btn-soft">ทดลองฟรี 30 วัน</a>
            </div>
          </div>
          <div class="product-visual">
            <div class="product-mock">
              <div class="mock-header">
                <span class="mock-dot r"></span><span class="mock-dot y"></span><span class="mock-dot g"></span>
                <span class="mock-title">JuristicOS · Dashboard</span>
              </div>
              <div class="mock-body">
                <div class="mock-sidebar">
                  <div class="mock-nav-item active">📊 ภาพรวม</div>
                  <div class="mock-nav-item">🧾 บัญชี</div>
                  <div class="mock-nav-item">📦 พัสดุ</div>
                  <div class="mock-nav-item">🔧 แจ้งซ่อม</div>
                  <div class="mock-nav-item">👥 ลูกบ้าน</div>
                </div>
                <div class="mock-content">
                  <div class="mock-stat-row">
                    <div class="mock-stat-card blue">
                      <div class="msc-label">รายได้เดือนนี้</div>
                      <div class="msc-value">฿ 2.8M</div>
                    </div>
                    <div class="mock-stat-card green">
                      <div class="msc-label">ชำระแล้ว</div>
                      <div class="msc-value">847 ยูนิต</div>
                    </div>
                  </div>
                  <div class="mock-list-item" v-for="n in 3" :key="n">
                    <span class="mli-dot"></span>
                    <div class="mli-bar"></div>
                    <span class="mli-tag">รอดำเนินการ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── PRODUCT RESIDENTS ───────────────────── -->
    <section class="product-section alt" id="residents">
      <div class="container">
        <div class="product-row reverse">
          <div class="product-visual">
            <div class="phone-mock">
              <div class="phone-notch"></div>
              <div class="phone-screen">
                <div class="app-header">
                  <span>The LivingOS</span>
                  <span class="app-bell">🔔</span>
                </div>
                <div class="app-quick-grid">
                  <div class="app-quick" v-for="q in appQuick" :key="q.label">
                    <span>{{ q.icon }}</span>
                    <span>{{ q.label }}</span>
                  </div>
                </div>
                <div class="app-parcel-card">
                  <span class="parcel-badge">📦 พัสดุใหม่!</span>
                  <p>พัสดุของคุณถึงแล้ว<br>กรุณารับที่เคาน์เตอร์</p>
                  <button class="app-btn-blue">รับทราบ</button>
                </div>
              </div>
            </div>
          </div>
          <div class="product-text">
            <div class="section-label">สำหรับลูกบ้าน</div>
            <h2 class="section-title">แอปลูกบ้านที่<br>ทำให้ชีวิตง่ายขึ้น</h2>
            <p class="section-desc">
              ลูกบ้านจัดการทุกอย่างได้จากโทรศัพท์ ตั้งแต่รับพัสดุ จ่ายค่าส่วนกลาง
              แจ้งซ่อม ไปจนถึงจองส่วนกลาง ไม่ต้องมาที่ออฟฟิศนิติ
            </p>
            <ul class="feature-list">
              <li v-for="f in residentFeatures" :key="f">
                <span class="feature-check">✓</span>{{ f }}
              </li>
            </ul>
            <div class="product-ctas">
              <a href="#" class="btn btn-primary">ดาวน์โหลดแอป</a>
              <a href="#" class="btn btn-soft">ดูรายละเอียด</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── NUMBERS ───────────────────── -->
    <section class="numbers-section">
      <div class="container">
        <div class="numbers-inner">
          <div class="section-label center">ตัวเลขที่พูดแทน</div>
          <h2 class="section-title center">ไว้วางใจโดยอุตสาหกรรม</h2>
          <div class="numbers-grid">
            <div class="number-item" v-for="n in numbers" :key="n.label">
              <span class="number-value">{{ n.value }}</span>
              <span class="number-label">{{ n.label }}</span>
              <span class="number-sub">{{ n.sub }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── TESTIMONIALS ───────────────────── -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-label center">เสียงจากผู้ใช้จริง</div>
        <h2 class="section-title center">ลูกค้าพูดถึงเรา</h2>
        <div class="testi-grid">
          <div class="testi-card" v-for="t in testimonials" :key="t.name">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-quote">"{{ t.quote }}"</p>
            <div class="testi-author">
              <div class="testi-avatar">{{ t.name[0] }}</div>
              <div>
                <div class="testi-name">{{ t.name }}</div>
                <div class="testi-role">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── FAQ ───────────────────── -->
    <section class="faq-section" id="faq">
      <div class="container">
        <div class="faq-inner">
          <div class="faq-left">
            <div class="section-label">FAQ</div>
            <h2 class="section-title">คำถามที่<br>พบบ่อย</h2>
            <p class="section-desc">ยังมีคำถามเพิ่มเติม? ติดต่อทีมเราได้เลย</p>
            <a href="#" class="btn btn-primary" style="margin-top:24px">ติดต่อเรา</a>
          </div>
          <div class="faq-list">
            <div
              class="faq-item"
              v-for="(q, i) in faqs"
              :key="i"
              :class="{ open: openFaq === i }"
              @click="toggleFaq(i)"
            >
              <div class="faq-question">
                {{ q.q }}
                <span class="faq-arrow">{{ openFaq === i ? '−' : '+' }}</span>
              </div>
              <div class="faq-answer" v-show="openFaq === i">{{ q.a }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────── CTA BANNER ───────────────────── -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-bg-glow"></div>
          <div class="eyebrow-badge light">พร้อมให้บริการแล้ววันนี้</div>
          <h2 class="cta-title">เริ่มต้นฟรี<br>ไม่มีบัตรเครดิต</h2>
          <p class="cta-desc">ทดลองใช้งานครบทุกฟีเจอร์ ไม่มีข้อผูกมัด<br>ทีม onboarding พร้อมช่วยเหลือตั้งแต่วันแรก</p>
          <div class="cta-btns">
            <a href="#" class="btn btn-white btn-lg">เริ่มใช้งานฟรี 30 วัน</a>
            <a href="#" class="btn btn-outline-white btn-lg">นัดหมาย Demo</a>
          </div>
          <p class="cta-note">โทร 02-481-5234 · LINE @thelivingos · จ-ส 9:00–18:00</p>
        </div>
      </div>
    </section>

    <!-- ───────────────────── FOOTER ───────────────────── -->
    <footer class="los-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="#" class="nav-logo">
              <span class="logo-dot"></span>
              <span class="logo-text">The LivingOS</span>
            </a>
            <p class="footer-tagline">No.1 Property Management<br>Solutions in Thailand</p>
            <div class="footer-social">
              <a href="#" class="social-btn">f</a>
              <a href="#" class="social-btn">▶</a>
              <a href="#" class="social-btn">L</a>
            </div>
          </div>
          <div class="footer-links" v-for="col in footerCols" :key="col.title">
            <div class="footer-col-title">{{ col.title }}</div>
            <a href="#" class="footer-link" v-for="l in col.links" :key="l">{{ l }}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2024 The LivingOS. All rights reserved.</span>
          <div class="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const openFaq = ref(null)

const chartBars = [28, 45, 38, 60, 52, 70, 65, 80, 72, 90, 85, 95]

const stats = [
  { value: '3,000+', label: 'โครงการที่ใช้งาน' },
  { value: '1.2 ล้าน+', label: 'ยูนิตภายใต้การดูแล' },
  { value: '25 ปี', label: 'ประสบการณ์ในวงการ' },
  { value: '99.9%', label: 'uptime SLA' },
]

const problems = [
  { icon: '📋', title: 'Excel กระจัดกระจาย', desc: 'ข้อมูลบัญชี พัสดุ ลูกบ้าน อยู่คนละไฟล์ อัปเดตไม่ตรงกัน' },
  { icon: '⏰', title: 'เสียเวลางานซ้ำซาก', desc: 'ทีมงานทำงานซ้ำ 3-4 ชั่วโมงต่อวันกับงานที่ระบบทำแทนได้' },
  { icon: '📞', title: 'ลูกบ้านโทรหาตลอด', desc: 'ถามเรื่องพัสดุ ถามยอดค้างชำระ ขอจองส่วนกลาง — ไม่มีเวลาทำงานอื่น' },
  { icon: '🔒', title: 'ความเสี่ยงด้านข้อมูล', desc: 'ข้อมูลส่วนตัวลูกบ้านอยู่ในไฟล์ที่ไม่มีการป้องกัน' },
]

const juristicFeatures = [
  'ระบบบัญชีและออกใบแจ้งหนี้อัตโนมัติ',
  'จัดการพัสดุ Real-time พร้อมแจ้งเตือน',
  'ติดตามแจ้งซ่อม Assign งานในระบบ',
  'ระบบตรวจจุด Smart Audit + NFC',
  'รายงานและ Dashboard ครบถ้วน',
  'บันทึกเวลาพนักงาน Time Attendance',
]

const residentFeatures = [
  'รับพัสดุพร้อมแจ้งเตือน Push Notification',
  'ชำระค่าส่วนกลางผ่าน QR Code ในแอป',
  'จองพื้นที่ส่วนกลางได้ตลอด 24 ชั่วโมง',
  'แจ้งซ่อมพร้อมติดตามสถานะแบบ Real-time',
  'แชทตรงกับทีมนิติบุคคล',
  'ดีลพิเศษจาก Marketplace เฉพาะลูกบ้าน',
]

const appQuick = [
  { icon: '📦', label: 'พัสดุ' },
  { icon: '🏊', label: 'จองส่วนกลาง' },
  { icon: '🔧', label: 'แจ้งซ่อม' },
  { icon: '💳', label: 'ชำระเงิน' },
]

const numbers = [
  { value: '3,000+', label: 'โครงการ', sub: 'คอนโดและหมู่บ้าน' },
  { value: '1.2M+', label: 'ยูนิต', sub: 'ภายใต้การดูแล' },
  { value: '25 ปี', label: 'ประสบการณ์', sub: 'ในวงการอสังหาริมทรัพย์' },
  { value: '< 2 ชม.', label: 'Onboarding', sub: 'เริ่มใช้งานได้เลยวันนั้น' },
]

const testimonials = [
  {
    quote: 'ก่อนหน้านี้ทำบัญชีวันละ 4 ชั่วโมง พอใช้ LivingOS เหลือแค่ 1.5 ชั่วโมง ทีมงานมีเวลาดูแลลูกบ้านได้มากขึ้น',
    name: 'Apichat Wirawong',
    role: 'นิติบุคคล ฟอรั่ม ทาวเวอร์',
  },
  {
    quote: 'ระบบพัสดุช่วยได้มากจริงๆ ลูกบ้านไม่ต้องมาถามที่เคาน์เตอร์แล้ว แจ้งเตือนทางแอปพลิเคชันได้เลย',
    name: 'Aranya Malaiwong',
    role: 'นิติบุคคล เดอะพอยต์',
  },
  {
    quote: 'ใช้ได้ง่ายมาก ทีมงานไม่ต้องใช้เวลาเรียนนาน เปิดใช้งานได้เลยในวันเดียว',
    name: 'Sayan Maidam',
    role: 'เดอะไนน์ พร็อพเพอร์ตี้',
  },
  {
    quote: 'ระบบแจ้งซ่อมทำให้ลูกบ้านมั่นใจว่างานถูกติดตาม ไม่หายไปไหน ความน่าเชื่อถือดีขึ้นมาก',
    name: 'คุณเมย์',
    role: 'นิติบุคคล วีธารา สุขุมวิท 36',
  },
]

const faqs = [
  {
    q: 'The LivingOS เหมาะกับโครงการขนาดไหน?',
    a: 'รองรับทุกขนาดตั้งแต่หอพักขนาดเล็กไปจนถึงโครงการคอนโดและหมู่บ้านขนาดใหญ่หลายพันยูนิต ระบบ scale ได้ตามขนาดโครงการ',
  },
  {
    q: 'ราคาเป็นอย่างไร มีค่าใช้จ่ายแอบแฝงไหม?',
    a: 'ราคาโปร่งใส ไม่มีค่าแอบแฝง ติดต่อทีมขายเพื่อรับใบเสนอราคาที่เหมาะกับขนาดโครงการของคุณ มีแพ็คเกจหลายระดับให้เลือก',
  },
  {
    q: 'Migration ข้อมูลเก่าจาก Excel ทำได้ไหม?',
    a: 'ได้เลย ทีม onboarding ของเราช่วย import ข้อมูลลูกบ้าน ยูนิต และประวัติการชำระเงินจากไฟล์เดิมได้ ใช้เวลาน้อยกว่าที่คิด',
  },
  {
    q: 'ถ้าระบบมีปัญหา ติดต่อใครได้บ้าง?',
    a: 'มีทีม support วันจันทร์–เสาร์ 9:00–18:00 ผ่านโทร LINE และ Email ระบบ SLA 99.9% uptime พร้อม maintenance แจ้งล่วงหน้าเสมอ',
  },
]

const footerCols = [
  {
    title: 'สำหรับนิติบุคคล',
    links: ['JuristicOS', 'ระบบบัญชี', 'Smart Audit', 'Visitor Management', 'Debt Collection'],
  },
  {
    title: 'สำหรับลูกบ้าน',
    links: ['The LivingOS App', 'Marketplace', 'Home Services', 'Smart Home', 'Real Estate'],
  },
  {
    title: 'บริษัท',
    links: ['เกี่ยวกับเรา', 'ข่าวสาร', 'ร่วมงานกับเรา', 'ติดต่อเรา', 'คอร์สอบรม'],
  },
]

const handleScroll = () => { isScrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const toggleFaq = (i) => { openFaq.value = openFaq.value === i ? null : i }
</script>

<style scoped>
/* ─── TOKENS ─── */
:root {
  --blue: #1C70F7;
  --blue-hover: #1560D8;
  --blue-soft: #EEF4FF;
  --blue-border: #DDEAFF;
  --orange: #F97316;
  --page-bg: #FAF9F6;
  --surface: #F5F3EE;
  --overlay: #EEEAE2;
  --border-light: #E8E4DA;
  --border-mid: #D4CFC4;
  --text-1: #1A1A1A;
  --text-2: #3D3D3D;
  --text-3: #6B6B6B;
  --text-4: #9A9A9A;
  --shadow-sm: 0 1px 4px rgba(60,45,20,.07),0 1px 2px rgba(60,45,20,.05);
  --shadow-md: 0 4px 16px rgba(60,45,20,.10),0 2px 6px rgba(60,45,20,.06);
  --shadow-lg: 0 12px 40px rgba(60,45,20,.13),0 4px 12px rgba(60,45,20,.07);
  --shadow-blue: 0 8px 24px rgba(28,112,247,.22),0 2px 8px rgba(28,112,247,.14);
}

/* ─── BASE ─── */
.los-page {
  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
  background: var(--page-bg);
  color: var(--text-1);
  line-height: 1.65;
}
.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── NAV ─── */
.los-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250,249,246,0.85);
  backdrop-filter: blur(14px);
  border-bottom: 1.5px solid transparent;
  transition: border-color .2s, box-shadow .2s;
}
.los-nav.scrolled {
  border-bottom-color: var(--border-light);
  box-shadow: var(--shadow-sm);
}
.nav-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 17px;
  color: var(--text-1);
  letter-spacing: -0.02em;
}
.logo-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1C70F7;
  display: inline-block;
}
.logo-text { color: var(--text-1); }
.nav-links {
  display: flex;
  gap: 8px;
  margin-left: auto;
}
.nav-link {
  padding: 6px 14px;
  font-size: 14px;
  color: var(--text-3);
  text-decoration: none;
  border-radius: 8px;
  transition: color .15s, background .15s;
}
.nav-link:hover { color: var(--text-1); background: var(--surface); }
.nav-actions { display: flex; gap: 8px; }

/* ─── BUTTONS ─── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 10px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all .18s ease;
  border: 1.5px solid transparent;
  white-space: nowrap;
}
.btn-sm  { font-size: 13px; padding: 7px 16px; }
.btn-lg  { font-size: 15px; padding: 13px 26px; }
.btn:not(.btn-sm):not(.btn-lg) { font-size: 14px; padding: 10px 20px; }

.btn-primary  { background: #1C70F7; color: #fff; box-shadow: var(--shadow-blue); }
.btn-primary:hover { background: #1560D8; transform: translateY(-1px); }

.btn-soft     { background: var(--blue-soft); color: #1560D8; border-color: var(--blue-border); }
.btn-soft:hover { background: var(--blue-border); }

.btn-warm     { background: var(--surface); color: var(--text-2); border-color: var(--border-mid); }
.btn-warm:hover { background: var(--overlay); transform: translateY(-1px); }

.btn-ghost    { background: transparent; color: var(--text-2); border-color: var(--border-light); }
.btn-ghost:hover { background: var(--surface); }

.btn-white    { background: #fff; color: #1C70F7; border-color: transparent; box-shadow: var(--shadow-md); }
.btn-white:hover { transform: translateY(-1px); box-shadow: var(--shadow-lg); }

.btn-outline-white { background: transparent; color: #fff; border-color: rgba(255,255,255,.4); }
.btn-outline-white:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.7); }

/* ─── HERO ─── */
.hero-section {
  position: relative;
  padding: 96px 0 80px;
  overflow: hidden;
}
.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(28,112,247,.09) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 100%);
  pointer-events: none;
}
.hero-bg-glow {
  position: absolute;
  top: -80px;
  right: -120px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(28,112,247,.07) 0%, rgba(249,115,22,.04) 50%, transparent 70%);
  pointer-events: none;
}
.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  position: relative;
}
.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--blue-soft);
  border: 1.5px solid var(--blue-border);
  border-radius: 999px;
  padding: 5px 14px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #1560D8;
}
.eyebrow-badge.light {
  background: rgba(255,255,255,.15);
  border-color: rgba(255,255,255,.25);
  color: rgba(255,255,255,.9);
}
.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1C70F7;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:.5; transform:scale(1.4); }
}
.hero-headline {
  font-size: clamp(42px, 6vw, 66px);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: var(--text-1);
  margin: 0;
}
.headline-accent { color: #1C70F7; }
.hero-desc {
  font-size: 18px;
  font-weight: 300;
  color: var(--text-3);
  max-width: 560px;
  margin: 0;
  line-height: 1.7;
}
.hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

/* hero card preview */
.hero-card-preview {
  width: 100%;
  max-width: 820px;
  background: #fff;
  border: 1.5px solid var(--border-light);
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin-top: 16px;
}
.preview-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 18px;
  background: var(--surface);
  border-bottom: 1.5px solid var(--border-light);
}
.preview-dot { width:10px;height:10px;border-radius:50%; }
.preview-dot.red{background:#FF5F56}.preview-dot.yellow{background:#FFBD2E}.preview-dot.green{background:#27C93F}
.preview-title { font-size:12px;color:var(--text-4);margin-left:8px;font-family:'IBM Plex Mono',monospace; }
.preview-body { padding: 20px 24px; display:flex;flex-direction:column;gap:16px; }
.preview-stats-row { display:grid;grid-template-columns:repeat(3,1fr);gap:16px; }
.preview-stat {
  background: var(--surface);
  border: 1.5px solid var(--border-light);
  border-radius: 12px;
  padding: 14px 16px;
  display:flex;flex-direction:column;gap:4px;
}
.pstat-label { font-size:11px;color:var(--text-4); }
.pstat-value { font-size:18px;font-weight:700;color:var(--text-1); font-family:'IBM Plex Mono',monospace; }
.pstat-value.blue { color:#1C70F7; }
.pstat-badge {
  font-size:11px;font-weight:600;border-radius:999px;padding:2px 8px;width:fit-content;
}
.pstat-badge.green{background:#F0FDF4;color:#16A34A;}
.pstat-badge.blue{background:var(--blue-soft);color:#1560D8;}
.pstat-badge.yellow{background:#FEFCE8;color:#A16207;}
.preview-chart-row { display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start; }
.chart-bars {
  display:flex;align-items:flex-end;gap:4px;height:70px;
  background:var(--surface);border-radius:10px;padding:10px;
}
.chart-bar {
  flex:1;background:#1C70F7;border-radius:3px 3px 0 0;opacity:.7;
  animation: growUp .6s ease var(--delay) both;
}
@keyframes growUp { from{height:0!important} }
.preview-notif { display:flex;flex-direction:column;gap:8px; }
.notif-item {
  display:flex;align-items:center;gap:10px;
  padding:8px 12px;background:var(--surface);border-radius:10px;
  font-size:12px;color:var(--text-2);
}
.notif-icon { font-size:14px; }
.notif-time { margin-left:auto;font-size:11px;color:var(--text-4); }

/* ─── STATS BAR ─── */
.stats-bar {
  border-top: 1.5px solid var(--border-light);
  border-bottom: 1.5px solid var(--border-light);
  padding: 28px 0;
  background: #fff;
}
.stats-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:0; }
.stat-item {
  display:flex;flex-direction:column;align-items:center;gap:4px;
  padding: 0 16px;
  border-right: 1.5px solid var(--border-light);
}
.stat-item:last-child { border-right: none; }
.stat-number { font-size:26px;font-weight:700;color:#1C70F7;letter-spacing:-0.02em;font-family:'IBM Plex Mono',monospace; }
.stat-label  { font-size:13px;color:var(--text-3);text-align:center; }

/* ─── SECTIONS SHARED ─── */
.section-label {
  font-family:'IBM Plex Mono',monospace;
  font-size:11px;font-weight:500;letter-spacing:.10em;text-transform:uppercase;
  color:var(--text-4);margin-bottom:12px;
}
.section-label.center { text-align:center; }
.section-title { font-size:clamp(28px,4vw,40px);font-weight:700;letter-spacing:-0.02em;line-height:1.15;color:var(--text-1);margin:0 0 16px; }
.section-title.center { text-align:center; }
.section-desc { font-size:16px;font-weight:300;color:var(--text-3);line-height:1.7;margin:0; }

/* ─── PROBLEM ─── */
.problem-section { padding:96px 0; }
.problem-grid { display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;margin-top:40px; }
.problem-left { position:sticky;top:100px; }
.problem-cards { display:flex;flex-direction:column;gap:16px; }
.problem-card {
  display:flex;gap:16px;align-items:flex-start;
  background:#fff;border:1.5px solid var(--border-light);border-radius:14px;
  padding:20px;box-shadow:var(--shadow-sm);
  transition: box-shadow .2s, transform .2s;
}
.problem-card:hover { box-shadow:var(--shadow-md);transform:translateX(4px); }
.problem-icon { font-size:24px;flex-shrink:0; }
.problem-title { font-weight:600;font-size:15px;color:var(--text-1);margin-bottom:4px; }
.problem-desc  { font-size:13px;color:var(--text-3);line-height:1.6; }

/* ─── FEATURES BENTO ─── */
.features-section { padding:96px 0;background:var(--surface); }
.bento-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-auto-rows:auto;
  gap:16px;
  margin-top:48px;
}
.bento-card {
  background:#fff;border:1.5px solid var(--border-light);border-radius:20px;
  padding:28px;box-shadow:var(--shadow-sm);
  transition:box-shadow .2s,transform .2s;
  display:flex;flex-direction:column;gap:10px;
}
.bento-card:hover { box-shadow:var(--shadow-md);transform:translateY(-3px); }
.bento-large { grid-column:span 2; }
.bento-tall  { grid-row:span 2; }
.bento-wide  { grid-column:span 2; }
.bento-accent { background:var(--blue-soft);border-color:var(--blue-border); }
.bento-icon  { font-size:28px;width:52px;height:52px;display:flex;align-items:center;justify-content:center;background:var(--surface);border-radius:12px; }
.bento-title { font-size:17px;font-weight:600;color:var(--text-1);margin:0; }
.bento-desc  { font-size:13px;color:var(--text-3);line-height:1.6;margin:0; }
.bento-pill {
  display:inline-flex;align-items:center;border-radius:999px;
  font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;
  padding:3px 10px;width:fit-content;
}
.bento-pill.blue { background:var(--blue-soft);color:#1560D8;border:1.5px solid var(--blue-border); }
.bento-pill.green{ background:#F0FDF4;color:#16A34A;border:1.5px solid #BBF7D0; }
.bento-parcel-visual { display:flex;flex-direction:column;gap:6px;margin-top:8px; }
.parcel-row { display:flex;align-items:center;gap:10px;font-size:12px; }
.parcel-icon { font-size:16px; }
.parcel-bar { flex:1;height:6px;background:var(--border-light);border-radius:3px;overflow:hidden;position:relative; }
.parcel-bar::after {
  content:'';position:absolute;left:0;top:0;height:100%;
  width:85%;background:#1C70F7;border-radius:3px;
}
.parcel-status { font-size:11px;font-weight:600; }
.parcel-status.green { color:#16A34A; }
.booking-visual { display:flex;gap:8px;flex-wrap:wrap;margin-top:8px; }
.booking-slot {
  border-radius:8px;padding:6px 12px;font-size:12px;font-weight:500;
}
.booking-slot.taken { background:#FEF2F2;color:#DC2626;border:1.5px solid #FCA5A5; }
.booking-slot.available { background:#F0FDF4;color:#16A34A;border:1.5px solid #BBF7D0; }

/* ─── PRODUCT SECTIONS ─── */
.product-section { padding:96px 0; }
.product-section.alt { background:var(--surface); }
.product-row {
  display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;
}
.product-row.reverse { direction:rtl; }
.product-row.reverse > * { direction:ltr; }
.feature-list { list-style:none;padding:0;margin:20px 0;display:flex;flex-direction:column;gap:10px; }
.feature-list li { display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--text-2); }
.feature-check { color:#1C70F7;font-weight:700;flex-shrink:0; }
.product-ctas { display:flex;gap:12px;flex-wrap:wrap;margin-top:8px; }

/* product mockup */
.product-mock {
  background:#fff;border:1.5px solid var(--border-light);border-radius:20px;
  box-shadow:var(--shadow-lg);overflow:hidden;
}
.mock-header {
  display:flex;align-items:center;gap:7px;padding:12px 18px;
  background:var(--surface);border-bottom:1.5px solid var(--border-light);
}
.mock-dot { width:10px;height:10px;border-radius:50%; }
.mock-dot.r{background:#FF5F56}.mock-dot.y{background:#FFBD2E}.mock-dot.g{background:#27C93F}
.mock-title { font-size:12px;color:var(--text-4);margin-left:8px;font-family:'IBM Plex Mono',monospace; }
.mock-body { display:flex;min-height:280px; }
.mock-sidebar { width:140px;background:var(--surface);border-right:1.5px solid var(--border-light);padding:16px;display:flex;flex-direction:column;gap:4px;flex-shrink:0; }
.mock-nav-item {
  font-size:12px;color:var(--text-3);padding:8px 10px;border-radius:8px;cursor:pointer;
  transition:background .15s,color .15s;
}
.mock-nav-item.active { background:#EEF4FF;color:#1560D8;font-weight:600; }
.mock-content { flex:1;padding:16px;display:flex;flex-direction:column;gap:12px; }
.mock-stat-row { display:grid;grid-template-columns:1fr 1fr;gap:10px; }
.mock-stat-card { border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:4px; }
.mock-stat-card.blue { background:var(--blue-soft);border:1.5px solid var(--blue-border); }
.mock-stat-card.green{ background:#F0FDF4;border:1.5px solid #BBF7D0; }
.msc-label { font-size:10px;color:var(--text-4); }
.msc-value { font-size:15px;font-weight:700;color:var(--text-1);font-family:'IBM Plex Mono',monospace; }
.mock-list-item { display:flex;align-items:center;gap:10px;padding:10px;background:var(--surface);border-radius:8px; }
.mli-dot { width:8px;height:8px;border-radius:50%;background:#1C70F7;flex-shrink:0; }
.mli-bar { flex:1;height:8px;background:var(--border-light);border-radius:4px; }
.mli-tag { font-size:10px;background:#FEFCE8;color:#A16207;border:1.5px solid #FEF08A;border-radius:999px;padding:2px 8px;font-family:'IBM Plex Mono',monospace; }

/* phone mockup */
.phone-mock {
  width:260px;margin:0 auto;
  background:#1A1A1A;border-radius:40px;padding:14px;
  box-shadow:var(--shadow-lg), 0 0 0 8px #2A2A2A;
}
.phone-notch { width:90px;height:26px;background:#0A0A0A;border-radius:13px;margin:0 auto 10px; }
.phone-screen { background:#fff;border-radius:28px;overflow:hidden;padding:0; }
.app-header { display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#1C70F7;color:#fff;font-weight:600;font-size:14px; }
.app-bell { font-size:16px; }
.app-quick-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-bottom:1.5px solid var(--border-light); }
.app-quick { display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px 4px;font-size:10px;color:var(--text-3);cursor:pointer;transition:background .15s; }
.app-quick:hover { background:var(--surface); }
.app-quick span:first-child { font-size:20px; }
.app-parcel-card { margin:12px;background:var(--blue-soft);border:1.5px solid var(--blue-border);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px; }
.parcel-badge { font-size:12px;font-weight:600;color:#1560D8; }
.app-parcel-card p { font-size:12px;color:var(--text-2);margin:0;line-height:1.5; }
.app-btn-blue { background:#1C70F7;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit; }

/* ─── NUMBERS ─── */
.numbers-section { padding:96px 0; }
.numbers-inner { text-align:center; }
.numbers-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:32px;margin-top:56px; }
.number-item {
  display:flex;flex-direction:column;align-items:center;gap:6px;
  padding:32px 20px;background:#fff;border:1.5px solid var(--border-light);
  border-radius:20px;box-shadow:var(--shadow-sm);
  transition:box-shadow .2s,transform .2s;
}
.number-item:hover { box-shadow:var(--shadow-md);transform:translateY(-3px); }
.number-value { font-size:38px;font-weight:700;color:#1C70F7;letter-spacing:-0.03em;font-family:'IBM Plex Mono',monospace; }
.number-label { font-size:16px;font-weight:600;color:var(--text-1); }
.number-sub   { font-size:12px;color:var(--text-4);text-align:center; }

/* ─── TESTIMONIALS ─── */
.testimonials-section { padding:96px 0;background:var(--surface); }
.testi-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:48px; }
.testi-card {
  background:#fff;border:1.5px solid var(--border-light);border-radius:20px;
  padding:28px;box-shadow:var(--shadow-sm);
  transition:box-shadow .2s,transform .2s;
}
.testi-card:hover { box-shadow:var(--shadow-md);transform:translateY(-3px); }
.testi-stars { color:#F59E0B;font-size:14px;letter-spacing:1px;margin-bottom:12px; }
.testi-quote { font-size:15px;color:var(--text-2);line-height:1.7;font-weight:300;margin:0 0 20px; }
.testi-author { display:flex;align-items:center;gap:12px; }
.testi-avatar {
  width:40px;height:40px;border-radius:50%;background:#1C70F7;
  color:#fff;font-weight:700;font-size:16px;display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}
.testi-name { font-size:14px;font-weight:600;color:var(--text-1); }
.testi-role { font-size:12px;color:var(--text-4); }

/* ─── FAQ ─── */
.faq-section { padding:96px 0; }
.faq-inner { display:grid;grid-template-columns:380px 1fr;gap:80px;align-items:start; }
.faq-list { display:flex;flex-direction:column;gap:12px; }
.faq-item {
  background:#fff;border:1.5px solid var(--border-light);border-radius:14px;
  overflow:hidden;cursor:pointer;
  transition:box-shadow .2s,border-color .2s;
}
.faq-item.open { border-color:#1C70F7;box-shadow:var(--shadow-blue); }
.faq-question {
  display:flex;justify-content:space-between;align-items:center;
  padding:18px 20px;font-size:15px;font-weight:500;color:var(--text-1);
  user-select:none;
}
.faq-arrow { font-size:20px;color:var(--text-3);font-weight:300;flex-shrink:0; }
.faq-answer {
  padding:0 20px 18px;font-size:14px;color:var(--text-3);line-height:1.7;
  border-top:1.5px solid var(--border-light);padding-top:16px;
}

/* ─── CTA BANNER ─── */
.cta-section { padding:96px 0; }
.cta-inner {
  position:relative;overflow:hidden;
  background:#1C70F7;border-radius:28px;
  padding:72px 48px;text-align:center;
}
.cta-bg-glow {
  position:absolute;top:-50%;left:50%;transform:translateX(-50%);
  width:700px;height:700px;
  background:radial-gradient(circle,rgba(255,255,255,.12) 0%,transparent 65%);
  pointer-events:none;
}
.cta-title {
  font-size:clamp(36px,5vw,52px);font-weight:700;color:#fff;
  letter-spacing:-0.025em;line-height:1.1;margin:16px 0 16px;
}
.cta-desc { font-size:17px;font-weight:300;color:rgba(255,255,255,.8);margin:0 0 36px;line-height:1.7; }
.cta-btns { display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:24px; }
.cta-note { font-size:13px;color:rgba(255,255,255,.55);font-family:'IBM Plex Mono',monospace; }

/* ─── FOOTER ─── */
.los-footer {
  background:#fff;
  border-top:1.5px solid var(--border-light);
  padding:64px 0 32px;
}
.footer-top { display:grid;grid-template-columns:280px repeat(3,1fr);gap:48px;margin-bottom:48px; }
.footer-brand { display:flex;flex-direction:column;gap:12px; }
.footer-tagline { font-size:13px;color:var(--text-4);line-height:1.6;margin:0; }
.footer-social { display:flex;gap:8px; }
.social-btn {
  width:32px;height:32px;border-radius:8px;background:var(--surface);border:1.5px solid var(--border-light);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:700;color:var(--text-3);text-decoration:none;
  transition:background .15s,color .15s;
}
.social-btn:hover { background:var(--overlay);color:var(--text-1); }
.footer-col-title { font-size:12px;font-weight:600;color:var(--text-1);margin-bottom:14px;letter-spacing:.04em; }
.footer-link {
  display:block;font-size:13px;color:var(--text-4);text-decoration:none;
  margin-bottom:8px;transition:color .15s;
}
.footer-link:hover { color:var(--text-1); }
.footer-bottom {
  display:flex;justify-content:space-between;align-items:center;
  border-top:1.5px solid var(--border-light);padding-top:24px;
  font-size:13px;color:var(--text-4);
}
.footer-legal { display:flex;gap:20px; }
.footer-legal a { color:var(--text-4);text-decoration:none;transition:color .15s; }
.footer-legal a:hover { color:var(--text-1); }

/* ─── RESPONSIVE ─── */
@media (max-width: 900px) {
  .bento-grid { grid-template-columns:1fr 1fr; }
  .bento-large,.bento-wide { grid-column:span 1; }
  .bento-tall { grid-row:span 1; }
  .product-row,.product-row.reverse { grid-template-columns:1fr;direction:ltr; }
  .phone-mock { display:none; }
  .stats-grid,.numbers-grid { grid-template-columns:repeat(2,1fr); }
  .testi-grid { grid-template-columns:1fr; }
  .faq-inner { grid-template-columns:1fr; }
  .footer-top { grid-template-columns:1fr 1fr; }
  .problem-grid { grid-template-columns:1fr; }
}
@media (max-width: 600px) {
  .nav-links { display:none; }
  .bento-grid { grid-template-columns:1fr; }
  .stats-grid { grid-template-columns:repeat(2,1fr); }
  .numbers-grid { grid-template-columns:repeat(2,1fr); }
  .preview-stats-row { grid-template-columns:1fr; }
  .preview-chart-row { grid-template-columns:1fr; }
  .footer-top { grid-template-columns:1fr; }
}
</style>
