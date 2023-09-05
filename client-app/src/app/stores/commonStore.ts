import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = localStorage.getItem("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    // it runs when an observable has changed, not when it's set
    reaction(
      () => this.token, // what we want to react to
      (token) => {
        // what to do with this
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );
  }

  setServerError(error: ServerError) {
    this.error = error;
  }

  setToken(token: string | null) {
    this.token = token; // in this way we have the token inside our store state
  }

  setAppLoaded() {
    this.appLoaded = true;
  }
}
