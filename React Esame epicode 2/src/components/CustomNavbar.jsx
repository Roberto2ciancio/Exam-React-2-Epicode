import React, { useState } from "react";
import { Navbar, Container, Form, Button } from "react-bootstrap";

function CustomNavbar({ onCityChange }) {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onCityChange(city);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand href="#">Meteo Epicode</Navbar.Brand>
        <div className="d-flex justify-content-center ">
          <Form
            className="d-flex justify-content-center"
            onSubmit={handleSearch}
          >
            <Form.Control
              type="text"
              placeholder="Cerca città"
              className="me-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Cerca
            </Button>
          </Form>
        </div>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
