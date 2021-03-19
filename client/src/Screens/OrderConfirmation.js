import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCreatedOrder, getOrderById } from '../actions/orderActions';
import { clearCart } from '../actions/cartActions';
import './OrderConfirmation.css';
import Loader from '../Components/Loader';
import Message from '../Components/Message';



const OrderConfirmation = ({ history, match }) => {
    //USER
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;



    //ORDER
    //get order._id
    const orderId = match.params.orderId;

    //getOrder state
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.order);
    const { order, loading, error } = orderState;



    //MESSAGE
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState(`Thank you for shopping with us!`);

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }



    //EMAIL
    //sent in useEffect
    const sendEmail = async () => {
        const res = await fetch(`/api/orders/email/${orderId}/${userDetails.email}`)
    }    




    //pickup confirmation html
    const pickupConfirmation = () => (
        <React.Fragment>
            <h2>Thank you for your purchase, {order.address.name.charAt(0).toUpperCase() + order.address.name.slice(1)}!</h2>
            <h3>Your purchase is now waiting for you at our store.</h3>
            <p>Your order (ID: {order._id}) will come up to: ${order.totalPrice}</p>
            <p>We also sent you a confirmation email. Should be in your inbox shortly.</p>
            <button style={{marginTop: '2rem', cursor: 'pointer'}} onClick={() => history.push('/')}>Go Home</button>
        </React.Fragment>
    )

    //ship confirmation html
    const shipConfirmation = () => (
        <React.Fragment>
            <h2>Thank you for your purchase, {order.address.name.charAt(0).toUpperCase() + order.address.name.slice(1)}!</h2>
            <h3>We are shipping your order right away.</h3>
            <p>We also sent you a confirmation email. Should be in your inbox shortly.</p>
            <button style={{marginTop: '2rem', cursor: 'pointer'}} onClick={() => history.push('/')}>Go Home</button>
        </React.Fragment>
    )



    //UPDATE PRODUCT
    const [oldOrderCleared, setOldOrderCleared] = useState(false);

    //get products id&qty array from order
    const getProductsFromOrder = () => {
        let orderProducts = order.orderItems.map(item => {
            let obj = {};
            obj.productId = item.productId;
            obj.qty = item.qty
            return obj;
        });

        return orderProducts;
    }

    //update product inStock&sold
    const updateProductStats = async (productFromOrder) => {
        const config = {
            method: 'PUT',
            body: JSON.stringify({piecesSold: productFromOrder.qty}),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await fetch(`/api/products/updateStats/${productFromOrder.productId}`, config);
        // const data = await res.json(); //
        // console.log(data) //
    }





    //USE EFFECT
    useEffect(() => {
        //cleanup
        if (!oldOrderCleared) {
            dispatch(clearCreatedOrder()); //needs to be cleared in case user wants to make another order after this one
            dispatch(clearCart());
            dispatch(getOrderById(orderId));
            setOldOrderCleared(true);
        }

        //product stats update
        if (oldOrderCleared && order) {
            const productsFromOrder = getProductsFromOrder();
            productsFromOrder.forEach(item => {
                updateProductStats(item);
            })
            sendEmail();
            setOldOrderCleared(false);
        }
        
        //display error
        if (error) {
            setErrorText(error.error);
            showMessage();
        }

    }, [error, order])


    /****************** useEffect before updateStats backup ****************
    useEffect(() => {
        dispatch(clearCreatedOrder()); //needs to be cleared in case user wants to make another order after this one
        dispatch(clearCart());
        dispatch(getOrderById(orderId));
        if (error) {
            setErrorText(error.error);
            showMessage();
        }

    }, [error])
    ****************************(just in case)********************************/
   


    return (
        <div className='order-confirmation-screen'>

            {loading && <Loader />}

            <Message shown={errorShown} text={errorText}></Message>

            {!loading && order && order.isPaid === false && pickupConfirmation()}

            {!loading && order && order.isPaid === true && shipConfirmation()}


        </div>
    )
}



export default OrderConfirmation;
