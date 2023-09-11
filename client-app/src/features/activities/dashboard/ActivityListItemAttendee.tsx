import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";
import { IProfile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/store";
import { ProfileCard } from "../../profiles/ProfileCard";

export const ActivityListItemAttendee: FC<{ attendees: IProfile[] }> = observer(
  ({ attendees }) => {
    const {} = useStore();

    return (
      <List horizontal>
        {attendees.map((attendee) => (
          <Popup
            hoverable
            key={attendee.username}
            trigger={
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
            }
          >
            <Popup.Content>
              <ProfileCard profile={attendee} />
            </Popup.Content>
          </Popup>
        ))}
      </List>
    );
  }
);
