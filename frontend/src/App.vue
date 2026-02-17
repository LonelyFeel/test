<template>
  <main style="font-family: sans-serif; max-width: 960px; margin: 0 auto; padding: 16px;">
    <h1>가스기술 통합 Portal (MVP)</h1>
    <p>모듈형 확장을 위한 첫 화면 스캐폴딩입니다.</p>
    <button @click="load">오류율/Ready율 조회</button>
    <pre>{{ metrics }}</pre>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { fetchMetrics } from './services/api'

const metrics = ref('조회 전')

async function load() {
  try {
    const { data } = await fetchMetrics({})
    metrics.value = JSON.stringify(data, null, 2)
  } catch (e) {
    metrics.value = `오류: ${e.message}`
  }
}
</script>
