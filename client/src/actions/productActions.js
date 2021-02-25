//GET PRODUCTS BY CATEGORY
export const getProductsByCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({type: 'GET_PRODUCTS_BY_CATEGORY_REQUEST'});
        const res = await fetch(`/api/products/getProductsByCategory/${categoryId}`);
        const data = await res.json();
        dispatch({type: 'GET_PRODUCTS_BY_CATEGORY_SUCCESS', payload: data})
    } catch (err) {
        dispatch({
            type: 'GET_PRODUCTS_BY_CATEGORY_FAIL',
            payload: err
        })
    }
}

