import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import ShowCategoryImg from '../Components/ShowCategoryImg';
import './HomeScreen.css';



const HomeScreen = () => {
    //get categories:
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoriesList);
    const { loading, error, categories } = categoriesList;

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);



    //render categories function
    const showCategories = () => (
        categories.map(category => (
            <div key={category._id} className='category-preview'>
                <ShowCategoryImg category={category} />
                <h1>{category.name}</h1>
            </div>
        ))
    )


    return (
        <div className='home-screen'>

            <div className='home-screen-welcome-text'>
                <h1>Welcome to Needful Things!</h1>
                <p>Delighted to ship your heart's desire</p>
            </div>

            <h2>Categories: </h2>
            <div className="categories">
                {showCategories()}
            </div>
                

  
        </div>
    )
}

export default HomeScreen
