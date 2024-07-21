import React from 'react';
import Metrics from '../pages/metrics/Metrics'
import Page from "@jumbo/shared/Page";
import ProtectedRoute from "app/shared/customComponents/ProtectedRoute";

const metricsRoutes = [
    {
        path: "metrics",
        element: (
            <ProtectedRoute>
                <Page component={Metrics}/>
            </ProtectedRoute>
        ),
    },
];

export default metricsRoutes;
