//GET PRODUCTS BY CATEGORY ID
export const getProductsByCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({type: 'GET_PRODUCTS_BY_CATEGORY_REQUEST'});
        const res = await fetch(`/api/products/getProductsByCategory/${categoryId}`);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'GET_PRODUCTS_BY_CATEGORY_FAIL', payload: data})
        }
        
        dispatch({type: 'GET_PRODUCTS_BY_CATEGORY_SUCCESS', payload: data})
    } catch (err) {
        dispatch({
            type: 'GET_PRODUCTS_BY_CATEGORY_FAIL',
            payload: err
        })
    }
}



//GET PRODUCT BY ID
export const getProductById = (productId) => async (dispatch) => {
    try {
        dispatch({type: 'GET_PRODUCT_BY_ID_REQUEST'});
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        
        if (data.error) {
            return dispatch({type: 'GET_PRODUCT_BY_ID_FAIL', payload: data })
        }

        dispatch({type: 'GET_PRODUCT_BY_ID_SUCCESS', payload: data});
    } catch (err) {
        dispatch({type: 'GET_PRODUCT_BY_ID_FAIL', payload: err})
    }
}



//GET ALL PRODUCTS
export const getProducts = () => async (dispatch) => {
    try {
        dispatch({type: 'GET_PRODUCTS_REQUEST'})

        const res = await fetch(`/api/products`);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'GET_PRODUCTS_FAIL', payload: data})
        }

        dispatch({type: 'GET_PRODUCTS_SUCCESS', payload: data});

    } catch (err) {
        console.log(err);
        dispatch({type: 'GET_PRODUCTS_FAIL', payload: 'Product search failed'})
    }
}



//UPDATE PRODUCT
export const updateProduct = (productId, formData) => async (dispatch, getState) => {
    try {
        dispatch({type: 'UPDATE_PRODUCT_REQUEST'});

        const { userSignin: { userDetails }} = getState(); 

        const config = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }

        const res = await fetch(`/api/products/${productId}`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'UPDATE_PRODUCT_FAIL', payload: data})
        }

        dispatch({type: 'UPDATE_PRODUCT_SUCCESS', payload: data})

    } catch (err) {
        dispatch({type: 'UPDATE_PRODUCT_FAIL', payload: err })
    }
}



//CREATE PRODUCT
export const addProduct = (formData) => async (dispatch, getState) => {
    try {
        dispatch({type: 'ADD_PRODUCT_REQUEST'});

        const { userSignin: { userDetails }} = getState();

        const config = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }

        const res = await fetch(`/api/products/create`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'ADD_PRODUCT_FAIL', payload: data})
        }

        dispatch({type: 'ADD_PRODUCT_SUCCESS', payload: data})

    } catch (err) {
        dispatch({type: 'ADD_PRODUCT_FAIL', payload: err})
    }
}



//DELETE PRODUCT
export const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        dispatch({type: 'DELETE_PRODUCT_REQUEST'});

        const { userSignin: { userDetails }} = getState();

        const config = {
            method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }

        const res = await fetch(`/api/products/delete/${productId}`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'DELETE_PRODUCT_FAIL', payload: data})
        }

        dispatch({type: 'DELETE_PRODUCT_SUCCESS', payload: data})

    } catch (err) {
        dispatch({type: 'DELETE_PRODUCT_FAIL', payload: err})
    }
}



export const searchProducts = (filters, pageNumber = 1) => async (dispatch) => {
    try {
        dispatch({type: 'SERACH REQUEST'});

        const keyword = filters.keyword ? `keyword=${filters.keyword}` : '';
        const category = filters.category ? `category=${filters.category}` : '';
        const price = filters.price ? `price=${filters.price}` : '';



        const res = await fetch(`/api/products/search?${keyword}&${category}&${price}&pageNumber=${pageNumber}`);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'SEARCH_FAIL', payload: data})
        }

        dispatch({type: 'SEARCH_SUCCESS', payload: data});

    } catch (err) {
        console.log(err);//
        dispatch({type: 'SEARCH_FAIL', payload: 'searchProducts action error'})
    }
}