import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryById } from '../actions/categoryActions';
import './EditCategoryScreen.css';
import Loader from '../Components/Loader';
import Message from '../Components/Message';



const EditCategoryScreen = ({ history, match}) => {
    //REDIRECT NON-ADMINS AWAY
    //get user from state => useEffect will redirect non-admins away
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;



    //GET CATEGORY
    //useEffect get category onComponentMount
    const categoryId = match.params.categoryId;
    const categoryReducer = useSelector(state => state.category);
    const { loading, error, success, category } = categoryReducer;
    


    //MESSAGE STATE
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('Category updated');

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }

    

    //EDIT CATEGORY FORM
    //form state
    const [values, setValues] = useState({
        name: '',
        image: new FormData()
    });
    const { name, formData } = values;
    
    //form fields change handler (.sets formData as we're sending an image which is not json like standard input:text forms)
    const changeHandler = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    }

    //form submit

    
    //form html
    const showEditCategoryForm = () => (
        category && 
        <form className="edit-category-form">
            <h2>Edit Category</h2>
            <p>only fill out the fields you'd like to change</p>

            <div className="form-group">
                <label>Category Name</label>
                <input type="text" name='name' value={name} onChange={changeHandler('name')} placeholder={category.name} />
            </div>

            <div className="form-group">
                <label>Category Image</label>
                <input type="file" name="image" accept='image/*' onChange={changeHandler('image')}/>
            </div>

            <div className="form-group">
                <button type="submit">Update Category</button>
            </div>
        </form>
    )



    useEffect(() => {
        //redirect non-admin users away
        if (!userDetails.isAdmin) {
            history.push('/')
        }

        //get category by id
        dispatch(getCategoryById(categoryId));

        //listen for getCategoryById error
        if (error) {
            setErrorText(error.error || error);
            showMessage();
        } else {
            setErrorText('Category updated')
        }

    }, [userDetails, history, error, success]);


    return (
        <div className='edit-category-screen'>
            <Message shown={errorShown} text={errorText}></Message> 

            {loading && <Loader />}
            
            {showEditCategoryForm()}
        </div>
    )
}



export default EditCategoryScreen;
