import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCategoriesReducer, createCategoryReducer, getCategoryReducer, updateCategoryReducer, deleteCategoryReducer } from './reducers/categoryReducers';
import { getProductsByCategoryReducer, getProductByIdReducer, getProductsReducer, updateProductReducer, addProductReducer, deleteProductReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer, getUsersReducer, getUserByIdReducer, changeUserRoleReducer, deleteUserReducer } from './reducers/userReducers';
import { orderCreateReducer, orderReducer, getAllOrdersReducer, updateOrderReducer, deleteOrderReducer } from './reducers/orderReducers';




const reducer = combineReducers({
    categoriesList: getCategoriesReducer,
    createCategory: createCategoryReducer,
    category: getCategoryReducer,
    updatedCategory: updateCategoryReducer,
    deleteCategory: deleteCategoryReducer, 
    productsByCategory: getProductsByCategoryReducer,
    productById: getProductByIdReducer,
    getAllProducts: getProductsReducer,
    updatedProduct: updateProductReducer,
    addProduct: addProductReducer,
    deleteProduct: deleteProductReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    getUsers: getUsersReducer,
    userById: getUserByIdReducer,
    changeUserRole: changeUserRoleReducer,
    deleteUserReducer: deleteUserReducer,
    orderCreate: orderCreateReducer,
    order: orderReducer,
    getAllOrders: getAllOrdersReducer,
    updatedOrder: updateOrderReducer,
    deleteOrderReducer: deleteOrderReducer
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