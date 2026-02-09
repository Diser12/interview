export default function getWeatherIconUrl(iconCode: number): string {
    return `https://www.accuweather.com/assets/images/weather-icons/v2a/${iconCode}.svg`;
}