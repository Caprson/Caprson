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
                method: 'get',
                data:datas,
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

    
