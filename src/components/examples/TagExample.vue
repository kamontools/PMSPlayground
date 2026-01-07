<template>
  <div class="component-example">
    <h3>Tag Variants</h3>
    <div class="example-group">
      <span class="tag tag-ready">
        <span class="tag-dot"></span>
        พร้อมใช้งาน
      </span>
      <span class="tag tag-sold">
        <span class="tag-dot"></span>
        ขายแล้ว
      </span>
      <span class="tag tag-missing">
        <span class="tag-dot"></span>
        หาย
      </span>
      <span class="tag tag-broken">
        <span class="tag-dot"></span>
        เสียหาย
      </span>
      <span class="tag tag-spare">
        <span class="tag-dot"></span>
        สำรอง
      </span>
      <span class="tag tag-other">
        <span class="tag-dot"></span>
        อื่นๆ
      </span>
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

.tag {
  padding: 1px 12px;
  border-radius: var(--radius-lg);
  display: inline-flex;
  gap: 7px;
  align-items: center;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  letter-spacing: 0.14px;
}

.tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.tag-ready {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.tag-ready .tag-dot {
  background: var(--color-success);
}

.tag-sold {
  background: var(--color-disabled-bg);
  color: var(--color-text-disabled);
}

.tag-sold .tag-dot {
  background: var(--color-text-disabled);
}

.tag-missing {
  background: var(--color-error-bg);
  color: var(--color-error-hover);
}

.tag-missing .tag-dot {
  background: var(--color-error-hover);
}

.tag-broken {
  background: var(--color-attention-bg);
  color: var(--color-attention);
}

.tag-broken .tag-dot {
  background: var(--color-attention);
}

.tag-spare {
  background: var(--color-primary-200);
  color: var(--color-primary-click);
}

.tag-spare .tag-dot {
  background: var(--color-primary-click);
}

.tag-other {
  background: #E5F9FF;
  color: #4DD8FF;
}

.tag-other .tag-dot {
  background: #4DD8FF;
}
</style>

