import { defineStore } from 'pinia'

const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      isLogin: false,
      total: 0
    }
  },
  getters: {
    doubleTotal: (state) => state.total * 2
  },
  actions: {
    totalIncre() {
      this.total++
    }
  }
})

export default useUserStore
