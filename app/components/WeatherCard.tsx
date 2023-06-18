import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useTypedFetcher } from "remix-typedjson";
import { useGetLocation } from "~/hooks/useGetLocation";
import type { loader } from "~/routes/resource+/weather";

export const WeatherCard = () => {
  const [location, error] = useGetLocation();
  const { submit, data, state } = useTypedFetcher<typeof loader>();
  const isLoading = state !== "idle";

  useEffect(() => {
    if (!location) return;
    submit(
      { lat: location.latitude.toString(), lon: location.longitude.toString() },
      { method: "GET", action: "/resource/weather" },
    );
  }, [submit, location]);

  if (error || typeof data === "string") {
    return <div>Failed to get location</div>;
  }

  if (isLoading || !data) {
    return (
      <div className="flex h-9 items-center justify-between rounded-lg bg-white p-2 shadow-md">
        <Loader2 height={24} width={24} stroke="black" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-9 items-center justify-between rounded-lg bg-white p-2 shadow-md">
      <h2 className="text-sm font-medium">{data.location.results[0].components.state}</h2>
      <div className="flex items-center gap-2">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather.weather[0].icon}.png`}
          alt={data.weather.weather[0].description}
          className="h-12 w-12"
        />

        <div className="text-sm font-medium text-gray-700">
          {data.weather.main.temp.toPrecision(2)}&deg;F
        </div>
        {/* <div className="text-gray-600">{data.weather.weather[0].description}</div> */}
      </div>
    </div>
  );
};
