import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Card, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

export const ProfilePhotos: FC<{ profile: Profile }> = observer(
  ({ profile }) => {
    return (
      <Tab.Pane>
        <Header icon="image" content="Photos" />
        <Card.Group itemsPerRow={5}>
          {profile.photos?.map((photo) => (
            <Card key={photo.id}>
              <Image src={photo.url} />
            </Card>
          ))}
        </Card.Group>
      </Tab.Pane>
    );
  }
);
