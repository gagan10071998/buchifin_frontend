import React from "react";
import UserProfile from "../pages/users/user-profile";
import WallApp from "../pages/users/wall-app";
import Page from "@jumbo/shared/Page";
import ProfileView from "app/shared/customComponents/Profile/UserProfile";
const userRoutes = [
    {
        path: "/user/profile",
        element: <Page component={ProfileView}/>
    },
    {
        path: "/user/social-wall",
        element: <Page component={WallApp}/>
    }
];
export default userRoutes;
