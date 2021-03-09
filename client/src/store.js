import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCategoriesReducer, createCategoryReducer, getCategoryReducer, updateCategoryReducer } from './reducers/categoryReducers';
import { getProductsByCategoryReducer, getProductByIdReducer, getProductsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer } from './reducers/userReducers';
import { orderCreateReducer, orderReducer } from './reducers/orderReducers';




const reducer = combineReducers({
    categoriesList: getCategoriesReducer,
    createCategory: createCategoryReducer,
    category: getCategoryReducer,
    updatedCategory: updateCategoryReducer,
    productsByCategory: getProductsByCategoryReducer,
    productById: getProductByIdReducer,
    getAllProducts: getProductsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    orderCreate: orderCreateReducer,
    order: orderReducer
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