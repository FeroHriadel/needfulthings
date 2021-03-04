export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: 'ORDER_CREATE_REQUEST'});

        const { userSignin: { userDetails }} = getState(); //this means: get userDetails from userSignin

        const config = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }

        console.log(order) //

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