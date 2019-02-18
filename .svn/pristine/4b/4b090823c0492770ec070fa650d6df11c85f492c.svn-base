/**
 * Created by guotaidou on 2018/7/25.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Col, Row,  Table,Breadcrumb,Upload,Icon,Select,Input,DatePicker } from 'antd';
import moment from 'moment';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import '../../common/css/antCardTitle.css';
import '../../common/css/baseStyle.css';
import Cookies from "js-cookie";
import DownloadComponent from "../../common/commonComponents/DownloadComponent";//下载组件
import UpLoad from '../../common/commonComponents/UpLoad.js';//上传组件
const _mm=new MUtil();
@inject('store')
@observer
class ChannelDown extends Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state = {
            dateDay:moment().format('YYYY-MM-DD'),
            industry: '',
            currentUserId:Cookies.get('username'),
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
        let url = Config.REPORT_URL_PREFIX + `ChannelDown/list?`
            +`dataTime=${this.state.dateDay}`;

        this.store.fetchData(url);
    };
    render() {
        const column=[
            {
                fixed: 'left',
                title: '产业',
                dataIndex: 'industry',
                key: 'industry',
                align:'center',
                width:100,
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '月度目标',
                dataIndex: 'targetMouth',
                key: 'targetMouth',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '月度实际',
                dataIndex: 'realityMouth',
                key: 'realityMouth',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '月度同期',
                dataIndex: 'sameTimeNumMouth',
                key: 'sameTimeNumMouth',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '月度完成率',
                dataIndex: 'finalMouth',
                key: 'finalMouth',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '月度增幅',
                dataIndex: 'ampMouth',
                key: 'ampMouth',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '累计目标',
                dataIndex: 'targetNow',
                key: 'targetNow',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '累计同期',
                dataIndex: 'sameTimeNumNow',
                key: 'sameTimeNumNow',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '累计实际',
                dataIndex: 'realityNow',
                key: 'realityNow',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '累计完成率',
                dataIndex: 'finalNow',
                key: 'finalNow',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '累计增幅',
                dataIndex: 'ampNow',
                key: 'ampNow',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '专卖店累计实际',
                dataIndex: 'storeNowReality',
                key: 'storeNowReality',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }
        ];
        let downloadUrl =`${Config.REPORT_URL_PREFIX}ChannelDown/download?`
            +`dataTime=${this.state.dateDay}`;
        let salt = JSON.parse(localStorage.a).salt.toString();
        let excelUpByDay=`${Config.REPORT_URL_PREFIX}ChannelDown/excelUpByDay`;
        let excelUpByMouth=`${Config.REPORT_URL_PREFIX}ChannelDown/excelUpByMouth`;
        let mouldByMouth = `${Config.REPORT_URL_PREFIX}ChannelDown/mouldByMouth`;
        let mouldByDay = `${Config.REPORT_URL_PREFIX}ChannelDown/mouldByDay`;
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                dateDay='true'
                receiveData={this.receiveData}
                fetch={this.fetch}>
                {
                    salt.indexOf("D")!==-1?<DownloadComponent downLoadUrl={downloadUrl} buttonName={'导出'} spanSize={6} />:''
                }
            </ConditionHeader>
            {salt.indexOf("W")!==-1?<Row className='rowStyle' type="flex" justify="start" style={{marginTop: '20px',borderBottom: '3px solid #F0F2F5',paddingBottom: '10px'}}>
                    <UpLoad uploadUrl={excelUpByDay} buttonName={'上传累计数据'} spanSize={6}  />
                    <UpLoad uploadUrl={excelUpByMouth} buttonName={'上传全月数据'} spanSize={6}  />
                    <DownloadComponent downLoadUrl={mouldByMouth} buttonName={'下载模板(月)'} spanSize={8} downStyle={{marginLeft:-1,borderLeft:'3px solid #F0F2F5',paddingLeft:'10%'}}/>
                    <DownloadComponent downLoadUrl={mouldByDay} buttonName={'下载模板(天)'} spanSize={4} />
                </Row>:''
            }
           <div style={{marginTop: '20px'}}>
                <Table loading={this.store.loading} size='middle'
                       pagination={{ current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                       bordered dataSource={this.store.dataList}
                       columns={column}  scroll={{ x: 2000 }}/>
           </div>
        </div>;
    }
}
ChannelDown.propTypes = {};
export default ChannelDown;
