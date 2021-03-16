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

         if (data.error) {
            return dispatch({type: 'GET_USERS_FAIL', payload: data});
        }

        dispatch({type: 'GET_USERS_SUCCESS', payload: data});

    } catch (err) {
        dispatch({type: 'GET_USERS_FAIL', payload: 'getUsers action error'})
    }
}



const getUserById = (userId) => async (dispatch, getState) => {
    try {
        dispatch({type: 'GET_USER_BY_ID_REQUEST'});

        const { userSignin : { userDetails }} = getState();

        const config = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userDetails.token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await fetch(`/api/users/getUser/${userId}`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'GET_USER_BY_ID_FAIL', payload: data});
        }

        dispatch({type: 'GET_USER_BY_ID_SUCCESS', payload: data});

    } catch (err) {
        dispatch({type: 'GET_USER_BY_ID_FAIL', payload: 'getUserById action error'})
    }
}



//CHANGE USER'S ISADMIN ROLE
export const changeUserRole = (userId) => async (dispatch, getState) => {
    try {
        dispatch({type: 'CHANGE_USER_ROLE_REQUEST'});

        const { userSignin : { userDetails }} = getState();

        const config = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${userDetails.token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await fetch(`/api/users/changeUserRole/${userId}`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'CHANGE_USER_ROLE_FAIL', payload: data})
        }

        dispatch({type: 'CHANGE_USER_ROLE_SUCCESS', payload: data});


    } catch (err) {
        dispatch({type: 'CHANGE_USER_ROLE_FAIL', payload: 'changeUserRole error'})
    }
}



//DELETE USER
export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
        dispatch({type: 'DELETE_USER_REQUEST'});

        const { userSignin : { userDetails }} = getState();

        const config = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${userDetails.token}`,
                'Content-Type': 'application/json'
            }
        };

        const res = await fetch(`/api/users/delete/${userId}`, config);
        const data = await res.json();

        if (data.error) {
            return dispatch({type: 'DELETE_USER_FAIL', payload: data});
        }

        dispatch({type: 'DELETE_USER_SUCCESS', payload: data});
        

    } catch (err) {
        dispatch({type: 'DELETE_USER_FAIL', payload: 'deleteUser action error'})
    }
}



export { signup, signin, signout, getUsers, getUserById }