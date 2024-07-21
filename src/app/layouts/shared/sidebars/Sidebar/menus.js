import React from "react";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
