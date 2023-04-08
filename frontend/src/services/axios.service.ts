import axios, { AxiosInstance as Instance } from 'axios'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAppStore } from '@/store/app.store'
import { baseURL } from '@/environment.json'

export default abstract class AxiosInstance {
  public axios: Instance | null
  public appStore
  private auth0

  constructor() {
    this.appStore = useAppStore()
    this.auth0 = useAuth0()
    this.axios = this.appStore.envMode == 'production' ? this.loadAxios() : null

  }

  private loadAxios() {
    const instance = axios.create({
      baseURL,
      timeout: 2000,
      withCredentials: false
    });
    instance.interceptors.request.use(
      async(config) => {
        const token = await this.auth0.getAccessTokenSilently()
        config.headers['Authorization'] = `Bearer ${token}`
        return config;
      }, err => Promise.reject(err)
    );
    return instance
  }
}