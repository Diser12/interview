import type { Route } from "./+types/forecast";
import Tabs from "~/components/forecast/tabs";

export default function Forecast({ params }: Route.ComponentProps) {
    return <Tabs locationId={params.locationId} />;
}