import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";
import { Card, Grid, Header, Tab, TabProps } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { ProfileActivityCard } from "./ProfileActivityCard";

export const ProfileActivities = observer(() => {
  const {
    profileStore: {
      loadingActivities,
      loadUserActivities,
      userActivities,
      profile,
    },
  } = useStore();

  const panes = [
    {
      menuItem: "Future Events",
      pane: { key: "future" },
    },
    {
      menuItem: "Past Events",
      pane: { key: "past" },
    },
    {
      menuItem: "Hosting",
      pane: { key: "hosting" },
    },
  ];

  useEffect(() => {
    loadUserActivities(profile!.username);
  }, [loadUserActivities, profile]);

  const handleTabChange = (_: SyntheticEvent, data: TabProps) => {
    loadUserActivities(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="Activities" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(_, data) => handleTabChange(_, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userActivities.map((userActivity) => (
              <ProfileActivityCard
                activity={userActivity}
                key={userActivity.id}
              />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
