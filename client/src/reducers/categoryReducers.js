export const getCategoriesReducer = (state = {categories: []}, action) => {
    switch(action.type) {
        case 'GET_CATEGORIES_REQUEST':
            return {loading: true, categories: []};
        case 'GET_CATEGORIES_SUCCESS':
            return {loading: false, categories: action.payload};
        case 'GET_CATEGORIES_FAIL':
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}



export const createCategoryReducer = (state = {createdCategory: {}, loading: false}, action) => {
    switch(action.type) {
        case 'CREATE_CATEGORY_REQUEST':
            return {
                loading: true
            };
        case 'CREATE_CATEGORY_SUCCESS':
            return {
                loading: false,
                createdCategory: action.payload
            };
        case 'CREATE_CATEGORY_FAIL':
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}