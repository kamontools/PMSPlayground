# Design System Guide: ERP Components Bible

> **Source:** Figma file "A00-ERP-Components-Bible" (node 2250:6191)  
> **Framework Reference:** [PrimeVue v3](https://v3.primevue.org/introduction/)

---

## 1. Design Principles

Inferred from visual and layout patterns observed across the design system:

- **Clarity & Readability:** Consistent typographic hierarchy and clear visual separation ensure information is easily digestible
- **Consistency:** Uniform styling for all UI components and predictable layout patterns promote cohesive user experience
- **Efficiency:** Standardized page layouts (Listing, Editing, Import, Report) streamline common workflows and reduce cognitive load
- **Modularity:** Components are reusable, self-contained blocks enabling flexible and scalable interface construction
- **Hierarchy:** Effective use of font sizes, weights, and spatial arrangement guides user attention and communicates information importance

---

## 2. Color System

### Primary Colors

- **Primary 500:** `#1C70F7` - Main brand color for primary actions, interactive elements, focused states
- **Primary Click State:** `#004ECC` - Active/pressed state for primary elements
- **Primary 200:** `#E9F1FF` - Light background variant for primary elements

### Secondary Colors

- **Secondary 500:** `#4DD8FF` - Secondary brand color
- **Secondary 200:** `#E5F9FF` - Light background variant for secondary elements

### Semantic Colors

#### Error
- **Error:** `#F03737` - Error text and borders
- **Error Hover:** `#E00707` - Error hover state
- **Error Background:** `#FFF5F5` - Error message backgrounds

#### Success
- **Success:** `#05A861` - Success text and indicators
- **Success Background:** `#F2FFF9` - Success message backgrounds

#### Attention/Warning
- **Attention:** `#EE9F00` - Warning/attention text
- **Attention Background:** `#FFF8EB` - Warning message backgrounds

### Greyscale Palette

#### Text Colors
- **Text Primary:** `#181819` - Main body text, labels, titles
- **Text Secondary:** `#585A5C` - Secondary information, helper text
- **Text Tertiary:** `#6E7073` - Tertiary information
- **Text Placeholder:** `#B4B4B4` - Placeholder text in inputs
- **Text Disabled:** `#84868A` - Disabled text

#### Background Colors
- **White:** `#FFFFFF` - Primary background, component containers
- **Disabled Background:** `#F2F6FC` - Disabled input backgrounds
- **Inline Message Background:** `#F4F7FD` - Inline message backgrounds

#### Borders & Strokes
- **Stroke:** `#CED0D6` - Default borders and dividers
- **Stroke Disabled:** `#EAEEF4` - Disabled borders
- **Dividers:** `#E4E7ED` - Section dividers
- **Border Default:** `#BCC3CD` - Alternative border color

#### Icons
- **Icons:** `#787A7D` - Default icon color

#### Additional Colors
- **Black:** `#1B1B1B` - Deep black for headers
- **Text Default:** `#212121` - Alternative text color

### Usage Rules & Hierarchy

- **Primary Blue (`#1C70F7`):** Reserved for key interactive elements, primary actions, active states, and focus indicators
- **Neutral Colors:** Form the foundation for content, backgrounds, and non-interactive states
- **Semantic Colors:** Strictly used for their intended purpose (error = red, success = green, attention = orange)
- **Text Hierarchy:** Primary text for main content, secondary for supporting information, tertiary for less important details

---

## 3. Typography System

### Font Family

**Sarabun** - Primary typeface used throughout the system
- **Regular:** Weight 400
- **Bold:** Weight 700

### Font Sizes & Line Heights

| Size | Line Height | Usage | Weight |
|------|-------------|-------|--------|
| 12px | 20px (100%) | Helper text, captions | Regular |
| 14px | 20px, 24px | Body text, labels, buttons, inputs | Regular, Bold |
| 16px | 20px, 42px | Sub titles, checkbox labels | Bold |
| 18px | 32px | Titles, modal titles | Regular |

### Letter Spacing

- **0px** - Default
- **0.08px** - Button text
- **0.14px** - Small body text, inputs
- **0.36px** - Large titles

### Text Styles

#### Title
- **Font:** Sarabun Regular, 18px
- **Line Height:** 32px
- **Color:** `#181819`
- **Usage:** Main page titles, prominent section headings

#### Sub Title
- **Font:** Sarabun Bold, 16px
- **Line Height:** 20px or 42px
- **Color:** `#181819`
- **Usage:** Secondary headings, breadcrumb items, expanded field labels

#### Body
- **Font:** Sarabun Regular, 14px
- **Line Height:** 20px or 24px
- **Color:** `#181819`
- **Usage:** Primary content text, button labels, input text, table data

#### Small Body / Helper Text
- **Font:** Sarabun Regular, 12px
- **Line Height:** 20px
- **Color:** `#585A5C`
- **Usage:** Helper text below inputs, captions, supplementary information

#### Button Text
- **Font:** Sarabun Regular or Bold, 14px
- **Line Height:** 24px
- **Letter Spacing:** 0.14px
- **Usage:** Button labels

#### Error Message
- **Font:** Sarabun Regular, 12px
- **Line Height:** Normal (100%)
- **Color:** `#F03737`
- **Usage:** Validation feedback, error notifications

---

## 4. Spacing & Layout System

### Spacing Scale

Base unit: **4px**

| Value | Usage |
|-------|-------|
| 4px | Minimal gaps (between label and input, tight spacing) |
| 8px | Small gaps (icon to text, within component groups) |
| 10px | Component internal spacing |
| 12px | Medium gaps (form field spacing, component padding) |
| 16px | Standard gaps (between form fields, button padding) |
| 20px | Large gaps (section spacing, modal padding) |
| 24px | Extra large gaps (major section separation, header padding) |
| 30px | Maximum gaps (between major content blocks) |

### Padding Patterns

#### Input Fields
- **Horizontal:** 12px
- **Vertical:** 8px (40px total height)
- **Label to Input Gap:** 4px

#### Buttons
- **Primary Button:** 16px horizontal, 10px vertical (40px total height)
- **Secondary Button:** 20px horizontal, 12px vertical (48px total height)

#### Modals
- **Container Padding:** 20px
- **Content Gap:** 12px, 30px (between sections)

#### Components
- **Internal Padding:** 12px standard
- **Icon Spacing:** 8px from adjacent text

### Margin Patterns

- **Form Field Spacing:** 4px between label and input, 8px between fields
- **Section Spacing:** 24px vertical between major sections
- **Component Groups:** 8px-12px between related components

### Grid & Alignment

- **Page Layouts:** Multi-column structure for component organization
- **Form Alignment:** Labels consistently positioned above inputs
- **Vertical Alignment:** Consistent alignment of related elements
- **Horizontal Alignment:** Left-aligned text, right-aligned action buttons in headers

---

## 5. UI Components & Patterns

### Input Components

#### InputText (Free Text)

**PrimeVue Reference:** [InputText](https://v3.primevue.org/inputtext/)

**Specifications:**
- Height: 40px
- Border radius: 4px
- Border: 1px solid `#CED0D6`
- Background: `#FFFFFF` (enabled), `#F2F6FC` (disabled)
- Padding: 12px horizontal
- Font: Sarabun Regular, 14px, line-height 24px

**States:**
- **Default:** White background, grey border
- **Focused:** Primary blue border (`#1C70F7`)
- **Disabled:** Light grey background (`#F2F6FC`), grey text (`#84868A`), grey border
- **Error:** Red border (`#F03737`), error message below (12px, `#F03737`)

**Vue.js Implementation:**

```vue
<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <InputText
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :disabled="disabled"
      :class="{
        'p-inputtext-error': error,
        'p-inputtext-disabled': disabled
      }"
      :pt="{
        root: {
          class: 'custom-input'
        }
      }"
    />
    <span v-if="error && errorMessage" class="error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'

defineProps({
  modelValue: String,
  label: String,
  required: Boolean,
  disabled: Boolean,
  error: Boolean,
  errorMessage: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #181819;
  letter-spacing: 0.14px;
}

.required-indicator {
  color: #F03737;
}

.custom-input {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #CED0D6;
  border-radius: 4px;
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #181819;
  background: #FFFFFF;
}

.custom-input:focus {
  border-color: #1C70F7;
  outline: none;
}

.p-inputtext-disabled {
  background: #F2F6FC;
  color: #84868A;
  border-color: #CED0D6;
}

.p-inputtext-error {
  border-color: #F03737;
}

.error-message {
  font-family: 'Sarabun', sans-serif;
  font-size: 12px;
  line-height: 20px;
  color: #F03737;
}
</style>
```

#### Dropdown

**PrimeVue Reference:** [Dropdown](https://v3.primevue.org/dropdown/)

**Specifications:**
- Height: 40px
- Border radius: 8px
- Border: 1px solid `#CED0D6`
- Background: `#FFFFFF`
- Padding: 12px horizontal, 8px vertical
- Font: Sarabun Regular, 14px, line-height 24px

**Vue.js Implementation:**

```vue
<template>
  <div class="dropdown-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <Dropdown
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :options="options"
      :disabled="disabled"
      optionLabel="label"
      optionValue="value"
      :pt="{
        root: { class: 'custom-dropdown' },
        input: { class: 'custom-dropdown-input' }
      }"
    />
  </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown'

defineProps({
  modelValue: [String, Number],
  label: String,
  options: Array,
  disabled: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.custom-dropdown {
  height: 40px;
  border-radius: 8px;
}

.custom-dropdown-input {
  padding: 8px 12px;
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #181819;
}
</style>
```

#### Calendar / Date Picker

**PrimeVue Reference:** [Calendar](https://v3.primevue.org/calendar/)

**Specifications:**
- Height: 40px
- Border radius: 8px
- Special variant: Date range picker with calendar icon button (16px icon)
- Icon button background: `#1C70F7`
- Icon color: White

**Vue.js Implementation:**

```vue
<template>
  <div class="calendar-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <Calendar
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :disabled="disabled"
      dateFormat="dd/mm/yy"
      :showIcon="true"
      :pt="{
        root: { class: 'custom-calendar' },
        input: { class: 'custom-calendar-input' }
      }"
    />
  </div>
</template>

<script setup>
import Calendar from 'primevue/calendar'

defineProps({
  modelValue: [Date, Array],
  label: String,
  disabled: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.custom-calendar {
  height: 40px;
  border-radius: 8px;
}

.custom-calendar-input {
  padding: 8px 12px;
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #181819;
}
</style>
```

#### AutoComplete

**PrimeVue Reference:** [AutoComplete](https://v3.primevue.org/autocomplete/)

**Specifications:**
- Height: 40px
- Border radius: 8px
- Search icon: 16px, left side
- Placeholder text: `#B4B4B4`
- Gap between icon and text: 8px

**Vue.js Implementation:**

```vue
<template>
  <div class="autocomplete-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <AutoComplete
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :suggestions="suggestions"
      @complete="search"
      :disabled="disabled"
      :pt="{
        root: { class: 'custom-autocomplete' },
        input: { class: 'custom-autocomplete-input' }
      }"
    >
      <template #inputicon>
        <i class="pi pi-search" style="font-size: 16px; color: #787A7D;"></i>
      </template>
    </AutoComplete>
  </div>
</template>

<script setup>
import AutoComplete from 'primevue/autocomplete'

defineProps({
  modelValue: String,
  label: String,
  suggestions: Array,
  disabled: Boolean
})

defineEmits(['update:modelValue'])

const search = (event) => {
  // Handle search logic
}
</script>

<style scoped>
.custom-autocomplete {
  height: 40px;
  border-radius: 8px;
}

.custom-autocomplete-input {
  padding: 8px 12px;
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #181819;
}
</style>
```

#### Checkbox

**PrimeVue Reference:** [Checkbox](https://v3.primevue.org/checkbox/)

**Specifications:**
- Size: 22px × 22px
- Border radius: 6px
- Border: 2px solid `#BCC3CD` (unchecked)
- Background: `#FFFFFF` (unchecked), `#1C70F7` (checked)
- Checkmark: White when checked
- Label font: Sarabun Bold, 16px, line-height 20px
- Gap between checkbox and label: 8px
- Helper text: Sarabun Regular, 12px, `#585A5C`, 4px gap below label

**Vue.js Implementation:**

```vue
<template>
  <div class="checkbox-wrapper">
    <div class="checkbox-group">
      <Checkbox
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :binary="true"
        :disabled="disabled"
        inputId="checkbox"
        :pt="{
          root: { class: 'custom-checkbox' },
          box: { class: 'custom-checkbox-box' }
        }"
      />
      <label for="checkbox" class="checkbox-label">
        {{ label }}
      </label>
      <i v-if="infoIcon" class="pi pi-info-circle info-icon"></i>
    </div>
    <span v-if="helperText" class="checkbox-helper">{{ helperText }}</span>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox'

defineProps({
  modelValue: Boolean,
  label: String,
  helperText: String,
  infoIcon: Boolean,
  disabled: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.checkbox-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.custom-checkbox-box {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #BCC3CD;
  background: #FFFFFF;
}

.custom-checkbox-box.p-checked {
  background: #1C70F7;
  border-color: #1C70F7;
}

.checkbox-label {
  font-family: 'Sarabun', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #181819;
}

.info-icon {
  width: 20px;
  height: 20px;
  color: #787A7D;
}

.checkbox-helper {
  font-family: 'Sarabun', sans-serif;
  font-size: 12px;
  line-height: 20px;
  color: #585A5C;
  margin-left: 30px;
}
</style>
```

#### InputSwitch

**PrimeVue Reference:** [InputSwitch](https://v3.primevue.org/inputswitch/)

**Specifications:**
- Width: 44px
- Height: 24px
- Border radius: 28px (pill shape)
- Background: `#9FA9B7` (unchecked), `#1C70F7` (checked)
- Handle: 18px × 18px, white, border-radius 22px
- Handle position: 4px from left (unchecked), calculated from right (checked)
- Label font: Sarabun Regular, 14px, line-height 20px, `#181819`
- Gap between switch and label: 8px

**Vue.js Implementation:**

```vue
<template>
  <div class="switch-wrapper">
    <InputSwitch
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :disabled="disabled"
      :pt="{
        root: { class: 'custom-switch' },
        slider: { class: 'custom-switch-slider' }
      }"
    />
    <label v-if="label" class="switch-label">{{ label }}</label>
  </div>
</template>

<script setup>
import InputSwitch from 'primevue/inputswitch'

defineProps({
  modelValue: Boolean,
  label: String,
  disabled: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.switch-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.custom-switch {
  width: 44px;
  height: 24px;
  border-radius: 28px;
}

.custom-switch-slider {
  background: #9FA9B7;
}

.custom-switch-slider.p-checked {
  background: #1C70F7;
}

.switch-label {
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #181819;
}
</style>
```

### Button Components

#### Primary Button

**PrimeVue Reference:** [Button](https://v3.primevue.org/button/)

**Specifications:**
- Height: 40px
- Background: `#1C70F7`
- Border radius: 6px
- Padding: 16px horizontal, 10px vertical
- Font: Sarabun Regular, 14px, line-height 24px
- Color: White
- Letter spacing: 0.14px
- Icon size: 16px (when present)
- Gap between icon and text: 6px

**States:**
- **Default:** `#1C70F7` background
- **Hover:** Darker shade (inferred)
- **Active/Click:** `#004ECC`
- **Disabled:** Lighter background, reduced opacity

**Vue.js Implementation:**

```vue
<template>
  <Button
    :label="label"
    :icon="icon"
    :disabled="disabled"
    :loading="loading"
    @click="$emit('click')"
    :pt="{
      root: { class: 'btn-primary' },
      label: { class: 'btn-primary-label' }
    }"
  />
</template>

<script setup>
import Button from 'primevue/button'

defineProps({
  label: String,
  icon: String,
  disabled: Boolean,
  loading: Boolean
})

defineEmits(['click'])
</script>

<style scoped>
.btn-primary {
  height: 40px;
  padding: 10px 16px;
  background: #1C70F7;
  border: none;
  border-radius: 6px;
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #FFFFFF;
  letter-spacing: 0.14px;
  gap: 6px;
}

.btn-primary:hover {
  background: #004ECC;
}

.btn-primary:active {
  background: #004ECC;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

#### Secondary Button

**Specifications:**
- Height: 48px
- Background: `#FFFFFF`
- Border: 1px solid `#585A5C`
- Border radius: 8px
- Padding: 20px horizontal, 12px vertical
- Font: Sarabun Regular, 16px, line-height 28px
- Color: `#585A5C`
- Letter spacing: 0.08px

**Vue.js Implementation:**

```vue
<template>
  <Button
    :label="label"
    :disabled="disabled"
    @click="$emit('click')"
    :pt="{
      root: { class: 'btn-secondary' },
      label: { class: 'btn-secondary-label' }
    }"
  />
</template>

<script setup>
import Button from 'primevue/button'

defineProps({
  label: String,
  disabled: Boolean
})

defineEmits(['click'])
</script>

<style scoped>
.btn-secondary {
  height: 48px;
  padding: 12px 20px;
  background: #FFFFFF;
  border: 1px solid #585A5C;
  border-radius: 8px;
  font-family: 'Sarabun', sans-serif;
  font-size: 16px;
  line-height: 28px;
  color: #585A5C;
  letter-spacing: 0.08px;
}

.btn-secondary:hover {
  background: #F2F6FC;
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

### Modal Components

#### Notification Modal (Error)

**PrimeVue Reference:** [Dialog](https://v3.primevue.org/dialog/)

**Specifications:**
- Width: 384px
- Border radius: 12px
- Background: `#FFFFFF`
- Shadow: `0px 4px 10px 0px rgba(132, 132, 132, 0.1)`
- Padding: 20px
- Content gap: 12px, 30px (between sections)
- Title font: Sarabun Regular, 18px, line-height 32px, `#F03737`
- Body font: Sarabun Regular, 14px, line-height 24px, `#181819`
- Divider: `#E4E7ED`, 1px height
- Close icon: 14px × 14px

**Vue.js Implementation:**

```vue
<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :modal="true"
    :closable="true"
    :style="{ width: '384px' }"
    :pt="{
      root: { class: 'custom-dialog' },
      header: { class: 'custom-dialog-header' },
      content: { class: 'custom-dialog-content' },
      footer: { class: 'custom-dialog-footer' }
    }"
  >
    <template #header>
      <div class="dialog-header-content">
        <h3 class="dialog-title error-title">{{ title }}</h3>
      </div>
      <div class="dialog-divider"></div>
    </template>
    
    <p class="dialog-message">{{ message }}</p>
    
    <template #footer>
      <Button
        label="ปิด"
        @click="$emit('update:visible', false)"
        class="btn-secondary"
      />
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

defineProps({
  visible: Boolean,
  title: String,
  message: String
})

defineEmits(['update:visible'])
</script>

<style scoped>
.custom-dialog {
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px rgba(132, 132, 132, 0.1);
}

.custom-dialog-header {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dialog-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-title {
  font-family: 'Sarabun', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
}

.error-title {
  color: #F03737;
}

.dialog-divider {
  height: 1px;
  background: #E4E7ED;
}

.custom-dialog-content {
  padding: 0;
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #181819;
  letter-spacing: 0.14px;
}

.custom-dialog-footer {
  padding: 0;
  display: flex;
  justify-content: flex-end;
}
</style>
```

### Tag Component

**PrimeVue Reference:** [Tag](https://v3.primevue.org/tag/) or [Chip](https://v3.primevue.org/chip/)

**Specifications:**
- Border radius: 8px
- Padding: 12px horizontal, 1px vertical
- Font: Sarabun Regular, 14px, line-height 24px
- Letter spacing: 0.14px
- Icon: 8px × 8px dot, 7px gap from text

**Variants:**
- **Ready:** Background `#F2FFF9`, Text `#05A861`
- **Sold:** Background `#F2F6FC`, Text `#84868A`
- **Missing:** Background `#FFF5F5`, Text `#E00707`
- **Broken:** Background `#FFF8EB`, Text `#EE9F00`
- **Spare:** Background `#E9F1FF`, Text `#004ECC`
- **Other:** Background `#E5F9FF`, Text `#4DD8FF`

**Vue.js Implementation:**

```vue
<template>
  <Tag
    :value="label"
    :severity="severity"
    :pt="{
      root: { class: 'custom-tag', style: tagStyle },
      value: { class: 'custom-tag-value' }
    }"
  >
    <template #icon>
      <span class="tag-dot" :style="{ backgroundColor: dotColor }"></span>
    </template>
  </Tag>
</template>

<script setup>
import Tag from 'primevue/tag'
import { computed } from 'vue'

const props = defineProps({
  label: String,
  variant: {
    type: String,
    default: 'ready',
    validator: (value) => ['ready', 'sold', 'missing', 'broken', 'spare', 'other'].includes(value)
  }
})

const tagStyles = {
  ready: { background: '#F2FFF9', color: '#05A861' },
  sold: { background: '#F2F6FC', color: '#84868A' },
  missing: { background: '#FFF5F5', color: '#E00707' },
  broken: { background: '#FFF8EB', color: '#EE9F00' },
  spare: { background: '#E9F1FF', color: '#004ECC' },
  other: { background: '#E5F9FF', color: '#4DD8FF' }
}

const tagStyle = computed(() => tagStyles[props.variant])
const dotColor = computed(() => tagStyles[props.variant].color)
const severity = computed(() => {
  const map = {
    ready: 'success',
    sold: null,
    missing: 'danger',
    broken: 'warning',
    spare: 'info',
    other: 'info'
  }
  return map[props.variant]
})
</script>

<style scoped>
.custom-tag {
  padding: 1px 12px;
  border-radius: 8px;
  display: flex;
  gap: 7px;
  align-items: center;
}

.custom-tag-value {
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.14px;
}

.tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
```

### Inline Message

**PrimeVue Reference:** [InlineMessage](https://v3.primevue.org/inlinemessage/)

**Specifications:**
- Height: 32px
- Border radius: 6px
- Background: `#F4F7FD`
- Padding: 6px vertical, 12px horizontal
- Gap: 8px between elements
- Font: Sarabun Regular, 14px, line-height 20px
- Text color: `#175BCA` (primary blue variant)
- Bold text: Sarabun Bold for emphasized parts
- Icon: 20px × 20px, `#175BCA`

**Vue.js Implementation:**

```vue
<template>
  <InlineMessage
    severity="info"
    :pt="{
      root: { class: 'custom-inline-message' },
      icon: { class: 'custom-inline-message-icon' },
      text: { class: 'custom-inline-message-text' }
    }"
  >
    <template #message>
      <span class="inline-message-bold">{{ boldText }}</span>
      <span>{{ message }}</span>
    </template>
  </InlineMessage>
</template>

<script setup>
import InlineMessage from 'primevue/inlinemessage'

defineProps({
  boldText: String,
  message: String
})
</script>

<style scoped>
.custom-inline-message {
  background: #F4F7FD;
  border-radius: 6px;
  padding: 6px 12px;
  gap: 8px;
}

.custom-inline-message-text {
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #175BCA;
}

.inline-message-bold {
  font-family: 'Sarabun', sans-serif;
  font-weight: 700;
}

.custom-inline-message-icon {
  width: 20px;
  height: 20px;
  color: #175BCA;
}
</style>
```

### Search Box Component

**Specifications:**
- Combines Dropdown (177px width) + InputText (294px width) + Primary Button
- Gap: 12px between elements
- Dropdown: "ทั้งหมด" (All) as default option
- Input: Search icon (16px) on left, placeholder text `#B4B4B4`
- Button: "ค้นหา" (Search) label

**Vue.js Implementation:**

```vue
<template>
  <div class="search-box">
    <Dropdown
      v-model="searchBy"
      :options="searchOptions"
      optionLabel="label"
      optionValue="value"
      :pt="{ root: { class: 'search-dropdown' } }"
    />
    <InputText
      v-model="searchQuery"
      :placeholder="placeholder"
      :pt="{ root: { class: 'search-input' } }"
    >
      <template #prefix>
        <i class="pi pi-search" style="font-size: 16px; color: #787A7D;"></i>
      </template>
    </InputText>
    <Button
      label="ค้นหา"
      @click="$emit('search', { searchBy, searchQuery })"
      :pt="{ root: { class: 'btn-primary' } }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const searchBy = ref('all')
const searchQuery = ref('')

const searchOptions = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'ช่วงวันที่นำเข้า', value: 'date' },
  { label: 'รหัสสินค้า', value: 'productCode' },
  // ... more options
]

defineProps({
  placeholder: String
})

defineEmits(['search'])
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.search-dropdown {
  width: 177px;
}

.search-input {
  width: 294px;
}
</style>
```

### Header Component

**Specifications:**
- Height: 56px (Project Bar) + 60px (Toolbar) = 116px total
- Background: `#FFFFFF`
- Shadow: `2px 2px 5px 0px rgba(0, 0, 0, 0.05)`
- Padding: 24px horizontal, 14px vertical (Project Bar)
- Breadcrumb font: Sarabun Regular, 14px, line-height 24px, `#585A5C`
- Breadcrumb separator: 16px arrow icon, 4px gap
- Title font: Sarabun Bold, 16px, line-height 42px, `#1B1B1B`
- Divider: `#EAEEF4`, 1px border bottom
- Action buttons: Right-aligned

**Vue.js Implementation:**

```vue
<template>
  <div class="page-header">
    <div class="header-project-bar">
      <div class="breadcrumb">
        <span class="breadcrumb-item">{{ breadcrumbItems[0] }}</span>
        <i class="pi pi-chevron-right breadcrumb-separator"></i>
        <span class="breadcrumb-item">{{ breadcrumbItems[1] }}</span>
      </div>
      <div class="header-actions">
        <Button
          :label="projectName"
          :pt="{ root: { class: 'project-selector' } }"
        />
      </div>
    </div>
    <div class="header-toolbar">
      <h1 class="page-title">{{ title }}</h1>
      <div class="toolbar-actions">
        <Button
          :label="primaryActionLabel"
          icon="pi pi-plus"
          @click="$emit('primary-action')"
          :pt="{ root: { class: 'btn-primary' } }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'

defineProps({
  breadcrumbItems: Array,
  projectName: String,
  title: String,
  primaryActionLabel: String
})

defineEmits(['primary-action'])
</script>

<style scoped>
.page-header {
  background: #FFFFFF;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.05);
}

.header-project-bar {
  height: 56px;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb {
  display: flex;
  gap: 4px;
  align-items: center;
}

.breadcrumb-item {
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #585A5C;
  letter-spacing: 0.14px;
}

.breadcrumb-separator {
  width: 16px;
  height: 16px;
  color: #787A7D;
}

.header-toolbar {
  height: 60px;
  padding: 22px 24px;
  border-bottom: 1px solid #EAEEF4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-family: 'Sarabun', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 42px;
  color: #1B1B1B;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.project-selector {
  background: #FFFFFF;
  border: 1px solid #BCC3CD;
  color: #212121;
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
}
</style>
```

---

## 6. Visual Styles

### Border Radius

| Value | Usage |
|-------|-------|
| 4px | Input fields, small components |
| 6px | Buttons, checkboxes, inline messages, modals (internal) |
| 8px | Dropdowns, tags, search inputs, secondary buttons |
| 12px | Modal containers |
| 22px | Checkbox checkmark container |
| 28px | Switch/toggle components (pill shape) |

### Shadows

#### Drop Shadow 100
- **Effect:** Drop Shadow
- **Color:** `rgba(132, 132, 132, 0.1)` or `#8484841A`
- **Offset:** X: 0, Y: 4
- **Radius:** 10
- **Spread:** 0
- **Usage:** Modal containers

#### Header Shadow
- **Effect:** Drop Shadow
- **Color:** `rgba(0, 0, 0, 0.05)` or `#0000000D`
- **Offset:** X: 2, Y: 2
- **Radius:** 5
- **Spread:** 0
- **Usage:** Page headers

### Dividers & Strokes

- **Default Stroke:** `#CED0D6` - 1px solid borders
- **Disabled Stroke:** `#EAEEF4` - 1px solid borders for disabled states
- **Dividers:** `#E4E7ED` - 1px horizontal dividers in modals and sections
- **Border Default:** `#BCC3CD` - Alternative border color for some components

### Elevation System

- **Level 0 (Base):** No shadow - Standard content
- **Level 1 (Raised):** Header shadow - Page headers, toolbars
- **Level 2 (Overlay):** Drop shadow 100 - Modals, dialogs, dropdowns

---

## 7. Interaction Patterns

### Focus States

- **Input Fields:** Border color changes to primary blue (`#1C70F7`) when focused
- **Buttons:** Visual feedback through color change or slight elevation
- **Accessibility:** Focus indicators should be clearly visible for keyboard navigation

### Disabled States

- **Visual Treatment:**
  - Background: `#F2F6FC` (for inputs)
  - Text color: `#84868A`
  - Border: `#CED0D6` or `#EAEEF4`
  - Reduced opacity: 0.6 (for buttons)
- **Interaction:** Cursor changes to `not-allowed`, no pointer events

### Error States

- **Border Color:** `#F03737` (red)
- **Error Message:** Appears below input field
  - Font: Sarabun Regular, 12px
  - Color: `#F03737`
  - Position: 4px gap below input
- **Modal Error Title:** `#F03737` color for error modal titles

### Hover States

- **Primary Button:** Background changes to `#004ECC` (darker blue)
- **Secondary Button:** Background changes to `#F2F6FC` (light grey)
- **Interactive Elements:** Subtle color or opacity changes

### Active/Pressed States

- **Primary Button:** `#004ECC` background (same as hover)
- **Visual Feedback:** Slight scale or color intensity change

### Modal Interactions

- **Opening:** Modal appears as overlay with backdrop
- **Closing:** 
  - Close button (X icon) in top right
  - Cancel/Close button in footer
  - Click outside modal (if enabled)
- **Focus Management:** Focus trapped within modal when open
- **Backdrop:** Semi-transparent overlay behind modal

### Form Validation

- **Real-time Validation:** Error messages appear immediately on blur or submit
- **Error Message Position:** Below input field, 4px gap
- **Required Field Indicator:** Asterisk (*) in `#F03737` color next to label

### Loading States

- **Button Loading:** Spinner icon replaces or appears alongside label
- **Disabled State:** Button becomes non-interactive during loading

---

## Implementation Notes

### PrimeVue Integration

All components should be built using PrimeVue v3 as the base, with customization through:

1. **Pass Through API (PT):** For styling individual DOM elements
2. **CSS Classes:** Custom classes applied via PT API
3. **Design Tokens:** CSS variables or SCSS variables matching extracted color values
4. **Component Composition:** Building complex components from PrimeVue primitives

### Design Token Implementation

Create a design tokens file (CSS variables or SCSS):

```css
:root {
  /* Primary Colors */
  --color-primary-500: #1C70F7;
  --color-primary-click: #004ECC;
  --color-primary-200: #E9F1FF;
  
  /* Semantic Colors */
  --color-error: #F03737;
  --color-error-hover: #E00707;
  --color-error-bg: #FFF5F5;
  --color-success: #05A861;
  --color-success-bg: #F2FFF9;
  --color-attention: #EE9F00;
  --color-attention-bg: #FFF8EB;
  
  /* Greyscale */
  --color-text-primary: #181819;
  --color-text-secondary: #585A5C;
  --color-text-tertiary: #6E7073;
  --color-text-placeholder: #B4B4B4;
  --color-text-disabled: #84868A;
  --color-white: #FFFFFF;
  --color-disabled-bg: #F2F6FC;
  --color-stroke: #CED0D6;
  --color-stroke-disabled: #EAEEF4;
  --color-dividers: #E4E7ED;
  
  /* Typography */
  --font-family: 'Sarabun', sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --line-height-xs: 20px;
  --line-height-sm: 24px;
  --line-height-md: 28px;
  --line-height-lg: 32px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 30px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  
  /* Shadows */
  --shadow-modal: 0px 4px 10px 0px rgba(132, 132, 132, 0.1);
  --shadow-header: 2px 2px 5px 0px rgba(0, 0, 0, 0.05);
}
```

### Component Structure

Each component should follow this structure:

1. **Props Definition:** Type-safe props with defaults
2. **Emits Definition:** Documented events
3. **Template:** Semantic HTML with PrimeVue components
4. **Styling:** Scoped styles using design tokens
5. **Accessibility:** ARIA attributes and keyboard support

---

## References

- **Figma Source:** A00-ERP-Components-Bible (node 2250:6191)
- **PrimeVue v3 Documentation:** https://v3.primevue.org/introduction/
- **PrimeVue Components:**
  - [InputText](https://v3.primevue.org/inputtext/)
  - [Dropdown](https://v3.primevue.org/dropdown/)
  - [Calendar](https://v3.primevue.org/calendar/)
  - [Checkbox](https://v3.primevue.org/checkbox/)
  - [InputSwitch](https://v3.primevue.org/inputswitch/)
  - [Button](https://v3.primevue.org/button/)
  - [Dialog](https://v3.primevue.org/dialog/)
  - [InlineMessage](https://v3.primevue.org/inlinemessage/)
  - [Tag](https://v3.primevue.org/tag/)
  - [AutoComplete](https://v3.primevue.org/autocomplete/)

---

*This design system is extracted from the Figma file and serves as the single source of truth for implementing UI components. All values are measured directly from the design specifications.*

