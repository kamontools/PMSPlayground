<template>
  <AptShell>
    <ApListPage v-if="state.nav.page === 'list'" detail-page="detail" />
    <ApStepDetail v-else-if="state.nav.page === 'detail'" :key="`dt-${state.nav.docId}`" :doc-id="state.nav.docId" />
  </AptShell>
</template>

<script setup>
import AptShell from './advance-payment-testing/AptShell.vue'
import ApListPage from './advance-payment-testing/ApListPage.vue'
import ApStepDetail from './advance-payment-testing/step/ApStepDetail.vue'
import { aptStoreFor, provideAptStore } from './advance-payment-testing/store.js'

// Step testing version: same flow and data as the classic one, one detail page split into v3-style steps.
// Has its own store, so its sample data and reset are independent of the classic version.
const store = aptStoreFor('step')
provideAptStore(store)
const { state } = store
</script>
