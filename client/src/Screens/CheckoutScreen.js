import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CheckoutScreen.css';



const CheckoutScreen = ({ history }) => {
    //calculate order summary
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    cart.itemsTotalQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
    cart.itemsTotalPrice = cartItems.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);



    //redirect to '/signin' if user not signed in
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;
    
    useEffect(() => {
        if (!userDetails._id) {
            history.push('/signin?redirect=/checkout');
        }
    }, [userDetails]);



    return (
        <div className='checkout-screen'>

            <h2>Your order: </h2>

            {cartItems.length > 0 ?
                cartItems.map(item => (
                    <div className="checkou-screen-summary">

                        <div className="item-wrapper">

                            <div 
                                className="checkout-screen-item-img"
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

            <div className="checkout-screen-total">
                <p><strong>Items Total: </strong> {cart.itemsTotalQty}</p>
                <p><strong>Total Price</strong>: {cart.itemsTotalPrice}</p>
                <button onClick={() => {history.push('/cart')}}>Go back to Cart</button>
            </div>

        </div>
    )
}

export default CheckoutScreen
