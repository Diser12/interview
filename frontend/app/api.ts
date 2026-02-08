import axios from "axios";
import type { SearchResultLocation } from "./types/search";

const baseUrl = 'https://dataservice.accuweather.com';
const apiKey = 'zpka_ead7e8e229c14576ac49a391345a93bf_15eca384';

export async function getLocations(query: string): Promise<SearchResultLocation[]> {
    const response = await axios.get(`${baseUrl}/locations/v1/US/search?q=${query}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    return response.data;
}

export async function getCurrentConditions(locationKey: string) {
    const response = await axios.get(`${baseUrl}/currentconditions/v1/${locationKey}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    return response.data[0];
}

export async function getDailyForecast(locationKey: string) {
    const response = await axios.get(`${baseUrl}/forecasts/v1/daily/5day/${locationKey}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    return response.data;
}

export async function getHourlyForecast(locationKey: string) {
    const response = await axios.get(`${baseUrl}/forecasts/v1/hourly/12hour/${locationKey}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    return response.data;
}