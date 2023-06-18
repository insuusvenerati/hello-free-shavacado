import { cachified } from "cachified";
import { cache } from "~/cache.server";
import type { Root as Weather } from "~/types/weather";
import { getLocationInfo } from "~/utils/geo-location";

export const getWeather = async (lat: string, lon: string) => {
  return cachified({
    key: `weather-${lat}-${lon}`,
    cache: cache,
    async getFreshValue() {
      const location = await getLocationInfo(lat, lon);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPENWEATHER_API_KEY}`,
      );
      const weather: Weather = await response.json();
      return { weather, location };
    },
  });
};
