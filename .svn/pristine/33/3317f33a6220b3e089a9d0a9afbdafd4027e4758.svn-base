import React, {Component} from 'react';
import {
    Button,
    message,
    Input,
    Row,
    Select,
    Table,
    Col, Upload, Icon, Alert,DatePicker,antd
} from 'antd';
import MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
import moment from 'moment';
import UpLoad from "../../common/commonComponents/UpLoad";
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const _mm = new MUtil();
const {TextArea} = Input;

class JDstoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: {
                spinning: true,
                size: 'large'
            },
            dataList: [],
            fileList: [],
            code:"",
            storeName:"",
            pageSize:10,
            total:'',
            currentPage:1,
            startDate: "",//开始时间
            endDate: "",//结束时间
            dateFormat: 'YYYY-MM-DD'
        };

    }

    changeTime = dates => {
        if(dates.length < 2){
            this.state.startDate = ""
            this.state.endDate = ""
        }else {
            this.state.startDate = moment(dates[0]).format('YYYY-MM-DD');
            this.state.endDate = moment(dates[1]).format('YYYY-MM-DD');
        }
    }
    //发送fetch请求
    fetch = () => {
        let url = `${Config.REPORT_URL_PREFIX}jdStore/findAll?code=${this.state.code}&storeName=${this.state.storeName}&startDate=${this.state.startDate}&endDate=${this.state.endDate}`;
        url+=`&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
        this.setState({currentPage:1},function(){
            this.fetchData(url);
        });
    };
    fetchData = (url) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.setState({
            loading: {
                spinning: true,
                size: 'large'
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
                if(data.content.length==0){
                    _mm.errorTips('没有数据');
                    this.setState({
                        loading: {
                            spinning: false,
                            size: 'large'
                        },
                        dataList:[],
                        total:''
                    });
                }else {
                    this.setState({
                        dataList:data.content,
                        loading: {
                            spinning: false,
                            size: 'large'
                        },
                        total:data.totalElements
                    })
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
                this.setState({
                    loading: {
                        spinning: false,
                        size: 'large'
                    }
                });
            });
    };

    componentWillMount() {
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.setState({
            industryList: JSON.parse(localStorage.a).industryList
        });
        this.fetch();
    }


    showEditModal = (record) => {
        this.setState({
            visible: true,
            id: record.id,
            industry: record.industry,
            matnrId: record.matnr,
            modelId: record.model,
            brandId: record.brandName,
        });
    };
    export = () => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let api =`${Config.REPORT_URL_PREFIX}jdStore/export`;
        window.location.href=api;
    };

    onExtractValue = (e) => {
        if (e.target.id === 'code') {
            this.setState({
                code: e.target.value
            })
        } else if (e.target.id === 'storeName') {
            this.setState({
                storeName: e.target.value
            })
        } else if (e.target.id === 'createTime') {
            this.setState({
                createTime: e.target.value
            })
        }
    };
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize
        },function(){
            let url = `${Config.REPORT_URL_PREFIX}jdStore/findAll?code=${this.state.code}&storeName=${this.state.storeName}&startDate=${this.state.startDate}&endDate=${this.state.endDate}`;
            url+=`&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
            this.fetchData(url);
        });
    };
    render() {
        const columns = [{
            title: '专卖店编码',
            dataIndex: 'code',
            align: 'center',
            key: 'code',
            width: 200,
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }, {
            title: '专卖店名称',
            dataIndex: 'storeName',
            align: 'center',
            key: 'storeName',
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        },  {
            title: '创建时间',
            dataIndex: 'createTime',
            align: 'center',
            key: 'createTime',
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }
        ];
        let salt = JSON.parse(localStorage.a).salt.toString();
        let uploadUrl =`${Config.REPORT_URL_PREFIX}jdStore/excelUp`;
        let templateDown =`${Config.REPORT_URL_PREFIX}jdStore/downTemplate`;
        let exportDownUrl =`${Config.REPORT_URL_PREFIX}jdStore/export`;
        return (

            <div className='allBorder'>
                <Bread></Bread>
                <div style={{
                    marginTop: '20px',
                    borderTop: '3px solid #F0F2F5', paddingTop: '10px', paddingBottom: '20px',
                    borderBottom: '3px solid #F0F2F5'
                }}>
                    <Row type="flex">
                        <Col xl={5} className='commonMarginTop'>
                            <span>专卖店编码：</span><Input id={"code"} value={this.state.code}
                                                     onChange={this.onExtractValue}
                                                     style={{width: 100}}/>
                        </Col>
                        <Col xl={7} className='commonMarginTop'>
                            <span>专卖店名称：</span><Input id={"storeName"} value={this.state.storeName}
                                                     onChange={this.onExtractValue}
                                                     style={{width: 160}}/>
                        </Col>
                        <Col xl={10} className='commonMarginTop'>
                            <div>
                                <span>创建时间：</span>
                                <RangePicker
                                    onChange={ this.changeTime }
                                />
                            </div>
                        </Col>
                        <Col xl={2} className='commonMarginTop'>
                            <Button type="primary" onClick={this.fetch}>查询</Button>
                        </Col>
                    </Row>
                </div>
                {
                    salt.indexOf('W')!==-1 || salt.indexOf('D')!==-1  ?  <Row className='rowStyle' type="flex" justify="start" style={{borderBottom: '3px solid #F0F2F5'}}>
                        {
                            salt.indexOf('W')!==-1  ?
                                <UpLoad uploadUrl={uploadUrl} buttonName={'上传'} spanSize={6}  />:''
                        }
                        {
                            salt.indexOf('W')!==-1  ?
                                <DownloadComponent downLoadUrl={templateDown} buttonName={'模版下载'} spanSize={6} />:''
                        }
                        {
                            salt.indexOf('D')!==-1  ?
                                <DownloadComponent downLoadUrl={exportDownUrl} buttonName={'导出'} spanSize={6}  downStyle={{marginLeft:-1.5,marginBottom:10,borderLeft:'3px solid #F0F2F5',paddingLeft:'10%'}} /> :''
                        }
                    </Row   >:''
                }
                <Table loading={this.state.loading} style={{marginTop: '20px'}}
                       pagination={{pageSize:this.state.pageSize,current:this.state.currentPage,
                           total:this.state.total,hideOnSinglePage:true,
                           onChange:this.pageChange}}
                       dataSource={this.state.dataList} columns={columns} bordered scroll={{ x: 1200 }}/>
            </div>

        );
    }
}

JDstoreList.propTypes = {};
export default JDstoreList;
