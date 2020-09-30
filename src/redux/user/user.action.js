import UserActionTypes from './user.type';

export const setUserLoggenIn = user => ({
    type: UserActionTypes.LOG_IN_USER,
    payload: user
});

export const setUserLoginEmailPass = user => ({
    type: UserActionTypes.SET_EMAIL_PASS_LOG_IN,
    payload: user
});

export const setUserSignup = user => ({
    type: UserActionTypes.SET_USER_SIGNUP,
    payload: user
});

export const getUsersList = users => ({
    type: UserActionTypes.GET_USERS_LIST,
    payload: users
});

export const getPermissionsUsers = usersPermissions => ({
    type: UserActionTypes.GET_PERMISSIONS_USERS,
    payload: usersPermissions
});

export const setUsersWithPermissions = users => ({
    type: UserActionTypes.SET_USERS_WITH_PERMISSIONS,
    payload: users
});

export const getUserLoginList = users => ({
    type: UserActionTypes.GET_USERS_LOGIN_LIST,
    payload: users
});

export const getCurrentUserPermissions = user => ({
    type: UserActionTypes.GET_CURRENT_USER_PERMISSIONS,
    payload: user
});