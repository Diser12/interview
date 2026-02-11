import { useEffect, useState } from "react";
import { getForecastLocation } from "~/api";
import Tabs from "~/components/forecast/tabs";
import type { ForecastLocation } from "~/types/forecast";
import type { Route } from "./+types/forecast";

export default function Forecast({ params }: Route.ComponentProps) {
    const [forecastLocation, setForecastLocation] = useState<ForecastLocation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchForecastLocation = async () => {
            try {
                setHasError(false);
                setIsLoading(true);
                const result = await getForecastLocation(params.locationId);
                setForecastLocation(result);
            } catch (error) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchForecastLocation();
    }, [params.locationId]);

    return (
        <div className="md:py-16 py-8 bg-white md:bg-transparent md:w-3/4 w-full h-[calc(100vh-4rem)] mx-auto">
            {isLoading ? <p>Loading...</p> : (
                forecastLocation ? (
                    <div className="py-8 bg-white md:rounded-lg md:border md:border-gray-300">
                        <h2 className="text-4xl font-bold md:mx-8 mx-4 mb-4">
                            {`${forecastLocation.LocalizedName}, ${forecastLocation.AdministrativeArea.LocalizedName}`}
                        </h2>
                        <Tabs locationId={params.locationId} />
                    </div>
                ) : hasError ? <p>Error loading forecast data. Please try again later.</p> : null
            )} 
        </div>
    );
}