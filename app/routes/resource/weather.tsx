import type { LoaderArgs } from "@remix-run/server-runtime";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { typedjson, useTypedFetcher } from "remix-typedjson";
import { useGetLocation } from "~/hooks/useGetLocation";
import { getWeather } from "~/models/weather.server";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return typedjson("Missing lat or lon", {
      status: 200,
      headers: {
        "Cache-Control": "private, max-age=3600",
      },
    });
  }

  const data = await getWeather(lat, lon);
  return typedjson(data);
};

export const WeatherCard = () => {
  const [location, error] = useGetLocation();
  const { submit, data, state } = useTypedFetcher<typeof loader>();
  const isLoading = state !== "idle";

  useEffect(() => {
    if (!location) return;
    submit(
      { lat: location.latitude.toString(), lon: location.longitude.toString() },
      { method: "get", action: "/resource/weather" },
    );
  }, [submit, location]);

  if (error || typeof data === "string") {
    return <div>Failed to get location</div>;
  }

  if (isLoading || !data) {
    return (
      <div className="bg-white flex items-center justify-between rounded-lg shadow-md p-2 h-9">
        <Loader2 height={24} width={24} stroke="black" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white flex items-center justify-between rounded-lg shadow-md p-2 h-9">
      <h2 className="text-sm font-medium">{data.location.results[0].components.state}</h2>
      <div className="flex items-center gap-2">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`}
          alt={data.weather.weather[0].description}
          className="w-12 h-12"
        />

        <div className="text-gray-700 font-medium text-sm">
          {data.weather.main.temp.toPrecision(2)}&deg;F
        </div>
        {/* <div className="text-gray-600">{data.weather.weather[0].description}</div> */}
      </div>
    </div>
  );
};
