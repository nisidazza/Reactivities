import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Activities, Activity } from "../models/activity";
import { LoadingComponent } from "./LoadingComponent";
import { NavBar } from "./NavBar";

export const App = () => {
  const [activities, setActivities] = useState<Activities>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.ActivitiesRequests.list()
      .then((response) => {
        let activities: Activities = [];
        response.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          activities.push(activity);
        });
        setActivities(activities);
        setLoading(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  };

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((a) => a.id !== id)]);
  };

  if (loading) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
};
