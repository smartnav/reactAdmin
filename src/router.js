import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import BasicLayout from './layout/BasicLayout';
import AppLogin from './layout/login'
import AppRegister from './layout/register'
import AppReset from './layout/reset'

function hasLogin(){
		let token = localStorage.getItem('token');
		if(token){
			return true;
		}
		else{ return false }
	}
	
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      hasLogin() ? (<Component {...props} />) : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
    }
  />
);


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/login' component={AppLogin} />		
        <Route exact path='/register' component={AppRegister} />
        <Route exact path='/reset/:token' component={AppReset} />
        <PrivateRoute path='/' component={BasicLayout} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
