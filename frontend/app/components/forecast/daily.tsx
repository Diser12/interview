import { useEffect, useState } from "react";
import { getDailyForecast } from "~/api";

export default function Daily({ locationId }: { locationId: string }) {
    const [dailyForecast, setDailyForecast] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        
    useEffect(() => {
        const fetchDailyForecast = async () => {
            try {
                setIsLoading(true);
                const result = await getDailyForecast(locationId);
                setDailyForecast(JSON.stringify(result));
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
            {isLoading ? <p>Loading...</p> : <pre>{dailyForecast}</pre>}
        </div>
    );
}