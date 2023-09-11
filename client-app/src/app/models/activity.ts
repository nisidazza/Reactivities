import { IProfile } from "./profile";

export type IActivity = {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: IProfile;
  attendees?: IProfile[];
};


// we can create a new activity object from the activity form values
export class Activity implements IActivity {
  constructor(init: ActivityFormValues) {
    // because of linting rules we cannot use Object.assing(this, init)
    this.id = init.id!
    this.title = init.title
    this.category = init.category
    this.description = init.description
    this.date = init.date
    this.city = init.city
    this.venue = init.venue
  }

  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string = "";
  isCancelled: boolean = false;
  isGoing: boolean = false;
  isHost: boolean = false;
  host?: IProfile;
  attendees?: IProfile[];
}

// we can initialize some values when we pass an activity obj from the API to the class constructor
export class ActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date: Date | null = null;
  city: string = "";
  venue: string = "";

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.category = activity.category;
      this.description = activity.description;
      this.date = activity.date;
      this.city = activity.city;
      this.venue = activity.venue;
    }
  }
}

export type Activities = Activity[];
