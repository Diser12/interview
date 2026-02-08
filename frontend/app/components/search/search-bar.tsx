import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
import { getLocations } from "~/api";
import type { SearchResultLocation } from "~/types/search";
import SearchResult from "./search-result";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([] as SearchResultLocation[]);
    const debouncedSearchTerm = useDebounce(searchTerm, 250);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    React.useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                if (debouncedSearchTerm.trim()) {
                    const results = (await getLocations(debouncedSearchTerm)).slice(0, 5);
                    setSearchResults(results);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        if (debouncedSearchTerm.trim()) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchTerm]);

    return (
        <div className="mx-auto w-1/2">
            <input
                type="text"
                placeholder="Search for a location..."
                className="border border-gray-300 rounded-md p-2 w-full bg-white"
                onChange={handleInputChange}
            />
            {searchResults.length > 0 && searchResults.map((location) => {
                return <SearchResult location={location} key={location.Key} />;
            })}
        </div>
    );
}