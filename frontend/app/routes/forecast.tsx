import { useEffect, useState } from "react";
import type { Route } from "./+types/forecast";
import Tabs from "~/components/forecast/tabs";
import type { ForecastLocation } from "~/types/forecast";
import { getForecastLocation } from "~/api";

export default function Forecast({ params }: Route.ComponentProps) {
    const [forecastLocation, setForecastLocation] = useState<ForecastLocation | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchForecastLocation = async () => {
            try {
                setIsLoading(true);
                const result = await getForecastLocation(params.locationId);
                setForecastLocation(result);
            } catch (error) {
                console.error("Error fetching forecast location:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchForecastLocation();
    }, [params.locationId]);

    return (
        <div className="pt-16 w-3/4 mx-auto">
            {isLoading ? <p>Loading...</p> : (
                forecastLocation ? (
                    <>
                        <h2 className="text-4xl font-bold mb-4">
                            {`${forecastLocation.LocalizedName}, ${forecastLocation.AdministrativeArea.LocalizedName}`}
                        </h2>
                        <Tabs locationId={params.locationId} />
                    </>
                ) : null
            )} 
        </div>
    );
}