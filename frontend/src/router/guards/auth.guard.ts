import type { RouteLocation } from 'vue-router'
import { useUserStore } from '@/store/user.store'

export default async function customAuth(to: RouteLocation) {
  const userStore = useUserStore()
  if(!userStore.isAuth) {
    return '/'
  }
};