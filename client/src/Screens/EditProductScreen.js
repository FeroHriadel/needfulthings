import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById, updateProduct } from '../actions/productActions';
import Loader from '../Components/Loader';
import './EditProductScreen.css';
import Message from '../Components/Message';



const EditProductScreen = ({ history, match }) => {
    //REDIRECT NON-ADMINS
    //get user from state => useEffect redirects non-Admins
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;

    //GET PRODUCT
    //get product from url params => useEffet will make a call to get it from db
    const productId = match.params.productId;

    //get product from state.product
    const dispatch = useDispatch();
    const productByIdReducer = useSelector(state => state.productById);
    const { error, loading, product } = productByIdReducer;



    //MESSAGE STATE
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('Product updated');

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 4000)
    }



    //UPDATED PRODUCT STATE
    const updatedProductReducer = useSelector(state => state.updatedProduct);
    const { updateProductLoading, updatedProduct, updateProductError } = updatedProductReducer;



    //PRODUCT FORM
    //initial values
    const [values, setValues] = useState({
        name: '',
        sold: '',
        inStock: '',
        price: '',
        description: '',
        formData: new FormData() //because of the picture. All has to be sent in FormData format so backend can process it.
    });

    const { name, sold, inStock, price, description, formData } = values;

    //change handler
    const changeHandler = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    }

    //submit handler
    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateProduct(productId, formData));
        setErrorText('Product updated. Please wait while image loads...');
        showMessage();
        //must reload the page or updated image will not show :(
            setTimeout(() => {
                window.location.reload()
            }, 3000)
    }

    //form html
    const showForm = () => (
        !loading && !error && product &&
        <form onSubmit={submitHandler}>
            <h3>Edit Product</h3>
            <small>Only fill out the fields you'd like to update</small>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' value={name} onChange={changeHandler('name')} />
            </div>

            <div className="form-group">
                <label htmlFor="sold">Sold</label>
                <input type="number" name='sold' value={sold} onChange={changeHandler('sold')} />
            </div>

            <div className="form-group">
                <label htmlFor="inStock">In Stock</label>
                <input type="number" name='inStock' value={inStock} onChange={changeHandler('inStock')} />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number" name='price' value={price} onChange={changeHandler('price')} />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea name='description' value={description} onChange={changeHandler('description')} />
            </div>

            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" name="image" accept='image/*' onChange={changeHandler('image')}/>
            </div>

            <div className="form-group">
                <button type="submit">Edit Product</button>
            </div>

        </form>
    )

    

    useEffect(() => {
        //redirect non-admin users away
        if (!userDetails.isAdmin) {
            history.push('/')
        }

        //get product on page load
          dispatch(getProductById(productId));

        //listen for updateProduct error
        if (updateProductError) {
            setErrorText(updateProductError.error.error || updateProductError.error);
            showMessage();
        }

    }, [userDetails, updateProductError, updatedProduct])

    

    return (
        <div>

            <Message shown={errorShown} text={errorText}></Message> 

            {loading ? 
                <Loader /> 
                    : error ? 
                        <h2 style={{textAlign: 'center'}}>Product was not found</h2>
                            : 
                            <div className='edit-product-screen'>

                                <button className='go-back-btn' onClick={() => history.push('/admin')}>&#8592; Go Back</button>

                                <div className="edit-product-info">                                    
                                    <div className="image-box" style={{
                                        background: `url(/api/products/getImage/${productId}) no-repeat center center/cover`,
                                        width: '260px',
                                        height: '260px',
                                        position: 'absolute',
                                        width: '100%',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        opacity: 0.4
                                    }}>
                                    </div>

                                    <div className="details" style={{
                                        margin: '2rem',
                                        width: '260px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: '1',
                                        zIndex: 2,
                                    }}>
                                        <h1 style={{marginBottom: '1.5rem', textDecoration: 'underline'}}>{product.name}</h1>
                                        <p style={{fontSize: '1.25rem'}}><strong>Price:</strong> ${product.price}</p>
                                        <p style={{fontSize: '1.25rem'}}><strong>Sold:</strong> {product.sold} pcs.</p>
                                        <p style={{fontSize: '1.25rem'}}><strong>In Stock:</strong> {product.inStock} pcs.</p>
                                        <p style={{fontSize: '1.25rem'}}><strong>Description:</strong>{product.description}</p>
                                    </div>
                                </div>



                                <div className="edit-product-form">
                                    {showForm()}
                                </div>

                            </div>       
                }
        </div>
    )
}

export default EditProductScreen;