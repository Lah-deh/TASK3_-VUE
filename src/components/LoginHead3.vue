<template>
  <div class="head2">
    <button
      class="back"
      @click="goBack"
      style="background: none; border: none; cursor: pointer; display: flex; align-items: center"
    >
      <Icon icon="ion:arrow-back-outline" width="24" height="24" />
    </button>
    <h3>Login</h3>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const goBack = () => router.back()
</script>
