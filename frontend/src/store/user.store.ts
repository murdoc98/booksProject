// Utilities
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    _userId: '',
    _isAuth: localStorage.getItem('isAuth') == 'true' ? true : false
  }),
  getters: {
    userId: (state) => state._userId,
    isAuth: (state) => state._isAuth
  },
  actions: {
    setUserId(id: string) {
      this._userId = id
    },
    setIsAuth(status: boolean) {
      this._isAuth = status
      localStorage.setItem('isAuth', status.toString())
    }
  }
})
