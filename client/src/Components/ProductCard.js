import React from 'react';
import './ProductCard.css';



const ProductCard = ({ product }) => {
    return (

        <div className='product-card'>
            <div 
                className='product-card-img' 
                style={{
                    background: `url(/api/products/getImage/${product._id}) no-repeat center center/cover`,
                    width: '95%',
                    height: '50%',
                    margin: '2.5%',
                    borderRadius: '5px',
                    filter: 'brightness(1)',
                    transition: 'filter 4s linear'
                }}
                onMouseOver={(e) => {e.target.style.filter = 'brightness(2)'}}
                onMouseLeave={(e) => {e.target.style.filter = 'brightness(1)'}}
            />

            <div className="product-card-txt">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                {product.inStock > 0 ? <p>In Stock</p> : <p>Sorry, Sold Out</p>}
                <div className="product-card-buttons">
                    <button className='product-card-btn'>Add to Cart</button>
                    <button className='product-card-btn'>Details</button>
                </div>
            </div>
        </div>
    )
}



export default ProductCard
