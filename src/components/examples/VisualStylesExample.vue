<template>
  <div class="component-example">
    <h3>Border Radius</h3>
    <div class="example-group">
      <div class="radius-box radius-sm">4px</div>
      <div class="radius-box radius-md">6px</div>
      <div class="radius-box radius-lg">8px</div>
      <div class="radius-box radius-xl">12px</div>
    </div>

    <h3>Shadows</h3>
    <div class="example-group">
      <div class="shadow-box shadow-modal">
        <p>Modal Shadow</p>
        <code>0px 4px 10px 0px rgba(132, 132, 132, 0.1)</code>
      </div>
      <div class="shadow-box shadow-header">
        <p>Header Shadow</p>
        <code>2px 2px 5px 0px rgba(0, 0, 0, 0.05)</code>
      </div>
    </div>

    <h3>Colors - Primary</h3>
    <div class="example-group">
      <div class="color-box" style="background: var(--color-primary-500);">
        <span>Primary 500</span>
        <code>#1C70F7</code>
      </div>
      <div class="color-box" style="background: var(--color-primary-click);">
        <span>Primary Click</span>
        <code>#004ECC</code>
      </div>
      <div class="color-box" style="background: var(--color-primary-200);">
        <span>Primary 200</span>
        <code>#E9F1FF</code>
      </div>
    </div>

    <h3>Colors - Semantic</h3>
    <div class="example-group">
      <div class="color-box" style="background: var(--color-error);">
        <span>Error</span>
        <code>#F03737</code>
      </div>
      <div class="color-box" style="background: var(--color-success);">
        <span>Success</span>
        <code>#05A861</code>
      </div>
      <div class="color-box" style="background: var(--color-attention);">
        <span>Attention</span>
        <code>#EE9F00</code>
      </div>
    </div>

    <h3>Colors - Text</h3>
    <div class="example-group">
      <div class="color-box" style="background: var(--color-text-primary); color: white;">
        <span>Text Primary</span>
        <code>#181819</code>
      </div>
      <div class="color-box" style="background: var(--color-text-secondary); color: white;">
        <span>Text Secondary</span>
        <code>#585A5C</code>
      </div>
      <div class="color-box" style="background: var(--color-text-disabled); color: white;">
        <span>Text Disabled</span>
        <code>#84868A</code>
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

.radius-box {
  width: 100px;
  height: 100px;
  background: var(--color-primary-500);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.radius-sm {
  border-radius: var(--radius-sm);
}

.radius-md {
  border-radius: var(--radius-md);
}

.radius-lg {
  border-radius: var(--radius-lg);
}

.radius-xl {
  border-radius: var(--radius-xl);
}

.shadow-box {
  width: 200px;
  height: 150px;
  background: var(--color-white);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  align-items: center;
  justify-content: center;
}

.shadow-box p {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.shadow-box code {
  font-family: monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  background: var(--color-disabled-bg);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
}

.shadow-modal {
  box-shadow: var(--shadow-modal);
}

.shadow-header {
  box-shadow: var(--shadow-header);
}

.color-box {
  width: 150px;
  height: 120px;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-stroke);
}

.color-box span {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.color-box code {
  font-family: monospace;
  font-size: var(--font-size-xs);
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}
</style>

