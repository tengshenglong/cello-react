import React, {Component} from 'react';
import moment from 'moment';
import Cookies from "js-cookie";
import '../../common/css/baseStyle.css';
import {Button, Col, Row, DatePicker, Table, message,Pagination , Upload, Icon, Breadcrumb, Select,Input,Card,Alert,Divider,Popconfirm} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import DownloadComponent from '../../common/commonComponents/DownloadComponent.js';//下载模板组件
import UpLoad from '../../common/commonComponents/UpLoad.js';
import RangeDateDel from "../../common/commonComponents/RangeDateDel";
//上传组件
const _mm = new MUtil();

class HrEvaluate extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '评价日期',
                dataIndex: 'evaluateDate',
                align: 'center',
                key: 'evaluateDate',
                fixed: 'left',
                width: 120,
                render: function(data) {
                    return <span title ={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            },
            {
                title: '产业',
                dataIndex: 'industryName',
                align: 'center',
                key: 'industryName',
                fixed: 'left',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '物料编码',
                dataIndex: 'haierSku',
                align: 'center',
                key: 'haierSku',
                width: 120,
                render: function (data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '评分',
                dataIndex: 'score',
                align: 'center',
                key: 'score',
                width: 100,
                render: function (data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '内容',
                dataIndex: 'evaluate',
                align: 'center',
                key: 'evaluate',
                width: 300,
                render: function (data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '订单号',
                dataIndex: 'orderNo',
                align: 'center',
                key: 'orderNo',
                width: 120,
                render: function (data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '京东Sku',
                dataIndex: 'productNo',
                align: 'center',
                key: 'productNo',
                width: 120,
                render: function (data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '物料名称',
                dataIndex: 'productName',
                align: 'center',
                key: 'productName',
                width: 180,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },  {
                title: '下单时间',
                dataIndex: 'orderDate',
                align: 'center',
                key: 'orderDate',
                width: 120,
                render: function (data) {
                    return <span title ={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            },
            {
                title: '一级品类',
                dataIndex: 'firstCategory',
                align: 'center',
                key: 'firstCategory',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '二级品类',
                dataIndex: 'secondCategory',
                align: 'center',
                key: 'secondCategory',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '三级品类',
                dataIndex: 'thirdCategory',
                align: 'center',
                key: 'thirdCategory',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '收货省',
                dataIndex: 'province',
                align: 'center',
                key: 'province',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '收货市',
                dataIndex: 'city',
                align: 'center',
                key: 'city',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '收货区县',
                dataIndex: 'county',
                align: 'center',
                key: 'county',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '订单承运人名称',
                dataIndex: 'sendPerson',
                align: 'center',
                key: 'sendPerson',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },


        ];
        this.state = {
            list: [],
            data: [],
            dateFormat:'YYYY-MM-DD',
            width: props.width || -1,
            height: props.height || -1,
            addable: false,
            loading: {
                spinning: false,
                size: 'large'
            },
            deleteStart:'',
            deleteEnd:'',
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            industry: '',//产业
            matnr:'',//物料编码
            orderNumber:'',//订单号
            pinPaiName:'',//物料名称
            jdSku:'',//京东Sku
            commentGrade:'',//评价等级
            pageSize:10,
            total:'',
            currentPage:1,
            currentUserId:Cookies.get('username')
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
        let url=`${Config.REPORT_URL_PREFIX}EvaluateDetail/evaluateDetailOfPage`;
        this.setState({currentPage:1},function(){
                    this.fetchData(url);
        });
    };
    fetchData = (url) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
            let params={
                evaluateDateStart:this.state.startDate,
                evaluateDateEnd:this.state.endDate,
                industryName: this.state.industry,
                orderNo:this.state.orderNumber,
                haierSku:this.state.matnr,
                pinPaiName:this.state.pinPaiName,
                jdSku:this.state.jdSku,
                evaluateCategory:this.state.commentGrade,
                pageSize:this.state.pageSize,
                currentPage:this.state.currentPage,
                currentUserId:this.state.currentUserId
            };
            this.setState({
                loading: {
                    spinning: true,
                    size: 'large'
                }
            });
            _mm.FetchUtil.init()
                .setUrl(url)
                .setMethod('POST')
                .setHeader({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                .setBody(params)
                .dofetch()
                .then((data) => {
                    if(data.dataList.length==0){
                        _mm.errorTips('没有数据');
                        this.setState({
                            loading: {
                                spinning: false,
                                size: 'large'
                            },
                            data:[],
                            total:''
                        });
                    }else {
                        this.setState({
                            data:data.dataList,
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
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url=`${Config.REPORT_URL_PREFIX}EvaluateDetail/evaluateDetailOfPage`;
            this.fetchData(url);
        });
    };
    downLoad=()=>{
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let api =`${Config.REPORT_URL_PREFIX}EvaluateDetail/evaluateExcelDownload`;
        window.location.href=  api;
    };
    render() {
        let salt=JSON.parse(localStorage.a).salt.toString();
        let uploadUrl=`${Config.REPORT_URL_PREFIX}EvaluateDetail/excelUpload`;
        let downLoadUrl=`${Config.REPORT_URL_PREFIX}EvaluateDetail/evaluateExcelDownload`;
        let delUrl=`${Config.REPORT_URL_PREFIX}EvaluateDetail/evaluateDetailRemove`;
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                industry='true'
                startDate='true'
                orderNumber='true'
                pinPaiName='true'
                jdSku='true'
                commentGrade='true'
                matnr='true'
                receiveData={this.receiveData}
                fetch={this.fetch}>
            </ConditionHeader>
            {salt.indexOf('W')!==-1?<Row className='rowStyle' type="flex" justify="start" style={{marginTop: '20px',borderBottom: '3px solid #F0F2F5'}}>
                <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6} upStyle={{marginTop:15}} />
                <DownloadComponent downLoadUrl={downLoadUrl} buttonName={'模版下载'} spanSize={6} downStyle={{marginTop:15}}/>
                <RangeDateDel promptMsg={'将会按照评价日期删除数据！非导入日期！'} buttonName={'删除'} delUrl={delUrl} spanSize={12}/>
            </Row>:''}
            <div style={{marginTop: '20px'}}>
                <div className='rowStyle'>
                    <Table loading={this.state.loading} size='middle' bordered dataSource={this.state.data}
                           columns={this.columns}  scroll={{ x: 2000 }}
                           pagination={{pageSize:this.state.pageSize,current:this.state.currentPage,
                           total:this.state.total,hideOnSinglePage:true,
                           onChange:this.pageChange}}/>
                </div>
            </div>
        </div>;
    }
}

HrEvaluate.propTypes = {};

export default HrEvaluate;