import React from 'react';
import Widgets from '../pages/widgets/Widgets'
import Page from "@jumbo/shared/Page";
import ProtectedRoute from "app/shared/customComponents/ProtectedRoute";

const widgetsRoutes = [
    {
        path: "widgets",
        element: (
            <ProtectedRoute>
                <Page component={Widgets}/>
            </ProtectedRoute>
        ),
    },
];

export default widgetsRoutes;
