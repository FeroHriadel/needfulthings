import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import ProductCard from '../Components/ProductCard';
import Loader from '../Components/Loader';
import './ProductsByCategoryScreen.css';
import Message from '../Components/Message';



const ProductsByCategoryScreen = ({ match, history }) => {
    //get products by category
    const categoryId = match.params.categoryId;

    const dispatch = useDispatch();
    const productsByCategory = useSelector(state => state.productsByCategory);
    const { loading, error, products } = productsByCategory;

    useEffect(() => {
        //listen for category
        dispatch(getProductsByCategory(categoryId));
    }, [dispatch, categoryId])



    //get current category name
    const categoriesList = useSelector(state => state.categoriesList);
    const { categories } = categoriesList;
    const currentCategory = categories.find(category => category._id === categoryId);



    //show message 'added to cart'
    const [messageShown, setMessageShown] = useState(false);
    const [messageText, setMessageText] = useState('Item was added to cart');

    const showMessage = () => {
        setMessageShown(true);
        setTimeout(() => {
            setMessageShown(false);
        }, 2500)
    }



    return (

        error ? 
            <div className='products-by-category'>
                <h2 style={{textAlign: 'center', marginBottom: '3rem'}}>There're currently no products in this category</h2>
                <button style={{cursor: 'pointer'}} onClick={() => history.push('/')}>&#8592; Go Home</button>
            </div> :
        loading
        ?
        <Loader />
        :
        <div className='products-by-category'>

            <Message shown={messageShown} text={messageText}></Message> 

            <h2>What we have in {currentCategory.name}: </h2>

            <div className="products-by-category-cards">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} showMessage={showMessage}/>
                ))}
            </div>
            
            <div className="buttons-container">
                <button style={{cursor: 'pointer'}} onClick={() => history.push('/')}>&#8592; Go Home</button>
                <button style={{cursor: 'pointer'}} onClick={() => history.push('/cart')}>Go to Cart &#128722;</button>
            </div>

        </div>
    )
}

export default ProductsByCategoryScreen
