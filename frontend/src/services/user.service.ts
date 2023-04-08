import { useAuth0 } from "@auth0/auth0-vue";
import AxiosInstance from "./axios.service";
import { useAppStore } from "@/store/app.store";
import { useUserStore } from "@/store/user.store";
import router from "@/router";

export default class UserService extends AxiosInstance {
  private userStore;
  private auth0login;
  private auth0logout;

  constructor() {
    super();
    const { loginWithRedirect, logout } = useAuth0();
    this.appStore = useAppStore();
    this.userStore = useUserStore();
    this.auth0login = loginWithRedirect;
    this.auth0logout = logout;
  }

  login() {
    if (this.appStore.envMode == "production") {
      this.auth0login({
        appState: {
          target: "/protected",
        },
      }).then(() => {
        this.userStore.setIsAuth(true)
      });
    } else {
      this.userStore.setUserId("Brrowser mode")
      this.userStore.setIsAuth(true)
      router.push("/protected")
    }
  }

  async logout() {
    if (this.appStore.envMode == "production") {
      this.auth0logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      }).then(() => {
        this.userStore.setIsAuth(false)
      });
    } else {
      this.userStore.setUserId("")
      this.userStore.setIsAuth(false)
      router.push("/")
    }
  }
}
