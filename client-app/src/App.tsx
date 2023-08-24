import axios from "axios";
import { useEffect, useState } from "react";
import { Header, List, ListItem } from "semantic-ui-react";
import "./App.css";

type ActivityType = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;
};

type ActivitiesType = ActivityType[];

function App() {
  const [activities, setActivities] = useState<ActivitiesType>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
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
