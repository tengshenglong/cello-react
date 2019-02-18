import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Col, Row ,Table} from 'antd';
import moment from 'moment';
import Cookies from 'js-cookie';
import {PieChart, Text,Pie, Bar,AreaChart, Sector,ResponsiveContainer, Cell,BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label} from 'recharts';
import '../../common/css/baseStyle.css';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
const _mm=new MUtil();
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#9400D3','#778899','#4B0082','#6495ED'];
const RADIAN = Math.PI / 180;
@inject('store')
@observer
class BangView extends Component {

    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList = [];
        this.store.invSortData = [{name: '无数据', value: 0}];
        this.store.largeAreaData = [{name: '无数据', value: 100}];
        this.state = {
            startDate: moment().format('YYYY-MM-DD'),//开始时间
            endDate: moment().format('YYYY-MM-DD'),//结束时间
            currentUserId: Cookies.get('username'),//用户id
            dateFormat: 'YYYY-MM-DD'
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
        let url =`${Config.REPORT_URL_PREFIX}bangReport/dayReport?`
        +`currentUserId=${this.state.currentUserId}&startTime=${this.state.startDate}&endTime=${this.state.endDate}`;
        this.store.fetchData(url);
    };
    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index , fill,name,value}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const x  = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy  + radius * Math.sin(-midAngle * RADIAN);

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
                <text x={x} y={y} fill="white" textAnchor={'middle'} 	dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                {name === '无数据' ? <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                                        fill="#333">{`${name}`}</text> :
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                          fill="#333">{`${name}(${value})`}</text>}
            </g>
        );
    };
    render() {
        const columns = [
            {
                title: '京东帮服务店',
                dataIndex: 'reportContent',
                align:'center',
                key: 'reportContent',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '销售数量',
                dataIndex: 'reportTotalNum',
                align:'center',
                key: 'reportTotalNum',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '销售总额（万元）',
                dataIndex: 'reportTotalAmount',
                align:'center',
                key: 'reportTotalAmount',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }];
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                startDate='true'
                receiveData={this.receiveData}
                fetch={this.fetch}/>
            <Row className='rowStyle'>
                <Col span={14}>
                    <ResponsiveContainer width='100%' height={320}>
                            <PieChart onMouseEnter={this.onPieEnter}>
                                <Pie
                                    dataKey={'value'}
                                    data={this.store.largeAreaData}
                                    label={this.renderCustomizedLabel}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    >
                                    {
                                        this.store.largeAreaData.map((entry, index) => <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                                <Legend  content={<div style={{width:'100%',textAlign:'center'}}>大区销售比例</div>} />
                            </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col span={10}>
                    <ResponsiveContainer width='100%' height={320}>
                            <BarChart data={this.store.invSortData}
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
                                        this.store.invSortData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <Row style={{marginTop: '50px'}}>
                    <div>
                        <div>
                            <Table  loading={this.store.loading}
                                    size='middle' bordered
                                    pagination={{ current:this.store.currentPage,
                                    onChange:this.store.pageChange}}
                                    dataSource={this.store.dataList}
                                    columns={columns}/>
                        </div>
                    </div>
            </Row>
        </div>;
    }
}

BangView.propTypes = {};

export default BangView;
