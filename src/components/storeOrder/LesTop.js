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
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
@inject('store')
@observer
class LesTop extends Component{
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state={
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            currentUserId:Cookies.get('username'),//用户ID
            industry:'',
            matnrData:'',
            city:'',
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
        let url =`${Config.REPORT_URL_PREFIX}order-store/findIndustAndCityByMatCode?`
            +`startDate=${this.state.startDate}&endDate=${this.state.endDate}&`
            +`industry=${this.state.industry}&cityName=${this.state.city}&matCode=${this.state.matnrData}`
            +`&currentUserId=${this.state.currentUserId}&ecology=${this.state.ecology}`;
        this.state.zecology = this.state.ecology;
        this.store.fetchData(url);
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
                title: '产业',
                dataIndex: 'industryName',
                key: 'industryName',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '城市',
                dataIndex: 'cityName',
                key: 'cityName',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '物料',
                dataIndex: 'matCode',
                key: 'matCode',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '型号',
                dataIndex: 'matName',
                key: 'matName',
                align:'center',
                width:200,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
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
        let downloadUrl =`${Config.REPORT_URL_PREFIX}order-store/downLoadIndustAndCityByMatCode?`
            +`startDate=${this.state.startDate}&endDate=${this.state.endDate}&`
            +`industry=${this.state.industry}&cityName=${this.state.city}&matCode=${this.state.matnrData}`
            +`&currentUserId=${this.state.currentUserId}&ecology=${this.state.ecology}`;
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    city='true'
                    matnrList='true'
                    industry='true'
                    ecology='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} startDate={this.state.startDate} endDate={this.state.endDate} buttonName={'下载'} />:''
                    }
                </ConditionHeader>
                <Table loading={this.store.loading}
                       style={{marginTop:'20px'}}
                       pagination={{hideOnSinglePage:true,current:this.store.currentPage,
                       onChange:this.store.pageChange}}
                       bordered size='middle' columns={column}
                       dataSource={this.store.dataList} scroll={{ x: 0 }} />
            </div>
        )
    }
}
export default LesTop;
