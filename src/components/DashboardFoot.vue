<script setup>
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';


</script>

<template>
  <footer class="footer-nav">
    <RouterLink to="/dashboard" class="nav-item">
      <Icon icon="fa6-solid:house" class="icon" />
      <span>Home</span>
    </RouterLink>

    <RouterLink to="/tickets" class="nav-item">
      <Icon icon="fa6-solid:ticket" class="icon" />
      <span>New Ticket</span>
    </RouterLink>

    <RouterLink to="/mine" class="nav-item">
      <Icon icon="fa6-solid:chart-bar" class="icon" />
      <span>My Tickets</span>
    </RouterLink>
  </footer>
</template>

<style scoped>
</style>