import React from 'react';
import { useSelector } from 'react-redux';
import './ProductDetailsScreen.css';



const ProductDetailsScreen = ({ match, history }) => {
    //get product
    const productId = match.params.productId;

    const productsByCategory = useSelector(state => state.productsByCategory);
    const { loading, error, products } = productsByCategory;
    const currentProduct = products.find(product => product._id === productId);



    return (
        <div className='product-details'>
            <div 
                className='product-details-img' 
                style={{
                    background: `url(/api/products/getImage/${productId}) no-repeat center center/cover`,
                    width: '45%',
                    minWidth: '260px',
                    height: '300px',
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
                    <button className='product-details-btn'> Add to Cart <small>&#128722;</small></button>
                </div>
            </div>
        </div>
    )
};



export default ProductDetailsScreen
