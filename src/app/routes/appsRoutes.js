import React from "react";
import MailApp from "../pages/apps/mail";
import ContactsApp from "../pages/apps/contacts/ContactsApp";
import ChatApp from "../pages/apps/chat";
import Page from "@jumbo/shared/Page";
import ProtectedRoute from "app/shared/customComponents/ProtectedRoute";

const appsRoutes = [
    {
        path: [
            "/app/chats",
            "/app/chats/:chatBy/:id",
        ],
        element: (
            <ProtectedRoute>
                <Page component={ChatApp}/>
            </ProtectedRoute>
        ),
    },
    {
        path: [
            "/app/contacts/:category",
            "/app/contacts/:category/:id",
        ],
        element: (
            <ProtectedRoute>
                <Page component={ContactsApp}/>
            </ProtectedRoute>
        ),
    },
    {
        path: [
            "/app/mails/:category",
            "/app/mails/:category/:id",
            "/app/mails/:category/message/:messageID",
            "/app/mails/:category/:id/message/:messageID"
        ],
        element: (
            <ProtectedRoute>
                <Page component={MailApp}/>
            </ProtectedRoute>
        )
    }
];

export default appsRoutes;
