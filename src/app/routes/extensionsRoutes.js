import React from 'react';
import CkEditor from "../pages/extensions/editor/CkEditor";
import WysiwygEditor from "../pages/extensions/editor/WysiwygEditor";
import DragAndDrop from "../pages/extensions/dnd/DragAndDrop";
import ReactDropzone from "../pages/extensions/dropzone/ReactDropzone";
import SweetAlerts from "../pages/extensions/sweetalert/SweetAlert";
import Page from "@jumbo/shared/Page";
import ProtectedRoute from "app/shared/customComponents/ProtectedRoute";

const extensionsRoutes = [
    {
        path: "extensions/editors/ck",
        element: (
            <ProtectedRoute>
                <Page component={CkEditor}/>
            </ProtectedRoute>
        ),
    },
    {
        path: "extensions/editors/wysiwyg",
        element: (
            <ProtectedRoute>
                <Page component={WysiwygEditor}/>
            </ProtectedRoute>
        ),
    },
    {
        path: "extensions/dnd",
        element: (
            <ProtectedRoute>
                <Page component={DragAndDrop}/>
            </ProtectedRoute>
        ),
    },
    {
        path: "extensions/dropzone",
        element: (
            <ProtectedRoute>
                <Page component={ReactDropzone}/>
            </ProtectedRoute>
        ),
    },
    {
        path: "extensions/sweet-alert",
        element: (
            <ProtectedRoute>
                <Page component={SweetAlerts}/>
            </ProtectedRoute>
        ),
    },
];

export default extensionsRoutes;
