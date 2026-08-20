<template>
  <div class="sso-page">
    <nav>
      <div class="navpill-wrap">
        <router-link class="sso-exit" to="/">← หน้าหลัก</router-link>
        <span class="sso-navdivider"></span>
        <a class="navpill" href="#problem">Problem</a>
        <a class="navpill" href="#success">Success criteria</a>
        <a class="navpill" href="#persona">Persona</a>
        <a class="navpill" href="#journey">As-is vs to-be</a>
        <a class="navpill" href="#indepth">To-be in-depth</a>
      </div>
    </nav>

    <div class="stage">
      <div class="intro">
        <span class="overline">Project brief · PMS</span>
        <h1 class="title">ให้ลูกค้าตั้งค่า PMS ได้<br><span class="hl">ด้วยตัวเอง</span></h1>
        <p class="lead">วันนี้การ onboard ลูกค้าใหม่ต้องผ่าน CS ทุกขั้นตอน เพราะต้อง migrate ข้อมูล 11 ชุดจากระบบเก่าเข้าสู่ PMS โปรเจกต์นี้ออกแบบให้ลูกค้าทำเองได้ โดยให้ CS ดูแลเฉพาะจุดที่มีความเสี่ยงทางการเงินสูงจริงๆ</p>
        <div class="pillrow">
          <span class="trustpill"><span class="dot"></span>11 ชุดข้อมูล</span>
          <span class="trustpill"><span class="dot"></span>6 wave</span>
          <span class="trustpill"><span class="dot"></span>4 persona</span>
          <span class="trustpill"><span class="dot"></span>3 release</span>
        </div>
      </div>
    </div>

    <section id="problem">
      <div class="sec-inner">
        <span class="overline">01</span>
        <h2 class="sec-title">Problem statement</h2>
        <p class="sec-lead">ทำไมการ onboard ทุกวันนี้ถึง scale ไม่ได้</p>

        <p style="max-width:72ch; margin-bottom:24px;">
          นิติบุคคลที่สมัครใช้ PMS ใหม่ต้องรอ CS ติดต่อกลับเพื่อขอข้อมูลโครงการ แล้ว CS จะเป็นคนกรอกข้อมูลทั้งหมดให้ ไม่ว่าจะเป็นห้อง/บ้าน สมาชิก ผังบัญชี รายรับ-รายจ่าย ทะเบียนมิเตอร์ ค่าปรับ นโยบายบัญชี ข้อมูลโครงการ supplier และหนี้เก่า — งานทั้งหมดนี้เป็นงาน manual ของ CS คนเดียว ทำให้เกิด 3 ปัญหาซ้อนกัน: template excel ไม่ตรงกับข้อมูลที่ลูกค้ามีอยู่จริง, ข้อมูลที่กรอกเข้ามาผิดพลาดต้องแก้ไปมาหลายรอบ, และความสามารถในการ onboard ลูกค้าใหม่ผูกติดกับจำนวน CS ตรงๆ ตลอดกระบวนการลูกค้ามีบทบาทแค่ "ให้ข้อมูล" ตอนต้น กับ "รับโครงการ" ตอนจบ ไม่เห็นความคืบหน้าเลยระหว่างทาง
        </p>

        <div class="story-card">
          <span class="as">User story</span>
          <p>As a นิติบุคคล staff setting up a new project on PMS, I want to import and configure my own data — units, chart of accounts, residents, financial rules — directly in the system,</p>
          <p style="margin-top:4px;">so that I don't have to wait for a CS specialist at every step, and can go live on my own timeline.</p>
          <div class="th">ในฐานะเจ้าหน้าที่นิติบุคคลที่กำลังเปิดโครงการใหม่ ฉันต้องการ import และตั้งค่าข้อมูลของตัวเอง เพื่อไม่ต้องรอ CS ทุกขั้นตอน และเปิดใช้งานได้ตามเวลาที่สะดวก</div>
        </div>
      </div>
    </section>

    <section class="tint" id="success" style="background-image:radial-gradient(circle, rgba(28,112,247,.06) 1px, transparent 1px); background-size:28px 28px;">
      <div class="sec-inner">
        <span class="overline">02</span>
        <h2 class="sec-title">Success criteria</h2>
        <p class="sec-lead">ตัวชี้วัดที่บอกว่าโปรเจกต์นี้ได้ผล — baseline ปัจจุบันของแต่ละตัวยังไม่มี ต้องวัดใน sprint 0 ก่อนตั้ง target ตัวเลขจริง</p>

        <div class="grid2" style="grid-template-columns:repeat(3,1fr); gap:16px;">
          <div class="card metric">
            <div class="n">Self-serve rate</div>
            <div class="l">% onboarding ที่จบได้โดยไม่ต้องพึ่ง CS</div>
            <div class="d">วัดตั้งแต่เดือนแรกหลัง launch</div>
          </div>
          <div class="card metric">
            <div class="n">Time-to-first-invoice</div>
            <div class="l">เวลาตั้งแต่เริ่ม onboarding ถึงออกใบแจ้งหนี้ใบแรก</div>
            <div class="d">เทียบกับ baseline ปัจจุบันที่ต้องวัดก่อน</div>
          </div>
          <div class="card metric">
            <div class="n">Ticket / onboarding</div>
            <div class="l">จำนวน support ticket ที่ CS ต้องเข้าไปช่วยต่อ 1 onboarding</div>
            <div class="d">ควรลดลงต่อเนื่องหลังแต่ละ release</div>
          </div>
          <div class="card metric">
            <div class="n">Reconciliation error</div>
            <div class="l">อัตราความคลาดเคลื่อนของยอดหนี้เก่าหลัง import</div>
            <div class="d">ต้องเข้าใกล้ 0% เพราะกระทบเงินลูกบ้านตรง</div>
          </div>
          <div class="card metric">
            <div class="n">Onboarding NPS</div>
            <div class="l">ความพึงพอใจของลูกค้าต่อกระบวนการ onboarding เอง</div>
            <div class="d">วัดผ่าน survey สั้นหลัง go-live</div>
          </div>
          <div class="card metric">
            <div class="n">Volume ไม่ผูก CS</div>
            <div class="l">จำนวนโครงการที่ onboard พร้อมกันได้ ไม่ขึ้นกับ CS headcount</div>
            <div class="d">ยกเว้น wave เสี่ยงสูงที่ยังต้อง assist</div>
          </div>
        </div>
      </div>
    </section>

    <section id="persona">
      <div class="sec-inner">
        <span class="overline">03</span>
        <h2 class="sec-title">Persona</h2>
        <p class="sec-lead">คนที่เกี่ยวข้องกับ flow นี้ทั้งฝั่งลูกค้าและฝั่งทีมภายใน</p>

        <div class="grid4">
          <div class="card persona-card">
            <div class="avatar">PM</div>
            <h3>Property manager</h3>
            <div class="role">Primary · ฝั่งลูกค้า</div>
            <p>เจ้าหน้าที่นิติบุคคล ทำ onboarding เองผ่าน wizard ตัดสินใจเรื่อง setup ส่วนใหญ่</p>
          </div>
          <div class="card persona-card">
            <div class="avatar">AC</div>
            <h3>Accountant</h3>
            <div class="role">ฝั่งลูกค้า</div>
            <p>รับผิดชอบผังบัญชี นโยบายบันทึกบัญชี และการยืนยันยอดหนี้เก่า</p>
          </div>
          <div class="card persona-card">
            <div class="avatar">CS</div>
            <h3>Onboarding specialist</h3>
            <div class="role">Secondary · ทีมภายใน</div>
            <p>ดูแล exception หลัง reconciliation ไม่ผ่าน หรือลูกค้าติดปัญหาที่แก้เองไม่ได้</p>
          </div>
          <div class="card persona-card">
            <div class="avatar">DEV</div>
            <h3>Developer</h3>
            <div class="role">Enabler · ทีมภายใน</div>
            <p>สร้าง import engine, validation, dependency gate และ instrumentation ที่ persona อื่นใช้งาน</p>
          </div>
        </div>
      </div>
    </section>

    <section class="tint" id="journey">
      <div class="sec-inner">
        <span class="overline">04</span>
        <h2 class="sec-title">As-is journey vs to-be journey</h2>
        <p class="sec-lead">ไล่ task เดิมจาก swimlane ทีละอัน — task ไหนถูกตัดออก (None) เปลี่ยนเจ้าของงาน หรือยังเหมือนเดิมเพราะอยู่นอก scope</p>

        <div class="tally">
          <span class="pill elim">3 tasks ถูกตัดออก (None)</span>
          <span class="pill chg">5 tasks เปลี่ยนเจ้าของงาน/เป็นระบบอัตโนมัติ</span>
          <span class="pill same">4 tasks เหมือนเดิม (นอก scope)</span>
        </div>

        <div class="task-scroll">
          <div class="taskgrid">

            <div class="trow-label">As-is</div>
            <div class="tcell asis"><div class="lane">Sales</div>Sale ปิดการขาย</div>
            <div class="tcell asis"><div class="lane">Sales→CS</div>สื่อสารภายในระหว่าง Sales กับ CS</div>
            <div class="tcell asis"><div class="lane">Sales Co</div>สร้างข้อมูลสัญญาในระบบ contract</div>
            <div class="tcell asis"><div class="lane">System</div>ระบบสร้างใบแจ้งหนี้ใน flowaccount</div>
            <div class="tcell asis"><div class="lane">CS ↔ ลูกค้า</div>CS คุยกับลูกค้าเพื่อขอข้อมูลโครงการ</div>
            <div class="tcell asis"><div class="lane">CS</div>สร้างโครงการ</div>
            <div class="tcell asis"><div class="lane">CS</div>เพิ่มโครงการใน subscription</div>
            <div class="tcell asis"><div class="lane">CS</div>เพิ่มโครงการใน เปิด/ปิดฟีเจอร์</div>
            <div class="tcell asis"><div class="lane">CS</div>(ถ้าจำเป็น) เพิ่มบริษัทลงใน PMC</div>
            <div class="tcell asis"><div class="lane">CS</div>onboard ข้อมูลอื่นให้ลูกค้า (10 รายการ)</div>
            <div class="tcell asis"><div class="lane">CS</div>add user ลง project โดยใช้ email</div>
            <div class="tcell asis"><div class="lane">CS → ลูกค้า</div>ส่งมอบโครงการให้ลูกค้า</div>

            <div class="trow-label">To-be</div>
            <div class="tcell unchanged">เหมือนเดิม<div class="tag">นอก scope</div></div>
            <div class="tcell transformed">ระบบส่ง invite link ให้ลูกค้าอัตโนมัติ<div class="tag">→ automated</div></div>
            <div class="tcell unchanged">เหมือนเดิม<div class="tag">นอก scope</div></div>
            <div class="tcell unchanged">เหมือนเดิม<div class="tag">นอก scope, automated อยู่แล้ว</div></div>
            <div class="tcell none">None<div class="why">ลูกค้ากรอกเองใน wizard ไม่ต้องมีคนกลาง</div></div>
            <div class="tcell transformed">ลูกค้าสร้างโครงการเอง<div class="tag">→ self-serve</div></div>
            <div class="tcell none">None<div class="why">ระบบทำอัตโนมัติทันทีที่สร้างโครงการ</div></div>
            <div class="tcell transformed">ลูกค้าเลือกฟีเจอร์เอง<div class="tag">→ รวมใน step เริ่มต้น</div></div>
            <div class="tcell unchanged">เหมือนเดิม<div class="tag">ยังเป็นงาน backend/CS</div></div>
            <div class="tcell transformed">ลูกค้า import เองผ่าน wizard 6 wave<div class="tag">→ ดู to-be in-depth</div></div>
            <div class="tcell transformed">ลูกค้าเชิญทีมงานเอง<div class="tag">→ self-serve</div></div>
            <div class="tcell none">None<div class="why">ลูกค้าเข้าถึงระบบเองตั้งแต่ต้น ไม่ต้องส่งมอบ</div></div>

          </div>
        </div>

        <div class="note">ที่มา: as-is swimlane (Sales → Sales Co → CS → ลูกค้า) ที่วิเคราะห์ไว้ก่อนหน้านี้ในโปรเจกต์ — task ของ "ลูกค้า" ในแผนภาพเดิม (คุยกับ CS / รับโครงการแล้วเชิญ user) ถูกรวมไว้ในคอลัมน์คู่กันข้างต้นแล้ว</div>
      </div>
    </section>

    <section class="blue-tint" id="indepth">
      <div class="sec-inner">
        <span class="overline">05</span>
        <h2 class="sec-title">To-be journey in-depth</h2>
        <p class="sec-lead">8 activity หลักของ journey ใหม่ — สีของ badge อ้างอิง risk tier เดียวกับ epic backlog</p>

        <div class="journey-row">
          <div class="jnode"><div class="jcircle" style="border-color:var(--blue);"><svg width="24" height="24" viewBox="0 0 24 24" style="color:var(--blue)"><line x1="6" y1="3" x2="6" y2="21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 4 L18 8 L6 12 Z" fill="currentColor"/></svg></div><div class="jlabel">เริ่มต้น onboarding</div></div>
          <div class="jarrow"></div>
          <div class="jnode"><div class="jcircle" style="border-color:var(--green);"><svg width="24" height="24" viewBox="0 0 24 24" style="color:var(--green)"><rect x="5" y="3" width="14" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" stroke-width="1.4"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="1.4"/><line x1="8" y1="16" x2="13" y2="16" stroke="currentColor" stroke-width="1.4"/></svg></div><div class="jlabel">โครงการ &amp; บัญชี</div></div>
          <div class="jarrow"></div>
          <div class="jnode"><div class="jcircle" style="border-color:var(--green);"><svg width="24" height="24" viewBox="0 0 24 24" style="color:var(--green)"><line x1="8" y1="19" x2="8" y2="6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M5 9 L8 5 L11 9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><line x1="16" y1="5" x2="16" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M13 15 L16 19 L19 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="jlabel">รายรับ-รายจ่าย</div></div>
          <div class="jarrow"></div>
          <div class="jnode"><div class="jcircle" style="border-color:var(--green);"><svg width="24" height="24" viewBox="0 0 24 24" style="color:var(--green)"><path d="M4 12 L12 5 L20 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 11 V20 H18 V11" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="10.5" y="14.5" width="3" height="5.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></div><div class="jlabel">ห้อง/บ้าน</div></div>
          <div class="jarrow"></div>
          <div class="jnode"><div class="jcircle" style="border-color:var(--yellow);"><svg width="24" height="24" viewBox="0 0 24 24" style="color:var(--yellow)"><circle cx="12" cy="7.5" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 20 C5.5 14.8 18.5 14.8 18.5 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></div><div class="jlabel">สมาชิก &amp; มิเตอร์</div></div>
          <div class="jarrow"></div>
          <div class="jnode"><div class="jcircle" style="border-color:var(--red);"><svg width="24" height="24" viewBox="0 0 24 24" style="color:var(--red)"><line x1="12" y1="3" x2="12" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 6 Q4.5 10.5 6 6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M18 6 Q19.5 10.5 21 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></div><div class="jlabel">กฎการเงิน</div></div>
          <div class="jarrow"></div>
          <div class="jnode"><div class="jcircle" style="border-color:var(--red);"><svg width="24" height="24" viewBox="0 0 24 24" style="color:var(--red)"><path d="M6 3 H18 V19 L16 21 L14 19 L12 21 L10 19 L8 21 L6 19 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="8.5" y1="8" x2="15.5" y2="8" stroke="currentColor" stroke-width="1.3"/><line x1="8.5" y1="11.5" x2="15.5" y2="11.5" stroke="currentColor" stroke-width="1.3"/></svg></div><div class="jlabel">หนี้เก่า</div></div>
          <div class="jarrow"></div>
          <div class="jnode"><div class="jcircle" style="border-color:var(--blue);"><svg width="24" height="24" viewBox="0 0 24 24" style="color:var(--blue)"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 12.5 L11 15.5 L16.5 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="jlabel">เริ่มใช้งานจริง</div></div>
        </div>

        <div class="grid2" style="grid-template-columns:repeat(4,1fr); gap:14px; margin-top:12px;">
          <div class="act-card">
            <div class="row1"><h3>เริ่มต้น onboarding</h3><span class="badge core">Core</span></div>
            <p>ลูกค้าเห็น step list ทั้งหมด และเลือกประเภทโครงการ (คอนโด/หมู่บ้าน) เพื่อปรับ flow ให้เหมาะ</p>
            <div class="mode">Self-serve เต็มรูปแบบ</div>
          </div>
          <div class="act-card">
            <div class="row1"><h3>โครงการ &amp; บัญชี</h3><span class="badge low">Low risk</span></div>
            <p>สร้างโครงการ, import ผังบัญชี และ supplier — ไม่มี dependency ย้อนกลับ ทำก่อนได้เลย</p>
            <div class="mode">Self-serve เต็มรูปแบบ</div>
          </div>
          <div class="act-card">
            <div class="row1"><h3>รายรับ-รายจ่าย</h3><span class="badge low">Low risk</span></div>
            <p>Import รหัสรายรับ/รายจ่าย ที่ต้องอ้างอิงผังบัญชีที่ตั้งไว้ก่อนหน้า</p>
            <div class="mode">Self-serve เต็มรูปแบบ</div>
          </div>
          <div class="act-card">
            <div class="row1"><h3>ห้อง/บ้าน</h3><span class="badge low">Low risk</span></div>
            <p>Import ทะเบียนห้อง/บ้านทั้งหมด เป็นฐานให้ wave ถัดไปอ้างอิงต่อ</p>
            <div class="mode">Self-serve เต็มรูปแบบ</div>
          </div>
          <div class="act-card">
            <div class="row1"><h3>สมาชิก &amp; มิเตอร์</h3><span class="badge med">Medium risk</span></div>
            <p>Import สมาชิกพร้อม auto-match unit, แจ้งเตือน duplicate และ import ทะเบียนมิเตอร์</p>
            <div class="mode">Self-serve + validation</div>
          </div>
          <div class="act-card">
            <div class="row1"><h3>กฎการเงิน</h3><span class="badge high">High risk</span></div>
            <p>เลือก template ค่าปรับและ preset นโยบายบัญชี พร้อมหน้า review ก่อนเปิดใช้งานจริง</p>
            <div class="mode">Guided default + review บังคับ</div>
          </div>
          <div class="act-card">
            <div class="row1"><h3>หนี้เก่า</h3><span class="badge high">Highest risk</span></div>
            <p>Import ยอดหนี้เก่า แล้วเทียบยอดกับระบบเก่าก่อน commit — ไม่ตรงจะ escalate ไป support</p>
            <div class="mode">Reconciliation gate</div>
          </div>
          <div class="act-card">
            <div class="row1"><h3>เริ่มใช้งานจริง</h3><span class="badge core">Core</span></div>
            <p>เชิญทีมงานผ่าน email และดูสรุปภาพรวมก่อนกด go-live</p>
            <div class="mode">Self-serve เต็มรูปแบบ</div>
          </div>
        </div>

        <div class="note">รายละเอียด user story ทั้งหมด (~26 stories, ~139 pts), platform capability ที่คร่อมทุก wave, และ story map ฉบับเต็มอยู่ในเอกสาร epic backlog / story map ที่ทำไว้ก่อนหน้านี้ในโปรเจกต์</div>
      </div>
    </section>

    <footer>PMS · The Living OS — Self-Service Onboarding Project Brief</footer>
  </div>
