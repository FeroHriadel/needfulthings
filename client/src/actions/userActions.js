const signup = (name, email, password) => async (dispatch) => {
    try {
        dispatch({type: 'USER_SIGNUP_REQUEST'});

        const config = {
            method: 'POST', 
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}
        }

        const res = await fetch(`/api/users/signup`, config);
        const data = await res.json();

        dispatch({type: 'USER_SIGNUP_SUCCESS', payload: data});

        //aslo save userDetails to LS
        localStorage.setItem('userDetails', JSON.stringify(data));


    } catch (err) {
        dispatch({type: 'USER_SIGNUP_FAIL', payload: err})
    }
}



export { signup }