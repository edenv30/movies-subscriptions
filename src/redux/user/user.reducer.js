import UserActionTypes from './user.type';
const INITIAL_STATE = {
    currentUser: null,
    loggedIn: false,
    error: null,
    users: [],
    usersPermissions: [],
    usersLoginList : []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.LOG_IN_USER:
            return {
                ...state,
                loggedIn: action.payload
            }
        case UserActionTypes.SET_EMAIL_PASS_LOG_IN:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.GET_USERS_LIST:
            return {
                ...state,
                users: action.payload
            }
        case UserActionTypes.GET_PERMISSIONS_USERS:
            return {
                ...state,
                usersPermissions: action.payload
            } 
        case UserActionTypes.SET_USERS_WITH_PERMISSIONS:
            return{
                ...state,
                users: action.payload
            }
            case UserActionTypes.GET_USERS_LOGIN_LIST:
                return {
                    ...state,
                    usersLoginList: action.payload
                }
        default:
            return state;
    }
}

export default userReducer;