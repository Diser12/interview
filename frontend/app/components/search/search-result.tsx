import { useLocalStorage } from "@uidotdev/usehooks";
import { NavLink } from "react-router";
import type { SearchResultLocation } from "~/types/search";

export default function SearchResult({ location }: { location: SearchResultLocation }) {
    const [searchHistory, setSearchHistory] = useLocalStorage<SearchResultLocation[]>('searchHistory', []);

    const addToSearchHistory = (location: SearchResultLocation) => {
        setSearchHistory([location, ...searchHistory.filter(loc => loc.Key !== location.Key)]);
    };

    return (
        <NavLink to={`/forecast/${location.Key}`} onClick={() => addToSearchHistory(location)} className="p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold">{location.LocalizedName}</h2>
            <p className="text-sm text-gray-600">{location.AdministrativeArea.LocalizedName}</p>
        </NavLink>
    );
}