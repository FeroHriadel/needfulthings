import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signout } from '../actions/userActions';



const Header = ({ history }) => {
    //get cart items total qty
    const cart = useSelector(state => state.cart);
    cart.itemsQty = cart.cartItems.reduce((acc, curr) => acc + curr.qty, 0);

    
    
    //is user registered?
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;



    //not registered links:
    const unregisteredUserLinks = () => (
        <React.Fragment>
            <Link to='/signup' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                <p>Sign up</p>
            </Link>
            <Link to='/signin' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                <p>Sign in</p>
            </Link>
        </React.Fragment>
    );

    //registered user links
    const registeredUserLinks = () => (
            <p style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}} onClick={() => {dispatch(signout())}}>Sing out</p>
    )



    return (
        <div className='header'>
            <div className="header-logo">
                <Link to='/' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <h1>Needful Things</h1>
                </Link>
            </div>

            <div className="header-links">

                {userDetails ? registeredUserLinks() : unregisteredUserLinks()}

                <Link to='/shop' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <p>Shop</p>
                </Link>

                <Link to='/cart' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}} onClick={() => history.push('/cart')}>
                    <p>Cart({cart.itemsQty})</p>
                </Link>

                <Link to='/about' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <p>About</p>
                </Link>

            </div>
        </div>
    )
};



export default withRouter(Header);
