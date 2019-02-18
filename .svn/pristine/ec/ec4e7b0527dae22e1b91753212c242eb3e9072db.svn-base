/**
 * Created by guotaidou on 2018/6/28.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import {Button, Col, DatePicker, Row, Select, Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import '../../common/css/TotalOutStoreTable.css';
import {LineChart, Line, XAxis, YAxis,Bar, CartesianGrid,LabelList, Tooltip, Legend,ComposedChart,Area} from 'recharts';
import Cookies from 'js-cookie';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import CustomizedAxisTick from '.././master/CustomizedAxisTick';
const _mm=new MUtil();
@inject('store')
@observer
class TargetRunView extends Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.spinShow='none';
        this.state={
            industry:'',
            year:_mm.getCurrentTime('year'),
            gmName:'',
            currentUserId:Cookies.get('username'),
            stringData:[],
            totalPv:'',
            totalUv:''
        }
    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let url=`${Config.REPORT_URL_PREFIX}bangTarget/bangTargetList?`
            +`currentUserId=${this.state.currentUserId}&year=${this.state.year}`
            +`&industry=${this.state.industry}&orders=${this.state.gmName}`;
        this.store.fetchData(url);
    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        let url=`${Config.REPORT_URL_PREFIX}bangTarget/bangTargetList?`
        +`currentUserId=${this.state.currentUserId}&year=${this.state.year}`
        +`&industry=${this.state.industry}&orders=${this.state.gmName}`;

        this.store.fetchData(url);
    };
    render(){
        return(
            <div  className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    year='true'
                    industry='true'
                    gmName='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}/>
                <div style={{border:'2px solid #E8E8E8'}}>
                    <div className='PvChart' style={{marginTop:'20px',position:'relative'}}>
                        <Spin style={{display:`${this.store.spinShow}`,position:'absolute',zIndex:'10',top:'40%',left:'50%'}} size="large" />
                        <ComposedChart width={1200} height={450} data={this.store.dataList}
                                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick/>} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="target" name="目标" barSize={20} fill="#413ea0" />
                            <Line type="monotone" name="实际" dataKey="reality" stroke="#ff7300" />
                            <Area type="monotone" name="实际/目标" style={{display:'none'}} dataKey="rate" fill="#8884d8" stroke="#8884d8" />
                        </ComposedChart>
                    </div>
                </div>
            </div>
        )
    }
}
export default TargetRunView;
