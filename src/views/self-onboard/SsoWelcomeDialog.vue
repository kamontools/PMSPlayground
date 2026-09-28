<template>
  <div class="dlg-backdrop" @mousedown.self="$emit('close')">
    <div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlg-title" @keydown.esc="$emit('close')" tabindex="-1" ref="box">
      <button class="dlg-x" aria-label="ปิด" @click="$emit('close')">✕</button>

      <!-- Step indicator -->
      <ol class="dlg-steps">
        <li v-for="(t, i) in STEPS" :key="t" :class="{ on: i === step, done: i < step }">
          <button @click="step = i"><span class="n">{{ i < step ? '✓' : i + 1 }}</span>{{ t }}</button>
        </li>
      </ol>

      <div class="dlg-body">
        <!-- 1. Welcome -->
        <section v-if="step === 0" key="s0" class="split">
          <div class="wtext">
            <div class="wtext-inner">
              <span class="overline">PMS · The Living OS</span>
              <h2 id="dlg-title">ยินดีต้อนรับสู่ PMS</h2>
              <p class="lead">ระบบบริหารงานนิติบุคคล ที่รวมการแจ้งหนี้ รับชำระ และบันทึกบัญชีไว้ในที่เดียว ตั้งค่าได้เองโดยไม่ต้องรอทีม CS</p>
              <ol class="wnum-list">
                <li v-for="(v, i) in VALUES" :key="v.t" class="wnum-item">
                  <span class="wnum-n">{{ i + 1 }}</span>
                  <div>
                    <b>{{ v.ic }} {{ v.t }}</b>
                    <span>{{ v.d }}</span>
                  </div>
                </li>
              </ol>
              <div class="wbtns">
                <button class="wz-btn primary lg" @click="step++">ถัดไป →</button>
                <button class="wz-btn ghost" @click="$emit('close')">ข้ามไปก่อน</button>
              </div>
            </div>
          </div>
          <div class="wvisual" aria-hidden="true">
            <div class="wv-card vpos-a">
              <div class="wv-card-head"><span>🧾</span>ใบแจ้งหนี้ 777/12</div>
              <div class="wv-row"><span>ค่าส่วนกลาง</span><i></i></div>
              <div class="wv-row"><span>ค่าน้ำประปา</span><i></i></div>
              <div class="wv-total">รวม <b>฿2,316.00</b></div>
            </div>
            <div class="wv-card vpos-b">
              <div class="wv-qr"><i v-for="n in 9" :key="n" :class="{ on: [0,2,4,6,8].includes(n-1) }"></i></div>
              <span>สแกนจ่าย</span>
            </div>
            <div class="wv-card vpos-c">
              <div class="wv-card-head"><span>📊</span>รายงานประจำเดือน</div>
              <div class="wv-bars"><i style="height:38%"></i><i style="height:64%"></i><i style="height:48%"></i><i style="height:82%"></i><i style="height:56%"></i></div>
            </div>
            <div class="wv-card vpos-d wv-user">
              <span class="wv-dot"></span>boy test<small>ออนไลน์</small>
            </div>
          </div>
        </section>

        <!-- 2. PMS overview -->
        <section v-else-if="step === 1" key="s1" class="split">
          <div class="wtext">
            <div class="wtext-inner">
              <span class="overline">PMS · The Living OS</span>
              <h2 id="dlg-title">ภาพรวม PMS</h2>
              <p class="lead sm">ข้อมูล 4 หัวข้อที่คุณตั้งค่า เชื่อมต่อกันเป็นวงจรเดียว — ข้อมูลทั่วไปเป็นรากฐาน, AR และ AP ทำงานแยกกัน แล้ววนกลับมาลงบัญชีที่ GL · รวม ~{{ TOTAL_MINS }} นาที</p>
              <h3 class="sub-h">📋 เตรียมไว้ใกล้มือ</h3>
              <div class="docs">
                <span v-for="d in DOCS" :key="d" class="doc">{{ d }}</span>
              </div>
              <div class="wbtns">
                <button class="wz-btn primary lg" @click="step++">ถัดไป →</button>
                <button class="wz-btn ghost" @click="step--">← ย้อนกลับ</button>
              </div>
            </div>
          </div>
          <div class="wvisual futur" aria-hidden="true">
            <svg class="mm" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="mm-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <path v-for="e in MM_EDGES" :id="e.id" :key="e.id" :d="e.d" />
              </defs>

              <text x="16" y="24" class="mm-hud"><tspan class="mm-blink">●</tspan> DATA FLOW · LIVE</text>

              <g v-for="e in MM_EDGES" :key="'l' + e.id">
                <use :href="'#' + e.id" class="mm-line" :stroke="e.color" />
                <use :href="'#' + e.id" class="mm-flow" :stroke="e.color" />
              </g>

              <!-- data particles: one 4s cycle — General emits, AR/AP forward to GL -->
              <g v-for="e in MM_EDGES" :key="'p' + e.id" class="mm-p" filter="url(#mm-glow)">
                <circle r="6" :fill="e.pColor" opacity=".35" />
                <circle r="2.6" fill="#fff" />
                <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" :keyTimes="`0;${e.t0};${e.t1};1`">
                  <mpath :href="'#' + e.id" />
                </animateMotion>
                <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0;0;1;1;0;0" :keyTimes="`0;${e.t0 - 0.01};${e.t0};${e.t1};${e.t1 + 0.02};1`" />
              </g>

              <!-- isometric workstations — tile centre at local (0,0), walls on the back two edges -->
              <g v-for="n in mmNodes" :key="n.key" :transform="`translate(${n.x},${n.y}) scale(.88)`">
                <polygon points="0,-41 71,0 0,41 -71,0" class="desk-halo" :stroke="n.color" filter="url(#mm-glow)">
                  <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0;0;.95;0;0" :keyTimes="n.pulse" />
                </polygon>
                <polygon points="0,-33.5 58,0 0,33.5 -58,0" class="desk-floor" :stroke="n.color" />
                <line x1="-29" y1="16.75" x2="29" y2="-16.75" class="desk-grid" />
                <line x1="29" y1="16.75" x2="-29" y2="-16.75" class="desk-grid" />
                <polygon points="-58,0 0,-33.5 0,-73.5 -58,-40" class="desk-wall-l" />
                <polygon points="0,-33.5 58,0 58,-40 0,-73.5" class="desk-wall-r" />
                <polyline points="-58,-40 0,-73.5 58,-40" class="desk-rim" />

                <!-- left wall (u along wall, v down) -->
                <g transform="matrix(0.866,-0.5,0,1,-58,-40)">
                  <template v-if="n.key === 'ar'">
                    <rect x="8" y="6" width="16" height="20" rx="1" fill="#fff" />
                    <rect x="8" y="6" width="16" height="4" rx="1" :fill="n.color" />
                    <rect v-for="y in [12.5, 15.5]" :key="y" x="10" :y="y" width="11" height="1.4" fill="#C9DAF5" />
                    <text x="11" y="24" class="desk-baht" :fill="n.color">฿</text>
                    <circle cx="20.5" cy="22" r="2.2" fill="#34D399" />
                  </template>
                  <template v-else-if="n.key === 'ap'">
                    <rect x="8" y="6" width="16" height="20" rx="1" fill="#fff" />
                    <rect v-for="y in [9, 12, 15]" :key="y" x="10" :y="y" width="12" height="1.4" fill="#C9DAF5" />
                    <path d="M10,22 q2,-3 4,0 t4,0 t3,-1" :stroke="n.color" stroke-width="1.1" fill="none" />
                    <text x="29" y="20" font-size="10">🤝</text>
                  </template>
                  <template v-else-if="n.key === 'gl'">
                    <rect v-for="(c, i) in ['#34D399', '#1C70F7', '#F5B82E', '#A78BFA']" :key="c" :x="8 + i * 5" y="8" width="4.5" height="18" rx=".8" :fill="c" />
                    <rect v-for="i in 4" :key="'l' + i" :x="9 + (i - 1) * 5" y="12" width="2.5" height="5" fill="#fff" opacity=".85" />
                    <rect x="6" y="26" width="24" height="1.6" fill="#fff" />
                  </template>
                  <template v-else>
                    <rect x="8" y="6" width="18" height="17" rx="1" fill="#fff" />
                    <rect x="8" y="6" width="18" height="4" rx="1" :fill="n.color" />
                    <circle v-for="(d, i) in [[12,14],[17,14],[22,14],[12,19],[17,19],[22,19]]" :key="i" :cx="d[0]" :cy="d[1]" r="1.2" :fill="i === 2 ? '#F03737' : '#9FB3D9'" />
                    <rect x="29" y="8" width="10" height="14" fill="#DDF7FB" />
                    <path d="M31,20 v-8 h6 v8 M31,15 h6" stroke="#0EA5B7" stroke-width=".8" fill="none" />
                  </template>
                </g>
                <!-- right wall -->
                <g transform="matrix(0.866,0.5,0,1,0,-73.5)">
                  <template v-if="n.key === 'ar'">
                    <rect x="40" y="7" width="14" height="16" rx="1" fill="#fff" />
                    <rect v-for="(q, i) in [[42,9],[48,9],[42,15],[45,12],[48,15]]" :key="i" :x="q[0]" :y="q[1]" width="4" height="4" fill="#0F1E4A" />
                  </template>
                  <template v-else-if="n.key === 'ap'">
                    <rect x="40" y="7" width="15" height="14" rx="1" fill="#fff" />
                    <text x="42" y="18" font-size="10">📦</text>
                  </template>
                  <template v-else-if="n.key === 'gl'">
                    <rect x="40" y="7" width="16" height="12" rx="1" fill="#fff" />
                    <rect v-for="(h, i) in [4, 7, 5, 8]" :key="i" :x="42 + i * 3.4" :y="17 - h" width="2.4" :height="h" :fill="n.color" />
                  </template>
                  <template v-else>
                    <circle cx="48" cy="15" r="7" fill="#fff" stroke="#9FB3D9" stroke-width="1" />
                    <line x1="48" y1="15" x2="48" y2="10" stroke="#0F1E4A" stroke-width="1" stroke-linecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 48 15" to="360 48 15" dur="8s" repeatCount="indefinite" />
                    </line>
                    <line x1="48" y1="15" x2="51" y2="15" stroke="#0F1E4A" stroke-width="1.3" stroke-linecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 48 15" to="360 48 15" dur="48s" repeatCount="indefinite" />
                    </line>
                  </template>
                </g>

                <!-- desk -->
                <polygon points="0,-40 38.1,-18 24.2,-10 -13.9,-32" class="desk-top" />
                <polygon points="-13.9,-32 24.2,-10 24.2,4 -13.9,-18" class="desk-front" />
                <polygon points="38.1,-18 24.2,-10 24.2,4 38.1,-4" class="desk-side" />
                <line x1="7.1" y1="-19.9" x2="7.1" y2="-5.9" class="desk-seam" />
                <line x1="13" y1="-10" x2="18" y2="-7.1" class="desk-knob" />

                <!-- monitor (screen plane faces front-left) -->
                <line x1="15.5" y1="-31" x2="15.5" y2="-27" stroke="#9FB3D9" stroke-width="1.6" />
                <ellipse cx="15.5" cy="-27" rx="4" ry="1.6" fill="#9FB3D9" />
                <g transform="matrix(0.866,0.5,0,1,4.3,-56)">
                  <rect width="26" height="18" rx="1.5" fill="#0F1E4A" stroke="#8FB3FF" stroke-width=".6" />
                  <rect x="2" y="2" width="10" height="2" rx="1" :fill="n.color" />
                  <template v-if="n.key === 'ar'">
                    <rect v-for="y in [6, 10, 14]" :key="y" x="2" :y="y" width="15" height="2" rx="1" fill="#3B5A9A" />
                    <circle v-for="(y, i) in [7, 11, 15]" :key="'c' + y" cx="21" :cy="y" r="1.5" fill="#34D399" class="scr-seq" :style="{ animationDelay: i * 0.6 + 's' }" />
                  </template>
                  <template v-else-if="n.key === 'ap'">
                    <rect x="3" y="5" width="11" height="11" rx="1" fill="#fff" opacity=".9" />
                    <rect x="4.5" y="7" width="8" height="1.2" :fill="n.color" />
                    <rect x="4.5" y="9.5" width="6" height="1" fill="#9FB3D9" />
                    <rect x="4.5" y="12" width="7" height="1" fill="#9FB3D9" />
                    <path d="M16,10.5 h6 m-2.5,-2.5 l2.5,2.5 l-2.5,2.5" :stroke="n.color" stroke-width="1.3" fill="none" class="scr-arrow" />
                  </template>
                  <template v-else-if="n.key === 'gl'">
                    <rect v-for="(b, i) in [[3, 7], [8, 10], [13, 6], [18, 11]]" :key="i" :x="b[0]" :y="16 - b[1]" width="3.5" :height="b[1]" :fill="n.color" class="scr-bar" :style="{ animationDelay: i * 0.3 + 's' }" />
                    <polyline points="3,11 9,8 14,10 21,5" fill="none" stroke="#F5B82E" stroke-width=".9" />
                  </template>
                  <template v-else>
                    <rect x="3.5" y="6" width="8" height="10" :fill="n.color" opacity=".85" />
                    <rect v-for="(w, i) in [[5, 8], [8, 8], [5, 11.5], [8, 11.5]]" :key="i" :x="w[0]" :y="w[1]" width="1.8" height="2" fill="#0F1E4A" />
                    <rect x="14" y="7" width="9" height="3" rx="1.5" fill="#3B5A9A" /><circle cx="21.5" cy="8.5" r="1.2" fill="#34D399" />
                    <rect x="14" y="12" width="9" height="3" rx="1.5" fill="#3B5A9A" /><circle cx="15.5" cy="13.5" r="1.2" fill="#9FB3D9" />
                  </template>
                </g>

                <!-- desk-top items (u along desk, v toward viewer) -->
                <g transform="matrix(0.866,0.5,-0.866,0.5,0,-40)">
                  <rect x="6" y="7" width="13" height="5" rx="1" fill="#E8EEF9" />
                  <rect x="21" y="8" width="3.5" height="4" rx="1.5" fill="#E8EEF9" />
                  <template v-if="n.key === 'ar'">
                    <circle v-for="(c, i) in [[32, 6], [37, 8], [34, 11]]" :key="i" :cx="c[0]" :cy="c[1]" r="2.6" fill="#F5B82E" stroke="#D99A1E" stroke-width=".6" />
                  </template>
                  <template v-else-if="n.key === 'ap'">
                    <rect x="28" y="4" width="11" height="8" fill="#fff" transform="rotate(-6 33 8)" />
                    <rect x="29" y="5" width="11" height="8" fill="#fff" stroke="#C9DAF5" stroke-width=".4" />
                    <circle cx="36.5" cy="10.5" r="1.8" fill="none" :stroke="n.color" stroke-width=".8" />
                  </template>
                  <template v-else-if="n.key === 'gl'">
                    <rect x="26" y="3" width="7" height="10" fill="#fff" stroke="#C9DAF5" stroke-width=".4" />
                    <rect x="33" y="3" width="7" height="10" fill="#fff" stroke="#C9DAF5" stroke-width=".4" />
                    <path v-for="(t, i) in [[27, 6], [27, 9], [34, 6], [34, 9]]" :key="i" :d="`M${t[0]},${t[1]} l1,1 l2,-2`" stroke="#34D399" stroke-width=".8" fill="none" class="gl-tick" :style="{ animationDelay: i * 0.4 + 's' }" />
                  </template>
                  <template v-else>
                    <rect x="28" y="4" width="12" height="8" rx="1" :fill="n.color" opacity=".85" />
                    <rect x="28" y="3" width="5" height="2" rx=".6" :fill="n.color" />
                  </template>
                </g>

                <!-- worker seated at the desk, facing the screen -->
                <g transform="translate(-18,-4)">
                  <ellipse rx="9" ry="2.6" fill="rgba(6,14,34,.35)" />
                  <rect x="-1" y="-10" width="2" height="9" fill="#5B6B8C" />
                  <ellipse cy="-11" rx="9" ry="3.4" fill="#1E3A8A" />
                  <rect x="-10" y="-29" width="5" height="19" rx="2.5" fill="#1E3A8A" />
                  <rect x="-3" y="-16" width="14" height="6" rx="3" :fill="n.pants" />
                  <rect x="7" y="-13" width="5" height="12" rx="2.5" :fill="n.pants" />
                  <ellipse cx="11" cy="-1.5" rx="4" ry="2" fill="#0F1E4A" />
                  <rect x="-6" y="-34" width="12" height="20" rx="5" :fill="n.shirt" />
                  <g class="desk-typing">
                    <path d="M2,-29 Q8,-24 15,-26" :stroke="n.shirt" stroke-width="4" stroke-linecap="round" fill="none" />
                    <circle cx="16" cy="-26" r="2.1" :fill="n.skin" />
                  </g>
                  <circle cx="1" cy="-42" r="8.5" :fill="n.skin" />
                  <template v-if="n.hair === 'curly'">
                    <circle v-for="(h, i) in [[-3, -49, 4], [3, -50.5, 4], [8, -47, 3.3], [-6.5, -45, 3.6], [-6.5, -39, 3]]" :key="i" :cx="h[0]" :cy="h[1]" :r="h[2]" fill="#1B1F3B" />
                  </template>
                  <template v-else>
                    <path d="M-7.5,-43 C-7.5,-53 9.5,-54 9.5,-45 C5,-48 -1,-47 -7.5,-43 Z" :fill="n.hairColor" />
                    <path d="M-7.5,-43 C-8.5,-38 -6,-35 -3.5,-34.5 L-3,-43 Z" :fill="n.hairColor" />
                    <circle v-if="n.hair === 'bun'" cx="-6" cy="-50" r="3.6" :fill="n.hairColor" />
                  </template>
                  <circle cx="4" cy="-42" r="1.1" fill="#0F1E4A" />
                  <circle cx="7.6" cy="-42" r="1.1" fill="#0F1E4A" />
                  <g v-if="n.hair === 'glasses'" fill="none" stroke="#0F1E4A" stroke-width=".7">
                    <circle cx="4" cy="-42" r="2" /><circle cx="7.8" cy="-42" r="2" />
                  </g>
                  <ellipse cx="8" cy="-38.6" rx="1.8" ry="1.1" fill="#FF9FAE" opacity=".7" />
                  <path d="M4,-38.5 q1.5,1.5 3,0" stroke="#0F1E4A" stroke-width=".9" fill="none" stroke-linecap="round" />
                </g>

                <!-- AR: money coming in -->
                <template v-if="n.key === 'ar'">
                  <g v-for="d in [0, 0.8, 1.6]" :key="d" transform="translate(24,-22)">
                    <g class="ar-coin" :style="{ animationDelay: d + 's' }">
                      <circle r="3.8" fill="#F5B82E" stroke="#FFE08A" stroke-width=".8" />
                      <text y="2" class="coin-t">฿</text>
                    </g>
                  </g>
                  <text x="34" y="-36" class="ar-plus">+฿</text>
                </template>

                <!-- AP: supplier at the desk, payment going out -->
                <template v-else-if="n.key === 'ap'">
                  <g transform="translate(16,-27)">
                    <g class="ap-bill">
                      <rect x="-4.5" y="-2.8" width="9" height="5.6" rx="1" fill="#34D399" stroke="#D1FAE5" stroke-width=".6" />
                      <text y="1.8" class="bill-t">฿</text>
                    </g>
                  </g>
                  <g transform="translate(40,10) scale(-1,1)">
                    <ellipse rx="9" ry="2.6" fill="rgba(6,14,34,.35)" />
                    <rect x="-5" y="-17" width="4.5" height="16" rx="2.2" fill="#3F4A63" />
                    <rect x=".5" y="-17" width="4.5" height="16" rx="2.2" fill="#3F4A63" />
                    <ellipse cx="-2.8" cy="-1" rx="3.5" ry="1.8" fill="#0F1E4A" />
                    <ellipse cx="3.2" cy="-1" rx="3.5" ry="1.8" fill="#0F1E4A" />
                    <rect x="-7" y="-33" width="14" height="17" rx="5" fill="#F59E0B" />
                    <circle cy="-41" r="7.5" fill="#F3C39D" />
                    <path d="M-7.5,-42 C-7,-50.5 7,-50.5 7.5,-42 Z" fill="#1E3A8A" />
                    <path d="M4,-43.5 q6,-.5 7.5,2 q-4,1 -8,0 Z" fill="#1E3A8A" />
                    <circle cx="2.5" cy="-40.5" r="1" fill="#0F1E4A" />
                    <circle cx="5.5" cy="-40.5" r="1" fill="#0F1E4A" />
                    <path d="M2.8,-37.5 q1.4,1.3 2.8,0" stroke="#0F1E4A" stroke-width=".9" fill="none" stroke-linecap="round" />
                    <path d="M3,-29 L9,-20" stroke="#F59E0B" stroke-width="3.2" stroke-linecap="round" />
                    <path d="M7,-22 l6,-3.5 l6,3.5 l-6,3.5 z" fill="#E0A96D" />
                    <path d="M7,-22 l6,3.5 v7 l-6,-3.5 z" fill="#C58A4C" />
                    <path d="M13,-18.5 l6,-3.5 v7 l-6,3.5 z" fill="#B07A40" />
                    <path d="M10,-23.7 l6,3.5" stroke="#F5DDB8" stroke-width="1" />
                  </g>
                  <g transform="translate(-26,-62)">
                    <g class="bub bub-a">
                      <rect x="-10" y="-7" width="20" height="12" rx="6" fill="#fff" />
                      <path d="M-2,4.5 L-5,9 L3,4.5 Z" fill="#fff" />
                      <circle v-for="x in [-5, 0, 5]" :key="x" :cx="x" cy="-1" r="1.3" :fill="n.color" />
                    </g>
                  </g>
                  <g transform="translate(52,-46)">
                    <g class="bub bub-b">
                      <rect x="-10" y="-7" width="20" height="12" rx="6" fill="#fff" />
                      <path d="M2,4.5 L5,9 L-3,4.5 Z" fill="#fff" />
                      <text y="2.4" class="bub-t">OK!</text>
                    </g>
                  </g>
                </template>

                <!-- GL: pen writing the ledger -->
                <template v-else-if="n.key === 'gl'">
                  <g class="gl-pen">
                    <path d="M24,-21 L29,-29" stroke="#1E2A55" stroke-width="1.8" stroke-linecap="round" />
                    <path d="M24,-21 L25,-23" stroke="#F5B82E" stroke-width="1.8" stroke-linecap="round" />
                  </g>
                </template>

                <!-- General: project settings -->
                <template v-else>
                  <g transform="translate(-40,-60)">
                    <g>
                      <rect v-for="i in 6" :key="i" x="-1.5" y="-7" width="3" height="4" rx=".8" :fill="n.color" :transform="`rotate(${i * 60})`" />
                      <circle r="4.6" :fill="n.color" />
                      <circle r="1.8" fill="#0A1733" />
                      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                    </g>
                  </g>
                </template>

                <g v-if="n.key !== 'ap'" transform="translate(18,20)">
                  <ellipse cy="5" rx="6" ry="2" fill="rgba(6,14,34,.35)" />
                  <g class="desk-leaf">
                    <ellipse cy="-8" rx="2.4" ry="7" fill="#34D399" transform="rotate(-30)" />
                    <ellipse cy="-8" rx="2.4" ry="7" fill="#22C55E" transform="rotate(30)" />
                    <ellipse cy="-9" rx="2.6" ry="8" fill="#16A34A" />
                  </g>
                  <path d="M-5,-1 L-4,5 L4,5 L5,-1 Z" fill="#F5B82E" />
                  <ellipse cy="-1" rx="5" ry="1.8" fill="#FFD86B" />
                </g>

                <g transform="translate(0,-90)">
                  <line x1="-20" y1="11" x2="-20" y2="28" class="desk-hang" />
                  <line x1="20" y1="11" x2="20" y2="28" class="desk-hang" />
                  <rect x="-62" y="-11" width="124" height="22" rx="11" :fill="n.color" />
                  <text y="3.8" class="desk-sign">{{ n.sign }}</text>
                </g>
                <text y="48" class="desk-cap">{{ n.items }} รายการ · ~{{ n.mins }} นาที</text>
              </g>

              <g class="mm-legend">
                <line x1="70" y1="462" x2="92" y2="462" stroke="#22D3EE" />
                <text x="98" y="466">รากฐานข้อมูล</text>
                <line x1="208" y1="462" x2="230" y2="462" stroke="#34D399" />
                <text x="236" y="466">บันทึกเข้า GL</text>
              </g>
            </svg>
          </div>
        </section>

        <!-- 3. Start or demo -->
        <section v-else key="s2" class="split">
          <div class="wtext">
            <div class="wtext-inner">
              <span class="overline">PMS · The Living OS</span>
              <h2 id="dlg-title">พร้อมเริ่มหรือยัง?</h2>
              <p class="lead sm">เลือกได้ว่าจะเริ่มตั้งค่าโครงการของคุณเลย หรือลองเล่นกับโครงการตัวอย่างก่อน</p>
              <ul class="opt-list">
                <li>
                  <span class="opt-ic">🎭</span>
                  <div><b>ลองใช้งาน demo</b><span>สำรวจโครงการตัวอย่างที่ตั้งค่าครบแล้ว ไม่กระทบข้อมูลของคุณ</span></div>
                </li>
                <li>
                  <span class="opt-ic">🚀</span>
                  <div>
                    <b>เริ่มใช้งานโครงการจริง</b>
                    <span v-if="canResume">ทำไปแล้ว {{ progressPercent }}% — กลับไปทำต่อจากจุดที่ค้างไว้</span>
                    <span v-else>กรอกข้อมูลทีละขั้น บันทึกอัตโนมัติ ยังไม่มีผลจริงจนกด "เริ่มใช้งานจริง"</span>
                  </div>
                </li>
              </ul>
              <div v-if="canResume" class="warn">⚠️ ถ้าเลือก demo ข้อมูลที่กรอกไว้ ({{ progressPercent }}%) จะถูกแทนด้วยข้อมูล demo</div>
              <div class="wbtns">
                <div class="wbtns-row">
                  <button class="wz-btn" @click="emit('demo')">🎭 ลองใช้งาน demo</button>
                  <button class="wz-btn primary" @click="emit('start')">เริ่มใช้งานโครงการจริง</button>
                </div>
                <button class="wz-btn ghost" @click="step--">← ย้อนกลับ</button>
              </div>
              <div class="help">
                <button class="linklike" @click="downloadTemplate">⬇ ดาวน์โหลด Excel template</button>
                <span>·</span>
                <span>ติดขัดตรงไหน <button class="linklike" @click="flash('เปิดแชทกับ CS (mock)')">แชทกับ CS</button></span>
                <span v-if="note" class="note">{{ note }}</span>
              </div>
            </div>
          </div>
          <div class="wvisual" aria-hidden="true">
            <svg class="iso" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet">
              <g class="iso-float">
                <circle cx="58" cy="118" r="10" /><circle cx="360" cy="236" r="6" /><circle cx="92" cy="428" r="7" /><rect x="304" y="424" width="12" height="12" rx="3" />
              </g>

              <polygon points="200,215 372,314 200,413 28,314" class="iso-floor" />
              <polygon points="200,252 308,314 200,376 92,314" class="iso-floor-in" />

              <!-- gear -->
              <g transform="translate(340,108)">
                <g class="iso-gear">
                  <rect v-for="i in 8" :key="i" x="-6" y="-35" width="12" height="14" rx="2" :transform="`rotate(${i * 45})`" />
                  <circle r="26" />
                  <circle r="10" class="iso-gear-hole" />
                </g>
              </g>

              <!-- cabinet -->
              <polygon points="252,82 321.3,122 290.1,140 220.8,100" class="iso-top" />
              <polygon points="220.8,100 290.1,140 290.1,258 220.8,218" class="iso-left" />
              <polygon points="321.3,122 290.1,140 290.1,258 321.3,240" class="iso-right" />
              <line x1="220.8" y1="139.3" x2="290.1" y2="179.3" class="iso-seam" />
              <line x1="220.8" y1="178.7" x2="290.1" y2="218.7" class="iso-seam" />
              <line v-for="y in [139.7, 179, 218.3]" :key="y" x1="247.5" :y1="y - 4.6" x2="263.5" :y2="y + 4.6" class="iso-handle" />
              <polygon points="294.8,146.7 316.6,134.1 316.6,177.8 294.8,190.4" class="iso-cubby" />
              <polygon points="294.8,202.2 316.6,189.6 316.6,233.3 294.8,245.9" class="iso-cubby" />
              <polygon points="297,184 314,174 314,164 297,174" fill="#1C70F7" />
              <!-- calendar on top -->
              <polygon points="250,88 270,99.5 270,119.5 250,108" fill="#fff" stroke="#C9DAF5" />
              <polygon points="250,88 270,99.5 270,105 250,93.5" fill="#1C70F7" />
              <circle v-for="(d, i) in [[255,101],[260,104],[265,107],[255,106],[260,109],[265,112]]" :key="i" :cx="d[0]" :cy="d[1]" r="1.2" :fill="i === 4 ? '#F03737' : '#9FB3D9'" />

              <!-- potted plant -->
              <g transform="translate(352,318)">
                <ellipse cy="22" rx="16" ry="5" fill="rgba(30,58,138,.12)" />
                <g class="iso-leaves">
                  <ellipse cy="-18" rx="4.5" ry="13" fill="#1E3A8A" transform="rotate(-68)" />
                  <ellipse cy="-18" rx="4.5" ry="13" fill="#1C70F7" transform="rotate(68)" />
                  <ellipse cy="-18" rx="5" ry="15" fill="#3B63B8" transform="rotate(-36)" />
                  <ellipse cy="-18" rx="5" ry="15" fill="#5B8DEF" transform="rotate(36)" />
                  <ellipse cy="-20" rx="5.5" ry="17" fill="#1C70F7" />
                </g>
                <path d="M-13,0 L-10,22 L10,22 L13,0 Z" fill="#F5B82E" />
                <path d="M0,0 L13,0 L10,22 L0,22 Z" fill="#E0A21F" />
                <ellipse rx="13" ry="4" fill="#FFD86B" />
              </g>

              <!-- light bulb -->
              <g transform="translate(66,352) rotate(-65)">
                <circle r="20" fill="#FFD86B" class="iso-glow" />
                <circle r="10" fill="#FFE9A8" stroke="#F5B82E" stroke-width="1.5" />
                <path d="M-3,-1 q3,4 6,0" stroke="#F5B82E" stroke-width="1.3" fill="none" />
                <rect x="-5" y="9" width="10" height="8" rx="2" fill="#9FB3D9" />
              </g>

              <!-- characters -->
              <g v-for="c in ISO_CHARS" :key="c.key" :transform="`translate(${c.x},${c.y}) scale(${c.flip},1)`">
                <ellipse rx="22" ry="6" fill="rgba(30,58,138,.14)" />
                <g class="iso-lean" :style="{ '--lx': c.lean[0] + 'px', '--ly': c.lean[1] + 'px' }">
                  <g class="iso-bob" :style="{ animationDelay: c.delay }">
                    <template v-if="c.skirt">
                      <rect x="-8" y="-15" width="5" height="13" rx="2.5" :fill="c.skin" />
                      <rect x="3" y="-15" width="5" height="13" rx="2.5" :fill="c.skin" />
                      <path d="M-13,-38 L13,-38 L17,-13 L-17,-13 Z" :fill="c.skirt" />
                    </template>
                    <template v-else>
                      <rect x="-10" y="-36" width="8.5" height="34" rx="4" :fill="c.pants" />
                      <rect x="1.5" y="-36" width="8.5" height="34" rx="4" :fill="c.pants" />
                    </template>
                    <ellipse cx="-5.5" cy="-2" rx="6.5" ry="3.2" fill="#0F1E4A" />
                    <ellipse cx="6.5" cy="-2" rx="6.5" ry="3.2" fill="#0F1E4A" />
                    <path :d="arm(-4, c.hands[0])" :stroke="c.armColor || c.shirt" class="iso-arm" />
                    <rect x="-15" y="-68" width="30" height="34" rx="12" :fill="c.shirt" :stroke="c.shirt === '#FFFFFF' ? '#C9DAF5' : 'none'" />
                    <path :d="arm(8, c.hands[1])" :stroke="c.armColor || c.shirt" class="iso-arm" />
                    <circle v-for="(h, i) in c.hands" :key="i" :cx="h[0]" :cy="h[1]" r="3.6" :fill="c.skin" />
                    <circle cy="-84" r="15" :fill="c.skin" />
                    <template v-if="c.hair === 'short'">
                      <path d="M-15,-86 C-15,-103 15,-104 15,-88 C8,-94 -2,-92 -15,-86 Z" fill="#1E2A55" />
                      <path d="M-15,-87 C-17,-79 -13,-73 -9,-72 L-8,-86 Z" fill="#1E2A55" />
                    </template>
                    <template v-else-if="c.hair === 'cap'">
                      <path d="M-15,-88 C-14,-103 14,-103 15,-88 Z" fill="#E8EEF9" />
                      <path d="M9,-90 q12,-1 15,4 q-9,2 -17,0 Z" fill="#C9DAF5" />
                    </template>
                    <template v-else>
                      <circle v-for="(h, i) in CURLS" :key="i" :cx="h[0]" :cy="h[1]" :r="h[2]" fill="#1B1F3B" />
                    </template>
                    <circle cx="2" cy="-84" r="1.8" fill="#0F1E4A" />
                    <circle cx="9" cy="-84" r="1.8" fill="#0F1E4A" />
                    <ellipse cx="-1" cy="-78" rx="3" ry="1.8" fill="#FF9FAE" opacity=".6" />
                    <ellipse cx="12" cy="-78" rx="2.4" ry="1.8" fill="#FF9FAE" opacity=".6" />
                    <path d="M3,-78 q2.5,2.6 5,0" stroke="#0F1E4A" stroke-width="1.3" fill="none" stroke-linecap="round" />
                  </g>
                </g>
              </g>

              <!-- puzzle pieces: carried in, click together, drift back -->
              <g v-for="p in ISO_PIECES" :key="p.key" :transform="`translate(${p.x},${p.y})`">
                <g class="iso-pz" :style="{ '--dx': p.dx + 'px', '--dy': p.dy + 'px' }">
                  <g :transform="`rotate(${p.r}) scale(1.15) translate(-20,-20)`">
                    <path :d="PZ" transform="translate(0,5)" fill="#D99A1E" />
                    <path :d="PZ" fill="#F5B82E" stroke="#FFD86B" stroke-width="1.2" />
                  </g>
                </g>
              </g>

              <g v-for="s in SPARKS" :key="s.join()" :transform="`translate(${s[0]},${s[1]}) scale(${s[2]})`">
                <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" class="iso-spark" :fill="s[3]" />
              </g>

              <g transform="translate(205,212)">
                <g class="iso-badge">
                  <rect x="-52" y="-13" width="104" height="26" rx="13" fill="#05A861" />
                  <text y="4.5" class="iso-badge-t">✓ เชื่อมต่อครบ</text>
                </g>
              </g>

              <text x="200" y="455" class="iso-cap">ชิ้นส่วนครบ ระบบก็พร้อมใช้งาน</text>
            </svg>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { SECTIONS, TOTAL_MINS, state, doneCount, progressPercent } from './store.js'

