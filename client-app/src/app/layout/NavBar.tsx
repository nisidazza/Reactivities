import { FC } from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export const NavBar: FC<{
  openForm: () => void;
}> = ({ openForm }) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            style={{ marginRight: "10px" }}
            alt="logo"
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={openForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
