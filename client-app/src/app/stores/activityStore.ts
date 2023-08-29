import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activities, Activity } from "../models/activity";

export default class ActivityStore {
  activities: Activities = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // we can use makeAutoObservable so we don't need to specify the props
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.ActivitiesRequests.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        //mutating state
        this.activities.push(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  //FIX TO: [MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: ActivityStore@1.loadingInitial
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };
}
