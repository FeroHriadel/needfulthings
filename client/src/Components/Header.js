import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signout } from '../actions/userActions';



const Header = ({ history, location }) => {
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
            <Link to='/signup' style={isActive('/signup')}>
                <p>Sign up</p>
            </Link>
            <Link to='/signin' style={isActive('/signin')}>
                <p>Sign in</p>
            </Link>
        </React.Fragment>
    );

    //registered user links
    const registeredUserLinks = () => (
            <p style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}} onClick={() => {dispatch(signout())}}>Sing out</p>
    )

    //admin link
    const adminLink = () => (
        <Link to='/admin' style={isActive('/admin')}>
            <p>Admin</p>
        </Link>
    )



    //active link highlight
    const isActive = (string) => {
        if (location.pathname === string) {
            return {textDecoration: 'none', color: 'rgb(167, 26, 26)', cursor: 'pointer'}
        } else {
            return {textDecoration: 'none', color: '#ddd', cursor: 'pointer'}
        }
    }



    return (
        <div className='header'>
            <div className="header-logo">
                <Link to='/' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <h1>Needful Things</h1>
                </Link>
            </div>

            <div className="header-links">

                {userDetails._id ? registeredUserLinks() : unregisteredUserLinks()}

                <Link to='/shop' style={isActive('/shop')}>
                    <p>Shop</p>
                </Link>

                <Link to='/cart' style={isActive('/cart')} onClick={() => history.push('/cart')}>
                    <p>Cart({cart.itemsQty})</p>
                </Link>

                <Link to='/about' style={isActive('/about')}>
                    <p>About</p>
                </Link>

                {userDetails.isAdmin && adminLink()}

            </div>
        </div>
    )
};



export default withRouter(Header);
