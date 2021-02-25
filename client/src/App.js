import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomeScreen from './Screens/HomeScreen';
import ProductsByCategoryScreen from './Screens/ProductsByCategoryScreen';
import ProductDetailsScreen from './Screens/ProductDetailsScreen';



const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/ProductsByCategory/:categoryId' component={ProductsByCategoryScreen} />
        <Route exact path='/ProductDetails/:productId' component={ProductDetailsScreen} />
      </Switch>
    </Router>
  )
}

export default App;
