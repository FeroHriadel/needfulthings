export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: 'ORDER_CREATE_REQUEST'});

        const { userSignin: { userDetails }} = getState(); //this means: get userDetails from userSignin from state

        const config = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }

        const res = await fetch(`/api/orders`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'ORDER_CREATE_FAIL', payload: data})
        }

        dispatch({type: 'ORDER_CREATE_SUCCESS', payload: data})


    } catch (err) {
        dispatch({type: 'ORDER_CREATE_FAIL', payload: err})
    }
}



//CLEAR CREATED ORDER FROM STATE
export const clearCreatedOrder = () => (dispatch) => {
    dispatch({type: 'CLEAR_CREATED_ORDER'});
} 



//GET ORDER BY ID
export const getOrderById = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({type: 'GET_ORDER_BY_ID_REQUEST'});

        const { userSignin : { userDetails }} = getState();

        const config = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userDetails.token}`
            }
        }

        const res = await fetch(`/api/orders/${orderId}`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'GET_ORDER_BY_ID_FAIL', payload: data});
        }

        dispatch({type: 'GET_ORDER_BY_ID_SUCCESS', payload: data});
        console.log(data)

    } catch (err) {
        dispatch({type: 'GET_ORDER_BY_ID_FAIL', payload: err});
    }
}
