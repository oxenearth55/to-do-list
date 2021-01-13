import './App.css';
import React from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
// NOTE import redux 
import {Provider} from 'react-redux';
import Store from './Store';
//NOTE import components 
import Menu from './Menu-footer/Menu';
import Home from './main/Home';
import History from './main/History';


const App = () => {
  return (
    <Provider store = {Store}>

    <BrowserRouter>
      <Router>
        <Menu/>

        <Switch>

          <Route exact path='/' component={Home}/>
          <Route exact path='/history' component={History}/>


        </Switch>


      </Router>

    </BrowserRouter>
    </Provider>

  
  );
}

export default App;
