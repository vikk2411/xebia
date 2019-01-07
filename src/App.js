import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import SearchPage from './pages/Search'
import LoginPage from './pages/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <header className="App-header">
              <Link className="link" to="/">Sign In</Link>
              <Link className="link" to="/search">Search</Link>
              <Link className="link" to="/Logout">Logout</Link>
            </header>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/search" component={SearchPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
