module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
  env: {
    OEPN_WEATER_API_KEY: process.env.OEPN_WEATER_API_KEY,
    ALAN_API_KEY: process.env.ALAN_API_KEY,
  },
};
