import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import ProductCard from '../Components/ProductCard';
import './ProductsByCategoryScreen.css';



const ProductsByCategoryScreen = ({ match }) => {
    //get products by category
    const categoryId = match.params.categoryId;

    const dispatch = useDispatch();
    const productsByCategory = useSelector(state => state.productsByCategory);
    const { loading, error, products } = productsByCategory;

    useEffect(() => {
        dispatch(getProductsByCategory(categoryId));
    }, [dispatch, categoryId])



    //get current category name
    const categoriesList = useSelector(state => state.categoriesList);
    const { categories } = categoriesList;
    const currentCategory = categories.find(category => category._id === categoryId);



    return (
        <div className='products-by-category'>
            <h2>What we have in {currentCategory.name}: </h2>
            <div className="products-by-category-cards">
                {products.map(product => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default ProductsByCategoryScreen
