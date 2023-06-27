<template>
  <div>{{ state.total }} ---- {{ state.doubleTotal }}</div>
  {{ state.isLogin }}
  <button @click="state.totalIncre">++++++++</button>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { http } from '@/utils/request'
import { onMounted } from 'vue'

onMounted(() => {
  http.post('/user/getAllUserInfo')
})
const state = useUserStore()
state.$patch({
  isLogin: true
})
</script>

<style scoped></style>
