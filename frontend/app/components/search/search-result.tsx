import { useLocalStorage } from "@uidotdev/usehooks";
import { NavLink } from "react-router";
import type { SearchResultLocation } from "~/types/search";

export default function SearchResult({ location, size = 'large' }: { location: SearchResultLocation, size?: 'small' | 'large' }) {
    const [searchHistory, setSearchHistory] = useLocalStorage<SearchResultLocation[]>('searchHistory', []);

    const addToSearchHistory = (location: SearchResultLocation) => {
        setSearchHistory([location, ...searchHistory.filter(loc => loc.Key !== location.Key)]);
    };

    return (
        <NavLink to={`/forecast/${location.Key}`} onClick={() => addToSearchHistory(location)}>
            <div className={`relative ${size === 'large' ? 'p-4 pl-12' : 'p-2 pl-8'} bg-white hover:bg-blue-100 cursor-pointer`}>
                <span className={`material-icons-outlined absolute ${size === 'large' ? 'left-4' : 'left-1'} top-1/2 transform -translate-y-1/2 text-gray-500`}>
                    location_on
                </span>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className={`${size === 'large' ? 'text-lg' : 'text-md'} font-semibold`}>{location.LocalizedName}</h2>
                        <p className={`${size === 'large' ? 'text-sm' : 'text-xs'} text-gray-600`}>{location.AdministrativeArea.LocalizedName}</p>
                    </div>
                    <p className={`${size === 'large' ? 'text-sm' : 'text-xs'} text-gray-600`}>{location.Country.LocalizedName}</p>
                </div>
            </div>
        </NavLink>
    );
}