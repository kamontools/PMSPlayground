<template>
  <div class="component-example">
    <h3>Primary Button</h3>
    <div class="example-group">
      <button class="btn-primary">บันทึก</button>
      <button class="btn-primary" disabled>บันทึก</button>
      <button class="btn-primary loading">
        <span class="spinner"></span>
        กำลังโหลด...
      </button>
    </div>

    <h3>Secondary Button</h3>
    <div class="example-group">
      <button class="btn-secondary">ยกเลิก</button>
      <button class="btn-secondary" disabled>ยกเลิก</button>
    </div>

    <h3>Button with Icon</h3>
    <div class="example-group">
      <button class="btn-primary">
        <span class="icon">+</span>
        เพิ่มใหม่
      </button>
      <button class="btn-secondary">
        <span class="icon">×</span>
        ปิด
      </button>
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
</style>

