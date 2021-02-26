import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addOneToCart } from '../actions/cartActions';
import './CartScreen.css';



const CartScreen = () => {
    //get cart
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    //calculate total price
    cart.itemsTotalQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
    cart.itemsTotalPrice = cartItems.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);
    


    return (
        <div className='cart-screen'>

            <h2>Your Cart: </h2>

            <div className="cart-details">

                <div className="cart-details-header">
                    <h4>Item</h4>
                    <h4>Price per Item</h4>
                    <h4>pcs. in Cart</h4>
                    <h4>Sub-total</h4>
                </div>

                {
                cartItems.length > 0
                ?
                cartItems.map((item) => (
                    <div key={item._id} className='cart-details-row'>
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <div className="quantity-box">
                            <p>{item.qty}</p>
                            <div className="button-box">
                                <button onClick={() => {dispatch(addOneToCart(item._id))}}>&#9650;</button>
                                <button>&#9660;</button>
                            </div>
                        </div>
                        <p>${item.price * item.qty}</p>
                    </div>
                ))
                :
                <p>Your cart is empty</p>
                }

                <div className="cart-details-summary">
                    <h4>SUMMARY: </h4>
                    <p><strong>Items Total: </strong> {cart.itemsTotalQty}</p>
                    <p><strong>Total Price: </strong> ${cart.itemsTotalPrice}</p>
                </div>

            </div>

        </div>
    )
}



export default CartScreen
