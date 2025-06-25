import axios from '../axios';

export const createProject = (datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: 'users/projects',
                method: 'post',
                data: datas,
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const deleteProject = (param) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/project/${param}`,
                method: 'delete',
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const updateProject = (datas, param) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/project/${param}`,
                method: 'put',
                data: datas,
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getallProject = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: 'projects/project',
                method: 'get',
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const createEpic = (datas, param) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/epic/${param}/project`,
                method: 'post',
                data: datas,
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const createUserStore = (type, data) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/${type}`,
                method: 'post',
                data: data,
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getUserStore = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: 'projects/stories/project',
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const editUserStore = (id, datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/stories/${id}`,
                method: 'put',
                withCredentials: true,
                data: datas,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const deleteStore = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/stories/${id}`,
                method: 'delete',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const deleteTask = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/tasks/${id}`,
                method: 'delete',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const createSprint = (datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/sprint`,
                method: 'post',
                withCredentials: true,
                data: datas,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getSprintByProject = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/sprint`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const addPeopleProject = (datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `users/members`,
                method: 'post',
                data: datas,
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getUseByProject = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `users/members`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getUseById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `users/customer/${id}`,
                method: 'get',
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const updateSprint = (id, datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/sprint/${id}`,
                method: 'put',
                withCredentials: true,
                data: datas,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getUserStoreBySprintId = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/stories/sprint/${id}`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const createBug = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: 'bugs/bug',
                method: 'post',
                data: data,
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getUserStoryById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/stories/${id}`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getSprintById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/sprint/${id}`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getTaskByStoryId = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/tasks/${id}/story`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getAllEpics = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/epic`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getEpicById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/epic/${id}`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getAllBug = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `bugs/bug/projects/${localStorage.getItem('projectId')}/bugs`,
                method: 'get',
                withCredentials: true,
                headers: {
                    'X-Project-Id': localStorage.getItem('projectId'),
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
