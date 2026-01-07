<template>
  <div class="component-example">
    <h3>Calendar / Date Picker - Enabled</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">วันที่เริ่มต้น</label>
        <div class="calendar-input">
          <input type="text" class="calendar-text" placeholder="dd/mm/yyyy" />
          <button class="calendar-icon-btn">
            <span class="calendar-icon">📅</span>
          </button>
        </div>
      </div>
    </div>

    <h3>Calendar / Date Picker - Disabled</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">วันที่สิ้นสุด</label>
        <div class="calendar-input disabled">
          <input type="text" class="calendar-text" placeholder="dd/mm/yyyy" disabled />
          <button class="calendar-icon-btn" disabled>
            <span class="calendar-icon">📅</span>
          </button>
        </div>
      </div>
    </div>

    <h3>Calendar / Date Picker - Error State</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">
          วันที่
          <span class="required-indicator">*</span>
        </label>
        <div class="calendar-input error">
          <input type="text" class="calendar-text" placeholder="dd/mm/yyyy" />
          <button class="calendar-icon-btn">
            <span class="calendar-icon">📅</span>
          </button>
        </div>
        <span class="error-message">กรุณาเลือกวันที่</span>
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

.calendar-input {
  height: 40px;
  display: flex;
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.calendar-input:focus-within {
  border-color: var(--color-primary-500);
}

.calendar-input.error {
  border-color: var(--color-error);
}

.calendar-input.disabled {
  background: var(--color-disabled-bg);
  border-color: var(--color-stroke);
}

.calendar-text {
  flex: 1;
  height: 100%;
  padding: 8px 12px;
  border: none;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  color: var(--color-text-primary);
  background: transparent;
}

.calendar-text:focus {
  outline: none;
}

.calendar-text::placeholder {
  color: var(--color-text-placeholder);
}

.calendar-text:disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.calendar-icon-btn {
  width: 40px;
  height: 40px;
  background: var(--color-primary-500);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.calendar-icon-btn:hover:not(:disabled) {
  background: var(--color-primary-click);
}

.calendar-icon-btn:disabled {
  background: var(--color-disabled-bg);
  cursor: not-allowed;
}

.calendar-icon {
  font-size: 16px;
  color: var(--color-white);
}

.calendar-icon-btn:disabled .calendar-icon {
  color: var(--color-text-disabled);
}

.error-message {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-error);
}
</style>

