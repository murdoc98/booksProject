// Utilities
import { defineStore } from 'pinia'
import { envMode } from '@/environment.json'

export const useAppStore = defineStore('app', {
  state: () => ({
    _envMode: localStorage.getItem('envMode') || envMode,
    _initialEnv: envMode
  }),
  getters: {
    envMode: (state) => state._envMode,
    initialEnv: (state) => state._initialEnv
  },
  actions: {
    setEnvMode(mode: string) {
      localStorage.setItem('envMode', mode)
      this._envMode = mode
    }
  }
})
