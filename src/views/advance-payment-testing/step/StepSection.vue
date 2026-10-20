<template>
  <section :id="id" class="apt-sec" :class="[`apt-sec--${state}`, tone && `apt-sec--${tone}`]">
    <div class="apt-sec-headrow">
      <component
        :is="toggleable ? 'button' : 'div'"
        :type="toggleable ? 'button' : undefined"
        class="apt-sec-head"
        :class="{ 'apt-sec-head--static': !toggleable }"
        :aria-expanded="toggleable ? open : undefined"
        @click="toggleable && emit('update:open', !open)"
      >
        <span class="apt-sec-num">
          <AptIcon v-if="state === 'done'" name="check" />
          <AptIcon v-else-if="state === 'pending'" name="lock" />
          <template v-else>{{ num }}</template>
        </span>
        <span class="apt-sec-titles">
          <span class="apt-sec-title">
            {{ title }}
            <span v-if="badge" class="apt-sec-badge">{{ badge }}</span>
            <slot name="chip" />
          </span>
          <span v-if="summary" class="apt-sec-summary">{{ summary }}</span>
        </span>
        <span v-if="toggleable" class="apt-sec-toggle">{{ open ? 'ย่อ' : toggleLabel }}<AptIcon name="chevron" /></span>
      </component>
      <!-- section-level action (e.g. แก้ไข) at the top right, outside the toggle button -->
      <div v-if="open && $slots.action" class="apt-sec-headact"><slot name="action" /></div>
    </div>
    <div v-if="open" class="apt-sec-body">
      <slot />
    </div>
  </section>
</template>

<script setup>
import AptIcon from '../AptIcon.vue'

// One collapsible step section in the v3 layout.
// state: 'done' | 'active' | 'pending' | 'optional' · tone: extra accent ('error' for ไม่ผ่าน, 'muted' for cancelled)
defineProps({
  id: { type: String, required: true },
  num: { type: Number, required: true },
  title: { type: String, required: true },
  state: { type: String, required: true },
  tone: { type: String, default: '' },
  badge: { type: String, default: '' },
  summary: { type: String, default: '' },
  open: { type: Boolean, default: false },
  toggleable: { type: Boolean, default: true },
  toggleLabel: { type: String, default: 'ดูรายละเอียด' }
})
const emit = defineEmits(['update:open'])
</script>
