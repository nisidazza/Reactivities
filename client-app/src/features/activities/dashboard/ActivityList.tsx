import { FC, SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activities } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

export const ActivityList: FC<{
  activities: Activities;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}> = ({ activities, deleteActivity, submitting }) => {
  const [target, setTarget] = useState<string>("");

  const { activityStore } = useStore();

  const handleActivityDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  };
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => activityStore.selectActivity(activity.id)}
                />
                <Button
                  name={activity.id}
                  loading={submitting && target === activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
