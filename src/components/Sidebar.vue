<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="sidebar-title">ERP Components</h1>
      <p class="sidebar-subtitle">Design System</p>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h2 class="nav-section-title">Getting Started</h2>
        <ul class="nav-list">
          <li>
            <router-link to="/" class="nav-link" exact-active-class="active">
              Overview
            </router-link>
          </li>
          <li>
            <router-link to="/pages/design-principles" class="nav-link" active-class="active">
              Design Principles
            </router-link>
          </li>
          <li>
            <router-link to="/pages/color-system" class="nav-link" active-class="active">
              Color System
            </router-link>
          </li>
          <li>
            <router-link to="/pages/typography" class="nav-link" active-class="active">
              Typography
            </router-link>
          </li>
          <li>
            <router-link to="/pages/spacing" class="nav-link" active-class="active">
              Spacing & Layout
            </router-link>
          </li>
        </ul>
      </div>
      
      <div class="nav-section">
        <h2 class="nav-section-title">Components</h2>
        <ul class="nav-list">
          <li v-for="component in components" :key="component.id">
            <router-link 
              :to="`/components/${component.id}`" 
              class="nav-link"
              active-class="active"
            >
              {{ component.name }}
            </router-link>
          </li>
        </ul>
      </div>
      
      <div class="nav-section">
        <h2 class="nav-section-title">Visual Styles</h2>
        <ul class="nav-list">
          <li>
            <router-link to="/pages/borders" class="nav-link" active-class="active">
              Borders & Radius
            </router-link>
          </li>
          <li>
            <router-link to="/pages/shadows" class="nav-link" active-class="active">
              Shadows
            </router-link>
          </li>
          <li>
            <router-link to="/pages/elevation" class="nav-link" active-class="active">
              Elevation
            </router-link>
          </li>
        </ul>
      </div>
      
      <div class="nav-section">
        <h2 class="nav-section-title">Patterns</h2>
        <ul class="nav-list">
          <li>
            <router-link to="/pages/interaction-patterns" class="nav-link" active-class="active">
              Interaction Patterns
            </router-link>
          </li>
          <li>
            <router-link to="/pages/accessibility" class="nav-link" active-class="active">
              Accessibility
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const components = ref([
  { id: 'autocomplete', name: 'AutoComplete' },
  { id: 'button', name: 'Button' },
  { id: 'calendar', name: 'Calendar' },
  { id: 'checkbox', name: 'Checkbox' },
  { id: 'dropdown', name: 'Dropdown' },
  { id: 'header', name: 'Header' },
  { id: 'inline-message', name: 'InlineMessage' },
  { id: 'input-switch', name: 'InputSwitch' },
  { id: 'inputtext', name: 'InputText' },
  { id: 'modal', name: 'Modal' },
  { id: 'search-box', name: 'SearchBox' },
  { id: 'tag', name: 'Tag' }
])

// Optionally fetch from API
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/components')
    const data = await response.json()
    if (data.components) {
      components.value = data.components.map(c => ({
        id: c.id,
        name: c.name
      })).sort((a, b) => a.name.localeCompare(b.name))
    }
  } catch (error) {
    console.log('Using default components list')
  }
})
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: #FFFFFF;
  border-right: 1px solid #E4E7ED;
  overflow-y: auto;
  z-index: 100;
}

.sidebar-header {
  padding: 20px 16px;
  border-bottom: 1px solid #E4E7ED;
  background: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 10;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  color: #181819;
  margin-bottom: 4px;
}

.sidebar-subtitle {
  font-size: 12px;
  color: #585A5C;
  margin: 0;
}

.sidebar-nav {
  padding: 16px 0;
}

.nav-section {
  margin-bottom: 24px;
}

.nav-section-title {
  font-size: 12px;
  font-weight: 700;
  color: #585A5C;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 16px;
  margin-bottom: 8px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin: 0;
}

.nav-link {
  display: block;
  padding: 8px 16px;
  color: #181819;
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background: #F2F6FC;
  color: #1C70F7;
}

.nav-link.active {
  background: #E9F1FF;
  color: #1C70F7;
  border-left-color: #1C70F7;
  font-weight: 700;
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #CED0D6;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #6E7073;
}
</style>

