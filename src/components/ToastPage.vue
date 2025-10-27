<template>
  <div :class="['toast', type]" v-show="visible">
    <span>{{ message }}</span>
    <button class="close-btn" @click="close">&times;</button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'success' } // 'success' or 'error'
})

const emit = defineEmits(['close'])

const visible = ref(false)

onMounted(() => {
  visible.value = true
  // auto-hide after 3 seconds
  setTimeout(() => close(), 3000)
})

watch(() => props.message, (newVal) => {
  if (newVal) {
    visible.value = true
    setTimeout(() => close(), 3000)
  }
})

const close = () => {
  visible.value = false
  emit('close')
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 6px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: opacity 0.3s ease;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
</style>
