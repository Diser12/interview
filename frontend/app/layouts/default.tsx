import { Outlet } from "react-router";

export default function DefaultLayout() {
    return (
        <>
            <div className="flex h-16 justify-between items-center px-8 bg-gray-100">
                <div className="font-bold text-xl">
                    Weather Forecast App
                </div>
            </div>
            <div className="min-h-screen mt-16 mx-8">
                <Outlet />
            </div>
        </>
    );
}