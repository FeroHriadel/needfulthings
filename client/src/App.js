import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomeScreen from './Screens/HomeScreen';



const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
      </Switch>
    </Router>
  )
}

export default App;
