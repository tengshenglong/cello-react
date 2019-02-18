import React, {Component} from 'react';
import {
    Button,
    Input,
    Row,
    Select,
    Table,
    Col,DatePicker,antd
} from 'antd';
import MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
import Cookies from "js-cookie";
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const Option = Select.Option;
const _mm = new MUtil();
const {TextArea} = Input;

class StockPrediction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: {
                spinning: false,
                size: 'large'
            },
            dataList: [],
            fileList: [],
            industrySelect: "",//产业选中数据
            gmName:"",
            industry:"",
            matName:"",
            currentUserId:Cookies.get('username'),
            industryList:[]
        };

    }

    //发送fetch请求
    fetch = () => {
        let url = `${Config.REPORT_URL_PREFIX}stockPrediction/findAll?gmName=${this.state.gmName}&matName=${this.state.matName}&industry=${this.state.industry}&currentUserId=${this.state.currentUserId}`;
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
                        dataList:data.dataList,
                        loading: {
                            spinning: false,
                            size: 'large'
                        },
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
        this.getIndustry()
        this.setState({
            industryList: JSON.parse(localStorage.a).industryList
        });
    }
    /*查询当前账号的产业信息*/
    getIndustry=()=>{

    let findAllindustry = `${Config.REPORT_URL_PREFIX}stockPrediction/getIndustry?currentUserId=${this.state.currentUserId}`;
    _mm.FetchUtil.init()
        .setUrl(findAllindustry)
        .setHeader({
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                   })
        .dofetch()
        .then((data) => {
            if (data.dataList.length == 0) {
            _mm.errorTips('没有数据');
        } else {
            this.setState({
                industryList: data.dataList,
            });
        }
        })
        .catch((error) => {
            _mm.errorTips(error);
        });
    };

    onExtractValue = (e) => {
        if (e.target.id === 'gmName') {
            this.setState({
                gmName: e.target.value
            })
        }else if (e.target.id === 'matName') {
            this.setState({
                matName: e.target.value
            })
        }
    };
    onExtractSelect = (e) => {
        this.setState({
            industry: e,
            industrySelect: [e]
        });
    };
    render() {
        const columns = [{
            title: '工贸',
            dataIndex: 'gmName',
            align: 'center',
            key: 'gmName',
            width: 200,
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }, {
            title: '产业',
            dataIndex: 'industry',
            align: 'center',
            key: 'industry',
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        },  {
            title: '物料',
            dataIndex: 'matCode',
            align: 'center',
            key: 'matCode',
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        },  {
            title: '物料名称',
            dataIndex: 'matName',
            align: 'center',
            key: 'matName',
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        },  {
            title: '30天销售量',
            dataIndex: 'saleNum',
            align: 'center',
            key: 'saleNum',
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        },  {
            title: '库存',
            dataIndex: 'kuNum',
            align: 'center',
            key: 'kuNum',
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        },  {
            title: '预购数量',
            dataIndex: 'pedicitonNum',
            align: 'center',
            key: 'pedicitonNum',
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }
        ];
        let salt = JSON.parse(localStorage.a).salt.toString();
        let uploadUrl =`${Config.REPORT_URL_PREFIX}stockPrediction/excelUp`;
        let templateDown =`${Config.REPORT_URL_PREFIX}stockPrediction/downTemplate`;
        let exportDownUrl =`${Config.REPORT_URL_PREFIX}stockPrediction/export?gmName=${this.state.gmName}&matName=${this.state.matName}&industry=${this.state.industry}&currentUserId=${this.state.currentUserId}`;
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
                            <span>所属工贸：</span><Input id={"gmName"} value={this.state.gmName}
                                                     onChange={this.onExtractValue}
                                                     style={{width: 100}}/>
                        </Col>
                        <Col xl={7} className='commonMarginTop'>
                            <span>物料名称：</span><Input id={"matName"} value={this.state.matName}
                                                     onChange={this.onExtractValue}
                                                     style={{width: 200}}/>
                        </Col>
                        <Col xl={5} className='commonMarginTop'>
                            <span>产业：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                     onChange={this.onExtractSelect}>
                                <Option value="">全部</Option>
                                {
                                    this.state.industryList.map(values =>
                                        <Option value={values}>{values}</Option>
                                    )
                                }
                            </Select>
                        </Col>
                        <Col xl={2} className='commonMarginTop'>
                            <Button type="primary" onClick={this.fetch}>查询</Button>
                        </Col>
                    </Row>
                </div>
                {
                    salt.indexOf('W')!==-1 || salt.indexOf('D')!==-1  ?  <Row className='rowStyle' type="flex" justify="start" style={{borderBottom: '3px solid #F0F2F5'}}>
                        {
                            salt.indexOf('D')!==-1  ?
                                <DownloadComponent downLoadUrl={exportDownUrl} buttonName={'导出'} spanSize={6}  downStyle={{marginLeft:-1.5,marginBottom:10,borderLeft:'3px solid #F0F2F5',paddingLeft:'10%'}} /> :''
                        }
                    </Row   >:''
                }
                <Table loading={this.state.loading} style={{marginTop: '20px'}}
                       dataSource={this.state.dataList} columns={columns} bordered scroll={{ x: 1200 }}/>
            </div>

        );
    }
}

StockPrediction.propTypes = {};
export default StockPrediction;
