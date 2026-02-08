import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/default.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx")
    ]),
    layout("layouts/forecast.tsx", [
        route("forecast/:locationId", "routes/forecast.tsx")
    ])
] satisfies RouteConfig;