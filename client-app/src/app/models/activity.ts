import { IProfile } from "./profile";

export type Activity = {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled?: boolean;
  isGoing?: boolean;
  isHost?: boolean;
  host?: IProfile;
  attendees?: IProfile[];
};

export type Activities = Activity[];
