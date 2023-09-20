import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export const FollowButton: FC<{ profile: Profile }> = observer(
  ({ profile }) => {
    const {
      profileStore: { updateFollowing, loading },
      userStore,
    } = useStore();

    if (userStore.user?.username === profile.username) return null;

    const handleFollow = (e: SyntheticEvent, username: string) => {
      e.preventDefault();
      profile.following
        ? updateFollowing(username, false)
        : updateFollowing(username, true);
    };

    return (
      <Reveal animated="move">
        <Reveal.Content visible style={{ width: "100%" }}>
          <Button
            fluid
            color="teal"
            content={profile.following ? "Following" : "Not Following"}
          />
        </Reveal.Content>
        <Reveal.Content hidden style={{ width: "100%" }}>
          <Button
            fluid
            basic
            color={profile.following ? "red" : "green"}
            content={profile.following ? "Unfollow" : "Follow"}
            loading={loading}
            onClick={(e) => handleFollow(e, profile.username)}
          />
        </Reveal.Content>
      </Reveal>
    );
  }
);
