import React from "react";
import MiscDashboard from "../pages/dashboards/misc/MiscDashboard";
import Page from "@jumbo/shared/Page";
import ProtectedRoute from "app/shared/customComponents/ProtectedRoute";
import RetailerTable from "app/shared/customComponents/Retailers/RetailerTable";
import RetailerView from "app/shared/customComponents/Retailers/CaseView/RetailerView";

const dashboardRoutes = [
  {
    path: "/",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN",
              "GOVT_ADMIN",
              "DISTRICT_ADMIN",
              "NEUTRAL",
              "CASE_MANAGER",
            ],
          }}
        >
      <Page component={MiscDashboard} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN",
              "GOVT_ADMIN",
              "DISTRICT_ADMIN",
              "NEUTRAL",
              "CASE_MANAGER",
            ],
          }}
        >
      <Page component={MiscDashboard} />
        </ProtectedRoute>
    ),
  },
  {
    path: "/users/retailers",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN"
            ],
          }}
        >
      <Page component={RetailerTable} />
        </ProtectedRoute>
    ),
  },
  {
    path: "/users/retailer/:id",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN"
            ],
          }}
        >
      <Page component={RetailerView} />
        </ProtectedRoute>
    ),
  },
];

export default dashboardRoutes;
