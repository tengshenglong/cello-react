/**
 * Created by guotaidou on 2018/6/15.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import Cookies from 'js-cookie';
import { Table } from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import AlertInfo from '../../common/commonComponents/AlertInfo';//提示信息组件
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import {message} from "antd/lib/index";
import {Button, Col, Row, DatePicker, Upload, Icon,Alert, Popconfirm} from 'antd';
import commonStore from '../../stores/commonStore/commonStore';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
import UpLoad from "../../common/commonComponents/UpLoad";
import RangeDateDel from "../../common/commonComponents/RangeDateDel";

const _mm=new MUtil();
@inject('store')
@observer
class ListExport extends Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state={
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            fileList: [],
            invsort:'',//产品组
            jdOrderNum:'',//京东订单号
            matnr:'',//物料编码
            orderType:'',//订单类型
            currentUserId:Cookies.get('username'),//用户id
            deleteStart:'',
            deleteEnd:''
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
        let url=`${Config.REPORT_URL_PREFIX}order-store/detail?currentUserId=${this.state.currentUserId}`
            +`&start=${this.state.startDate}&end=${this.state.endDate}`
            +`&invsort=${this.state.invsort}&matnr=${this.state.matnr}`
            +`&orderType=${this.state.orderType}&sourceSn=${this.state.jdOrderNum}`;
        this.store.fetchData(url,this.state.startDate,this.state.endDate);
    };
    render(){
        //table表头文字
        const columns = [
            {
                title: '京东订单号',
                dataIndex: 'sourceSn',
                key: 'sourceSn',
                align:'center',
                width: 110,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '京东订单行号',
                dataIndex: 'orderItem',
                key: 'orderItem',
                align:'center',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '主/帮',
                dataIndex: 'orderFlagType',
                align:'center',
                key: 'orderFlagType',
                width: 150,
                render:function(data){
                    if (data==1){
                        return  <span title ="主站">主站</span>;
                    }else{
                        return  <span title ="京东帮">京东帮</span>;
                    }
                }
            },
            {
                title: '送达方名称',
                dataIndex: 'arrivedOrgName',
                align:'center',
                key: 'arrivedOrgName',
                width: 180,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },        {
                title: '用户状态',
                dataIndex: 'milestoneName',
                align:'center',
                key: 'milestoneName',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '物料编码',
                dataIndex: 'matCode',
                align:'center',
                key: 'matCode',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '型号描述',
                dataIndex: 'matName',
                align:'center',
                key: 'matName',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '售达方编码',
                dataIndex: 'operationCenterCode',
                align:'center',
                key: 'operationCenterCode',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '售达方名称',
                dataIndex: 'operationCenterName',
                align:'center',
                key: 'operationCenterName',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '记录创建时间',
                dataIndex: 'gmtCreate',
                align:'center',
                key: 'gmtCreate',
                width: 170,
                render: function(data) {
                    return <span title ={new moment(data).format("YYYY-MM-DD HH:mm:ss")}>{new moment(data).format("YYYY-MM-DD HH:mm:ss")}</span> ;
                }
            },{
                title: '纪录更新时间',
                dataIndex: 'lastUpdateTime',
                align:'center',
                key: 'lastUpdateTime',
                width: 170,
                render: function(data) {
                    return <span title ={new moment(data).format("YYYY-MM-DD HH:mm:ss")}>{new moment(data).format("YYYY-MM-DD HH:mm:ss")}</span> ;
                }
            },
            {
                title: '提货单号',
                align:'center',
                dataIndex: 'orderNo',
                key: 'orderNo',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '订单数量',
                align:'center',
                dataIndex: 'orderAmt',
                key: 'orderAmt',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
             {
                title: '库存地点',
                align:'center',
                dataIndex: 'location',
                key: 'location',
                width: 100,
                 render: function(data) {
                     return <span title ={data}>{data}</span>;
                 }
            },
             {
                title: '收货人',
                align:'center',
                dataIndex: 'personName',
                key: 'personName',
                width: 100,
                 render: function(data) {
                     return <span title ={data}>{data}</span>;
                 }
            },
             {
                title: '收货地址',
                align:'center',
                dataIndex: 'personAddress',
                key: 'personAddress',
                width: 200,
                 render: function(data) {
                     return <span title ={data}>{data}</span>;
                 }
            },
             {
                title: '京东订单时间',
                align:'center',
                dataIndex: 'orderDate',
                key: 'orderDate',
                width: 170,
                 render: function(data) {
                     return <span title ={new moment(data).format("YYYY-MM-DD HH:mm:ss")}>{new moment(data).format("YYYY-MM-DD HH:mm:ss")}</span> ;
                 }
            },
             {
                title: '来源公司(系统)编码',
                align:'center',
                dataIndex: 'source',
                key: 'source',
                width: 160,
                 render: function(data) {
                     return <span title ={data}>{data}</span>;
                 }
            }
        ];
        //下载地址
        let downloadUrl=`${Config.REPORT_URL_PREFIX}order-store/export/detail?currentUserId=${this.state.currentUserId}`
            +`&start=${this.state.startDate}&end=${this.state.endDate}`
            +`&invsort=${this.state.invsort}&matnr=${this.state.matnr}`
            +`&orderType=${this.state.orderType}&sourceSn=${this.state.jdOrderNum}`;
        let uploadUrl=`${Config.REPORT_URL_PREFIX}les/excelUp`;
        let templateDown=`${Config.REPORT_URL_PREFIX}les/mould`;
        let delUrl=`${Config.REPORT_URL_PREFIX}les/deleteByOpDate`;
        let salt = JSON.parse(localStorage.a).salt.toString();
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    invsort='true'
                    matnr='true'
                    jdOrderNum='true'
                    orderType='true'
                    start={this.state.startDate}//开始时间
                    end={this.state.endDate}//结束时间
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} downStyle={{marginBottom:-10}}/>:''
                    }
                </ConditionHeader>
                {salt.indexOf('W')!==-1?<Row className='rowStyle' type="flex" justify="start" style={{marginTop: '20px',borderBottom: '3px solid #F0F2F5'}}>
                    <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6} upStyle={{marginTop:15}} />
                    <DownloadComponent downLoadUrl={templateDown} buttonName={'模版下载'} spanSize={6} downStyle={{marginTop:15}}/>
                    <RangeDateDel promptMsg={'将会按照创建日期删除！'} buttonName={'删除'} delUrl={delUrl} spanSize={12}/>
                </Row>:''}
                <AlertInfo/>
                <Table loading={this.store.loading}
                       dataSource={this.store.dataList}
                       pagination={{ current:this.store.currentPage,
                       onChange:this.store.pageChange}}
                       pagination={{defaultPageSize:10}}
                       bordered size='middle'
                       style={{marginTop:'20px'}}
                       columns={columns}
                       scroll={{ x: 1600 }}/>
            </div>
        )
    }
}
export default ListExport;
