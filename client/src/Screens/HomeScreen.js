import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import ShowCategoryImg from '../Components/ShowCategoryImg';
import './HomeScreen.css';
import Loader from '../Components/Loader';



const HomeScreen = ({ history }) => {
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
            <div key={category._id} className='category-preview' onClick={() => history.push(`/productsByCategory/${category._id}`)}>
                <ShowCategoryImg category={category} />
                <h1>{category.name}</h1>
            </div>
        ))
    )


    return (
        <div className='home-screen'>

            {
            error
            ?
            <React.Fragment>
                <h1 className='home-screen-welcome-text'>We haven't set up shop completely yet. There're currently no product categories</h1>
                <p style={{textAlign: 'center'}}>Or there's a server error</p>
            </React.Fragment>
            :
            loading 
                ?
                <Loader />
                    :
                <React.Fragment>
                    <div className='home-screen-welcome-text'>
                        <h1>Welcome to Needful Things!</h1>
                        <p>Delighted to ship your heart's desire</p>
                    </div>

                    <h2>Categories: </h2>
                    <div className="categories">
                        {showCategories()}
                    </div>
                </React.Fragment>
            }              
  
        </div>
    )
}

export default HomeScreen
