import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { addProduct } from '../actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import './AddProductScreen.css';



const AddProductScreen = ({ history }) => {
    //REDIRECT NON-ADMINS AWAY
    //get user from state => useEffect redirects non-Admins
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;



    //CATEGORIES
    //getCategories call
    const categoriesListReducer = useSelector(state => state.categoriesList);
    const { categories, error: getCategoriesError, loading: getCategoriesLoading } = categoriesListReducer;

    //categories html <select>
    const categoriesSelect = () => (
        getCategoriesLoading ?
            <Loader />
                : getCategoriesError ?
                    <h2 style={{color: '#333', textAlign: "center"}}>Error fetching categories.</h2>
                        : <select>
                        
                        </select>
    )



    //FORM
    //form values
    const [values, setValues] = useState({
        name: '',
        sold: '',
        inStock: '',
        price: '',
        description: '',
        category: '',
        formData: new FormData()
    });

    const { name, sold, inStock, price, description, category, formData } = values;

    //change handler
    const changeHandler = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    }

    //submit handler
    const submitHandler = e => {
        e.preventDefault();
        dispatch(addProduct(formData));
        setValues({
            name: '',
            sold: '',
            inStock: '',
            price: '',
            description: '',
            category: '',
            formData: new FormData()
        });
        setErrorText('Product created');
        showMessage();
    }



    //CREATED PRODUCT
    const addProductReducer = useSelector(state => state.addProduct);
    const { product, loading, error } = addProductReducer;



    //MESSAGE
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('Category updated');

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }




    useEffect(() => {
        //redirect non-admin users away
        if (!userDetails.isAdmin) {
            history.push('/')
        }

        //get categories
        dispatch(getCategories());

        //listen for addProduct error
        if (error) {
            setErrorText(error.error || error);
            showMessage();
        } else {
            setErrorText('Product created')
        }

    }, [userDetails, error]);


    return (
        <div className='add-product-screen'>

            <Message shown={errorShown} text={errorText}></Message> 

            <button className='go-back-btn' onClick={() => history.push('/admin')}>&#8592; Go Back</button>

            {getCategoriesLoading ?
                <Loader />
                    : getCategoriesError ?
                        <h2 style={{color: '#333', textAlign: "center"}}>Error fetching categories.</h2>
                            : <form onSubmit={submitHandler}>
                                
                                <h2>Add Product</h2>
                                <small>fileds marked * are required</small>
                                
                                <div className="form-group">
                                    <label htmlFor="name">*Product Name:</label>
                                    <input type="text" name='name' value={name} onChange={changeHandler('name')} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">*Product Picture:</label>
                                    <input type="file" name="image" accept='image/*' required onChange={changeHandler('image')}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="sold">How many pieces have already been sold?</label>
                                    <input type="number" name='sold' value={sold} onChange={changeHandler('sold')} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inStock">*How many pieces are in stock?</label>
                                    <input type="number" name='inStock' value={inStock} onChange={changeHandler('inStock')} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">*Product Price:</label>
                                    <input type="number" name='price' value={price} onChange={changeHandler('price')} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">*Product Description: </label>
                                    <textarea name='description' value={description} onChange={changeHandler('description')} required></textarea>
                                </div>

                                <div className="form-group">
                                <label htmlFor="category">*Product Category:</label>
                                <small>Product cannot be added unless at least one category exists</small>
                                    <select name="category" value={category} onChange={changeHandler('category')} required>
                                        <option value='' disabled>Select a category</option>
                                        {categories.map(category => (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <button type='submit'>Add Product</button>
                                </div>

                            </form>
            }

        </div>
    )
}

export default AddProductScreen
