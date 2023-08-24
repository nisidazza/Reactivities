import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";

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
    axios.get("http://localhost:5000/api/activities").then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>{activity.title}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
