<template>
  <div>
    <p>工号</p>
    <input ref="empNo" v-model="userName" @keyup.enter="handleToggle" />
  </div>
  <div>
    <p>验证码</p>
    <input ref="yzmRef" v-model="yzm" @keyup.enter="handleSubmit" />
  </div>
  <img
    :src="`//hrssc.hoppre.haier.net/hrssc/user/getImageVerifiCode?captchaKey=loginWithPhone&now=${ddTime}&${num}`"
    @click="handleGetNewImg"
  />
  <br />
  <button @click="handleSubmit">登陆</button>
</template>

<script setup lang="ts">
import { http } from '@/utils/request'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const empNo = ref<HTMLInputElement | null>(null)
const yzmRef = ref<HTMLInputElement | null>(null)
const router = useRouter()
const yzm = ref('')
const userName = ref('')
const num = ref(Math.ceil(Math.random() * 100)) // 生成一个随机数（防止缓存)
const ddTime = ref(new Date().getTime())
const handleSubmit = async () => {
  const params = {
    captchaKey: 'loginWithPhone',
    user_name: userName.value,
    password: '1',
    verifiCode: yzm.value,
    now: ddTime.value
  }
  const url = '/user/login'
  const res = await http.post<{ result: boolean }>(url, params)
  if (res.result) {
    handleGetUserRights()
  }
}
const handleGetUserRights = async () => {
  const res = await http.post<{ success: boolean; result: any }>('/user/getAllUserInfo')
  if (res.success) {
    sessionStorage.setItem('user_rights', JSON.stringify(res.result))
    router.push('/')
  }
}
const handleGetNewImg = () => {
  ddTime.value = new Date().getTime()
  num.value = Math.ceil(Math.random() * 100)
}
const handleToggle = () => {
  yzmRef.value?.focus()
}
onMounted(() => {
  empNo.value?.focus()
})
</script>

<style scoped></style>
