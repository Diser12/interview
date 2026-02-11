import { formatDate, formatTime, getWeatherIconUrl } from "~/utils/forecast";
import { Fragment, useEffect, useState } from "react";
import Drawer from "../layout/drawer";
import { getDailyForecast } from "~/api";
import KeyValueItem from "../layout/key-value-item";
import type { CelestialData, DailyForecast, DailyPeriodData, Measurement } from "~/types/forecast";

function DailyDrawer({ date, timeOfDay, periodData, temperature, celestialData }: { date: string; timeOfDay: string; periodData: DailyPeriodData; temperature: Measurement; celestialData: CelestialData }) {
    return (
        <Drawer
            main={
                <div className="flex items-center justify-between">
                    <div className="flex items-center md:space-x-4 space-x-2">
                        <div className="font-bold md:text-lg">{formatDate(date)} ({timeOfDay})</div>
                        <img src={getWeatherIconUrl(periodData.Icon)} />
                        <div className="font-bold md:text-3xl text-xl">{temperature.Value}° {temperature.Unit}</div>
                    </div>
                    <div className="text-sm flex items-center space-x-1">
                        <span className="material-icons-outlined text-gray-500">water_drop</span><span>{periodData.PrecipitationProbability}%</span>
                    </div>
                </div>
            }
            expandedContent={
                <Fragment>
                    <p className="md:text-md text-sm mb-4">{periodData.LongPhrase}</p>
                    <div className="lg:w-1/2 flex flex-col justify-evenly divide-y divide-gray-300">
                        <KeyValueItem label="Total Precipitation" value={`${periodData.TotalLiquid.Value} ${periodData.TotalLiquid.Unit}`} />
                        <KeyValueItem label="Wind" value={`${periodData.Wind.Direction.Localized} ${periodData.Wind.Speed.Value} ${periodData.Wind.Speed.Unit}`} />
                        <KeyValueItem label="Sunrise" value={formatTime(celestialData.Rise, true)} />
                        <KeyValueItem label="Sunset" value={formatTime(celestialData.Set, true)} />
                    </div>
                </Fragment>
            }
        />
    )
}

export default function Daily({ locationId }: { locationId: string }) {
    const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
        
    useEffect(() => {
        const fetchDailyForecast = async () => {
            try {
                setHasError(false);
                setIsLoading(true);
                const result = await getDailyForecast(locationId);
                setDailyForecast(result);
            } catch (error) {
                setHasError(true);
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
                            <Fragment key={`${index}`}>
                                <DailyDrawer date={day.Date} timeOfDay="Day" periodData={day.Day} temperature={day.Temperature.Maximum} celestialData={day.Sun} />
                                <DailyDrawer date={day.Date} timeOfDay="Night" periodData={day.Night} temperature={day.Temperature.Minimum} celestialData={day.Moon} />
                            </Fragment>
                        ))}
                    </div>
                ) : (
                    hasError ? <p>Error loading forecast data. Please try again later.</p> : null
                )
            )}
        </div>
    );
}
