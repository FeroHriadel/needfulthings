import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { Container } from 'react-bootstrap';



const HomeScreen = () => {
    //get categories:
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoriesList);
    const { loading, error, categories } = categoriesList;

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);



    //render functions
    const showCategories = () => (
        <React.Fragment>
            {categories.map(category => (
                <p key={category._id} category={category}>{category.name}</p>
            ))}
        </React.Fragment>
    );



    return (
        <React.Fragment>

                <h1 className='text-center'>Welcome to Needful Things!</h1>
                <p className='text-center mb-3'>We love meeting you in person but if you can't drop by we're more than delighted to ship your heart's desire</p>

                {showCategories()}

        </React.Fragment>
    )
}

export default HomeScreen
