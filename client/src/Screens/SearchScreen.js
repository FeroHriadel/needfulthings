import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { searchProducts } from '../actions/productActions';
import Loader from '../Components/Loader';



const SearchScreen = () => {
    //CATEGORIES
    //needed for category <select>
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoriesList);
    const { categories, loading, error } = categoriesList;



    //FORM
    //form state
    const [filters, setFilters] = useState({
        keyword: '',
        category: '',
        price: '0&1000000' //price range => [min, max]
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
                    <option value='' >Search in Category...</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <span>Price Range: </span>
                <input type="radio" name="price" value='0and1000000' onChange={changeHandler} checked /> any
                <input type="radio" name="price" value='0and25' onChange={changeHandler}/> affordable
                <input type="radio" name="price" value='26and100' onChange={changeHandler}/> reasonable
                <input type="radio" name="price" value='101and1000000' onChange={changeHandler}/> connoisseurs
            </div>
        </form>
    )



    //USE EFFECT
    useEffect(() => {
        dispatch(getCategories())
    }, [])



    return (
        <div className='search-screen'>
            {loading ?
                <Loader /> :
                    error ? 
                        <h2>No categories found</h2> :
                            showForm()
            }
        </div>
    )
}

export default SearchScreen
