import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomeScreen from './Screens/HomeScreen';
import ProductsByCategoryScreen from './Screens/ProductsByCategoryScreen';
import ProductDetailsScreen from './Screens/ProductDetailsScreen';
import CartScreen from './Screens/CartScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SigninScreen from './Screens/SigninScreen';
import ShippingScreen from './Screens/ShippingScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderConfirmation from './Screens/OrderConfirmation';
import AdminScreen from './Screens/AdminScreen';
import AddCategoryScreen from './Screens/AddCategoryScreen';
import EditCategoryScreen from './Screens/EditCategoryScreen';
import EditProductScreen from './Screens/EditProductScreen';
import AddProductScreen from './Screens/AddProductScreen';
import EditOrderScreen from './Screens/EditOrderScreen';
import EditUserScreen from './Screens/EditUserScreen';
import SearchScreen from './Screens/SearchScreen';



const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/ProductsByCategory/:categoryId' component={ProductsByCategoryScreen} />
        <Route path='/ProductDetails/:productId' component={ProductDetailsScreen} />
        <Route exact path='/cart' component={CartScreen} />
        <Route path='/signup' component={SignUpScreen} />
        <Route path='/signin' component={SigninScreen} />
        <Route exact path='/search' component={SearchScreen} />
        <Route exact path='/shipping' component={ShippingScreen} />
        <Route path='/order' component={OrderScreen} />
        <Route exact path='/orderConfirmation/:orderId' component={OrderConfirmation} />
        <Route exact path='/admin' component={AdminScreen} />
        <Route exact path='/admin/addCategory' component={AddCategoryScreen} />
        <Route exact path='/admin/editCategory/:categoryId' component={EditCategoryScreen} />
        <Route exact path='/admin/editProduct/:productId' component={EditProductScreen} />
        <Route exact path='/admin/addProduct' component={AddProductScreen} />
        <Route path='/admin/editOrder/:orderId' component={EditOrderScreen} />
        <Route exact path='/admin/editUser/:userId' component={EditUserScreen} />
      </Switch>
    </Router>
  )
}

export default App;
