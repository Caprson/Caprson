import axios from '../axios';

export const getAllUser = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: 'users/user/getalluser',
                method: 'get',
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getUserById = (param) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `users/user/${param}`,
                method: 'get',
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getProjectByUserId = (param) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `users/user/project/${param}`,
                method: 'get',
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const assignRole = (datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: 'users/user/assignrole',
                method: 'post',
                data: datas,
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const createTeam = (datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: 'users/team',
                method: 'post',
                data: datas,
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getTeamByProjectId = (param) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `users/team/project/${param}`,
                method: 'get',
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getTeamById = (param) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `users/team/${param}`,
                method: 'get',
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const assignTeam = (datas) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: 'users/user/assignteam',
                method: 'post',
                data: datas,
                withCredentials: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });




