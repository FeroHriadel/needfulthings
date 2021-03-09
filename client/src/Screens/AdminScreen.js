import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import './AdminScreen.css';
import SmallLoader from '../Components/SmallLoader';
import Loader from '../Components/Loader';
import ShowCategoryImg from '../Components/ShowCategoryImg';




const AdminScreen = ({ history }) => {
    //REDIRECT NON-ADMINS
    //get user from state => useEffect redirects non-Admins
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;



    //CATEGORIES
    //component state => categories shown?
    const [categoriesShown, setCategoriesShown] = useState(false)

    //get categories from state
    const categoriesList = useSelector(state => state.categoriesList);
    const { loading: loadingCategories, error: getCategoriesError, categories } = categoriesList;

    //render categories
    const showCategories = () => (
            loadingCategories ? 
                <Loader />
                    :
                    getCategoriesError ? 
                        <h3 style={{color: 'rgb(114, 39, 39)'}}>Categories loading failed. Try reloading this page.</h3>
                            :
                                <fieldset className="categories-display">
                                    <legend>Categories</legend>
                                    
                                    <button className='add-category-btn' onClick={() => history.push('/admin/addCategory')}>Add New Category</button>

                                    <div className="categories-table">
                                        {categories.map((category, index) => (
                                            <div className="row" key={category._id}>
                                                
                                                <div className="category-img">
                                                    <ShowCategoryImg category={category} />
                                                </div>

                                                <div className="category-details">
                                                    <span>{category.name}</span>
                                                    <div className="category-details-buttons">
                                                        <span className='edit-category-btn' title='edit category' onClick={() => history.push(`/admin/editCategory/${category._id}`)}>&#9998;</span>
                                                        <span className='delete-category-btn' title='delete category'>&#128465;</span>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
    )
    


    useEffect(() => {
        //redirect non-admin users away
        if (!userDetails.isAdmin) {
            history.push('/')
        }

        //get categories call
        if (categoriesShown) {
            dispatch(getCategories())
        }

    }, [userDetails, dispatch, categoriesShown]);



    return (
        <div className='admin-screen'>
            <h2>Admin Screen</h2>
            
            <div className="admin-screen-buttons">
                <button className='categories-btn' onClick={() => setCategoriesShown(!categoriesShown)}>Manage Categories</button>
                <button className='products-btn'>Manage Products</button>
                <button className='orders-btn'>Manage Orders</button>
                <button className='users-btn'>Manage Users</button>
            </div>

            {categoriesShown ? showCategories() : null}

        </div>

    )
}

export default AdminScreen
