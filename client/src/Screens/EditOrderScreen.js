import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, updateOrder, deleteOrder } from '../actions/orderActions';
import Loader from '../Components/Loader';
import './EditOrderScreen.css';
import Message from '../Components/Message';



const EditOrderScreen = ({ history, match, location }) => {
    //REDIRECT NON-ADMINS
    //get user from state => useEffect redirects non-Admins away
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;


    
    //REDIRECT TO? (where should 'go-back' btn redirect)
    const redirect = location.search ? location.search.split('=')[1] : '/admin';



    //MESSAGE
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('Category updated');
    const [messageWasShown, setMessageWasShown] = useState(true);
 
    const showMessage = () => {
        if (messageWasShown) {
            return
        }

        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }



    //GET ORDER
    //get order from state
    const orderId = match.params.orderId; //useEffect dispatches getOrder(orderId) action
    const orderReducer = useSelector(state => state.order);
    const { loading, order, error } = orderReducer;



    //GET UPDATED ORDER
    const updatedOrderReducer = useSelector(state => state.updatedOrder);
    const { updateOrderLoading, updatedOrder, updateOrderError } = updatedOrderReducer;



    //DELETE ORDER STATE
    const deleteOrderReducer = useSelector(state => state.deleteOrderReducer);
    const { deleteOrderLoading, deleteOrderMessage, deleteOrderError } = deleteOrderReducer;

        

    //RENDER ORDER
    const showOrderDetails = () => (
                error ?
                    <h2 style={{textAlign: 'center', color: 'rgb(114, 39, 39)'}}>Something went wrong and the order was not found.</h2>
                        :
                        <div className='order-details-box'>
                            <h2>Order Details: </h2>
                            
                            <div className="detailed-info">
                                <p> <strong>Name: </strong> {order.address.name} </p>
                                <p> <strong>Shipping Type: </strong> {order.address.shipping} </p>
                                {order.address.street && <p> <strong>Address: </strong> {order.address.street}, {order.address.city}, {order.address.zip}, {order.address.country} </p>}
                                <p> <strong>Shipping Price: </strong> ${order.shippingPrice} </p>
                                <p> <strong>Total Price: </strong> ${order.totalPrice} </p>
                                <p> <strong>Is Paid?</strong> {order.isPaid ? <span style={{color: 'green'}}>&#10003;</span> : <span style={  {color: 'rgb(114, 39, 39)', fontSize: '1.5rem', lineHeight: '1rem'}}>&times;</span>} </p>
                                <p> <strong>Ordered Items: </strong> {order.orderItems.map(item => (
                                    <span>
                                        {item.name} ({item.qty}pcs); <br />
                                    </span>
                                ))} </p>
                                <p> <strong>Is Delivered? </strong> {order.isDelivered ? <span style={{color: 'green'}}>&#10003;</span> :     <span style={{color: 'rgb(114, 39, 39)', fontSize: '1.5rem', lineHeight: '1rem'}}>&times;</span> } </p>
                            </div>

                            <div className="order-details-buttons">
                                    <button 
                                        onClick={() => {
                                            dispatch(updateOrder(orderId, !order.isPaid, order.isDelivered));
                                        }}
                                    >
                                        {order.isPaid ? 'Update to Unpaid' : 'Update to Paid'}
                                    </button>

                                    <button 
                                        onClick={() => {
                                            dispatch(updateOrder(orderId, order.isPaid, !order.isDelivered))
                                        }}
                                    >
                                        {order.isDelivered ? 'Update to Not Delivered' : 'Update to Delivered'}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMessageWasShown(false);
                                            dispatch(deleteOrder(orderId));
                                        }}
                                    >
                                        Delete Order
                                    </button>
                            </div>

                        </div>
    )



    //USE EFFECT
    useEffect(() => {
        //redirect non-admin users away
        if (!userDetails.isAdmin) {
            history.push('/')
        }

        //get order
        dispatch(getOrderById(orderId));

        //listen for deleteOrder success
        if (deleteOrderMessage) {
            setErrorText(deleteOrderMessage.message || deleteOrderMessage);
            showMessage();
            setMessageWasShown(true); //this is here so old message doesn't pop up on re-render
        }

        //listen for deleteOrder error
        if (deleteOrderError) {
            setErrorText(deleteOrderError.error || deleteOrderError);
            showMessage();
            setMessageWasShown(true); //this is here so old message doesn't pop up on re-render
        }

    }, [userDetails, updatedOrder, deleteOrderMessage, deleteOrderError]);



    return (
        <div className='edit-order-screen'>

            <Message shown={errorShown} text={errorText}></Message> 

            <button className='go-back-button' onClick={() => {
                dispatch({type: 'CLEAR_ORDER'});            // => previously delegated to AdminScreen
                dispatch({type: 'CLEAR_UPDATED_ORDER'});    // => previously delegated to AdminScreen
                history.push(redirect);
            }}>&#8592; Go Back</button>

            {loading ? <Loader /> : order ? showOrderDetails() : <h2 style={{textAlign: 'center', color: 'rgb(114, 39, 39)'}}>Order was not found.</h2>}

        </div>
    )
}

export default EditOrderScreen
