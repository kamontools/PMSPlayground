<template>
  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <div class="content-wrapper">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
          <header class="page-header">
            <h1 class="page-title">{{ componentName }}</h1>
            <p class="page-subtitle">Component Documentation</p>
          </header>
          
          <section class="content-section">
            <div class="component-overview">
              <h2>Overview</h2>
              <p>Component documentation for {{ componentName }}. This component follows the ERP Components Bible design system specifications.</p>
            </div>
          </section>
          
          <section class="content-section">
            <h2>Examples</h2>
            <div class="component-examples">
              <component :is="exampleComponent" v-if="exampleComponent" />
            </div>
          </section>
          
          <section class="content-section">
            <h2>Implementation</h2>
            <p>This component is built using PrimeVue v3 with custom styling to match the design system.</p>
            <p>Full documentation coming soon...</p>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, shallowRef } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import ButtonExample from '../components/examples/ButtonExample.vue'
import InputExample from '../components/examples/InputExample.vue'
import DropdownExample from '../components/examples/DropdownExample.vue'
import CheckboxExample from '../components/examples/CheckboxExample.vue'
import TagExample from '../components/examples/TagExample.vue'
import InlineMessageExample from '../components/examples/InlineMessageExample.vue'
import VisualStylesExample from '../components/examples/VisualStylesExample.vue'
import SwitchExample from '../components/examples/SwitchExample.vue'
import CalendarExample from '../components/examples/CalendarExample.vue'

const props = defineProps({
  id: String
})

const loading = ref(true)
const error = ref(null)
const componentData = ref(null)

const componentMap = {
  'button': ButtonExample,
  'inputtext': InputExample,
  'input': InputExample,
  'dropdown': DropdownExample,
  'checkbox': CheckboxExample,
  'tag': TagExample,
  'inlinemessage': InlineMessageExample,
  'visual-styles': VisualStylesExample,
  'borders': VisualStylesExample,
  'shadows': VisualStylesExample,
  'colors': VisualStylesExample,
  'switch': SwitchExample,
  'inputswitch': SwitchExample,
  'calendar': CalendarExample,
  'datepicker': CalendarExample
}

const exampleComponent = computed(() => {
  const componentId = props.id?.toLowerCase()
  return componentMap[componentId] || null
})

const componentName = computed(() => {
  if (componentData.value) {
    return componentData.value.name
  }
  return props.id ? props.id.charAt(0).toUpperCase() + props.id.slice(1).replace(/-/g, ' ') : 'Component'
})

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/components/${props.id}`)
    if (!response.ok) throw new Error('Component not found')
    componentData.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
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

.page-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 20px;
}

.content-section {
  margin-bottom: 30px;
}

.component-overview {
  background: var(--color-disabled-bg);
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 24px;
}

.component-examples {
  background: var(--color-white);
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  margin-top: var(--spacing-md);
}

.loading, .error {
  padding: 24px;
  text-align: center;
}
</style>

