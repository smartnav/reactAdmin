import React, { Component } from 'react';
//import {Link } from 'react-router-dom'
import { connect } from 'dva';
import{  Chart, Geom, Axis, Tooltip, Legend,} from "bizcharts";
import DataSet from "@antv/data-set";
import { Card, Row, Col,Tabs, Icon, List, Skeleton, Avatar} from 'antd';	//Skeleton, Divider, Table, Radio, Tag,
import './style.less';
const TabPane = Tabs.TabPane;
//const RadioButton = Radio.Button;
//const RadioGroup = Radio.Group;
// const wrapperStyles = { width: "100%", margin: "0 auto", backgroundColor:"#0000001a"}
const ChartLayout = (data, cols)=>{
	return <Chart height={380} className="linechart" data={data} scale={cols} forceFit>
			<Legend />
			<Axis name="labelX" />
			<Axis name="value" label={{ formatter: val => `${val}` }} />
			<Tooltip crosshairs={{ type: "y" }}
				itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>'				
			/>
			<Geom type="line" position="labelX*value" size={2}  color={['city', ['#bf3427', '#e26e63', '#565656']]}//color={"city"}
				/>
			<Geom type="point" position="labelX*value" size={4} shape={"circle"} color={['city', ['#bf3427', '#e26e63', '#565656']]} style={{ stroke: "#fff", lineWidth: 1 }} />
		</Chart>
}

class Dashboard extends Component {	
	state={short:'', mounted:false, globalInfo:{title:'Global user',total:1200,active:900}, chartdata:full,chartTitle:"Current Year"}
	componentDidMount(){
		this.setState({mounted:true});
	}


	handleSizeChange=(e)=>{
		//console.log(e.target.value)
		this.setState({short:e.target.value});
	}

	resetGlobalData=(geography, evt)=>{
		evt.preventDefault()
		let countryVal = this.state.globalInfo.title;
		if(geography.id === countryVal)
			this.setState({globalInfo:{title:'Global user',total:1200,active:900}})
	}

	handleClick=(geography, evt)=>{
		evt.preventDefault()
		let info = activeCountry.find(x=> {
			if(x.title===geography.id)
				return x;
			else
				return false;
		})
		setTimeout(()=>{
			if(info !== undefined && info.title === geography.id)
				this.setState({globalInfo:info})
			else
				this.setState({globalInfo:{title:'Global user',total:1200,active:900}})
		},10)
	}

	changeChart=(val)=>{	
		if(val==='full') this.setState({chartdata:full, chartTitle:"Current Year"});
		if(val==='month') this.setState({chartdata:month, chartTitle:"Current Month"});
		if(val==='today') this.setState({chartdata:today, chartTitle:"Today"});
	}

