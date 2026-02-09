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
        <button onClick={handleClick} className={activeTabValue === value ? "bg-blue-500 text-white" : "bg-gray-200"}>
            {children}
        </button>
    );
}

function TabContent({ value, children }: { value: TabType; children: React.ReactNode }) {
    const { activeTabValue } = useContext(tabContext);

    return activeTabValue === value ? <>{children}</> : null;
}

export default function Tabs({ locationId }: { locationId: string }) {
    return (
        <TabProvider>
            <div className="flex space-x-4 mb-4">
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
        </TabProvider>
    );
}