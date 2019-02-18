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
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const _mm = new MUtil();
const {TextArea} = Input;

class XWSum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: {
                spinning: false,
                size: 'large'
            },
            dataList: [],
            industryList:[],
            industrySelect: "",//产业选中数据
            orderXw:"",
            industry:"",
            pageSize:10,
            total:'',
            currentPage:1,
            startDate:"",
            endDate:"",
            startDateDefault:moment(this.props.start)||moment().format('YYYY-MM-DD'),//开始时间
            endDateDefault:moment(this.props.end)||moment().format('YYYY-MM-DD'),//结束时间
            dateFormat: 'YYYY-MM-DD',
            ceshiList:[],
            num:0,
            rowValue:"",
            dataAll:[],
        };

    }
    changeTime = dates => {
        this.state.startDate=moment(dates[0]).format('YYYYMMDD');
        this.state.endDate=moment(dates[1]).format('YYYYMMDD');
        this.state.startDateDefault = dates[0]
        this.state.endDateDefault = dates[1]
    }
    //发送fetch请求
    fetch = () => {
        let url = `${Config.REPORT_URL_PREFIX}xwSummary/getSummaryNoPage?orderXw=${this.state.orderXw}&industry=${this.state.industry}&startDate=${this.state.startDate}&endDate=${this.state.endDate}`;
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
        const date=new Date(this.state.endDateDefault).getTime()-new Date(this.state.startDateDefault).getTime();
        const days=Math.floor(date/(24*3600*1000));
        if(days>30){
            _mm.errorTips("时间间隔不能大于30天");
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
                if(data.dataList.length==0){
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
                        dataAll:data.dataList,
                        dataList:data.dataList[0],
                        loading: {
                            spinning: false,
                            size: 'large'
                        },
                        total:data.totalElement,
                        ceshiList:data.dataList[0][0].seq
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
        this.state.startDate=moment(this.state.startDateDefault).format('YYYYMMDD');
        this.state.endDate=moment(this.state.endDateDefault).format('YYYYMMDD');
    }
    onExtractSelect = (e) => {
        this.setState({
            industry: e,
            industrySelect: [e]
        });
    };
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
    onExtractValue = (e) => {
        if (e.target.id === 'orderXw') {
            this.setState({
                orderXw: e.target.value
            })
        }
    };
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page,
            pageSize:pageSize,
        },function(){
            /*let url = `${Config.REPORT_URL_PREFIX}xwSummary/getSummary?orderXw=${this.state.orderXw}&industry=${this.state.industry}&startDate=${this.state.startDate}&endDate=${this.state.endDate}`;
            url+=`&currentPage=${this.state.currentPage}&pageSize=${this.state.pageSize}`;
            this.state.dataList = [];
            this.fetchData(url);*/
            this.setState({
                dataList:this.state.dataAll[this.state.currentPage-1],
                // total:this.state.dataAll.length,
                ceshiList:this.state.dataAll[this.state.currentPage-1][0].seq
            })
        });
    };
    render() {
        const columns = [{
            title: '小微',
            dataIndex: 'orderXW',
            key: 'orderXW',
            align:'center',
            render: (value, row,index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                let str = this.state.rowValue;
                if (str === ""){
                    obj.props.rowSpan = this.state.ceshiList[this.state.num];
                    this.state.rowValue = value;
                }else if (str == value){
                    obj.props.rowSpan = 0;
                }else {
                    this.state.num = this.state.num + 1;
                    this.state.rowValue = value
                    obj.props.rowSpan = this.state.ceshiList[this.state.num];
                }
                if (index === this.state.pageSize - 1 || index === this.state.dataList.length -1) {
                    this.state.num = 0;
                    this.state.rowValue = "";
                }
                return obj;
            },
        },{
            title: '产业',
            dataIndex: 'industry',
            key: 'industry',
            align:'center',
        }, {
            title: '销额',
            children: [{
                title: '京东帮',
                dataIndex: 'jdbm',
                key: 'jdbm',
                align:'center',
            },{
                title: '主站',
                dataIndex: 'jdzm',
                key: 'jdzm',
                align:'center',
            },{
                title: '合计',
                dataIndex: 'totalM',
                key: 'totalM',
                align:'center',
            }],
        }, {
            title: '占比',
            children: [{
                title: '京东帮',
                dataIndex: 'jdbp',
                key: 'jdbp',
                align:'center',
            }, {
                title: '主站',
                dataIndex: 'jdzp',
                key: 'jdzp',
                align:'center',
            }],
        }];
        let salt = JSON.parse(localStorage.a).salt.toString();
        let downLoadUrl =`${Config.REPORT_URL_PREFIX}xwSummary/export?orderXw=${this.state.orderXw}&industry=${this.state.industry}&startDate=${this.state.startDate}&endDate=${this.state.endDate}`;
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
                            <span>所属小微：</span><Input id={"orderXw"} value={this.state.orderXw}
                                                      onChange={this.onExtractValue}
                                                      style={{width: 100}}/>
                        </Col>
                        <Col xl={7} className='commonMarginTop'>
                            <span>所属产业：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                     onChange={this.onExtractSelect}>
                                <Option value="">全部</Option>
                                {
                                    this.state.industryList.map(values =>
                                        <Option value={values.industryName}>{values.industryName}</Option>
                                    )
                                }
                            </Select>
                        </Col>
                        <Col xl={10} className='commonMarginTop'>
                            <div>
                                <span>订单时间：</span>
                                <RangePicker
                                    allowClear={false}
                                    defaultValue={[this.state.startDateDefault, this.state.endDateDefault]}
                                    onChange={ this.changeTime }
                                />
                            </div>
                        </Col>
                        <Col xl={2} className='commonMarginTop'>
                            <Button type="primary" onClick={this.fetch}>查询</Button>
                        </Col>
                    </Row>
                </div>
                    {salt.indexOf('D')!==-1?<Row span={6}  className='commonMarginTop'>
                        <DownloadComponent downLoadUrl={downLoadUrl} buttonName={'导出'} spanSize={6} />
                    </Row>:''}
                <Table loading={this.state.loading} style={{marginTop: '20px'}}
                       pagination={{pageSize:this.state.pageSize,current:this.state.currentPage,
                           total:this.state.total,hideOnSinglePage:true,
                           onChange:this.pageChange}}
                       dataSource={this.state.dataList} columns={columns} bordered scroll={{ x: 1200 }}/>
            </div>

        );
    }
}

XWSum.propTypes = {};
export default XWSum;
