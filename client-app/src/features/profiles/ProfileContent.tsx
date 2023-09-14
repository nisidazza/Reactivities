import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { ProfilePhotos } from "./ProfilePhotos";

export const ProfileContent: FC<{ profile: Profile }> = observer(
  ({ profile }) => {
    const panes = [
      { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
      {
        menuItem: "Photos",
        render: () => (
          <Tab.Pane>
            <ProfilePhotos profile={profile}/>
          </Tab.Pane>
        ),
      },
      { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
      {
        menuItem: "Followers",
        render: () => <Tab.Pane>Followers Content</Tab.Pane>,
      },
      {
        menuItem: "Following",
        render: () => <Tab.Pane>Following Content</Tab.Pane>,
      },
    ];

    return (
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
      />
    );
  }
);