</template>

<style scoped>
.sso-page{
  --blue:#1C70F7; --blue600:#1560D8; --blue400:#4D8EF9; --blue100:#DDEAFF; --blue50:#EEF4FF;
  --page:#FFFFFF; --surface:#F5F3EE; --overlay:#EEEAE2; --bl:#E8E4DA; --bm:#D4CFC4;
  --t1:#1A1A1A; --t2:#3D3D3D; --t3:#6B6B6B; --t4:#9A9A9A;
  --green:#16A34A; --green-bg:#F0FDF4; --green-bd:#BBF7D0;
  --yellow:#A16207; --yellow-bg:#FEFCE8; --yellow-bd:#FEF08A;
  --red:#DC2626; --red-bg:#FEF2F2; --red-bd:#FCA5A5;
  --shadow-sm:0 1px 4px rgba(60,45,20,.07),0 1px 2px rgba(60,45,20,.05);
  --shadow-md:0 4px 16px rgba(60,45,20,.10),0 2px 6px rgba(60,45,20,.06);

  margin:0; background:var(--page); color:var(--t2); font-family:'IBM Plex Sans Thai Looped',sans-serif; line-height:1.65; font-size:15px;
}
.sso-page *{ box-sizing:border-box; }
.sso-page h1,.sso-page h2,.sso-page h3{ font-family:'IBM Plex Sans Thai Looped',sans-serif; color:var(--t1); margin:0; }
.sso-page .mono{ font-family:'IBM Plex Mono',monospace; }
.sso-page .hl{ color:var(--blue); }

