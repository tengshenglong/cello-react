/**
 * Created by guotaidou on 2018/6/12.
 */
import React, {Component} from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import '../../common/css/TotalOutStoreTable.css';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import AlertInfo from '../../common/commonComponents/AlertInfo';//提示信息组件
import ConditionHeader from '../../common/commonComponents/ConditionHeader';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
//查询条件组件
const _mm=new MUtil();

class TotalOutStore extends Component {
    constructor(props) {
        super(props);
        this.state={
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            masterTotalAmt:'',
            masterTotalUnitAmount:'',
            masterTotalActAmount:'',
            bangTotalAmt:'',
            bangTotalUnitAmount:'',
            bangTotalActAmount:'',
            target:"",
            tq:"",
            pop:"",
            emp:"",
            final:"",
            totalreality:"",
            totaltarget:"",
            totaltq:"",
            totalpop:"",
            totalemp:"",
            totalfinal:"",
            data:[],
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
    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //发送fetch请求
    fetch=()=>{
        let url =`${Config.REPORT_URL_PREFIX}les/report?startTime=${this.state.startDate}&endTime=${this.state.endDate}`;
        this.fetchData(url);
    };
    fetchData = (url) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        if(this.state.startDate===''||this.state.startDate==undefined){
            _mm.errorTips("时间不能为空");
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
                if(data.dataList==null||data.dataList== 0){
                    this.setState({
                        data:[],
                        show:'hidden'
                    });
                    _mm.errorTips('没有数据!');
                }else{
                    this.setState({
                        data:data.dataList,
                        show:'',
                        masterTotalAmt:data.masterTotalAmt,
                        masterTotalUnitAmount:data.masterTotalUnitAmount,
                        masterTotalActAmount:data.masterTotalActAmount,
                        bangTotalAmt:data.bangTotalAmt,
                        bangTotalUnitAmount:data.bangTotalUnitAmount,
                        bangTotalActAmount:data.bangTotalActAmount,
                        target:data.target,
                        reality:data.reality,
                        tq:data.tq,
                        emp:data.emp,
                        final:data.final,
                        totaltq:data.totaltq,
                        totaltarget:data.totaltarget,
                        totalreality:data.totalreality,
                        totalpop:data.totalpop,
                        totalemp:data.totalemp,
                        totalfinal:data.totalfinal
                    })
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };
    render(){
        const {totalpop,totaltarget,totalreality,totaltq,totalemp,totalfinal, spinShow,show,masterTotalAmt,masterTotalUnitAmount,masterTotalActAmount,bangTotalAmt,bangTotalUnitAmount,bangTotalActAmount}=this.state;
        let downloadUrl=`${Config.REPORT_URL_PREFIX}les/excel?startTime=${this.state.startDate}&endTime=${this.state.endDate}`;
        let salt = JSON.parse(localStorage.a).salt.toString();
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} downStyle={{marginBottom:-10}}/>:''
                    }
                </ConditionHeader>
                <AlertInfo   info='本页面数据时间统计维度为京东订单时间，请知悉！同期和增幅不包含POP数据！目标和完成率包含POP数据！'/>
                <div className='TotalOutStoreTable' style={{marginTop:'20px',position:'relative'}}>
                    <Spin style={{display:`${spinShow}`,position:'absolute',zIndex:'10',top:'60px',left:'50%'}} size="large" />
                    <table style={{textAlign:'center'}} border="1p" cellSpacing="0" width="100%" height="100%">
                        <thead style={{height:'50px',backgroundColor:'#FAFAFA'}}>
                        <tr>
                            <th>品类</th>
                            <th>生态</th>
                            <th>数量（台）</th>
                            <th>总金额（直采价）</th>
                            <th>净收入</th>
                            <th>同期(主+帮)</th>
                            <th>增幅(主+帮)</th>
                            <th>POP金额</th>
                            <th>目标</th>
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
                                                    <td rowSpan="3">{data2.reality}</td>
                                                    <td rowSpan="3">{data2.tq}</td>
                                                    <td rowSpan="3"><span style={{color:parseFloat(data2.emp)>=0?'':'red'}} title ={data2.emp}>{data2.emp}</span></td>
                                                    <td rowSpan="3">{data2.pop}</td>
                                                    <td rowSpan="3">{data2.target}</td>
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
                                                <tr style={{fontWeight:'bold',fontSize:'16px'}}>
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
                        <tr style={{fontWeight:'bold',color:'#FF0000',fontSize:'16px'}}>
                            <td rowSpan="3">合计</td>
                            <td>京东帮</td>
                            <td>{bangTotalAmt}</td>
                            <td>{bangTotalUnitAmount}</td>
                            <td rowSpan="3">{totalreality}</td>
                            <td rowSpan="3">{totaltq}</td>
                            <td rowSpan="3">{totalemp}</td>
                            <td rowSpan="3">{totalpop}</td>
                            <td rowSpan="3">{totaltarget}</td>
                            <td rowSpan="3">{totalfinal}</td>
                        </tr>
                        <tr style={{fontWeight:'bold',color:'#FF0000',fontSize:'16px'}}>
                            <td>主站</td>
                            <td>{masterTotalAmt}</td>
                            <td>{masterTotalUnitAmount}</td>
                        </tr>
                        <tr style={{fontWeight:'bold',color:'#FF0000',fontSize:'16px'}}>
                            <td>主+帮</td>
                            <td>{parseInt(masterTotalAmt)+parseInt(bangTotalAmt)}</td>
                            <td>{parseInt(masterTotalUnitAmount)+parseInt(bangTotalUnitAmount)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TotalOutStore;
