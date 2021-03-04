import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCategoriesReducer } from './reducers/categoryReducers';
import { getProductsByCategoryReducer, getProductByIdReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer } from './reducers/userReducers';
import { orderCreateReducer } from './reducers/orderReducers';




const reducer = combineReducers({
    categoriesList: getCategoriesReducer,
    productsByCategory: getProductsByCategoryReducer,
    productById: getProductByIdReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    orderCreate: orderCreateReducer
});

const cartItemsFromLS = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userDetailsFromLS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : {};

const initialState = {
    cart: {cartItems: cartItemsFromLS, address: {}}, 
    userSignin: {userDetails: userDetailsFromLS}
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;