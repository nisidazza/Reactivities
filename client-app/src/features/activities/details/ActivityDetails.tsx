import { FC } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

export const ActivityDetails: FC<{
  activity: Activity;
  cancelSelectedActivity: () => void;
  openForm: (id: string) => void;
}> = ({ activity, cancelSelectedActivity, openForm }) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            color="blue"
            content="Edit"
            onClick={() => openForm(activity.id)}
          />
          <Button
            color="grey"
            content="Close"
            onClick={cancelSelectedActivity}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
