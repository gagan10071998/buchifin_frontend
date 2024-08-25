import React from "react";
import MiscDashboard from "../pages/dashboards/misc/MiscDashboard";
import Page from "@jumbo/shared/Page";
import ProtectedRoute from "app/shared/customComponents/ProtectedRoute";
import RetailerTable from "app/shared/customComponents/Retailers/RetailerTable";
import RetailerView from "app/shared/customComponents/Retailers/CaseView/RetailerView";
import DistributorTable from "../shared/customComponents/Retailers/DistributorTable";
import DistributorView from "app/shared/customComponents/Retailers/CaseView/DistributorView";
import ManufacturerView from "app/shared/customComponents/Retailers/CaseView/ManfacturerView";
import ManufacturerTable from "app/shared/customComponents/Retailers/ManufacturerTable";

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
  {
    path: "/users/distributors",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN"
            ],
          }}
        >
      <Page component={DistributorTable} />
        </ProtectedRoute>
    ),
  },
  {
    path: "/users/manufacturers",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN"
            ],
          }}
        >
      <Page component={ManufacturerTable} />
        </ProtectedRoute>
    ),
  },
  {
    path: "/users/distributor/:id",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN"
            ],
          }}
        >
      <Page component={DistributorView} />
        </ProtectedRoute>
    ),
  },
  {
    path: "/users/manufacturer/:id",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN"
            ],
          }}
        >
      <Page component={ManufacturerView} />
        </ProtectedRoute>
    ),
  },
];

export default dashboardRoutes;
