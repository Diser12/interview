import React from "react";
import type { Route } from "./+types/forecast";
import { getCurrentConditions } from "~/api";

export default function Forecast({ params }: Route.ComponentProps) {
    const [currentConditions, setCurrentConditions] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchCurrentConditions = async () => {
            try {
                setIsLoading(true);
                const result = await getCurrentConditions(params.locationId);
                setCurrentConditions(JSON.stringify(result));
            } catch (error) {
                console.error("Error fetching current conditions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentConditions();
    }, [params.locationId]);


    return (
        <div>
            {isLoading ? <p>Loading...</p> : <pre>{currentConditions}</pre>}
        </div>
    );
}