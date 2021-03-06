import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCreatedOrder, getOrderById } from '../actions/orderActions';
import { clearCart } from '../actions/cartActions';
import './OrderConfirmation.css';
import Loader from '../Components/Loader';
import Message from '../Components/Message';



const OrderConfirmation = ({ history, match }) => {
    //get order id
    const orderId = match.params.orderId;

    //get order by id & clear created order redux state
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.order);
    const { order, loading, error } = orderState;

    //error handling (Message)
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState(`Thank you for shopping with us!`);

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }

    useEffect(() => {
        dispatch(clearCreatedOrder()); //needs to be cleared in case user wants to make another order after this one
        dispatch(clearCart());
        dispatch(getOrderById(orderId));
        if (error) {
            setErrorText(error.error);
            showMessage();
        }
    }, [error])




    
    


    //pickup confirmation
    const pickupConfirmation = () => (
        <React.Fragment>
            <h2>Thank you for your purchase, {order.address.name.charAt(0).toUpperCase() + order.address.name.slice(1)}!</h2>
            <h3>Your purchase is now waiting for you at our store.</h3>
            <p>Your order (ID: {order._id}) will come up to: ${order.totalPrice}</p>
            <button style={{marginTop: '2rem', cursor: 'pointer'}} onClick={() => history.push('/')}>Go Home</button>
        </React.Fragment>
    )



    return (
        <div className='order-confirmation-screen'>

            {loading && <Loader />}

            <Message shown={errorShown} text={errorText}></Message>

            {order && pickupConfirmation()}

        </div>
    )
}



export default OrderConfirmation;
