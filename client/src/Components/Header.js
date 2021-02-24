import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';



const Header = () => {
    return (
        <div className='header'>
            <div className="header-logo">
                <Link to='/' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <h1>Needful Things</h1>
                </Link>
            </div>
            <div className="header-links">
                <Link to='/signup' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <p>Sign up</p>
                </Link>
                <Link to='/signin' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <p>Sign in</p>
                </Link>
                <Link to='/shop' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <p>Shop</p>
                </Link>
                <Link to='/cart' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <p>Cart</p>
                </Link>
                <Link to='/about' style={{textDecoration: 'none', color: '#ddd', cursor: 'pointer'}}>
                    <p>About</p>
                </Link>
            </div>
        </div>
    )
};



export default Header