const emit = defineEmits(['close', 'start', 'demo'])

const STEPS = ['ยินดีต้อนรับ', 'ภาพรวม PMS', 'เริ่มใช้งาน']
const VALUES = [
  { ic: '🧾', t: 'แจ้งหนี้อัตโนมัติ', d: 'ออกใบแจ้งหนี้ทุกห้องตามรอบ ไม่ต้องทำทีละใบ' },
  { ic: '💳', t: 'รับชำระ & ตัดหนี้', d: 'Bill Payment / QR ตัดหนี้ให้ทันที' },
  { ic: '📒', t: 'บัญชีบันทึกเอง', d: 'ทุกรายการลง GL อัตโนมัติตามนโยบายที่ตั้งไว้' },
]
// Mindmap: General is the foundation (bottom); AR / AP run separately and post back into GL (top)
const MM_POS = {
  general: { x: 200, y: 398, color: '#22D3EE', pulse: '0;0.01;0.05;0.2;1', sign: 'ข้อมูลทั่วไป · รากฐาน', skin: '#FFD7B5', shirt: '#0EA5B7', pants: '#1E3A8A', hair: 'bun', hairColor: '#5A3825' },
  ar: { x: 92, y: 262, color: '#60A5FA', pulse: '0;0.43;0.47;0.62;1', sign: 'AR · การเก็บเงิน', skin: '#8D5B3E', shirt: '#3B82F6', pants: '#1E2A55', hair: 'curly' },
  ap: { x: 308, y: 262, color: '#A78BFA', pulse: '0;0.43;0.47;0.62;1', sign: 'AP · จ่ายเงิน & supplier', skin: '#F3C39D', shirt: '#7C5CE0', pants: '#1E2A55', hair: 'short', hairColor: '#1E2A55' },
  gl: { x: 200, y: 122, color: '#34D399', pulse: '0;0.88;0.92;0.99;1', sign: 'GL · บันทึกบัญชี', skin: '#FFD7B5', shirt: '#2F9E77', pants: '#1E3A8A', hair: 'glasses', hairColor: '#1B1F3B' },
}
const MM_EDGES = [
  { id: 'mm-g-ar', d: 'M200,398 C200,330 92,330 92,262', color: '#22D3EE', pColor: '#22D3EE', t0: 0.05, t1: 0.45 },
  { id: 'mm-g-ap', d: 'M200,398 C200,330 308,330 308,262', color: '#22D3EE', pColor: '#22D3EE', t0: 0.05, t1: 0.45 },
  { id: 'mm-g-gl', d: 'M200,398 L200,122', color: '#22D3EE', pColor: '#22D3EE', t0: 0.05, t1: 0.9 },
  { id: 'mm-ar-gl', d: 'M92,262 C92,190 200,195 200,122', color: '#34D399', pColor: '#60A5FA', t0: 0.5, t1: 0.9 },
  { id: 'mm-ap-gl', d: 'M308,262 C308,190 200,195 200,122', color: '#34D399', pColor: '#A78BFA', t0: 0.5, t1: 0.9 },
]
const mmNodes = SECTIONS.map(s => ({ key: s.key, title: s.title, sub: s.sub, items: s.items.length, mins: s.mins, ...MM_POS[s.key] }))
const DOCS = ['เลขผู้เสียภาษีนิติบุคคล', 'ทะเบียนห้อง/บ้าน + พื้นที่', 'อัตราค่าส่วนกลาง / ค่าน้ำ', 'รอบแจ้งหนี้ & ค่าปรับ', 'ผังบัญชีเดิม (ถ้ามี)', 'ข้อมูล Bill Payment']

