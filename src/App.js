import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './services/Auth';
import Index from './components/Index';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import Login from './components/Login';
const auth = new Auth();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={(props) => (
    auth.loggedIn() ? (
      <Component { ...props } {...rest} auth={ auth } />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter >
          <Switch>
            <Route path='/login' render={ (defaultProps) => {
              const { location, history } = defaultProps;

              if (/access_token|id_token|error/.test(location.hash)) {
                auth.parseHash(location.hash, history);
              }
              return <Login {...defaultProps} auth={ auth } />;
            }} />

            <PrivateRoute exact auth={auth} path='/' component={ Index } />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
