import React from 'react';
const ChartLine = React.lazy(() => import("../../app/pages/charts/Line/Line"));
const ChartBar = React.lazy(() => import("../../app/pages/charts/Bar/Bar"));
const ChartArea = React.lazy(() => import("../../app/pages/charts/Area/Area"));
const ChartComposed = React.lazy(() => import("../../app/pages/charts/Composed/Composed"));
const ChartPie = React.lazy(() => import("../../app/pages/charts/Pie/Pie"));
const ChartScatter = React.lazy(() => import("../../app/pages/charts/Scatter/Scatter"));
const ChartRadial = React.lazy(() => import("../../app/pages/charts/Radial/Radial"));
const ChartRadar = React.lazy(() => import("../../app/pages/charts/Radar/Radar"));
const ChartTreemap = React.lazy(() => import("../../app/pages/charts/Treemap/Treemap"));

const chartRoutes = [
    {
        path: "modules/charts/line",
        element: <ChartLine/>
    },
    {
        path: "modules/charts/bar",
        element: <ChartBar/>
    },
    {
        path: "modules/charts/area",
        element: <ChartArea/>
    },
    {
        path: "modules/charts/composed",
        element: <ChartComposed/>
    },
    {
        path: "modules/charts/pie",
        element: <ChartPie/>
    },
    {
        path: "modules/charts/scatter",
        element: <ChartScatter/>
    },
    {
        path: "modules/charts/radial",
        element: <ChartRadial/>
    },
    {
        path: "modules/charts/radar",
        element: <ChartRadar/>
    },
    {
        path: "modules/charts/treemap",
        element: <ChartTreemap/>
    },
];
export default chartRoutes;
