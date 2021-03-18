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

export const getProductByIdReducer = (state = {product: {}}, action) => {
    switch(action.type) {
        case 'GET_PRODUCT_BY_ID_REQUEST':
            return {loading: true, product: {}};
        case 'GET_PRODUCT_BY_ID_SUCCESS':
            return {loading: false, product: action.payload};
        case 'GET_PRODUCT_BY_ID_FAIL': 
            return {loading: false, error: action.payload, product: {}}
        default:
            return state;
    }
}



export const getProductsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_PRODUCTS_REQUEST':
            return {
                loading: true
            };
        case 'GET_PRODUCTS_SUCCESS':
            return {
                loading: false,
                products: action.payload
            };
        case 'GET_PRODUCTS_FAIL':
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}



export const updateProductReducer = (state = {updatedProduct: {}}, action) => {
    switch(action.type) {
        case 'UPDATE_PRODUCT_REQUEST':
            return {
                updateProductLoading: true,
                updatedProduct: {}
            };
        case 'UPDATE_PRODUCT_FAIL':
            return {
                updateProductLoading: false,
                updatedProduct: {},
                updateProductError: action.payload
            };
        case 'UPDATE_PRODUCT_SUCCESS':
            return {
                updateProductLoading: false,
                updatedProduct: action.payload,
            };
        case 'CLEAR_UPDATED_PRODUCT':
            return {
                updatedProduct: {}
            };
        default:
            return state;
    }
}



export const addProductReducer = (state = {product: {}}, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT_REQUEST':
            return {
                loading: true,
                product: {}
            };
        case 'ADD_PRODUCT_SUCCESS':
            return {
                loading: false,
                product: action.payload
            };
        case 'ADD_PRODUCT_FAIL':
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}



export const deleteProductReducer = (state = {}, action) => {
    switch(action.type) {
        case 'DELETE_PRODUCT_REQUEST':
            return {
                deleteProductLoading: true
            };
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                deleteProductLoading: false,
                deleteProductMessage: action.payload
            };
        case 'DELETE_PRODUCT_FAIL':
            return {
                deleteProductLoading: false,
                deleteProductError: action.payload
            };
        case 'CLEAR_DELETE_PRODUCT_STATE':
            return {}
        default:
            return state;
    }
}



export const searchProductsReducer = (state = {searchedProducts: []}, action) => {
    switch(action.type) {
        case 'SERACH REQUEST':
            return {
                searchLoading: true
            };
        case 'SEARCH_SUCCESS':
            return {
                searchLoading: false,
                searchedProducts: action.payload.products,
                numberOfPages: action.payload.numberOfPages,
                page: action.payload.page
            };
        case 'SEARCH_FAIL':
            return {
                searchLoading: false,
                searchedProducts: [],
                searchError: action.payload
            };
        default:
            return state;
    }
}