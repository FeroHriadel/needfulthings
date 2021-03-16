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
        case 'CLEAR_ORDER':
            return {};
        default:
            return state;
    }
}



export const getAllOrdersReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case 'GET_ORDERS_REQUEST':
            return {
                getOrdersLoading: true,
                orders: []
            };
        case 'GET_ORDERS_SUCCESS':
            return {
                getOrdersLoading: false,
                orders: action.payload
            };
        case 'GET_ORDERS_FAIL':
            return {
                getOrdersLoading: false,
                orders: [],
                getOrdersError: action.payload
            };
        default:
            return state;
    }
}



export const updateOrderReducer = (state = {updatedOrder: {}}, action) => {
    switch(action.type) {
        case 'UPDATE_ORDER_REQUEST':
            return {
                updateOrderLoading: true,
                updatedOrder: {}
            };
        case 'UPDATE_ORDER_SUCCESS':
            return {
                updateOrderLoading: false,
                updatedOrder: action.payload
            };
        case 'UPDATE_ORDER_FAIL':
            return {
                updateOrderLoading: false,
                updatedOrder: {},
                updateOrderError: action.payload
            };
        case 'CLEAR_UPDATED_ORDER':
            return {
                updatedOrder: {}
            };
        default:
            return state;
    }
}



export const deleteOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case 'DELETE_ORDER_REQUEST':
            return { deleteOrderLoading: true};
        case 'DELETE_ORDER_SUCCESS':
            return {
                deleteOrderLoading: false,
                deleteOrderMessage: action.payload
            };
        case 'DELETE_ORDER_FAIL':
            return {
                deleteOrderLoading: false,
                deleteOrderError: action.payload
            };
        default:
            return state;
    }
}