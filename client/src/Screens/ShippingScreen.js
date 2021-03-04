import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../actions/cartActions';
import './ShippingScreen.css';
import Message from '../Components/Message';



const ShippingScreen = ({ history }) => {
    //redirect to '/signin' if user not signed in
    const userSignin = useSelector(state => state.userSignin);
    const { userDetails } = userSignin;
    
    useEffect(() => {
        if (!userDetails._id) {
            history.push('/signin?redirect=/shipping');
        }
    }, [userDetails]);



    //error handling (Message)
    const [errorShown, setErrorShown] = useState(false);
    const [errorText, setErrorText] = useState('Please fill in all address fields');

    const showMessage = () => {
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 2500)
    }



    //shipping options radio buttons
    const [shipping, setShipping] = useState('pickup');
    const [showShippingTerms, setShowShippingTerms] = useState(false);

    const changeHandler = (e) => {
        setShipping(e.target.value);
    }

    const shippingTermsToggle = () => {
        setShowShippingTerms(!showShippingTerms);
    }

    const shippingOptions = () => (
        <div className='shipping-options'>

            <h2>Please pick a delivery option: </h2>

            <div className="input-group">
                <input type="radio" name="shipping" value='ship' checked={shipping === 'ship'} onChange={changeHandler}/>
                <label>We ship <span className='shipping-terms-btn' onClick={shippingTermsToggle}> shipping terms</span></label>
            </div>

            <div className="input-group">
                <input type="radio" name="shipping" value='pickup' checked={shipping === 'pickup'} onChange={changeHandler}/>
                <label>You pickup</label>
            </div>

            {showShippingTerms && <p className='shipping-terms-box'>Shipping: $30, purchases over $99: free</p>}

        </div>
    )



    //address form
    const [address, setAddress] = useState({
        name: '',
        street: '',
        city: '',
        zip: '',
        country: ''
    })

    const { name, street, city, zip, country } = address;

    const addressHandler = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    }

    const formCollapser = () => {
        if (shipping === 'ship') {
            return {height: '350px', opacity: '1', transition: '0.4s linear', overflow: 'hidden'}
        } else {
            return {height: '0px', opacity: '0', transition: '0.4s linear', overflow: 'hidden'}
        }
    }

    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        if (name && street && city && zip && country) {
            dispatch(saveAddress({...address, shipping: 'ship'}));
            setErrorText(`Thank you! We'll ship to your address`);
            showMessage();
            history.push(`/order?shipping=${shipping}`)
        } else {
            setErrorText('Please fill in all address fields');
            showMessage();
        }
    }

    const addressForm = () => (

        <div className="address-form-container" style={formCollapser()}>

            <h2>Please fill in your address: </h2>

            <form onSubmit={submitHandler}>

                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" name='name' value={name} onChange={addressHandler} placeholder='Name'/>
                </div>

                <div className="form-group">
                    <label>Street: </label>
                    <input type="text" name='street' value={street} onChange={addressHandler} placeholder='Street'/>
                </div>

                <div className="form-group">
                    <label>City: </label>
                    <input type="text" name='city' value={city} onChange={addressHandler} placeholder='City'/>
                </div>

                <div className="form-group">
                    <label>Postal Code: </label>
                    <input type="text" name='zip' value={zip} onChange={addressHandler} placeholder='Postal Code'/>
                </div>

                <div className="form-group">
                    <label>Country: </label>
                    <input type="text" name='country' value={country} onChange={addressHandler} placeholder='Country'/>
                </div>

                <div className="form-group">
                    <button type='submit'>Ship to the above Address</button>
                </div>

            </form>
        </div>
    )



    return (
        <div className='shipping-screen'>

            <Message shown={errorShown} text={errorText}></Message> 

            {shippingOptions()}

            {addressForm()}

            {shipping === 'pickup' && 
                <button 
                    onClick={() => {
                        dispatch(saveAddress({name: userDetails.name, shipping: 'pickup'}));
                        history.push(`/order?shipping=${shipping}`);
                }}>
                    Continue &#8594;
                </button>
            }

        </div>
    )
}

export default ShippingScreen
