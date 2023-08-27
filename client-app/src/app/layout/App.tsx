import axios from "axios";
import { useEffect, useState } from "react";
import { Container, List, ListItem } from "semantic-ui-react";
import { Activities } from "../models/activity";
import { NavBar } from "./NavBar";

function App() {
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
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>{activity.title}</ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