.sso-page nav{ position:sticky; top:0; background:rgba(255,255,255,.92); backdrop-filter:blur(6px); border-bottom:1px solid var(--bl); z-index:10; }
.sso-page .navpill-wrap{ max-width:1180px; margin:0 auto; padding:14px 28px; display:flex; align-items:center; gap:6px; overflow-x:auto; background:var(--overlay); border-radius:14px; margin-top:14px; margin-bottom:14px; }
.sso-page .navpill{ font-size:13px; font-weight:500; color:var(--t3); padding:8px 16px; border-radius:10px; text-decoration:none; white-space:nowrap; }
.sso-page .navpill:hover{ background:rgba(255,255,255,.5); color:var(--t2); }
.sso-page .sso-exit{ font-size:13px; font-weight:500; color:var(--t3); padding:8px 16px; text-decoration:none; white-space:nowrap; }
.sso-page .sso-exit:hover{ color:var(--blue); }
.sso-page .sso-navdivider{ width:1px; height:18px; background:var(--bl); flex-shrink:0; margin:0 4px; }

.sso-page .intro{ padding:56px 0 40px; border-bottom:1px solid var(--bl); }
.sso-page .overline{ font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:500; letter-spacing:.10em; text-transform:uppercase; color:var(--t4); }
.sso-page h1.title{ font-size:38px; font-weight:700; letter-spacing:-0.015em; margin-top:14px; max-width:20ch; line-height:1.2; }
.sso-page .lead{ font-size:18px; font-weight:400; color:var(--t3); margin-top:16px; max-width:68ch; }

