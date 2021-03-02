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
