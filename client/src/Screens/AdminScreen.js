import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { getProducts, deleteProduct } from '../actions/productActions';
import './AdminScreen.css';
import Loader from '../Components/Loader';
import ShowCategoryImg from '../Components/ShowCategoryImg';
import Modal from '../Components/Modal';
import Message from '../Components/Message';




const AdminScreen = ({ history }) => {
    //REDIRECT NON-ADMINS
    //get user from state => useEffect redirects non-Admins
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;



    //MESSAGE
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('Category updated');
    const [messageWasShown, setMessageWasShown] = useState(true);
 
    const showMessage = () => {
        if (messageWasShown) {
            return
        }
            setErrorShown(true);
            setTimeout(() => {
                setErrorShown(false);
            }, 2500)
    }
    



    //MODAL
    const [modalShown, setModalShown] = useState(false);
    const [modalText, setModalText] = useState('Are you sure?');



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
                                    
                                    <button className='add-category-btn' onClick={() => history.push('/admin/addCategory')}>+ Add New Category</button>

                                    <div className="categories-table">
                                        {categories.map((category, index) => (
                                            <div className="row" key={category._id}>
                                                
                                                <div className="category-img">
                                                    <ShowCategoryImg category={category} />
                                                </div>

                                                <div className="category-details">
                                                    <span>{category.name}</span>
                                                    <div className="category-details-buttons">
                                                        <span className='edit-category-btn' title='edit category' onClick={() => {
                                                            dispatch({type: 'CLEAR_UPDATED_CATEGORY'}); //clear previosly updated category from state.updatedCategory
                                                            history.push(`/admin/editCategory/${category._id}`)
                                                        }
                                                    }>&#9998;</span>
                                                        <span className='delete-category-btn' title='delete category'>&#128465;</span>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
    )
    


    //PRODUCTS
    //component state => products shown?
    const [productsShown, setProductsShown] = useState(false);

    //get products from state
    const getAllProductsReducer = useSelector(state => state.getAllProducts);
    const { loading: loadingProducts, error: productsError, products } = getAllProductsReducer;

    //deleteProduct state
    const deleteProductReducer = useSelector(state => state.deleteProduct);
    const { deleteProductLoading, deleteProductMessage, deleteProductError } = deleteProductReducer;

    //get {categoryId: categoryName} key:value pairs from state.categories & state.products for showProducts() _id to name conversion
    let categoryIDsAndNames = {}; //will be: {categoryId1: categoryName1, categoryId2: categoryName2, ...}
    
    if (products) {
        products.forEach(product => categoryIDsAndNames[product.category] = 'placeholder'); //returns {categoryId: 'placeholder', ...}
    }

    if (categories) {
        for (let key in categoryIDsAndNames) {
            categories.forEach(category => {
                if (category._id == key) {
                    categoryIDsAndNames[key] = category.name // returns {categoryId: categoryName, ...}
                }
            })
        }
    }

    //delete product
    const [deleteProductId, setDeleteProductId] = useState('');

    const confirmDelete = () => {
        setModalShown(true);
    }

    const closeModal = () => {
        setModalShown(false);
    }

    const deleteProductFunction = () => {
        setMessageWasShown(false);
        dispatch(deleteProduct(deleteProductId));
    }
    
    //render products
    const showProducts = () => (
        loadingProducts ?
            <Loader />
                : productsError ?
                    <h3 style={{color: 'rgb(114, 39, 39)'}}>Products loading failed. Try reloading this page.</h3>
                        : 
                            <fieldset className='products-display'>
                                <legend>Products</legend>

                                <button className='add-product-btn' onClick={() => history.push('/admin/addProduct')}>+ Add New Product</button>

                                <p style={{marginTop: '1.5rem'}}>Click product to edit/get more details</p>

                                <div className="products-table">
                                    <div className="products-table-header">
                                        <h4>Name</h4>
                                        <h4>In Stock</h4>
                                        <h4>Price</h4>
                                        <h4>Category</h4>
                                    </div>

                                    {products.map(product => (
                                        <div className="product-row" key={product._id}>
                                            <p onClick={() => history.push(`/admin/editProduct/${product._id}`)} style={{cursor: 'pointer'}} title='Edit product'>{product.name}</p> 
                                            <p onClick={() => history.push(`/admin/editProduct/${product._id}`)} style={{cursor: 'pointer'}} title='Edit product'>{product.inStock}</p>
                                            <p onClick={() => history.push(`/admin/editProduct/${product._id}`)} style={{cursor: 'pointer'}} title='Edit product'>${product.price}</p>
                                            <p onClick={() => history.push(`/admin/editProduct/${product._id}`)} style={{cursor: 'pointer'}} title='Edit product'>{categoryIDsAndNames[product.category]}</p>
                                            <p 
                                                className='delete-product-btn' 
                                                title='Delete product' 
                                                onClick={() => {
                                                    setDeleteProductId(product._id);
                                                    confirmDelete();
                                                }
                                        }>&#128465;</p>
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

        //get products and categories so showProducts() can convert category id to category name
        // dispatch(getCategories());
        // dispatch(getProducts());

        //get categories call onEditCategories click
        if (categoriesShown) {
            dispatch(getCategories())
        }

        //get products call
        if (productsShown) {
            dispatch(getProducts());
            dispatch(getCategories());
        }

        //listen for deleteProduct error
        if (deleteProductError) {
            setErrorText(deleteProductError.error || deleteProductError);
            showMessage();
            setMessageWasShown(true);
        }

        //listen for deleteProduct success
        if (deleteProductMessage) {
            setErrorText('Product removed');
            showMessage();
            setMessageWasShown(true);
        }


    }, [userDetails, deleteProductError, deleteProductMessage, categoriesShown, productsShown]);

// [userDetails, dispatch, categoriesShown, productsShown, deleteProductError, deleteProductMessage]

    return (
        <div className='admin-screen'>

            <Message shown={errorShown} text={errorText}></Message> 

            <Modal 
                modalShown={modalShown} 
                modalText={modalText} 
                closeFunction={closeModal} 
                actionFunction={deleteProductFunction} 
             />

            <h2>Admin Screen</h2>
            
            <div className="admin-screen-buttons">
                <button className='categories-btn' onClick={() => setCategoriesShown(!categoriesShown)}>Manage Categories</button>
                <button className='products-btn' onClick={() => setProductsShown(!productsShown)}>Manage Products</button>
                <button className='orders-btn'>Manage Orders</button>
                <button className='users-btn'>Manage Users</button>
            </div>

            {categories && categoriesShown ? showCategories() : null}

            {products && productsShown ? showProducts() : null}

        </div>

    )
}

export default AdminScreen
