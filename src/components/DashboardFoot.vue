<template>
  <footer class="footer-nav">
    <RouterLink to="/dashboard" class="nav-item">
      <iconify-icon icon="mdi:home" width="24" height="24" />
      <span>Home</span>
    </RouterLink>

    <RouterLink to="/tickets" class="nav-item">
      <iconify-icon icon="mdi:ticket" width="24" height="24" />
      <span>New Ticket</span>
    </RouterLink>

    <RouterLink to="/mine" class="nav-item">
      <iconify-icon icon="mdi:chart-bar" width="24" height="24" />
      <span>My Tickets</span>
    </RouterLink>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
