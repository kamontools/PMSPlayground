<template>
  <div class="component-example">
    <h3>Primary Button</h3>
    <div class="example-group">
      <button class="btn-primary">บันทึก</button>
      <div class="tooltip-wrapper">
        <button class="btn-primary" disabled>บันทึก</button>
        <div class="tooltip">
          <span class="tooltip-icon">{{ currentIcon }}</span>
          <span class="tooltip-text">เนื่องจากเอกสารนี้ ถูกชำระเงินแล้ว</span>
        </div>
      </div>
      <div class="tooltip-wrapper">
        <button class="btn-primary loading">
          <span class="spinner"></span>
          กำลังโหลด...
        </button>
        <div class="tooltip">
          <span class="tooltip-icon">{{ currentIcon }}</span>
          <span class="tooltip-text">เนื่องจากเอกสารนี้ ถูกชำระเงินแล้ว</span>
        </div>
      </div>
    </div>

    <h3>Secondary Button</h3>
    <div class="example-group">
      <button class="btn-secondary">ยกเลิก</button>
      <div class="tooltip-wrapper">
        <button class="btn-secondary" disabled>ยกเลิก</button>
        <div class="tooltip">
          <span class="tooltip-icon">{{ currentIcon }}</span>
          <span class="tooltip-text">เนื่องจากเอกสารนี้ ถูกชำระเงินแล้ว</span>
        </div>
      </div>
    </div>

    <h3>Button with Icon</h3>
    <div class="example-group">
      <button class="btn-primary btn-with-hearts" @click="createHearts">
        <span class="icon">+</span>
        เพิ่มใหม่
        <span
          v-for="(emoji, index) in emojis"
          :key="emoji.id"
          class="heart-emoji"
          :style="emoji.style"
        >
          {{ emoji.icon }}
        </span>
      </button>
      <button class="btn-secondary">
        <span class="icon">×</span>
        ปิด
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentIcon = ref('😂')
let iconInterval = null

const emojis = ref([])
let emojiIdCounter = 0

// Array ของ emoji ที่จะใช้
const emojiList = ['❤️', '🍑', '🍊']

onMounted(() => {
  iconInterval = setInterval(() => {
    currentIcon.value = currentIcon.value === '😂' ? '🙏' : '😂'
  }, 500)
})

onUnmounted(() => {
  if (iconInterval) {
    clearInterval(iconInterval)
  }
})

const createHearts = (event) => {
  const emojiCount = 18
  const delays = []
  
  // สร้าง delay และ trajectory แบบพลุ
  for (let i = 0; i < emojiCount; i++) {
    // delay แบบสุ่มระหว่าง 0-200ms (สั้นลงเพื่อให้จบใน 1.5s)
    delays.push(Math.random() * 200)
  }
  
  delays.forEach((delay, index) => {
    const emojiId = emojiIdCounter++
    
    // เลือก emoji แบบสุ่ม
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)]
    
    // คำนวณ trajectory แบบพลุ (parabolic motion)
    // มุมเริ่มต้น: กระจายทุกทิศทาง - เพิ่มการกระจาย
    const baseAngle = (360 / emojiCount) * index
    const randomOffset = (Math.random() - 0.5) * 80 // เพิ่มจาก 50 เป็น 80
    const angle = baseAngle + randomOffset
    const angleRad = (angle * Math.PI) / 180
    
    // ความเร็วเริ่มต้น (velocity) - เพิ่มขึ้นเพื่อให้กระจายกว้างขึ้น
    const initialVelocity = 180 + Math.random() * 120 // เพิ่มจาก 120-200px เป็น 180-300px
    
    // ตำแหน่ง peak (จุดสูงสุด) - ประมาณ 30% ของ animation
    const peakX = Math.cos(angleRad) * initialVelocity * 0.35
    const peakY = -Math.abs(Math.sin(angleRad)) * initialVelocity * 0.45 // ลบ = ขึ้น
    
    // ตำแหน่งปลายทาง (ตกลงมา) - เพิ่มระยะทางให้กว้างขึ้น
    const finalX = Math.cos(angleRad) * initialVelocity * 1.6 // เพิ่มจาก 1.1 เป็น 1.6
    const finalY = Math.abs(Math.sin(angleRad)) * initialVelocity * 1.8 + 80 // เพิ่มจาก 1.4 เป็น 1.8 และ offset จาก 50 เป็น 80
    
    // การหมุน
    const rotation = 360 + (Math.random() - 0.5) * 720
    
    emojis.value.push({
      id: emojiId,
      icon: emoji,
      style: {
        '--delay': `${delay}ms`,
        '--peak-x': `${peakX}px`,
        '--peak-y': `${peakY}px`,
        '--final-x': `${finalX}px`,
        '--final-y': `${finalY}px`,
        '--rotation': `${rotation}deg`,
        left: '50%',
        top: '50%'
      }
    })
    
    // ลบ emoji หลังจาก animation เสร็จ (1500ms + delay)
    setTimeout(() => {
      emojis.value = emojis.value.filter(e => e.id !== emojiId)
    }, 1500 + delay)
  })
}
</script>

