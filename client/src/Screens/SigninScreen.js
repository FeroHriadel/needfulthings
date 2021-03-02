import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import Message from '../Components/Message';
import './SigninScreen.css';
import { Link } from 'react-router-dom';
import SmallLoader from '../Components/SmallLoader';



const SigninScreen = ({ history, location }) => {
    //user state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { error, loading, userDetails } = userSignin;



    // if they come to this url with '/register?redirect=...' then grab it. Else return HomeScreen url
    //useEffect will redirect signed-in users away
    const redirect = location.search ? location.search.split('=')[1] : '/';



    //error handling (message)
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('You are signed in');

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }

    useEffect(() => {
        //listen for error
        if (error) {
            setErrorText(error.error);
        } else {
            setErrorText('You are signed in')
        }

        //listen for userDetails (did user get signed-in?)
        if (userDetails._id) {
            history.push('/');
        }
    }, [error, userDetails, redirect])



    //submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
        showMessage();
    }



    return (
        <div className='signin-screen'>

            <Message shown={errorShown} text={errorText}></Message>           

            <h2>Please Sign In</h2>

            <form onSubmit={submitHandler}>

                <p>
                    Don't have an account?
                    <span>
                        <Link to='/signup' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer', textDecoration: 'underline'}}>
                            Sign up
                        </Link>
                    </span>
                </p>

                <div className="form-group">
                    <label>Email: </label>
                    <input 
                        type="email"
                        placeholder='email'
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input 
                        type="text"
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                
                <button type='submit'>
                    {loading ? <SmallLoader /> : <p>Sign In</p>}
                </button>

            </form>
    </div>
    )
}

export default SigninScreen
