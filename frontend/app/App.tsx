import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import SearchBar from "~/components/search/search-bar";
import SearchHistory from "~/components/search/search-history";
import './index.css';

export default function App() {
    const [searchHistoryVisibility, setSearchHistoryVisibility] = useState(false);

    const toggleSearchHistory = () => {
        setSearchHistoryVisibility(!searchHistoryVisibility);
    };

    const currentLocation = useLocation();

    useEffect(() => {
        setSearchHistoryVisibility(false);
    }, [currentLocation]);

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
            <div className="relative min-h-screen mt-16 w-3/4 mx-auto">
                <Outlet />
                {searchHistoryVisibility && (
                    <div className="absolute top-0 right-0">
                        <SearchHistory />
                    </div>
                )}
            </div>
        </>
    );
}