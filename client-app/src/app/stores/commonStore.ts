import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = null;
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  setServerError(error: ServerError) {
    this.error = error;
  }

  setToken(token: string | null) {
    if (token) localStorage.setItem("jwt", token);
    this.token = token; // in this way we have the token inside our store state
  }

  setAppLoaded() {
    this.appLoaded = true;
  }
}
