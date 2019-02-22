import React, { Component } from 'react';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import ForgotForm from './../components/forgot/forgot';
import Apploader from './../components/loader/loader'
import { connect } from 'dva';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message, } from 'antd';
import './login.css';
const FormItem = Form.Item;

class AppLogin extends Component  {
	state={visible: false, recovermail:'' ,remember:localStorage.getItem('remember')||false}
	
	shouldComponentUpdate(){
		if(this.props.loading.global &&this.props.login.forgot !== undefined && this.props.login.forgot.statusCode === 200)
		{
			message.success(this.props.login.forgot.message, 5);
			this.setState({ visible: false });
			return true;
		}
		else{ return true;}
	}

	showModal = () => {
		const form = this.formRef.props.form;
		form.resetFields();
		this.setState({ visible: true,}); 
	}
	saveFormRef = (formRef) =>  this.formRef = formRef;
	handleCancel = (e) => this.setState({ visible: false, recovermail:'' , error:false});
	handleCreate = () => {
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			if (!err) {
				this.props.dispatch({ type: 'login/forgot', payload: {...values,},});
			}      
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if(values.remember){
					localStorage.setItem('email',values.email);
				}
				else{
					localStorage.removeItem('email');
				}
				delete values["remember"];	
				this.props.dispatch({ type: 'login/login', payload: {...values,},});
			}
		});
	}
	
	render() {
		const props =this.props;
		if(localStorage.getItem('token'))
			{return <Redirect to='/' />}
		const { getFieldDecorator } = props.form;			
		return (
			<div>
				<Apploader show={props.loading.global}/>
				<Row type="flex" className="basicpage" justify="space-around" align="middle" style={{minHeight:'100vh'}}>
					<Col  className="basicbox">
						<div className="mainimg"></div>
						<div className="mainform">
							<div className="logo">
								{/*<img src={require('./../images/logo.png')} />*/}
							</div>
							<Form onSubmit={this.handleSubmit} className="login-form">
								<FormItem>
									{getFieldDecorator('email', {
										rules: [{type: 'email', message: 'The input is not valid E-mail!',}, {
											required: true, message: 'Please input your E-mail!',}],
											initialValue : localStorage.getItem('email')
									})(
										<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
									)}
								</FormItem>
								<FormItem>
									{getFieldDecorator('password', {
										rules: [{ required: true, message: 'Please input your Password!' }],
									})(
										<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
									)}
									{/* suffix={<Icon type="eye" theme="outlined" onClick={()=>console.log('eye')}/>} */}
								</FormItem>
								<FormItem>
									{getFieldDecorator('remember', {
										valuePropName: 'checked',
										initialValue: true,
									})(
										<Checkbox>Remember me</Checkbox>
									)}
									<a className="login-form-forgot" onClick={this.showModal}>Forgot password</a>
									<br/>
									<Button type={'primary'} htmlType="submit" className="login-form-button">
										Log in
									</Button>
									<br/>
									Or <Link to={'/register'}>register now!</Link>
								</FormItem>
							</Form>
						</div>
						<ForgotForm wrappedComponentRef={this.saveFormRef} visible={this.state.visible} onCancel={this.handleCancel} onCreate={this.handleCreate} />					
					</Col>
				</Row>
			</div>
		);
   }
}
export default connect(({login, loading}) => ({
	login, loading
}))(Form.create()(AppLogin));