import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function HomePage() {
  return (
    <Container className="mt-5 pt-5">
      {/* Condizioni Meteo Attuali */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Condizioni Meteo Attuali</Card.Title>
              <Card.Text>
                <strong>Luogo:</strong> Roma <br />
                <strong>Temperatura:</strong> 22°C <br />
                <strong>Condizioni:</strong> Soleggiato
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Previsioni per i Prossimi Giorni */}
      <Row>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Domani</Card.Title>
              <Card.Text>
                <strong>Temperatura:</strong> 20°C <br />
                <strong>Condizioni:</strong> Parzialmente nuvoloso
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Tra 2 Giorni</Card.Title>
              <Card.Text>
                <strong>Temperatura:</strong> 18°C <br />
                <strong>Condizioni:</strong> Pioggia leggera
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Tra 3 Giorni</Card.Title>
              <Card.Text>
                <strong>Temperatura:</strong> 21°C <br />
                <strong>Condizioni:</strong> Soleggiato
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;