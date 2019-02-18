/**
 * Created by guotaidou on 2018/6/12.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import {Button, Col, DatePicker, Row, Select, Upload,Icon,Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import DownloadComponent from '../../common/commonComponents/DownloadComponent.js';//下载模板组件
import UpLoad from '../../common/commonComponents/UpLoad.js';//上传组件
import commonStore from '../../stores/commonStore/commonStore';
const _mm=new MUtil();
@inject('store')
@observer
class LesTarget extends Component{
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.totaltq='';
        this.store.totaltarget='';
        this.state={
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            loading:{
                spinning:false,
                size:'large'
            },
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
        let url =`${Config.REPORT_URL_PREFIX}lesTarget/list?`
            +`startDate=${this.state.startDate}&endDate=${this.state.endDate}&industry=${this.state.industry}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
        this.store.fetchData(url);
    };
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url =`${Config.REPORT_URL_PREFIX}lesTarget/list?`
                +`startDate=${this.state.startDate}&endDate=${this.state.endDate}&industry=${this.state.industry}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
            this.store.fetchData(url);
        });
    };
    render(){
        let downLoadComponentUrl = `${Config.REPORT_URL_PREFIX}lesTarget/mould`;
        let uploadUrl=Config.REPORT_URL_PREFIX + 'lesTarget/excelUp';
        const data = [
            {
                title: '总目标',
                value:this.store.totaltarget
            },
            {
                title: '总同期',
                value: this.store.totaltq
            }
        ];
        const column=[
            {
                title: '日期',
                dataIndex: 'targetTime',
                key: 'targetTime',
                align:'center',
                render: function(data) {
                    return <span title ={moment(data).format("YYYY-MM-DD")}>{moment(data).format("YYYY-MM-DD")}</span> ;
                }
            },
            {
                title: '产业',
                dataIndex: 'industry',
                key: 'industry',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '目标',
                dataIndex: 'targetNum',
                key: 'targetNum',
                align:'center',
                render: function(data) {
                    return <span title ={data}>{data}</span>;
                }
            },
            {
                title: '同期',
                dataIndex: 'sameTerm',
                key: 'sameTerm',
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
                    startDate='true'
                    industry='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('W')!==-1 ? <DownloadComponent downLoadUrl={downLoadComponentUrl} buttonName={'模版下载'} downStyle={{marginLeft:20,marginBottom:-10}} />:''
                    }
                    {
                        salt.indexOf('W')!==-1 ? <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} upStyle={{marginLeft:20,marginBottom:-10}}/>:''
                    }
                </ConditionHeader>
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
                       pagination={{ pageSize:this.state.pageSize,hideOnSinglePage:true, current:this.state.currentPage,
                           total:this.store.totalElement,
                       onChange:this.pageChange}}
                       rowClassName='JAgeOther'
                       style={{marginTop:'20px'}}
                       bordered size='middle' columns={column} dataSource={this.store.dataList} />
            </div>
        )
    }
}
export default LesTarget;