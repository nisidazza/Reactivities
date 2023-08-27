import { FC } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

export const ActivityDetails: FC<{ activity: Activity }> = ({ activity }) => {
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
          <Button color="blue" content="Edit" />
          <Button color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
