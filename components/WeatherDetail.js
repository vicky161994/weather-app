import Image from "next/image";

function WeatherDetail(props) {
  const { weather } = props;
  return (
    <div className="city">
      <h2 className="city-name">
        <span>{weather.name}</span>
        <sup>{weather.sys.country}</sup>
      </h2>
      <div className="city-temp">
        {weather.main.temp}
        <sup>&deg;C</sup>
      </div>
      <div className="info">
        <Image
          className="city-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          height="100"
          width="100"
          alt={weather.weather[0].description}
        />
        <p>{weather.weather[0].description}</p>
      </div>
    </div>
  );
}

export default WeatherDetail;