	render() {
		//console.log(this.props)
		const {globalInfo, chartTitle} = this.state;
		const chartdata = this.state.chartdata;		
		const ds = new DataSet();
		const dv = ds.createView().source(chartdata);
		dv.transform({ type: "fold", fields: ["user", "dumpee", "post"], key: "city", value: "value" // value字段
			});
		const cols = { month: { range: [0, 1] } };

		return (
			<div>
				<Row gutter={15} justify="space-between" align="middle">
					<Col span={12} md={{span:12}} lg={{span:6}}>
						<Card hoverable className="dashCard" bordered={false} style={{padding:0, marginBottom:15}} onClick={()=>this.changeChart('full')}>
							<h2>Total User</h2>
							<p>100000</p>
							<Icon type="global" />
						</Card>
					</Col>
					<Col span={12} md={{span:12}} lg={{span:6}}>
						<Card hoverable className="dashCard" bordered={false} style={{padding:0, marginBottom:15}} onClick={()=>this.changeChart('month')}>
							<h2>Current Month</h2>
							<p>5000</p>
							<Icon type="team" />
						</Card>
					</Col>
					<Col span={12} md={{span:12}} lg={{span:6}}>
						<Card hoverable className="dashCard" bordered={false} style={{padding:0, marginBottom:15}} onClick={()=>this.changeChart('today')}>
							<h2>Today Register</h2>
							<p>420</p>
							<Icon type="solution" />
						</Card>
					</Col>
					<Col span={12} md={{span:12}} lg={{span:6}}>
						<Card className="dashCard" bordered={false} style={{padding:0, marginBottom:15}}>
							<h2>Active</h2>
							<p>200</p>
							<Icon type="user" />
						</Card>
					</Col>
				</Row>

				<Card title={chartTitle} bordered={false} style={{padding:0, marginBottom:15}} bodyStyle={{padding:0,}}>
					{this.state.mounted && ChartLayout(dv, cols)}
				</Card>

				<Row gutter={15} justify="space-between" align="middle">
					<Col md={{span:24}}>
						<Card title="Top 5" bordered={false} bodyStyle={{padding:0, }}>
							{/*  <Tabs defaultActiveKey="11" tabPosition={'top'} style={{ height:45, }}>
								<TabPane tab="Today" key="11"></TabPane>
								<TabPane tab="Month" key="12"></TabPane>
								<TabPane tab="Week" key="13"></TabPane>
								<TabPane tab="All Time" key="14"></TabPane>
							</Tabs> */}

							<Tabs defaultActiveKey="1" tabPosition={'top'} //className="detailtabs"
							//style={{ height: 255,  }}
							>
								<TabPane tab="User" key="1" style={{padding:'0 15px'}}>
									<List className="demo-loadmore-list" itemLayout="horizontal" dataSource={list}
										renderItem={item => (
											<List.Item actions={[<a>more</a>]}>
												<Skeleton avatar title={false} loading={item.loading} active>
												<List.Item.Meta avatar={<Avatar  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} title={<a >{item.name}</a>} description={item.address}/>
												{/* <div>content</div> */}
												</Skeleton>
											</List.Item>)}
									/>
								</TabPane>
								<TabPane tab="Dumpee" key="2" style={{padding:'0 15px'}}>
									<List className="demo-loadmore-list" itemLayout="horizontal" dataSource={list}
										renderItem={item => (
											<List.Item actions={[<a>more</a>]}>
												<Skeleton avatar title={false} loading={item.loading} active>
												<List.Item.Meta avatar={<Avatar  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} title={<a >{item.name}</a>} description={item.address}/>
												{/* <div>content</div> */}
												</Skeleton>
											</List.Item>)}
									/>
								</TabPane>
								<TabPane tab="Post" key="3" style={{padding:'0 15px'}}>
									<List className="demo-loadmore-list" itemLayout="horizontal" dataSource={list}
										renderItem={item => (
											<List.Item >
												<Skeleton avatar title={false} loading={item.loading} active>
												<List.Item.Meta avatar={<Avatar  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} title={<a >{item.name}</a>} description={item.address}/>
												{/* <div>content</div> */}
												</Skeleton>
											</List.Item>)}
									/>
								</TabPane>
							</Tabs>
						</Card>
					</Col>
				</Row>
				
				{/* <Card title="Top 5 most redumped Dump posts" bordered={false} style={{ marginBottom:15,}} 
					bodyStyle={{padding:0}}
					extra={<RadioGroup defaultValue={'Month'} size={'small'} onChange={this.handleSizeChange}>
						<RadioButton value="Week">Week</RadioButton>
						<RadioButton value="Month">Month</RadioButton>
						<RadioButton value="Year">Year</RadioButton>
						</RadioGroup>}
				>
					<div className="table-responsive">
						<Table bordered columns={columns} dataSource={data} className="cardtable"/>
					</div>
				</Card>
				<Card title="Category" bordered={false} bodyStyle={{padding:0}}>
					<Tabs defaultActiveKey="11" tabPosition={'top'} style={{ height:45, }}>
						<TabPane tab="Today" key="11"></TabPane>
						<TabPane tab="Month" key="12"></TabPane>
						<TabPane tab="Week" key="13"></TabPane>
						<TabPane tab="All Time" key="14"></TabPane>
					</Tabs>

					<Tabs defaultActiveKey="1" tabPosition={'top'} style={{ height: 220,  }}>
						<TabPane tab="All" key="1">All list</TabPane>
						<TabPane tab="Sports" key="2">Sports list</TabPane>
						<TabPane tab="Brands/Businesses" key="3">Brands list</TabPane>
						<TabPane tab="Lifestyle" key="4">Lifestyle list</TabPane>
						<TabPane tab="Entertainment" key="5">Entertainment list</TabPane>
					</Tabs>
				</Card> */}
			</div>
		);
	}
}
export default connect(({global,loading}) => ({
	global, loading
}))(Dashboard);

const list = [
	{ key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',  },
 	{ key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
	{ key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',},
	{ key: '4', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',},
	{ key: '5', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',}
];

const activeCountry =[
	{title:'IND', total:800, active:300},
	{title:'AUS', total:500, active:350},
	{title:'USA', total:200, active:60},
	{title:'CHN', total:650, active:100},
	{title:'MNG', total:150, active:100},
]

const full = [
	{ labelX: "Jan", user: 3000, dumpee: 1500, post:1000 },
	{ labelX: "Feb", user: 3500, dumpee: 1700, post:900 },
	{ labelX: "Mar", user: 3700, dumpee: 1900, post:1100 },
	{ labelX: "Apr", user: 4200, dumpee: 1300, post:700 },
	{ labelX: "May", user: 3000, dumpee: 1400, post:1500 },
	{ labelX: "Jun", user: 3800, dumpee: 2500, post:1500 },
	{ labelX: "Jul", user: 5000, dumpee: 2100, post:2000 },
	{ labelX: "Aug", user: 3600, dumpee: 1800, post:800 },
	{ labelX: "Sep", user: 3100, dumpee: 1500, post:1300 },
	{ labelX: "Oct", user: 3500, dumpee: 1900, post:1800 },
	{ labelX: "Nov", user: 2000, dumpee: 2500, post:900 },
	{ labelX: "Dec", user: 5200, dumpee: 3500, post:1600 }
];

const month = [
	{ labelX: "1st Week", user: 3000, dumpee: 1500, post:1000 },
	{ labelX: "2nd Week", user: 3500, dumpee: 1700, post:900 },
	{ labelX: "3ed Week", user: 3700, dumpee: 1900, post:1100 },
	{ labelX: "4th Week", user: 5000, dumpee: 1300, post:700 },
];

const today = [ 
	// { labelX: "0", user: 300, dumpee: 150, post:100 },
	{ labelX: "3", user: 350, dumpee: 170, post:90 },
	{ labelX: "6", user: 370, dumpee: 190, post:110 },
	{ labelX: "9", user: 420, dumpee: 130, post:70 },
	{ labelX: "12", user: 300, dumpee: 180, post:150 },
	{ labelX: "15", user: 350, dumpee: 240, post:190 },
	{ labelX: "18", user: 400, dumpee: 190, post:300 },
	{ labelX: "21", user: 300, dumpee: 250, post:260 },
	{ labelX: "24", user: 350, dumpee: 140, post:400 },
];