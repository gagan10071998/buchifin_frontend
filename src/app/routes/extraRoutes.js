import React from "react";
import AboutUs from "../pages/extra-pages/AboutUs";
import CallOuts from "../pages/extra-pages/CallOuts";
import ContactUs from "../pages/extra-pages/ContactUs";
import PricingPage from "../pages/extra-pages/PricingPlan";
import Error404 from "../pages/extra-pages/Error404";
import Error500 from "../pages/extra-pages/Error500";
import LockScreen from "../pages/extra-pages/lock-screen";
import Page from "@jumbo/shared/Page";

const extraRoutes = [
    {
        path: "/extra-pages/about-us",
        element: <Page component={AboutUs} />
    },
    {
        path: "/extra-pages/call-outs",
        element: <Page component={CallOuts} />,
    },
    {
        path: "/extra-pages/contact-us",
        element: <Page component={ContactUs}/>
    },
    {
        path: "/extra-pages/pricing-plan",
        element: <Page component={PricingPage} />
    },
    {
        path: "/extra-pages/404",
        element: <Page component={Error404} layout={"solo-page"}/>
    },
    {
        path: "/extra-pages/500",
        element: <Page component={Error500} layout={"solo-page"}/>
    },
    {
        path: "/extra-pages/lock-screen",
        element: <Page component={LockScreen} layout={"solo-page"}/>
    },
];

export default extraRoutes;
