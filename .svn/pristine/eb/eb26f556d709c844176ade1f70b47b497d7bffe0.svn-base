/**
 * @author fan
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import Cookies from 'js-cookie';
import {Button, Col, DatePicker, Row, Select, Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import DownloadComponent from '../../common/commonComponents/DownloadComponent.js';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Label,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
//下载模板组件
const _mm = new MUtil();
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9400D3', '#778899', '#4B0082', '#6495ED'];
const RADIAN = Math.PI / 180;

@inject('store')
@observer
class MasterStatistic extends Component{
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.masterData = [{name: '无数据', value: 100}];
        this.state={
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            dateFormat:'YYYY-MM-DD',
            currentUserId:Cookies.get('username')
        }
    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        };
        // this.fetch()
    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        let url =`${Config.REPORT_URL_PREFIX}masterIndustry/masterStatistic?`
            +`startDate=${this.state.startDate}&endDate=${this.state.endDate}&currentUserId=${this.state.currentUserId}`;
        this.store.fetchData(url);
    };
    renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, fill, name, value}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        return (
            <g>
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                {name === '无数据' ? <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                                        fill="#333">{`${name}`}</text> :
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                          fill="#333">{`${name}(${value})`}</text>}
            </g>
        );
    };

    render(){
        const column=[
            {
                title: '产业',
                dataIndex: 'industry',
                key: 'industry',
                align:'center'
            },
            {
                title: 'PV',
                dataIndex: 'pv',
                key: 'pv',
                align:'center'
            },
            {
                title: '数量',
                dataIndex: 'num',
                key: 'num',
                align:'center'
            },
            {
                title: '金额',
                dataIndex: 'price',
                key: 'price',
                align:'center'
            }
        ];
        return (
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                </ConditionHeader>
                <Row className='rowStyle'>
                    <Col span={13}>
                        <ResponsiveContainer width='100%' height={360}>
                            <PieChart  onMouseEnter={this.onPieEnter}>
                                <Pie
                                    dataKey={'value'}
                                    data={this.store.masterData}
                                    label={this.renderCustomizedLabel}
                                    outerRadius={100}
                                    fill="#8884d8">
                                    {
                                        this.store.masterData.map((entry, index) => <Cell key={index}
                                                                                          fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                                <Legend content={<div style={{width: '100%', textAlign: 'center'}}>自营产业销售比例(万元)</div>}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col span={10} className='colStyle'>
                        <div id="container">
                            <Table loading={this.store.loading}
                                   style={{marginTop: '1%',width:'100%',marginLeft:'1%'}}
                                   pagination={{
                                       hideOnSinglePage: true, pageSize: 10,
                                       current: this.store.currentPage,
                                       onChange: this.store.pageChange
                                   }}
                                   bordered size='middle' columns={column}
                                   dataSource={this.store.dataList}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default MasterStatistic;


