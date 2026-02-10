import SearchBar from "~/components/search/search-bar";

export default function Home() {
    return (
        <div className="pt-8 w-1/2 mx-auto">
            <header className="text-center">
                <h2 className="text-2xl font-bold">Weather Forecast App (powered by AccuWeather)</h2>
                <p className="mt-2">
                    Search for a location using the search bar below.
                </p>
            </header>
            <main className="mt-8">
                <SearchBar />
            </main>
        </div>
    );
}