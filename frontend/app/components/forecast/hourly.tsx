import { useEffect, useState } from "react";
import { getHourlyForecast } from "~/api";

export default function Hourly({ locationId }: { locationId: string }) {
    const [hourlyForecast, setHourlyForecast] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        
    useEffect(() => {
        const fetchHourlyForecast = async () => {
            try {
                setIsLoading(true);
                const result = await getHourlyForecast(locationId);
                setHourlyForecast(JSON.stringify(result));
            } catch (error) {
                console.error("Error fetching hourly forecast:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHourlyForecast();
    }, [locationId]);

    return (
        <div>
            {isLoading ? <p>Loading...</p> : <pre>{hourlyForecast}</pre>}
        </div>
    );
}