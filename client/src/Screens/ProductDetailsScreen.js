import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneToCart } from '../actions/cartActions';
import './ProductDetailsScreen.css';
import Loader from '../Components/Loader';
import Message from '../Components/Message';



const ProductDetailsScreen = ({ match, history }) => {
    //get product
    const productId = match.params.productId;

    const productsByCategory = useSelector(state => state.productsByCategory);
    const { loading, error, products } = productsByCategory;
    const currentProduct = products.find(product => product._id === productId);



    //addOneToCart + show 'Item added' functionality
    const dispatch = useDispatch();
    const [messageShown, setMessageShown] = useState(false);
    const [messageText, setMessageText] = useState('Item was added to cart');

    const showMessage = () => {
        setMessageShown(true);
        setTimeout(() => {
            setMessageShown(false);
        }, 2500)
    }



    return (
        loading ? <Loader /> : error ? <div className='product-details'><h2 style={{textAlign: 'center'}}>Something went wrong</h2></div> :

        <div className='product-details'>

            <Message shown={messageShown} text={messageText}></Message> 

            <div 
                className='product-details-img' 
                style={{
                    background: `url(/api/products/getImage/${productId}) no-repeat center center/cover`,
                    minWidth: '260px',
                    height: '500px',
                    margin: '2.5%',
                    borderRadius: '10px'
                }}
            />

            <div className="product-details-txt">
                <h2>{currentProduct.name}</h2>
                <p><strong>Price: </strong> ${currentProduct.price}</p>
                <p><strong>In Stock: </strong> {currentProduct.inStock}</p>
                <p><strong>Description: </strong> {currentProduct.description}</p>
                <div className="product-details-buttons">
                    <button className='product-details-btn' onClick={() => history.push(`/ProductsByCategory/${currentProduct.category}`)}>&#8592; Go Back</button>
                    <button className='product-details-btn' onClick={() => {
                        dispatch(addOneToCart(currentProduct._id));
                        showMessage();
                    }}> Add to Cart <small>&#128722;</small></button>
                </div>
            </div>
        </div>
    )
};



export default ProductDetailsScreen
