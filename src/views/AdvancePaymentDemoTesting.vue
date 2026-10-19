<template>
  <AptShell>
    <ApListPage v-if="state.nav.page === 'list'" />
    <ApRequestPage v-else-if="state.nav.page === 'request'" :key="`rq-${state.nav.docId}`" :doc-id="state.nav.docId" />
    <ApClearPage v-else-if="state.nav.page === 'clear'" :key="`cl-${state.nav.docId}`" :doc-id="state.nav.docId" />
  </AptShell>
</template>

<script setup>
import AptShell from './advance-payment-testing/AptShell.vue'
import ApListPage from './advance-payment-testing/ApListPage.vue'
import ApRequestPage from './advance-payment-testing/ApRequestPage.vue'
import ApClearPage from './advance-payment-testing/ApClearPage.vue'
import { aptStoreFor, provideAptStore } from './advance-payment-testing/store.js'

// Classic testing version: separate request and clearing pages, with its own sample data.
const store = aptStoreFor('classic')
provideAptStore(store)
const { state } = store
</script>
