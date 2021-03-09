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
        const data = res.json();
        
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

