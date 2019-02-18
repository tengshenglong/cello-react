import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Row,Col,Button,Icon,  Table, Popconfirm,Upload, List,Spin, Card} from 'antd';
import {LineChart, Line, XAxis, YAxis,Bar, CartesianGrid,LabelList, Tooltip, Legend,ComposedChart,Area} from 'recharts';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import Cookies from 'js-cookie';
import CustomizedAxisTick from '.././master/CustomizedAxisTick';
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';

import '../../common/css/baseStyle.css';
import '../../common/css/antCardTitle.css';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
import UpLoad from "../../common/commonComponents/UpLoad";

const _mm=new MUtil();
@inject('store')
@observer
class BangTarget extends Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.dataList1=[];
        this.store.spinShow='none';
        this.state = {
            industry : '',
            gmName: '',
            currentUserId:Cookies.get('username'),
            totalReality: 0,
            totalTarget: 0,
            stringData:[],
            fileList: [],
            year:_mm.getCurrentTime('year')

        };

        this.columns = [
            {
                title: '年度',
                dataIndex: 'targetYear',
                key: 'targetYear',
                width: 100,
                align:'center',
                fixed: 'left'
            }, {
                title: '工贸',
                dataIndex: 'regionName',
                key: 'regionName',
                width: 150,
                align:'center',
                fixed: 'left'
            },
            {
                title: '产业',
                dataIndex: 'industry',
                key: 'industry',
                width: 100,
                align:'center',
                fixed: 'left'
            },
            {
                title: '1月实际',
                dataIndex: 'oneReality',
                key: 'oneReality',
                align:'center',
                width: 100
            },
            {
                title: '1月目标',
                dataIndex: 'oneTarget',
                key: 'oneTarget',
                align:'center',
                width: 100
            },{
                title: '1月完成率',
                dataIndex: 'oneRate',
                key: 'oneRate',
                align:'center',
                width: 100,
                render: (text, record) =>(record.oneReality/record.oneTarget*100).toFixed(2) +"%"
            },{
                title: '2月实际',
                dataIndex: 'twoReality',
                key: 'twoReality',
                align:'center',
                width: 100
            },{
                title: '2月目标',
                dataIndex: 'twoTarget',
                key: 'twoTarget',
                align:'center',
                width: 100
            },{
                title: '2月完成率',
                dataIndex: 'twoRate',
                key: 'twoRate',
                align:'center',
                width: 100,
                render: (text, record) => (record.twoReality/record.twoTarget*100).toFixed(2) +"%"
            },{
                title: '3月实际',
                dataIndex: 'threeReality',
                align:'center',
                key: 'threeReality',
                width: 100
            },{
                title: '3月目标',
                dataIndex: 'threeTarget',
                align:'center',
                key: 'threeTarget',
                width: 100
            },{
                title: '3月完成率',
                dataIndex: 'threeRate',
                key: 'threeRate',
                align:'center',
                width: 100,
                render: (text, record) => (record.threeReality/record.threeTarget*100).toFixed(2) +"%"
            },{
                title: '4月实际',
                dataIndex: 'fourReality',
                key: 'fourReality',
                align:'center',
                width: 100
            },{
                title: '4月目标',
                dataIndex: 'fourTarget',
                key: 'fourTarget',
                align:'center',
                width: 100
            },{
                title: '4月完成率',
                dataIndex: 'fourRate',
                key: 'fourRate',
                align:'center',
                width: 100,
                render: (text, record) => (record.fourReality/record.fourTarget*100).toFixed(2) +"%"
            },{
                title: '5月实际',
                dataIndex: 'fiveReality',
                key: 'fiveReality',
                align:'center',
                width: 100
            },{
                title: '5月目标',
                dataIndex: 'fiveTarget',
                key: 'fiveTarget',
                align:'center',
                width: 100
            },{
                title: '5月完成率',
                dataIndex: 'fiveRate',
                key: 'fiveRate',
                align:'center',
                width: 100,
                render: (text, record) => (record.fiveReality/record.fiveTarget*100).toFixed(2) +"%"
            },{
                title: '6月实际',
                dataIndex: 'sixReality',
                key: 'sixReality',
                align:'center',
                width: 100
            },{
                title: '6月目标',
                dataIndex: 'sixTarget',
                key: 'sixTarget',
                align:'center',
                width: 100
            },{
                title: '6月完成率',
                dataIndex: 'sixRate',
                key: 'sixRate',
                align:'center',
                width: 100,
                render: (text, record) => (record.sixReality/record.sixTarget*100).toFixed(2) +"%"
            },{
                title: '7月实际',
                dataIndex: 'sevenReality',
                key: 'sevenReality',
                align:'center',
                width: 100
            },{
                title: '7月目标',
                dataIndex: 'sevenTarget',
                key: 'sevenTarget',
                align:'center',
                width: 100
            },{
                title: '7月完成率',
                dataIndex: 'sevenRate',
                key: 'sevenRate',
                align:'center',
                width: 100,
                render: (text, record) => (record.sevenReality/record.sevenTarget*100).toFixed(2) +"%"
            },{
                title: '8月实际',
                dataIndex: 'eightReality',
                key: 'eightReality',
                align:'center',
                width: 100
            },{
                title: '8月目标',
                dataIndex: 'eightTarget',
                key: 'eightTarget',
                align:'center',
                width: 100
            },{
                title: '8月完成率',
                dataIndex: 'eightRate',
                key: 'eightRate',
                align:'center',
                width: 100,
                render: (text, record) => (record.eightReality/record.eightTarget*100).toFixed(2)+"%"
            },{
                title: '9月实际',
                dataIndex: 'nineReality',
                key: 'nineReality',
                align:'center',
                width: 100
            },{
                title: '9月目标',
                dataIndex: 'nineTarget',
                key: 'nineTarget',
                align:'center',
                width: 100
            },{
                title: '9月完成率',
                dataIndex: 'nineRate',
                key: 'nineRate',
                align:'center',
                width: 100,
                render: (text, record) => (record.nineReality/record.nineTarget*100).toFixed(2) +"%"
            },{
                title: '10月实际',
                dataIndex: 'tenReality',
                key: 'tenReality',
                align:'center',
                width: 100
            },{
                title: '10月目标',
                dataIndex: 'tenTarget',
                key: 'tenTarget',
                align:'center',
                width: 100
            },{
                title: '10月完成率',
                dataIndex: 'tenRate',
                key: 'tenRate',
                align:'center',
                width: 120,
                render: (text, record) => (record.tenReality/record.tenTarget*100).toFixed(2) +"%"
            },{
                title: '11月实际',
                dataIndex: 'elevenReality',
                key: 'elevenReality',
                align:'center',
                width: 100
            },{
                title: '11月目标',
                dataIndex: 'elevenTarget',
                key: 'elevenTarget',
                align:'center',
                width: 100
            },{
                title: '11月完成率',
                dataIndex: 'elevenRate',
                key: 'elevenRate',
                align:'center',
                width: 120,
                render: (text, record) => (record.elevenReality/record.elevenTarget*100).toFixed(2) +"%"
            },{
                title: '12月实际',
                dataIndex: 'twelveReality',
                key: 'twelveReality',
                align:'center',
                width: 100
            },{
                title: '12月目标',
                dataIndex: 'twelveTarget',
                key: 'twelveTarget',
                align:'center',
                width: 100
            },{
                title: '12月完成率',
                dataIndex: 'twelveRate',
                key: 'twelveRate',
                align:'center',
                width: 120,
                render: (text, record) => (record.twelveReality/record.twelveTarget*100).toFixed(2) +"%"
            }
        ];

    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.fetch();
    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        let url = Config.REPORT_URL_PREFIX+'bangTarget/list?currentUserId='+this.state.currentUserId +
            '&targetYear='+this.state.year +'&regionName=' + this.state.gmName+
            '&industry=' + this.state.industry;
        this.store.fetchData(url);
    };
    render() {
        let salt = JSON.parse(localStorage.a).salt.toString();
        let downloadUrl =Config.REPORT_URL_PREFIX+'bangTarget/excel?currentUserId='+this.state.currentUserId +
            '&targetYear='+this.state.year +'&regionName=' + this.state.gmName+
            '&industry=' + this.state.industry;
        let uploadUrl =`${Config.REPORT_URL_PREFIX}bangTarget/excelUp`;
        let templateDown =`${Config.REPORT_URL_PREFIX}bangTarget/mould`;

        const data = [
            {
                title: '整体实际',
                value: this.store.totalReality
            },
            {
                title: '整体目标',
                value: this.store.totalTarget
            },
            {
                title: '整体完成率',
                value: this.store.totalTarget!=0 || ""?((this.store.totalReality/this.store.totalTarget*100).toFixed(2)+'%'):''

            }
        ];
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                year='true'
                industry='true'
                gmName='true'
                receiveData={this.receiveData}
                fetch={this.fetch}>
                {
                    salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} />:''
                }
            </ConditionHeader>

            {
                salt.indexOf('W')!==-1 ?  <Row  style={{marginTop:'40px'}} className='rowStyle' type="flex" justify="start">
                    <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6}  />
                    <DownloadComponent downLoadUrl={templateDown} buttonName={'模版下载'} spanSize={6} />
                </Row> :''
            }

            <List style={{marginTop:'20px'}}
                grid={{ gutter: 15, column: 3 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card style={{
                        textAlign:'center'}}
                         title={item.title}>{item.value}</Card>
                    </List.Item>
                )}
                />
            <div style={{border:'2px solid #E8E8E8'}}>
                <div className='PvChart' style={{marginTop:'20px',position:'relative'}}>
                    <Spin style={{display:`${this.store.spinShow}`,position:'absolute',zIndex:'10',top:'40%',left:'50%'}} size="large" />
                    <ComposedChart width={1200} height={450} data={this.store.dataList1}
                                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick/>} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar dataKey="target" name="目标" barSize={20} fill="#413ea0" />
                        <Line type="monotone" name="实际" dataKey="reality" stroke="#ff7300" />
                        <Area type="rate" name="实际/目标" style={{display:'none'}} dataKey="rate" fill="#8884d8" stroke="#8884d8" />
                    </ComposedChart>
                </div>
            </div>
            <div style={{marginTop:'20px'}}>
                <div>
                    <Table loading={this.store.loading}
                           pagination={{ current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                           size='middle'  bordered
                           dataSource={this.store.dataList}
                           columns={this.columns}   scroll={{ x: 4000 }}/>
                </div>
            </div>

        </div>;
    }
}
BangTarget.propTypes = {};

export default BangTarget;