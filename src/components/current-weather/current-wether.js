import "../current-weather/current-weather.css";
import { useEffect, useState } from "react";

const getWeatherEmoji = (description = "") => {
  const text = description.toLowerCase();

  if (text.includes("clear") || text.includes("sunny")) return "☀️";
  if (text.includes("cloud")) return "☁️";
  if (text.includes("rain") || text.includes("drizzle")) return "🌧️";
  if (text.includes("storm")) return "⛈️";
  if (text.includes("snow")) return "❄️";
  if (text.includes("mist") || text.includes("fog") || text.includes("haze")) return "🌫️";
  return "🌤️";
};

const CurrentWeather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const API_KEY = "80482c1bb4903db693571942404bbdde";

  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        emoji: getWeatherEmoji(data.weather[0].description),
      });
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  const fetchForcast = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();
    const dailyForecast = data?.list?.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );
    const nextFourDays = dailyForecast?.slice(1, 5);

    setForecastData(
      nextFourDays.map((item) => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        temperature: item.main.temp,
        description: item.weather[0].description,
        emoji: getWeatherEmoji(item.weather[0].description),
      }))
    );
  };

  useEffect(() => {
    fetchWeather(city);
    fetchForcast(city);
  }, [city]);

  return (
    <div className="current-weather">
      <div className="card">
        <div className="weather-emoji" aria-label={weatherData?.description || "Weather icon"}>
          {weatherData?.emoji || "🌤️"}
        </div>
        <div className="top">
          <p className="day">Today</p>
          <p className="city">{weatherData?.city || "Loading..."}</p>
          <p className="weather-description">
            Temperature: {weatherData?.temperature}°C
          </p>
          <p className="weather-description">{weatherData?.description}</p>
        </div>
      </div>
      {forecastData && forecastData.length > 0 && (
        <div className="mini-card">
          <WeatherDay
            day={forecastData[0]?.day}
            emoji={forecastData[0]?.emoji}
            temp={forecastData[0]?.temperature}
          />
          <WeatherDay
            day={forecastData[1]?.day}
            emoji={forecastData[1]?.emoji}
            temp={forecastData[1]?.temperature}
          />
          <WeatherDay
            day={forecastData[2]?.day}
            emoji={forecastData[2]?.emoji}
            temp={forecastData[2]?.temperature}
          />
          <WeatherDay
            day={forecastData[3]?.day}
            emoji={forecastData[3]?.emoji}
            temp={forecastData[3]?.temperature}
          />
        </div>
      )}
    </div>
  );
};

const WeatherDay = ({ day, emoji, temp }) => {
  return (
    <div className="day-card">
      <p className="wDay">{day}</p>
      <div className="imgW" aria-label="forecast weather icon">{emoji}</div>
      <p className="tempW">{temp}°C</p>
    </div>
  );
};

export default CurrentWeather;
