import React from "react";
import { Navigate } from "react-router-dom";
import dashboardRoutes from "./dashboardRoutes";
import metricsRoutes from "./metricsRoutes";
import widgetsRoutes from "./widgetRoutes";
import extensionsRoutes from "./extensionsRoutes";
import appsRoutes from "./appsRoutes";
import {muiRoutes} from "./muiRoutes";
import userRoutes from "./userRoutes";
import listViewRoutes from "./listViewRoutes";
import gridViewRoutes from "./gridViewRoutes";
import Login2 from "../pages/auth-pages/login2";
import Phonepe from "../pages/auth-pages/phonepe";
import Page from "@jumbo/shared/Page";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
    ...dashboardRoutes,
    ...appsRoutes,
    ...widgetsRoutes,
    ...metricsRoutes,
    ...muiRoutes,
    ...extensionsRoutes,
    ...userRoutes,
    ...listViewRoutes,
    ...gridViewRoutes,
];

/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [
    // ...dashboardRoutes,
    // ...appsRoutes,
    // ...widgetsRoutes,
    // ...metricsRoutes,
    // ...muiRoutes,
    // ...extensionsRoutes,
    // ...userRoutes,
    // ...listViewRoutes,
    // ...gridViewRoutes,
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
    {
        path: "/user/login",
        element: <Page component={Login2} layout={"solo-page"} disableSmLogin={true}/>
    },
    {
        path: "/pay/:type",
        element: <Page component={Phonepe} layout={"solo-page"} disableSmLogin={true}/>
    }
    ,
    ...dashboardRoutes
];

const routes = [
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
];

export {routes as default, routesForPublic, routesForNotAuthenticatedOnly, routesForAuthenticatedOnly};
