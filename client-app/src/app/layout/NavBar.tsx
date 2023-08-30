import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img
            src="/assets/logo.png"
            style={{ marginRight: "10px" }}
            alt="logo"
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item as={NavLink} to="/createActivity">
          <Button positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
