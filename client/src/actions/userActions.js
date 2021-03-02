//SIGN UP
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

        if (data.error) {
            return dispatch({type: 'USER_SIGNUP_FAIL', payload: data})
        }

        dispatch({type: 'USER_SIGNUP_SUCCESS', payload: data});

        //also save userDetails to LS
        localStorage.setItem('userDetails', JSON.stringify(data));


    } catch (err) {
        dispatch({type: 'USER_SIGNUP_FAIL', payload: err})
    }
}



//SIGN OUT
const signout = () => (dispatch) => {
    localStorage.removeItem('userDetails');
    dispatch({type: 'USER_LOGOUT'});
}



export { signup, signout }