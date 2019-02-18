import React, {Component} from 'react';
import {Card, Col, DatePicker, Icon, Row, Spin, Tabs, Tooltip} from 'antd';
import {ChartCard, Field,} from '../../common/commonComponents/Charts';
import Trend from '../../common/commonComponents/Trend';
import MUtil, {getTimeDistance} from '../../common/util/mm';
import DoubleCharts from '../../common/commonComponents/DoubleCharts';

import numeral from 'numeral';
import '../../common/css/TotalPage.css'
import Config from "../../common/Config";
import Cookies from "js-cookie";

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;
//公共函数
const _mm = new MUtil();

class TotalPage extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        salesType: 'online',
        currentTabKey: '',
        timeType:'week',
        data:[],
        visitData:[],
        rangePickerValue: getTimeDistance('week'),
        currentUserId:Cookies.get('username'),//用户ID
        loading: true,
        bangData:{
            totalNum:0,
            num:0.0,
            comparedByWeek:0,
            comparedByDay:0,
        },
        lesData:{
            totalNum:0,
            num:0.0,
            comparedByWeek:0,
            comparedByDay:0,
        },
        stockData:{
            totalNum:0,
            num:0.0,
            comparedByWeek:0,
            comparedByDay:0,
        },
        repertoryData:{
            totalAmount:0,
            samaAmount:0.0,
            dataList:[],
        },
        outStore1:[],
        outStore2:[],
        dataList:[],
    };

    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.getFirstTotalAmount();
        this.getSecondTotalAmount();
        this.getThirdlyTotalAmount();
        this.getFourthlyTotalAmount();
        this.getOutStoreBySevenDay();
        this.getOutStoreByThirty();
    }

    componentDidMount(){
        window.addEventListener('resize',{});
    }

    selectDate = type => {
        console.log(type);
        if (type === "week") {
            this.state.visitData = this.state.outStore1;
        } else {
            this.state.visitData = this.state.outStore2;
        }
        this.setState({
            rangePickerValue: getTimeDistance(type),
            timeType:type,
            data:this.state.visitData
        });
        console.log(this.state.data)

    };

    isActive(type) {
        const {rangePickerValue} = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return '';
        }
        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return 'currentDate';
        }
        return '';
    }

    getFirstTotalAmount=()=>{
        let api =`${Config.REPORT_URL_PREFIX}order-store/getHostAndBangAndPopData?currentUserId=${this.state.currentUserId}`;

        _mm.FetchUtil.init()
            .setUrl(api)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.flag){
                    this.setState({
                        bangData:data
                    });
                } else{
                    _mm.errorTips("暂无数据")
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });

    };
    getSecondTotalAmount=()=>{
        let api =`${Config.REPORT_URL_PREFIX}order-store/getOutStoreData?currentUserId=${this.state.currentUserId}`;

        _mm.FetchUtil.init()
            .setUrl(api)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.flag){
                    this.setState({
                        lesData:data
                    });
                } else{
                    _mm.errorTips("暂无数据")
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });

    };
    getThirdlyTotalAmount=()=>{
        let api =`${Config.REPORT_URL_PREFIX}choice/getStockData?currentUserId=${this.state.currentUserId}`;

        _mm.FetchUtil.init()
            .setUrl(api)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.flag){
                    this.setState({
                        stockData:data
                    });
                } else{
                    _mm.errorTips("暂无数据")
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });

    };
    getFourthlyTotalAmount=()=>{
        let api =`${Config.REPORT_URL_PREFIX}klMessage/getRepertoryData?currentUserId=${this.state.currentUserId}`;

        _mm.FetchUtil.init()
            .setUrl(api)
            .setMethod('POST')
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.flag){
                    this.setState({
                        repertoryData:data
                    });
                } else{
                    _mm.errorTips("暂无数据")
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });

    };
    getOutStoreBySevenDay=()=>{
        let api =`${Config.REPORT_URL_PREFIX}order-store/getOutStoreBySevenDay?currentUserId=${this.state.currentUserId}`;
        _mm.FetchUtil.init()
            .setUrl(api)
            .setMethod('POST')
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.flag){
                    this.setState({
                        outStore1:data.dataList,
                        data:data.dataList
                    });
                }else{
                    _mm.errorTips("暂无数据")
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });

    };

    getOutStoreByThirty=()=>{
        let api =`${Config.REPORT_URL_PREFIX}order-store/getOutStoreByThirty?currentUserId=${this.state.currentUserId}`;
        _mm.FetchUtil.init()
            .setUrl(api)
            .setMethod('POST')
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.flag){
                    this.setState({
                        outStore2:data.dataList,
                        data:data.dataList
                    });
                }else{
                    _mm.errorTips("暂无数据")
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };


    render() {
        const {loading: stateLoading} = this.state;
        const salesExtra = (
            <div className='salesExtraWrap'>
                <div className='salesExtra'>
                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                        近7天
                    </a>
                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                        近一月
                    </a>
                </div>
            </div>
        );
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
                        {this.state.bangData.totalNum !== 0?
                        <ChartCard
                            bordered={false}
                            title='主+帮+POP销售统计'
                            action={
                                <Tooltip
                                    title='主+帮+POP月销额'
                                >
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={Number(this.state.bangData.totalNum)}
                            footer={
                                <Field
                                    label='日销售额'
                                    value={`￥${Number(this.state.bangData.num)}`}
                                />
                            }
                            contentHeight={46}>
                            <Trend flag={Number(this.state.bangData.comparedByWeek)>0?"up":"down"} style={{marginRight: 16}}>
                                <span>月同比</span>
                                <span className='trendText'>{Math.abs(Number(this.state.bangData.comparedByWeek))}%</span>
                            </Trend>
                            <Trend flag={Number(this.state.bangData.comparedByDay)>0?"up":"down"}>
                                <span>日同比</span>
                                <span className='trendText'>{Math.abs(Number(this.state.bangData.comparedByDay))}%</span>
                            </Trend>
                        </ChartCard>:<Spin tip="Loading...">
                                <ChartCard
                                    bordered={false}
                                    title='主+帮+POP销售统计'
                                    loading={this.state.loading}
                                    action={
                                        <Tooltip
                                            title='数据为t-1数据'
                                        >
                                            <Icon type="info-circle-o"/>
                                        </Tooltip>
                                    }
                                    total={Number(this.state.bangData.totalNum)}
                                    footer={
                                        <Field
                                            label='日销售额'
                                            value={`￥${numeral(Number(this.state.bangData.num)).format('0,0')}`}
                                        />
                                    }
                                    contentHeight={46}>
                                    <Trend flag={Number(this.state.bangData.comparedByWeek)>0?"up":"down"} style={{marginRight: 16}}>
                                        <span>月同比</span>
                                        <span className='trendText'>{Math.abs(Number(this.state.bangData.comparedByWeek))}%</span>
                                    </Trend>
                                    <Trend flag={Number(this.state.bangData.comparedByDay)>0?"up":"down"}>
                                        <span>日同比</span>
                                        <span className='trendText'>{Math.abs(Number(this.state.bangData.comparedByDay))}%</span>
                                    </Trend>
                                </ChartCard>
                            </Spin>
                        }
                    </Col>

                    <Col {...topColResponsiveProps}>
                        {this.state.stockData.totalNum !== 0?
                            <ChartCard
                                title="备货数据"
                                action={
                                    <Tooltip title="备货月统计" >
                                        <Icon type="info-circle-o" />
                                    </Tooltip>
                                }
                                style={{ width: 335, height: 185}}
                                total={Number(this.state.stockData.totalNum)}
                                footer={
                                    <Trend flag={Number(this.state.stockData.comparedByWeek)>0?"up":"down"} style={{marginTop: 40}}>
                                        <span>月同比</span>
                                        <span className='trendText'>{Math.abs(Number(this.state.stockData.comparedByWeek))}%</span>
                                    </Trend>
                                }
                            />
                            :<Spin tip="Loading...">
                                <ChartCard
                                    title="备货数据"
                                    action={
                                        <Tooltip title="数据为t-1数据" >
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    }
                                    style={{ width: 335, height: 185}}
                                    total={Number(this.state.stockData.totalNum)}
                                    footer={
                                        <Trend flag={Number(this.state.stockData.comparedByWeek)>0?"up":"down"} style={{marginTop: 40}}>
                                            <span>月同比</span>
                                            <span className='trendText'>{Math.abs(Number(this.state.stockData.comparedByWeek))}%</span>
                                        </Trend>
                                    }
                                />
                            </Spin>}
                    </Col>

                    <Col {...topColResponsiveProps}>
                        {this.state.repertoryData.totalAmount !==0?
                            <ChartCard
                                title="库存统计"
                                action={
                                    <Tooltip title="t-1数据">
                                        <Icon type="info-circle-o" />
                                    </Tooltip>
                                }
                                total={Number(this.state.repertoryData.totalAmount)}
                                footer={
                                    <Trend flag={Number(this.state.lesData.comparedByWeek)>0?"up":"down"} style={{marginTop: 40}}>
                                        <span>日同比</span>
                                        <span className='trendText'>{Math.abs(Number(this.state.lesData.comparedByWeek))}%</span>
                                    </Trend>
                                }
                            />:<Spin tip="Loading...">
                                <ChartCard
                                    title="库存统计"
                                    action={
                                        <Tooltip title="指标说明">
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    }
                                    total={Number(this.state.repertoryData.totalAmount)}
                                    footer={
                                        <Trend flag={Number(this.state.lesData.comparedByWeek)>0?"up":"down"} style={{marginTop: 40}}>
                                            <span>日同比</span>
                                            <span className='trendText'>{Math.abs(Number(this.state.lesData.comparedByWeek))}%</span>
                                        </Trend>
                                    }
                                />
                            </Spin>}
                    </Col>

                    <Col {...topColResponsiveProps}>
                        {this.state.lesData.totalNum !== 0?
                        <ChartCard
                            bordered={false}
                            title='出库统计'
                            action={
                                <Tooltip
                                    title='出库月度数据'
                                >
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={Number(this.state.lesData.totalNum)}
                            footer={
                                <Field
                                    label='日销售额'
                                    value={`￥${Number(this.state.lesData.num)}`}
                                />
                            }
                            contentHeight={46}>
                            <Trend flag={Number(this.state.lesData.comparedByWeek)>0?"up":"down"} style={{marginRight: 16}}>
                                <span>月同比</span>
                                <span className='trendText'>{Math.abs(Number(this.state.lesData.comparedByWeek))}%</span>
                            </Trend>
                            <Trend flag={Number(this.state.lesData.comparedByDay)>0?"up":"down"}>
                                <span>日同比</span>
                                <span className='trendText'>{Math.abs(Number(this.state.lesData.comparedByDay))}%</span>
                            </Trend>
                        </ChartCard>:<Spin tip="Loading...">
                                <ChartCard
                                    bordered={false}
                                    title='出库统计'
                                    loading={this.state.loading}
                                    action={
                                        <Tooltip
                                            title='数据为t-1数据'
                                        >
                                            <Icon type="info-circle-o"/>
                                        </Tooltip>
                                    }
                                    total={Number(this.state.lesData.totalNum)}
                                    footer={
                                        <Field
                                            label='日销售额'
                                            value={`￥${numeral(Number(this.state.lesData.num)).format('0,0')}`}
                                        />
                                    }
                                    contentHeight={46}>
                                    <Trend flag={Number(this.state.lesData.comparedByWeek)>0?"up":"down"} style={{marginRight: 16}}>
                                        <span>月同比</span>
                                        <span className='trendText'>{Math.abs(Number(this.state.lesData.comparedByWeek))}%</span>
                                    </Trend>
                                    <Trend flag={Number(this.state.lesData.comparedByDay)>0?"up":"down"}>
                                        <span>日同比</span>
                                        <span className='trendText'>{Math.abs(Number(this.state.lesData.comparedByDay))}%</span>
                                    </Trend>
                                </ChartCard>

                            </Spin>}
                     </Col>

                </Row>
                <Card bordered={false} bodyStyle={{padding: 0}}>
                    <div className='salesCard'>
                        <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{marginBottom: 24}}>
                            <TabPane
                                tab='出库销额统计图(万元)'
                                key="sales"
                            >
                                {this.state.data.length < 2?<Spin tip="Loading...">
                                    <Row>
                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                            <div className='salesBar'>
                                                <DoubleCharts data={this.state.data} type={this.state.timeType}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Spin>:<Row>
                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                            <div className='salesBar'>
                                                <DoubleCharts data={this.state.data} type={this.state.timeType}/>
                                            </div>
                                        </Col>
                                    </Row>}
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </div>
        )
    }
}

export default TotalPage
