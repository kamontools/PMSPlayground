<template>
  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <div class="content-wrapper">
        <header class="page-header">
          <h1 class="page-title">ERP Components Bible</h1>
          <p class="page-subtitle">Design System Documentation</p>
        </header>

        <section class="content-section">
          <h2>Overview</h2>
          <p>The ERP Components Bible is a comprehensive design system extracted from the Figma file "A00-ERP-Components-Bible". This documentation serves as the single source of truth for implementing UI components consistently across the ERP application.</p>
          
          <h3>Purpose</h3>
          <p>This design system provides:</p>
          <ul>
            <li>Reusable component specifications</li>
            <li>Design tokens (colors, typography, spacing)</li>
            <li>Implementation guidelines for Vue.js and PrimeVue v3</li>
            <li>Accessibility standards</li>
            <li>Usage patterns and best practices</li>
          </ul>

          <h3>Framework Reference</h3>
          <p>All components are built using <a href="https://v3.primevue.org/introduction/" target="_blank" rel="noopener">PrimeVue v3</a> as the base framework, with customization through Pass Through API to match the extracted design tokens.</p>

          <h3>Design Tokens</h3>
          <p>The design system includes:</p>
          <ul>
            <li><strong>Colors:</strong> Primary, secondary, semantic, and greyscale palettes</li>
            <li><strong>Typography:</strong> Sarabun font family with defined sizes, weights, and line heights</li>
            <li><strong>Spacing:</strong> 4px-based spacing scale</li>
            <li><strong>Visual Styles:</strong> Border radius, shadows, and elevation system</li>
          </ul>

          <h3>Getting Started</h3>
          <p>Navigate through the sidebar to explore:</p>
          <ul>
            <li><strong>Getting Started:</strong> Design principles, color system, typography, and spacing</li>
            <li><strong>Components:</strong> Individual component documentation with variants, usage, and code examples</li>
            <li><strong>Visual Styles:</strong> Borders, shadows, and elevation guidelines</li>
            <li><strong>Patterns:</strong> Interaction patterns and accessibility considerations</li>
          </ul>
        </section>

        <section class="content-section">
          <h2>Quick Links</h2>
          <div class="quick-links">
            <router-link to="/components/inputtext" class="quick-link-card">
              <h3>InputText</h3>
              <p>Text input component with validation states</p>
            </router-link>
            <router-link to="/components/button" class="quick-link-card">
              <h3>Button</h3>
              <p>Primary and secondary button variants</p>
            </router-link>
            <router-link to="/components/modal" class="quick-link-card">
              <h3>Modal</h3>
              <p>Dialog and notification modals</p>
            </router-link>
            <router-link to="/pages/color-system" class="quick-link-card">
              <h3>Color System</h3>
              <p>Complete color palette and usage rules</p>
            </router-link>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  background: var(--color-white);
  min-height: 100vh;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-dividers);
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 20px;
}

.content-section {
  margin-bottom: 30px;
}

.content-section h2 {
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  color: var(--color-text-primary);
  margin-bottom: 16px;
  margin-top: 24px;
}

.content-section h2:first-child {
  margin-top: 0;
}

.content-section h3 {
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: var(--color-text-primary);
  margin-bottom: 12px;
  margin-top: 20px;
}

.content-section p {
  margin-bottom: 12px;
  line-height: 20px;
  color: var(--color-text-primary);
}

.content-section ul {
  margin-bottom: 12px;
  padding-left: 24px;
}

.content-section li {
  margin-bottom: 4px;
  line-height: 20px;
}

.content-section a {
  color: var(--color-primary-500);
  text-decoration: none;
}

.content-section a:hover {
  color: var(--color-primary-click);
  text-decoration: underline;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.quick-link-card {
  display: block;
  padding: 16px;
  border: 1px solid var(--color-stroke);
  border-radius: 6px;
  background: var(--color-white);
  text-decoration: none;
  transition: all 0.2s ease;
}

.quick-link-card:hover {
  border-color: var(--color-primary-500);
  box-shadow: 0px 4px 10px 0px rgba(132, 132, 132, 0.1);
  transform: translateY(-2px);
}

.quick-link-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.quick-link-card p {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
}
</style>

