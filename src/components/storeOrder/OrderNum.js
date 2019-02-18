/**
 * Created by guotaidou on 2018/6/22.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import Cookies from 'js-cookie';
import { Table,List, Card } from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import AlertInfo from '../../common/commonComponents/AlertInfo';//提示信息组件
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
@inject('store')
@observer
class OrderNum extends Component{
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.totalNum='';
        this.store.totalPrice='';
        this.state={
            tgNum:0,//套购数
            orderMoney:0,//订单金额
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            totalNum:'',
            totalPrice:'',
            pageSize:10,
            total:'',
            currentPage:1,
            ecology:'全部'
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
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url =`${Config.REPORT_URL_PREFIX}order-store/orderStoreList?startDate=${this.state.startDate}&endDate=${this.state.endDate}&num=${this.state.tgNum}&sum=${this.state.orderMoney}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}&ecology=${this.state.ecology}`;
            this.store.fetchData(url);
            this.store.ecology = this.state.ecology;
        });
    };
    //发送fetch请求
    fetch=()=>{
        this.store.dataList = null;
        this.store.totalElement = 0;
        this.store.totalNum = '';
        this.store.totalPrice = '';
        this.state.currentPage = 1;
        let url =`${Config.REPORT_URL_PREFIX}order-store/orderStoreList?startDate=${this.state.startDate}&endDate=${this.state.endDate}&num=${this.state.tgNum}&sum=${this.state.orderMoney}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}&ecology=${this.state.ecology}`;
        this.store.fetchData(url);
        this.store.ecology = this.state.ecology;
    };
    render(){
        const column=[
            {
                title: '生态',
                align:'center',
                render: () => {
                    return <span>{decodeURI(this.store.ecology)}</span>
                }
            },
            {
                title: '订单号',
                dataIndex: 'sourceSn',
                key: 'sourceSn',
                align:'center'
            },
            {
                title: '套购数',
                dataIndex: 'num',
                key: 'num',
                align:'center'
            },
            {
                title: '订单金额',
                dataIndex: 'price',
                key: 'price',
                align:'center'
            }
        ];
        const data = [
            {
                title: '套购订单总数',
                value:this.store.totalNum
            },
            {
                title: '订单总金额',
                value: this.store.totalPrice
            }
        ];
        let downloadUrl=`${Config.REPORT_URL_PREFIX}order-store/excelDownload?startDate=${this.state.startDate}&endDate=${this.state.endDate}&num=${this.state.tgNum}&sum=${this.state.orderMoney}&ecology=${this.state.ecology}`;
        let salt = JSON.parse(localStorage.a).salt.toString();
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    tgNum='true'
                    orderMoney='true'
                    ecology='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} startDate={this.state.startDate} endDate={this.state.endDate} buttonName={'下载'} downStyle={{marginBottom:-10}}/>:''
                    }
                </ConditionHeader>
                <AlertInfo info='本页面数据时间统计维度为京东订单时间，请知悉！' />
                <List style={{marginTop:'20px'}}
                      grid={{ gutter: 8, column: 2 }}
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
                       rowClassName='JAgeOther'
                       style={{marginTop:'20px'}}
                       pagination={{pageSize:this.state.pageSize,hideOnSinglePage:true,current:this.state.currentPage,
                           total:this.store.totalNum,onChange:this.pageChange}}
                       bordered size='middle' columns={column}
                       dataSource={this.store.dataList} />
            </div>
        )
    }
}
export default OrderNum;


