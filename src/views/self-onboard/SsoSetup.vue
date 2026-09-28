<template>
  <div class="wz-wrap st">
    <!-- Demo banner -->
    <div v-if="state.demo" class="wz-callout info demo-bar">
      <span>🎭</span>
      <span><b>โหมด demo</b> — โครงการตัวอย่างที่ตั้งค่าครบแล้ว ลองกดดูได้ทุกขั้น ไม่มีผลกับข้อมูลจริง</span>
      <button class="wz-btn sm primary" @click="exitDemo">ออกจาก demo เริ่มตั้งค่าจริง</button>
    </div>

    <!-- Welcome + overall progress -->
    <div class="acc-welcome wz-card">
      <div class="acc-welcome-row">
        <h2>ยินดีต้อนรับ{{ state.general.name ? ` ${state.general.name}` : '' }} มาเริ่มตั้งค่ากันเลย!</h2>
        <div class="acc-welcome-actions">
          <button class="wz-btn sm" @click="emit('intro')">ดูคู่มือการตั้งค่า</button>
          <button class="wz-btn sm ghost danger" @click="onReset">เริ่มใหม่</button>
        </div>
      </div>
      <div class="acc-progress">
        <div class="wz-progress"><div :style="{ width: progressPercent + '%' }"></div></div>
        <div class="acc-progress-label">
          <span>{{ doneCount }}/{{ ALL_ITEMS.length }} เสร็จแล้ว · {{ progressPercent }}%</span>
          <span v-if="savedAt" class="st-saved">✓ บันทึกอัตโนมัติ {{ fmtTimeICT(savedAt) }} น.</span>
          <span v-if="state.live" class="wz-tag ok">ใช้งานจริงแล้ว</span>
        </div>
      </div>
    </div>

    <!-- Checklist accordion -->
    <div v-for="s in SECTIONS" :key="s.key" class="acc-card wz-card">
      <button type="button" class="acc-head" @click="toggleSection(s.key)">
        <svg class="acc-chev" :class="{ open: isOpen(s.key) }" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8l4 4 4-4"/></svg>
        <div class="acc-head-text">
          <b>{{ s.no }}. {{ s.title }}</b>
          <span>{{ s.sub }} · {{ sectionDone(s) }}/{{ s.items.length }} เสร็จแล้ว · ~{{ s.mins }} นาที</span>
        </div>
        <span v-if="sectionDone(s) === s.items.length" class="wz-tag ok">เสร็จแล้ว</span>
      </button>
      <div v-show="isOpen(s.key)" class="acc-body">
        <div v-for="it in s.items" :key="it.key" class="acc-row" :class="{ active: state.current === it.key }">
          <span class="acc-dot" :class="itemStatus(it.key)">
            <svg v-if="isDone(it.key)" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10l3.5 3.5L15 7"/></svg>
          </span>
          <div class="acc-row-text">
            <b>{{ it.title }}</b>
            <span>{{ DESC[it.key] }}</span>
          </div>
          <button type="button" class="wz-btn sm" :class="{ primary: !isDone(it.key) && state.current !== it.key }" @click="go(it.key)">
            {{ state.current === it.key ? 'กำลังแก้ไข' : isDone(it.key) ? 'แก้ไข' : 'เริ่มกรอก' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Final review row -->
    <button type="button" class="acc-card acc-review wz-card" :class="{ active: state.current === 'review' }" @click="go('review')">
      <span class="acc-dot" :class="{ done: state.live }">
        <svg v-if="state.live" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10l3.5 3.5L15 7"/></svg>
      </span>
      <div class="acc-row-text">
        <b>ตรวจสอบ &amp; เริ่มใช้งานจริง</b>
        <span>{{ DESC.review }}</span>
      </div>
      <span v-if="state.live" class="wz-tag ok">ใช้งานจริงแล้ว</span>
    </button>

    <!-- Editor -->
    <main class="st-main" ref="editorEl">
        <div class="st-head">
          <span class="overline">
            {{ curSection ? `ขั้นที่ ${curSection.no} · ${curSection.title}` : 'ขั้นสุดท้าย' }}
          </span>
          <div class="st-head-row">
            <h2>{{ curItem ? curItem.title : 'ตรวจสอบ & เริ่มใช้งานจริง' }}</h2>
            <span v-if="curItem" class="wz-tag" :class="isDone(curItem.key) ? 'ok' : 'warn'">
              {{ isDone(curItem.key) ? '✓ ครบแล้ว' : 'ยังไม่ครบ' }}
            </span>
          </div>
          <p class="wz-muted">{{ DESC[state.current] }}</p>
        </div>

        <!-- ═════════ 1. ข้อมูลทั่วไป ═════════ -->
        <div v-if="state.current === 'project'" class="wz-card">
          <div class="wz-grid">
            <div class="wz-field full">
              <label>ชื่อโครงการ / นิติบุคคล <span class="req">*</span></label>
              <input v-model="state.general.name" class="wz-input" :class="{ invalid: !state.general.name }" />
            </div>
            <div class="wz-field full">
              <span class="wz-label">ประเภทโครงการ</span>
              <div class="wz-choice-row">
                <label class="wz-choice" :class="{ on: state.general.type === 'condo' }">
                  <input v-model="state.general.type" type="radio" value="condo" />
                  <span>🏢 อาคารชุด (คอนโด)<small>นิติบุคคลอาคารชุด</small></span>
                </label>
                <label class="wz-choice" :class="{ on: state.general.type === 'village' }">
                  <input v-model="state.general.type" type="radio" value="village" />
                  <span>🏡 หมู่บ้านจัดสรร<small>นิติบุคคลหมู่บ้านจัดสรร</small></span>
                </label>
              </div>
            </div>
            <div class="wz-field">
              <label>เลขประจำตัวผู้เสียภาษี <span class="req">*</span></label>
              <input v-model="state.general.taxId" class="wz-input" inputmode="numeric" maxlength="13" placeholder="13 หลัก"
                :class="{ invalid: state.general.taxId && !/^\d{13}$/.test(state.general.taxId) }" />
              <span v-if="state.general.taxId && !/^\d{13}$/.test(state.general.taxId)" class="wz-err">ต้องเป็นตัวเลข 13 หลัก</span>
            </div>
            <div class="wz-field">
              <label>ที่อยู่</label>
              <input v-model="state.general.address" class="wz-input" placeholder="ที่อยู่ตามหนังสือจดทะเบียน" />
            </div>
            <div class="wz-field">
              <label>บ้านเลขที่หลัก (prefix) <span class="req">*</span></label>
              <input v-model="state.general.prefix" class="wz-input" placeholder="เช่น 777" />
              <span class="wz-hint">ห้อง/บ้านจะแสดงเป็น {{ state.general.prefix || '777' }}/1, {{ state.general.prefix || '777' }}/2 …</span>
            </div>
            <div class="wz-field">
              <label>จำนวนห้อง/บ้านทั้งหมด <span class="req">*</span></label>
              <input v-model.number="state.general.units" type="number" min="1" class="wz-input num" />
            </div>
          </div>
        </div>

        <div v-else-if="state.current === 'accounting'" class="wz-card">
          <div class="wz-grid">
            <div class="wz-field">
              <label>วันที่เริ่มใช้ระบบ <span class="req">*</span></label>
              <input v-model="state.general.startDate" type="date" class="wz-input" />
              <span v-if="startDateObj" class="wz-hint">{{ fmtDate(startDateObj) }} — ยอดยกมาทั้งหมดจะตั้ง ณ วันนี้</span>
            </div>
            <div class="wz-field">
              <label>เดือนเริ่มรอบบัญชี <span class="req">*</span></label>
              <select v-model.number="state.general.fiscalStartMonth" class="wz-input">
                <option v-for="(m, i) in MONTHS" :key="m" :value="i + 1">{{ m }}</option>
              </select>
              <span class="wz-hint">รอบบัญชี {{ MONTHS[state.general.fiscalStartMonth - 1] }} – {{ MONTHS[(state.general.fiscalStartMonth + 10) % 12] }}</span>
            </div>
          </div>
          <div class="wz-callout info"><span>ℹ️</span><span>ยอดหนี้ค้างชำระเดิมและเงินรับล่วงหน้าจะนำเข้าในขั้น "หนี้เก่า" (release ถัดไป) ซึ่งต้องกระทบยอดกับระบบเดิมก่อน</span></div>
        </div>

        <!-- ═════════ 2. AR ═════════ -->
        <template v-else-if="state.current === 'arOverview'">
          <div class="wz-card">
            <h3>ข้อมูลพื้นฐาน 11 ชุด</h3>
            <p class="wz-muted">ติ๊กชุดที่คุณมีข้อมูลพร้อมแล้ว (ไม่บังคับ แค่ช่วยให้เห็นว่าต้องเตรียมอะไรเพิ่ม)</p>
            <div class="ov-grid">
              <label v-for="(d, i) in BASE_DATASETS" :key="d" class="wz-check ov-item" :class="{ on: state.arOverview.ready[i] }">
                <input v-model="state.arOverview.ready[i]" type="checkbox" />
                <span class="ov-no">{{ i + 1 }}</span>{{ d }}
              </label>
            </div>
            <div class="wz-hint">พร้อมแล้ว {{ state.arOverview.ready.filter(Boolean).length }}/11</div>
          </div>
          <div class="wz-card">
            <h3>ลำดับการกรอกข้อมูล AR</h3>
            <ol class="ov-order">
              <li v-for="it in SECTIONS[1].items.slice(1)" :key="it.key">
                <button class="linklike" @click="go(it.key)">{{ it.title }}</button>
                <span class="wz-muted"> — {{ DESC[it.key] }}</span>
              </li>
            </ol>
            <button class="wz-btn primary" :disabled="state.arOverview.ack" @click="state.arOverview.ack = true; next()">
              {{ state.arOverview.ack ? '✓ รับทราบแล้ว' : 'เข้าใจแล้ว เริ่มกรอก AR →' }}
            </button>
          </div>
        </template>

        <div v-else-if="state.current === 'incomes'" class="wz-card">
          <div class="wz-table-wrap">
            <table class="wz-table">
              <thead><tr><th>รหัส</th><th>ชื่อรายรับ</th><th>วิธีคิด</th><th class="r">อัตรา</th><th>หน่วย</th><th></th></tr></thead>
              <tbody>
                <tr v-for="inc in state.incomes" :key="inc.code">
                  <td class="mono">{{ inc.code }}</td>
                  <td><input v-model="inc.name" class="wz-input" :class="{ invalid: !inc.name }" /></td>
                  <td>
                    <select v-model="inc.rateType" class="wz-input">
                      <option v-for="(t, k) in RATE_TYPES" :key="k" :value="k">{{ t.label }}</option>
                    </select>
                  </td>
                  <td><input v-model.number="inc.rate" type="number" min="0" step="0.01" class="wz-input num" style="width:110px" :class="{ invalid: !(inc.rate > 0) }" /></td>
                  <td class="wz-muted" style="white-space:nowrap">{{ RATE_TYPES[inc.rateType].unit }}</td>
                  <td><button class="wz-btn sm ghost danger" title="ลบ" @click="removeIncome(inc.code)">✕</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row-actions">
            <button class="wz-btn sm" @click="addIncome()">+ เพิ่มรายรับ</button>
            <span class="wz-muted">หรือเพิ่มจากรายการมาตรฐาน:</span>
            <button v-for="p in incomePresetsLeft" :key="p.name" class="chip" @click="addIncome(p)">+ {{ p.name }}</button>
          </div>
          <div class="wz-callout info"><span>🔗</span><span>รหัสรายรับจะถูกผูกกับผังบัญชีในขั้น <b>4 · เซ็ตรายรับ</b> ตอนนี้กรอกแค่ชื่อและอัตราก่อน</span></div>
        </div>

        <template v-else-if="state.current === 'unitRules'">
          <div class="wz-card">
            <span class="wz-label">วิธีกำหนด</span>
            <div class="wz-choice-row" style="margin-top:8px">
              <label class="wz-choice" :class="{ on: state.unitRules.mode === 'rules' }">
                <input v-model="state.unitRules.mode" type="radio" value="rules" />
                <span>กำหนดเป็นช่วงบ้านเลขที่<small>เหมาะกับห้องที่แจ้งหนี้เหมือนกันเป็นกลุ่ม</small></span>
              </label>
              <label class="wz-choice" :class="{ on: state.unitRules.mode === 'import' }">
                <input v-model="state.unitRules.mode" type="radio" value="import" />
                <span>Upload Excel รายหลัง<small>เหมาะกับห้องที่เงื่อนไขต่างกันเยอะ</small></span>
              </label>
            </div>
          </div>

          <div v-if="state.unitRules.mode === 'rules'" class="wz-card">
            <div class="cov">
              <div class="cov-row">
                <b>ครอบคลุม {{ unitCoverage.covered }}/{{ unitCoverage.total }} หลัง</b>
                <span v-if="unitCoverage.missing" class="wz-tag warn">ขาด {{ unitCoverage.missing }} หลัง</span>
                <span v-if="unitCoverage.overlap" class="wz-tag bad">ซ้อนกัน {{ unitCoverage.overlap }} หลัง</span>
                <span v-if="unitCoverage.outOfRange" class="wz-tag bad">เกินจำนวนห้องทั้งหมด</span>
                <span v-if="isDone('unitRules')" class="wz-tag ok">✓ ครบทุกหลัง</span>
              </div>
              <div class="wz-progress"><div :style="{ width: (unitCoverage.total ? unitCoverage.covered / unitCoverage.total * 100 : 0) + '%' }"></div></div>
            </div>

            <div v-for="(r, idx) in state.unitRules.rules" :key="r.id" class="rule">
              <div class="rule-head">
                <b>กลุ่มที่ {{ idx + 1 }}</b>
                <span class="wz-muted">{{ ruleSize(r) }} หลัง</span>
                <button v-if="state.unitRules.rules.length > 1" class="wz-btn sm ghost danger" @click="removeRule(r.id)">ลบกลุ่ม</button>
              </div>
              <div class="rule-range">
                <span>บ้านเลขที่</span>
                <span class="pre">{{ state.general.prefix }}/</span>
                <input v-model.number="r.from" type="number" min="1" class="wz-input num" />
                <span>–</span>
                <span class="pre">{{ state.general.prefix }}/</span>
                <input v-model.number="r.to" type="number" min="1" class="wz-input num" />
              </div>
              <div class="wz-label" style="margin-top:12px">รายรับที่แจ้งหนี้ / มองเห็นในห้องกลุ่มนี้</div>
              <div class="rule-incs">
                <label v-for="inc in state.incomes" :key="inc.code" class="wz-check">
                  <input v-model="r.incomes" type="checkbox" :value="inc.code" />{{ inc.name }}
                </label>
              </div>
              <div class="wz-hint">
                → {{ state.general.prefix }}/{{ r.from }} – {{ state.general.prefix }}/{{ r.to }} แจ้งหนี้เฉพาะ
                {{ r.incomes.length ? r.incomes.map(incomeName).join(' / ') : '(ยังไม่เลือก)' }}
              </div>
            </div>
            <button class="wz-btn sm" @click="addRule">+ เพิ่มกลุ่มห้อง</button>
          </div>

          <div v-else class="wz-card">
            <label class="drop">
              <input type="file" accept=".xlsx,.xls,.csv" hidden @change="onUnitFile" />
              <span class="drop-ic">⬆</span>
              <b>เลือกไฟล์ Excel / CSV</b>
              <span class="wz-muted">คอลัมน์: บ้านเลขที่ · พื้นที่ (ตร.ม.) · รหัสรายรับที่แจ้งหนี้</span>
            </label>
            <div class="row-actions">
              <button class="wz-btn sm" @click="simulateUnitImport('ไฟล์ตัวอย่าง.xlsx')">ลองด้วยไฟล์ตัวอย่าง</button>
              <span class="wz-muted">ยังไม่มีไฟล์? ดาวน์โหลด template ได้จากหน้าภาพรวม</span>
            </div>

            <template v-if="state.unitRules.importResult">
              <div class="imp-sum">
                <div><span class="imp-n">{{ state.unitRules.importResult.total }}</span>แถวทั้งหมด</div>
                <div class="ok"><span class="imp-n">{{ state.unitRules.importResult.ok }}</span>ถูกต้อง</div>
                <div :class="state.unitRules.importResult.errors.length ? 'bad' : 'ok'"><span class="imp-n">{{ state.unitRules.importResult.errors.length }}</span>ต้องแก้</div>
              </div>
              <div class="wz-hint">{{ state.unitRules.importResult.fileName }} · ตรวจเมื่อ {{ state.unitRules.importResult.at }}</div>
              <div v-if="state.unitRules.importResult.errors.length" class="wz-callout bad">
                <span>⚠️</span>
                <div>
                  <b>พบข้อผิดพลาด — ยังไม่นำเข้าจนกว่าจะแก้ครบ</b>
                  <ul class="err-list"><li v-for="e in state.unitRules.importResult.errors" :key="e.row">แถว {{ e.row }}: {{ e.msg }}</li></ul>
                  <button class="wz-btn sm" @click="simulateUnitImport(state.unitRules.importResult.fileName)">แก้ไฟล์แล้ว upload ใหม่</button>
                </div>
              </div>
              <div v-else class="wz-callout ok"><span>✅</span><span>ข้อมูลถูกต้องทั้งหมด พร้อมนำเข้า {{ state.unitRules.importResult.ok }} หลัง</span></div>
            </template>
          </div>
        </template>

        <div v-else-if="state.current === 'billCycle'" class="wz-card">
          <div class="wz-grid">
            <div class="wz-field">
              <label>ออกใบแจ้งหนี้ทุกวันที่ <span class="req">*</span></label>
              <input v-model.number="state.billCycle.issueDay" type="number" min="1" max="28" class="wz-input num"
                :class="{ invalid: !(state.billCycle.issueDay >= 1 && state.billCycle.issueDay <= 28) }" />
              <span class="wz-hint">1–28 เพื่อให้ทุกเดือนมีวันนี้</span>
            </div>
            <div class="wz-field">
              <label>ครบกำหนดชำระหลังออกบิล (วัน) <span class="req">*</span></label>
              <input v-model.number="state.billCycle.dueDays" type="number" min="0" class="wz-input num" />
            </div>
          </div>
          <h3 style="margin-top:20px">รอบถัดไป</h3>
          <div class="wz-table-wrap">
            <table class="wz-table">
              <thead><tr><th>รอบ</th><th>วันที่ออกใบแจ้งหนี้</th><th>วันครบกำหนดชำระ</th></tr></thead>
              <tbody>
                <tr v-for="(c, i) in cycles" :key="i">
                  <td>{{ i + 1 }}</td><td>{{ fmtDate(c.issue) }}</td><td>{{ fmtDate(c.due) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="wz-hint">นับจากวันที่เริ่มใช้ระบบ{{ startDateObj ? ` (${fmtDate(startDateObj)})` : ' (ยังไม่ระบุ — ใช้วันนี้แทน)' }}</div>
        </div>

        <template v-else-if="state.current === 'billSets'">
          <div class="wz-card">
            <p class="wz-muted" style="margin:0 0 12px">แต่ละครั้งที่นิติแจ้งหนี้ เรียกเก็บค่าอะไรบ้าง? สร้างได้หลายชุด เช่น รายเดือน (ค่าน้ำ) + รายปี (ค่าส่วนกลาง)</p>
            <div v-for="b in state.billSets" :key="b.id" class="rule">
              <div class="rule-head">
                <input v-model="b.name" class="wz-input" style="max-width:280px" :class="{ invalid: !b.name }" />
                <select v-model="b.freq" class="wz-input" style="max-width:150px">
                  <option v-for="(f, k) in FREQS" :key="k" :value="k">{{ f.label }}</option>
                </select>
                <button v-if="state.billSets.length > 1" class="wz-btn sm ghost danger" @click="removeBillSet(b.id)">ลบ</button>
              </div>
              <div class="rule-incs">
                <label v-for="inc in state.incomes" :key="inc.code" class="wz-check">
                  <input v-model="b.incomes" type="checkbox" :value="inc.code" />{{ inc.name }}
                </label>
              </div>
            </div>
            <button class="wz-btn sm" @click="addBillSet">+ เพิ่มชุดเรียกเก็บ</button>
            <div v-if="incomesNoSet.length" class="wz-callout warn">
              <span>⚠️</span><span>รายรับที่ยังไม่อยู่ในชุดใด (จะไม่ถูกแจ้งหนี้): <b>{{ incomesNoSet.map(i => i.name).join(', ') }}</b></span>
            </div>
          </div>

          <div class="wz-card">
            <h3>ตัวอย่างใบแจ้งหนี้</h3>
            <p class="wz-muted">ใช้ตรวจว่าชุดเรียกเก็บ + เงื่อนไขห้อง ออกมาถูกต้อง (สมมติพื้นที่ {{ SAMPLE.area }} ตร.ม. ใช้น้ำ {{ SAMPLE.usage }} หน่วย/เดือน)</p>
            <div class="wz-grid" style="margin-top:12px">
              <div class="wz-field">
                <label>ชุดเรียกเก็บ</label>
                <select :value="previewSet?.id" class="wz-input" @change="previewSetId = Number($event.target.value)">
                  <option v-for="b in state.billSets" :key="b.id" :value="b.id">{{ b.name }} ({{ FREQS[b.freq].label }})</option>
                </select>
              </div>
              <div class="wz-field">
                <label>ห้อง/บ้าน</label>
                <div class="rule-range">
                  <span class="pre">{{ state.general.prefix }}/</span>
                  <input v-model.number="previewUnit" type="number" min="1" :max="state.general.units" class="wz-input num" />
                </div>
              </div>
            </div>
            <div v-if="invoice" class="inv">
              <div class="inv-head">
                <div><b>ใบแจ้งหนี้</b> · {{ state.general.prefix }}/{{ previewUnit }}</div>
                <div class="wz-muted">ออก {{ fmtDate(cycles[0].issue) }} · ครบกำหนด {{ fmtDate(cycles[0].due) }}</div>
              </div>
              <table class="wz-table">
                <tbody>
                  <tr v-for="l in invoice.lines" :key="l.code"><td>{{ l.name }}<div class="wz-hint" style="margin:0">{{ l.qty }}</div></td><td class="r mono">{{ fmtTHB(l.amount) }}</td></tr>
                  <tr v-if="!invoice.lines.length"><td colspan="2" class="wz-muted">ไม่มีรายการเรียกเก็บสำหรับห้องนี้</td></tr>
                  <tr class="inv-total"><td>รวม (บาท)</td><td class="r mono">{{ fmtTHB(invoice.total) }}</td></tr>
                </tbody>
              </table>
              <div v-if="invoice.skipped.length" class="wz-hint">ไม่แจ้งหนี้ห้องนี้ (ตามเงื่อนไขห้อง/บ้าน): {{ invoice.skipped.map(i => i.name).join(', ') }}</div>
            </div>
          </div>
        </template>

        <div v-else-if="state.current === 'penalty'" class="wz-card">
          <label class="wz-check" style="margin-bottom:14px"><input v-model="state.penalty.none" type="checkbox" /> <b>ไม่มีค่าปรับ</b></label>
          <template v-if="!state.penalty.none">
            <div class="wz-choice-row">
              <label v-for="(t, k) in PENALTY_TYPES" :key="k" class="wz-choice" :class="{ on: state.penalty.type === k }">
                <input v-model="state.penalty.type" type="radio" :value="k" />
                <span>{{ t.label }}<small>{{ t.desc }}</small></span>
              </label>
            </div>
            <div class="wz-grid three" style="margin-top:16px">
              <div class="wz-field">
                <label>{{ state.penalty.type === 'fixed' ? 'บาท / ใบแจ้งหนี้' : '% ต่อปี' }} <span class="req">*</span></label>
                <input v-model.number="state.penalty.value" type="number" min="0" step="0.01" class="wz-input num" :class="{ invalid: !(state.penalty.value > 0) }" />
              </div>
              <div class="wz-field">
                <label>ผ่อนผัน (วันหลังครบกำหนด)</label>
                <input v-model.number="state.penalty.graceDays" type="number" min="0" class="wz-input num" />
              </div>
              <template v-if="state.penalty.type === 'step'">
                <div class="wz-field">
                  <label>ค้างเกิน (เดือน) → % ต่อปี</label>
                  <div class="rule-range">
                    <input v-model.number="state.penalty.stepAfter" type="number" min="1" class="wz-input num" />
                    <span>→</span>
                    <input v-model.number="state.penalty.stepValue" type="number" min="0" class="wz-input num" />
                  </div>
                </div>
              </template>
            </div>
            <div class="wz-callout info"><span>🧮</span><span>ตัวอย่าง: ค้างชำระ 1,000.00 บาท นาน 30 วัน → ค่าปรับ <b>{{ fmtTHB(penaltyExample) }} บาท</b></span></div>
          </template>
          <div class="wz-callout warn"><span>⚖️</span><span>ตรวจสอบให้ตรงกับข้อบังคับนิติบุคคลของโครงการ — ค่าปรับที่ไม่เป็นไปตามข้อบังคับอาจเรียกเก็บไม่ได้</span></div>
        </div>

        <div v-else-if="state.current === 'billPayment'" class="wz-card">
          <span class="wz-label">โครงการมี Bill Payment หรือไม่?</span>
          <div class="wz-choice-row" style="margin-top:8px">
            <label class="wz-choice" :class="{ on: state.billPayment.has === true }">
              <input v-model="state.billPayment.has" type="radio" :value="true" />
              <span>มี<small>ลูกบ้านจ่ายผ่าน QR / ธนาคาร แล้วระบบตัดหนี้ให้อัตโนมัติ</small></span>
            </label>
            <label class="wz-choice" :class="{ on: state.billPayment.has === false }">
              <input v-model="state.billPayment.has" type="radio" :value="false" />
              <span>ไม่มี<small>รับชำระเงินสด / โอน แล้วบันทึกเอง</small></span>
            </label>
          </div>
          <div v-if="state.billPayment.has" class="wz-grid" style="margin-top:16px">
            <div class="wz-field">
              <label>ธนาคาร <span class="req">*</span></label>
              <select v-model="state.billPayment.bank" class="wz-input" :class="{ invalid: !state.billPayment.bank }">
                <option value="" disabled>— เลือกธนาคาร —</option>
                <option v-for="b in BANKS" :key="b" :value="b">{{ b }}</option>
              </select>
            </div>
            <div class="wz-field">
              <label>Biller ID <span class="req">*</span></label>
              <input v-model="state.billPayment.billerId" class="wz-input" inputmode="numeric" maxlength="15" placeholder="15 หลัก"
                :class="{ invalid: state.billPayment.billerId && !/^\d{15}$/.test(state.billPayment.billerId) }" />
              <span class="wz-hint">
                ปกติคือเลขผู้เสียภาษี 13 หลัก + suffix 2 หลัก
                <button v-if="/^\d{13}$/.test(state.general.taxId)" class="linklike" @click="state.billPayment.billerId = state.general.taxId + '00'">ใช้เลขผู้เสียภาษี + 00</button>
              </span>
            </div>
            <div class="wz-callout info full"><span>🧾</span><span>Ref.1 = บ้านเลขที่ (เช่น {{ state.general.prefix }}/1) · Ref.2 = เลขที่ใบแจ้งหนี้ ระบบจะพิมพ์ QR ลงบนใบแจ้งหนี้ให้อัตโนมัติ</span></div>
          </div>
        </div>

        <!-- ═════════ 3. GL ═════════ -->
        <div v-else-if="state.current === 'glOverview'" class="wz-card">
          <h3>ลำดับการกรอกข้อมูล GL</h3>
          <ol class="ov-order">
            <li v-for="it in SECTIONS[2].items.slice(1)" :key="it.key">
              <button class="linklike" @click="go(it.key)">{{ it.title }}</button>
              <span class="wz-muted"> — {{ DESC[it.key] }}</span>
            </li>
          </ol>
          <button class="wz-btn primary" :disabled="state.glOverview.ack" @click="state.glOverview.ack = true; next()">
            {{ state.glOverview.ack ? '✓ รับทราบแล้ว' : 'เข้าใจแล้ว เริ่มกรอก GL →' }}
          </button>
        </div>

        <div v-else-if="state.current === 'expenses'" class="wz-card">
          <div class="wz-table-wrap">
            <table class="wz-table">
              <thead><tr><th>รหัส</th><th>ชื่อรายจ่าย</th><th></th></tr></thead>
              <tbody>
                <tr v-for="e in state.expenses" :key="e.code">
                  <td class="mono">{{ e.code }}</td>
                  <td><input v-model="e.name" class="wz-input" :class="{ invalid: !e.name }" /></td>
                  <td><button class="wz-btn sm ghost danger" title="ลบ" @click="removeExpense(e.code)">✕</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row-actions">
            <button class="wz-btn sm" @click="addExpense()">+ เพิ่มรายจ่าย</button>
            <span class="wz-muted">หรือเพิ่มจากรายการมาตรฐาน:</span>
            <button v-for="p in expensePresetsLeft" :key="p" class="chip" @click="addExpense(p)">+ {{ p }}</button>
          </div>
        </div>

        <div v-else-if="state.current === 'policy'" class="wz-card">
          <div class="pol">
            <span class="wz-label">เกณฑ์การบันทึกบัญชี</span>
            <div class="wz-choice-row">
              <label class="wz-choice" :class="{ on: state.policy.basis === 'accrual' }">
                <input v-model="state.policy.basis" type="radio" value="accrual" />
                <span>เกณฑ์คงค้าง (แนะนำ)<small>รับรู้รายได้/ค่าใช้จ่ายเมื่อเกิดขึ้น</small></span>
              </label>
              <label class="wz-choice" :class="{ on: state.policy.basis === 'cash' }">
                <input v-model="state.policy.basis" type="radio" value="cash" />
                <span>เกณฑ์เงินสด<small>รับรู้เมื่อรับ/จ่ายเงินจริง</small></span>
              </label>
            </div>
          </div>
          <div class="pol">
            <span class="wz-label">รับรู้รายได้เมื่อ</span>
            <div class="wz-choice-row">
              <label class="wz-choice" :class="{ on: state.policy.revenue === 'invoice' }">
                <input v-model="state.policy.revenue" type="radio" value="invoice" :disabled="state.policy.basis === 'cash'" />
                <span>ออกใบแจ้งหนี้<small>บันทึกลูกหนี้ ณ วันแจ้งหนี้</small></span>
              </label>
              <label class="wz-choice" :class="{ on: state.policy.revenue === 'receipt' }">
                <input v-model="state.policy.revenue" type="radio" value="receipt" />
                <span>รับชำระเงิน<small>บันทึกรายได้ ณ วันออกใบเสร็จ</small></span>
              </label>
            </div>
          </div>
          <div class="pol">
            <span class="wz-label">เงินที่ลูกบ้านจ่ายเกิน / จ่ายล่วงหน้า</span>
            <div class="wz-choice-row">
              <label class="wz-choice" :class="{ on: state.policy.advance === 'liability' }">
                <input v-model="state.policy.advance" type="radio" value="liability" />
                <span>บันทึกเป็นเงินรับล่วงหน้า<small>ตัดชำระบิลถัดไปอัตโนมัติ</small></span>
              </label>
              <label class="wz-choice" :class="{ on: state.policy.advance === 'income' }">
                <input v-model="state.policy.advance" type="radio" value="income" />
                <span>บันทึกเป็นรายได้อื่น<small>ไม่ยกไปบิลถัดไป</small></span>
              </label>
            </div>
          </div>
          <label class="wz-check pol"><input v-model="state.policy.wht" type="checkbox" />คำนวณภาษีหัก ณ ที่จ่ายอัตโนมัติเมื่อจ่ายเจ้าหนี้</label>

          <div class="je">
            <div class="wz-label">ตัวอย่างการบันทึกบัญชี เมื่อ{{ state.policy.revenue === 'invoice' ? 'ออกใบแจ้งหนี้' : 'รับชำระ' }}ค่าส่วนกลาง</div>
            <table class="wz-table">
              <thead><tr><th>บัญชี</th><th class="r">เดบิต</th><th class="r">เครดิต</th></tr></thead>
              <tbody>
                <tr><td>{{ state.policy.revenue === 'invoice' ? 'ลูกหนี้ค่าส่วนกลาง' : 'เงินฝากธนาคาร' }}</td><td class="r">✓</td><td></td></tr>
                <tr><td>รายได้ค่าส่วนกลาง</td><td></td><td class="r">✓</td></tr>
              </tbody>
            </table>
          </div>

          <div class="wz-callout warn">
            <span>🔒</span>
            <label class="wz-check"><input v-model="state.policy.confirmed" type="checkbox" />ฉันตรวจสอบนโยบายบันทึกบัญชีแล้ว (เปลี่ยนภายหลังจะกระทบรายงานย้อนหลัง)</label>
          </div>
        </div>

        <!-- ═════════ 4. AP ═════════ -->
        <div v-else-if="state.current === 'apOverview'" class="wz-card">
          <h3>ลำดับการกรอกข้อมูล AP</h3>
          <ol class="ov-order">
            <li v-for="it in SECTIONS[3].items.slice(1)" :key="it.key">
              <button class="linklike" @click="go(it.key)">{{ it.title }}</button>
              <span class="wz-muted"> — {{ DESC[it.key] }}</span>
            </li>
          </ol>
          <div class="wz-callout info"><span>🔗</span><span>ขั้นนี้จะนำรายรับจากขั้น AR ({{ state.incomes.length }} รายการ) และรายจ่ายจากขั้น GL ({{ state.expenses.length }} รายการ) มาผูกกับผังบัญชี</span></div>
          <button class="wz-btn primary" style="margin-top:14px" :disabled="state.apOverview.ack" @click="state.apOverview.ack = true; next()">
            {{ state.apOverview.ack ? '✓ รับทราบแล้ว' : 'เข้าใจแล้ว เริ่มกรอก AP →' }}
          </button>
        </div>

        <template v-else-if="state.current === 'coa'">
          <div v-if="!state.coa.accounts.length" class="wz-card">
            <h3>เริ่มจาก…</h3>
            <div class="wz-choice-row" style="margin-top:12px">
              <button class="wz-choice src" @click="usePresetCoa">
                <span>⭐ ผังบัญชีมาตรฐานนิติบุคคล<small>{{ PRESET_COA.length }} บัญชี พร้อมใช้ ปรับแก้ได้ (แนะนำ)</small></span>
              </button>
              <label class="wz-choice src">
                <input type="file" accept=".xlsx,.xls,.csv" hidden @change="onCoaFile" />
                <span>⬆ นำเข้าจากระบบเดิม<small>Excel / CSV: รหัสบัญชี · ชื่อบัญชี · ประเภท</small></span>
              </label>
            </div>
          </div>
          <div v-else class="wz-card">
            <div class="coa-bar">
              <div class="tabs">
                <button v-for="(t, k) in COA_FILTERS" :key="k" class="tab" :class="{ on: coaFilter === k }" @click="coaFilter = k">{{ t }}</button>
              </div>
              <span class="wz-muted">{{ state.coa.accounts.length }} บัญชี · {{ state.coa.source === 'import' ? 'นำเข้าจากไฟล์' : 'ผังมาตรฐาน' }}</span>
            </div>
            <div v-if="state.coa.importResult" class="wz-callout warn">
              <span>⚠️</span><span>นำเข้า {{ state.coa.importResult.fileName }}: {{ state.coa.importResult.warning }}</span>
            </div>
            <div class="wz-table-wrap">
              <table class="wz-table">
                <thead><tr><th>ใช้บ่อย</th><th>รหัสบัญชี</th><th>ชื่อบัญชี</th><th>ประเภท</th><th></th></tr></thead>
                <tbody>
                  <tr v-for="a in filteredCoa" :key="a._k">
                    <td><button class="star" :class="{ on: state.favorites.includes(a.code) }" @click="toggleFav(a.code)">★</button></td>
                    <td><input v-model="a.code" class="wz-input mono" style="width:110px" :class="{ invalid: dupCodes.has(a.code) }" /></td>
                    <td><input v-model="a.name" class="wz-input" /></td>
                    <td>
                      <select v-model="a.type" class="wz-input">
                        <option v-for="(t, k) in ACCOUNT_TYPES" :key="k" :value="k">{{ t }}</option>
                      </select>
                    </td>
                    <td><button class="wz-btn sm ghost danger" @click="removeAccount(a)">✕</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="dupCodes.size" class="wz-err" style="margin-top:8px">รหัสบัญชีซ้ำ: {{ [...dupCodes].join(', ') }}</div>
            <div class="row-actions">
              <button class="wz-btn sm" @click="addAccount">+ เพิ่มบัญชี</button>
              <button class="wz-btn sm ghost danger" @click="clearCoa">เปลี่ยนแหล่งผังบัญชี</button>
            </div>
          </div>
        </template>

        <template v-else-if="state.current === 'incomeMap' || state.current === 'expenseMap' || state.current === 'favorites'">
          <div v-if="!state.coa.accounts.length" class="wz-card">
            <div class="wz-callout warn" style="margin-top:0"><span>⚠️</span><span>ยังไม่มีผังบัญชี — ตั้งผังบัญชีก่อนจึงจะผูกบัญชีได้</span></div>
            <button class="wz-btn primary" style="margin-top:14px" @click="go('coa')">ไปตั้งผังบัญชี →</button>
          </div>

          <div v-else-if="state.current === 'incomeMap'" class="wz-card">
            <div class="map-bar">
              <span class="wz-muted">ผูกแล้ว {{ state.incomes.length - unmappedIncomes.length }}/{{ state.incomes.length }}</span>
              <button class="wz-btn sm" @click="autoMapIncomes">✨ แนะนำการผูกอัตโนมัติ</button>
            </div>
            <div class="map-head"><span>รายรับ</span><span>บัญชีรายได้</span><span>บัญชีลูกหนี้</span></div>
            <div v-for="inc in state.incomes" :key="inc.code" class="map-row">
              <div><span class="mono wz-muted">{{ inc.code }}</span> {{ inc.name }}</div>
              <SsoAccountPicker :model-value="state.incomeMap[inc.code]?.rev || ''" prefix="4" @update:model-value="v => setIncomeMap(inc.code, 'rev', v)" />
              <SsoAccountPicker :model-value="state.incomeMap[inc.code]?.ar || ''" prefix="11" @update:model-value="v => setIncomeMap(inc.code, 'ar', v)" />
            </div>
          </div>

          <div v-else-if="state.current === 'expenseMap'" class="wz-card">
            <div class="wz-field" style="max-width:360px">
              <label>บัญชีเจ้าหนี้เริ่มต้น <span class="req">*</span></label>
              <SsoAccountPicker v-model="state.expenseMap.apAccount" prefix="2" />
            </div>
            <div class="map-bar" style="margin-top:18px">
              <span class="wz-muted">ผูกแล้ว {{ state.expenses.length - unmappedExpenses.length }}/{{ state.expenses.length }}</span>
              <button class="wz-btn sm" @click="autoMapExpenses">✨ แนะนำการผูกอัตโนมัติ</button>
            </div>
            <div class="map-head two"><span>รายจ่าย</span><span>บัญชีค่าใช้จ่าย</span></div>
            <div v-for="e in state.expenses" :key="e.code" class="map-row two">
              <div><span class="mono wz-muted">{{ e.code }}</span> {{ e.name }}</div>
              <SsoAccountPicker v-model="state.expenseMap.map[e.code]" prefix="5" />
            </div>
          </div>

          <div v-else class="wz-card">
            <div class="map-bar">
              <span class="wz-muted">เลือกแล้ว {{ state.favorites.length }} บัญชี — จะแสดงเป็นอันดับแรกทุกครั้งที่เลือกบัญชี</span>
              <button class="wz-btn sm" @click="suggestFavorites">✨ ใช้ชุดแนะนำ</button>
            </div>
            <div class="fav-grid">
              <button v-for="a in state.coa.accounts" :key="a._k" class="fav" :class="{ on: state.favorites.includes(a.code) }" @click="toggleFav(a.code)">
                <span class="star" :class="{ on: state.favorites.includes(a.code) }">★</span>
                <span class="mono wz-muted">{{ a.code }}</span> {{ a.name }}
              </button>
            </div>
          </div>
        </template>

        <!-- ═════════ Review ═════════ -->
        <template v-else-if="state.current === 'review'">
          <div v-if="state.live" class="wz-card live">
            <div class="live-ic">🎉</div>
            <h3>{{ state.general.name }} พร้อมใช้งานแล้ว!</h3>
            <p class="wz-muted">ใบแจ้งหนี้รอบแรกจะออกวันที่ <b>{{ fmtDate(cycles[0].issue) }}</b> ครบกำหนดชำระ {{ fmtDate(cycles[0].due) }}</p>
          </div>

          <div class="rv-grid">
            <div v-for="s in SECTIONS" :key="s.key" class="wz-card rv">
              <div class="rv-head">
                <b>{{ s.no }}. {{ s.title }}</b>
                <span class="wz-tag" :class="sectionDone(s) === s.items.length ? 'ok' : 'warn'">{{ sectionDone(s) }}/{{ s.items.length }}</span>
              </div>
              <ul class="rv-list">
                <li v-for="it in s.items.filter(i => !isDone(i.key))" :key="it.key">
                  <span>○ {{ it.title }}</span>
                  <button class="linklike" @click="go(it.key)">ไปแก้ →</button>
                </li>
                <li v-if="sectionDone(s) === s.items.length" class="ok">✓ ครบทุกรายการ</li>
              </ul>
            </div>
          </div>

          <div class="wz-card">
            <h3>สรุปการตั้งค่า</h3>
            <dl class="rv-sum">
              <dt>โครงการ</dt><dd>{{ state.general.name }} · {{ state.general.type === 'condo' ? 'อาคารชุด' : 'หมู่บ้านจัดสรร' }} · {{ state.general.units }} หลัง</dd>
              <dt>เริ่มใช้ระบบ</dt><dd>{{ startDateObj ? fmtDate(startDateObj) : '—' }}</dd>
              <dt>รายรับ</dt><dd>{{ state.incomes.map(i => i.name).join(', ') }}</dd>
              <dt>ชุดเรียกเก็บ</dt><dd>{{ state.billSets.map(b => `${b.name} (${FREQS[b.freq].label})`).join(', ') }}</dd>
              <dt>รอบแจ้งหนี้</dt><dd>ทุกวันที่ {{ state.billCycle.issueDay }} · ครบกำหนด {{ state.billCycle.dueDays }} วัน</dd>
              <dt>ค่าปรับ</dt><dd>{{ penaltySummary }}</dd>
              <dt>Bill Payment</dt><dd>{{ state.billPayment.has === true ? state.billPayment.bank || 'มี' : state.billPayment.has === false ? 'ไม่มี' : '—' }}</dd>
              <dt>ผังบัญชี</dt><dd>{{ state.coa.accounts.length }} บัญชี · ใช้บ่อย {{ state.favorites.length }}</dd>
            </dl>
            <div v-if="unmappedIncomes.length" class="wz-callout bad"><span>⚠️</span><span>รายรับยังไม่ผูกบัญชี: <b>{{ unmappedIncomes.map(i => i.name).join(', ') }}</b> <button class="linklike" @click="go('incomeMap')">ไปผูก →</button></span></div>
            <div v-if="unmappedExpenses.length" class="wz-callout bad"><span>⚠️</span><span>รายจ่ายยังไม่ผูกบัญชี: <b>{{ unmappedExpenses.map(e => e.name).join(', ') }}</b> <button class="linklike" @click="go('expenseMap')">ไปผูก →</button></span></div>
            <div v-if="incomesNoSet.length" class="wz-callout warn"><span>⚠️</span><span>รายรับที่ไม่อยู่ในชุดเรียกเก็บใด: <b>{{ incomesNoSet.map(i => i.name).join(', ') }}</b> <button class="linklike" @click="go('billSets')">ไปแก้ →</button></span></div>
          </div>

          <div v-if="!state.live" class="wz-card golive">
            <label class="wz-check"><input v-model="goLiveConfirm" type="checkbox" :disabled="!allDone" />ฉันตรวจสอบข้อมูลทั้งหมดแล้ว และต้องการเริ่มใช้งานจริง</label>
            <button class="wz-btn primary lg" :disabled="!allDone || !goLiveConfirm" @click="goLive">🚀 เริ่มใช้งานจริง</button>
            <div v-if="!allDone" class="wz-hint">ยังเหลือ {{ ALL_ITEMS.length - doneCount }} รายการที่ต้องทำให้ครบก่อน</div>
          </div>
        </template>

        <!-- Footer nav -->
        <div class="st-foot">
          <button class="wz-btn" :disabled="curIdx === 0" @click="prev">← ย้อนกลับ</button>
          <button class="wz-btn ghost" @click="toastMsg('บันทึกร่างแล้ว')">บันทึกร่าง</button>
          <button v-if="curIdx < ORDER.length - 1" class="wz-btn primary" @click="next">
            {{ curItem && !isDone(curItem.key) ? 'ข้ามไปก่อน →' : 'ถัดไป →' }}
          </button>
        </div>
      </main>

    <transition name="wz-toast-fade">
      <div v-if="toast" class="wz-toast">{{ toast }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import SsoAccountPicker from './SsoAccountPicker.vue'
import {
  SECTIONS, ALL_ITEMS, BASE_DATASETS, RATE_TYPES, FREQS, BANKS, PRESET_COA, ACCOUNT_TYPES,
  state, savedAt, resetState, isDone, itemStatus, doneCount, progressPercent, sectionDone,
  unitCoverage, ruleSize, incomesForUnit, suggestAccount, withKey, fmtTHB, fmtDate, fmtTimeICT,
} from './store.js'

const emit = defineEmits(['intro', 'live'])

const MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

const DESC = {
  project: 'ข้อมูลพื้นฐานของนิติบุคคล ใช้พิมพ์บนใบแจ้งหนี้และใบเสร็จ',
  accounting: 'กำหนดวันเริ่มใช้ระบบและรอบปีบัญชี',
  arOverview: 'ภาพรวมข้อมูลที่ต้องเตรียม และลำดับการกรอกข้อมูลลูกหนี้',
  incomes: 'รายรับที่นิติเรียกเก็บจากลูกบ้าน พร้อมวิธีคิดและอัตรา',
  unitRules: 'ห้อง/บ้านไหนถูกแจ้งหนี้ค่าอะไรบ้าง และมองเห็นรายรับอะไร',
  billCycle: 'วันที่ออกใบแจ้งหนี้และระยะเวลาครบกำหนดชำระ',
  billSets: 'จัดกลุ่มรายรับที่เรียกเก็บพร้อมกันในแต่ละรอบ (รายเดือน/รายไตรมาส/รายปี)',
  penalty: 'อัตราค่าปรับเมื่อชำระล่าช้า — หากไม่มีโปรดระบุ "ไม่มี"',
  billPayment: 'ช่องทางรับชำระผ่านธนาคารที่ตัดหนี้อัตโนมัติ',
  glOverview: 'ลำดับการกรอกข้อมูลบัญชีแยกประเภท',
  expenses: 'รายจ่ายประจำของนิติบุคคล',
  policy: 'นโยบายที่กำหนดว่าระบบจะบันทึกบัญชีอัตโนมัติอย่างไร',
  apOverview: 'ลำดับการตั้งผังบัญชีและผูกรายรับ/รายจ่ายเข้ากับบัญชี',
  coa: 'ผังบัญชีของนิติบุคคล — เริ่มจากผังมาตรฐานหรือนำเข้าจากระบบเดิม',
  incomeMap: 'ผูกรายรับแต่ละรายการกับบัญชีรายได้และบัญชีลูกหนี้',
  expenseMap: 'ผูกรายจ่ายแต่ละรายการกับบัญชีค่าใช้จ่าย',
  favorites: 'ปักหมุดบัญชีที่ใช้บ่อยเพื่อเลือกได้เร็วขึ้น',
  review: 'ตรวจสอบสิ่งที่ยังขาดก่อนเริ่มใช้งานจริง ข้อมูลยังแก้ไขได้ทั้งหมดจนกว่าจะกดยืนยัน',
}

const PENALTY_TYPES = {
  percent: { label: '% ต่อปี', desc: 'คิดตามจำนวนวันที่ค้างชำระ' },
  fixed: { label: 'จำนวนคงที่', desc: 'บาทต่อใบแจ้งหนี้ที่ค้าง' },
  step: { label: 'ขั้นบันได', desc: 'อัตราเพิ่มขึ้นเมื่อค้างนานเกินกำหนด' },
}

const INCOME_PRESETS = [
  { name: 'เงินกองทุน', rateType: 'area', rate: 0 },
  { name: 'ค่าเก็บขยะ', rateType: 'fixed', rate: 0 },
  { name: 'ค่าบัตรผ่านเข้า-ออก', rateType: 'fixed', rate: 0 },
  { name: 'ค่าเช่าพื้นที่ส่วนกลาง', rateType: 'fixed', rate: 0 },
]
const EXPENSE_PRESETS = ['ค่าน้ำประปาส่วนกลาง', 'ค่าบริหารจัดการ', 'ค่าเบี้ยประกันภัยอาคาร', 'ค่าสอบบัญชี']
const COA_FILTERS = { all: 'ทั้งหมด', ...ACCOUNT_TYPES }
const SAMPLE = { area: 60, usage: 12 }

// ── Navigation ──────────────────────────────────────────────────
const ORDER = [...ALL_ITEMS.map(i => i.key), 'review']
const curIdx = computed(() => ORDER.indexOf(state.current))
const curItem = computed(() => ALL_ITEMS.find(i => i.key === state.current))
const curSection = computed(() => SECTIONS.find(s => s.key === curItem.value?.section))

if (!state.visited.includes(state.current)) state.visited.push(state.current)

// Accordion open/closed state, keyed by section — the section holding the
// current item starts open, the rest start collapsed (matches the checklist reference)
const editorEl = ref(null)
const openSections = reactive({})
function sectionKeyOf(itemKey) { return ALL_ITEMS.find(i => i.key === itemKey)?.section }
function ensureOpen(key) { if (key) openSections[key] = true }
function toggleSection(key) { openSections[key] = !openSections[key] }
function isOpen(key) { return !!openSections[key] }
ensureOpen(sectionKeyOf(state.current))

function go(key) {
  state.current = key
  if (!state.visited.includes(key)) state.visited.push(key)
  ensureOpen(sectionKeyOf(key))
  nextTick(() => editorEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}
function next() { if (curIdx.value < ORDER.length - 1) go(ORDER[curIdx.value + 1]) }
function prev() { if (curIdx.value > 0) go(ORDER[curIdx.value - 1]) }

function exitDemo() {
  resetState()
  state.started = true
  go('project')
  toastMsg('เริ่มตั้งค่าโครงการจริงแล้ว')
}

function onReset() {
  if (confirm('ล้างข้อมูลที่กรอกไว้ทั้งหมด แล้วเริ่มใหม่?')) {
    resetState()
    emit('intro')
  }
}

// ── Toast ───────────────────────────────────────────────────────
const toast = ref('')
let toastTimer = null
function toastMsg(msg) {
  toast.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 2200)
}

// ── Dates ───────────────────────────────────────────────────────
function parseDate(s) {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const startDateObj = computed(() => parseDate(state.general.startDate))

const cycles = computed(() => {
  const base = startDateObj.value || new Date()
  const day = Math.min(Math.max(Number(state.billCycle.issueDay) || 1, 1), 28)
  let first = new Date(base.getFullYear(), base.getMonth(), day)
  if (first < new Date(base.getFullYear(), base.getMonth(), base.getDate())) first = new Date(base.getFullYear(), base.getMonth() + 1, day)
  return [0, 1, 2].map(i => {
    const issue = new Date(first.getFullYear(), first.getMonth() + i, day)
    const due = new Date(issue)
    due.setDate(due.getDate() + (Number(state.billCycle.dueDays) || 0))
    return { issue, due }
  })
})

// ── Incomes ─────────────────────────────────────────────────────
function nextCode(list, p) {
  const n = list.reduce((m, x) => Math.max(m, parseInt(x.code.slice(1)) || 0), 0) + 1
  return p + String(n).padStart(2, '0')
}
function incomeName(code) { return state.incomes.find(i => i.code === code)?.name || code }

const incomePresetsLeft = computed(() => INCOME_PRESETS.filter(p => !state.incomes.some(i => i.name === p.name)))

function addIncome(preset) {
  state.incomes.push({ code: nextCode(state.incomes, 'R'), name: preset?.name || '', rateType: preset?.rateType || 'fixed', rate: preset?.rate || 0 })
}
function removeIncome(code) {
  state.incomes = state.incomes.filter(i => i.code !== code)
  state.unitRules.rules.forEach(r => { r.incomes = r.incomes.filter(c => c !== code) })
  state.billSets.forEach(b => { b.incomes = b.incomes.filter(c => c !== code) })
  delete state.incomeMap[code]
}

// ── Unit rules ──────────────────────────────────────────────────
function addRule() {
  const rules = state.unitRules.rules
  const last = rules[rules.length - 1]
  const from = last ? Number(last.to) + 1 : 1
  rules.push({ id: Date.now(), from, to: Math.max(from, Number(state.general.units) || from), incomes: [] })
}
function removeRule(id) { state.unitRules.rules = state.unitRules.rules.filter(r => r.id !== id) }

function simulateUnitImport(fileName) {
  const total = Number(state.general.units) || 0
  const p = state.general.prefix
  const hadErrors = state.unitRules.importResult?.errors.length > 0
  // First upload surfaces sample errors; re-upload after "fixing" comes back clean
  const errors = hadErrors ? [] : [
    { row: 58, msg: `บ้านเลขที่ ${p}/57 ซ้ำกับแถว 57` },
    { row: 311, msg: 'ไม่พบรหัสรายรับ R09 — เพิ่มในขั้น "รายการและราคารายรับ" หรือแก้ไฟล์' },
    { row: 402, msg: 'พื้นที่ (ตร.ม.) ว่าง' },
  ]
  state.unitRules.importResult = { fileName, total, ok: total - errors.length, errors, at: fmtDate(new Date()) }
}
function onUnitFile(e) {
  const f = e.target.files[0]
  if (f) simulateUnitImport(f.name)
  e.target.value = ''
}

// ── Bill sets + invoice preview ─────────────────────────────────
function addBillSet() {
  state.billSets.push({ id: Date.now(), name: `ชุดเรียกเก็บ ${state.billSets.length + 1}`, freq: 'yearly', incomes: [] })
}
function removeBillSet(id) { state.billSets = state.billSets.filter(b => b.id !== id) }

const incomesNoSet = computed(() => state.incomes.filter(i => !state.billSets.some(b => b.incomes.includes(i.code))))

const previewSetId = ref(null)
const previewUnit = ref(1)
const previewSet = computed(() => state.billSets.find(b => b.id === previewSetId.value) || state.billSets[0])

const invoice = computed(() => {
  const set = previewSet.value
  if (!set) return null
  const months = FREQS[set.freq].months
  const allowed = state.unitRules.mode === 'rules' ? incomesForUnit(Number(previewUnit.value)) : set.incomes
  const lines = []
  const skipped = []
  for (const code of set.incomes) {
    const inc = state.incomes.find(i => i.code === code)
    if (!inc) continue
    if (!allowed.includes(code)) { skipped.push(inc); continue }
    const rate = Number(inc.rate) || 0
    let qty, amount
    if (inc.rateType === 'area') { qty = `${SAMPLE.area} ตร.ม. × ${fmtTHB(rate)} × ${months} เดือน`; amount = rate * SAMPLE.area * months }
    else if (inc.rateType === 'meter') { qty = `${SAMPLE.usage * months} หน่วย × ${fmtTHB(rate)}`; amount = rate * SAMPLE.usage * months }
    else { qty = `${fmtTHB(rate)} × ${months} เดือน`; amount = rate * months }
    lines.push({ code, name: inc.name, qty, amount })
  }
  return { lines, skipped, total: lines.reduce((n, l) => n + l.amount, 0) }
})

// ── Penalty ─────────────────────────────────────────────────────
const penaltyExample = computed(() => {
  const p = state.penalty
  const days = Math.max(30 - (Number(p.graceDays) || 0), 0)
  if (p.type === 'fixed') return days > 0 ? Number(p.value) || 0 : 0
  return 1000 * (Number(p.value) || 0) / 100 * days / 365
})
const penaltySummary = computed(() => {
  const p = state.penalty
  if (p.none) return 'ไม่มี'
  if (p.type === 'fixed') return `${fmtTHB(p.value)} บาท/ใบแจ้งหนี้`
  if (p.type === 'step') return `${p.value}% ต่อปี → ${p.stepValue}% เมื่อค้างเกิน ${p.stepAfter} เดือน`
  return `${p.value}% ต่อปี`
})

// ── Expenses ────────────────────────────────────────────────────
const expensePresetsLeft = computed(() => EXPENSE_PRESETS.filter(n => !state.expenses.some(e => e.name === n)))
function addExpense(name = '') { state.expenses.push({ code: nextCode(state.expenses, 'E'), name }) }
function removeExpense(code) {
  state.expenses = state.expenses.filter(e => e.code !== code)
  delete state.expenseMap.map[code]
}

// ── Chart of accounts ───────────────────────────────────────────

function usePresetCoa() {
  state.coa.accounts = PRESET_COA.map(withKey)
  state.coa.source = 'preset'
  state.coa.importResult = null
  toastMsg(`ใช้ผังบัญชีมาตรฐาน ${PRESET_COA.length} บัญชี`)
}
function onCoaFile(e) {
  const f = e.target.files[0]
  e.target.value = ''
  if (!f) return
  state.coa.accounts = [
    ...PRESET_COA,
    { code: '1114-00', name: 'เงินฝากธนาคาร - ฝากประจำ', type: 'asset' },
    { code: '5107-00', name: 'ค่าจ้างพนักงานนิติ', type: 'expense' },
  ].map(withKey)
  state.coa.source = 'import'
  state.coa.importResult = { fileName: f.name, warning: '2 บัญชีไม่ระบุประเภท ระบบตั้งเป็น "ค่าใช้จ่าย" ให้ — โปรดตรวจสอบ' }
}
function clearCoa() {
  if (!confirm('ล้างผังบัญชีปัจจุบัน แล้วเลือกแหล่งใหม่?')) return
  state.coa.accounts = []
  state.coa.source = null
  state.coa.importResult = null
}
function addAccount() {
  state.coa.accounts.push(withKey({ code: '', name: '', type: coaFilter.value === 'all' ? 'expense' : coaFilter.value }))
}
function removeAccount(a) {
  state.coa.accounts = state.coa.accounts.filter(x => x !== a)
  state.favorites = state.favorites.filter(c => c !== a.code)
}

const coaFilter = ref('all')
const filteredCoa = computed(() => state.coa.accounts.filter(a => coaFilter.value === 'all' || a.type === coaFilter.value))
const dupCodes = computed(() => {
  const seen = new Set(), dup = new Set()
  state.coa.accounts.forEach(a => { if (seen.has(a.code)) dup.add(a.code); seen.add(a.code) })
  return dup
})

// ── Mapping ─────────────────────────────────────────────────────
function setIncomeMap(code, field, v) {
  state.incomeMap[code] = { ...(state.incomeMap[code] || {}), [field]: v }
}
const unmappedIncomes = computed(() => state.incomes.filter(i => !(state.incomeMap[i.code]?.rev && state.incomeMap[i.code]?.ar)))
const unmappedExpenses = computed(() => state.expenses.filter(e => !state.expenseMap.map[e.code]))

function autoMapIncomes() {
  let n = 0
  state.incomes.forEach(i => {
    const cur = state.incomeMap[i.code] || {}
    const rev = cur.rev || suggestAccount(i.name, '4', '4190-00')
    const ar = cur.ar || suggestAccount(i.name, '113', '1132-00')
    if (rev !== cur.rev || ar !== cur.ar) n++
    state.incomeMap[i.code] = { rev, ar }
  })
  toastMsg(n ? `แนะนำการผูกให้ ${n} รายการ — ตรวจสอบอีกครั้ง` : 'ผูกครบทุกรายการแล้ว')
}
function autoMapExpenses() {
  let n = 0
  state.expenses.forEach(e => {
    if (state.expenseMap.map[e.code]) return
    const code = suggestAccount(e.name, '5', '5190-00')
    if (code) { state.expenseMap.map[e.code] = code; n++ }
  })
  toastMsg(n ? `แนะนำการผูกให้ ${n} รายการ — ตรวจสอบอีกครั้ง` : 'ผูกครบทุกรายการแล้ว')
}

// ── Favorites ───────────────────────────────────────────────────
function toggleFav(code) {
  if (!code) return
  state.favorites = state.favorites.includes(code) ? state.favorites.filter(c => c !== code) : [...state.favorites, code]
}
function suggestFavorites() {
  const picks = ['1111-00', '1112-00', '1130-00', '2110-00', '4101-00'].filter(c => state.coa.accounts.some(a => a.code === c))
  state.favorites = [...new Set([...state.favorites, ...picks])]
}

// ── Go-live ─────────────────────────────────────────────────────
const allDone = computed(() => doneCount.value === ALL_ITEMS.length)
const goLiveConfirm = ref(false)
function goLive() {
  state.live = true
  toastMsg(state.demo ? '🚀 (demo) จำลองการเริ่มใช้งานจริง' : '🚀 เริ่มใช้งานจริงแล้ว!')
  emit('live')
}
</script>

<style scoped src="./wizard.css"></style>
<style scoped>
.overline{ font-family:var(--font-family); font-size:11px; font-weight:500; letter-spacing:.10em; text-transform:uppercase; color:var(--t4); }
.mono{ font-family:var(--font-family); font-size:12.5px; }
.linklike{ background:none; border:none; padding:0; font:inherit; color:var(--blue600); cursor:pointer; text-decoration:underline; text-underline-offset:2px; }

.st-saved{ color:var(--green); }
.demo-bar{ margin:0 0 16px; align-items:center; flex-wrap:wrap; }
.demo-bar > span:nth-child(2){ flex:1; min-width:200px; }

/* welcome + progress card */
.acc-welcome{ margin-bottom:16px; }
.acc-welcome-row{ display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap; }
.acc-welcome-row h2{ font-size:19px; font-weight:600; color:var(--t1); margin:0; }
.acc-welcome-actions{ display:flex; gap:8px; flex-shrink:0; }
.acc-progress{ margin-top:16px; }
.acc-progress-label{ display:flex; flex-wrap:wrap; align-items:center; gap:6px 14px; font-size:12.5px; color:var(--t3); margin-top:8px; }

/* checklist accordion */
.acc-card{ margin-bottom:14px; padding:0 !important; overflow:hidden; }
.acc-head{ width:100%; display:flex; align-items:center; gap:12px; padding:18px 22px; background:none; border:none; cursor:pointer; text-align:left; font:inherit; }
.acc-head:hover{ background:var(--surface); }
.acc-chev{ width:16px; height:16px; color:var(--t4); flex-shrink:0; transition:transform .15s ease; }
.acc-chev.open{ transform:rotate(180deg); color:var(--blue); }
.acc-head-text{ flex:1; min-width:0; display:flex; flex-direction:column; gap:2px; }
.acc-head-text b{ font-size:15px; color:var(--t1); }
.acc-head-text span{ font-size:12.5px; color:var(--t3); }

.acc-body{ padding:0 22px 18px; }
.acc-row{ display:flex; align-items:flex-start; gap:14px; padding:14px 0; border-top:1px solid var(--bl); }
.acc-row.active{ background:var(--blue50); margin:0 -12px; padding:14px 12px; border-radius:10px; border-top-color:transparent; }
.acc-dot{ width:22px; height:22px; border-radius:50%; border:1.5px solid var(--bm); flex-shrink:0; margin-top:1px; display:flex; align-items:center; justify-content:center; color:#fff; }
.acc-dot svg{ width:13px; height:13px; }
.acc-dot.progress{ border-color:var(--blue); }
.acc-dot.done{ background:var(--green); border-color:var(--green); }
.acc-row-text{ flex:1; min-width:0; display:flex; flex-direction:column; gap:2px; }
.acc-row-text b{ font-size:14px; color:var(--t1); }
.acc-row-text span{ font-size:12.5px; color:var(--t3); }
.acc-row .wz-btn{ flex-shrink:0; align-self:center; }

.acc-review{ display:flex; align-items:center; gap:14px; width:100%; text-align:left; font:inherit; cursor:pointer; border:1.5px solid var(--bl); margin-bottom:16px; padding:18px 22px !important; }
.acc-review:hover{ border-color:var(--blue400); }
.acc-review.active{ border-color:var(--blue); background:var(--blue50); }
.acc-review .acc-dot{ width:26px; height:26px; }
.acc-review .acc-row-text b{ font-size:15px; }

.st-main{ min-width:0; scroll-margin-top:16px; }
.st-head{ margin-bottom:16px; }
.st-head-row{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin:6px 0 4px; }
.st-head h2{ font-size:24px; font-weight:600; }
.st-foot{ display:flex; justify-content:space-between; gap:10px; margin-top:22px; padding-top:18px; border-top:1px solid var(--bl); }
.st-foot .ghost{ margin-left:auto; }

/* overview */
.ov-grid{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; margin-top:12px; }
.ov-item{ padding:9px 12px; border:1.5px solid var(--bl); border-radius:10px; }
.ov-item.on{ border-color:var(--green-bd); background:var(--green-bg); }
.ov-no{ font-family:var(--font-family); font-size:11.5px; color:var(--t4); min-width:18px; }
.ov-order{ margin:10px 0 18px; padding-left:22px; font-size:14px; }
.ov-order li{ margin:6px 0; }

.row-actions{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:12px; }
.chip{ font:inherit; font-size:12.5px; padding:4px 12px; border-radius:9999px; border:1px dashed var(--blue400); background:var(--blue50); color:var(--blue600); cursor:pointer; }
.chip:hover{ background:var(--blue100); }

/* rules / sets */
.cov{ margin-bottom:16px; }
.cov-row{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:8px; font-size:14px; }
.rule{ border:1.5px solid var(--bl); border-radius:12px; padding:14px 16px; margin-bottom:12px; background:var(--page); }
.rule-head{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:10px; }
.rule-head .ghost{ margin-left:auto; }
.rule-range{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:14px; }
.rule-range .wz-input{ width:90px; }
.rule-range .pre{ font-family:var(--font-family); color:var(--t3); }
.rule-incs{ display:flex; flex-wrap:wrap; gap:8px 18px; margin-top:6px; }

/* import */
.drop{ display:flex; flex-direction:column; align-items:center; gap:4px; padding:28px 16px; border:2px dashed var(--bm); border-radius:14px; cursor:pointer; text-align:center; background:var(--page); }
.drop:hover{ border-color:var(--blue400); background:var(--blue50); }
.drop-ic{ font-size:22px; color:var(--blue); }
.imp-sum{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:18px; }
.imp-sum > div{ border:1.5px solid var(--bl); border-radius:12px; padding:12px; font-size:12.5px; color:var(--t3); }
.imp-sum .ok{ border-color:var(--green-bd); background:var(--green-bg); }
.imp-sum .bad{ border-color:var(--red-bd); background:var(--red-bg); }
.imp-n{ display:block; font-size:22px; font-weight:600; color:var(--t1); }
.err-list{ margin:6px 0 10px; padding-left:18px; }

/* invoice */
.inv{ margin-top:16px; border:1.5px solid var(--bl); border-radius:12px; padding:14px 16px; }
.inv-head{ display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px; margin-bottom:6px; font-size:14px; }
.inv .wz-table td{ padding:8px 4px; }
.inv-total td{ font-weight:600; color:var(--t1); border-top:1.5px solid var(--bm); }

/* policy */
.pol{ margin-bottom:16px; display:flex; flex-direction:column; gap:8px; }
.je{ margin-top:6px; }
.je .wz-table{ margin-top:6px; border:1.5px solid var(--bl); border-radius:12px; overflow:hidden; }

/* coa */
.coa-bar, .map-bar{ display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; }
.tabs{ display:flex; gap:4px; flex-wrap:wrap; background:var(--overlay); padding:4px; border-radius:10px; }
.tab{ font:inherit; font-size:12.5px; border:none; background:none; padding:5px 12px; border-radius:8px; cursor:pointer; color:var(--t3); }
.tab.on{ background:#fff; color:var(--t1); font-weight:600; box-shadow:var(--shadow-sm); }
.star{ background:none; border:none; font-size:17px; cursor:pointer; color:var(--bm); padding:0 4px; }
.star.on{ color:#EAB308; }
.src{ text-align:left; font:inherit; }

/* mapping */
.map-head, .map-row{ display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,1fr) minmax(0,1fr); gap:12px; align-items:center; }
.map-head.two, .map-row.two{ grid-template-columns:minmax(0,1fr) minmax(0,1fr); }
.map-head{ margin-top:14px; padding:8px 0; font-family:var(--font-family); font-size:11px; font-weight:600; text-transform:uppercase; color:var(--t4); border-bottom:1px solid var(--bl); }
.map-row{ padding:10px 0; border-bottom:1px solid var(--bl); font-size:14px; }
.map-row .ap{ min-width:0; }

.fav-grid{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; margin-top:14px; }
.fav{ display:flex; gap:8px; align-items:center; text-align:left; font:inherit; font-size:13.5px; padding:8px 12px; border:1.5px solid var(--bl); border-radius:10px; background:#fff; cursor:pointer; }
.fav.on{ border-color:#FDE68A; background:#FFFBEB; }

/* review */
.rv-grid{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:14px; margin-bottom:16px; }
.rv-grid .wz-card + .wz-card{ margin-top:0; }
.rv{ padding:16px 18px; }
.rv-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.rv-list{ list-style:none; margin:0; padding:0; font-size:13.5px; }
.rv-list li{ display:flex; justify-content:space-between; gap:8px; padding:4px 0; color:var(--t3); }
.rv-list li.ok{ color:var(--green); }
.rv-sum{ display:grid; grid-template-columns:140px minmax(0,1fr); gap:8px 16px; margin:12px 0 0; font-size:14px; }
.rv-sum dt{ color:var(--t3); }
.rv-sum dd{ margin:0; color:var(--t1); }
.golive{ display:flex; flex-direction:column; align-items:flex-start; gap:14px; border-color:var(--blue100); background:var(--blue50); }
.live{ text-align:center; border-color:var(--green-bd); background:var(--green-bg); margin-bottom:16px; }
.live-ic{ font-size:40px; }

@media (max-width:640px){
  .wz-wrap{ padding:16px 16px 48px; }
  .acc-welcome-row{ flex-direction:column; align-items:stretch; }
  .acc-welcome-actions{ justify-content:flex-start; }
  .acc-head{ padding:14px 16px; }
  .acc-body{ padding:0 16px 14px; }
  .acc-review{ padding:16px !important; }
  .acc-row .wz-btn{ font-size:12px; padding:6px 10px; }
  .st-head h2{ font-size:20px; }
  .ov-grid, .fav-grid, .rv-grid{ grid-template-columns:1fr; }
  .map-head{ display:none; }
  .map-row, .map-row.two{ grid-template-columns:1fr; gap:8px; }
  .rv-sum{ grid-template-columns:1fr; gap:2px; }
  .rv-sum dd{ margin-bottom:8px; }
  .imp-sum{ grid-template-columns:1fr 1fr 1fr; }
  .st-foot{ flex-wrap:wrap; }
}
</style>
