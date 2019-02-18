/**
 * Created by guotaidou on 2018/6/22.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import Cookies from 'js-cookie';
import { Table ,List,Card} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
@inject('store')
@observer
class IndustrySale extends Component{
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state={
            currentUserId:Cookies.get('username'),
            startDate:moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment().format('YYYY-MM-DD'),//结束时间
            shopType:'全部',
            brand:'全部',
            industry:'全部',
            totalNum:'',
            totalAmount:'',
            totalAmounts:'',
            dateFormat:'YYYY-MM-DD',
            columns:''
        }
    }

    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.ifBrand()
    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    //判断品牌选择显示列x
    ifBrand=()=>{
        if(this.state.brand!='全部' && this.state.brand.trim()!=''){
            const column=[
                {
                    title: '品牌',
                    dataIndex: 'brand',
                    key: 'brand',
                    align:'center'
                },
                {
                    title: '产业',
                    dataIndex: 'industry',
                    key: 'industry',
                    align:'center'
                },
                {
                    title: '数量',
                    dataIndex: 'reportTotalNum',
                    key: 'reportTotalNum',
                    align:'center'
                },
                {
                    title: '总金额（直采价）',
                    dataIndex: 'reportTotalAmount',
                    key: 'reportTotalAmount',
                    align:'center'
                },
                {
                    title: '总金额（开票价）',
                    dataIndex: 'unitPrice',
                    key: 'unitPrice',
                    align:'center'
                }
            ];
            this.setState({columns:column})
        }else{
            const column1=[
                {
                    title: '产业',
                    dataIndex: 'industry',
                    key: 'industry',
                    align:'center'
                },
                {
                    title: '数量',
                    dataIndex: 'reportTotalNum',
                    key: 'reportTotalNum',
                    align:'center'
                },
                {
                    title: '总金额（直采价）',
                    dataIndex: 'reportTotalAmount',
                    key: 'reportTotalAmount',
                    align:'center'
                },
                {
                    title: '总金额（开票价）',
                    dataIndex: 'unitPrice',
                    key: 'unitPrice',
                    align:'center'
                }
            ];
            this.setState({columns:column1})
        }
    };

    //发送fetch请求
    fetch=()=>{
        let url =`${Config.REPORT_URL_PREFIX}bangReport/reportIndustry?`
            +`startDate=${this.state.startDate}&endDate=${this.state.endDate}&shopType=${this.state.shopType}&brand=${this.state.brand}&industry=${this.state.industry}&currentUserId=${this.state.currentUserId}`;
        console.log("1"+this.state.brand+"1");
        this.ifBrand();
        this.store.fetchData(url);
    };
    render(){
        let salt = JSON.parse(localStorage.a).salt.toString();
        let downloadUrl =`${Config.REPORT_URL_PREFIX}bangReport/download?startDate=${this.state.startDate}&endDate=${this.state.endDate}&shopType=${this.state.shopType}&brand=${this.state.brand}&industry=${this.state.industry}&currentUserId=${this.state.currentUserId}`;
        const data = [
            {
                title: '销售总数',
                value: this.store.totalNum
            },
            {
                title: '销售总额(直采价)',
                value: this.store.totalAmount
            },
            {
                title: '销售总额(开票价)',
                value: this.store.totalAmounts
            }
        ];
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    startDate='true'
                    shopType='true'
                    industry='true'
                    brandList='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'}/>:''
                    }
                </ConditionHeader>

                <div style={{marginTop:'40px'}}>
                    <div>
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
                        <Table loading={this.store.loading}
                               rowClassName='JAgeOther' style={{marginTop:'20px'}}
                               pagination={{hideOnSinglePage:true, current:this.store.currentPage,
                                   onChange:this.store.pageChange}}
                               bordered size='middle' columns={this.state.columns}
                               dataSource={this.store.dataList}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default IndustrySale;