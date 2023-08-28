import { FC } from "react";
import { Grid } from "semantic-ui-react";
import { Activities, Activity } from "../../../app/models/activity";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard: FC<{
  activities: Activities;
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
}> = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectedActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectedActivity={cancelSelectedActivity}
          />
        )}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};
