import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/userActions';
import Loader from '../Components/Loader';
import './SignUpScreen.css';
import Message from '../Components/Message';
import { set } from 'mongoose';



const SignUpScreen = ({ location, history }) => {
    //user state variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { error, loading, userDetails } = userSignin;


    
    //error handling
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('Thank you for registering!');

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }

    useEffect(() => {
        if (error) {
            setErrorText(error.error);
        } else {
            setErrorText('Thank you for registering!')
        }
    }, [error])



    // if they come to this url with '/register?redirect=...' then grab it. Else return HomeScreen url
    const redirect = location.search ? location.search.split('=')[1] : '/';

    //useEffect to redirect registered users away



    //submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, email, password));
        showMessage();
    }



    return (
        <div className='signup-screen'>

            <Message shown={errorShown} text={errorText}></Message>           

            <h2>Please Sign Up</h2>


            <form onSubmit={submitHandler}>

                <div className="form-group">
                    <label>Name: </label>
                    <input 
                        type="text"
                        placeholder='name'
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

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
                
                <button type='submit'>Sign Up</button>

            </form>
        </div>
    )
}

export default SignUpScreen
