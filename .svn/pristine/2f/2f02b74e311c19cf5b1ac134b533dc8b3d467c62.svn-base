/**
 * Created by guotaidou on 2018/7/9.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import Cookies from 'js-cookie';
import {Col, Row, Spin, Table} from 'antd';
import Bread from '../../common/Bread'; //头部面包屑导航组件
import MUtil from '../../common/util/mm'; //公共函数
import Config from '../../common/Config'; //地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader'; //查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CustomizedAxisTick from "../master/CustomizedAxisTick";
import CustomTooltip from "./CustomTooltip";

const _mm = new MUtil();

@inject('store')
@observer
class EvaluateStatics extends Component {
    constructor(props) {
        super(props);
        this.store = new commonStore();
        this.store.dataList = [];
        this.state = {
            dateFormat: 'YYYY-MM-DD',
            startDate: moment().format('YYYY-MM-DD').substring(0,8).padEnd(10,'01'),//开始时间
            endDate: moment().format('YYYY-MM-DD'),//结束时间
            industry: '',//产业
            jdSku: '',//京东Sku
            currentUserId: Cookies.get('username'),
            evaluateRateLine:[],
            industryList:'',
            lineList:[{key:'洗衣机',value:<Line type="monotone" dataKey="xiyiji" name="洗衣机" stroke="#DB156F" strokeWidth={2}/>},
                {key:'冰箱',value:<Line type="monotone" dataKey="bingxaing" name="冰箱" stroke="#005DAB" strokeWidth={2}/>},
                {key:'彩电',value:<Line type="monotone" dataKey="caidian" name="彩电" stroke="#005DAB" strokeWidth={2}/>},
                {key:'空调',value:<Line type="monotone" dataKey="kongtiao" name="空调" stroke="#F2C44B" strokeWidth={2}/>},
                {key:'冷柜',value:<Line type="monotone" dataKey="lenggui" name="冷柜" stroke="#67ED62" strokeWidth={2}/>},
                {key:'热水器',value:<Line type="monotone" dataKey="reshuiqi" name="热水器" stroke="#B971F2" strokeWidth={2}/>},
                {key:'厨电',value:<Line type="monotone" dataKey="chudain" name="厨电" stroke="#31EAD1" strokeWidth={2}/>},
                {key:'全部',value:<Line type="monotone" dataKey="quanbu" name="全部" stroke="#DB156F" strokeWidth={2}/>},
                {key:'其他',value:<Line type="monotone" dataKey="qita" name="其他" stroke="#DB156F" strokeWidth={2}/>}],
            columsn:[],
            columsn1:[],
            colums1:[]
        }
    }

    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        let industryList=JSON.parse(localStorage.a).industryList;
        let industryStr="";
        industryList.map((num,index)=>{
            industryStr+=num.industryName
        });
        this.state.industryList = industryStr;
        // console.log(industryStr);
        let colums1=this.state.columsn;
        this.state.lineList.map((num,index)=>{
            colums1 = this.state.columsn;
            if (this.state.industry !== '全部' && this.state.industry !== '' && this.state.industryName !== null){
                if(this.state.industry.indexOf(num.key)>-1){
                    colums1.push(num)
                }
            }else {
                if('全部'.indexOf(num.key)!==-1){
                    colums1.push(num)
                }
            }
        });
        this.state.colums1 = colums1;
        this.setState({
            columns: colums1,
        });
        this.fetch1()
    }

    //获取查询条件数据
    receiveData = (data) => {
        this.setState(data)
    };
    fetch1 = () => {
        const date=new Date(this.state.endDate).getTime()-new Date(this.state.startDate).getTime();
        const days=Math.floor(date/(24*3600*1000));
        if(days>31){
            _mm.errorTips("时间间隔不能大于31天");
            return;
        }
        let url = `${Config.REPORT_URL_PREFIX}EvaluateDetail/evaluateStatisticsList1?`
            + `startDate=${this.state.startDate}&endDate=${this.state.endDate}&jdsku=${this.state.jdSku}&pinlei=全部&currentUserId=${this.state.currentUserId}&line=全部`;
        this.store.fetchData1(url);
        this.setState({
            columns: this.state.colums1,
        });
    };
    //发送fetch请求
    fetch = () => {
        const date=new Date(this.state.endDate).getTime()-new Date(this.state.startDate).getTime();
        const days=Math.floor(date/(24*3600*1000));
        if(days>31){
            _mm.errorTips("时间间隔不能大于31天");
            return;
        }
        if (this.state.industry === "" || this.state.industry === null ){
            this.state.industry = "全部"
        }
        let url = `${Config.REPORT_URL_PREFIX}EvaluateDetail/evaluateStatisticsList?`
            + `startDate=${this.state.startDate}&endDate=${this.state.endDate}&jdsku=${this.state.jdSku}&pinlei=${this.state.industry}&currentUserId=${this.state.currentUserId}&line=${this.state.industry}`;
        this.store.fetchData(url);
        this.setState({
            columns: [],
        });
        let colums2 = [];
        this.state.lineList.map((num, index) => {
            if (this.state.industry === '' || this.state.industry == null || this.state.industry === '全部') {
                if ('全部' === num.key ) {
                    colums2.push(num)
                }
            }else {
                if (this.state.industry === encodeURI(num.key)) {
                    colums2.push(num)
                }
            }
        });
        this.setState({
            columns: colums2,
        });
    };
    render() {
        const columns = [
            {
                key: 1,
                title: '总体统计',
                children: [
                    {
                        title: '品类',
                        dataIndex: 'industryName',
                        key: 'industryName',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: 'sku',
                        dataIndex: 'jdsku',
                        key: 'jdsku',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: '好评',
                        dataIndex: 'better',
                        key: 'better',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: '中评',
                        dataIndex: 'middle',
                        key: 'middle',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: '差评',
                        dataIndex: 'worse',
                        key: 'worse',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: '总计',
                        dataIndex: 'totalNum',
                        key: 'totalNum',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: '好评率',
                        dataIndex: 'betterRate',
                        key: 'betterRate',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: '中差评率',
                        dataIndex: 'mwRate',
                        key: 'mwRate',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: '差评率',
                        dataIndex: 'worseRate',
                        key: 'worseRate',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    }]
            }
        ];
        const columns1 = [
            {
                key: 2,
                title: '中差评率TOP10',
                children: [{
                    title: '品类',
                    dataIndex: 'industryName',
                    key: 'industryName',
                    align: 'center',
                    width: 110,
                    render: function (data) {
                        return <span title={data}>{data}</span>;
                    }
                },
                    {
                        title: 'sku',
                        dataIndex: 'jdsku',
                        key: 'jdsku',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    },
                    {
                        title: '中差评率',
                        dataIndex: 'mwRate',
                        key: 'mwRate',
                        align: 'center',
                        width: 110,
                        render: function (data) {
                            return <span title={data}>{data}</span>;
                        }
                    }]
            }
        ];
        return (
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    start={this.state.startDate}
                    pinlei='true'
                    jdSku='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                </ConditionHeader>
                <Table loading={this.store.loading}
                       dataSource={this.store.dataList}
                       style={{marginTop: '20px'}}
                       pagination={{
                           hideOnSinglePage: true, current: this.store.currentPage,
                           onChange: this.store.pageChange
                       }}
                       bordered size='middle' style={{marginTop: '20px'}}
                       columns={columns} rowKey="id"/>
                {/*<br/>*/}
                <Col span={13} className='colStyle'>
                    <Row className='rowStyle'>
                        <span style={{color:'#18AEFF'}} >好评率趋势图</span>
                        <hr color={'#E8E8E8'}/>
                        <Col span={12} style={{position: 'relative'}}>
                            <Spin
                                style={{
                                    display: `${this.store.spinShow}`,
                                    position: 'absolute', zIndex: '10', top: '40%', left: '10%'
                                }}
                                size="large"/>
                            <ResponsiveContainer width='180%' height={550}>
                                <LineChart data={this.store.evalusteLines}
                                           margin={{top: 25, right: 2, left: 2, bottom: 5}}>
                                    <XAxis dataKey="date" height={50} tick={<CustomizedAxisTick/>}>
                                    </XAxis>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip content={<CustomTooltip/>}/>
                                    <Legend/>
                                    {
                                        this.state.columns.map((num,index)=>{
                                              return  num.value
                                        })
                                    }
                                </LineChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                </Col>
                <Col span={10} className='colStyle'>
                    <Table loading={this.store.loading}
                           dataSource={this.store.dataList1}
                           pagination={false}
                           bordered size='middle' style={{marginTop: '20px'}}
                           columns={columns1} rowKey="id"/>
                </Col>
            </div>
        )
    }
}

export default EvaluateStatics;