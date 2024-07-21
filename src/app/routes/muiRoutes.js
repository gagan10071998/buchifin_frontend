import React from 'react';
import Buttons from "../pages/components/mui/Buttons";
import Chips from "../pages/components/mui/Chips";
import Avatars from "../pages/components/mui/Avatars"
import Badges from "../pages/components/mui/Badges"
import Alerts from "../pages/components/mui/Alerts";
import Dialogs from "../pages/components/mui/Dialogs";
import Steppers from "../pages/components/mui/Steppers";
import AutoCompletes from "../pages/components/mui/AutoCompletes";
import BottomNavigations from "../pages/components/mui/BottomNavigations";
import Breadcrumbs from "../pages/components/mui/Breadcrumbs";
import Dividers from "../pages/components/mui/Dividers";
import Lists from "../pages/components/mui/Lists";
import Progress from "../pages/components/mui/Progress";
import Snackbars from "../pages/components/mui/Snackbars";
import Tabs from "../pages/components/mui/Tabs";
import Pickers from "../pages/components/mui/Pickers";
import Popovers from "../pages/components/mui/Popovers";
import Selects from "../pages/components/mui/Selects";
import TextFields from "../pages/components/mui/TextFields";
import Tooltips from "../pages/components/mui/Tooltips";
import Checkboxes from "../pages/components/mui/Checkboxes";
import Ratings from "../pages/components/mui/Ratings";
import Sliders from "../pages/components/mui/Sliders";
import Switches from "../pages/components/mui/Switches/Switches";
import TransfersList from "../pages/components/mui/TransfersList";
import ToggleButtons from "../pages/components/mui/ToggleButtons";
import Backdrops from "../pages/components/mui/Backdrops";
import Skeletons from "../pages/components/mui/Skeletons";
import Accordions from "../pages/components/mui/Accordions";
import Links from "../pages/components/mui/Links";
import Menus from "../pages/components/mui/Menus";
import Paginations from "../pages/components/mui/Paginations";
import ImagesList from "../pages/components/mui/ImagesList";
import SpeedDials from "../pages/components/mui/SpeedDials";
import Typographies from "../pages/components/mui/Typography";
import RadioButtons from "../pages/components/mui/RadioButtons/RadioButtons";
import Stacks from "../pages/components/mui/Stacks";
import Poppers from "../pages/components/mui/Poppers";
import Papers from "../pages/components/mui/Papers";
import Containers from "../pages/components/mui/Containers";
import Grids from "../pages/components/mui/Grids/Grids";
import Modals from "../pages/components/mui/Modals";
import Transitions from "../pages/components/mui/Transitions";
import TextareaAutosizes from "../pages/components/mui/TextareaAutosizes/TextareaAutosizes";
import ClickAwayListeners from "../pages/components/mui/ClickAwayListeners";
import Timelines from "../pages/components/mui/Timelines/Timelines";
import Masonry from "../pages/components/mui/Masonry";
import Treeviews from "../pages/components/mui/Treeviews";
import Portals from "../pages/components/mui/Portals";
import ButtonsGroup from "../pages/components/mui/ButtonsGroup";
import Page from "@jumbo/shared/Page";
import ProtectedRoute from "app/shared/customComponents/ProtectedRoute";
const muiRoutes = [
    {
        path: "/mui/accordions",
        element: <ProtectedRoute>
                <Page component={Accordions}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/alerts",
        element: <ProtectedRoute>
                <Page component={Alerts}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/autocomplete",
        element: <ProtectedRoute>
                <Page component={AutoCompletes}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/avatars",
        element: <ProtectedRoute>
                <Page component={Avatars}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/backdrop",
        element: <ProtectedRoute>
                <Page component={Backdrops}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/badges",
        element: <ProtectedRoute>
                <Page component={Badges}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/bottom-navigation",
        element: <ProtectedRoute>
                <Page component={BottomNavigations}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/breadcrumbs",
        element: <ProtectedRoute>
                <Page component={Breadcrumbs}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/button-group",
        element: <ProtectedRoute>
                <Page component={ButtonsGroup}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/buttons",
        element: <ProtectedRoute>
                <Page component={Buttons}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/checkbox",
        element: <ProtectedRoute>
                <Page component={Checkboxes}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/chips",
        element: <ProtectedRoute>
                <Page component={Chips}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/click-away-listener",
        element: <ProtectedRoute>
                <Page component={ClickAwayListeners}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/container",
        element: <ProtectedRoute>
                <Page component={Containers}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/dialogs",
        element: <ProtectedRoute>
                <Page component={Dialogs}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/dividers",
        element: <ProtectedRoute>
                <Page component={Dividers}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/grid",
        element: <ProtectedRoute>
                <Page component={Grids}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/images-list",
        element: <ProtectedRoute>
                <Page component={ImagesList}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/links",
        element: <ProtectedRoute>
                <Page component={Links}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/lists",
        element: <ProtectedRoute>
                <Page component={Lists}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/masonry",
        element: <ProtectedRoute>
                <Page component={Masonry}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/menus",
        element: <ProtectedRoute>
                <Page component={Menus}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/modal",
        element: <ProtectedRoute>
                <Page component={Modals}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/paginations",
        element: <ProtectedRoute>
                <Page component={Paginations}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/papers",
        element: <ProtectedRoute>
                <Page component={Papers}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/pickers",
        element: <ProtectedRoute>
                <Page component={Pickers}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/popovers",
        element: <ProtectedRoute>
                <Page component={Popovers}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/poppers",
        element: <ProtectedRoute>
                <Page component={Poppers}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/portals",
        element: <ProtectedRoute>
                <Page component={Portals}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/progress",
        element: <ProtectedRoute>
                <Page component={Progress}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/radio-buttons",
        element: <ProtectedRoute>
                <Page component={RadioButtons}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/rating",
        element: <ProtectedRoute>
                <Page component={Ratings}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/selects",
        element: <ProtectedRoute>
                <Page component={Selects}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/skeletons",
        element: <ProtectedRoute>
                <Page component={Skeletons}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/slider",
        element: <ProtectedRoute>
                <Page component={Sliders}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/snackbars",
        element: <ProtectedRoute>
                <Page component={Snackbars}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/speed-dial",
        element: <ProtectedRoute>
                <Page component={SpeedDials}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/stacks",
        element: <ProtectedRoute>
                <Page component={Stacks}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/steppers",
        element: <ProtectedRoute>
                <Page component={Steppers}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/switches",
        element: <ProtectedRoute>
                <Page component={Switches}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/tabs",
        element: <ProtectedRoute>
                <Page component={Tabs}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/textarea-autosize",
        element: <ProtectedRoute>
                <Page component={TextareaAutosizes}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/text-fields",
        element: <ProtectedRoute>
                <Page component={TextFields}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/timeline",
        element: <ProtectedRoute>
                <Page component={Timelines}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/toggle-buttons",
        element: <ProtectedRoute>
                <Page component={ToggleButtons}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/tooltips",
        element: <ProtectedRoute>
                <Page component={Tooltips}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/transfers-list",
        element: <ProtectedRoute>
                <Page component={TransfersList}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/transitions",
        element: <ProtectedRoute>
                <Page component={Transitions}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/tree-view",
        element: <ProtectedRoute>
                <Page component={Treeviews}/>
            </ProtectedRoute>
    },
    {
        path: "/mui/typography",
        element: <ProtectedRoute>
                <Page component={Typographies}/>
            </ProtectedRoute>
    },
];

export {muiRoutes};
