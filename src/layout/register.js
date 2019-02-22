import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
//import AppTerms from './../components/terms/terms'
import  './login.css';
import {Row,Col, Form, Input, Button, message, Select, Checkbox} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AppRegister extends Component  {
	state={username:'', password:'',  visible: false, recovermail:'', error:false, showpassword:false, remember:false , number:'',code:''}
	
	componentDidMount(){
		fetch('https://restcountries.eu/rest/v2/all').then((response) => {return response.json()})
		.then(data => {
			let Ccode=[];
			data.map((item)=>{
				if(item.callingCodes[0] !== '')
					if(0 > Ccode.indexOf(item.callingCodes[0]))
						Ccode.push(item.callingCodes[0])
						return true;
			})
			this.setState({code:Ccode})
		});
	}
	
	showModal = () => this.setState({ visible: true, }); 
	handleOk = (e) => this.setState({ visible: false, });	
	handleCancel = (e) =>  this.setState({ visible: false, recovermail:'' , error:false});
	showPass= ()=> this.setState({showpassword: !this.state.showpassword});
	
	handleSubmit = (e) => {
		e.preventDefault();		
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			delete values["confirm"];
				if(this.state.remember)
				{
					this.props.dispatch({ type: 'register/register', payload: { ...values, }, });					
					setTimeout(()=>{
						if(this.props.register.data.status === 1 && this.props.register.data !== undefined)
							{
								message.success(this.props.register.data.message, 5);
								this.props.form.resetFields();
								this.props.history.push('/login');
							}
					}, 3000);
				}
				else{	message.error('Please click on Terms and Conditions', 5)}
		  }
		});
	}
	  
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
		  form.validateFields(['confirm'], { force: true });
		}
		callback();
	}
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
		  callback('Two passwords that you enter is inconsistent!');
		} else {
		  callback();
		}
	}
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	handleNumberChange = (rule, value, callback) => {
		const number = parseInt(value || 0, 10);
    if (isNaN(number)) {
      callback('Please enter valid mobile number!');
    }else {
		  callback();
		}    
	}	 
	
	render() {
		const {code, showpassword} =this.state;
		//const {loading} =this.props;
		if(window.localStorage.getItem('token')){
			this.props.history.push("/")
		}
		const { getFieldDecorator } = this.props.form;
		const selectBefore =  getFieldDecorator('countryCode', { initialValue: '93',})(
      <Select style={{ width: 75 }} showSearch>
        {code ? code.map((item)=><Option value={item} key={item}>{item}</Option>) :''}
      </Select>
    );
		return (
			<Row type="flex" className="basicpage" justify="space-around" align="middle" style={{minHeight:'100vh'}}>
				<Col  className="basicbox">
					
						<div className="mainimg registerimg"></div>
						<div className="mainform">
							{/* <div className="logo">
								<img src={require('./../images/logo.png')} />
							</div> */}
							<Form onSubmit={this.handleSubmit} className='login_form'>
									<FormItem>
										{getFieldDecorator('userName', { rules: [{ required: true, message: 'Please input your Business Name!' }], })(
										<Input  placeholder="User Name" />
										)}
									</FormItem>
									<FormItem className="mobilefield">
											{getFieldDecorator('mobile', { rules: [{ required: true, message: 'Please input your phone number!' }, {validator: this.handleNumberChange}, ], })( 
												<Input type='number' addonBefore={<span>{selectBefore}</span>}  placeholder="Contact"  min="0" step="1" />
											)}
									</FormItem>
									<FormItem>
										{getFieldDecorator('email', { rules: [{type: 'email', message: 'The input is not valid E-mail!'},{ required: true, message: 'Please input your email!' }],	})(
										<Input  placeholder="Your Email Address" />
										)}
									</FormItem>
									<FormItem>
										{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!', }, { validator: this.validateToNextPassword,}],})(
										<Input alt="" type={showpassword ? "text":"password"} placeholder="Password" className="eyeicon" minLength={6} maxLength={20}/>
										)}
									</FormItem>
									<FormItem >
										{getFieldDecorator('confirm', { rules: [{ required: true, message: 'Please confirm your password!', }, {validator: this.compareToFirstPassword,}],})(
										<Input alt="" type={showpassword ? "text":"password"} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} className="eyeicon"/>
										)}
									</FormItem>
									<FormItem className="m-b0">
										{getFieldDecorator('term', {
											valuePropName: 'checked',
											initialValue: true,
										})(
											<Checkbox>Terms and Conditions</Checkbox>
										)}
									</FormItem>
									<FormItem className="m-b0">
										<Button type={'primary'}  htmlType="submit" >  {/*loading={loading.global}*/}
										Register
										</Button>
									</FormItem>
									Or <Link to={'/login'}>Already have account</Link>
								</Form>
						</div>
				</Col>
			</Row>
		);
   }
} 




export default connect(({ register, loading }) => ({
  register, loading
}))(Form.create()(AppRegister));