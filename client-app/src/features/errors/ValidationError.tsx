import { FC } from "react";
import { Message } from "semantic-ui-react";

export const ValidationError: FC<{ errors: string[] }> = ({ errors }) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((error, i) => (
            <Message.Item key={i}>{error}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};
