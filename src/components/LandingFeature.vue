<template>
  <section class="features" id="fee">
    <h2 class="heading">Key Features</h2>
    <div class="grid">
      <div v-for="(feature, index) in features" :key="index" class="feature-card">
        <Icon :icon="feature.icon" class="icon" width="40" height="40" />
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const features = [
  {
    title: "Hands-On Learning",
    description: "Participate in workshops led by industry experts and gain practical experience with the latest tech tools.",
    icon: "fa6:graduation-cap"
  },
  {
    title: "Expert Insights",
    description: "Hear from top innovators and thought leaders about emerging trends and real-world applications.",
    icon: "fa6:lightbulb"
  },
  {
    title: "Connect & Collaborate",
    description: "Meet like-minded peers, share ideas, and expand your professional network.",
    icon: "fa6:people-group"
  },
  {
    title: "Discover Innovations",
    description: "Explore cutting-edge projects and tech demonstrations shaping the future.",
    icon: "fa6:rocket"
  }
]
</script>
