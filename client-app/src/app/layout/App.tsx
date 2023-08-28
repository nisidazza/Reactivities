import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { Activities, Activity } from "../models/activity";
import { NavBar } from "./NavBar";

export const App = () => {
  const [activities, setActivities] = useState<Activities>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  useEffect(() => {
    axios
      .get<Activities>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  const selectActivity = (id: string) => {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  };

  const cancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivity}
          cancelSelectedActivity={cancelSelectedActivity}
        />
      </Container>
    </>
  );
};
