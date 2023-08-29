import { makeAutoObservable } from "mobx";

export default class ActivityStore {
  title = "Hello from MobX!";

  constructor() {
    // makeObservable(this, {
    //   title: observable,
    //   // if we don't use arrow function, we need to use action.bound to make use of the "this" keywork inside the function
    //   // and access a property inside the class
    //   setTitle: action,
    // });

    // we can use makeAutoObservable so we don't need to specify the props
    makeAutoObservable(this);
  }

  // the arrow function automatically binds this function to the class
  setTitle = () => {
    this.title = this.title + "!";
  };
}
