import type { Location } from "~/types/location";

export const getLocation = async (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

export const getLocationInfo = async (lat: string, lon: string) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.GEOCODING_API_KEY}`,
  );
  const data: Location = await response.json();
  return data;
};
