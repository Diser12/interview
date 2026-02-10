import { useEffect, useState } from "react";
import { getCurrentConditions } from "~/api";
import type { CurrentConditionsForecast } from "~/types/forecast";
import { getWeatherIconUrl } from "~/utils/forecast";
import KeyValueItem from "../layout/key-value-item";

export default function Current({ locationId }: { locationId: string }) {
    const [currentConditions, setCurrentConditions] = useState<CurrentConditionsForecast | null>(null);
    const [isLoading, setIsLoading] = useState(false);
        
    useEffect(() => {
        const fetchCurrentConditions = async () => {
            try {
                setIsLoading(true);
                const result = await getCurrentConditions(locationId);
                setCurrentConditions(result);
            } catch (error) {
                console.error("Error fetching current conditions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentConditions();
    }, [locationId]);

    return (
        <div>
            {isLoading ? <p>Loading...</p> :
            (
                currentConditions ? (
                    <div className="flex space-between">
                        <div className="w-1/2 flex flex-col space-y-2">
                            <div className="flex space-x-4 items-center">
                                <img src={getWeatherIconUrl(currentConditions.WeatherIcon)} />
                                <div className="font-bold text-5xl">
                                    {currentConditions.Temperature.Imperial.Value}° {currentConditions.Temperature.Imperial.Unit}
                                </div>
                            </div>
                            <p className="text-lg">{currentConditions.WeatherText}</p>
                        </div>
                        <div className="w-1/2 flex flex-col justify-evenly divide-y divide-gray-300 border border-gray-300 rounded-md">
                            <KeyValueItem label={'Wind'} value={`${currentConditions.Wind.Direction.Localized} ${currentConditions.Wind.Speed.Imperial.Value} ${currentConditions.Wind.Speed.Imperial.Unit}`} />
                            <KeyValueItem label={'UV Index'} value={`${currentConditions.UVIndex} (${currentConditions.UVIndexText})`} />
                            <KeyValueItem label={'Dew Point'} value={`${currentConditions.DewPoint.Imperial.Value}° ${currentConditions.DewPoint.Imperial.Unit}`} />
                            <KeyValueItem label={'Visibility'} value={`${currentConditions.Visibility.Imperial.Value} ${currentConditions.Visibility.Imperial.Unit}`} />
                        </div>
                    </div>
                ) : <p>No data available.</p>
            )}
        </div>
    );
}