import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import SearchBar from "~/components/search/search-bar";
import SearchHistory from "~/components/search/search-history";

export default function DefaultLayout() {
    const [isSearchHistoryVisible, setIsSearchHistoryVisible] = useState(false);

    const toggleSearchHistory = () => {
        setIsSearchHistoryVisible(!isSearchHistoryVisible);
    };

    const currentLocation = useLocation();

    return (
        <>
            <div className="flex h-16 justify-between items-center px-8 bg-gray-100">
                <Link to="/" className="font-bold text-xl">
                    Weather Forecast App
                </Link>
                {currentLocation.pathname !== '/' && <SearchBar />}
                <div>
                    <button onClick={toggleSearchHistory} className="px-4 py-2 bg-gray-300 rounded-md">
                        Toggle Search History
                    </button>
                </div>
            </div>
            <div className="relative min-h-screen mt-16 mx-8">
                <Outlet />
                {isSearchHistoryVisible && (
                    <div className="absolute top-0 right-0">
                        <SearchHistory />
                    </div>
                )}
            </div>
        </>
    );
}