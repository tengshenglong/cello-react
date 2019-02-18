/**
 * Created by guotaidou on 2018/6/16.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import {Button, Col, DatePicker, Row, Select, Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import '../../common/css/TotalOutStoreTable.css';
import {LineChart, Line, XAxis, YAxis,Bar, CartesianGrid,LabelList,
        Tooltip, Legend, ResponsiveContainer} from 'recharts';
import Cookies from 'js-cookie';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
import CustomizedAxisTick from './CustomizedAxisTick';
import  MUtil from '../../common/util/mm';
import commonStore from '../../stores/commonStore/commonStore';
const _mm=new MUtil();
const ButtonGroup = Button.Group;
@inject('store')
@observer
class PvView extends Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.store.totalPv='';
        this.store.lastPv='';
        this.store.lastUv='';
        this.store.rate='';
        this.store.spinShow='none';
        this.state={
            industry:'',
            dateType:'7',
            currentUserId:Cookies.get('username'),
            buttonType:'false',
            buttonStatus7:false,
            buttonStatus15:true,
            buttonStatus30:true
        }
    }
    componentWillMount(){
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let api =`${Config.REPORT_URL_PREFIX}master/masterView?currentUserId=${this.state.currentUserId}&dateType=${this.state.dateType}&industry=${this.state.industry}`;
        this.store.fetchData(api)
    }
    selectChange=(industry,event)=>{
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.setState({
            industry:encodeURI(event.toString())
        },()=> {
            let api =`${Config.REPORT_URL_PREFIX}master/masterView?currentUserId=${this.state.currentUserId}&dateType=${this.state.dateType}&industry=${this.state.industry}`;
            this.store.fetchData(api)
        })
    };
    dateType=(e)=>{
        if(e.target.value==7){
            this.setState({
                buttonStatus7:false,
                buttonStatus15:true,
                buttonStatus30:true
            })
        }else if(e.target.value==15){
            this.setState({
                buttonStatus7:true,
                buttonStatus15:false,
                buttonStatus30:true
            })
        }else {
            this.setState({
                buttonStatus7:true,
                buttonStatus15:true,
                buttonStatus30:false
            })
        }
        console.log(e.target.value)
        this.setState({
            dateType:e.target.value
        },()=> {
            //判断登陆状态
            if(_mm.loginStatus()==false){
                return;
            }
            let api =`${Config.REPORT_URL_PREFIX}master/masterView?currentUserId=${this.state.currentUserId}&dateType=${this.state.dateType}&industry=${this.state.industry}`;
            this.store.fetchData(api)
        })

    };
    render(){
        const data = [
            {
                title: '同期页面访问量(PV)',
                value: this.store.lastPv
            },
            {
                title: '实际页面访问量(PV)',
                value: this.store.totalPv
            },
            {
                title: '增幅',
                value: this.store.rate
            }
        ];
        let industryList=JSON.parse(localStorage.a).industryList;

        return(
            <div className='allBorder'>
                <Bread></Bread>
                <List style={{marginTop:'20px'}}
                      grid={{ gutter: 16, column: 3 }}
                      dataSource={data}
                      renderItem={item => (
                    <List.Item>
                        <Card style={{
                        textAlign:'center'}}
                         title={item.title}>{item.value}</Card>
                    </List.Item>
                    )}
                />
                <div style={{border:'2px solid #E8E8E8'}}>
                    <Row
                        style={{marginTop:'20px',paddingBottom:'20px',marginBottom:'40px',borderBottom:'2px solid #E8E8E8'}}
                        className='rowStyle' type="flex" justify="start">
                        <Col span={6} className='colStyle'>
                            <ButtonGroup>
                                <Button type='primary' ghost={this.state.buttonStatus7} value='7' onClick={this.dateType} size='default'>近7天</Button>
                                <Button type='primary'ghost={this.state.buttonStatus15}  value='15' onClick={this.dateType} size='default'>近15天</Button>
                                <Button type='primary' ghost={this.state.buttonStatus30} value='30' onClick={this.dateType} size='default'>近30天</Button>
                            </ButtonGroup>
                        </Col>
                        <Col span={6} className='colStyle'>
                            <span style={{marginRight:'10px'}}>产业：</span>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="请输入"
                                id="industry"
                                name="industry"
                                optionFilterProp="children"
                                onChange={this.selectChange.bind(this,'industry')}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                <option value="">全部&nbsp;&nbsp;&nbsp;&nbsp;</option>

                                {
                                    industryList.map(data =>
                                            <Option value={data.industryName}>{data.industryName}</Option>
                                    )
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row className='rowStyle'>
                        <Col span={24} style={{position:'relative'}}>
                            <Spin
                                style={{display:`${this.store.spinShow}`,
                                 position:'absolute',zIndex:'10',top:'40%',left:'50%'}}
                                size="large"/>
                            <ResponsiveContainer width='100%' height={450} >
                                <LineChart  data={this.store.dataList}
                                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="currentDate" height={60} tick={<CustomizedAxisTick/>}>
                                    </XAxis>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend />
                                    <Line type="monotone" dataKey="currentPv" name="实际" stroke="#8884d8"
                                          strokeWidth={2}/>
                                    <Line type="monotone" dataKey="lastPv" name="同期" stroke="#82ca9d" strokeWidth={2}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default PvView;
