import React from "react";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AgricultureIcon from '@mui/icons-material/Agriculture';
const userTypesMenus = {
    "SUPER_ADMIN": [
        {
            label: 'sidebar.menuItem.cases',
            type: "section",
            icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
            children: [
                {
                    uri: "/users/retailers",
                    label: 'sidebar.menuItem.retailers',
                    type: "nav-item",
                    icon: <AssignmentIcon sx={{ fontSize: 20 }} />
                },
                {
                    uri: "/users/distributors",
                    label: 'sidebar.menuItem.distributors',
                    type: "nav-item",
                    icon: <AssignmentIcon sx={{ fontSize: 20 }} />
                },
                {
                    uri: "/users/manufacturers",
                    label: 'sidebar.menuItem.manufacturers',
                    type: "nav-item",
                    icon: <AssignmentIcon sx={{ fontSize: 20 }} />
                },
            ]
        },
        {
            label: 'Users',
            type: "section",
            icon: <AgricultureIcon sx={{ fontSize: 20 }} />,
            children: [
                {
                    uri: "/users/agronomist",
                    label: 'sidebar.menuItem.agronomist',
                    type: "nav-item",
                    icon: <AgricultureIcon sx={{ fontSize: 20 }} />
                },
            ]
        },
    ],
};

const menus = [
    {
        label: 'sidebar.menu.home',
        type: "section",
        children: [
            {
                uri: "/dashboard",
                label: 'sidebar.menuItem.misc',
                type: "nav-item",
                icon: <GraphicEqIcon sx={{ fontSize: 20 }} />
            }
        ]
    },
];

export default menus;

export const getMenuForUserType = (userType) => {
    return userTypesMenus[userType] || [];
};
