import { useEffect, useState } from "react";
import { getDailyForecast } from "~/api";
import type { DailyForecast } from "~/types/forecast";
import Drawer from "../layout/drawer";
import { formatDate, formatTime, getWeatherIconUrl } from "~/utils/forecast";
import KeyValueItem from "../layout/key-value-item";

export default function Daily({ locationId }: { locationId: string }) {
    const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
        const [isLoading, setIsLoading] = useState(false);
        
    useEffect(() => {
        const fetchDailyForecast = async () => {
            try {
                setIsLoading(true);
                const result = await getDailyForecast(locationId);
                setDailyForecast(result);
            } catch (error) {
                console.error("Error fetching daily forecast:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDailyForecast();
    }, [locationId]);

    return (
        <div>
            {isLoading ? <p>Loading...</p> :
            (
                dailyForecast.length ? (
                    <div className="flex flex-col space-y-4">
                        {dailyForecast.map((day, index) => (
                            <>
                                <Drawer
                                    key={`day-${index}`}
                                    main={
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="font-bold text-lg">{formatDate(day.Date)} (Day)</div>
                                                <img src={getWeatherIconUrl(day.Day.Icon)} />
                                                <div className="font-bold text-3xl">{day.Temperature.Maximum.Value}° {day.Temperature.Maximum.Unit}</div>
                                            </div>
                                            <div className="text-sm flex items-center space-x-1">
                                                <span className="material-icons-outlined text-gray-500">water_drop</span><span>{day.Day.PrecipitationProbability}%</span>
                                            </div>
                                        </div>
                                    }
                                    expandedContent={
                                        <>
                                            <p className="mb-4">{day.Day.LongPhrase}</p>
                                            <div className="w-1/2 flex flex-col justify-evenly divide-y divide-gray-300">
                                                <KeyValueItem label="Total Precipitation" value={`${day.Day.TotalLiquid.Value} ${day.Day.TotalLiquid.Unit}`} />
                                                <KeyValueItem label="Wind" value={`${day.Day.Wind.Direction.Localized} ${day.Day.Wind.Speed.Value} ${day.Day.Wind.Speed.Unit}`} />
                                                <KeyValueItem label="Sunrise" value={formatTime(day.Sun.Rise, true)} />
                                                <KeyValueItem label="Sunset" value={formatTime(day.Sun.Set, true)} />
                                            </div>
                                        </>
                                    }
                                />
                                <Drawer
                                    key={`night-${index}`}
                                    main={
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="font-bold text-lg">{formatDate(day.Date)} (Night)</div>
                                                <img src={getWeatherIconUrl(day.Night.Icon)} />
                                                <div className="font-bold text-3xl">{day.Temperature.Minimum.Value}° {day.Temperature.Minimum.Unit}</div>
                                            </div>
                                            <div className="text-sm flex items-center space-x-1">
                                                <span className="material-icons-outlined text-gray-500">water_drop</span><span>{day.Night.PrecipitationProbability}%</span>
                                            </div>
                                        </div>
                                    }
                                    expandedContent={
                                        <>
                                            <p className="mb-4">{day.Night.LongPhrase}</p>
                                            <div className="w-1/2 flex flex-col justify-evenly divide-y divide-gray-300">
                                                <KeyValueItem label="Total Precipitation" value={`${day.Night.TotalLiquid.Value} ${day.Night.TotalLiquid.Unit}`} />
                                                <KeyValueItem label="Wind" value={`${day.Night.Wind.Direction.Localized} ${day.Night.Wind.Speed.Value} ${day.Night.Wind.Speed.Unit}`} />
                                                <KeyValueItem label="Moonrise" value={formatTime(day.Moon.Rise, true)} />
                                                <KeyValueItem label="Moonset" value={formatTime(day.Moon.Set, true)} />
                                            </div>
                                        </>
                                    }
                                />
                            </>
                        ))}
                    </div>
                ) : <p>No data available.</p>
            )}
        </div>
    );
}