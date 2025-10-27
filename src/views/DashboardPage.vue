<template>
  <div>
    <DashboardHead />
    <hr />
    <StatsSection />
    <DashboardFoot />
  </div>
</template>

<script setup>
import DashboardHead from '../components/DashboardHead.vue'
import StatsSection from '../components/StatsSection.vue'
import DashboardFoot from '../components/DashboardFoot.vue'
import "../styles/Dashboaard.scss"
</script>
