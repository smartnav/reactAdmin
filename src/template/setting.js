import React, { Component } from 'react';
//import {Link } from 'react-router-dom'
import { connect } from 'dva';
import {Card, Form, Input, Button, message, Tooltip } from 'antd';	//Skeleton, Divider
const FormItem = Form.Item;

class Setting extends Component {	
	constructor(props){
		super(props)
		this.state={username:'', password:'',  visible: false, recovermail:'', error:false, showpassword:false, token:this.props.match.params.token , loading: false, numberChar:false, capitalChar:false, smallChar:false, specialChar:'',charlength:false, TooltipShow:false}
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
						// this.props.dispatch({ type: 'setting/setting', payload: { ...values, },});
						message.success('Password Changed!')
						this.props.form.resetFields();
					}
				else message.error('Password does not match the confirm password.')			
		  	}
		});
	  }
	
	render() {
		const { getFieldDecorator } = this.props.form;
		const { showpassword,numberChar,capitalChar,smallChar,specialChar,TooltipShow,charlength} =this.state;
		const PassPattern = <ul className="PassPattern">
				<li className={capitalChar?'active':''}>At least one capital char</li>
				<li className={smallChar?'active':''}>At least one small char</li>
				<li className={numberChar?'active':''}>At least one numeric</li>
				<li className={specialChar ?'active':''}>At least one special char</li>
				<li className={charlength?'active':''}>Minimum 6 char required</li>
			</ul>;
	return (
		<div>
			<Card title="Setting" bordered={false} style={{ marginBottom:15,}} >
				<Form onSubmit={this.handleSubmit} style={{maxWidth:350}}>
					<FormItem>						
						{getFieldDecorator('oldpassword', { rules: [{ required: true, message: 'Please enter your old password!', },] })(
							<Input  type={"password"} placeholder="Old Password" maxLength={20}/>
						)}
					</FormItem>
					<FormItem>
						<Tooltip placement="bottomLeft" title={PassPattern} trigger={'focus'} className="intooltip" visible={TooltipShow}>
						{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!', }, ] })(
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
						Changed Password
						</Button>
					</FormItem>
				</Form>
			</Card>			
		</div>
	);
  }
}
export default connect(({global,loading}) => ({
	global, loading
}))(Form.create()(Setting));