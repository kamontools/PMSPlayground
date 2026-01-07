<template>
  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <div class="content-wrapper">
        <header class="page-header">
          <h1 class="page-title">{{ pageTitle }}</h1>
        </header>
        
        <section class="content-section">
          <p>Page content for {{ id }} coming soon...</p>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const props = defineProps({
  id: String
})

const pageTitle = computed(() => {
  const titles = {
    'design-principles': 'Design Principles',
    'color-system': 'Color System',
    'typography': 'Typography',
    'spacing': 'Spacing & Layout',
    'borders': 'Borders & Radius',
    'shadows': 'Shadows',
    'elevation': 'Elevation',
    'interaction-patterns': 'Interaction Patterns',
    'accessibility': 'Accessibility'
  }
  return titles[props.id] || props.id
})
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

.content-section {
  margin-bottom: 30px;
}
</style>

