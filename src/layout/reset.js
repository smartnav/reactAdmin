import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'dva';
import {Row,Col, Form, Input, Button, message, Tooltip} from 'antd'; 
const FormItem = Form.Item;

class AppReset extends Component  {
	constructor(props){
		super(props)
		this.state={username:'', password:'',  visible: false, recovermail:'', error:false, showpassword:false, token:this.props.match.params.token , loading: false, numberChar:false, capitalChar:false, smallChar:false, specialChar:false,charlength:false, TooltipShow:false}
	}
	
	showModal = () => this.setState({ visible: true, }); 
	handleOk = (e) => this.setState({ visible: false, });	
	handleCancel = (e) => this.setState({ visible: false, recovermail:'' , error:false});	
	showPass= ()=> this.setState({showpassword: !this.state.showpassword});

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
		  callback('Please enter same password');
		} else {
		  callback();
		}
	}
	
	 handleSubmit = (e) => {
		e.preventDefault();		
		this.props.form.validateFields((err, values) => {
		  	if (!err) {
			  
				if(values.password === values.confirm)
					{
						console.log(values)
						delete values["confirm"];
						// this.setState({loading:true})
						// this.props.dispatch({ type: 'login/reset', payload: { ...values, },});
						message.success('Password Changed!')
						this.props.form.resetFields();
					}
				else message.error('Password does not match the confirm password.')
			
			// setTimeout(()=>{
			// 	this.setState({loading:false})
			// 	if(this.props.login.reset !== undefined && this.props.login.reset.status === 1)
			// 		{
			// 			message.success(this.props.login.reset.message, 5);
			// 			this.props.form.resetFields();
			// 			this.props.history.push('/login')
			// 		}
			// }, 1500);
		  	}
		});
	  }
	  
	validateToNextPassword = (rule, value, callback) => {
		var pass = value;
        let special = /[^\w\s]/g;
		let capital = /^(?=\S*[A-Z])/g;
		let number = /^(?=\S*\d)/g;
		let small = /^(?=\S*[a-z])/g;
		let specChar = special.test(pass);
		if(value !== undefined)
		{
			let showtooltip = number.test(pass) && capital.test(pass) && small.test(pass) && specChar && value.length > 5;
			this.setState({
				specialChar:specChar,
				numberChar:number.test(pass),
				capitalChar:capital.test(pass),
				smallChar:small.test(pass),
				charlength:value.length > 5,
				TooltipShow:!showtooltip
			})
			if (showtooltip || value === '') {
				callback();
			} else{
				callback('Please enter valid password!');
			}
			
		}else
		{callback();}		
	}
	
	render() {
		const { getFieldDecorator } = this.props.form;
		const { showpassword,numberChar,capitalChar,smallChar,specialChar,TooltipShow,charlength} =this.state;
		const PassPattern = <ul className="PassPattern">
				<li className={capitalChar?'active':''}>At least one capital char</li>
				<li className={smallChar?'active':''}>At least one small char</li>
				<li className={numberChar?'active':''}>At least one numeric</li>
				<li className={specialChar?'active':''}>At least one special char</li>
				<li className={charlength?'active':''}>Minimum 6 char required</li>
			</ul>;
		return (
			<Row type="flex" className="basicpage" justify="space-around" align="middle" style={{minHeight:'100vh'}}>
			<Col  className="basicbox">
				<div className="mainimg resetimg"></div>
				<div className="mainform">
					<div className="logo">
						{/*<img src={require('./../images/logo.png')} alt="Logo"/>*/}
					</div>
					<Form onSubmit={this.handleSubmit} className='login_form'>
							
						<FormItem>
							<Tooltip placement="bottomLeft" title={PassPattern} trigger={'focus'} className="intooltip" visible={TooltipShow}>
							{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!', }, {validator: this.validateToNextPassword,}] })(
								<Input  type={showpassword ? "text":"password"} placeholder="Password" className="eyeicon" minLength={6} maxLength={20} suffix={<img src={this.state.showpassword ? require('./../images/eye-off.svg'):require('./../images/eye.svg')} alt="eye"  onClick={()=> this.showPass()} />} onBlur={()=>this.setState({TooltipShow:false})}/>
							)}
							</Tooltip>
						</FormItem>
						<FormItem >
							{getFieldDecorator('confirm', { rules: [{ required: true, message: 'Please confirm your password!', }, {validator: this.compareToFirstPassword,}],})(
							<Input alt="" type={showpassword ? "text":"password"} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} minLength={6} maxLength={20} className="eyeicon" suffix={<img src={this.state.showpassword ? require('./../images/eye-off.svg'):require('./../images/eye.svg')} alt="eye"  onClick={()=> this.showPass()} />}/>
							)}
						</FormItem>
						<FormItem className="m-b0">
							<Button type={'primary'}  htmlType="submit" >  {/*loading={loading.global}*/}
							Reset Password
							</Button>
						</FormItem>
						Or <Link to={'/login'}>login</Link>
					</Form>
				</div>
			</Col>
		</Row>
		);
   }
} 

export default connect(({ login }) => ({
  login
}))(Form.create()(AppReset));



/*
<div className={style.login+' '+ style.register}>
				<section className={style.login_header}>
					<div className={style.container}>
						<a href="#/" className={style.logo} >Logo</a>
						<ul className={style.top_right_menu}>
							<li className={style.get_started}><a >Get Started</a></li>
							<li><a href="#/">Login</a></li>
						</ul>
					</div>	
				</section>	
				<article className={style.login_display+' '+style.container}>	
					<div className={style.container}>
						<div className={style.login_block}>
							<div className={style.login_block_inner}>
								<h1>RESET PASSWORD</h1>
								<Form onSubmit={this.handleSubmit} className={style.login_form}>
									<FormItem className="hide">	
										{getFieldDecorator('token', {initialValue:this.state.token})(						 
											<Input prefix={<Icon type="key" />} placeholder="Token"  disabled/>
										)}
									</FormItem>
									<FormItem>
										{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!', }, {
											validator: this.validateToNextPassword,}],})(
										<Input type={this.state.showpassword ? "text":"password"} placeholder="Password" className={style.eyeicon} minLength={6} maxLength={20}/>
										)}
									</FormItem>
									<FormItem>
										{getFieldDecorator('confirm', { rules: [{ required: true, message: 'Please confirm your password!', }, {
											validator: this.compareToFirstPassword,}],})(
										<Input type={this.state.showpassword ? "text":"password"} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} className={style.eyeicon} minLength={6} maxLength={20}/>
										)}
									</FormItem>
									<FormItem style={{margin:0}}>
										<Button  htmlType="submit" className={style.login_form_button} loading={this.state.loading}>
										Reset Password
										</Button>
									</FormItem>
									</Form>
							</div>	
						</div>
					</div>	  
				</article>		
				<footer><p style={{margin:0}}>&copy; 2018, FMM All Right Reserved </p></footer>
		 </div>
*/