import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      //create connection
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_CHAT_URL + "?activityId=" + activityId, {
          accessTokenFactory: () => store.userStore.user?.token!,
        })
        .withAutomaticReconnect() // reconnect the client to the chat hub should the connection drop
        .configureLogging(LogLevel.Information)
        .build();

      //start connection
      this.hubConnection
        .start()
        .catch((error) =>
          console.log("Error establishing the connection", error)
        );

      // load all comments from that activity - the method name needs to match the name in ChatHub.cs
      this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            // comments coming from the Db are not in UTC format
            comment.createdAt = new Date(comment.createdAt + "Z");
          });
          this.comments = comments;
        }); //update observable
      });

      // receive comment
      this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          this.comments.unshift(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection: ", error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComments = async (values: { body: string; activityId?: string }) => {
    values.activityId = store.activityStore.selectedActivity?.id;
    try {
      await this.hubConnection?.invoke("SendComment", values); // needs to match the name of the method in ChatHub.cs
    } catch (error) {
      console.log(error);
    }
  };
}
