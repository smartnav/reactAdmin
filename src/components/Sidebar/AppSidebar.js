import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import './AppSidebar.less'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

const menu = [
	{path:`/`, name:'Dashboard', icon:'dashboard'},	
	{path:`/users`, name:'User List' , icon:'team'},
	{path:`/setting`, name:'Settings' , icon:'setting'}
]

class AppSidebar extends Component {
	render() {
		const {location} = this.props;
		const pathSnippets = location.pathname.split('/').filter(i => i);
		const pathval = pathSnippets[pathSnippets.length - 1]  || '/';		
		
		return (
			<Menu mode="inline" defaultSelectedKeys={[pathval]} defaultOpenKeys={['']} selectedKeys={[pathval]} className="sidemenu"  >
				{menu.map((item) => {
					if (item.children && item.children.some(child => child.name)) {
						return(	<SubMenu className="submenu" key={item.name} title={<span><img src={item.img} alt={item.name}/> {item.name}</span>} >
							{item.children.map((val) => {
								return <Menu.Item key={val.path}><Link to={val.path}>
								{/* <img src={val.img} alt={val.name}/> */}
									{val.name}</Link></Menu.Item>
							})}
						</SubMenu>)
					} else {
					return (<Menu.Item key={item.path}><Link to={item.path}>
					{item.img ? <img src={item.img} alt={item.name}/> : <Icon type={item.icon} theme="outlined" />}
					 {item.name}</Link></Menu.Item>);
					}
					})
				}			
			</Menu>
		);
	}
}
export default AppSidebar;
