<template>
  <div class="component-example">
    <h3>Inline Message</h3>
    <div class="example-group">
      <div class="inline-message">
        <span class="inline-message-icon">ℹ</span>
        <span class="inline-message-text">
          <span class="inline-message-bold">ใช้งานอยู่ :</span> T-001 : โครงการนิติบุคคล หมื่นสิริ คอนโดมิเนียม เขตบางนา จังหวัดชลบุรี อำเภอบางแสน 21002
        </span>
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

.inline-message {
  height: 32px;
  border-radius: var(--radius-md);
  background: #F4F7FD;
  padding: 6px 12px;
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  width: 100%;
  max-width: 552px;
}

.inline-message-icon {
  width: 20px;
  height: 20px;
  color: #175BCA;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.inline-message-text {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-xs);
  color: #175BCA;
}

.inline-message-bold {
  font-weight: 700;
}
</style>

