import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import BlackLog from '~/pages/BlackLog';
import ListWork from '~/pages/ListWork';
import Signup from '~/pages/Authentication/Signup';
import HeaderAndSiderBar from '~/layouts/HeaderAndSiderBar';
import Projects from '~/pages/Projects';
import Login from '~/pages/Authentication/Login';
import CreateProject from '~/pages/Projects/createProject';

// Public routes
export const publicRoutes = [
    { path: config.routes.activesprint, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    // { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.backlog, component: BlackLog },
    { path: config.routes.listwork, component: ListWork },
    { path: config.routes.signup, component: Signup,layout:null },
    { path: config.routes.projects, component: Projects, layout: HeaderAndSiderBar },
    { path: config.routes.createProject, component: CreateProject, layout: null },
    { path: config.routes.login, component: Login, layout: null },
];

// Private routes
export const privateRoutes = [];
