import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function CustomNavbar() {
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <Navbar.Brand href="#">Meteo</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default CustomNavbar;
