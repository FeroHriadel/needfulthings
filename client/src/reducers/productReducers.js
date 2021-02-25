export const getProductsByCategoryReducer = (state = {products: []}, action) => {
    switch(action.type) {
        case 'GET_PRODUCTS_BY_CATEGORY_REQUEST':
            return {loading: true, products: []};
        case 'GET_PRODUCTS_BY_CATEGORY_SUCCESS':
            return {loading: false, products: action.payload};
        case 'GET_PRODUCTS_BY_CATEGORY_FAIL':
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}