import axios from "axios";
import { useEffect, useState } from "react";
import { Header, List, ListItem } from "semantic-ui-react";
import { Activities } from "../models/activity";

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
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
