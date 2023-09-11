import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/store";

export const ActivityListItemAttendee: FC<{ attendees: Profile[] }> = observer(
  ({ attendees }) => {
    const {} = useStore();

    return (
      <List horizontal>
        {attendees.map((attendee) => (
          <List.Item
            key={attendee.username}
            as={Link}
            to={`/profiles/${attendee.username}`}
          >
            <Image
              size="mini"
              circular
              src={attendee.image || "/assets/user.png"}
            />
          </List.Item>
        ))}
      </List>
    );
  }
);
