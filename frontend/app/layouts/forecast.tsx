import { Link, Outlet } from "react-router";
import SearchBar from "~/components/search/search-bar";

export default function ForecastLayout() {
    return (
        <>
            <div className="flex h-16 justify-between items-center px-8 bg-gray-100">
                <Link to="/" className="font-bold text-xl">
                    Weather Forecast App
                </Link>
                <SearchBar />
                <div>
                    Search History
                </div>
            </div>
            <div className="min-h-screen mt-16 mx-8">
                <Outlet />
            </div>
        </>
    );
}