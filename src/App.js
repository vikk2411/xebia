import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SearchPage from './pages/Search'
import LoginPage from './pages/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/search" component={SearchPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
