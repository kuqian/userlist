import React, { Component } from 'react';
import UsersPage from './containers/UsersPage';
import CreatePage from './containers/CreatePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/'
            exact={true}
            render={() => {
              return(
                <UsersPage/>
              );
            }}
          />
          <Route
            path='/create'
            exact={true}
            component={CreatePage}
          />
        </Switch>
      </BrowserRouter>
    );
  }

}
export default App;
