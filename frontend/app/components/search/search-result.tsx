import { NavLink } from "react-router";
import type { SearchResultLocation } from "~/types/search";

export default function SearchResult({ location }: { location: SearchResultLocation }) {
    return (
        <NavLink to={`/forecast/${location.Key}`} className="p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold">{location.LocalizedName}</h2>
            <p className="text-sm text-gray-600">{location.AdministrativeArea.LocalizedName}</p>
        </NavLink>
    );
}