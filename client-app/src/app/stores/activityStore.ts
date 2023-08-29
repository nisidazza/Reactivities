import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activities, Activity } from "../models/activity";

export default class ActivityStore {
  activities: Activities = [];
  selectedActivity: Activity | null = null;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // we can use makeAutoObservable so we don't need to specify the props
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.ActivitiesRequests.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        //mutating state
        this.activities.push(activity);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };
}
