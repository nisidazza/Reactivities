import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { Activities } from "../models/activity";
import { NavBar } from "./NavBar";

export const App = () => {
  const [activities, setActivities] = useState<Activities>([]);

  useEffect(() => {
    axios
      .get<Activities>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
};
