//GET CATEGORIES
export const getCategories = () => async (dispatch) => {
    try {
        dispatch({type: 'GET_CATEGORIES_REQUEST'});
        const res = await fetch(`api/categories`);
        const data = await res.json();
        dispatch({type: 'GET_CATEGORIES_SUCCESS', payload: data})
    } catch (err) {
        dispatch({
            type: 'GET_CATEGORIES_FAIL',
            payload: err
        })
    }
}