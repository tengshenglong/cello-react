import React from "react";
import {inject, observer} from 'mobx-react';
import Cookies from 'js-cookie';
import moment from 'moment';
import '../../common/css/baseStyle.css';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import ModalComponent from '../../common/commonComponents/ModalComponent.js';//上传组件
import MatnrPV from './MatnrPv.js';//上传组件
import {Button, Col,Breadcrumb, DatePicker, Input, Row, Table} from "antd";
const _mm = new MUtil();
@inject('store')
@observer
class MasterDetail extends React.Component {
    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList = [];
        this.state = {
            matnrData: "",
            jdSku: "",//jdSku
            jdSkuProps: "",//传递当前列表的jdSku
            startDate: moment().format('YYYY-MM-DD'),//开始时间
            endDate: moment().format('YYYY-MM-DD'),//结束时间
            currentUserId: Cookies.get('username'),
            visible: false,
            industry: '',
            modalTitle: ''
        };
    }

    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
    }

    //获取查询条件数据
    receiveData = (data)=> {
        this.setState(data)
    };
    //发送fetch请求
    fetch = ()=> {
        let url = Config.REPORT_URL_PREFIX + `master/masterList?startDate=` + this.state.startDate + `&endDate=${this.state.endDate}` + `&jdSku=` + this.state.jdSku +
            `&matnr=` + this.state.matnrData + `&currentUserId=${this.state.currentUserId}&industry=${this.state.industry}`;
        this.store.fetchData(url);
    };
    //模板显示函数
    showModal = (sku, matnr) => {
        this.setState({
            visible: true,
            jdSkuProps: sku,
            modalTitle: `${matnr}(${sku})流量变化`
        });
    };
    //模板隐藏函数
    hideModal = ()=> {
        this.setState({
            visible: false
        });
    };

    render() {
        const columns = [
            {
                title: '京东sku',
                dataIndex: 'jdSku',
                key: 'jdSku',
                align: 'center',
                render: (data, record) => {
                    return <span title={data}><a href='javascript:;'
                                                 onClick={this.showModal.bind(this,data,record.matnr)}>{data}</a></span>;
                }
            },
            {
                title: '型号',
                dataIndex: 'skuName',
                align: 'center',
                key: 'skuName',
                width: 200,
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '海尔物料',
                dataIndex: 'matnr',
                align: 'center',
                key: 'matnr',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '产业',
                dataIndex: 'industry',
                align: 'center',
                key: 'industry',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: 'PV',
                dataIndex: 'pv',
                align: 'center',
                key: 'pv',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: 'UV',
                dataIndex: 'uv',
                align: 'center',
                key: 'uv',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '数据日期',
                dataIndex: 'orderDate',
                align: 'center',
                key: 'orderDate',
                render: function (data) {
                    return <span
                        title={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            }
        ];

        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                startDate='true'
                matnrList='true'
                industry='true'
                jdSku='true'
                receiveData={this.receiveData}
                fetch={this.fetch}/>
            <ModalComponent visible={this.state.visible}
                            modalTitle={this.state.modalTitle}
                            hide={this.hideModal}>
                <MatnrPV startDate={this.state.startDate} endDate={this.state.endDate}
                         jdSku={this.state.jdSkuProps}></MatnrPV>
            </ModalComponent>

            <div style={{marginTop:'40px'}}>
                <div className='rowStyle'>
                    <Table loading={this.store.loading}
                           pagination={{ current:this.store.currentPage,
                           onChange:this.store.pageChange}}
                           scroll={{x:200}} size='middle'
                           bordered dataSource={this.store.dataList}
                           columns={columns}/>
                </div>
            </div>
        </div>;
    }
}
MasterDetail.propTypes = {};

export default MasterDetail;