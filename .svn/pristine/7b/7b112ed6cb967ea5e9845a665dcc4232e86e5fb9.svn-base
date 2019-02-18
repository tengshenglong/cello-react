
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import { Row,Table} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import ConditionHeader from '../../common/commonComponents/ConditionHeader';
import Cookies from "js-cookie";
import Config from "../../common/Config";
import MUtil from "../../common/util/mm";
import UpLoad from "../../common/commonComponents/UpLoad";
import commonStore from '../../stores/commonStore/commonStore';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";

const _mm=new MUtil();

@inject('store')
@observer
class GridStore extends Component{
    constructor(props){
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state={
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            currentUserId:Cookies.get('username'),//用户ID
            rgName:'',
            gridName:'',
            bang:'',
            exclusiveShop:'',
            visible: false
        };
        super();
    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
    }
    //模板显示函数
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        const date=new Date(this.state.endDate).getTime()-new Date(this.state.startDate).getTime();
        const days=Math.floor(date/(24*3600*1000));
        if(days>31){
            _mm.errorTips("时间间隔不能大于30天");
            return;
        }
        let url =`${Config.REPORT_URL_PREFIX}gridStore/list?`
            +`startTime=${this.state.startDate}&endTime=${this.state.endDate}&bang=${this.state.bang}`
            +`&regionName=${this.state.rgName}&gridName=${this.state.gridName}&exclusiveShop=${this.state.exclusiveShop}`;
        this.store.fetchData(url);
    };
    render(){
        let downloadUrl =`${Config.REPORT_URL_PREFIX}gridStore/excelDownload?`
            +`startTime=${this.state.startDate}&endTime=${this.state.endDate}&industry=${this.state.industry}`
            +`&regionName=${this.state.region}&gridName=${this.state.gridName}&currentUserId=${this.state.currentUserId}`;
        let uploadUrl =`${Config.REPORT_URL_PREFIX}gridStore/report`;
        let templateDown =`${Config.REPORT_URL_PREFIX}gridStore/mould`;
        const column=[
            {
                title: '小微',
                fixed: 'center',
                dataIndex: 'regionName',
                key: 'regionName',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '网格',
                dataIndex: 'gridName',
                key: 'gridName',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '京东帮店',
                dataIndex: 'bang',
                key: 'bang',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '专卖店',
                dataIndex: 'exclusiveShop',
                key: 'exclusiveShop',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '区县',
                dataIndex: 'city',
                key: 'city',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '冰箱',
                dataIndex: 'bx',
                key: 'bx',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '洗衣机',
                dataIndex: 'xyj',
                key: 'xyj',
                align:'center',
                render: function(data) {
                    return  <span style={{color:parseFloat(data)>=0?'':'red'}} title ={data}>{data}</span>;
                }
            },{
                title: '冷柜',
                dataIndex: 'lg',
                key: 'lg',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '空调',
                dataIndex: 'kt',
                key: 'kt',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '厨电',
                dataIndex: 'cd',
                key: 'cd',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '热水器',
                dataIndex: 'rsq',
                key: 'rsq',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '彩电',
                dataIndex: 'cds',
                key: 'cds',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },{
                title: '总计',
                dataIndex: 'totalNum',
                key: 'totalNum',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            }

        ];
        let salt = JSON.parse(localStorage.a).salt.toString();
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    rgName='true'
                    gridName='true'
                    bang='true'
                    exclusiveShop='true'
                    startDate='true'
                    start={this.state.startDate}//开始时间
                    end={this.state.endDate}
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} startDate={this.state.startDate} endDate={this.state.endDate} buttonName={'下载'} />:''
                    }
                </ConditionHeader>
                {
                    salt.indexOf('W')!==-1 ?  <Row className='rowStyle' type="flex" justify="start" style={{marginTop: '30px',borderBottom: '3px solid #F0F2F5',paddingBottom: '30px'}}>
                        <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6}  />
                        <DownloadComponent downLoadUrl={templateDown} buttonName={'模版下载'} spanSize={6} />
                    </Row>:''
                }
                <Table loading={this.store.loading} style={{marginTop:'20px'}}
                       pagination={{hideOnSinglePage:true,
                           current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                       bordered size='middle' columns={column} dataSource={this.store.dataList} />
            </div>
        )
    }
}
export default GridStore;