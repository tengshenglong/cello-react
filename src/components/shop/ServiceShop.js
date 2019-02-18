import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Col, Row, DatePicker, Table, Input, Select, Popconfirm,Upload,Alert,Icon,Breadcrumb} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import moment from 'moment';
import '../../common/css/baseStyle.css';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
import UpLoad from "../../common/commonComponents/UpLoad";

const _mm=new MUtil();
@inject('store')
@observer
class ServiceShop extends React.Component {

    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.columns = [
            {
                title: '京东帮专卖店',
                dataIndex: 'serviceStore',
                key: 'serviceStore',
                width: 200,
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },        {
                title: '城市',
                dataIndex: 'city',
                align:'center',
                key: 'city',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '工贸',
                dataIndex: 'regionName',
                align:'center',
                key: 'regionName',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '添加时间',
                dataIndex: 'createAt',
                align:'center',
                key: 'createAt',
                render: function(data) {
                    return  <span title ={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            }
        ];
        this.state = {
            serviceStore : "",
            gmName: "",
            fileList: []
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
        let url = Config.REPORT_URL_PREFIX+'serviceShop/list?regionName=' + this.state.gmName+
            '&serviceStore=' + this.state.serviceStore;
        this.store.fetchData(url);
    };
    render() {
        let salt = JSON.parse(localStorage.a).salt.toString();
        let downloadUrl =`${Config.REPORT_URL_PREFIX}serviceShop/excelDownload?`
        +`serviceStore=${this.state.serviceStore}&regionName=${this.state.gmName}`;
        // let exportUrl=`${Config.REPORT_URL_PREFIX}serviceShop/export`;
        let uploadUrl =`${Config.REPORT_URL_PREFIX}serviceShop/excelUp`;
        let templateDown =`${Config.REPORT_URL_PREFIX}serviceShop/mould`;
        let exportDownUrl =`${Config.REPORT_URL_PREFIX}serviceShop/export`;
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                gmName='true'
                serviceStore='true'
                receiveData={this.receiveData}
                fetch={this.fetch}>
                {
                    salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'}/>:''
                }
            </ConditionHeader>
            {
                salt.indexOf('W')!==-1 && salt.indexOf('D')!==-1  ?  <Row className='rowStyle' type="flex" justify="start" style={{borderBottom: '3px solid #F0F2F5'}}>
                    <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6}  />
                    <DownloadComponent downLoadUrl={templateDown} buttonName={'模版下载'} spanSize={6} />
                     {
                         salt.indexOf('D')!==-1  ? <DownloadComponent downLoadUrl={exportDownUrl} buttonName={'导出'} spanSize={6}  downStyle={{marginLeft:-1.5,marginBottom:10,borderLeft:'3px solid #F0F2F5',paddingLeft:'10%'}} /> :''
                     }
                     {
                         salt.indexOf('D')!==-1  ? <Alert message="导出数据为工贸无法对应店铺数据" type="warning" showIcon style={{bottom:5,width:300}} /> :''
                     }
                </Row>:''
            }
            <div style={{marginTop:'40px'}}>
                <div  className='rowStyle'>
                    <Table loading={this.store.loading} size='middle'
                           pagination={{ current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                           bordered dataSource={this.store.dataList}
                           columns={this.columns}  />
                </div>

            </div>

        </div>;
    }
}
ServiceShop.propTypes = {};
export default ServiceShop;
