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
import CheckoutScreen from './Screens/CheckoutScreen';



const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/ProductsByCategory/:categoryId' component={ProductsByCategoryScreen} />
        <Route exact path='/ProductDetails/:productId' component={ProductDetailsScreen} />
        <Route exact path='/cart' component={CartScreen} />
        <Route path='/signup' component={SignUpScreen} />
        <Route path='/signin' component={SigninScreen} />
        <Route exact path='/checkout' component={CheckoutScreen} />
      </Switch>
    </Router>
  )
}

export default App;
