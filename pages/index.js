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
        key:
          process.env.ALAN_API_KEY ||
          "c17d9b322a3784d953f3cfbb31fc7ab62e956eca572e1d8b807a3e2338fdd0dc/stage",
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
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Weather App" />
        <meta name="keywords" content="Weather Opengweather nextjs reactjs" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/img/logo.png"></link>
        <meta name="theme-color" content="#317EFB" />
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
