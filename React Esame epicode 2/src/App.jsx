import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";
import CustomFooter from "./components/customFooter";
import { Container, Card, Row, Col } from "react-bootstrap";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null); // Stato per il meteo attuale
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = "bf818eb3604a546ded52518b197fb159";

    try {
      // Chiamata per il meteo attuale
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
      );
      if (!currentWeatherResponse.ok) {
        throw new Error("Città non trovata");
      }
      const currentWeatherData = await currentWeatherResponse.json();
      setCurrentWeather(currentWeatherData);

      // Chiamata per le previsioni future
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=it`
      );
      if (!forecastResponse.ok) {
        throw new Error("Città non trovata");
      }
      const forecastData = await forecastResponse.json();
      setWeatherData(forecastData);

      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setCurrentWeather(null);
    }
  };

  const getDailyForecasts = () => {
    if (!weatherData) return [];

    const dailyForecasts = {};
    weatherData.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // Ottieni solo la data (es. "2025-04-12")
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = item; // Salva solo la prima previsione del giorno
      }
    });

    return Object.values(dailyForecasts).slice(0, 5); // Prendi solo i primi 5 giorni
  };

  const getBackgroundClass = () => {
    if (!currentWeather) return "default-bg";

    const condition = currentWeather.weather[0].main.toLowerCase();

    if (condition.includes("clear")) return "sunny-bg";
    if (condition.includes("cloud")) return "cloudy-bg";
    if (condition.includes("rain")) return "rainy-bg";
    if (condition.includes("snow")) return "snowy-bg";

    return "default-bg";
  };

  return (
    <div id="root" className={getBackgroundClass()}>
      <CustomNavbar onCityChange={fetchWeather} />
      <div className="content">
        <Container className="mt-5 pt-5">
          {error && <p className="text-danger">{error}</p>}
          {currentWeather && (
            <>
              {/* Card per il meteo attuale */}
              <Card className="text-center mt-4">
                <Card.Body>
                  <Card.Title>Meteo attuale a {currentWeather.name}</Card.Title>
                  <Card.Text>
                    <strong>Temperatura:</strong> {currentWeather.main.temp}°C{" "}
                    <br />
                    <strong>Condizioni:</strong>{" "}
                    {currentWeather.weather[0].description} <br />
                    <strong>Umidità:</strong> {currentWeather.main.humidity}%{" "}
                    <br />
                    <strong>Vento:</strong> {currentWeather.wind.speed} m/s
                  </Card.Text>
                  <img
                    src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                    alt={currentWeather.weather[0].description}
                    style={{ width: "100px", height: "100px" }}
                  />
                </Card.Body>
              </Card>

              {/* Card per le previsioni dei prossimi 5 giorni */}
              {weatherData && (
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Title>Previsioni per i prossimi 5 giorni</Card.Title>
                    <Row>
                      {getDailyForecasts().map((forecast, index) => (
                        <Col key={index} md={2} className="text-center">
                          <Card className="mb-3">
                            <Card.Body>
                              <Card.Text>
                                <strong>{forecast.dt_txt.split(" ")[0]}</strong>{" "}
                                <br />
                                <img
                                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                                  alt={forecast.weather[0].description}
                                  style={{ width: "50px", height: "50px" }}
                                />
                                <br />
                                <strong>{forecast.main.temp}°C</strong> <br />
                                {forecast.weather[0].description}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </Container>
      </div>
      <CustomFooter />
    </div>
  );
}

export default App;
