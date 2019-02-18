/**
 * Created by guotaidou on 2018/8/3.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import {LineChart, Line, XAxis, YAxis,Bar, CartesianGrid,LabelList, Tooltip, Legend} from 'recharts';
import CustomizedAxisTick from './CustomizedAxisTick';
import {Button, Col, DatePicker, Row, Select, Upload,Icon,Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
const _mm = new MUtil();
@inject('store')
@observer
class MatnrPv extends Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();

        this.state = {
            startDate: this.props.startDate,//开始时间
            endDate: this.props.endDate,//结束时间
            jdSku: this.props.jdSku,
            matnrUv: '0',
            matnrUvValue: '',
            dataList:[]
        };
    }

    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.fetch();
    }

    //获取查询条件数据
    receiveData = (data)=> {
        this.setState(data)
    };
    //发送fetch请求
    fetch = ()=> {
        switch (this.state.matnrUv) {
            case '0':
                this.state.matnrUvValue = 'pv';
                break;
            case '1':
                this.state.matnrUvValue = 'uv';
                break;
            case '2':
                this.state.matnrUvValue = '转化率';
                break;
            case '3':
                this.state.matnrUvValue = '客单价';
                break;
        }
        let url = `${Config.REPORT_URL_PREFIX}master/findMasterPvUvFlow?`
            + `startDate=${this.state.startDate}&endDate=${this.state.endDate}&jdSku=${this.state.jdSku}&`
            + `condition=${this.state.matnrUv}`;
        this.fetchData(url);
    };
    fetchData=(url)=>{
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.setState({
            loading:{
                spinning:true,
                size:'large'
            }
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
                    loading:{
                        spinning:false,
                        size:'large'
                    }
                });
                if(data.dataList==null||data.dataList.length==0){
                    _mm.errorTips('没有数据');
                    this.setState({
                        dataList:[]
                    })
                }else{
                    this.setState({
                        dataList:data.dataList
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading:{
                        spinning:false,
                        size:'large'
                    }
                });
                _mm.errorTips(error);
            });
    };
    render() {
        return (
            <div>
                <ConditionHeader
                    start={this.state.startDate}
                    end={this.state.endDate}
                    search='true'
                    startDate='true'
                    matnrUv='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                </ConditionHeader>

                <div className='PvChart' style={{marginTop:20,position:'relative'}}>
                    <LineChart width={1000} height={450} data={this.state.dataList}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="orderDate" height={60} tick={<CustomizedAxisTick/>}>
                        </XAxis>
                        <YAxis label={{ value: this.state.matnrUvValue, angle: -90, position: 'insideLeft' }}/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" name={this.state.matnrUv==2?'同期(%)':'同期'} dataKey="tq" stroke="#8884d8"
                              strokeWidth={2}/>
                        <Line type="monotone" name={this.state.matnrUv==2?'实际(%)':'实际'} dataKey="sj" stroke="#82ca9d"
                              strokeWidth={2}/>
                    </LineChart>
                </div>
            </div>
        )
    }
}
export default MatnrPv;
