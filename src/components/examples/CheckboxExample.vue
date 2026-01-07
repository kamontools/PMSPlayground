<template>
  <div class="component-example">
    <h3>Checkbox - Unchecked</h3>
    <div class="example-group">
      <div class="checkbox-wrapper">
        <div class="checkbox-group">
          <input type="checkbox" id="checkbox1" class="checkbox-input" />
          <label for="checkbox1" class="checkbox-label">ยอมรับข้อกำหนดและเงื่อนไข</label>
        </div>
      </div>
    </div>

    <h3>Checkbox - Checked</h3>
    <div class="example-group">
      <div class="checkbox-wrapper">
        <div class="checkbox-group">
          <input type="checkbox" id="checkbox2" class="checkbox-input" checked />
          <label for="checkbox2" class="checkbox-label">ยอมรับข้อกำหนดและเงื่อนไข</label>
        </div>
      </div>
    </div>

    <h3>Checkbox - With Helper Text</h3>
    <div class="example-group">
      <div class="checkbox-wrapper">
        <div class="checkbox-group">
          <input type="checkbox" id="checkbox3" class="checkbox-input" />
          <label for="checkbox3" class="checkbox-label">
            รับข่าวสารและโปรโมชั่น
            <span class="info-icon">ℹ</span>
          </label>
        </div>
        <span class="checkbox-helper">เราจะส่งอีเมลแจ้งข่าวสารและโปรโมชั่นให้คุณ</span>
      </div>
    </div>

    <h3>Checkbox - Disabled</h3>
    <div class="example-group">
      <div class="checkbox-wrapper">
        <div class="checkbox-group">
          <input type="checkbox" id="checkbox4" class="checkbox-input" disabled />
          <label for="checkbox4" class="checkbox-label disabled">ตัวเลือกที่ถูกปิดใช้งาน</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  margin-bottom: var(--spacing-xl);
}

.checkbox-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.checkbox-group {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.checkbox-input {
  width: 22px;
  height: 22px;
  border-radius: var(--radius-md);
  border: 2px solid #BCC3CD;
  background: var(--color-white);
  appearance: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}

.checkbox-input:checked {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.checkbox-input:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 700;
}

.checkbox-input:disabled {
  background: var(--color-disabled-bg);
  border-color: #BCC3CD;
  cursor: not-allowed;
}

.checkbox-label {
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  font-weight: 700;
  line-height: var(--line-height-xs);
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.checkbox-label.disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.info-icon {
  width: 20px;
  height: 20px;
  color: var(--color-icons);
  font-size: 14px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.checkbox-helper {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-text-secondary);
  margin-left: 30px;
}
</style>

