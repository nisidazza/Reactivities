import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Grid } from "semantic-ui-react";
import { Activities, Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard: FC<{
  activities: Activities;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}> = observer(({ activities, createOrEdit, deleteActivity, submitting }) => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm createOrEdit={createOrEdit} submitting={submitting} />
        )}
      </Grid.Column>
    </Grid>
  );
});
