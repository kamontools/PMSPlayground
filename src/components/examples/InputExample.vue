<template>
  <div class="component-example">
    <h3>InputText - Enabled</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">ชื่อ</label>
        <input type="text" class="input-text" placeholder="กรุณากรอกชื่อ" />
      </div>
      <div class="input-wrapper">
        <label class="input-label">
          อีเมล
          <span class="required-indicator">*</span>
        </label>
        <input type="email" class="input-text" placeholder="example@email.com" />
      </div>
    </div>

    <h3>InputText - Disabled</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">ชื่อ</label>
        <input type="text" class="input-text disabled" placeholder="ไม่สามารถแก้ไขได้" disabled />
      </div>
    </div>

    <h3>InputText - Error State</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">
          รหัสผ่าน
          <span class="required-indicator">*</span>
        </label>
        <input type="password" class="input-text error" value="123" />
        <span class="error-message">รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร</span>
      </div>
    </div>

    <h3>InputText - Focused</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">เบอร์โทรศัพท์</label>
        <input type="tel" class="input-text focused" placeholder="08X-XXX-XXXX" />
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

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 300px;
}

.input-label {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 400;
  line-height: var(--line-height-xs);
  color: var(--color-text-primary);
  letter-spacing: 0.14px;
}

.required-indicator {
  color: var(--color-error);
  margin-left: 2px;
}

.input-text {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  color: var(--color-text-primary);
  background: var(--color-white);
  transition: border-color 0.2s ease;
}

.input-text::placeholder {
  color: var(--color-text-placeholder);
}

.input-text:focus {
  outline: none;
  border-color: var(--color-primary-500);
}

.input-text.focused {
  border-color: var(--color-primary-500);
}

.input-text.disabled {
  background: var(--color-disabled-bg);
  color: var(--color-text-disabled);
  border-color: var(--color-stroke);
  cursor: not-allowed;
}

.input-text.error {
  border-color: var(--color-error);
}

.error-message {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-error);
}
</style>

