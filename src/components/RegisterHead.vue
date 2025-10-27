<template>
  <div class="head2">
    <button
      class="back"
      @click="goBack"
      style="background:none; border:none; cursor:pointer; display:flex; align-items:center ;"
    >
      <Icon icon="fa6:arrow-left" class ="icon"  />
    </button>
    <h3>Register</h3>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const goBack = () => router.back()
</script>
