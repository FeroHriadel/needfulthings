export const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case 'ORDER_CREATE_REQUEST':
            return {
                loading: true
            };
        case 'ORDER_CREATE_SUCCESS':
            return {
                loading: false,
                success: true,
                order: action.payload
            };
        case 'ORDER_CREATE_FAIL':
            return {
                loading: false,
                success: false,
                error: action.payload
            };
        case 'CLEAR_CREATED_ORDER':
            return {}
        default:
            return state;
    }
}



export const orderReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_ORDER_BY_ID_REQUEST':
            return {
                loading: true
            };
        case 'GET_ORDER_BY_ID_SUCCESS':
            return {
                loading: false,
                order: action.payload
            };
        case 'GET_ORDER_BY_ID_FAIL':
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}