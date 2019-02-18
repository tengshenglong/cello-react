/**
 * Created by guotaidou on 2018/6/21.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Col, Row,  Table,Breadcrumb,Upload,Icon,Select,Input,DatePicker } from 'antd';
import '../../common/css/baseStyle.css';
import moment from 'moment';
import '../../common/css/antCardTitle.css';
import {message} from "antd/lib/index";
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import AlertInfo from '../../common/commonComponents/AlertInfo';//提示信息组件
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import Cookies from "js-cookie";
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
import UpLoad from "../../common/commonComponents/UpLoad";
const _mm=new MUtil();
@inject('store')
@observer
class EnterRate extends Component{

    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state = {
            gmName:'',
            x:{x:0},
            currentUserId:Cookies.get('username'),
            month:_mm.getCurrentTime('month').format('YYYY-MM'),
            columns:[
                {
                    key:0,
                    title: '',
                    fixed: 'left',
                    children: [{
                        title: '工贸',
                        dataIndex: 'regionName',
                        align:'center',
                        key: 'regionName',
                        width:100,
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                },{
                    key:1,
                    title: '',
                    fixed: 'left',
                    children: [{
                        title: '年度',
                        dataIndex: 'targetYear',
                        align:'center',
                        key: 'targetYear',
                        width:100,
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }]
                }
            ],
            columnsList:[
                {
                    key:2,
                    title:'冰箱',
                    children:[
                        {
                            title: '目标',
                            dataIndex: 'btarget',
                            align:'center',
                            key: 'btarget',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '实际',
                            align:'center',
                            dataIndex: 'breality',
                            key: 'breality',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '完成率',
                            align:'center',
                            dataIndex: 'brate',
                            key: 'brate',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }
                    ]
                },{
                    key:3,
                    title:'洗衣机',
                    children:[
                        {
                            title: '目标',
                            dataIndex: 'xtarget',
                            align:'center',
                            key: 'xtarget',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '实际',
                            align:'center',
                            dataIndex: 'xreality',
                            key: 'xreality',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '完成率',
                            align:'center',
                            dataIndex: 'xrate',
                            key: 'xrate',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }
                    ]
                },{
                    key:4,
                    title:'冷柜',
                    children:[
                        {
                            title: '目标',
                            dataIndex: 'ltarget',
                            align:'center',
                            key: 'ltarget',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '实际',
                            align:'center',
                            dataIndex: 'lreality',
                            key: 'lreality',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '完成率',
                            align:'center',
                            dataIndex: 'lrate',
                            key: 'lrate',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }
                    ]
                },{
                    key:5,
                    title:'空调',
                    children:[
                        {
                            title: '目标',
                            dataIndex: 'ktarget',
                            align:'center',
                            key: 'ktarget',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '实际',
                            align:'center',
                            dataIndex: 'kreality',
                            key: 'kreality',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '完成率',
                            align:'center',
                            dataIndex: 'krate',
                            key: 'krate',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }
                    ]
                },{
                    key:6,
                    title:'厨电',
                    children:[
                        {
                            title: '目标',
                            dataIndex: 'ctarget',
                            align:'center',
                            key: 'ctarget',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '实际',
                            align:'center',
                            dataIndex: 'creality',
                            key: 'creality',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '完成率',
                            align:'center',
                            dataIndex: 'crate',
                            key: 'crate',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }
                    ]
                },{
                    key:7,
                    title:'热水器',
                    children:[
                        {
                            title: '目标',
                            dataIndex: 'rtarget',
                            align:'center',
                            key: 'rtarget',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '实际',
                            align:'center',
                            dataIndex: 'rreality',
                            key: 'rreality',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '完成率',
                            align:'center',
                            dataIndex: 'rrate',
                            key: 'rrate',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }
                    ]
                },{
                    key:8,
                    title:'彩电',
                    children:[
                        {
                            title: '目标',
                            dataIndex: 'dtarget',
                            align:'center',
                            key: 'dtarget',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '实际',
                            align:'center',
                            dataIndex: 'dreality',
                            key: 'dreality',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }, {
                            title: '完成率',
                            align:'center',
                            dataIndex: 'drate',
                            key: 'drate',
                            render: function(data) {
                                return <span title ={data}>{data}</span>;
                            }
                        }
                    ]
                }
            ]
        };
    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let industryList=JSON.parse(localStorage.a).industryList;
        let industryStr="";
        industryList.map((num,index)=>{
            industryStr+=num.industryName
        });
        console.log(industryList);
        let colums1=this.state.columns;
        this.state.columnsList.map((num,index)=>{
            if(industryStr.indexOf(num.title)!==-1){
                colums1.push(num)
            }
        });
        colums1.push({
            key:9,
            title:'合计',
            children:[
                {
                    title: '目标',
                    dataIndex: 'totalTarget',
                    align:'center',
                    key: 'totalTarget',
                    render: function(data) {
                        return <span title ={data}>{data}</span>;
                    }
                }, {
                    title: '实际',
                    align:'center',
                    dataIndex: 'totalReality',
                    key: 'totalReality',
                    render: function(data) {
                        return <span title ={data}>{data}</span>;
                    }
                }, {
                    title: '完成率',
                    align:'center',
                    dataIndex: 'totalRate',
                    key: 'totalRate',
                    render: function(data) {
                        return <span title ={data}>{data}</span>;
                    }
                }
            ]
        });
        let x = {x:0};
        if(colums1.length>4){
            x = {x:2000}
        }
        this.setState({
            columns: colums1,
            x:x
        });

    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        let url=Config.REPORT_URL_PREFIX +
            `regionTarget/list?targetYear=${this.state.month}&regionName=${this.state.gmName}&currentUserId=${this.state.currentUserId}`;
        this.store.fetchData(url);
    };
    onChange = (date, dateString) => {
        this.setState({
            dateSearch: dateString
        });
    };
    render() {
        let salt = JSON.parse(localStorage.a).salt.toString();
        let downloadUrl =`${Config.REPORT_URL_PREFIX}regionTarget/report?`
            +`targetYear=${this.state.month}&regionName=${this.state.gmName}&currentUserId=${this.state.currentUserId}`;
        let uploadUrl =`${Config.REPORT_URL_PREFIX}serviceTarget/excelUp`;
        let templateDown =`${Config.REPORT_URL_PREFIX}serviceTarget/mould`;
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader month='true'
                             gmName='true'
                             search='true'
                             receiveData={this.receiveData}
                             fetch={this.fetch}>
                {
                    salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} />:''
                }
            </ConditionHeader>
            {
                salt.indexOf('W')!==-1 ?  <Row className='rowStyle' type="flex" justify="start" style={{marginTop: '30px',borderBottom: '3px solid #F0F2F5',paddingBottom: '30px'}}>
                    <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6}  />
                    <DownloadComponent downLoadUrl={templateDown} buttonName={'模版下载'} spanSize={6} />
                </Row>:''
            }
            <div style={{marginTop: '20px'}}>
                <Table loading={this.store.loading}
                       pagination={{ current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                       size='middle' bordered dataSource={this.store.dataList}
                       columns={this.state.columns}  scroll={ this.state.x }/>
            </div>
        </div>;
    }
}
EnterRate.propTypes = {};
export default EnterRate;
