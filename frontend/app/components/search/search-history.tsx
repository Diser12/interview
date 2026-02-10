import { useLocalStorage } from "@uidotdev/usehooks";
import type { SearchResultLocation } from "~/types/search";
import SearchResult from "./search-result";

export default function SearchHistory() {
    const [searchHistory] = useLocalStorage<SearchResultLocation[]>('searchHistory', []);
    return (
        <div className="pt-4">
            <h2 className="text-xl font-semibold mb-2 px-5">Search History</h2>
            { searchHistory.length ? searchHistory.map((location) => {
                return <SearchResult key={location.Key} location={location} />;
            }) : <p className="px-4 text-gray-500">No search history yet.</p>}
        </div>
    )
}