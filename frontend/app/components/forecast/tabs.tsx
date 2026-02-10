import { createContext, useContext, useState } from "react";
import Current from "./current";
import Daily from "./daily";
import Hourly from "./hourly";

type TabType = 'CURRENT' | 'HOURLY' | 'DAILY';

const tabContext = createContext({
    activeTabValue: 'CURRENT' as TabType,
    setActiveTabValue: (tab: TabType) => {}
});

function TabProvider({ children }: { children: React.ReactNode }) {
    const [activeTabValue, setActiveTabValue] = useState<TabType>('CURRENT');

    return (
        <tabContext.Provider value={{ activeTabValue, setActiveTabValue }}>
            {children}
        </tabContext.Provider>
    );
}

function TabTrigger({ value, children }: { value: TabType; children: React.ReactNode }) {
    const { activeTabValue, setActiveTabValue } = useContext(tabContext);

    const handleClick = () => {
        setActiveTabValue(value);
    };

    return (
        <button onClick={handleClick} className={`px-4 py-2 bg-gray-100 rounded-t-md border-t border-l border-r border-gray-300 ${activeTabValue === value ? "border-b border-b-white bg-white mb-[-1px]" : ""}`}>
            {children}
        </button>
    );
}

function TabContent({ value, children }: { value: TabType; children: React.ReactNode }) {
    const { activeTabValue } = useContext(tabContext);

    return activeTabValue === value ? <div className="pt-8 px-8">{children}</div> : null;
}

export default function Tabs({ locationId }: { locationId: string }) {
    return (
        <TabProvider>
            <div className="flex flex-col divide-y divide-gray-300">
                <div className="flex space-x-8 px-8">
                    <TabTrigger value="CURRENT">Current Conditions</TabTrigger>
                    <TabTrigger value="HOURLY">Hourly Forecast</TabTrigger>
                    <TabTrigger value="DAILY">Daily Forecast</TabTrigger>
                </div>
                <TabContent value="CURRENT">
                    <Current locationId={locationId} />
                </TabContent>
                <TabContent value="HOURLY">
                    <Hourly locationId={locationId} />
                </TabContent>
                <TabContent value="DAILY">
                    <Daily locationId={locationId} />
                </TabContent>
            </div>
        </TabProvider>
    );
}