<style scoped>
.component-example {
  margin-bottom: var(--spacing-3xl);
}

.component-example h3 {
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  font-weight: 700;
  line-height: var(--line-height-xs);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.component-example h3:first-child {
  margin-top: 0;
}

.example-group {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.btn-primary {
  height: 40px;
  padding: 10px 16px;
  background: var(--color-primary-500);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 400;
  line-height: var(--line-height-sm);
  color: var(--color-white);
  letter-spacing: 0.14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-click);
}

.btn-primary:active:not(:disabled) {
  background: var(--color-primary-click);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary .spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--color-white);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn-secondary {
  height: 48px;
  padding: 12px 20px;
  background: var(--color-white);
  border: 1px solid var(--color-text-secondary);
  border-radius: var(--radius-lg);
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  font-weight: 400;
  line-height: var(--line-height-md);
  color: var(--color-text-secondary);
  letter-spacing: 0.08px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s ease;
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-disabled-bg);
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary .icon,
.btn-secondary .icon {
  font-size: 16px;
  font-weight: 700;
}

.btn-with-hearts {
  position: relative;
  overflow: visible;
}

.heart-emoji {
  position: absolute;
  font-size: 20px;
  pointer-events: none;
  z-index: 1000;
  animation: heartFirework 1.5s var(--delay, 0ms) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  transform: translate(-50%, -50%);
}

@keyframes heartFirework {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, -50%) 
              translateX(calc(var(--peak-x, 0px) * 0.3))
              translateY(calc(var(--peak-y, 0px) * 0.3))
              scale(0.85)
              rotate(calc(var(--rotation, 0deg) * 0.2));
  }
  /* Peak position - จุดสูงสุด (ขึ้นไป) */
  32% {
    opacity: 1;
    transform: translate(-50%, -50%) 
              translateX(var(--peak-x, 0px))
              translateY(var(--peak-y, 0px))
              scale(1.3)
              rotate(calc(var(--rotation, 0deg) * 0.45));
  }
  /* Spring effect - กระเด้งเบาๆ */
  36% {
    opacity: 1;
    transform: translate(-50%, -50%) 
              translateX(var(--peak-x, 0px))
              translateY(calc(var(--peak-y, 0px) - 3px))
              scale(1.25)
              rotate(calc(var(--rotation, 0deg) * 0.48));
  }
  40% {
    opacity: 1;
    transform: translate(-50%, -50%) 
              translateX(var(--peak-x, 0px))
              translateY(var(--peak-y, 0px))
              scale(1.28)
              rotate(calc(var(--rotation, 0deg) * 0.5));
  }
  /* เริ่มตกลงมา */
  55% {
    opacity: 1;
    transform: translate(-50%, -50%) 
              translateX(calc(var(--peak-x, 0px) + (var(--final-x, 0px) - var(--peak-x, 0px)) * 0.3))
              translateY(calc(var(--peak-y, 0px) + (var(--final-y, 0px) - var(--peak-y, 0px)) * 0.3))
              scale(1.15)
              rotate(calc(var(--rotation, 0deg) * 0.65));
  }
  75% {
    opacity: 0.95;
    transform: translate(-50%, -50%) 
              translateX(calc(var(--peak-x, 0px) + (var(--final-x, 0px) - var(--peak-x, 0px)) * 0.65))
              translateY(calc(var(--peak-y, 0px) + (var(--final-y, 0px) - var(--peak-y, 0px)) * 0.65))
              scale(0.95)
              rotate(calc(var(--rotation, 0deg) * 0.82));
  }
  90% {
    opacity: 0.7;
    transform: translate(-50%, -50%) 
              translateX(calc(var(--final-x, 0px) * 0.98))
              translateY(calc(var(--final-y, 0px) * 0.98))
              scale(0.75)
              rotate(calc(var(--rotation, 0deg) * 0.92));
  }
  /* Spring effect เมื่อตกลงพื้น - เบาๆ */
  94% {
    opacity: 0.5;
    transform: translate(-50%, -50%) 
              translateX(var(--final-x, 0px))
              translateY(calc(var(--final-y, 0px) + 2px))
              scale(0.7)
              rotate(calc(var(--rotation, 0deg) * 0.95));
  }
  97% {
    opacity: 0.3;
    transform: translate(-50%, -50%) 
              translateX(var(--final-x, 0px))
              translateY(calc(var(--final-y, 0px) - 1px))
              scale(0.65)
              rotate(calc(var(--rotation, 0deg) * 0.97));
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) 
              translateX(var(--final-x, 0px))
              translateY(var(--final-y, 0px))
              scale(0.5)
              rotate(var(--rotation, 0deg));
  }
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-wrapper:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #2d2d2d;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-xs);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #2d2d2d;
}

.tooltip-icon {
  font-size: 20px;
  line-height: 1;
}

.tooltip-text {
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
}
</style>

