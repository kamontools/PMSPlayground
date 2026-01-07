<template>
  <div class="component-example">
    <h3>InputSwitch - Enabled</h3>
    <div class="example-group">
      <div class="switch-wrapper">
        <div class="switch" :class="{ checked: switch1 }" @click="switch1 = !switch1">
          <div class="switch-handle"></div>
        </div>
        <label class="switch-label">เปิดใช้งาน</label>
      </div>
      <div class="switch-wrapper">
        <div class="switch checked" :class="{ checked: switch2 }" @click="switch2 = !switch2">
          <div class="switch-handle"></div>
        </div>
        <label class="switch-label">เปิดใช้งาน</label>
      </div>
    </div>

    <h3>InputSwitch - Disabled</h3>
    <div class="example-group">
      <div class="switch-wrapper">
        <div class="switch disabled">
          <div class="switch-handle"></div>
        </div>
        <label class="switch-label disabled">ปิดใช้งาน</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switch1 = ref(false)
const switch2 = ref(true)
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
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.switch-wrapper {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.switch {
  width: 44px;
  height: 24px;
  border-radius: 28px;
  background: #9FA9B7;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.switch.checked {
  background: var(--color-primary-500);
}

.switch.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.switch-handle {
  width: 18px;
  height: 18px;
  border-radius: 22px;
  background: var(--color-white);
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.2s ease;
}

.switch.checked .switch-handle {
  transform: translateX(20px);
}

.switch-label {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 400;
  line-height: var(--line-height-xs);
  color: var(--color-text-primary);
}

.switch-label.disabled {
  color: var(--color-text-disabled);
}
</style>

