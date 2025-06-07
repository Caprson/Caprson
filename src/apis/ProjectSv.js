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

export const updateProject = (datas,param) =>
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

export const createEpic = (datas,param) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/epic/${param}/project`,
                method: 'post',
                data:datas,
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const createUserStore = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: "projects/stories",
                method: 'post',
                data:data,
                withCredentials: true,
                headers: {
                    "X-Project-Id" : localStorage.getItem("projectId")
                }
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
                url: "projects/stories/project",
                method: 'get',
                withCredentials: true,
                headers: {
                    "X-Project-Id" : localStorage.getItem("projectId")
                }
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const editUserStore = (id,datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `projects/stories/${id}`,
                method: 'put',
                withCredentials: true,
                data:datas,
                headers: {
                    "X-Project-Id" : localStorage.getItem("projectId")
                }
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
                data:datas,
                headers: {
                    "X-Project-Id" : localStorage.getItem("projectId")
                }
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
                    "X-Project-Id" : localStorage.getItem("projectId")
                }
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

    
