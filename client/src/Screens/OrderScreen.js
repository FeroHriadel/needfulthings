import React, { useState, useEffect } from 'react';
import './OrderScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import { createOrder } from '../actions/orderActions';
import Loader from '../Components/Loader';



const OrderScreen = ({ history, location }) => {
        //get 'shipping' from url
        const shipping = location.search.split('=')[1];

        //calculate order summary
        const dispatch = useDispatch();
        const cart = useSelector(state => state.cart);
        const { cartItems } = cart;
    
        cart.itemsTotalQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
        cart.itemsTotalPrice = cartItems.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);
    


        //get state.orderCreate so you can display Loader & Message with success/fail
        const order = useSelector(state => state.orderCreate);
        const { error, loading, success, order: orderResponse } = order; //   'order: orderResponse'   should destructure order from state.orderCreate and rename it to orderResponse

    
    
        //redirect to '/signin' if user not signed in   or    if user skipped the '/shipping' step
        const userSignin = useSelector(state => state.userSignin);
        const { userDetails } = userSignin;
        const { address } = cart;
        
        useEffect(() => {
            //if user not signed-in
            if (!userDetails._id) {
                history.push('/signin?redirect=/checkout');
            }

            //if user skipped the '/shipping' step somehow
            if (!address.shipping) {
                history.push('/shipping');
            }

            //if error when dispatching order
            if (error) {
                setErrorText(error.error);
                showMessage();
            }

            //confirm order created successfully & redirect to orderConfirmation
            if (success) {
                setErrorText(`Your order's been received`)
                showMessage();
                history.push(`/orderConfirmation/${orderResponse._id}`);
            }
        }, [userDetails, address, error, success, orderResponse]);
    
    
    
        //error handling (Message)
        const [errorShown, setErrorShown] = useState(false);
        const [errorText, setErrorText] = useState(`Your order's been received`);
    
        const showMessage = () => {
            setErrorShown(true);
            setTimeout(() => {
                setErrorShown(false);
            }, 2500)
        }



        //create order
        const submitOrder = () => { //only put in cartItem details that Order Schema requires, no need to send all the other details.
            //const orderUserId = userDetails._id;   => not necessary 'protect' middleware will fetch user._id in backend
            const orderItems = cartItems.map(item => {
                return {
                    name: item.name,
                    qty: item.qty,
                    price: item.price,
                    productId: item._id
                }
            })
            const orderAddress = address;
            const orderShippingPrice = cart.itemsTotalPrice <= 99 && cart.address.shipping === 'ship' ? 30 : cart.itemsTotalPrice > 99 && cart.address.shipping === 'ship' ? 0 : 0  ; //purchases over $99 have free shipping, else shippingPrice = $30, pickup = 0
            const orderTotalPrice = cart.itemsTotalPrice + orderShippingPrice;

            dispatch(createOrder({
                //user: orderUserId,
                orderItems,
                address: orderAddress,
                totalPrice: orderTotalPrice,
                shippingPrice: orderShippingPrice
            }));
        }



    return (
        <div className='order-screen'>

            <Message shown={errorShown} text={errorText}></Message> 

            <h2>Your order: </h2>

            {cartItems.length > 0 ?
                cartItems.map(item => (
                    <div key={item._id} className="order-screen-summary">

                        <div className="item-wrapper">

                            <div 
                                className="order-screen-item-img"
                                style={{
                                    background: `url(/api/products/getImage/${item._id}) no-repeat center center/cover`,
                                    width: '3rem',
                                    height: '3rem',
                                    marginLeft: '1rem'
                                }}
                            />

                            <div className="order-screen-item-details">
                                    <span>{item.name}({item.qty}pcs.)</span>
                                    <span> x </span>
                                    <span>${item.price}</span>
                                    <span> = </span>
                                    <span>${item.price * item.qty}</span>                        
                            </div>

                        </div>

                    </div>
                ))

                :

                <h4>No items have been put in cart yet</h4>
            }

            {shipping === 'ship' && cartItems.length > 0 && cart.itemsTotalPrice <= 99 
            ?
                <div className="shipping-table-item">
                    Shipping: $30
                </div>
            :
                null
            }

            <div className="order-screen-total">
                <p><strong>Items Total: </strong> {cart.itemsTotalQty}</p>
                <p><strong>Total Price</strong>: ${shipping === 'ship' && cartItems.length > 0 && cart.itemsTotalPrice <= 99 ? cart.itemsTotalPrice + 30 : cart.itemsTotalPrice}</p>
                <button onClick={() => {history.push('/shipping')}}>Go back to Shipping</button>
            </div>

            {shipping === 'pickup' ?
                <div className='pickup-buttons'>
                    <button onClick={() => history.push('/cart')}>&#8592; Change Order</button>
                    <button onClick={submitOrder}>Send Order</button>
                </div>
                :
                <div className='ship-buttons'>
                    <button>&#8592; Go Back</button>
                    {/* payment stuff */}
                </div>
            }



            {loading && <Loader />}

    </div>
    )
}

export default OrderScreen
