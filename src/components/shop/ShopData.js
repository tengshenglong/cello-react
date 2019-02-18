import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import {Button, Col, Row, DatePicker, Table, Input, Select,Breadcrumb,List, Card} from 'antd';
import Bread from '../../common/Bread';
import '../../common/css/baseStyle.css';
import Cookies from 'js-cookie';
import ConditionHeader from '../../common/commonComponents/ConditionHeader';
import commonStore from '../../stores/commonStore/commonStore';
import Config from '../../common/Config';
import  MUtil from '../../common/util/mm';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
@inject('store')
@observer
class ShopData extends Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.totalNum='';
        this.store.totalAmount='';
        this.state={
            gmName:'',
            gridName:'',
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            bang:'',
            exclusiveShop:'',
            currentUserId:Cookies.get('username'),
            industry:'',
            largeArea:''
        }
    }
    componentWillMount(){
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
        let url=`${Config.REPORT_URL_PREFIX}shop/shopList?currentUserId=${this.state.currentUserId}&start=${this.state.startDate}&end=${this.state.endDate}`
            +`&bang=${this.state.bang}&exclusiveShop=${this.state.exclusiveShop}&regionName=${this.state.gmName}&industry=${this.state.industry}`
            +`&largeArea=${this.state.largeArea}&gridName=${this.state.gridName}`;
        this.store.fetchData(url,this.state.startDate,this.state.endDate);
    };
    render() {
        const columns = [
            {
                title: '京东订单号',
                align:'center',
                dataIndex: 'jdOrderNo',
                key: 'jdOrderNo',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
            title: '大区',
            dataIndex: 'largeArea',
            key: 'largeArea',
            align:'center',
            width: 80,
            render: function(data) {
                return <span title ={data}>{data}</span>;
            }
        },
            {
                title: '配送中心',
                dataIndex: 'distributeNo',
                key: 'distributeNo',
                align:'center',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },
            {
                title: '工贸',
                dataIndex: 'regionName',
                align:'center',
                key: 'regionName',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },
            {
                title: '网格',
                dataIndex: 'gridName',
                align:'center',
                key: 'gridName',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },
            {
                title: '京东帮',
                dataIndex: 'serviceStore',
                align:'center',
                key: 'serviceStore',
                width: 180,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },        {
            title: '专卖店',
            dataIndex: 'exclusiveShop',
                align:'center',
                key: 'exclusiveShop',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },{
                title: '品牌',
                dataIndex: 'brand',
                align:'center',
                key: 'brand',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },{
                title: '产业',
                dataIndex: 'industry',
                align:'center',
                key: 'industry',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },{
                title: '京东sku',
                dataIndex: 'sku',
                align:'center',
                key: 'sku',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },{
                title: '海尔物料',
                dataIndex: 'matnr',
                align:'center',
                key: 'matnr',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },{
                title: '物料名称',
                dataIndex: 'skuName',
                align:'center',
                key: 'skuName',
                width: 350,
                className:'skuName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        },{
                title: '妥投时间',
                dataIndex: 'warehouseOutTime',
                align:'center',
                key: 'warehouseOutTime',
                width: 120,
                render: function(data) {
                    return <span title ={new moment(data).format("YYYY-MM-DD")}>{new moment(data).format("YYYY-MM-DD")}</span> ;
                }
        },{
                title: '订单时间',
                dataIndex: 'sellDate',
                align:'center',
                key: 'sellDate',
                width: 170,
                render: function(data) {
                    return <span title ={new moment(data).format("YYYY-MM-DD h:mm:ss")}>{new moment(data).format("YYYY-MM-DD h:mm:ss")}</span> ;
                }
        },
        {
            title: '销售数量',
            align:'center',
            dataIndex: 'sellNum',
            key: 'sellNum',
            width: 100,
            render: function(data) {
                return <span title ={data}>{data}</span>;
            }
        }, {
                title: '销售价格',
                align:'center',
                dataIndex: 'price',
                key: 'price',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        }, {
                title: '省',
                align:'center',
                dataIndex: 'province',
                key: 'province',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        }, {
                title: '市',
                align:'center',
                dataIndex: 'city',
                key: 'city',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        }, {
                title: '区',
                align:'center',
                dataIndex: 'county',
                key: 'county',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
        }];
        const data = [
            {
                title: '销售总数',
                value: this.store.totalNum
            },
            {
                title: '销售总额',
                value: this.store.totalAmount
            }
        ];
        let downloadUrl =`${Config.REPORT_URL_PREFIX}shop/excel?currentUserId=${this.state.currentUserId}&start=${this.state.startDate}&end=${this.state.endDate}`
            +`&bang=${this.state.bang}&exclusiveShop=${this.state.exclusiveShop}&regionName=${this.state.gmName}&industry=${this.state.industry}`
            +`&largeArea=${this.state.largeArea}&gridName=${this.state.gridName}`;
        let salt = JSON.parse(localStorage.a).salt.toString();
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader gmName='true'
                             gridName='true'
                             startDate='true'
                             bang='true'
                             exclusiveShop='true'
                             largeArea='true'
                             industry='true'
                             search='true'
                             start={this.state.startDate}//开始时间
                             end={this.state.endDate}//结束时间
                             receiveData={this.receiveData}
                             fetch={this.fetch}>
                {
                    salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} />:''
                }
            </ConditionHeader>
            <div style={{marginTop:'40px'}}>
                <div>
                    <List style={{marginTop:'20px'}}
                          grid={{ gutter: 16, column: 2 }}
                          dataSource={data}
                          renderItem={item => (
                    <List.Item>
                        <Card style={{
                        textAlign:'center'}}
                         title={item.title}>{item.value}</Card>
                    </List.Item>
                )}
                        />
                    <Table loading={this.store.loading}
                           style={{marginTop:'40px'}}
                           pagination={{defaultPageSize:10,current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                           bordered size='middle' dataSource={this.store.dataList}
                           columns={columns} scroll={{ x: 1600 }}/>
                </div>
            </div>
        </div>;
    }
}

ShopData.propTypes = {};

export default ShopData;
