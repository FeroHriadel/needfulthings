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



//SIGNIN
const signin = (email, password) => async (dispatch) => {
    try {
        dispatch({type: 'USER_SIGNIN_REQUEST'});

        const config = {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        };
    
        const res = await fetch(`/api/users/signin`, config);
        const data = await res.json();
    
        if (data.error) {
            return dispatch({type: 'USER_SIGNIN_FAIL', payload: data})
        }
    
        dispatch({type: 'USER_SIGNIN_SUCCESS', payload: data});
    
        //also save userDetails to LS
        localStorage.setItem('userDetails', JSON.stringify(data));


    } catch (err) {
        dispatch({type: 'USER_SIGNIN_FAIL', payload: err})
    }
}



//SIGN OUT
const signout = () => (dispatch) => {
    localStorage.removeItem('userDetails');
    dispatch({type: 'USER_LOGOUT'});
}



//GET ALL USERS
const getUsers = () => async (dispatch, getState) => {
    try {
        dispatch({type: 'GET_USERS_REQUEST'});

        const { userSignin : { userDetails }} = getState();

        const config = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userDetails.token}`,
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch(`/api/users/getUsers`, config);
        const data = await res.json();

        console.log(res.data) //

        if (data.error) {
            return dispatch({type: 'GET_USERS_FAIL', payload: data});
        }

        dispatch({type: 'GET_USERS_SUCCESS', payload: data});

    } catch (err) {
        dispatch({type: 'GET_USERS_FAIL', payload: 'getUsers action error'})
    }
}



export { signup, signin, signout, getUsers }