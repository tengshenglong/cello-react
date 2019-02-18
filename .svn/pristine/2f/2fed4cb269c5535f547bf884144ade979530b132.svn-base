/**
 * Created by guotaidou on 2018/7/10.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Col, Row,  Table,Breadcrumb,Upload,Icon,Select,Input,DatePicker } from 'antd';
import '../../common/css/baseStyle.css';
import moment from 'moment';
import '../../common/css/antCardTitle.css';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import {message} from "antd/lib/index";
import Cookies from "js-cookie";
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
@inject('store')
@observer
class SaleStatistic extends Component{
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state = {
            month:_mm.getCurrentTime('month').format('YYYY-MM'),
            gmName:'',
            x:{x:0},
            currentUserId:Cookies.get('username'),
            columns:[
                {
                    fixed:'left',
                    title: '工贸',
                    dataIndex: 'regionName',
                    align:'center',
                    key: 'regionName',
                    width:100,
                    render: function(data) {
                        return <span title ={data}>{data}</span>;
                    }
                },{
                    key:1,
                    title: '总计',
                    children: [{
                        title: '同期',
                        dataIndex: 'totaltq',
                        align:'center',
                        key: 'totaltq',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '目标',
                        dataIndex: 'totaltarget',
                        align:'center',
                        key: 'totaltarget',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '销售金额',
                        dataIndex: 'totalreality',
                        align:'center',
                        key: 'totalreality',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '增幅',
                        dataIndex: 'totalamp',
                        align:'center',
                        key: 'totalamp',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '完成率',
                        dataIndex: 'totalfinsh',
                        align:'center',
                        key: 'totalfinsh',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                }
            ],
            columnsList:[
                {
                    key:2,
                    title: '冰箱',
                    children: [{
                        title: '同期',
                        dataIndex: 'bxtq',
                        align:'center',
                        key: 'bxtq',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '目标',
                        dataIndex: 'bxtarget',
                        align:'center',
                        key: 'bxtarget',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '销售金额',
                        dataIndex: 'bxreality',
                        align:'center',
                        key: 'bxreality',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '增幅',
                        dataIndex: 'bxamp',
                        align:'center',
                        key: 'bxamp',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '完成率',
                        dataIndex: 'bxfinsh',
                        align:'center',
                        key: 'bxfinsh',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                },{
                    key:3,
                    title: '洗衣机',
                    children: [{
                        title: '同期',
                        dataIndex: 'xyjtq',
                        align:'center',
                        key: 'xyjtq',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '目标',
                        dataIndex: 'xyjtarget',
                        align:'center',
                        key: 'xyjtarget',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '销售金额',
                        dataIndex: 'xyjreality',
                        align:'center',
                        key: 'xyjreality',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '增幅',
                        dataIndex: 'xyjamp',
                        align:'center',
                        key: 'xyjamp',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '完成率',
                        dataIndex: 'xyjfinsh',
                        align:'center',
                        key: 'xyjfinsh',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                },{
                    key:4,
                    title: '冷柜',
                    children: [{
                        title: '同期',
                        dataIndex: 'lgtq',
                        align:'center',
                        key: 'lgtq',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '目标',
                        dataIndex: 'lgtarget',
                        align:'center',
                        key: 'lgtarget',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '销售金额',
                        dataIndex: 'lgreality',
                        align:'center',
                        key: 'lgreality',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '增幅',
                        dataIndex: 'lgamp',
                        align:'center',
                        key: 'lgamp',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '完成率',
                        dataIndex: 'lgfinsh',
                        align:'center',
                        key: 'lgfinsh',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                },{
                    key:5,
                    title: '空调',
                    children: [{
                        title: '同期',
                        dataIndex: 'kttq',
                        align:'center',
                        key: 'kttq',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '目标',
                        dataIndex: 'kttarget',
                        align:'center',
                        key: 'kttarget',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '销售金额',
                        dataIndex: 'ktreality',
                        align:'center',
                        key: 'ktreality',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '增幅',
                        dataIndex: 'ktamp',
                        align:'center',
                        key: 'ktamp',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '完成率',
                        dataIndex: 'ktfinsh',
                        align:'center',
                        key: 'ktfinsh',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                },{
                    key:6,
                    title: '热水器',
                    children: [{
                        title: '同期',
                        dataIndex: 'rsqtq',
                        align:'center',
                        key: 'rsqtq',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '目标',
                        dataIndex: 'rsqtarget',
                        align:'center',
                        key: 'rsqtarget',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '销售金额',
                        dataIndex: 'rsqreality',
                        align:'center',
                        key: 'rsqreality',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '增幅',
                        dataIndex: 'rsqamp',
                        align:'center',
                        key: 'rsqamp',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '完成率',
                        dataIndex: 'rsqfinsh',
                        align:'center',
                        key: 'rsqfinsh',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                },{
                    key:7,
                    title: '厨电',
                    children: [{
                        title: '同期',
                        dataIndex: 'cdtq',
                        align:'center',
                        key: 'cdtq',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '目标',
                        dataIndex: 'cdtarget',
                        align:'center',
                        key: 'cdtarget',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '销售金额',
                        dataIndex: 'cdreality',
                        align:'center',
                        key: 'cdreality',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '增幅',
                        dataIndex: 'cdamp',
                        align:'center',
                        key: 'cdamp',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '完成率',
                        dataIndex: 'cdfinsh',
                        align:'center',
                        key: 'cdfinsh',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                },{
                    key:8,
                    title: '彩电',
                    children: [{
                        title: '同期',
                        dataIndex: 'dstq',
                        align:'center',
                        key: 'dstq',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '目标',
                        dataIndex: 'dstarget',
                        align:'center',
                        key: 'dstarget',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '销售金额',
                        dataIndex: 'dsreality',
                        align:'center',
                        key: 'dsreality',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '增幅',
                        dataIndex: 'dsamp',
                        align:'center',
                        key: 'dsamp',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '完成率',
                        dataIndex: 'dsfinsh',
                        align:'center',
                        key: 'dsfinsh',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                }
            ]
        };
    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let industryList=JSON.parse(localStorage.a).industryList;
        let industryStr="";
        industryList.map((num,index)=>{
            industryStr+=num.industryName
        });
        let colums1=this.state.columns;
        this.state.columnsList.map((num,index)=>{
            if(industryStr.indexOf(num.title)!==-1){
                colums1.push(num)
            }
        });
        let x = {x:0};
        if(colums1.length>3){
            x = {x:4000}
        }
        this.setState({
            columns: colums1,
            x:x
        });
    }

    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        let url = Config.REPORT_URL_PREFIX +
            `jdSaleData/list?targetYear=${this.state.month}&regionName=${this.state.gmName}&currentUserId=${this.state.currentUserId}`;
        this.store.fetchData(url);
    };
    render(){
        let salt = JSON.parse(localStorage.a).salt.toString();
        let downloadUrl =`${Config.REPORT_URL_PREFIX}jdSaleData/report?`
        +`targetYear=${this.state.month}&regionName=${this.state.gmName}&currentUserId=${this.state.currentUserId}`;
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    month='true'
                    gmName='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'}/>:''
                    }
                </ConditionHeader>
                <div style={{marginTop: '20px'}}>
                    <Table loading={this.store.loading} size='middle' bordered dataSource={this.store.dataList}
                           columns={this.state.columns}
                           pagination={{hideOnSinglePage:true,pageSize:10,current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                           scroll={this.state.x}/>
                </div>
            </div>
        )
    }
}
export default SaleStatistic;
