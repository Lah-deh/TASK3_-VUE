<template>
  <section class="stats-container">
    <div class="stats">
      <div class="stat-card">
        <h3>{{ stats.total }}</h3>
        <p>Total Tickets</p>
      </div>
      <div class="stat-card">
        <h3>{{ stats.open }}</h3>
        <p>Open Tickets</p>
      </div>
      <div class="stat-card">
        <h3>{{ stats.resolved }}</h3>
        <p>Resolved Tickets</p>
      </div>
    </div>

    <div class="manage-btn-wrap">
      <button class="manage-btn" @click="goToTickets">Manage Tickets</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const stats = ref({ total: 0, open: 0, resolved: 0 })

const api = axios.create({
  baseURL: 'https://mockdata-93rw.onrender.com',
})

const fetchStats = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return router.push('/login')

    const res = await api.get(`/users/${user.id}`)
    const tickets = res.data.tickets || []

    stats.value.total = tickets.length
    stats.value.open = tickets.filter(t => t.status === 'Open').length
    stats.value.resolved = tickets.filter(t => t.status === 'Resolved').length
  } catch (err) {
    console.error(err)
  }
}

const goToTickets = () => router.push('/tickets')

onMounted(fetchStats)
</script>
