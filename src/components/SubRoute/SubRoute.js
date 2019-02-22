import React, { Component } from 'react';
import {Route } from 'react-router-dom';
import Dashboard from '../../template/dashboard';
import Userlist from '../../template/userlist'
import Setting from '../../template/setting';
	

class SubRoute extends Component {	
	render() {
	//const {match} = this.props;
		return (
			<div> 
				<Route exact path={`/`} component = {Dashboard}/>
				<Route exact path={`/users`} component={Userlist}/> 
				<Route exact path={`/setting`} component={Setting}/>
			</div>
		);
   }
} 

export default SubRoute;
