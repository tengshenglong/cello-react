import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import {Button, Col, Row,Select,Table, Input, Upload,Icon} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import UpLoad from "../../common/commonComponents/UpLoad";
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
import RangeDateDel from "../../common/commonComponents/RangeDateDel";
const _mm=new MUtil();
@inject('store')
@observer
class JDindustry extends React.Component{

    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state={
            jdSku:'',
            industry: '',
            pageSize:10,
            total:'',
            currentPage:1
        };
    }
    excelUp = (info) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let fileList = info.fileList;
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (info.file.status === 'error') {
                _mm.errorTips("数据异常，请联系管理员！");
                return
            }
            if (file.response) {
                _mm.errorTips(`${info.file.name} ${file.response.message}`);
                return file.response.status === 'success';
            }
            return true;
        });

        this.setState({ fileList });
        this.setState({
            list: []
        });
    };
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
        let url =`${Config.REPORT_URL_PREFIX}masterIndustry/list1?`
        +`sku=${this.state.jdSku}&industry=${this.state.industry}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
        this.store.fetchData(url);
    };
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url =`${Config.REPORT_URL_PREFIX}masterIndustry/list1?`
                +`sku=${this.state.jdSku}&industry=${this.state.industry}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
            this.store.fetchData(url);
        });
    };
    render(){
        const column=[
            {
                title: '京东sku',
                dataIndex: 'jdSku',
                key: 'jdSku',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '海尔产业',
                dataIndex: 'hrIndustry',
                key: 'hrIndustry',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '海尔物料',
                dataIndex: 'hrMatnr',
                key: 'hrMatnr',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title:'创建时间',
                dataIndex:'createTime',
                key:'createTime',
                align:'center',
                render: function(data) {
                    if(data!==null){
                        return <span title ={new moment(data).format("YYYY-MM-DD h:mm:ss")}>{new moment(data).format("YYYY-MM-DD h:mm:ss")}</span>;
                    }
                }
            }
        ];
        let salt=JSON.parse(localStorage.a).salt.toString();
        let uploadUrl=`${Config.REPORT_URL_PREFIX}masterIndustry/excelUp`;
        let downLoadUrl=`${Config.REPORT_URL_PREFIX}masterIndustry/mould`;
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    industry='true'
                    jdSku='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}/>
                {salt.indexOf('W')!==-1?<Row className='rowStyle' type="flex" justify="start" style={{marginTop: '20px',borderBottom: '3px solid #F0F2F5'}}>
                    <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6} upStyle={{marginBottom:20}} />
                    <DownloadComponent downLoadUrl={downLoadUrl} buttonName={'模版下载'} spanSize={6} downStyle={{marginBottom:20}}/>
                </Row>:''}
                <Table loading={this.store.loading}
                       style={{marginTop:'20px'}}
                       pagination={{pageSize:this.state.pageSize,hideOnSinglePage:true, current:this.state.currentPage,
                           total:this.store.totalElement,
                           onChange:this.pageChange}}
                       bordered size='middle' columns={column} dataSource={this.store.dataList} />
            </div>
        )
    }
}
JDindustry.propTypes = {};

export default JDindustry