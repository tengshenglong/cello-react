import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import Cookies from "js-cookie";
import {Button, Col, Row, DatePicker, Table, message, Upload, Icon, Breadcrumb, Select,List,Card,Alert,Divider,Popconfirm} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import '../../common/css/baseStyle.css';
import UpLoad from "../../common/commonComponents/UpLoad";
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
import RangeDateDel from "../../common/commonComponents/RangeDateDel";
const _mm = new MUtil();
@inject('store')
@observer
class MasterExcel extends React.Component {

    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.totalAmount='0';
        this.store.totalNum='0';
        this.columns = [
            {
                title: '京东商品编码',
                dataIndex: 'jdSku',
                align: 'center',
                key: 'jdSku',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '商品名称',
                dataIndex: 'skuName',
                align: 'center',
                key: 'skuName',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '一级品牌',
                dataIndex: 'brand_1st',
                align: 'center',
                key: 'brand_1st',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '二级品牌',
                dataIndex: 'brand_2nd',
                align: 'center',
                key: 'brand_2nd',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '三级品牌',
                dataIndex: 'brand_3rd',
                align: 'center',
                key: 'brand_3rd',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '品牌名称',
                dataIndex: 'brandName',
                align: 'center',
                key: 'brandName',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '有效订单',
                dataIndex: 'orderCount',
                align: 'center',
                key: 'orderCount',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '销量',
                dataIndex: 'salesVolume',
                align: 'center',
                key: 'salesVolume',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '销售额（元）',
                dataIndex: 'salesAmount',
                align: 'center',
                key: 'salesAmount',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '所属产业',
                dataIndex: 'industry',
                align: 'center',
                key: 'industry',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '订单日期',
                dataIndex: 'orderDate',
                align: 'center',
                key: 'orderDate',
                width: 120,
                render: function (data) {
                    return <span title ={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            }, {
                title: '导入数据日期',
                dataIndex: 'createdDate',
                align: 'center',
                key: 'createdDate',
                width: 120,
                render: function (data) {
                    return <span title ={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;

                }
            }
        ];
        this.state = {
            dateDay:moment().format('YYYY-MM-DD'),
            currentUserId:Cookies.get('username'),
            industry: '',
            width: props.width || -1,
            height: props.height || -1,
            addable: false,
            fileList: [],
            deleteStart:'',//删除日期
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
        let url = Config.REPORT_URL_PREFIX +
            `master/findByDateOrIndustory?date=${this.state.dateDay}`
            +`&industry=${this.state.industry}&currentUserId=${this.state.currentUserId}`;
        this.store.fetchData(url);
    };

    render() {
        const data = [
            {
                title: '销售总数',
                value: this.store.totalNum
            },
            {
                title: '销售总额（元）',
                value: this.store.totalAmount
            }
        ];
        let salt=JSON.parse(localStorage.a).salt.toString();
        let uploadUrl=`${Config.REPORT_URL_PREFIX}serviceMaster/excelUp`;
        let downLoadUrl=`${Config.REPORT_URL_PREFIX}serviceMaster/mould`;
        let delUrl=`${Config.REPORT_URL_PREFIX}master/deleteByOrderDate`;
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                dateDay='true'
                industry='true'
                receiveData={this.receiveData}
                fetch={this.fetch}/>
            {salt.indexOf('W')!==-1?<Row className='rowStyle' type="flex" justify="start" style={{marginTop: '20px',borderBottom: '3px solid #F0F2F5'}}>
                <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6} upStyle={{marginTop:15}} />
                <DownloadComponent downLoadUrl={downLoadUrl} buttonName={'模版下载'} spanSize={6} downStyle={{marginTop:15}}/>
                <RangeDateDel promptMsg={'将会按照订单日期删除！非导入日期！'} buttonName={'删除'} delUrl={delUrl} spanSize={12}/>
            </Row>:''}
            <div style={{marginTop: '20px'}}>
                <div className='rowStyle'>
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
                    <Table loading={this.store.loading} size='middle' bordered
                           pagination={{ current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                           dataSource={this.store.dataList}
                           columns={this.columns}  scroll={{ x: 1600 }}/>
                </div>
            </div>
        </div>;
    }
}

MasterExcel.propTypes = {};

export default MasterExcel;