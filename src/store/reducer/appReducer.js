import actionType from '../actions/actionType';

const initState = {
    check_login: false,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.CHECK_LOGIN:
            return {
                ...state,
                check_login: action.check_login,
            };

        default:
            return state;
    }
};

export default appReducer;
