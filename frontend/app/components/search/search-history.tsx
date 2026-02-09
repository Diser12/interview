import { useLocalStorage } from "@uidotdev/usehooks";
import type { SearchResultLocation } from "~/types/search";
import SearchResult from "./search-result";

export default function SearchHistory() {
    const [searchHistory] = useLocalStorage<SearchResultLocation[]>('searchHistory', []);
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Search History</h2>
            { searchHistory.length ? searchHistory.map((location) => {
                return <SearchResult key={location.Key} location={location} />;
            }) : <p className="text-gray-500">No search history yet.</p>}
        </div>
    )
}