import { FC, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

export const ActivityListItem: FC<{ activity: Activity }> = ({ activity }) => {
  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;

  const [target, setTarget] = useState<string>("");

  const handleActivityDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  };
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>
          {activity.description}
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            color="teal"
            floated="right"
            content="View"
          />
          <Button
            name={activity.id}
            loading={loading && target === activity.id}
            floated="right"
            content="Delete"
            color="red"
            onClick={(e) => handleActivityDelete(e, activity.id)}
          />
        </span>
      </Segment>
    </Segment.Group>
  );
};
