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