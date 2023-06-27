<template>
  <div class="footer-box">
    <RouterLink to="/home"><p>首页</p></RouterLink>
    <RouterLink to="/technician">技师</RouterLink>
    <RouterLink to="/order">订单</RouterLink>
    <RouterLink to="/center">我的</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e6e6e6;
}
.footer-box a {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-box .router-link-active {
  background-color: red;
}
</style>
