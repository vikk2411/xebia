import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SearchPage from './pages/Search'
import LoginPage from './pages/Login'

const App = () => {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/search" component={SearchPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
}

export default App;
