<template>
  <div class="main-box">
    <div class="content-box"><router-view></router-view></div>
    <footer-view></footer-view>
  </div>
</template>

<script setup lang="ts">
import FooterView from '@/components/Footer/index.vue'
</script>

<style scoped>
.main-box {
  width: 100%;
  height: 100vh;
  position: relative;
}
.content-box {
  height: calc(100vh - 50px);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
