import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

// hooks that allow to use the store inside the components
export const useStore = () => {
  return useContext(StoreContext);
};
