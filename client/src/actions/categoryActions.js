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



//CREATE CATEGORY
export const createCategory = (formData) => async (dispatch, getState) => {
    try {
        dispatch({type: 'CREATE_CATEGORY_REQUEST'});

        const { userSignin: { userDetails }} = getState(); 

        const config = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }

        const res = await fetch(`/api/categories/create`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'CREATE_CATEGORY_FAIL', payload: data})
        }

        dispatch({type: 'CREATE_CATEGORY_SUCCESS', payload: 'Category created'})

    } catch (err) {
        dispatch({type: 'CREATE_CATEGORY_FAIL', payload: err })
    }
}