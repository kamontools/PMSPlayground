<template>
  <div class="apt-glmenu">
    <button type="button" class="apt-btn apt-btn-outline" aria-haspopup="dialog" @click="openDialog">
      <AptIcon name="ledger" /> บันทึกบัญชี <span class="apt-glmenu-count">{{ postedCount }}/{{ items.length }}</span>
    </button>

    <div v-if="open" class="apt-overlay" role="dialog" aria-modal="true" aria-label="การบันทึกบัญชี" @click.self="open = false" @keydown.esc="open = false">
      <div class="apt-dialog apt-dialog--md">
        <div class="apt-dialog-head"><h2>การบันทึกบัญชี · {{ doc.docNo }}</h2></div>
        <div class="apt-dialog-body">
          <p class="apt-glmenu-hint">เลือกรายการที่ยังไม่บันทึก แล้วกด “บันทึกบัญชีที่เลือก” ระบบจะแสดงตัวอย่างให้ตรวจก่อนบันทึก</p>
          <ul class="apt-glmenu-list">
            <li v-for="it in items" :key="it.key" class="apt-glmenu-item" :class="{ 'is-posted': it.posted, 'is-unavailable': !it.posted && !it.available }">
              <!-- posted: status + document no. · not posted: a checkbox to pick it for posting -->
              <span v-if="it.posted" class="apt-glmenu-done" aria-hidden="true"><AptIcon name="check" /></span>
              <input v-else :id="`gl-${it.key}`" v-model="picked" type="checkbox" :value="it.key" :disabled="!it.available" />
              <label :for="it.posted ? null : `gl-${it.key}`" class="apt-glmenu-text">
                <b>{{ it.code }} · {{ it.name }}</b>
                <span>{{ it.when }}</span>
              </label>
              <span v-if="it.posted" class="apt-glmenu-state">
                บันทึกแล้ว
                <button type="button" class="apt-link" @click="view(it)">{{ it.posted.no }}</button>
              </span>
              <span v-else-if="!it.available" class="apt-glmenu-state apt-muted">{{ it.waiting }}</span>
              <span v-else class="apt-glmenu-state apt-glmenu-todo">ยังไม่บันทึก</span>
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
      :title="active.title"
      :entry="active.entry"
      :readonly="active.readonly"
      @save="onSave"
      @later="stopQueue"
      @close="stopQueue"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import AptIcon from './AptIcon.vue'
import GlEntryDialog from './GlEntryDialog.vue'
import { useAptStore, buildPv, buildClearingGl } from './store.js'

// Toolbar button + dialog for the request's two journal entries: PV after paying, JV after clearing.
// Unposted entries are checkboxes (pick → preview → post, one after another); posted ones show their number.
const props = defineProps({ doc: { type: Object, required: true } })
const { notifySuccess } = useAptStore()

const PAID = ['awaiting-clear', 'awaiting-confirm', 'rejected', 'cleared']
const PV_TITLE = 'บันทึกบัญชี : ใบสำคัญจ่าย : PV'
const JV_TITLE = 'บันทึกบัญชี : ใบสำคัญทั่วไป : JV'

const items = computed(() => [
  {
    key: 'pv', code: 'PV', name: 'ใบสำคัญจ่าย', when: 'บันทึกหลังจ่ายชำระแล้ว', title: PV_TITLE,
    posted: props.doc.pv, available: PAID.includes(props.doc.status), waiting: props.doc.status === 'cancelled' ? 'คำขอถูกยกเลิก' : 'รอจ่ายชำระ'
  },
  {
    key: 'jv', code: 'JV', name: 'ใบสำคัญทั่วไป', when: 'บันทึกหลังการเคลียร์', title: JV_TITLE,
    posted: props.doc.clearing?.gl, available: props.doc.status === 'cleared', waiting: props.doc.status === 'cancelled' ? 'คำขอถูกยกเลิก' : 'รออนุมัติเคลียร์'
  }
])
const postedCount = computed(() => items.value.filter(i => i.posted).length)

const open = ref(false)
const picked = ref([])
const queue = ref([])
const active = ref(null) // { key, title, entry, readonly }
const postedNow = []

function entryFor(key) {
  return key === 'pv' ? buildPv(props.doc, '') : buildClearingGl(props.doc, props.doc.clearing)
}
function view(it) {
  open.value = false
  active.value = { key: it.key, title: it.title, entry: it.posted, readonly: true }
}
function next() {
  const key = queue.value.shift()
  active.value = key ? { key, title: key === 'pv' ? PV_TITLE : JV_TITLE, entry: entryFor(key), readonly: false } : null
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
    props.doc.pv = { no: `PV-${props.doc.docNo}`, ...entry }
    postedNow.push(props.doc.pv.no)
  } else {
    props.doc.clearing.gl = { no: `JV-${props.doc.docNo}`, ...entry }
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
  open.value = true
  await nextTick()
  closeEl.value?.focus() // keeps Esc working inside the dialog
}
</script>