.sso-page .pillrow{ display:flex; gap:10px; flex-wrap:wrap; margin-top:28px; }
.sso-page .trustpill{ display:inline-flex; align-items:center; gap:7px; padding:8px 16px; border-radius:9999px; background:#FFFFFF; border:1.5px solid var(--bl); box-shadow:var(--shadow-sm); font-size:13px; font-weight:500; color:var(--t2); }
.sso-page .dot{ width:7px; height:7px; border-radius:50%; background:var(--green); box-shadow:0 0 0 3px rgba(22,163,74,.15); }

.sso-page .stage{ max-width:1180px; margin:0 auto; padding:0 28px; }
.sso-page section{ padding:56px 0; }
.sso-page section.tint{ background:var(--surface); }
.sso-page section.blue-tint{ background:var(--blue50); background-image:radial-gradient(circle, rgba(28,112,247,.10) 1px, transparent 1px); background-size:26px 26px; }
.sso-page .sec-inner{ max-width:1180px; margin:0 auto; padding:0 28px; }
.sso-page h2.sec-title{ font-size:30px; font-weight:600; letter-spacing:-0.01em; margin-bottom:6px; }
.sso-page .sec-lead{ color:var(--t3); font-size:15px; max-width:70ch; margin-bottom:28px; }

.sso-page .card{ background:#FFFFFF; border:1.5px solid var(--bl); border-radius:20px; box-shadow:var(--shadow-sm); padding:22px 24px; }
.sso-page .card:hover{ box-shadow:var(--shadow-md); }

.sso-page .story-card{ background:var(--blue50); border:1.5px solid var(--blue100); border-radius:20px; padding:26px 28px; }
.sso-page .story-card .as{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--blue600); text-transform:uppercase; letter-spacing:.06em; }
.sso-page .story-card p{ font-size:17px; font-weight:400; color:var(--t1); margin:6px 0 0; line-height:1.6; }
.sso-page .story-card .th{ color:var(--t3); font-size:13.5px; margin-top:14px; padding-top:14px; border-top:1px solid var(--blue100); }

.sso-page .grid2{ display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
.sso-page .grid4{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
@media (max-width:900px){ .sso-page .grid2,.sso-page .grid4{ grid-template-columns:1fr 1fr; } }
@media (max-width:640px){ .sso-page .grid2,.sso-page .grid4{ grid-template-columns:1fr; } }

.sso-page .metric .n{ font-size:22px; font-weight:600; color:var(--blue); }
.sso-page .metric .l{ font-size:13.5px; color:var(--t2); font-weight:500; margin-top:4px; }
.sso-page .metric .d{ font-size:12.5px; color:var(--t3); margin-top:6px; }

.sso-page .persona-card .avatar{ width:40px; height:40px; border-radius:50%; background:var(--blue50); color:var(--blue600); display:flex; align-items:center; justify-content:center; font-weight:600; font-size:14px; margin-bottom:12px; }
.sso-page .persona-card h3{ font-size:16px; font-weight:600; }
.sso-page .persona-card .role{ font-size:12.5px; color:var(--t4); margin-top:2px; font-family:'IBM Plex Mono',monospace; }
.sso-page .persona-card p{ font-size:13.5px; color:var(--t3); margin-top:10px; }

.sso-page table{ width:100%; border-collapse:collapse; font-size:13.5px; margin-top:8px; }
.sso-page th{ text-align:left; background:var(--surface); font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600; text-transform:uppercase; color:var(--t4); padding:10px 14px; letter-spacing:.04em; }
.sso-page td{ padding:13px 14px; border-bottom:1px solid var(--bl); vertical-align:top; }
.sso-page tr:hover td{ background:var(--blue50); }
.sso-page .col-asis{ color:var(--t3); }
.sso-page .col-tobe{ color:var(--t1); font-weight:500; }

.sso-page .badge{ display:inline-flex; align-items:center; font-size:11px; font-weight:500; padding:3px 10px; border-radius:9999px; }
.sso-page .badge.low{ background:var(--green-bg); border:1px solid var(--green-bd); color:var(--green); }
.sso-page .badge.med{ background:var(--yellow-bg); border:1px solid var(--yellow-bd); color:var(--yellow); }
.sso-page .badge.high{ background:var(--red-bg); border:1px solid var(--red-bd); color:var(--red); }
.sso-page .badge.core{ background:var(--blue50); border:1px solid var(--blue100); color:var(--blue600); }

.sso-page .journey-row{ display:flex; align-items:flex-start; gap:0; overflow-x:auto; padding:8px 0 28px; }
.sso-page .jnode{ display:flex; flex-direction:column; align-items:center; width:132px; flex-shrink:0; }
.sso-page .jcircle{ width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:1.5px solid; background:#fff; }
.sso-page .jlabel{ margin-top:10px; font-size:12px; text-align:center; color:var(--t2); font-weight:500; line-height:1.3; }
.sso-page .jarrow{ width:34px; height:1.5px; background:var(--bm); margin-top:27px; flex-shrink:0; }

.sso-page .act-card{ background:#FFFFFF; border:1.5px solid var(--bl); border-radius:16px; padding:18px 20px; box-shadow:var(--shadow-sm); }
.sso-page .act-card .row1{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px; }
.sso-page .act-card h3{ font-size:15px; font-weight:600; }
.sso-page .act-card p{ font-size:13px; color:var(--t3); margin:0; }
.sso-page .act-card .mode{ font-size:11.5px; color:var(--t4); margin-top:10px; font-family:'IBM Plex Mono',monospace; }

.sso-page .note{ background:var(--surface); border-left:3px solid var(--blue400); border-radius:0 14px 14px 0; padding:14px 18px; font-size:13.5px; color:var(--t2); margin-top:20px; }

.sso-page .tally{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:22px; }
.sso-page .tally .pill{ font-size:12.5px; font-weight:500; padding:6px 14px; border-radius:9999px; }
.sso-page .tally .pill.elim{ background:var(--green-bg); border:1px solid var(--green-bd); color:var(--green); }
.sso-page .tally .pill.chg{ background:var(--blue50); border:1px solid var(--blue100); color:var(--blue600); }
.sso-page .tally .pill.same{ background:var(--surface); border:1px solid var(--bl); color:var(--t3); }

.sso-page .task-scroll{ overflow-x:auto; padding-bottom:10px; }
.sso-page .taskgrid{ display:grid; grid-template-columns:88px repeat(12,158px); column-gap:8px; row-gap:8px; min-width:max-content; }
.sso-page .trow-label{ position:sticky; left:0; background:var(--surface); display:flex; align-items:center; font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600; color:var(--t3); z-index:2; padding-left:2px; }
.sso-page .tcell{ border-radius:10px; padding:10px 11px; font-size:12px; min-height:74px; display:flex; flex-direction:column; justify-content:center; }
.sso-page .tcell .lane{ font-family:'IBM Plex Mono',monospace; font-size:9.5px; color:var(--t4); text-transform:uppercase; letter-spacing:.04em; margin-bottom:4px; }
.sso-page .tcell.asis{ background:#FFFFFF; border:1.5px solid var(--bl); color:var(--t2); }
.sso-page .tcell.transformed{ background:#FFFFFF; border:1.5px solid var(--bl); border-left:3px solid var(--blue); color:var(--t2); }
.sso-page .tcell.unchanged{ background:var(--surface); border:1.5px solid var(--bl); color:var(--t3); }
.sso-page .tcell.none{ background:var(--green-bg); border:1.5px dashed var(--green-bd); color:var(--green); align-items:center; text-align:center; }
.sso-page .tcell.none .why{ font-size:10.5px; opacity:.85; margin-top:3px; font-weight:400; }
.sso-page .tcell .tag{ font-family:'IBM Plex Mono',monospace; font-size:9.5px; margin-top:5px; color:var(--blue600); }
.sso-page footer{ padding:32px 0 64px; text-align:center; font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--t4); }
</style>
