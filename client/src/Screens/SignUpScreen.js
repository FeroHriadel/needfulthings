import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/userActions';
import SmallLoader from '../Components/SmallLoader';
import './SignUpScreen.css';
import Message from '../Components/Message';



const SignUpScreen = ({ location, history }) => {
    //get user & user input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { error, loading, userDetails } = userSignin;



    // if they come to this url with '/register?redirect=...' then grab it. Else return HomeScreen url
    //useEffect will redirect registered users away
    const redirect = location.search ? location.search.split('=')[1] : '/';

    

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
        //listen for errors
        if (error) {
            setErrorText(error.error);
        } else {
            setErrorText('Thank you for registering!')
        }

        //listen for userDetails (did user get signed-up?)
        if (userDetails._id) {
            history.push(redirect);
        }
    }, [error, userDetails, redirect])



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
                
                <button type='submit'>
                    {loading ? <SmallLoader /> : <p>Sign Up</p>}
                </button>

            </form>
        </div>
    )
}

export default SignUpScreen
