<template>
  <header class="dashboard-header">
    <h3 class="dashboard-title">TechWave</h3>
    <button class="logout-btn" @click="handleLogout">Logout</button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
