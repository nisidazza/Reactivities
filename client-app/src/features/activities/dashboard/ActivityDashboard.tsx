import { FC } from "react";
import { Grid } from "semantic-ui-react";
import { Activities } from "../../../app/models/activity";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard: FC<{ activities: Activities }> = ({
  activities,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width="6">
        {activities[0] && <ActivityDetails activity={activities[0]} />}
        <ActivityForm activity={activities[0]} />
      </Grid.Column>
    </Grid>
  );
};
