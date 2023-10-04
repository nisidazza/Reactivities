import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  refreshTokenTimeout?: number;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    const user = await agent.AccountRequests.login(creds);
    store.commonStore.setToken(user.token);
    this.startRefreshTokenTimer(user);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.AccountRequests.current();
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    const user = await agent.AccountRequests.register(creds);
    store.commonStore.setToken(user.token);
    this.startRefreshTokenTimer(user);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };

  setDisplayName = (displayName: string) => {
    if (this.user) this.user.displayName = displayName;
  };

  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.AccountRequests.refreshToken();
      runInAction(() => (this.user = user));
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  // figuring out when the token expires and 30 secs before then we try to refresh the token
  // The atob() function decodes a string of data which has been encoded using Base64 encoding
  private startRefreshTokenTimer = (user: User) => {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1])); // extract the data out of the token we are interested in, its expiry
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 30 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    console.log({ refreshTimeout: this.refreshTokenTimeout });
  };

  private stopRefreshTokenTimer = () => {
    clearTimeout(this.refreshTokenTimeout);
  };
}
