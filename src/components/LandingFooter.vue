<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <h2>TechWave</h2>
      </div>
      <div class="footer-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/Register">Register</RouterLink>
        <RouterLink to="/Login">Login</RouterLink>
      </div>
      <div class="footer-socials">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Icon icon="fa6:x-twitter" width="24" height="24" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <Icon icon="fa6:linkedin" width="24" height="24" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Icon icon="fa6:instagram" width="24" height="24" />
        </a>
      </div>
    </div>
    <p class="footer-copy">© 2025 TechWave. All rights reserved.</p>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>