// Step 3 isometric scene — characters draw with feet at local (0,0), facing right; flip -1 mirrors
const ISO_CHARS = [
  { key: 'm1', x: 118, y: 275, flip: 1, skin: '#FFD7B5', shirt: '#3B63B8', pants: '#1E3A8A', hair: 'short', hands: [[24, -68], [28, -58]], lean: [5, 6], delay: '0s' },
  { key: 'm2', x: 150, y: 410, flip: 1, skin: '#F3C39D', shirt: '#1E2A55', pants: '#5B8DEF', hair: 'cap', hands: [[28, -62], [31, -52]], lean: [3, -5], delay: '.4s' },
  { key: 'w1', x: 292, y: 405, flip: -1, skin: '#8D5B3E', shirt: '#FFFFFF', armColor: '#8D5B3E', skirt: '#1C70F7', hair: 'curly', hands: [[28, -62], [31, -52]], lean: [4, -5], delay: '.8s' },
]
const ISO_PIECES = [
  { key: 'a', x: 152, y: 210, r: 18, dx: 38, dy: 62 },
  { key: 'b', x: 184, y: 350, r: -12, dx: 12, dy: -47 },
  { key: 'c', x: 258, y: 345, r: 8, dx: -34, dy: -42 },
]
const PZ = 'M0,0 h14 a6,6 0 1,1 12,0 h14 v14 a6,6 0 1,1 0,12 v14 h-14 a6,6 0 1,0 -12,0 h-14 v-14 a6,6 0 1,0 0,-12 z'
const CURLS = [[-6, -96, 7], [4, -98, 7], [11, -91, 6], [-12, -88, 6], [-11, -78, 5], [0, -106, 6]]
const SPARKS = [[205, 262, 1.2, '#F5B82E'], [176, 292, 0.8, '#1C70F7'], [234, 288, 0.9, '#F5B82E']]
function arm(sx, [hx, hy]) {
  const sy = -60
  return `M${sx},${sy} Q${(sx + hx) / 2},${sy + 10} ${hx},${hy}`
}

