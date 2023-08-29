import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Activities, Activity } from "../models/activity";
import { useStore } from "../stores/store";
import { LoadingComponent } from "./LoadingComponent";
import { NavBar } from "./NavBar";

const App = () => {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activities>([]);
  const [, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [, setEditMode] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.ActivitiesRequests.update(activity).then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.ActivitiesRequests.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.ActivitiesRequests.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
      setSubmitting(false);
    });
  };

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
};

export default observer(App);
