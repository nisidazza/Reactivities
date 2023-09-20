import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileFollowings } from "./ProfileFollowings";
import { ProfilePhotos } from "./ProfilePhotos";

export const ProfileContent: FC<{ profile: Profile }> = observer(
  ({ profile }) => {
    const {
      profileStore: { setActiveTab },
    } = useStore();

    const panes = [
      {
        menuItem: "About",
        render: () => (
          <Tab.Pane>
            <ProfileAbout />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Photos",
        render: () => (
          <Tab.Pane>
            <ProfilePhotos profile={profile} />
          </Tab.Pane>
        ),
      },
      { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
      {
        menuItem: "Followers",
        render: () => (
          <Tab.Pane>
            <ProfileFollowings />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Following",
        render: () => (
          <Tab.Pane>
            <ProfileFollowings />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
        onTabChange={(_, data) => setActiveTab(data.activeIndex as number)}
      />
    );
  }
);
