import React from 'react';
import {inject, observer} from 'mobx-react';
import Cookies from "js-cookie";
import moment from 'moment';
import {Button, Col, Row, DatePicker, Table, Upload, Icon, Select, List, Card} from 'antd';
import '../../common/css/baseStyle.css';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import DownloadComponent from '../../common/commonComponents/DownloadComponent.js';//下载模板组件
import UpLoad from '../../common/commonComponents/UpLoad.js';//上传组件
import commonStore from '../../stores/commonStore/commonStore';
const _mm = new MUtil();
@inject('store')
@observer
class POPMaintain extends React.Component {

    constructor(props) {
        super(props);
        this.store=new commonStore();
        this.store.dataList=[];
        this.columns = [
            {
                title: '京东三级类目',
                dataIndex: 'jdIndustry',
                align: 'center',
                key: 'jdIndustry',
                width: 120,
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            }, {
                title: '海尔产业',
                dataIndex: 'hrIndustry',
                align: 'center',
                key: 'hrIndustry',
                width: 120,
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            }, {
                title: '更新日期',
                dataIndex: 'createDate',
                align: 'center',
                key: 'createDate',
                width: 120,
                render: function (data) {
                    return <span
                        title={data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}>{data === undefined ? "" : new moment(data).format("YYYY-MM-DD")}</span>;
                }
            }
        ];
        this.state = {
            currentUserId:Cookies.get('username'),
            industry: '',
            pageSize:10,
            total:'',
            currentPage:1
        };
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
        this.state.currentPage = 1;
        let url = Config.REPORT_URL_PREFIX + `pop/findAllPOPIndustry?`
        +`hrIndustry=${this.state.industry}&currentUserId=${this.state.currentUserId}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
        this.store.fetchData(url);
    };
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url = Config.REPORT_URL_PREFIX + `pop/findAllPOPIndustry?`
                +`hrIndustry=${this.state.industry}&currentUserId=${this.state.currentUserId}&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
            this.store.fetchData(url);
        });
    };
    render() {
        let salt=JSON.parse(localStorage.a).salt.toString();
        let downLoadComponentUrl = `${Config.REPORT_URL_PREFIX}pop/excelDownload`;
        let uploadUrl=Config.REPORT_URL_PREFIX + 'pop/excelUpload';
        return <div className='allBorder'>
            <Bread></Bread>
            <ConditionHeader
                search='true'
                industry='true'
                receiveData={this.receiveData}
                fetch={this.fetch}>
                {
                    salt.indexOf("W")!==-1 ? <DownloadComponent downLoadUrl={downLoadComponentUrl} buttonName={'模版下载'} downStyle={{marginLeft:20}} /> : ''
                }
                {
                    salt.indexOf("W")!==-1 ? <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} upStyle={{marginLeft:20}} /> : ''
                }
            </ConditionHeader>
            {/*数据显示表格*/}
            <div style={{marginTop: '20px'}}>
                <Table loading={this.store.loading} size='middle' bordered
                       pagination={{ current:this.state.currentPage,
                           pageSize:this.state.pageSize,
                           total:this.store.totalElement,
                       onChange:this.pageChange}}
                       dataSource={this.store.dataList}
                       columns={this.columns} scroll={{x: 1000}}/>
            </div>
        </div>;
    }
}

POPMaintain.propTypes = {};

export default POPMaintain;