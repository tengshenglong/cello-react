
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import {Button, Col, DatePicker, Row, Select, Upload,Icon,Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import ConditionHeader from '../../common/commonComponents/ConditionHeader';
import ModalComponent from "../../common/commonComponents/ModalComponent";
import Cookies from "js-cookie";
import Config from "../../common/Config";
import MUtil from "../../common/util/mm";
import GridData from './GridData.js';
import commonStore from '../../stores/commonStore/commonStore';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";

const _mm=new MUtil();

@inject('store')
@observer
class RegionGrid extends Component{
    constructor(props){
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state={
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            currentUserId:Cookies.get('username'),//用户ID
            industry:'',
            region:'',
            gridName:'',
            visible: false
        };
        super();
    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
    }
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
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        let url =`${Config.REPORT_URL_PREFIX}regionGrid/list?`
            +`startTime=${this.state.startDate}&endTime=${this.state.endDate}&industry=${this.state.industry}`
            +`&regionName=${this.state.region}&gridName=${this.state.gridName}&currentUserId=${this.state.currentUserId}`;
        this.store.fetchData(url);
    };
    render(){
        let downloadUrl =`${Config.REPORT_URL_PREFIX}regionGrid/download?`
            +`startTime=${this.state.startDate}&endTime=${this.state.endDate}&industry=${this.state.industry}`
            +`&regionName=${this.state.region}&gridName=${this.state.gridName}&currentUserId=${this.state.currentUserId}`;
        const column=[
            {
                title: '工贸',
                dataIndex: 'region',
                key: 'region',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '网格',
                dataIndex: 'gridName',
                key: 'gridName',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '产业',
                dataIndex: 'industry',
                key: 'industry',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '实际零售金额',
                dataIndex: 'price',
                key: 'price',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '同期零售金额',
                dataIndex: 'tprice',
                key: 'tprice',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '同比增幅',
                dataIndex: 'priceAmp',
                key: 'priceAmp',
                align:'center',
                render: function(data) {
                    return  <span style={{color:parseFloat(data)>=0?'':'red'}} title ={data}>{data}</span>;
                }
            },{
                title: '实际销售数量',
                dataIndex: 'num',
                key: 'num',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '同期销售数量',
                dataIndex: 'tnum',
                key: 'tnum',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '同比增幅',
                dataIndex: 'numAmp',
                key: 'numAmp',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }

        ];
        let salt = JSON.parse(localStorage.a).salt.toString();
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    regionList='true'
                    gridName='true'
                    industry='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} />:''
                    }
                </ConditionHeader>
                {
                    salt.indexOf('W')!==-1 ?  <Button style={{marginTop:'20px'}} type="primary" onClick={this.showModal}>网格详情</Button>:''
                }
                <ModalComponent visible={this.state.visible}
                                modalTitle='网格详情'
                                hide={this.hideModal}>
                    <GridData></GridData>
                </ModalComponent>
                <Table loading={this.store.loading} style={{marginTop:'20px'}}
                       pagination={{hideOnSinglePage:true,
                           current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                       bordered size='middle' columns={column} dataSource={this.store.dataList} />
            </div>
        )
    }
}
export default RegionGrid;