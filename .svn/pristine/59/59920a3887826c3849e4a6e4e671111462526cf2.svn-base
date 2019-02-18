/**
 * Created by guotaidou on 2018/6/28.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Cookies from 'js-cookie';
import {Table} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import '../../common/css/JAge.css';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";

const _mm = new MUtil();
@inject('store')
@observer
class JDetail extends Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.state={
            industry:'',//产业
            kuPositionCode:'',//库位编码
            gmName:'',//工贸名称
            currentUserId:Cookies.get('username'),
            passDate:'',//超期状态
            matnr:'',//物料编码
            invAgingCode:''
        }
    }

    componentWillMount() {
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
        let url=`${Config.REPORT_URL_PREFIX}klMessage/findKlDetails?`
            +`currentUserId=${this.state.currentUserId}&lgort=${this.state.kuPositionCode}`
            +`&industry=${this.state.industry}&cqflag=${this.state.passDate}`
            +`&gmName=${this.state.gmName}&mtlCode=${this.state.matnr}&invAgingCode=${this.state.invAgingCode}`;
        this.store.fetchData(url);
    };
    render() {
        const columns = [
            {
                title: '数据日期',
                dataIndex: 'createdDate',
                key: 'createdDate',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '产业',
                dataIndex: 'industryName',
                key: 'industryName',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '物料编码',
                dataIndex: 'mtlCode',
                key: 'mtlCode',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '物料描述',
                dataIndex: 'skuName',
                key: 'skuName',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '库位编码',
                dataIndex: 'lgort',
                key: 'lgort',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '工贸编码',
                dataIndex: 'gmCode',
                key: 'gmCode',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '工贸名称',
                dataIndex: 'regionName',
                key: 'regionName',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '数量',
                dataIndex: 'qty',
                key: 'qty',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '库龄',
                dataIndex: 'kl',
                key: 'kl',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '超期状态',
                dataIndex: 'cqFlag',
                key: 'cqFlag',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '在途在库',
                dataIndex: 'invAgingCode',
                key: 'invAgingCode',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            }
        ];
        let downloadUrl=`${Config.REPORT_URL_PREFIX}klMessage/downloadKlParticulars?`
            +`currentUserId=${this.state.currentUserId}&lgort=${this.state.kuPositionCode}`
            +`&industry=${this.state.industry}&cqflag=${this.state.passDate}`
            +`&gmName=${this.state.gmName}&mtlCode=${this.state.matnr}&invAgingCode=${this.state.invAgingCode}`;
        let salt = JSON.parse(localStorage.a).salt.toString();
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <ConditionHeader
                    search='true'
                    industry='true'
                    matnr='true'
                    invAgingCode='true'
                    passDate='true'
                    kuPositionCode='true'
                    gmName='true'
                    receiveData={this.receiveData}
                    fetch={this.fetch}>
                    {
                        salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'}/>:''
                    }
                </ConditionHeader>
                <div style={{marginTop:'40px'}}>
                    <Table loading={this.store.loading}
                           style={{marginTop: '40px'}}
                           pagination={{defaultPageSize: 10,
                           current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                           bordered size='middle' dataSource={this.store.dataList}
                           columns={columns}/>
                </div>
            </div>
        )
    }
}

export default JDetail;
