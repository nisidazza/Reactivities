import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { IProfile } from "../../app/models/profile";

export const ProfileCard: FC<{ profile: IProfile }> = observer(
  ({ profile }) => {
    return (
      <Card as={Link} to={`/profiles/${profile.username}`}>
        <Image src={profile.image || "/assets/user.png"} />
        <Card.Content>
          <Card.Header>{profile.displayName}</Card.Header>
          <Card.Description>{profile.bio}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Icon name="user" />
          {profile.followersCount}
        </Card.Content>
      </Card>
    );
  }
);
