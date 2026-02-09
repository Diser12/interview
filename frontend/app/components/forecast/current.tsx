import { useEffect, useState } from "react";
import { getCurrentConditions } from "~/api";

export default function Current({ locationId }: { locationId: string }) {
    const [currentConditions, setCurrentConditions] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        
    useEffect(() => {
        const fetchCurrentConditions = async () => {
            try {
                setIsLoading(true);
                const result = await getCurrentConditions(locationId);
                setCurrentConditions(JSON.stringify(result));
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
            {isLoading ? <p>Loading...</p> : <pre>{currentConditions}</pre>}
        </div>
    );
}