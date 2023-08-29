import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store);

// hooks that allow to use the store inside the components
export const useStore = () => {
  return useContext(StoreContext);
};
