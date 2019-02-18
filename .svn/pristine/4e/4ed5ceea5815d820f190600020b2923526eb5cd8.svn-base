/**
 * Created by guotaidou on 2018/7/11.
 */
import React, {Component} from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';
import {Button, Col, DatePicker, Row, Select, Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import '../../common/css/TotalOutStoreTable.css';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
const _mm=new MUtil();

class WLPV extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataList:[],
            matnr : "",
            currentUserId:Cookies.get('username'),
            beforeDayOne:moment(moment() - 24*60*60*1000).format("YYYY-MM-DD"),
            beforeDayTwo:moment(moment() - 24*60*60*1000*2).format("YYYY-MM-DD"),
            beforeDayThree:moment(moment() - 24*60*60*1000*3).format("YYYY-MM-DD"),
            show:'hidden',
            spinShow:'none'
        }

    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.fetch()
    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        let url =`${Config.REPORT_URL_PREFIX}master/MasterPvTopView?`
        +`material=${this.state.matnr}&currentUserId=${this.state.currentUserId}`;
        this.fetchData(url);
    };
    fetchData = (url) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.setState({
            spinShow:'block'
        });
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    spinShow:'none'
                });
                if(data.dataList.length!=0){
                    this.setState({
                        dataList:data.dataList,
                        show:''
                    })
                }else{
                    this.setState({
                        dataList:[],
                        show:'hidden'
                    });
                    _mm.errorTips('没有数据!');
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };
    render(){
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    matnr='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}/>
                <div className='TotalOutStoreTable' style={{marginTop:'20px',position:'relative'}}>
                    <Spin style={{display:`${this.state.spinShow}`,position:'absolute',zIndex:'10',top:'60px',left:'50%'}} size="large" />
                    <table style={{textAlign:'center'}} border="1p" cellSpacing="0" width="100%" height="100%">
                        <thead style={{height:'50px',backgroundColor:'#FAFAFA'}}>
                        <tr>
                            <th>物料</th>
                            <th>PV/UV</th>
                            <th>{this.state.beforeDayThree}</th>
                            <th>{this.state.beforeDayTwo}</th>
                            <th>{this.state.beforeDayOne}</th>
                            <th>总计</th>
                        </tr>
                        </thead>
                        <tbody style={{visibility:this.state.show}}>

                        {
                            this.state.dataList.map((data1)=>{

                                return(
                                    data1.list.map((data2,index)=>{
                                        let v2Flag='';
                                        let v3Flag='';
                                            switch(data2.v2Flag)
                                            {
                                                case '1':
                                                    v2Flag='red';
                                                    break;
                                                case '2':
                                                    v2Flag='';
                                                    break;
                                                default:
                                                    v2Flag='green';
                                            }
                                            switch(data2.v3Flag)
                                            {
                                                case '1':
                                                    v3Flag='red';
                                                    break;
                                                case '2':
                                                    v3Flag='';
                                                    break;
                                                default:
                                                    v3Flag='green';
                                            }
                                        if(index==0){
                                            return(
                                                <tr>
                                                    <td rowSpan="2">{data1.hrsku}</td>
                                                    <td>{data2.puName}</td>
                                                    <td>{data2.v1Data}</td>
                                                    <td style={{color:v2Flag}}>{data2.v2Data}</td>
                                                    <td style={{color:v3Flag}}>{data2.v3Data}</td>
                                                    <td>{data2.totalCount}</td>
                                                </tr>
                                            )
                                        }else if(index==1){
                                            return(
                                                <tr>
                                                    <td>{data2.puName}</td>
                                                    <td>{data2.v1Data}</td>
                                                    <td style={{color:v2Flag}}>{data2.v2Data}</td>
                                                    <td style={{color:v3Flag}}>{data2.v3Data}</td>
                                                    <td>{data2.totalCount}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default WLPV;
