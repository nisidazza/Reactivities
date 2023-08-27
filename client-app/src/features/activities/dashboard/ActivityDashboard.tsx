import { FC } from "react";
import { Grid, List, ListItem } from "semantic-ui-react";
import { Activities } from "../../../app/models/activity";

export const ActivityDashboard: FC<{ activities: Activities }> = ({
  activities,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>{activity.title}</ListItem>
          ))}
        </List>
      </Grid.Column>
    </Grid>
  );
};
