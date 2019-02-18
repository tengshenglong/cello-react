/**
 * Created by guotaidou on 2018/7/13.
 */
import React, {Component} from 'react';
import moment from 'moment';
import {Button, Col, DatePicker, Row, Select, Table,Breadcrumb,List, Card ,Input,Spin } from 'antd';
import '../../common/css/TotalOutStoreTable.css';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
import  MUtil from '../../common/util/mm';
const _mm=new MUtil();
const {RangePicker} = DatePicker;

class OutStore extends Component {
    constructor(props) {
        super(props);
        this.state={
            dateFormat:'YYYY-MM-DD',
            startDate:moment(moment() - 24*60*60*1000).format("YYYY-MM-DD"),
            endDate:moment(moment() - 24*60*60*1000).format("YYYY-MM-DD"),
            masterTotalAmt:'',
            masterTotalUnitAmount:'',
            masterTotalActAmount:'',
            bangTotalAmt:'',
            bangTotalUnitAmount:'',
            bangTotalActAmount:'',
            data:[],
            show:'hidden',
            spinShow:'none'
        }
    }
    componentWillMount(){
        document.title='2C出库汇总页面';
        this.fetchOrders();
    }
    startDateChange = (value,dateString) => {
        this.setState({
            startDate:dateString
        });
    };
    endDateChange = (value,dateString) => {
        this.setState({
            endDate:dateString
        });
    };
    fetchOrders = () => {
        let start=new Date(this.state.startDate).getTime();
        let end=new Date(this.state.endDate).getTime();
        if(this.state.startDate==''||this.state.endDate==''){
            _mm.errorTips('日期不能为空!');
            return;
        }
        if(end<start){
            _mm.errorTips('结束日期必须大于或等于开始日期!');
            return;
        }
        this.setState({
            spinShow:'block'
        });
        let api =`${Config.REPORT_URL_PREFIX}les/report?startTime=${this.state.startDate}&endTime=${this.state.endDate}`;
        _mm.FetchUtil.init()
            .setUrl(api)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((orders) => {
                this.setState({
                    spinShow:'none'
                });
                if(orders.flag== false){
                    this.setState({
                        data:[],
                        show:'hidden'
                    });
                    _mm.errorTips('没有数据!');
                }else{
                    this.setState({
                        data:orders.lesList,
                        show:'',
                        masterTotalAmt:orders.masterTotalAmt,
                        masterTotalUnitAmount:orders.masterTotalUnitAmount,
                        masterTotalActAmount:orders.masterTotalActAmount,
                        bangTotalAmt:orders.bangTotalAmt,
                        bangTotalUnitAmount:orders.bangTotalUnitAmount,
                        bangTotalActAmount:orders.bangTotalActAmount,
                        totaltarget:orders.totaltarget,
                        totaltq:orders.totaltq,
                        totalemp:orders.totalemp,
                        totalfinal:orders.totalfinal
                    })
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };
    render(){
        const {totaltarget,totaltq,totalemp,totalfinal,spinShow,show,masterTotalAmt,masterTotalUnitAmount,masterTotalActAmount,bangTotalAmt,bangTotalUnitAmount,bangTotalActAmount}=this.state;
        return(

                <div className='TotalOutStoreTable'>
                    <Row  className='rowStyle' type="flex" justify="start">
                        <Col span={8}>
                            <DatePicker size='small' placeholder={this.state.startDate} onChange={this.startDateChange} format={this.state.dateFormat}/>
                        </Col>
                        ~
                        <Col span={8}>
                            <DatePicker size='small' placeholder={this.state.endDate} onChange={this.endDateChange} format={this.state.dateFormat}/>
                        </Col>
                        <Col span={2} style={{marginLeft:5}}>
                            <Button  size='small'  type="primary" onClick={this.fetchOrders}>查询</Button>
                        </Col>
                    </Row>
                    <Spin style={{display:`${spinShow}`,position:'absolute',zIndex:'10',top:'60px',left:'45%'}} size="large" />
                    <table style={{textAlign:'center',fontSize:8,marginTop:10}} border="1px" cellSpacing="0" width="100%" height="100%">
                        <thead style={{height:'50px',backgroundColor:'#FAFAFA'}}>
                        <tr>
                            <th>品类</th>
                            <th>生态</th>
                            <th>数量(台)</th>
                            <th>总金额(直采价)</th>
                            <th>目标</th>
                            <th>同期</th>
                            <th>增幅</th>
                            <th>完成率</th>
                        </tr>
                        </thead>
                        <tbody style={{visibility:show}}>
                        {
                            this.state.data.map((data1)=>{
                                return(
                                    data1.lesList.map((data2,index)=>{
                                        if(index==0){
                                            return(
                                                <tr>
                                                    <td rowSpan="3">{data1.industry}</td>
                                                    <td>{data2.orderFlag}</td>
                                                    <td>{data2.bangAmt}</td>
                                                    <td>{data2.bangUnitPrice}</td>
                                                    <td rowSpan="3">{data2.target}</td>
                                                    <td rowSpan="3">{data2.tq}</td>
                                                    <td rowSpan="3">{data2.emp}</td>
                                                    <td rowSpan="3">{data2.final}</td>
                                                </tr>
                                            )
                                        }else if(index==1){
                                            return(
                                                <tr>
                                                    <td>{data2.orderFlag}</td>
                                                    <td>{data2.masterAmt}</td>
                                                    <td>{data2.masterUnitPrice}</td>
                                                </tr>
                                            )
                                        }else{
                                            return(
                                                <tr style={{fontWeight:'bold'}}>
                                                    <td>主+帮</td>
                                                    <td>{parseInt(data1.lesList[0].bangAmt) + parseInt(data1.lesList[1].masterAmt)}</td>
                                                    <td>{parseInt(data1.lesList[0].bangUnitPrice) + parseInt(data1.lesList[1].masterUnitPrice)}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                )
                            })
                        }
                        <tr style={{fontWeight:'bold',color:'#FF0000'}}>
                            <td rowSpan="3">合计</td>
                            <td>京东帮</td>
                            <td>{bangTotalAmt}</td>
                            <td>{bangTotalUnitAmount}</td>
                            <td rowSpan="3">{totaltarget}</td>
                            <td rowSpan="3">{totaltq}</td>
                            <td rowSpan="3">{totalemp}</td>
                            <td rowSpan="3">{totalfinal}</td>
                        </tr>
                        <tr style={{fontWeight:'bold',color:'#FF0000'}}>
                            <td>主站</td>
                            <td>{masterTotalAmt}</td>
                            <td>{masterTotalUnitAmount}</td>
                        </tr>
                        <tr style={{fontWeight:'bold',color:'#FF0000'}}>
                            <td>主+帮</td>
                            <td>{parseInt(masterTotalAmt)+parseInt(bangTotalAmt)}</td>
                            <td>{parseInt(masterTotalUnitAmount)+parseInt(bangTotalUnitAmount)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
        )
    }
}
export default OutStore;