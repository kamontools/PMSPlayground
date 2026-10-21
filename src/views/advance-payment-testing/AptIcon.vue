<template>
  <!-- LOS outline icons: 1.5px stroke at any rendered size (design system › Iconography) -->
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path v-for="(d, i) in paths" :key="i" :d="d" vector-effect="non-scaling-stroke" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

// Small line-icon set used across the testing version.
const ICONS = {
  back: ['M12.5 4.5L7 10l5.5 5.5'],
  next: ['M4 10h12', 'M11 5l5 5-5 5'],
  save: ['M4 4h9l3 3v9H4z', 'M7 4v4h6V4', 'M7 16v-5h6v5'],
  print: ['M6 8V3h8v5', 'M6 14H4V8h12v6h-2', 'M6 11h8v6H6z'],
  cancel: ['M5 3h7l3 3v11H5z', 'M8 9l4 4', 'M12 9l-4 4'],
  plus: ['M10 4v12', 'M4 10h12'],
  file: ['M6 2.5h5.5L15 6v11.5H6z', 'M11 2.5V6h4', 'M8.5 10h4', 'M8.5 13h4'],
  doc: ['M5 2.5h7l3 3v12H5z', 'M12 2.5v3h3'],
  edit: ['M13.5 3.5l3 3L8 15H5v-3z'],
  trash: ['M4 6h12', 'M8 6V4h4v2', 'M6 6l1 11h6l1-11', 'M9 9v5', 'M11 9v5'],
  search: ['M8.5 3.5a5 5 0 110 10 5 5 0 010-10z', 'M15.5 15.5l-3-3'],
  calendar: ['M4 5h12v11H4z', 'M4 8.5h12', 'M7.5 3v3', 'M12.5 3v3'],
  sortDown: ['M6 4v12', 'M3 13l3 3 3-3', 'M11 6h6', 'M11 10h4', 'M11 14h2'],
  sortUp: ['M6 16V4', 'M3 7l3-3 3 3', 'M11 6h2', 'M11 10h4', 'M11 14h6'],
  ledger: ['M4 4h12v12H4z', 'M4 8h12', 'M4 12h12', 'M8 4v12'],
  info: ['M10 3a7 7 0 110 14 7 7 0 010-14z', 'M10 9v5', 'M10 6.5v.5'],
  alert: ['M10 3l8 14H2z', 'M10 8v4', 'M10 14.5v.5'],
  check: ['M4 10.5l4 4 8-9'],
  x: ['M5 5l10 10', 'M15 5L5 15'],
  link: ['M8 12l4-4', 'M9 5l1-1a3.5 3.5 0 015 5l-1 1', 'M11 15l-1 1a3.5 3.5 0 01-5-5l1-1'],
  undo: ['M7.5 4.5L4 8l3.5 3.5', 'M4 8h8a4 4 0 010 8H9'],
  swap: ['M4 7h11l-3-3', 'M16 13H5l3 3'],
  grid: ['M4 4h3v3H4z', 'M8.5 4h3v3h-3z', 'M13 4h3v3h-3z', 'M4 8.5h3v3H4z', 'M8.5 8.5h3v3h-3z', 'M13 8.5h3v3h-3z', 'M4 13h3v3H4z', 'M8.5 13h3v3h-3z', 'M13 13h3v3h-3z'],
  bell: ['M5 14V9a5 5 0 0110 0v5l1.5 1.5h-13z', 'M8.5 17.5h3'],
  book: ['M4 3.5h9l3 3v10H4z', 'M7 8h6', 'M7 11h4'],
  download: ['M10 3v10', 'M6 9l4 4 4-4', 'M4 16h12'],
  calc: ['M4 3h12v14H4z', 'M7 6h6', 'M7 10h1', 'M10 10h1', 'M13 10h0', 'M7 13h1', 'M10 13h1'],
  chair: ['M6 3h8v6H6z', 'M5 9h10v3H5z', 'M6 12v5', 'M14 12v5'],
  card: ['M3 5h14v10H3z', 'M3 8h14', 'M6 12h3'],
  lock: ['M5 9h10v8H5z', 'M7 9V7a3 3 0 016 0v2'],
  chevron: ['M5 8l5 5 5-5']
}
const props = defineProps({ name: { type: String, required: true } })
const paths = computed(() => ICONS[props.name] || [])
</script>
