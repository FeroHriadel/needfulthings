import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneToCart } from '../actions/cartActions';
import { getProductById } from '../actions/productActions';
import './ProductDetailsScreen.css';
import Loader from '../Components/Loader';
import Message from '../Components/Message';



const ProductDetailsScreen = ({ match, history, location }) => {
    //GET REDIRECT TO (should 'go back' btn redirect to '/' or '/search'?)
    const redirect = location.search ? location.search.split('=')[1] : '/';



    //PRODUCT STATE
    const productId = match.params.productId;
    const productByIdReducer = useSelector(state => state.productById);
    const { loading, error, product } = productByIdReducer;



    //MESSAGE
    const dispatch = useDispatch();
    const [messageShown, setMessageShown] = useState(false);
    const [messageText, setMessageText] = useState('Item was added to cart');

    const showMessage = () => {
        setMessageShown(true);
        setTimeout(() => {
            setMessageShown(false);
        }, 2500)
    }



    //USE EFFECT
    useEffect(() => {
        dispatch(getProductById(productId))
    }, [])



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
                <h2>{product.name}</h2>
                <p><strong>Price: </strong> ${product.price}</p>
                <p><strong>In Stock: </strong> {product.inStock}</p>
                <p><strong>Description: </strong> {product.description}</p>
                <div className="product-details-buttons">
                    <button 
                        className='product-details-btn' 
                        onClick={() => {
                            if (redirect === '/search') {
                                history.push('/search');
                            } else {
                                history.push(`/ProductsByCategory/${product.category}`)
                            }
                        }}>&#8592; Go Back</button>
                    <button className='product-details-btn' onClick={() => {
                        dispatch(addOneToCart(product._id));
                        showMessage();
                    }}> Add to Cart <small>&#128722;</small></button>
                </div>
            </div>
        </div>
    )
};



export default ProductDetailsScreen
