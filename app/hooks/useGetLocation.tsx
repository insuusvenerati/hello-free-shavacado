import { useEffect, useState } from "react";

type Location = {
  latitude: number;
  longitude: number;
};

export const useGetLocation = (): [Location | null, unknown | null] => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
      } catch (error) {
        setError(error);
      }
    };
    getLocation();
  }, []);

  return [location, error];
};
