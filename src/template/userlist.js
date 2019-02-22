import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { connect } from 'dva';
//import moment from 'moment';
import {Table, Card, Icon,Tooltip,Popconfirm, Select ,notification, Divider} from 'antd'; //Divider
//const Option = Select.Option;

class Userlist extends Component {	
    state = {order:''};
    
	render() {
        const {order} = this.state;
        const {loading, users} =this.props;
        const total = data.length;
        const limit = 10;
        const columns = [
            {title: 'Join Date', dataIndex: 'createdAt', key: 'createdAt', width:105, 
            //render:val => moment(val).format("MM/DD/YYYY")}, //fixed: 'left'
            },
			{title: 'Username', dataIndex: 'userName', key: 'userName', 
				render: (text,record) => <Link to={'/userdetail/'+record.userId}>{text}</Link>,
			},
			{title: 'Location', dataIndex: 'locationName', key: 'locationName', },	
			{title: 'Email', dataIndex: 'email', key: 'email', },
            {title: 'DOB', dataIndex: 'birthDate', key: 'birthDate', width:105,
             //render:val => moment(val).format("MM/DD/YYYY") 
            },
			{title: 'Gender', dataIndex: 'gender', key: 'gender',width:81},				
			{title: 'Action', key: 'action', width:78,  align:'center', fixed:'right',
				render: (text, record) => (<span>
					<Tooltip placement="bottom" title={record.isSuspended ? 'Make Active' :'Suspend User'}>
						<Popconfirm title="Are you sure？"  okText="Yes" cancelText="No" onConfirm={()=>console.log('okay')} onCancel={()=>console.log('cancel')}>
							<a style={record.isSuspended ? {color:'green'} :{}}><Icon type="stop" theme="filled" /></a>
						</Popconfirm>
					</Tooltip>
				</span>),
			}
		];
		return (
			<div>
                <Card title="Users List"  bodyStyle={{padding:0}} loading={false}>
					{/* <Row type="flex" justify="center" align="middle">
						<Col xs={{ span: 24, }} lg={{ span: 24,}} style={{padding:'15px 24px'}} >
							<div className="tabletopfield">
								<Select defaultValue={order} style={{width:157}} onChange={this.orderFun}>
									<Option value="">New Users</Option>
									<Option value="asc">Ascending Order</Option>
									<Option value="desc">Descending Order</Option>
								</Select>
								<div>
									<div className="tablesearch">
									<Input 
										placeholder="Search"
										value={this.state.search}
										//prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
										suffix={this.state.search ?<a onClick={()=>this.resetSearch()} ><Icon type="close-circle" /></a> : null} 
										onChange={this.changeSearch}
										onPressEnter={()=>this.searchData(this.state.search)}
										addonAfter={<Button type="primary" className="searchIcon" onClick={()=>this.searchData(this.state.search)}> <Icon type="search" /></Button>} 
									/>
									</div>

									<Divider type="vertical" />
									<Button type="primary" onClick={this.showDatePicker}><Icon type="download" style={{fontSize:16}}/>Excel File</Button>
								</div>
							</div>
						</Col>
					</Row>					 */}
					<div className="table-responsive">
						<Table bordered  columns={columns} dataSource={data} className="cardtable" onChange={this.paginationFun} scroll={{ x: 1200 }} rowKey="id" pagination={{size:'small', total:total, pageSize: limit, showTotal:total => `Total ${total} items`}}
						/>
					</div>
				</Card>
			</div>
		);
	}
}
export default connect(({global,loading}) => ({
	global, loading
}))(Userlist);


const data = [
	{ id: '1', createdAt:'12-03-2018', userName: 'John Brown', birthDate:'13-05-1992', locationName: 'New York No. 1 Lake Park',  email:'xyz@xyz.com', gender:'M'},
 	{ id: '2', createdAt:'11-03-2018', userName: 'John Brown', birthDate:'13-05-1992', locationName: 'New York No. 1 Lake Park',  email:'xyz@xyz.com', gender:'M'},
	{ id: '3', createdAt:'10-03-2018', userName: 'John Brown', birthDate:'13-05-1992', locationName: 'New York No. 1 Lake Park',  email:'xyz@xyz.com', gender:'M'},
	{ id: '4',  createdAt:'8-03-2018', userName: 'John Brown', birthDate:'13-05-1992', locationName: 'New York No. 1 Lake Park',  email:'xyz@xyz.com', gender:'M'},
	{ id: '5',  createdAt:'2-03-2018', userName: 'John Brown', birthDate:'13-05-1992', locationName: 'New York No. 1 Lake Park',  email:'xyz@xyz.com', gender:'M'}
];