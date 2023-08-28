import { FC } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const LoadingComponent: FC<{ inverted?: boolean; content: string }> = ({
  inverted = true,
  content = "Loading ...",
}) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};
