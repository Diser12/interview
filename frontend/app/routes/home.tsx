import { Link } from "react-router";

export default function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <h2>Welcome to the interview app!</h2>
                <p>
                    Edit <code>app/root.tsx</code> and save to reload.
                </p>

                <ul>
                    <li>Fetch Data from a public API <Link to="https://github.com/toddmotto/public-apis" className="text-blue-500 underline hover:text-blue-600">Samples</Link></li>
                    <li>Display data from API onto your page (Table, List, etc.)</li>
                    <li>Apply a styling solution of your choice to make your page look different (CSS, SASS, CSS-in-JS)</li> 
                </ul>   
            </header>
        </div>
    );
}