import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Col, Row, DatePicker, Table, message, Upload, Icon, Breadcrumb, Select, List, Card,Alert, Popconfirm} from 'antd';
import moment from 'moment';
import '../../common/css/baseStyle.css';
import Cookies from "js-cookie";
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import UpLoad from '../../common/commonComponents/UpLoad.js';//上传组件
import DownloadComponent from '../../common/commonComponents/DownloadComponent.js';//下载组件
import RangeDateDel from '../../common/commonComponents/RangeDateDel.js';//日期段删除组件
import commonStore from '../../stores/commonStore/commonStore';
const _mm = new MUtil();
@inject('store')
@observer
class POPExcel extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '商铺ID',
                dataIndex: 'shopId',
                align: 'center',
                key: 'shopId',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '商铺名称',
                dataIndex: 'shopName',
                align: 'center',
                key: 'shopName',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '一级分类',
                dataIndex: 'category_1st',
                align: 'center',
                key: 'category_1st',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '二级分类',
                dataIndex: 'category_2nd',
                align: 'center',
                key: 'category_2nd',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '三级分类',
                dataIndex: 'category_3rd',
                align: 'center',
                key: 'category_3rd',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }, {
                title: '品牌名称',
                dataIndex: 'brand_name',
                align: 'center',
                key: 'brand_name',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: 'GMV',
                dataIndex: 'gvm',
                align: 'center',
                key: 'gvm',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '销售数量',
                dataIndex: 'saleCount',
                align: 'center',
                key: 'salesVolume',
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
                title: '统计日期',
                dataIndex: 'opDate',
                align: 'center',
                key: 'opDate',
                width: 120,
                render: function (data) {
                    return <span title ={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            }, {
                title: '导入数据日期',
                dataIndex: 'createdAt',
                align: 'center',
                key: 'createdAt',
                width: 120,
                render: function (data) {
                    return <span title ={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            }
        ];
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.totalAmount='0';
        this.store.totalNum='0';
        this.state = {
            width: props.width || -1,
            height: props.height || -1,
            addable: false,
            fileList: [],
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            currentUserId:Cookies.get('username'),
            deleteStart:'',
            deleteEnd:'',
            industry: '',
            pageSize:10,
            total:'',
            currentPage:1
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
        this.state.currentPage = 1;
        let url = Config.REPORT_URL_PREFIX + `pop/findByOpDateOrIndustory?`
        +`startDate=${this.state.startDate}&endDate=${this.state.endDate}`
        +`&industry=${this.state.industry}&currentUserId=${this.state.currentUserId}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
        this.store.fetchData(url);
    };
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url = Config.REPORT_URL_PREFIX + `pop/findByOpDateOrIndustory?`
                +`startDate=${this.state.startDate}&endDate=${this.state.endDate}`
                +`&industry=${this.state.industry}&currentUserId=${this.state.currentUserId}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
            this.store.fetchData(url);
        });
    };

    render() {
        const data = [
            {
                title: 'GMV总数',
                value: this.store.totalNum
            },
            {
                title: '销售总数量',
                value: this.store.totalAmount
            }
        ];
        let salt = JSON.parse(localStorage.a).salt.toString();
        let delUrl=`${Config.REPORT_URL_PREFIX}pop/deleteByOpDate`;
        let templateDown= `${Config.REPORT_URL_PREFIX}servicePOP/mould`;
        let uploadUrl= `${Config.REPORT_URL_PREFIX}servicePOP/excelUp`;
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                startDate='true'
                industry='true'
                receiveData={this.receiveData}
                fetch={this.fetch}/>
            {salt.indexOf('W')!==-1?<Row className='rowStyle' type="flex" justify="start" style={{marginTop: '20px',borderBottom: '3px solid #F0F2F5'}}>
                <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6} upStyle={{marginTop:15}} />
                <DownloadComponent downLoadUrl={templateDown} buttonName={'模版下载'} spanSize={6} downStyle={{marginTop:15}}/>
                <RangeDateDel promptMsg={'将会按照订单日期删除！非导入日期！'} buttonName={'删除'} delUrl={delUrl} spanSize={12}/>
            </Row>:''}
            <div style={{marginTop: '20px'}}>
                <div className='rowStyle'>
                    <List style={{marginTop: '20px'}}
                          grid={{gutter: 16, column: 2}}
                          dataSource={data}
                          renderItem={item => (
                              <List.Item>
                                  <Card style={{
                                      textAlign: 'center'
                                  }}
                                        title={item.title}>{item.value}</Card>
                              </List.Item>
                          )}
                    />
                    <Table loading={this.store.loading} size='middle' bordered
                           pagination={{pageSize:this.state.pageSize,hideOnSinglePage:true, current:this.state.currentPage,
                               total:this.store.totalElement,
                           onChange:this.pageChange}}
                           dataSource={this.store.dataList}
                           columns={this.columns}  scroll={{ x: 1600 }}/>
                </div>
            </div>
        </div>;
    }

}

POPExcel.propTypes = {};

export default POPExcel;