import actionType from './actionType';
export const checkLogin = (ischeck) =>{
    return {
        type:actionType.CHECK_LOGIN,
        checklog: ischeck
    }
}

export const IsShowPopup = (bool) =>{
    return {
        type:actionType.GET_SHOWPOUP,
        isShow: bool 
    }
}
export const IsShowAddPeople = (bool) =>{
    return {
        type:actionType.GET_SHOWADDPEOPLE,
        isShow: bool 
    }
}
export const IsShowRightPanel = (bool) =>{
    return {
        type:actionType.GET_SHOWRIGHTPANEL,
        isShow: bool 
    }
}
export const getprojectName = (bool) =>{
    return {
        type:actionType.GET_PROJECTNAME,
        isShow: bool 
    }
}
