import UsersList from "../pages/grid-views/UsersList";
import ProjectsList from "../pages/grid-views/ProjectsList";
import Page from "@jumbo/shared/Page";

const gridViewRoutes = [
    {
        path: "/grid-views/users",
        element: <Page component={UsersList}/>,
    },
    {
        path: "/grid-views/projects",
        element: <Page component={ProjectsList}/>
    }
];
export default gridViewRoutes;
