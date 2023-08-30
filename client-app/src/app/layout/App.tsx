import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { NavBar } from "./NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default observer(App);
