import React, { Component } from 'react';
import { connect } from 'dva';
import './BasicLayout.less';
import SubRoute from '../components/SubRoute/SubRoute'
import AppSidebar from '../components/Sidebar/AppSidebar'
import AppHeader from '../components/AppHeader/AppHeader'
import { Layout } from 'antd';
const {  Content, Sider } = Layout; //Footer,

class BasicLayout extends Component {
	state = { collapsed: false, broke:false, mobileview:''};
	sidebarFun=()=> this.state.mobileview ? this.props.dispatch({type: 'global/toggle'}) : null;	
	brokenFun = (val)=>{
		this.setState({mobileview:val})
		if(val)
			{if(!this.props.global.toggleval) 
				this.props.dispatch({type: 'global/toggle'})}
		if(!val)
			{if(this.props.global.toggleval)
				this.props.dispatch({type: 'global/toggle'})}
	}
	
	render() {
		const {global} =this.props;
		const toggle = global.toggleval;
		return (
			<Layout>
				<header className="headerdiv">
					<AppHeader/>
				</header>
				<Layout>
					<Sider className="sidebarDiv" width={265} breakpoint="sm" collapsedWidth="0" onBreakpoint={(broken) => this.brokenFun(broken)} collapsed={toggle} onClick={this.sidebarFun}>
						<AppSidebar {...this.props} /> 
					</Sider>
					<Content className="contentDiv">						
						<SubRoute {...this.props} />						
					</Content >
				</Layout>
			</Layout>
		);
   	}
} 
export default connect(({global, loading}) => ({
	global, loading
}))(BasicLayout);