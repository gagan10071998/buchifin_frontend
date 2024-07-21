import React from 'react';

const SimpleMap = React.lazy(() => import("../pages/maps/SimpleMap"));
const StyledMap = React.lazy(() => import("../pages/maps/StyledMap"));
const GeoLocation = React.lazy(() => import("../pages/maps/GeoLocation"));
const MapDirections = React.lazy(() => import("../pages/maps/MapDirections"));
const MapOverlay = React.lazy(() => import("../pages/maps/MapOverlay"));
const MapKmLayer = React.lazy(() => import("../pages/maps/MapKmLayer"));
const MapPopupInfo = React.lazy(() => import("../pages/maps/MapPopupInfo"));
const StreetViewPanorama = React.lazy(() => import("../pages/maps/StreetViewPanorama"));
const DrawingView = React.lazy(() => import("../pages/maps/DrawingView"));
const MarkerClusterer = React.lazy(() => import("../pages/maps/MarkerClusterer"));

const mapRoutes = [
    {
        path: "modules/maps/simple",
        element: <SimpleMap/>
    },
    {
        path: "modules/maps/styled",
        element: <StyledMap/>
    },
    {
        path: "modules/maps/geo-location",
        element: <GeoLocation/>
    },
    {
        path: "modules/maps/directions",
        element: <MapDirections/>
    },
    {
        path: "modules/maps/overlay",
        element: <MapOverlay/>
    },
    {
        path: "modules/maps/kml",
        element: <MapKmLayer/>
    },
    {
        path: "modules/maps/popup-info",
        element: <MapPopupInfo/>
    },
    {
        path: "modules/maps/street-view",
        element: <StreetViewPanorama/>
    },
    {
        path: "modules/maps/drawing",
        element: <DrawingView/>
    },
    {
        path: "modules/maps/clustering",
        element: <MarkerClusterer/>
    },
];
export default mapRoutes;
