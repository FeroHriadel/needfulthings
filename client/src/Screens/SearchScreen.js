import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { searchProducts } from '../actions/productActions';
import Loader from '../Components/Loader';
import ProductCard from '../Components/ProductCard';
import Message from '../Components/Message';
import './SearchScreen.css';



const SearchScreen = () => {
    //CATEGORIES
    //needed for category <select>
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoriesList);
    const { categories, loading, error } = categoriesList;



    //SEARCHED PRODUCTS
    //searched products state
    const searchedProductsReducer = useSelector(state => state.searchedProducts);
    const { searchLoading, searchedProducts, numberOfPages, page, searchError } = searchedProductsReducer;



    //MESSAGE
    const [messageShown, setMessageShown] = useState(false);
    const [messageText, setMessageText] = useState('Item was added to cart');

    const showMessage = () => {
        setMessageShown(true);
        setTimeout(() => {
            setMessageShown(false);
        }, 2500)
    }

 

    //FORM
    //form state
    const [filters, setFilters] = useState({
        keyword: '',
        category: '',
        price: '0and1000000' //price range => [min, max]
    });

    const { keyword, category, price } = filters;

    //changeHandler
    const changeHandler = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    }

    //submitHandler
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(searchProducts(filters))
    }

    //form html
    const showForm = () => (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input type="text" name='keyword' onChange={changeHandler} value={keyword} placeholder='Product name...'/>
                <button type='submit'>Search</button>
            </div>

            <div className="form-group">
                <select name='category' value={category} onChange={changeHandler}>
                    <option value='' >Search all categories</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <span>Price Range: <br /> </span>
                <input type="radio" name="price" value='0and1000000' onChange={changeHandler} checked={price === '0and1000000'} /> any <br />
                <input type="radio" name="price" value='0and25' onChange={changeHandler} checked={price === '0and25'}/> affordable <br />
                <input type="radio" name="price" value='26and100' onChange={changeHandler} checked={price === '26and100'}/> reasonable <br />
                <input type="radio" name="price" value='101and1000000' onChange={changeHandler} checked={price === '101and1000000'}/> connoisseurs <br /> 
            </div>
        </form>
    )



    //searched products html
    const showSearchedProducts = () => (
        <div className="searched-products-container">

            {searchLoading ?
                <p style={{textAlign: 'center'}}>Searching Products...</p>
                    : searchError ?
                        <p style={{textAlign: 'center'}}>No products matching searched criteria found</p>
                            : 
                                <div className="results-container">
                                    <div className="result-cards">
                                        {
                                            searchedProducts.map(product => (
                                                <ProductCard key={product._id} product={product} showMessage={showMessage} redirect='/search' />
                                            ))
                                        }
                                    </div>

                                    <div className="results-pagination">
                                        {
                                            numberOfPages > 1
                                            &&
                                            [...Array(numberOfPages).keys()].map((x, i) => (
                                                <div key={i} className='page-number' onClick={() => {
                                                    dispatch(searchProducts(filters, (x+1)))
                                                }}>
                                                    Page {x+1}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
            }
        </div>
    )



    //USE EFFECT
    useEffect(() => {
        dispatch(getCategories())
    }, [])



    return (
        <div className='search-screen'>

            <Message shown={messageShown} text={messageText}></Message> 

            {loading ?
                <Loader /> :
                    error ? 
                        <h2>Cannot show Search Bar - No categories found. Try reloading the page</h2> :
                            showForm()
            }

            {showSearchedProducts()}

        </div>
    )
}

export default SearchScreen
