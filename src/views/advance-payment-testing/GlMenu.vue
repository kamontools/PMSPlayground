<template>
  <div class="apt-glmenu">
    <button type="button" class="apt-btn apt-btn-outline" aria-haspopup="dialog" @click="openDialog">
      <AptIcon name="ledger" /> บันทึกบัญชี <span class="apt-glmenu-count">{{ postedCount }}/{{ items.length }}</span>
    </button>

    <!-- the toolbar is sticky (its own stacking context), so the dialogs render at the page root to cover the sidebar too -->
    <Teleport defer to=".apt-page">
      <div v-if="open" class="apt-overlay" role="dialog" aria-modal="true" aria-label="การบันทึกบัญชี" @click.self="open = false" @keydown.esc="open = false">
        <div class="apt-dialog apt-dialog--md">
          <div class="apt-dialog-head"><h2>การบันทึกบัญชี · {{ doc.docNo }}</h2></div>
          <div class="apt-dialog-body">
            <p class="apt-glmenu-hint">เลือกรายการที่ยังไม่บันทึกและประเภทเอกสาร (PV / JV) แล้วกด “บันทึกบัญชีที่เลือก” ระบบจะแสดงตัวอย่างให้ตรวจก่อนบันทึก</p>
            <ul class="apt-glmenu-list">
              <li v-for="it in items" :key="it.key" class="apt-glmenu-item" :class="{ 'is-posted': it.posted, 'is-unavailable': !it.posted && !it.available }">
                <!-- posted: status + document no. + print · not posted: a checkbox and the document type to post it as -->
                <span v-if="it.posted" class="apt-glmenu-done" aria-hidden="true"><AptIcon name="check" /></span>
                <input v-else :id="`gl-${it.key}`" v-model="picked" type="checkbox" :value="it.key" :disabled="!it.available" />
                <label :for="it.posted ? null : `gl-${it.key}`" class="apt-glmenu-text">
                  <b>{{ it.name }}</b>
                  <span>{{ it.when }}</span>
                </label>
                <template v-if="it.posted">
                  <span class="apt-glmenu-state">
                    บันทึกแล้ว
                    <button type="button" class="apt-link" @click="view(it)">{{ it.posted.no }}</button>
                  </span>
                  <button type="button" class="apt-btn apt-btn-outline apt-glmenu-print" @click="print(it)"><AptIcon name="print" /> พิมพ์ {{ typeOf(it) }}</button>
                </template>
                <template v-else>
                  <select v-model="types[it.key]" class="apt-select apt-glmenu-type" :disabled="!it.available" :aria-label="`ประเภทเอกสาร ${it.name}`">
                    <option value="PV">PV : ใบสำคัญจ่าย</option>
                    <option value="JV">JV : ใบสำคัญทั่วไป</option>
                  </select>
                  <span v-if="!it.available" class="apt-glmenu-state apt-muted">{{ it.waiting }}</span>
                  <span v-else class="apt-glmenu-state apt-glmenu-todo">ยังไม่บันทึก</span>
                </template>
              </li>
            </ul>
          </div>
          <div class="apt-dialog-foot apt-dialog-foot--end">
            <button ref="closeEl" type="button" class="apt-btn apt-btn-ghost" @click="open = false">ปิด</button>
            <button type="button" class="apt-btn apt-btn-primary" :disabled="!picked.length" @click="postPicked">บันทึกบัญชีที่เลือก<span v-if="picked.length"> ({{ picked.length }})</span></button>
          </div>
        </div>
      </div>

      <GlEntryDialog
        v-if="active"
        :key="`${active.key}-${active.readonly}`"
        :type="active.type"
        :entry="active.entry"
        :readonly="active.readonly"
        @save="onSave"
        @later="stopQueue"
        @close="stopQueue"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import AptIcon from './AptIcon.vue'
import GlEntryDialog from './GlEntryDialog.vue'
import { useAptStore, buildPv, buildClearingGl } from './store.js'

// Toolbar button + dialog for the request's two journal entries: one after paying, one after clearing.
// Unposted entries are checkboxes with a document type (PV / JV — paying defaults to PV, clearing to JV):
// pick → preview → post, one after another. Posted ones show their number and can be printed.
const props = defineProps({ doc: { type: Object, required: true } })
const { notifySuccess, showToast } = useAptStore()

const PAID = ['awaiting-clear', 'awaiting-confirm', 'rejected', 'cleared']
const DEFAULT_TYPE = { pv: 'PV', jv: 'JV' }
const types = reactive({ ...DEFAULT_TYPE })

const items = computed(() => [
  {
    key: 'pv', name: 'บัญชีการจ่ายชำระ', when: 'บันทึกหลังจ่ายชำระแล้ว',
    posted: props.doc.pv, available: PAID.includes(props.doc.status), waiting: props.doc.status === 'cancelled' ? 'คำขอถูกยกเลิก' : 'รอจ่ายชำระ'
  },
  {
    key: 'jv', name: 'บัญชีการเคลียร์เงิน', when: 'บันทึกหลังการเคลียร์',
    posted: props.doc.clearing?.gl, available: props.doc.status === 'cleared', waiting: props.doc.status === 'cancelled' ? 'คำขอถูกยกเลิก' : 'รออนุมัติเคลียร์'
  }
])
const postedCount = computed(() => items.value.filter(i => i.posted).length)

const open = ref(false)
const picked = ref([])
const queue = ref([])
const active = ref(null) // { key, type, entry, readonly }
const postedNow = []

function entryFor(key) {
  return key === 'pv' ? buildPv(props.doc, '') : buildClearingGl(props.doc, props.doc.clearing)
}
// a posted entry keeps the type it was posted as (seed entries predate the choice: their default)
const typeOf = it => it.posted?.type || DEFAULT_TYPE[it.key]
function view(it) {
  open.value = false
  active.value = { key: it.key, type: typeOf(it), entry: it.posted, readonly: true }
}
function print(it) {
  showToast(`เปิดหน้าพิมพ์ ${it.posted.no} (ตัวอย่างสาธิต)`)
}
function next() {
  const key = queue.value.shift()
  active.value = key ? { key, type: types[key], entry: entryFor(key), readonly: false } : null
  if (!key && postedNow.length) {
    notifySuccess(`บันทึกบัญชีเรียบร้อยแล้ว เลขที่ ${postedNow.join(', ')}`)
    postedNow.length = 0
  }
}
function postPicked() {
  queue.value = ['pv', 'jv'].filter(k => picked.value.includes(k)) // PV before JV
  picked.value = []
  open.value = false
  postedNow.length = 0
  next()
}
function onSave(entry) {
  if (active.value.readonly) return
  if (active.value.key === 'pv') {
    props.doc.pv = { no: `${entry.type}-${props.doc.docNo}`, ...entry }
    postedNow.push(props.doc.pv.no)
  } else {
    props.doc.clearing.gl = { no: `${entry.type}-${props.doc.docNo}`, ...entry }
    postedNow.push(props.doc.clearing.gl.no)
  }
  next()
}
function stopQueue() {
  queue.value = []
  next()
}

const closeEl = ref(null)
async function openDialog() {
  picked.value = []
  Object.assign(types, DEFAULT_TYPE)
  open.value = true
  await nextTick()
  closeEl.value?.focus() // keeps Esc working inside the dialog
}
</script>
