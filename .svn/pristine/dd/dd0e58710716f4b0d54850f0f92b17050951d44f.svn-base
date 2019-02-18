import React, {Component} from 'react';
import { Row,Col, Card,Tabs,Spin} from 'antd';
import {ResponsiveContainer,PieChart,Legend,Cell,Label,Pie} from 'recharts';
import {ChartCard} from '../../common/commonComponents/Charts';
import MUtil from '../../common/util/mm';
import Config from "../../common/Config";
import Cookies from 'js-cookie';
import Trend from '../../common/commonComponents/Trend';

import '../../common/css/TotalPage.css'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9400D3', '#778899', '#4B0082', '#6495ED'];
const RADIAN = Math.PI / 180;
//公共函数
const _mm = new MUtil();

class DailyAnalysis extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        loading:{
        spinning:true,
        size:'large'
        },
        spinShow: 'block',
        saleDate:"",
        jdTotalSaleRatio: '0',
        jdMasterTotalSaleRatio: '0',
        jdBangTotalSaleRatio: '0',
        areaList:[{name: '无数据', value: 100}],//区域数据
        cityList:[{name: '无数据', value: 100}],//城市数据
        currentUserId:Cookies.get('username'),//用户ID
    };

    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.fetch();
    }
    //发送fetch请求
    fetch = () => {
        let url = `${Config.REPORT_URL_PREFIX}dailyAnalysis/findDate?currentUserId=${this.state.currentUserId}`;
        this.setState({currentPage:1},function(){
            this.fetchData(url);
        });
    };
    fetchData = (url) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.setState({
            loading:{
                spinning:true,
                size:'large'
            },
            spinShow: 'block',
        });
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if(data.saleDate == null){
                    _mm.errorTips('没有数据');
                    this.setState({
                        loading:{
                            spinning:false,
                            size:'large'
                        },
                        spinShow: 'none',
                        dataList:[],
                        total:''
                    });
                }else {
                    this.state.cityList = data.cityList.length<=0?[{name: '无数据', value: 100}]:data.cityList;
                    this.state.areaList = data.areaList.length<=0?[{name: '无数据', value: 100}]:data.areaList;
                    this.setState({
                        loading: false,
                        saleDate:data.saleDate,
                        jdTotalSaleRatio: data.jdTotalSaleRatio,
                        jdMasterTotalSaleRatio: data.jdMasterTotalSaleRatio,
                        jdBangTotalSaleRatio: data.jdBangTotalSaleRatio
                    })
                    console.log(this.state.cityList)
                    console.log(this.state.areaList)
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
                this.setState({
                    loading:{
                        spinning:false,
                        size:'large'
                    },
                    spinShow: 'none',
                });
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

    render() {
        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: {marginBottom: 24},
        };
        return (

            <div style={{backgroundColor: '#F0F2F5',padding:'12px'}}>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title='总销售额'
                            total={() => this.state.saleDate.total}
                            contentHeight={46}>
                           <Trend flag={Number(this.state.jdTotalSaleRatio)>0?"up":"down"}>
                                <span>日同比</span>
                                <span className='trendText'>{this.state.jdTotalSaleRatio}%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title='京东主站销售额'
                            // loading={loading}
                            total={() => this.state.saleDate.jdMaster}
                            contentHeight={46}>
                           <Trend flag={Number(this.state.jdMasterTotalSaleRatio)>0?"up":"down"}>
                                <span>日同比</span>
                                <span className='trendText'>{this.state.jdMasterTotalSaleRatio}%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title='京东帮销售额'
                            // loading={loading}
                            total={() => this.state.saleDate.jdBang}
                            contentHeight={46}>
                            <Trend flag={Number(this.state.jdBangTotalSaleRatio)>0?"up":"down"}>
                                <span>日同比</span>
                                <span className='trendText'>{this.state.jdBangTotalSaleRatio}%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                </Row>
                <Card bordered={false} bodyStyle={{padding: 0}}>
                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <ResponsiveContainer width='100%' height={320}>
                                <PieChart onMouseEnter={this.onPieEnter}>
                                    <Pie
                                        dataKey={'value'}
                                        data={this.state.cityList}
                                        label={this.renderCustomizedLabel}
                                        outerRadius={100}
                                        fill="#8884d8">
                                        {
                                            this.state.cityList.map((entry, index) => <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}/>)
                                        }
                                    </Pie>
                                    <Legend  content={<div style={{width:'100%',textAlign:'center'}}>线级城市销售比例(元)</div>} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <ResponsiveContainer width='100%' height={320}>
                                <PieChart onMouseEnter={this.onPieEnter}>
                                    <Pie
                                        dataKey={'value'}
                                        data={this.state.areaList}
                                        label={this.renderCustomizedLabel}
                                        outerRadius={100}
                                        fill="#8884d8">
                                        {
                                            this.state.areaList.map((entry, index) => <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}/>)
                                        }
                                    </Pie>
                                    <Legend  content={<div style={{width:'100%',textAlign:'center'}}>区域销售比例(元)</div>} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                </Card>
            </div>


        )
    }
}

export default DailyAnalysis
