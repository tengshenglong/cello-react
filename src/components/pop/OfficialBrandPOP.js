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
import DownloadComponent from '../../common/commonComponents/DownloadComponent.js';//下载模板组件
import UpLoad from '../../common/commonComponents/UpLoad.js';//上传组件
import commonStore from '../../stores/commonStore/commonStore';
const _mm = new MUtil();
@inject('store')
@observer
class POPExcel extends React.Component {

    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.columns = [
            {
                title: '日期',
                dataIndex: 'statisticsDate',
                align: 'center',
                key: 'statisticsDate',
                width: 120,
                render: function(data) {
                    return <span title ={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            },
            {
                title: '产业名称',
                dataIndex: 'industryName',
                align: 'center',
                key: 'industryName',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '统计金额',
                dataIndex: 'statisticsPrice',
                align: 'center',
                key: 'statisticsPrice',
                width: 120,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }
        ];
        this.state = {
            dateDayUnnessery:'',
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
        let url = Config.REPORT_URL_PREFIX + `obPoP/findOBList1?industry=${this.state.industry}`;
        if (this.state.dateDayUnnessery.trim()!==''){
            url+=`&statisticsDate=${this.state.dateDayUnnessery}`
        }
        url+=`&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
        this.store.fetchData(url);
    };
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url = Config.REPORT_URL_PREFIX + `obPoP/findOBList1?industry=${this.state.industry}`;
            if (this.state.dateDayUnnessery.trim()!==''){
                url+=`&statisticsDate=${this.state.dateDayUnnessery}`
            }
            url+=`&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
            this.store.fetchData(url);
        });
    };
    render() {
        let salt=JSON.parse(localStorage.a).salt.toString();
        let downLoadComponentUrl = `${Config.REPORT_URL_PREFIX}servicePOP/GPmould`;
        let uploadUrl=Config.REPORT_URL_PREFIX + 'servicePOP/gpExcelUp';
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                dateDayUnnessery='true'
                industry='true'
                receiveData={this.receiveData}
                fetch={this.fetch}>
                {
                    salt.indexOf("W")!==-1 ? <DownloadComponent downLoadUrl={downLoadComponentUrl} buttonName={'模版下载'} downStyle={{marginLeft:20}} /> : ''
                }
                {
                    salt.indexOf("W")!==-1 ? <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} upStyle={{marginLeft:20}} /> : ''
                }
            </ConditionHeader>
            <div style={{marginTop: '20px'}}>
                <div className='rowStyle'>
                    <Table loading={this.store.loading}
                           pagination={{ pageSize:this.state.pageSize,hideOnSinglePage:true, current:this.state.currentPage,
                               total:this.store.totalElement,
                           onChange:this.pageChange}}
                           size='middle' bordered dataSource={this.store.dataList}
                           columns={this.columns}/>
                </div>
            </div>
        </div>;
    }

}

POPExcel.propTypes = {};

export default POPExcel;