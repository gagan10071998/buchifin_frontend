import ProjectsList from "../pages/list-views/ProjectsList";
import UsersList from "../pages/list-views/UsersList";
import Page from "@jumbo/shared/Page";

const listViewRoutes = [
    {
        path: "/list-views/projects",
        element: <Page component={ProjectsList}/>
    },
    {
        path: "/list-views/users",
        element: <Page component={UsersList}/>,
    },
];
export default listViewRoutes;
