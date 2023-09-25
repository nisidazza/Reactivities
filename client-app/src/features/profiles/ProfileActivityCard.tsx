import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, CardMeta, Image } from "semantic-ui-react";
import { UserActivity } from "../../app/models/profile";

export const ProfileActivityCard: FC<{ activity: UserActivity }> = observer(
  ({ activity }) => {
    return (
      <Card as={Link} to={`/activities/${activity.id}`}>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
          <Card.Header textAlign="center">{activity.title}</Card.Header>
          <CardMeta textAlign="center">
            <div>{format(new Date(activity.date), "do LLL")}</div>
            <div>{format(new Date(activity.date), "H:mm a")}</div>
          </CardMeta>
        </Card.Content>
      </Card>
    );
  }
);
