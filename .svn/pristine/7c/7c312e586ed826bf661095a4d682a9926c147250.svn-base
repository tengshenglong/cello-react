/**
 * Created by guotaidou on 2018/5/30.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Table} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import Cookies from "js-cookie";
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
@inject('store')
@observer
class InSaleTable extends Component{
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state={
            currentUserId:Cookies.get('username')
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
    componentDidMount(){
        let url = Config.REPORT_URL_PREFIX+'jxcReport/getEntryDepositReportRest';
        this.store.fetchData(url);
    }
    render(){
        let currentUserId = this.state.currentUserId;
        const columns = [
            {
                key:1,
                title: '',
                fixed: 'left',
                children: [{
                        title: '品类',
                        dataIndex: 'invsort',
                        align:'center',
                        width:100,
                        key: 'invsort',
                        render: function(data) {
                            if (data != '合计' && salt.indexOf("D")!==-1){
                                return <span title={data}><a href={`${Config.REPORT_URL_PREFIX}jxcReport/excelDownload?currentUserId=${currentUserId}&category=${data}`}>{data}</a></span>;
                            }else {
                                return <span title={data}>{data}</span>;
                            }
                        }
                }]
            },{
                key:2,
                title:'销',
                children:[
                   {
                        title: '加权日均销量',
                        align:'center',
                        dataIndex: 'avgQty',
                        key: 'avgQty',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }, {
                        title: '加权日均销额',
                        align:'center',
                        dataIndex: 'avgPrice',
                        key: 'avgPrice',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }
                ]
            },{
                key:3,
                title:'存',
                children:[
                    {
                        title: '协同仓量',
                        align:'center',
                        dataIndex: 'jdQty',
                        key: 'jdQty',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }, {
                        title: '协同仓额',
                        align:'center',
                        dataIndex: 'jdPrice',
                        key: 'jdPrice',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }, {
                        title: '现货率',
                        align:'center',
                        dataIndex: 'spotRate',
                        key: 'spotRate',
                        render: function(data) {
                            return <span title ={data}>{data}%</span>;
                        }
                    }, {
                        title: '周转',
                        align:'center',
                        dataIndex: 'turnover',
                        key: 'turnover',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '待转入量',
                        align:'center',
                        dataIndex: 'jzyQty',
                        key: 'jzyQty',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '待转入额',
                        align:'center',
                        dataIndex: 'jzyPrice',
                        key: 'jzyPrice',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: '转入后周转',
                        align:'center',
                        dataIndex: 'turnoverLater',
                        key: 'turnoverLater',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }
                ]
            },{
                key:4,
                title:'进',
                children:[
                    {
                        title: 'J库可用量（无订单）',
                        align:'center',
                        dataIndex: 'jkyQty',
                        key: 'jkyQty',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: 'J库可用额（无订单）',
                        align:'center',
                        dataIndex: 'jkyPrice',
                        key: 'jkyPrice',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    },{
                        title: 'J库周转',
                        align:'center',
                        dataIndex: 'jturnover',
                        key: 'jturnover',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }, {
                        title: '备货在途量',
                        align:'center',
                        dataIndex: 'bhztQty',
                        key: 'bhztQty',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }, {
                        title: '备货在途额',
                        align:'center',
                        dataIndex: 'bhztPrice',
                        key: 'bhztPrice',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }
                ]
            },{
                key:5,
                title:'全流程货源周转',
                children:[
                    {
                        title: '按现零售',
                        align:'center',
                        dataIndex: 'retail',
                        key: 'retail',
                        render: function(data) {
                            return <span title ={data}>{data}</span>;
                        }
                    }
                ]
            }];
        let downloadUrl=`${Config.REPORT_URL_PREFIX}jxcReport/downEntryDepositReport`;
        let salt = JSON.parse(localStorage.a).salt.toString();
        return(
            <div className='allBorder'>
                <Bread></Bread>
                {
                    <Row style={salt.indexOf("D")!==-1?{marginTop:'20px',borderTop:'3px solid #F0F2F5',paddingTop:'20px',paddingBottom:'10px',
                        borderBottom:'3px solid #F0F2F5'}:{marginTop:'20px',paddingTop:'20px',paddingBottom:'10px'}}>
                        {
                            salt.indexOf("D")!==-1 ?   <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} spanSize={6}/>:''
                        }
                    </Row>
                }
                <Table loading={this.store.loading}
                       style={{marginTop:'20px'}}
                       pagination={{hideOnSinglePage:true,
                       current:this.store.currentPage,
                       onChange:this.store.pageChange}}
                       bordered size='middle'
                       columns={columns} dataSource={this.store.dataList} scroll={{ x: 2500 }} />
            </div>
            )
    }
}
export default InSaleTable;

