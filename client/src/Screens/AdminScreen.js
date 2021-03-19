import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../actions/categoryActions';
import { getProducts, deleteProduct } from '../actions/productActions';
import { getOrders } from '../actions/orderActions';
import { getUsers } from '../actions/userActions';
import './AdminScreen.css';
import Loader from '../Components/Loader';
import ShowCategoryImg from '../Components/ShowCategoryImg';
import Modal from '../Components/Modal';
import Message from '../Components/Message';



const AdminScreen = ({ history }) => {
    //REDIRECT NON-ADMINS
    //get user from state => useEffect redirects non-Admins away
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
    const [modalActionFunction, setModalActionFunction] = useState('delete category');



    //CATEGORIES
    //component state => categories shown?
    const [categoriesShown, setCategoriesShown] = useState(false)

    //get categories from state
    const categoriesList = useSelector(state => state.categoriesList);
    const { loading: loadingCategories, error: getCategoriesError, categories } = categoriesList;

    //get category delete result from state
    const deleteCategoryReducer = useSelector(state => state.deleteCategory);
    const { deleteCategoryLoading, deleteCategoryMessage, deleteCategoryError} = deleteCategoryReducer;

    //delete category
    const [deletedCategoryId, setDeletedCategoryId] = useState('');

    const deleteCategoryFunction = () => {
        setMessageWasShown(false);
        dispatch(deleteCategory(deletedCategoryId));
    }
    
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
                                                        <span 
                                                            className='edit-category-btn' 
                                                            title='edit category' 
                                                            onClick={() => {
                                                                dispatch({type: 'CLEAR_UPDATED_CATEGORY'}); //clear previosly updated category from state.updatedCategory
                                                                history.push(`/admin/editCategory/${category._id}`)
                                                            }
                                                        }>&#9998;</span>
                                                        <span 
                                                            className='delete-category-btn' 
                                                            title='delete category'
                                                            onClick={() => {
                                                                setDeletedCategoryId(category._id);
                                                                setModalActionFunction('delete category');
                                                                setModalText('This will also delete all products inside the category. Ok?');
                                                                confirmDelete();
                                                            }}
                                                            >&#128465;</span>
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
                                                    setModalActionFunction('delete product');
                                                    setModalText('Are you sure?');
                                                    confirmDelete();
                                                }
                                        }>&#128465;</p>
                                        </div>
                                    ))}
                                </div>

                            </fieldset>
    )



    //ORDERS
    //get all orders state
    const getAllOrdersReducer = useSelector(state => state.getAllOrders);
    const { getOrdersLoading, orders, getOrdersError } = getAllOrdersReducer;

    //is Order Screen shown?
    const [ordersShown, setOrdersShown] = useState(false);

    //order search input 
    const [searchShown, setSearchShown] = useState(false);
    const [orderSearchTxt, setOrderSearchTxt] = useState('');

    const orderSearchChangeHandler = (e) => {
        setOrderSearchTxt(e.target.value);
    }

    const orderSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            history.push(`/admin/editOrder/${orderSearchTxt}`);
            setOrderSearchTxt('')
        }
    }

    //render orders
    const showOrders = () => (
        getOrdersLoading ?
            <Loader />
                : getOrdersError ?
                    <h3 style={{color: 'rgb(114, 39, 39)'}}>Orders loading failed. Try reloading this page.</h3>
                    :
                    <fieldset className='orders-display'>
                        <legend>Orders</legend>

                        <div className="otj-search-widget-wrap">
                            <input 
                                type="search" 
                                placeholder="Type order ID & hit Enter" 
                                className={searchShown ? 'otj-search-widget-input show' : 'otj-search-widget-input'} 
                                onChange={orderSearchChangeHandler}
                                onKeyDown={orderSearchSubmit}
                                value={orderSearchTxt}
                                name='orderSearch'
                            />
                            <button type="button" className="otj-search-widget-button" onClick={() => setSearchShown(!searchShown)}>
                                &#128269;
                            </button>
                        </div>

                        <div className="orders-table">

                            <p>Click order to edit/get more details</p>

                            <div className="orders-table-header">
                                <h4>Name</h4>
                                <h4>Shipping Type</h4>
                                <h4>Total Price</h4>
                                <h4>Is Paid?</h4>
                                <h4>Is Delivered?</h4>
                            </div>

                            {orders.map(order => (
                                <div className="orders-table-row" key={order._id} onClick={() => history.push(`/admin/editOrder/${order._id}`)}>
                                    <p>{order.address.name}</p>
                                    <p>{order.address.shipping}</p>
                                    <p>${order.totalPrice}</p>
                                    {order.isPaid === true ? <p style={{color: 'green'}}>&#10004;</p> : <p style={{color: 'rgb(114, 39, 39)', fontSize: '1.5rem', lineHeight: '1rem'}}>&times;</p>}
                                    {order.isDelivered === true ? <p style={{color: 'green'}}>&#10004;</p> : <p style={{color: 'rgb(114, 39, 39)', fontSize: '1.5rem', lineHeight: '1rem'}}>&times;</p>}
                                </div>
                            ))}

                        </div>

                    </fieldset>
    )



    //USERS
    //getUsers state
    const getUsersReducer = useSelector(state => state.getUsers);
    const { getUsersLoading, users, getUsersError } = getUsersReducer;

    //is users screen shown?
    const [usersShown, setUsersShown] = useState(false);

    //render users
    const showUsers = () => (
        getUsersLoading ?
            <Loader /> :
                getUsersError ?
                    <h3 style={{color: 'rgb(114, 39, 39)'}}>Users loading failed. Try reloading this page.</h3>
                    :
                    <fieldset className="users-display">
                        <legend>Users</legend>

                        <div className="users-table">

                            <p>Click user to edit</p>

                            <div className="users-table-header">
                                <h4>Name</h4>
                                <h4>Email</h4>
                                <h4>isAdmin?</h4>
                            </div>

                            {users.map(user => (
                                <div className="users-table-row" key={user._id} onClick={() => {
                                    history.push(`/admin/editUser/${user._id}`)
                                }}>
                                    <p>{user.name}</p>
                                    <p>{user.email}</p>
                                    {user.isAdmin ? <p style={{color: 'green'}}>&#10004;</p> : <p style={{color: 'rgb(114, 39, 39)', fontSize: '1.5rem', lineHeight: '1rem'}}>&times;</p>}
                                </div>
                            ))}
                        </div>
                    
                    </fieldset>
    )




    //USE EFFECT
    useEffect(() => {
        //redirect non-admin users away
        if (!userDetails.isAdmin) {
            history.push('/')
        }

        //load categories on btn click
        if (categoriesShown) {
            dispatch(getCategories())
        }

        //load products on btn click
        if (productsShown) {
            dispatch(getProducts());
            dispatch(getCategories());
        }

        //load orders on btn click
        if (ordersShown) {
            dispatch(getOrders());
        }

        //load users on btn click
        if (usersShown) {
            dispatch(getUsers())
        }

        //listen for deleteProduct error
        if (deleteProductError) {
            setErrorText(deleteProductError.error || deleteProductError);
            showMessage();
            setMessageWasShown(true); //this is here so old message doesn't pop up on re-render
        }

        //listen for deleteProduct success
        if (deleteProductMessage) {
            setErrorText('Product removed');
            showMessage();
            setMessageWasShown(true); //this is here so old message doesn't pop up on re-render
        }

        //listen for deleteCategory success
        if (deleteCategoryMessage) {
            setErrorText('Category deleted');
            showMessage();
            setMessageWasShown(true); //this is here so old message doesn't pop up on re-render
        }

        //listen for deleteCategory error
        if (deleteCategoryError) {
            setErrorText(deleteCategoryError.error || deleteCategoryError);
            showMessage();
            setMessageWasShown(true); //this is here so old message doesn't pop up on re-render
        }

        //clear updatedOrder & order
        // (this page doesn't deal with those but it clears state if user comes here from EditOrderScreen)
        // dispatch({type: 'CLEAR_ORDER'});
        // dispatch({type: 'CLEAR_UPDATED_ORDER'}); 

    }, [userDetails, deleteProductError, deleteProductMessage, categoriesShown, productsShown, ordersShown, usersShown, deleteCategoryError, deleteCategoryMessage]);

    
/*
            <div className="admin-screen-buttons">
                <button className='categories-btn' onClick={() => setCategoriesShown(!categoriesShown)}>Manage Categories</button>
                <button className='products-btn' onClick={() => setProductsShown(!productsShown)}>Manage Products</button>
                <button className='orders-btn' onClick={() => setOrdersShown(!ordersShown)}>Manage Orders</button>
                <button className='users-btn' onClick={() => setUsersShown(!usersShown)}>Manage Users</button>
            </div>
*/




    return (
        <div className='admin-screen'>

            <Message shown={errorShown} text={errorText}></Message> 

            <Modal 
                modalShown={modalShown} 
                modalText={modalText} 
                closeFunction={closeModal} 
                actionFunction={modalActionFunction === 'delete category' ? deleteCategoryFunction : deleteProductFunction} 
             />

            <h2>Admin Screen</h2>
            
            <div className="admin-screen-buttons">
                <button className='categories-btn' onClick={() => {
                    setCategoriesShown(!categoriesShown)
                    setProductsShown(false);
                    setOrdersShown(false);
                    setUsersShown(false)
                }}>Manage Categories</button>
                <button className='products-btn' onClick={() => {
                    setProductsShown(!productsShown);
                    setCategoriesShown(false);
                    setOrdersShown(false);
                    setUsersShown(false)
                }}>Manage Products</button>
                <button className='orders-btn' onClick={() => {
                    setOrdersShown(!ordersShown);
                    setProductsShown(false);
                    setCategoriesShown(false);
                    setUsersShown(false)
                }}>Manage Orders</button>
                <button className='users-btn' onClick={() => {
                    setUsersShown(!usersShown);
                    setProductsShown(false);
                    setOrdersShown(false);
                    setCategoriesShown(false)
                }}>Manage Users</button>
            </div>

            {categories && categoriesShown ? showCategories() : null}

            {products && productsShown ? showProducts() : null}

            {orders && ordersShown ? showOrders() : null}

            {users && usersShown ? showUsers() : null}

        </div>

    )
}

export default AdminScreen
