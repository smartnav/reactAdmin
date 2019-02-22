import React, { Component }  from 'react';
import {Redirect} from 'react-router';
import { connect } from 'dva';
import { Row, Col, Menu, Icon, Avatar,Dropdown,  } from 'antd';
import './AppHeader.less';
import { Link } from 'react-router-dom';

class AppHeader extends Component  {
    onMenuClick=(val)=>{
        if(val.key === "logout"){
            localStorage.removeItem('token');
            return <Redirect exact to="/login" />
        }
    }
    toggle=()=>this.props.dispatch({type: 'global/toggle'});

render() {
    const {global} = this.props;
    const toggle = global.toggleval;
    const menu = (<Menu onClick={this.onMenuClick}>
            <Menu.Item key="setting"><Link to="/setting"><Icon type="setting" theme="outlined" /> Setting</Link></Menu.Item>
            <Menu.Item key="logout"><Link to="/"><Icon type="logout" theme="outlined" /> Logout</Link></Menu.Item>
        </Menu>
      );
    return (
    <Row style={{color:'#fff', height:61}} type="flex" justify="space-between">
        <Col span={8} className="logoDiv">
            <Icon className="togglemenu" onClick={this.toggle} type={toggle?"menu-unfold":"menu-fold"} theme="outlined" />
            <div className="innerlogo">
            <Link to="/" style={{fontSize: 40, fontWeight: 'bold',}}>Logo</Link>
            </div>
        </Col>
        <Col span={16} className="topmenu">
            <Menu className="headtoplink" mode="horizontal" >
                {/* <Menu.Item key="account"><Link to="/setting">My Account</Link></Menu.Item> <Icon type="logout" theme="outlined" />*/}
                <Menu.Item>
                <Dropdown overlay={menu}><a className="ant-dropdown-link" ><Avatar style={{ color: '#bf3427', backgroundColor: '#fff' }} icon="user" /></a></Dropdown>
                </Menu.Item>
            </Menu>
        </Col>
    </Row>
    );
}
}
export default connect(({ global, loading}) => ({
	global, loading
}))(AppHeader);