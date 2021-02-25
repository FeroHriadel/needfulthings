import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCategoriesReducer } from './reducers/categoryReducers';
import { getProductsByCategoryReducer, getProductByIdReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';




const reducer = combineReducers({
    categoriesList: getCategoriesReducer,
    productsByCategory: getProductsByCategoryReducer,
    productById: getProductByIdReducer,
    cart: cartReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;