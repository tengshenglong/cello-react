import React from "react";
import {inject, observer} from 'mobx-react';
import { Table, Popconfirm} from 'antd';
import moment from 'moment';
import Cookies from 'js-cookie';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import '../../common/css/baseStyle.css';
import '../../common/css/OrderChoice.css';
const _mm=new MUtil();
let dateFormat='YYYY-MM-DD';
class OrderChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: {
                spinning: false,
                size: 'large'
            },
            dataList:[],
            matnr: "",//物料编码
            status: "",//状态信息
            year: _mm.getCurrentTime('year'),//年
            week: '',//周
            storeName: '',//库位名称
            industry: '',//产业信息
            stockOrderNumber:'',//备货单号
            pageSize:10,
            total:'',
            currentPage:1,
            currentUserId:Cookies.get('username')//用户id
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
        let url = `${Config.REPORT_URL_PREFIX}choice/list?currentUserId=${this.state.currentUserId}&year=${this.state.year}&productCode=${this.state.matnr}&status=${this.state.status}&week=${this.state.week}&storeName=${this.state.storeName}&industry=${this.state.industry}&stockOrderNumber=${this.state.stockOrderNumber}`;
        url+=`&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
        this.setState({currentPage:1},function(){
            this.fetchData(url);
        });
    };

    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url = `${Config.REPORT_URL_PREFIX}choice/list?currentUserId=${this.state.currentUserId}&year=${this.state.year}&productCode=${this.state.matnr}&status=${this.state.status}&week=${this.state.week}&storeName=${this.state.storeName}&industry=${this.state.industry}&stockOrderNumber=${this.state.stockOrderNumber}`;
            url+=`&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
            this.fetchData(url);
        });
    };
    fetchData = (url) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.setState({
            loading: {
                spinning: true,
                size: 'large'
            }
        });
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if(data.content.length==0){
                    _mm.errorTips('没有数据');
                    this.setState({
                        loading: {
                            spinning: false,
                            size: 'large'
                        },
                        dataList:[],
                        total:''
                    });
                }else {
                    this.setState({
                        dataList:data.content,
                        loading: {
                            spinning: false,
                            size: 'large'
                        },
                        total:data.totalElements
                    })
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
                this.setState({
                    loading: {
                        spinning: false,
                        size: 'large'
                    }
                });
            });
    };
    queryStatus(key,index) {
        let api = Config.REPORT_URL_PREFIX+'choice/queryStatus?custOrderCode=' + key;
        fetch(api).then(result => result.json()).then(data => {
            if (data.flag) {
                _mm.errorTips(data.message);
                this.pageChange(this.state.currentPage,this.state.pageSize);
            }else{
                _mm.errorTips(data.message);
            }

        });
    }
    render() {
        let columns = [
            {
                title: '到货年',
                dataIndex: 'orderRevYear',
                align:'center',
                key: 'orderRevYear',
                width: 100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },  {
                title: '到货周',
                dataIndex: 'orderRevWeekNumber',
                align:'center',
                key: 'orderRevWeekNumber',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '日日顺库位名称',
                dataIndex: 'rrsStoreName',
                align:'center',
                key: 'rrsStoreName',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '物料编码',
                dataIndex: 'productCode',
                align:'center',
                key: 'productCode',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '物料名称',
                dataIndex: 'productName',
                align:'center',
                key: 'productName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '品牌编码',
                dataIndex: 'proBand',
                align:'center',
                key: 'proBand',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '产业',
                dataIndex: 'productLineName',
                align:'center',
                key: 'productLineName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },  {
                title: '订单数量',
                dataIndex: 'orderQty',
                align:'center',
                key: 'orderQty',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '状态名称',
                dataIndex: 'statusTypeName',
                align:'center',
                key: 'statusTypeName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '最晚到货时间',
                dataIndex: 'commitmentRevDate',
                key: 'commitmentRevDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{data===null?"":new moment(new Date(data)).format(dateFormat)}</span> ;
                }
            },  {
                title: '计划发货日期',
                dataIndex: 'planSendDate',
                key: 'planSendDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{data===null?"":new moment(new Date(data)).format(dateFormat)}</span> ;
                }
            },  {
                title: '承诺到货日期',
                dataIndex: 'planCustRevDate',
                key: 'planCustRevDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{data===null?"":new moment(new Date(data)).format(dateFormat)}</span> ;
                }
            },  {
                title: '实际发货日期',
                dataIndex: 'custSendDate',
                key: 'custSendDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{data===null?"":new moment(new Date(data)).format(dateFormat)}</span> ;
                }
            },  {
                title: '预计到货日期',
                dataIndex: 'expectReciveDate',
                key: 'expectReciveDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{data===null?"":new moment(new Date(data)).format(dateFormat)}</span> ;

                }
            },  {
                title: '工贸收货日期',
                dataIndex: 'transitArrivalDate',
                key: 'transitArrivalDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{data===null?"":new moment(new Date(data)).format(dateFormat)}</span> ;
                }
            },  {
                title: '工贸发货日期',
                dataIndex: 'tradeSendDate',
                key: 'tradeSendDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{data===null?"":new moment(new Date(data)).format(dateFormat)}</span> ;

                }
            },
            {
                title: '客户签收日期',
                dataIndex: 'signDate',
                key: 'signDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{data===null?"":new moment(new Date(data)).format(dateFormat)}</span> ;
                }
            },{
                title: '返单日期',
                dataIndex: 'podDate',
                key: 'podDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":data.substring(0,4)+"-"+data.substring(4,6)+"-"+data.substring(6,9)}>{data===null?"":data.substring(0,4)+"-"+data.substring(4,6)+"-"+data.substring(6,9)}</span>;
                }
            },{
                title: 'DN号',
                dataIndex: 'gvsDn1',
                key: 'gvsDn1',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: 'GVS订单号',
                dataIndex: 'gvsOrderCode',
                key: 'gvsOrderCode',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '客户订单号',
                dataIndex: 'custOrderCode',
                key: 'custOrderCode',
                align:'center',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '客户订单明细号',
                dataIndex: 'custPoDetailCode',
                align:'center',
                key: 'custPoDetailCode',
                width: 150,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: 'OMS单号',
                dataIndex: 'soCode',
                align:'center',
                key: 'soCode',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '行项目号',
                dataIndex: 'detailCode',
                align:'center',
                key: 'detailCode',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },  {
                title: '客户名称',
                dataIndex: 'custName',
                align:'center',
                key: 'custName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },  {
                title: '送达方名称',
                dataIndex: 'shipToPartyName',
                align:'center',
                key: 'shipToPartyName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },  {
                title: '订单类型名称',
                dataIndex: 'orderTypeName',
                align:'center',
                key: 'orderTypeName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },  {
                title: '总金额',
                dataIndex: 'totalAmount',
                align:'center',
                key: 'totalAmount',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },    {
                title: '产品系列名称',
                dataIndex: 'prodSeriesName',
                align:'center',
                key: 'prodSeriesName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },  {
                title: '运单号',
                dataIndex: 'transitCode',
                key: 'transitCode',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '事业部发货工厂名称',
                dataIndex: 'madeFectoryName',
                key: 'madeFectoryName',
                align:'center',
                width: 200,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '事业部发货工厂编码',
                dataIndex: 'madeFactoryCode',
                key: 'madeFactoryCode',
                align:'center',
                width: 200,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '签收数量',
                dataIndex: 'custRevQty',
                key: 'custRevQty',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '不通过原因',
                className:'tooLong',
                dataIndex: 'abortReason',
                key: 'abortReason',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '提交时间',
                dataIndex: 'submitDate',
                key: 'submitDate',
                align:'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format(dateFormat)}>{ data===null?"":new moment(new Date(data)).format(dateFormat)}</span>;
                }
            },{
                title: '系统来源',
                dataIndex: 'fromSystem',
                key: 'fromSystem',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '操作',
                fixed: 'right',
                align:'center',
                width: 100,
                render: (text, record,index) => {
                    return (
                        <div >
                            {
                                <a onClick={() => this.queryStatus(record.custOrderCode,index)}>更新</a>
                            }
                        </div>
                    );
                }
            }
        ];
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                industry='true'
                search='true'
                storeName='true'
                year='true'
                week='true'
                matnr='true'
                status='true'
                stockOrderNumber='true'
                receiveData={this.receiveData}
                fetch={this.fetch}/>
            <div style={{marginTop:'40px'}}>
                <div>
                    <Table loading={this.state.loading}
                           pagination={{pageSize:this.state.pageSize,current:this.state.currentPage,
                               total:this.state.total,hideOnSinglePage:true,
                               onChange:this.pageChange}}
                           size='middle' bordered
                           dataSource={this.state.dataList}
                           columns={columns}  scroll={{ x: 4600 }}/>
                </div>
            </div>
        </div>;
    }
}
OrderChoice.propTypes = {};

export default OrderChoice;