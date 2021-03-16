import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../actions/userActions';
import { getOrders } from '../actions/orderActions';
import { changeUserRole } from '../actions/userActions';
import Loader from '../Components/Loader';
import './EditUserScreen.css';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';




const EditUserScreen = ({ history, match }) => {
    //REDIRECT NON-ADMINS AWAY
    //get user from state => useEffect redirects non-Admins away
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;



    //MESSAGE
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState(`User's Role changed`);
 
    const showMessage = () => {
            setErrorShown(true);
            setTimeout(() => {
                setErrorShown(false);
            }, 2500)
    }
  


    //USER
    //get user from state
    const userId = match.params.userId;
    const userByIdReducer = useSelector(state => state.userById);
    const { loading, userById, error } = userByIdReducer;

    //change user's role (isAdmin) state
    const changeUserRoleReducer = useSelector(state => state.changeUserRole);
    const { changeUserRoleLoading, updatedUser, changeUserRoleError } = changeUserRoleReducer;

    //change user's role function
    const changeAdminStatus = () => {
        dispatch(changeUserRole(userId));
    }

    //render user details
    const showUserDetails = () => (
        error ?
            <h2 style={{textAlign: 'center', color: 'rgb(114, 39, 39)'}}>Something went wrong and the user was not found.</h2>
                :
                <div className="user-details">

                    <h2>Edit User</h2>

                    <div className="user-info">
                        {userById.isAdmin ? <p>{userById.name} is an <strong style={{color: 'green'}}> Admin </strong></p> : <p>{userById.name} is a <strong> customer</strong> </p>}
                        <p> email: {userById.email}</p>
                        <button className='delete-user-btn'>Delete This User</button>
                        <button 
                            className='user-role-btn'
                            onClick={changeAdminStatus}
                        >
                            {userById.isAdmin ? 'Remove Admin Access' : 'Make User Admin'}
                        </button>
                    </div>

                </div>
    );



    //ORDERS
    //get orders from state
    const getAllOrdersReducer = useSelector(state => state.getAllOrders);
    const { orders, getOrdersLoading, getOrdersError } = getAllOrdersReducer;

    //render order details
    const showOrderDetails = () => (
        getOrdersError ?
            <p style={{textAlign: 'center', color: 'rgb(114, 39, 39)'}}>Something went wrong and the user's orders were not found.</p>
            : 
            <React.Fragment>
                <h3>User's Orders</h3>
                
                <div className="user-orders">
                    {orders.map(order => {
                        if (order.user === userId) {
                            return <div className="user-order" key={order._id}>
                                
                                <Link to={`/admin/editOrder/${order._id}?redirect=/admin/editUser/${userId}`}><button style={{cursor: 'pointer'}}>Edit This Order</button></Link>

                                <p><strong>Order ID: </strong> {order._id}</p>
                                <p><strong>Shipping Type: </strong> {order.address.shipping}</p>
                                <p><strong>Ordered Items: </strong> {order.orderItems.map((item, index) => <span key={index}>{item.name}({item.qty}pcs.), </span>)}</p>
                                <p><strong>Order Total Price : </strong> {order.totalPrice}</p>
                                <p><strong>Order Paid? : </strong> {order.isPaid ? <span style={{color: 'green'}}>&check;</span> : <span style={{color: 'rgb(114, 39, 39)', fontSize: '1.5rem', lineHeight: '1rem' }}>&times;</span>} </p>
                                <p><strong>Order Delivered? : </strong> {order.isDelivered ? <span style={{color: 'green'}}>&check;</span> : <span style={{color: 'rgb(114, 39, 39)', fontSize: '1.5rem', lineHeight: '1rem' }}>&times;</span>} </p>
                            
                            </div>

                        } else {
                            return <p>User has no orders</p>
                        }
                    })}
                    
                </div>
            </React.Fragment>
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

        //role-change success message
        if (updatedUser && updatedUser._id) {
            setErrorText(`User's Role changed`);
            showMessage();
            dispatch({type: 'CLEAR_CHANGE_USER_ROLE_RESULTS'});
        }

        //role-change error message
        if (changeUserRoleError) {
            setErrorText(changeUserRoleError.error || changeUserRoleError);
            showMessage();
        }

    }, [userDetails, updatedUser, changeUserRoleError]);



    return (
        <div className='edit-user-screen'>

            <Message shown={errorShown} text={errorText}></Message> 

            <button className='go-back-btn' onClick={() => history.push('/admin')}>&larr; Go Back</button>
            
            {loading ? <Loader /> : userById ? showUserDetails() : null}

            {getOrdersLoading ? <p>Getting User's Orders...</p> : orders ? showOrderDetails() : <p>User has no orders</p>}

        </div>
    )
}



export default EditUserScreen
