import React from "react";
import MiscDashboard from "../pages/dashboards/misc/MiscDashboard";
import Page from "@jumbo/shared/Page";
import ProtectedRoute from "app/shared/customComponents/ProtectedRoute";
import RetailerTable from "app/shared/customComponents/Retailers/RetailerTable";
import RetailerView from "app/shared/customComponents/Retailers/CaseView/RetailerView";
import Agronomist from "app/shared/customComponents/Retailers/CaseView/components/agronomist/Agronomist";
import CaseView from "app/shared/customComponents/CaseView";
import UserProfile from "app/pages/users/user-profile/UserProfile";
import DndExample from "app/pages/extensions/dnd/components/DndExample";
import Lists from "app/pages/components/mui/Lists";
import AgronomistList from "app/shared/customComponents/Agronomist/AgronomistList";
import AgronomistView from "app/shared/customComponents/Agronomist/AgronomistView";
import AgronomistTable from "app/shared/customComponents/Agronomist/AgronomistTable";

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
    path: "/users/agronomist",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN"
            ],
          }}
        >
      <Page component={AgronomistTable} />
        </ProtectedRoute>
    ),
  },
  {
    path: "/users/agronomist/:id",
    element: (
        <ProtectedRoute
          route={{
            roles: [
              "SUPER_ADMIN"
            ],
          }}
        >
      <Page component={AgronomistView} />
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
