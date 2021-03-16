export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case 'USER_SIGNUP_REQUEST':
        case 'USER_SIGNIN_REQUEST':
            return {
                loading: true,
                userDetails: {}
            };
        case 'USER_SIGNUP_SUCCESS':
        case 'USER_SIGNIN_SUCCESS':
            return {
                loading: false,
                userDetails: action.payload
            };
        case 'USER_SIGNUP_FAIL':
        case 'USER_SIGNIN_FAIL':
            return {
                loading: false,
                userDetails: {},
                error: action.payload
            };
        case 'USER_LOGOUT':
            return {
                userDetails: {}
            };
        default:
            return state;
    }
}



export const getUsersReducer = (state = {users: []}, action) => {
    switch(action.type) {
        case 'GET_USERS_REQUEST':
            return {
                getUsersLoading: true,
                users: []
            };
        case 'GET_USERS_SUCCESS':
            return {
                getUsersLoading: false,
                users: action.payload
            };
        case 'GET_USERS_FAIL':
            return {
                getUsersLoading: false,
                users: [],
                getUsersError: action.payload
            };
        default:
            return state;
    }
}



export const getUserByIdReducer = (state = {userById: {}}, action) => {
    switch(action.type) {
        case 'GET_USER_BY_ID_REQUEST':
            return {
                loading: true,
                userById: {}
            };
        case 'GET_USER_BY_ID_SUCCESS':
            return {
                loading: false,
                userById: action.payload
            };
        case 'GET_USER_BY_ID_FAIL':
            return {
                loading: false,
                userById: {},
                error: action.payload
            };
        default:
            return state;
    }
}



export const changeUserRoleReducer = (state = {updatedUser: {}}, action) => {
    switch(action.type) {
        case 'CHANGE_USER_ROLE_REQUEST':
            return {
                changeUserRoleLoading: true,
            };
        case 'CHANGE_USER_ROLE_SUCCESS':
            return {
                changeUserRoleLoading: false,
                updatedUser: action.payload
            };
        case 'CHANGE_USER_ROLE_FAIL':
            return {
                changeUserRoleLoading: false,
                updatedUser: {},
                changeUserRoleError: action.payload
            };
        case 'CLEAR_CHANGE_USER_ROLE_RESULTS':
            return {
                updatedUser: {}
            };
        default:
            return state;
    }
}
