<template>
  <div class="component-example">
    <h3>Dropdown - Enabled</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">จังหวัด</label>
        <div class="dropdown">
          <select class="dropdown-select">
            <option value="">เลือกจังหวัด</option>
            <option value="bangkok">กรุงเทพมหานคร</option>
            <option value="chiangmai">เชียงใหม่</option>
            <option value="phuket">ภูเก็ต</option>
          </select>
          <span class="dropdown-icon">▼</span>
        </div>
      </div>
    </div>

    <h3>Dropdown - Disabled</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">จังหวัด</label>
        <div class="dropdown disabled">
          <select class="dropdown-select" disabled>
            <option value="">เลือกจังหวัด</option>
          </select>
          <span class="dropdown-icon">▼</span>
        </div>
      </div>
    </div>

    <h3>Dropdown - Error State</h3>
    <div class="example-group">
      <div class="input-wrapper">
        <label class="input-label">
          จังหวัด
          <span class="required-indicator">*</span>
        </label>
        <div class="dropdown error">
          <select class="dropdown-select">
            <option value="">เลือกจังหวัด</option>
          </select>
          <span class="dropdown-icon">▼</span>
        </div>
        <span class="error-message">กรุณาเลือกจังหวัด</span>
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

.dropdown {
  position: relative;
  height: 40px;
}

.dropdown-select {
  width: 100%;
  height: 40px;
  padding: 8px 40px 8px 12px;
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-lg);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  color: var(--color-text-primary);
  background: var(--color-white);
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.dropdown-select:focus {
  outline: none;
  border-color: var(--color-primary-500);
}

.dropdown-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-icons);
  font-size: 12px;
}

.dropdown.disabled .dropdown-select {
  background: var(--color-disabled-bg);
  color: var(--color-text-disabled);
  border-color: var(--color-stroke);
  cursor: not-allowed;
}

.dropdown.error .dropdown-select {
  border-color: var(--color-error);
}

.error-message {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-error);
}
</style>

