import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCategory } from '../actions/categoryActions';
import './AddCategoryScreen.css';
import Loader from '../Components/Loader';
import Message from '../Components/Message';



const AddCategoryScreen = ({ history, location }) => {
    //REDIRECT NON-ADMINS AWAY
    //get user from state => useEffect will redirect non-admins away
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;

    

    //GET CREATED CATEGORY
    const createCategoryReducer = useSelector(state => state.createCategory);
    const { loading, error, createdCategory} = createCategoryReducer;
    


    //MESSAGE STATE
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('Category Created');

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }



    //FORM
    const [values, setValues] = useState({name: '', formData: new FormData()}); //FormData() 'cos of the image => it's not send as json but as form data
    const { name, formData } = values;

    //form fields change handler (.sets formData as we're sending an image which is not json like standard input:text forms)
    const changeHandler = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    }

    //submit
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCategory(formData));
        setValues({name: '', formData: new FormData()});
        setErrorText('Category created');
        showMessage();
    }

    //form html
    const showAddCategoryForm = () => (
        <form className='add-category-form' onSubmit={submitHandler}>

            <h2>Add Category</h2>

            <div className="form-group">
                <label>Category Name: </label>
                <input type="text" name='name' value={name} required onChange={changeHandler('name')} placeholder='Category Name'/>
            </div>

            <div className="form-group">
                <label>Category Picture: </label>
                <input type="file" name="image" accept='image/*' required onChange={changeHandler('image')}/>
            </div>

            <div className="form-group">
            <button type="submit">Create Category</button>
            </div>

        </form>
    )



    useEffect(() => {
        //redirect non-admin users away
        if (!userDetails.isAdmin) {
            history.push('/')
        }

        //listen for error/success
        if (error) {
            setErrorText(error.error);
        } else {
            setErrorText('Category created')
        }
    }, [userDetails, history, error]);
    


    return (

        <div className='add-category-screen'>
            <Message shown={errorShown} text={errorText}></Message> 

            {showAddCategoryForm()}

            {loading && <Loader /> }
        </div>
    )
}

export default AddCategoryScreen