const step = ref(0)
const canResume = computed(() => state.started && !state.demo && doneCount.value > 0)
const box = ref(null)
onMounted(() => box.value?.focus())

const note = ref('')
let noteTimer = null
function flash(msg) {
  note.value = msg
  clearTimeout(noteTimer)
  noteTimer = setTimeout(() => { note.value = '' }, 2200)
}

function downloadTemplate() {
  const rows = [
    ['บ้านเลขที่', 'พื้นที่ (ตร.ม.)', 'รหัสรายรับที่แจ้งหนี้ (คั่นด้วย ,)'],
    ['777/1', '60', 'R01,R02'],
    ['777/2', '72', 'R01,R02,R03'],
  ]
  const csv = '﻿' + rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'los-onboard-units-template.csv'
  a.click()
  URL.revokeObjectURL(url)
  flash('ดาวน์โหลด template แล้ว')
}
</script>

<style scoped src="./wizard.css"></style>
<style scoped>
.dlg-backdrop{ position:fixed; inset:0; background:rgba(26,26,26,.45); z-index:40; display:flex; align-items:center; justify-content:center; padding:24px 16px; }
.dlg{ position:relative; width:100%; max-width:900px; height:min(640px, calc(100vh - 48px)); display:flex; flex-direction:column; background:#fff; border-radius:22px; box-shadow:0 20px 60px rgba(0,0,0,.25); outline:none; }
.dlg-x{ position:absolute; top:14px; right:14px; width:34px; height:34px; border-radius:50%; border:none; background:var(--overlay); color:var(--t3); cursor:pointer; font-size:14px; z-index:1; }
.dlg-x:hover{ background:var(--bl); color:var(--t1); }

.dlg-steps{ flex-shrink:0; list-style:none; display:flex; gap:6px; margin:0; padding:18px 60px 14px 24px; border-bottom:1px solid var(--bl); }
.dlg-steps li{ flex:1; }
.dlg-steps button{ width:100%; display:flex; align-items:center; gap:8px; font:inherit; font-size:13px; font-weight:500; color:var(--t4); background:none; border:none; padding:6px 0; cursor:pointer; border-bottom:2.5px solid var(--bl); }
.dlg-steps .n{ width:22px; height:22px; border-radius:50%; border:1.5px solid currentColor; display:inline-flex; align-items:center; justify-content:center; font-size:11.5px; flex-shrink:0; }
.dlg-steps li.done button{ color:var(--green); border-bottom-color:var(--green); }
.dlg-steps li.on button{ color:var(--blue600); border-bottom-color:var(--blue); font-weight:600; }

.dlg-body{ flex:1 1 auto; min-height:0; display:flex; overflow:hidden; }
.overline{ font-family:var(--font-family); font-size:11px; letter-spacing:.10em; text-transform:uppercase; color:var(--t4); }
.dlg-body h2{ font-size:26px; font-weight:700; margin:4px 0 0; }
.lead{ font-size:15.5px; color:var(--t3); margin:10px 0 0; max-width:60ch; }
.lead.sm{ font-size:14.5px; }

/* Every step: text left, illustration right (reference: artifacts gallery modal) */
.split{ display:flex; width:100%; align-items:stretch; }
.wtext{ flex:1 1 50%; min-width:0; min-height:0; padding:34px 36px; display:flex; flex-direction:column; overflow-y:auto; }
.wtext-inner{ margin:auto 0; width:100%; }
.wnum-list{ list-style:none; margin:26px 0 0; padding:0; display:flex; flex-direction:column; gap:18px; }
.wnum-item{ display:flex; gap:14px; align-items:flex-start; }
.wnum-n{ width:26px; height:26px; border-radius:50%; background:var(--t1); color:#fff; display:flex; align-items:center; justify-content:center; font-size:12.5px; font-weight:700; flex-shrink:0; }
.wnum-item div{ display:flex; flex-direction:column; gap:2px; }
.wnum-item b{ font-size:15.5px; color:var(--t1); }
.wnum-item span{ font-size:13.5px; color:var(--t3); }

.wbtns{ display:flex; flex-direction:column; gap:10px; margin-top:28px; }
.wbtns .wz-btn{ width:100%; justify-content:center; padding-top:11px; padding-bottom:11px; }
.wbtns .wz-btn.ghost{ border-color:var(--bl); background:#fff; }
.wbtns .wz-btn.ghost:hover{ border-color:var(--blue400); background:var(--blue50); }

.wvisual{ flex:1 1 50%; position:relative; background:linear-gradient(160deg, var(--blue50), var(--blue100)); overflow:hidden; }
.wv-card{ position:absolute; background:#fff; border:1px solid var(--bl); border-radius:14px; box-shadow:var(--shadow-md); padding:12px 14px; font-size:12px; color:var(--t2); }
.wv-card-head{ display:flex; align-items:center; gap:6px; font-weight:700; color:var(--t1); font-size:12.5px; margin-bottom:8px; }
.vpos-a{ top:14%; left:8%; width:180px; transform:rotate(-4deg); }
.wv-row{ display:flex; justify-content:space-between; align-items:center; gap:8px; padding:3px 0; }
.wv-row i{ width:34px; height:6px; border-radius:3px; background:var(--bl); }
.wv-total{ margin-top:8px; padding-top:8px; border-top:1px solid var(--bl); font-size:12.5px; display:flex; justify-content:space-between; color:var(--t1); }
.vpos-b{ top:8%; right:9%; width:110px; display:flex; flex-direction:column; align-items:center; gap:8px; transform:rotate(4deg); z-index:2; }
.wv-qr{ display:grid; grid-template-columns:repeat(3,10px); grid-template-rows:repeat(3,10px); gap:2px; }
.wv-qr i{ background:var(--bl); border-radius:2px; }
.wv-qr i.on{ background:var(--t1); }
.vpos-c{ bottom:12%; left:14%; width:190px; transform:rotate(-2deg); }
.wv-bars{ display:flex; align-items:flex-end; gap:6px; height:52px; margin-top:2px; }
.wv-bars i{ flex:1; background:var(--blue); border-radius:3px 3px 0 0; opacity:.85; }
.vpos-d{ bottom:16%; right:10%; transform:rotate(3deg); }
.wv-user{ display:flex; align-items:center; gap:8px; font-weight:600; color:var(--t1); }
.wv-dot{ width:8px; height:8px; border-radius:50%; background:var(--green); flex-shrink:0; }
.wv-user small{ font-weight:400; color:var(--t3); margin-left:2px; }

/* Step 2 — futuristic data-flow mindmap */
.wvisual.futur{
  background:
    linear-gradient(rgba(96,165,250,.07) 1px, transparent 1px) 0 0 / 24px 24px,
    linear-gradient(90deg, rgba(96,165,250,.07) 1px, transparent 1px) 0 0 / 24px 24px,
    radial-gradient(circle at 50% 45%, #13306B 0%, #0A1733 60%, #060E22 100%);
}
.wvisual.futur::after{ content:''; position:absolute; left:0; right:0; top:-30%; height:30%; background:linear-gradient(180deg, transparent, rgba(34,211,238,.10), transparent); animation:mm-scan 5s linear infinite; pointer-events:none; }
@keyframes mm-scan{ to{ transform:translateY(430%); } }
.mm{ position:absolute; inset:0; width:100%; height:100%; }
.mm-hud{ font-size:10px; letter-spacing:.18em; fill:#7DD3FC; font-family:ui-monospace, SFMono-Regular, Menlo, monospace; }
.mm-blink{ fill:#22D3EE; animation:mm-blink 1.2s steps(2, start) infinite; }
@keyframes mm-blink{ to{ visibility:hidden; } }
.mm-line{ fill:none; stroke-width:1.5; opacity:.25; }
.mm-flow{ fill:none; stroke-width:1.5; stroke-dasharray:3 9; stroke-linecap:round; opacity:.8; animation:mm-dash 1s linear infinite; }
@keyframes mm-dash{ to{ stroke-dashoffset:-12; } }
.desk-halo{ fill:none; stroke-width:3; opacity:0; }
.desk-floor{ fill:#7F9CC9; stroke-width:1.2; }
.desk-grid{ stroke:rgba(255,255,255,.2); stroke-width:.8; }
.desk-wall-l{ fill:#DCE7F8; }
.desk-wall-r{ fill:#B9CDEE; }
.desk-rim{ fill:none; stroke:#fff; stroke-width:2; stroke-linejoin:round; }
.desk-top{ fill:#EFA863; }
.desk-front{ fill:#B8683D; }
.desk-side{ fill:#9A5531; }
.desk-seam{ stroke:#8E4C2B; stroke-width:.8; }
.desk-knob{ stroke:#F4D2AE; stroke-width:1.4; stroke-linecap:round; }
.desk-baht{ font-size:7px; font-weight:800; }
.desk-hang{ stroke:#9FB3D9; stroke-width:1; }
.desk-sign{ text-anchor:middle; font-size:10.5px; font-weight:800; fill:#06122B; }
.desk-cap{ text-anchor:middle; font-size:9.5px; font-weight:600; fill:#9FB3D9; }
.coin-t{ text-anchor:middle; font-size:5.5px; font-weight:800; fill:#7A4A00; }
.bill-t{ text-anchor:middle; font-size:5px; font-weight:800; fill:#065F46; }
.bub-t{ text-anchor:middle; font-size:6.5px; font-weight:800; fill:#7C5CE0; }
.desk-typing{ animation:desk-type .35s ease-in-out infinite alternate; }
@keyframes desk-type{ to{ transform:translateY(-1.2px); } }
.desk-leaf{ transform-box:fill-box; transform-origin:50% 100%; animation:iso-sway 3s ease-in-out infinite alternate; }
.scr-seq{ animation:scr-seq 2.4s steps(1) infinite; }
@keyframes scr-seq{ 0%,30%{ opacity:.2; } 31%,100%{ opacity:1; } }
.scr-arrow{ animation:scr-arrow 1s ease-in-out infinite alternate; }
@keyframes scr-arrow{ to{ transform:translateX(2px); } }
.scr-bar{ transform-box:fill-box; transform-origin:50% 100%; animation:scr-bar 1.3s ease-in-out infinite alternate; }
@keyframes scr-bar{ from{ transform:scaleY(.35); } to{ transform:scaleY(1); } }
.ar-coin{ opacity:0; animation:ar-coin 2.4s ease-in infinite; }
@keyframes ar-coin{ 0%{ opacity:0; transform:translate(-22px,-34px); } 15%{ opacity:1; } 70%{ opacity:1; transform:translate(0,0); } 85%,100%{ opacity:0; transform:translate(0,0); } }
.ar-plus{ font-size:8px; font-weight:800; fill:#34D399; opacity:0; animation:ar-plus 2.4s ease-out infinite; }
@keyframes ar-plus{ 0%,62%{ opacity:0; transform:translateY(4px); } 72%{ opacity:1; } 100%{ opacity:0; transform:translateY(-10px); } }
.ap-bill{ opacity:0; animation:ap-bill 2.8s ease-in-out infinite; }
@keyframes ap-bill{ 0%{ opacity:0; transform:translate(0,0); } 15%{ opacity:1; } 75%{ opacity:1; transform:translate(12px,12px); } 90%,100%{ opacity:0; transform:translate(12px,12px); } }
.bub{ opacity:0; transform-box:fill-box; transform-origin:50% 100%; animation:bub 4s ease-in-out infinite; }
.bub-b{ animation-delay:2s; }
@keyframes bub{ 0%{ opacity:0; transform:scale(.6); } 8%,40%{ opacity:1; transform:scale(1); } 48%,100%{ opacity:0; transform:scale(.6); } }
.gl-pen{ animation:gl-pen .6s ease-in-out infinite alternate; }
@keyframes gl-pen{ to{ transform:translate(3px,1.5px); } }
.gl-tick{ opacity:0; animation:gl-tick 1.6s ease-out infinite; }
@keyframes gl-tick{ 0%,20%{ opacity:0; } 35%,80%{ opacity:1; } 100%{ opacity:0; } }
.mm-legend line{ stroke-width:2; }
.mm-legend text{ font-size:10px; fill:#9FB3D9; }
@media (prefers-reduced-motion: reduce){
  .mm-p, .desk-halo{ display:none; }
  .mm *{ animation:none !important; }
  .ar-coin, .ar-plus, .ap-bill, .bub, .gl-tick{ opacity:1; }
  .mm-flow, .mm-blink, .wvisual.futur::after{ animation:none; }
}

.sub-h{ font-size:15px; font-weight:600; margin:22px 0 10px !important; }
.docs{ display:flex; flex-wrap:wrap; gap:8px; }
.doc{ font-size:12.5px; padding:5px 12px; border-radius:9999px; background:var(--surface); border:1px solid var(--bl); color:var(--t2); }

.opt-list{ list-style:none; margin:22px 0 0; padding:0; display:flex; flex-direction:column; gap:14px; }
.opt-list li{ display:flex; gap:12px; align-items:flex-start; }
.opt-ic{ width:32px; height:32px; border-radius:10px; background:var(--blue50); border:1px solid var(--blue100); display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
.opt-list div{ display:flex; flex-direction:column; gap:2px; }
.opt-list b{ font-size:15px; color:var(--t1); }
.opt-list span{ font-size:13px; color:var(--t3); }
.wbtns-row{ display:flex; gap:10px; }
.wbtns .wbtns-row .wz-btn{ flex:1; width:auto; min-width:0; padding-left:10px; padding-right:10px; }

/* Step 3 — isometric teamwork scene */
.iso{ position:absolute; inset:0; width:100%; height:100%; }
.iso-float > *{ fill:#fff; opacity:.7; animation:iso-drift 6s ease-in-out infinite alternate; }
.iso-float > :nth-child(2){ animation-delay:-2s; }
.iso-float > :nth-child(3){ animation-delay:-4s; }
.iso-float > :nth-child(4){ animation-delay:-1s; }
@keyframes iso-drift{ to{ transform:translateY(-12px); } }
.iso-floor{ fill:#fff; opacity:.85; stroke:#C9DAF5; stroke-width:1.2; }
.iso-floor-in{ fill:none; stroke:#C9DAF5; stroke-dasharray:4 6; }
.iso-gear{ fill:#1C70F7; transform-box:fill-box; transform-origin:center; animation:iso-spin 12s linear infinite; }
.iso-gear-hole{ fill:#EAF2FF; }
@keyframes iso-spin{ to{ transform:rotate(360deg); } }
.iso-top{ fill:#fff; stroke:#DCE6F5; }
.iso-left{ fill:#F4F8FF; stroke:#DCE6F5; }
.iso-right{ fill:#C9DAF5; }
.iso-seam{ stroke:#C9DAF5; stroke-width:1.2; }
.iso-handle{ stroke:#1E3A8A; stroke-width:2.2; stroke-linecap:round; }
.iso-cubby{ fill:#1E3A8A; opacity:.8; }
.iso-leaves{ transform-box:fill-box; transform-origin:50% 100%; animation:iso-sway 3s ease-in-out infinite alternate; }
@keyframes iso-sway{ from{ transform:rotate(-5deg); } to{ transform:rotate(5deg); } }
.iso-glow{ transform-box:fill-box; transform-origin:center; animation:iso-glow 2.4s ease-in-out infinite; }
@keyframes iso-glow{ 0%,100%{ opacity:.2; transform:scale(.85); } 50%{ opacity:.65; transform:scale(1.15); } }
.iso-arm{ fill:none; stroke-width:6.5; stroke-linecap:round; }
.iso-bob{ animation:iso-bob 1.8s ease-in-out infinite alternate; }
@keyframes iso-bob{ to{ transform:translateY(-3px); } }
.iso-lean{ animation:iso-lean 5s ease-in-out infinite; }
@keyframes iso-lean{ 0%,15%,85%,100%{ transform:translate(0,0); } 40%,62%{ transform:translate(var(--lx), var(--ly)); } }
.iso-pz{ animation:iso-fit 5s cubic-bezier(.5,0,.3,1) infinite; }
@keyframes iso-fit{ 0%,15%{ transform:translate(0,0); } 45%,65%{ transform:translate(var(--dx), var(--dy)); } 88%,100%{ transform:translate(0,0); } }
.iso-spark{ opacity:0; transform-box:fill-box; transform-origin:center; animation:iso-spark 5s ease-out infinite; }
@keyframes iso-spark{ 0%,44%{ opacity:0; transform:scale(0) rotate(0); } 52%{ opacity:1; transform:scale(1.2) rotate(45deg); } 66%,100%{ opacity:0; transform:scale(0) rotate(90deg); } }
.iso-badge{ opacity:0; transform-box:fill-box; transform-origin:center; animation:iso-badge 5s ease-out infinite; }
@keyframes iso-badge{ 0%,46%{ opacity:0; transform:translateY(8px) scale(.8); } 52%,78%{ opacity:1; transform:translateY(0) scale(1); } 86%,100%{ opacity:0; transform:translateY(-6px) scale(.95); } }
.iso-badge-t{ text-anchor:middle; font-size:12px; font-weight:700; fill:#fff; }
.iso-cap{ text-anchor:middle; font-size:11.5px; font-weight:600; fill:#3B63B8; }
@media (prefers-reduced-motion: reduce){
  .iso *{ animation:none !important; }
  .iso-badge{ opacity:1; }
}
.warn{ margin-top:12px; font-size:13px; padding:10px 14px; border-radius:10px; background:var(--yellow-bg); border:1px solid var(--yellow-bd); }
.help{ display:flex; flex-wrap:wrap; gap:6px 10px; align-items:center; margin-top:16px; font-size:13px; color:var(--t3); }
.note{ color:var(--green); }
.linklike{ background:none; border:none; padding:0; font:inherit; color:var(--blue600); cursor:pointer; text-decoration:underline; text-underline-offset:2px; }


@media (max-width:640px){
  .dlg-backdrop{ padding:0; align-items:flex-end; }
  .dlg{ height:100%; max-width:100%; border-radius:0; }
  .dlg-steps{ padding:14px 56px 10px 16px; }
  .dlg-steps button{ font-size:11.5px; flex-direction:column; gap:4px; }
  .dlg-body h2{ font-size:22px; }

  .wtext{ padding:24px 20px; }
  .wnum-list{ margin-top:20px; gap:14px; }
  .wvisual{ display:none; }
}
</style>
