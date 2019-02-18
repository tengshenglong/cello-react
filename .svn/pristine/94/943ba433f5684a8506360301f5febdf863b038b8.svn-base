/**
 * Created by guotaidou on 2018/8/3.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import Cookies from 'js-cookie';
import {Button, Col, DatePicker, Row, Select, Upload,Icon,Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';
import ModalComponent from "../../common/commonComponents/ModalComponent";
import AreaGm from './AreaGm.js';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9400D3', '#778899', '#4B0082', '#6495ED'];
const RADIAN = Math.PI / 180;
//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
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
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
@inject('store')
@observer
class LesArea extends Component{
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.spinShow='none';
        this.store.industryData = [{name: '无数据', value: 0}];
        this.store.areaData = [{name: '无数据', value: 100}];
        this.state={
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            currentUserId:Cookies.get('username'),//用户ID
            industry: '',
            invsort:'',
            price:'',
            matnrData:'',
            largeAreaData: '',
            gmData: '',
            visible:false,
            ecology:'全部',
            zecology:'全部'
        };
    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
    }

    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        const date=new Date(this.state.endDate).getTime()-new Date(this.state.startDate).getTime();
        const days=Math.floor(date/(24*3600*1000));
        if(days>30){
            _mm.errorTips("时间间隔不能大于30天");
            return;
        }
        this.store.dataList = null;
        this.store.areaData = [{name: '查询中,请稍候', value: 100}];
        this.store.industryData = [{name: '查询中,请稍候', value: 0}];
        let url =`${Config.REPORT_URL_PREFIX}order-store/findAreaGm?`
            +`currentUserId=${this.state.currentUserId}&`
            +`startDate=${this.state.startDate}&endDate=${this.state.endDate}&`
            +`industry=${this.state.industry}&invsort=${this.state.invsort}&`
            +`area=${this.state.largeAreaData}&gmName=${this.state.gmData}&`
            +`matCode=${this.state.matnrData}&price=${this.state.price}&ecology=${this.state.ecology}`;
        this.state.zecology = this.state.ecology;
        this.store.fetchData(url);
    };
    //模板显示函数
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    //模板隐藏函数
    hideModal= ()=> {
        this.setState({
            visible: false
        });
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
                {(name === '无数据' || name === '查询中,请稍候') ? <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                                        fill="#333">{`${name}`}</text> :
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                          fill="#333">{`${name}(${value})`}</text>}
            </g>
        );
    };
    render(){
        const column=[
            {
                title: '生态',
                align:'center',
                render: () => {
                    return <span>{decodeURI(this.state.zecology)}</span>
                }
            },
            {
                title: '区域',
                dataIndex: 'area',
                key: 'area',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '工贸',
                dataIndex: 'gmName',
                key: 'gmName',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '产业',
                dataIndex: 'industryName',
                key: 'industryName',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '产品组',
                dataIndex: 'invsortsCode',
                key: 'invsortsCode',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '价位段',
                dataIndex: 'startPrice',
                key: 'startPrice',
                align:'center',
                render: function(data,record) {
                    return <span title ={record.startPrice+'-'+record.endPrice}>{record.startPrice}-{record.endPrice}</span>;
                }
            },
            {
                title: '物料',
                dataIndex: 'matCode',
                key: 'matCode',
                align:'center',
                render: function(data) {
                    return <span title ={data||'全部'}>{data||'全部'}</span>;
                }
            },
            {
                title: '型号',
                dataIndex: 'matName',
                key: 'matName',
                align:'center',
                render: function(data) {
                    return <span title ={data||'无'}>{data||'无'}</span>;
                }
            },
            {
                title: '同期数量',
                dataIndex: 'tqtotalAmt',
                key: 'tqtotalAmt',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '同期金额',
                dataIndex: 'tqtotalPrice',
                key: 'tqtotalPrice',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '同期占比',
                dataIndex: 'tqZb',
                key: 'tqZb',
                align:'center',
                render: function(data) {
                    return <span title ={data+'%'}>{data+'%'}</span>;
                }
            },
            {
                title: '实际数量',
                dataIndex: 'sjtotalAmt',
                key: 'sjtotalAmt',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '实际金额',
                dataIndex: 'sjtotalPrice',
                key: 'sjtotalPrice',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '实际占比',
                dataIndex: 'sjZb',
                key: 'sjZb',
                align:'center',
                render: function(data) {
                    return <span title ={data+'%'}>{data+'%'}</span>;
                }
            },
            {
                title: '增幅',
                dataIndex: 'zf',
                key: 'zf',
                align:'center',
                render: function(data) {
                    return <span style={{color:data>0?'':'red'}} title ={data+'%'}>{data+'%'}</span>;
                }
            }
        ];
        let salt = JSON.parse(localStorage.a).salt.toString();
        let downloadUrl =`${Config.REPORT_URL_PREFIX}order-store/downLoadAreaGm?`
            +`currentUserId=${this.state.currentUserId}&`
            +`startDate=${this.state.startDate}&endDate=${this.state.endDate}&`
            +`industry=${this.state.industry}&invsort=${this.state.invsort}&`
            +`area=${this.state.largeAreaData}&gmName=${this.state.gmData}&`
            +`matCode=${this.state.matnrData}&price=${this.state.price}&ecology=${this.state.ecology}`;
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    gmList='true'
                    matnrList='true'
                    largeAreaList='true'
                    cascader='true'
                    ecology='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} startDate={this.state.startDate} endDate={this.state.endDate} buttonName={'下载'} />:''
                    }
                </ConditionHeader>
                <Row className='rowStyle'>
                    <Spin size="large" style={{position:'absolute',top:'50%',left:'50%',display:this.store.spinShow}}/>
                <Col span={14}>
                    <ResponsiveContainer width='100%' height={320}>
                            <PieChart onMouseEnter={this.onPieEnter}>
                                <Pie
                                    dataKey={'value'}
                                    data={this.store.areaData}
                                    label={this.renderCustomizedLabel}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    >
                                    {
                                        this.store.areaData.map((entry, index) => <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                                <Legend  content={<div style={{width:'100%',textAlign:'center'}}>区域销售比例(万元)</div>} />
                            </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col span={10}>
                    <ResponsiveContainer width='100%' height={320}>
                            <BarChart data={this.store.industryData}
                                      margin={{top: 20, right: 30, left: 20, bottom: 20}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name" width={10}>
                                    <Label value="产业销售额" offset={-10} position="insideBottom" margin={{ top: 30}}/>
                                </XAxis>
                                <YAxis>
                                    <Label value='销售总额(万元)' angle={-90} position='insideLeft'/>
                                </YAxis>
                                <Tooltip/>
                                <Bar name={'销售额'} dataKey={'value'} label={{ position: 'top' }} barSize={30}
                                     margin={{ top: 30}} fill="#8884d8">
                                    {
                                        this.store.industryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
                <div style={{paddingBottom: '20px',borderBottom: '3px solid #F0F2F5'}}/>
                {
                   salt.indexOf('W') !==-1 ? <Button style={{marginTop:'20px'}} type="primary" onClick={this.showModal}>区域维护</Button>:''
                }
                <ModalComponent visible={this.state.visible}
                                modalTitle='区域维护'
                                hide={this.hideModal}>
                    <AreaGm></AreaGm>
                </ModalComponent>
                <Table loading={this.store.loading}
                       style={{marginTop:'20px'}}
                       pagination={{hideOnSinglePage:true,
                       current:this.store.currentPage,
                       onChange:this.store.pageChange}} bordered size='middle'
                       columns={column} dataSource={this.store.dataList} />
            </div>
        )
    }
}
export default LesArea;