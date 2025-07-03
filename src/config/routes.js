const projectName = localStorage.getItem("projectName")
const routes = {
    home: `/${projectName}`,
    following: '/following',
    upload: '/upload',
    search: '/search',
    live: '/live',
    backlog:`/${projectName}/blacklog`,
    listwork:`/${projectName}/listwork`,
    activesprint:`/${projectName}/active_sprint`,
    signup: '/signup',
    projects: '/projects',
    createProject:'/projects/createProject',
    login: '/login'
};

export default routes;
