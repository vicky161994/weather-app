import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import fetchData from "./api/api";
import WeatherDetail from "../components/WeatherDetail";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [notFound, setNotFound] = useState();
  const [alanInstance, setAlanInstance] = useState();

  const formatData = useCallback(
    (detail) => {
      alanInstance.playText(`fetching weather detail for ${detail.detail}`);
    },
    [alanInstance]
  );

  useEffect(() => {
    window.addEventListener("search", formatData);
    return () => {
      window.removeEventListener("search", formatData);
    };
  }, [alanInstance, formatData]);

  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        key: process.env.ALAN_API_KEY,
        rootEl: document.getElementById("alan-btn"),
        onCommand: ({ command, city_name }) => {
          if (command === "search") {
            setCity(city_name);
            getData(city_name);
            window.dispatchEvent(
              new CustomEvent(command, { detail: city_name })
            );
          }
        },
      })
    );
  }, [weather]);

  const search = async (e) => {
    if (e.key === "Enter") {
      getData(city);
    }
  };
  const getData = async (e) => {
    const data = await fetchData(e);
    if (!data.response) {
      setWeather(data);
      setNotFound(null);
    } else {
      setNotFound(data.response.data.message);
      setWeather(null);
    }
  };

  return (
    <div id="body">
      <Head>
        <title>Weather App</title>
      </Head>
      <div className="main-container">
        <input
          type="text"
          className="search"
          placeholder="city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={search}
        />

        {weather && <WeatherDetail weather={weather} />}

        {notFound && (
          <div className="city">
            <h2 className="city-name">
              <span>{notFound}</span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
