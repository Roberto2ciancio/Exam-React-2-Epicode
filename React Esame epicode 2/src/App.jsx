import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";
import { Container, Card } from "react-bootstrap";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = "bf818eb3604a546ded52518b197fb159";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Città non trovata");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <CustomNavbar onCityChange={fetchWeather} />
      <Container className="mt-5 pt-5">
        {error && <p className="text-danger">{error}</p>}
        {weatherData && (
          <Card className="text-center mt-4">
            <Card.Body>
              <Card.Title>Meteo a {weatherData.name}</Card.Title>
              <Card.Text>
                <strong>Temperatura:</strong> {weatherData.main.temp}°C <br />
                <strong>Condizioni:</strong>{" "}
                {weatherData.weather[0].description} <br />
                <strong>Umidità:</strong> {weatherData.main.humidity}% <br />
                <strong>Vento:</strong> {weatherData.wind.speed} m/s
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default App;
