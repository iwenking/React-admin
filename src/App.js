import React from 'react';
import {BrowserRouter,Route, Router,Switch} from 'react-router-dom';
import './App.less';
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/admin' component={Admin}></Route>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
