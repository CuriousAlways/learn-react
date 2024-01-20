// import weather service here
import weatherService from "../services/weatherService";
import { useEffect, useState } from "react";

const Weather = ({city})  => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .currentWheather(city)
      .then((weatherData) => setWeather(weatherData));
  }, []);

  if(!weather) {
    return (<p>Loading weather information</p>)
  }

  return (
    <div>
      <h1>Weather in {weather.address}</h1>
      <p>
        temperature {weather['currentConditions']['temp']} Celsius
        <br/>
        <img src={`${weatherService.iconUrl}/${weather['currentConditions']['icon']}.png`} alt={weather['currentConditions']['icon']} />
        <br/>
        wind speed {weatherService['currentWheather']['windspeed']}
      </p>
    </div>
  );
}

export default Weather;
