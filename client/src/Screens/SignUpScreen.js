import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/userActions';
import Loader from '../Components/Loader';
import './SignUpScreen.css';



const SignUpScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { error, loading, userDetails } = userSignin;

    // if they come to this url with '/register?redirect=...' then grab it. Else return HomeScreen url
    const redirect = location.search ? location.search.split('=')[1] : '/';

    //useEffect to redirect registered users away



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, email, password))
    }




    return (
        <div className='signup-screen'>

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
                        type="text"
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
