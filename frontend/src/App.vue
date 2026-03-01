<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">WT UI Dashboard</div>
      <div class="user">
        <span v-if="me.emp_id">EMP: {{ me.emp_id }}</span>
      </div>
    </header>

    <div class="body">
      <aside class="sidebar">
        <h2>Overview</h2>
        <p>Fault and Ready health status</p>
      </aside>

      <main class="main">
        <section v-if="authLoading" class="state-card">Checking authorization...</section>
        <section v-else-if="authError" class="state-card error">{{ authError }}</section>
        <section v-else-if="!authorized" class="state-card">Not authorized.</section>

        <template v-else>
          <section class="kpi-grid">
            <article class="kpi-card">
              <h3>Fault</h3>
              <p v-if="kpiLoading">Loading...</p>
              <p v-else-if="kpiError" class="error">{{ kpiError }}</p>
              <p v-else class="kpi-value">{{ faultRateDisplay }}</p>
            </article>
            <article class="kpi-card">
              <h3>Ready</h3>
              <p v-if="kpiLoading">Loading...</p>
              <p v-else-if="kpiError" class="error">{{ kpiError }}</p>
              <p v-else class="kpi-value">{{ readyRateDisplay }}</p>
            </article>
          </section>

          <section class="table-wrap">
            <h3>Detectors</h3>
            <div v-if="detectorsLoading" class="table-state">Loading detectors...</div>
            <div v-else-if="detectorsError" class="table-state error">{{ detectorsError }}</div>
            <div v-else-if="detectors.length === 0" class="table-state">No detectors found.</div>
            <table v-else>
              <thead>
                <tr>
                  <th>Management No</th>
                  <th>Fault</th>
                  <th>Ready</th>
                  <th>Region</th>
                  <th>Line</th>
                  <th>Floor</th>
                  <th>Vendor</th>
                  <th>Model</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="detector in detectors" :key="detector.management_no">
                  <td>{{ detector.management_no }}</td>
                  <td>{{ detector.fault }}</td>
                  <td>{{ detector.ready }}</td>
                  <td>{{ detector.region || '-' }}</td>
                  <td>{{ detector.line || '-' }}</td>
                  <td>{{ detector.floor || '-' }}</td>
                  <td>{{ detector.vendor_name || '-' }}</td>
                  <td>{{ detector.model_name || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { fetchMe, fetchMetrics, searchDetectors } from './services/api'

const me = reactive({
  emp_id: null
})

const authorized = ref(false)
const authLoading = ref(true)
const authError = ref('')

const metrics = ref(null)
const kpiLoading = ref(false)
const kpiError = ref('')

const detectors = ref([])
const detectorsLoading = ref(false)
const detectorsError = ref('')

const faultRateDisplay = computed(() => {
  const value = metrics.value?.fault_rate
  return typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : '-'
})

const readyRateDisplay = computed(() => {
  const value = metrics.value?.ready_rate
  return typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : '-'
})

async function loadDashboard() {
  kpiLoading.value = true
  detectorsLoading.value = true
  kpiError.value = ''
  detectorsError.value = ''

  try {
    const [metricsRes, detectorsRes] = await Promise.all([
      fetchMetrics({}),
      searchDetectors({})
    ])
    metrics.value = metricsRes.data
    detectors.value = Array.isArray(detectorsRes.data) ? detectorsRes.data : []
  } catch (error) {
    const message = error?.message || 'Failed to load dashboard data.'
    kpiError.value = message
    detectorsError.value = message
  } finally {
    kpiLoading.value = false
    detectorsLoading.value = false
  }
}

onMounted(async () => {
  authLoading.value = true
  authError.value = ''

  try {
    const meRes = await fetchMe()
    me.emp_id = meRes.data?.emp_id || null
    authorized.value = Boolean(meRes.data?.authorized)

    if (authorized.value) {
      await loadDashboard()
    }
  } catch (error) {
    authError.value = error?.message || 'Failed to verify authorization.'
  } finally {
    authLoading.value = false
  }
})
</script>

<style scoped>
:root {
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

.app-shell {
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #1e293b;
  background: linear-gradient(180deg, #f6f8fb 0%, #e8eef7 100%);
}

.topbar {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d0d8e4;
  background-color: #ffffff;
}

.brand {
  font-size: 18px;
  font-weight: 700;
}

.body {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: calc(100vh - 64px);
}

.sidebar {
  padding: 20px;
  border-right: 1px solid #d0d8e4;
  background-color: #f2f6fc;
}

.sidebar h2 {
  margin: 0 0 8px;
  font-size: 16px;
}

.sidebar p {
  margin: 0;
  color: #475569;
}

.main {
  padding: 20px;
  display: grid;
  gap: 16px;
  align-content: start;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.kpi-card,
.table-wrap,
.state-card {
  background-color: #ffffff;
  border: 1px solid #d0d8e4;
  border-radius: 12px;
  padding: 16px;
}

.kpi-card h3 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #475569;
}

.kpi-value {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
}

.table-wrap h3 {
  margin: 0 0 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  text-align: left;
  padding: 10px 8px;
  border-bottom: 1px solid #e2e8f0;
}

th {
  color: #334155;
  background-color: #f8fafc;
}

.table-state {
  padding: 16px;
  color: #334155;
}

.error {
  color: #b91c1c;
}

@media (max-width: 900px) {
  .body {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid #d0d8e4;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
