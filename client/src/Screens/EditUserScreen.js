import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../actions/userActions';
import { getOrders } from '../actions/orderActions';
import Loader from '../Components/Loader';
import './EditUserScreen.css';




const EditUserScreen = ({ history, match }) => {
    //REDIRECT NON-ADMINS AWAY
    //get user from state => useEffect redirects non-Admins away
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;



    //GET ORDERS
    //get orders from state
    const getAllOrdersReducer = useSelector(state => state.getAllOrders);
    const { orders, getOrdersLoading, getOrdersError } = getAllOrdersReducer;

    //get user's orders
    const userOrders = orders.filter(order => order._id === userId);
    console.log(userOrders);
    


    //USER
    //get user from state
    const userId = match.params.userId;
    const userByIdReducer = useSelector(state => state.userById);
    const { loading, userById, error } = userByIdReducer;


    //render edit user screen
    const showUserDetails = () => (
        error ?
            <h2 style={{textAlign: 'center', color: 'rgb(114, 39, 39)'}}>Something went wrong and the user was not found.</h2>
                :
                <div className="user-details">

                    <h2>Edit User</h2>

                    <div className="user-info">
                        {userById.isAdmin ? <p>{userById.name} is an <strong> Admin </strong></p> : <p>{userById.name} is a <strong> customer</strong>, </p>}
                        <p><strong> email at: </strong> {userById.email}</p>
                    </div>

                </div>
    )



    //USE EFFECT
    useEffect(() => {
        //redirect non-admin users away
        if (!userDetails.isAdmin) {
            history.push('/')
        }

        //get user && orders
        dispatch(getUserById(userId));
        dispatch(getOrders());

    }, [userDetails]);



    return (
        <div className='edit-user-screen'>
            
            {loading ? <Loader /> : userById ? showUserDetails() : null}

        </div>
    )
}



export default EditUserScreen
