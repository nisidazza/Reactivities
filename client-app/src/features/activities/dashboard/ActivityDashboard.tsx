import { FC } from "react";
import { Grid } from "semantic-ui-react";
import { Activities } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard: FC<{ activities: Activities }> = ({
  activities,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
    </Grid>
  );
};
