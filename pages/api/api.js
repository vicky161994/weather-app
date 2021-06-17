import axios from "axios";

export default async function fetchData(req) {
  try {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = process.env.OEPN_WEATER_API_KEY;
    const { data } = await axios.get(url, {
      params: { q: req, units: "metric", APPID: API_KEY },
    });
    return data;
  } catch (error) {
    return error;
  }
}
