import React, { useState, useEffect } from 'react';
import './OrderScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';



const OrderScreen = ({ history, location }) => {
        //get 'shipping' from url
        const shipping = location.search.split('=')[1];

        //calculate order summary
        const dispatch = useDispatch();
        const cart = useSelector(state => state.cart);
        const { cartItems } = cart;
    
        cart.itemsTotalQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
        cart.itemsTotalPrice = cartItems.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);
    
    
    
        //redirect to '/signin' if user not signed in   or    if user skipped the '/shipping' step
        const userSignin = useSelector(state => state.userSignin);
        const { userDetails } = userSignin;
        const { address } = cart;
        
        useEffect(() => {
            if (!userDetails._id) {
                history.push('/signin?redirect=/checkout');
            }
            if (!address.shipping) {
                history.push('/shipping');
            }
        }, [userDetails]);
    
    
    
        //error handling (Message)
        const [errorShown, setErrorShown] = useState(false);
        const [errorText, setErrorText] = useState('Please fill in all address fields');
    
        const showMessage = () => {
            setErrorShown(true);
            setTimeout(() => {
                setErrorShown(false);
            }, 2500)
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

        {shipping === 'pickup' && <p>Your order will be waiting for you at our store</p>}

    </div>
    )
}

export default OrderScreen
