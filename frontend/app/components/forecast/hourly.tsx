import { formatTime, getWeatherIconUrl } from "~/utils/forecast";
import { useEffect, useState } from "react";
import Drawer from "../layout/drawer";
import { getHourlyForecast } from "~/api";
import KeyValueItem from "../layout/key-value-item";
import type { HourlyForecast } from "~/types/forecast";

export default function Hourly({ locationId }: { locationId: string }) {
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
        
    useEffect(() => {
        const fetchHourlyForecast = async () => {
            try {
                setIsLoading(true);
                const result = await getHourlyForecast(locationId);
                setHourlyForecast(result);
            } catch (error) {
                setHasError(true);
                console.error("Error fetching hourly forecast:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHourlyForecast();
    }, [locationId]);

    return (
        <div>
            {isLoading ? <p>Loading...</p> : 
            (
                hourlyForecast.length ? (
                    <div className="flex flex-col space-y-4">
                        {hourlyForecast.map((hour, index) => (
                            <Drawer
                                key={index}
                                main={
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="font-bold text-lg">{formatTime(hour.DateTime)}</div>
                                                <img src={getWeatherIconUrl(hour.WeatherIcon)} />
                                                <div className="font-bold text-3xl">{hour.Temperature.Value}° {hour.Temperature.Unit}</div>
                                                <p>{hour.IconPhrase}</p>
                                            </div>
                                            <div className="text-sm flex items-center space-x-1">
                                                <span className="material-icons-outlined text-gray-500">water_drop</span><span>{hour.PrecipitationProbability}%</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                                expandedContent={
                                    <div className="w-1/2 flex flex-col justify-evenly divide-y divide-gray-300">
                                        <KeyValueItem label="Wind" value={`${hour.Wind.Direction.Localized} ${hour.Wind.Speed.Value} ${hour.Wind.Speed.Unit}`} />
                                        <KeyValueItem label="UV Index" value={`${hour.UVIndex} (${hour.UVIndexText})`} />
                                        <KeyValueItem label="Dew Point" value={`${hour.DewPoint.Value}° ${hour.DewPoint.Unit}`} />
                                        <KeyValueItem label="Visibility" value={`${hour.Visibility.Value} ${hour.Visibility.Unit}`} />
                                    </div>
                                }
                            />
                        ))}
                    </div>
                ) : (
                    hasError ? <p>Error loading forecast data. Please try again later.</p> : null
                )
            )}
        </div>
    );
}