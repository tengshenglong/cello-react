import React, {Component} from 'react';
import {
    Button,
    message,
    Input,
    Row,
    Select,
    Table,
    Modal,
    Popconfirm,
    Col, Upload, Icon, Alert,
} from 'antd';
import MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
import KwMaintain from "../inSale/KwMaintain";
import ModalComponent from "../../common/commonComponents/ModalComponent";
const Option = Select.Option;
const _mm = new MUtil();
const {TextArea} = Input;

class SpotrateMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: {
                spinning: true,
                size: 'large'
            },
            visible: false,
            dataList: [],
            fileList: [],
            industry: '',
            setchIndustry: '全部',
            industrySelect: [],//产业选中数据
            industryList: [],
            id: '',
            fetchMatnr: '',
            fetchModel: '',
            fetchBrand: '',
            matnrId: '',
            modelId: '',
            brandId: '',
            visible1:false
        };
        this.fileProps = {
            action: Config.REPORT_URL_PREFIX + 'serviceSpotrate/excelUp',
            onChange: this.excelUp,
            multiple: true
        };

    }

    excelUp = (info) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        let fileList = info.fileList;
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (info.file.status === 'error') {
                _mm.errorTips("数据异常，请联系管理员！");
                return
            }
            if (file.response) {
                _mm.errorTips(`${info.file.name} ${file.response.message}`);
                return file.response.status === 'success';
            }
            return true;
        });
        this.setState({
            fileList,
            dataList: []
        });
    };

    //发送fetch请求
    fetch = () => {
        let url = `${Config.REPORT_URL_PREFIX}spotrate/findAll?matnr=${this.state.fetchMatnr}&model=${this.state.fetchModel}&brand=${this.state.fetchBrand}&industry=${this.state.setchIndustry}`;
        this.fetchData(url);
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
                this.setState({
                    loading: {
                        spinning: false,
                        size: 'large'
                    }
                });
                if (data.dataList.length == 0) {
                    _mm.errorTips('没有数据');
                    this.setState({
                        dataList: data.dataList
                    })
                } else {
                    this.setState({
                        dataList: data.dataList
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading: {
                        spinning: false,
                        size: 'large'
                    }
                });
                _mm.errorTips(error);
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

    downLoad = () => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        window.location.href = `${Config.REPORT_URL_PREFIX}spotrate/downTemplate`
    };

    onExtractSelect = (id, value) => {
        if (id === 'setchIndustryId') {
            this.setState({
                setchIndustry: value
            });
        } else if (id === 'industryId') {
            this.setState({
                industry: value
            })
        }

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


    showModal = () => {
        this.setState({
            visible: true
        });
    };

    //模板显示函数
    showModal1 = () => {
        this.setState({
            visible1: true
        });
    };

    handleOk = () => {
        let matnrId = this.state.matnrId;
        let modelId = this.state.modelId;
        let industry = this.state.industry;
        let brandId = this.state.brandId;
        if (matnrId === '' || modelId === '' || industry === '' || brandId === '') {
            _mm.errorTips(' ✳ 为必填或必选项 ');
            return
        }
        let url = `${Config.REPORT_URL_PREFIX}spotrate/saveOrUpdate?`;
        url += `matnr=${matnrId}&model=${modelId}&industry=${industry}&brand=${brandId}&id=${this.state.id}`;
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    visible: false,
                    industry: '',
                    setchIndustry: '全部',
                    id: '',
                    matnrId: '',
                    modelId: '',
                    brandId: '',
                });
                if (data.flag) {
                    message.success(data.message);
                    this.fetch();
                } else {
                    _mm.errorTips(data.message);
                }
            })


    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
            industry: '',
            setchIndustry: '全部',
            id: '',
            matnrId: '',
            modelId: '',
            brandId: '',
        });
    };
    //模板隐藏函数
    hideModal1= ()=> {
        this.setState({
            visible1: false
        });
    };

    onDelete = (key) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        let url = `${Config.REPORT_URL_PREFIX}spotrate/delById?id=${key}`;
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }).dofetch()
            .then((data) => {
                this.setState({
                    visible: false
                });
                if (data.flag) {
                    message.success(data.message);
                    const dataSource = [...this.state.dataList];
                    this.setState({dataList: dataSource.filter(item => item.id !== key)});
                } else {
                    message.error(data.message);
                }
            })
    };

    onExtractValue = (e) => {
        if (e.target.id === 'fetchMatnr') {
            this.setState({
                fetchMatnr: e.target.value
            })
        } else if (e.target.id === 'fetchModel') {
            this.setState({
                fetchModel: e.target.value
            })
        } else if (e.target.id === 'fetchBrand') {
            this.setState({
                fetchBrand: e.target.value
            })
        } else if (e.target.id === 'matnrId') {
            this.setState({
                matnrId: e.target.value
            })
        } else if (e.target.id === 'brandId') {
            this.setState({
                brandId: e.target.value
            })
        } else if (e.target.id === 'modelId') {
            if (e.target.value.length < 101) {
                this.setState({
                    modelId: e.target.value
                })
            }
        }
    };


    render() {
        const columns = [{
            title: '物料名称',
            dataIndex: 'matnr',
            align: 'center',
            key: 'matnr',
            width: 200,
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }, {
            title: '物料描述',
            dataIndex: 'model',
            align: 'center',
            key: 'model',
            width: 400,
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }, {
            title: '产业',
            align: 'center',
            dataIndex: 'industry',
            key: 'industry',
            width: 200,
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }, {
            title: '品牌',
            dataIndex: 'brandName',
            align: 'center',
            key: 'brandName',
            width: 200,
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }, {
            title: '操作日期',
            dataIndex: 'submitDate',
            align: 'center',
            key: 'submitDate',
            width: 200,
            render: function (data) {
                return <span title={data}>{data}</span>;
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div>
                        {
                            (
                                <Popconfirm title="是否删除?" onConfirm={() => this.onDelete(record.id)}>
                                    <a href="javascript:;">删除</a>
                                </Popconfirm>
                            )
                        }
                        {
                            <a href="javascript:void(0)" onClick={() => this.showEditModal(record)}
                               style={{marginLeft: 20}}>修改</a>
                        }
                    </div>
                );
            }
        }];

        return (

            <div className='allBorder'>
                <Bread></Bread>
                <Modal
                    title="物料维护操作"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    物料编码：<span style={{color: 'red'}}>✳</span><Input id={"matnrId"} value={this.state.matnrId}
                                                                     onChange={this.onExtractValue}
                                                                     style={{width: 160}}/>
                    <br/><br/>
                    品牌名称：<span style={{color: 'red'}}>✳</span><Input id={"brandId"} value={this.state.brandId}
                                                                     onChange={this.onExtractValue}
                                                                     style={{width: 160}}/>
                    <br/><br/>
                    产业选择：<span style={{color: 'red'}}>✳</span>
                    <Select placeholder="选择产业" value={this.state.industry} style={{width: 120}}
                            onChange={this.onExtractSelect.bind(this, 'industryId')}>
                        {
                            this.state.industryList.map(values =>
                                values.industryName !== '其他' ?
                                    <Option value={values.industryName}>{values.industryName}</Option> : ''
                            )
                        }
                    </Select>
                    <br/><br/>
                    物料描述：<span style={{color: 'red'}}>✳</span><TextArea id={"modelId"} value={this.state.modelId}
                                                                        autosize={{minRows: 3, maxRows: 3}}
                                                                        onChange={this.onExtractValue}
                                                                        style={{width: 160}}/>

                </Modal>
                <div style={{
                    marginTop: '20px',
                    borderTop: '3px solid #F0F2F5', paddingTop: '10px', paddingBottom: '20px',
                    borderBottom: '3px solid #F0F2F5'
                }}>
                    <Row type="flex">
                        <Col xl={3} className='commonMarginTop'>
                            <Button type="primary" onClick={this.showModal}> 物料维护操作 </Button>
                        </Col>
                        <Col xl={4} className='commonMarginTop'>
                            <span>物料编码：</span><Input id={"fetchMatnr"} value={this.state.fetchMatnr}
                                                     onChange={this.onExtractValue}
                                                     style={{width: 160}}/>
                        </Col>
                        <Col xl={4} className='commonMarginTop'>
                            <span>物料描述：</span><Input id={"fetchModel"} value={this.state.fetchModel}
                                                     onChange={this.onExtractValue}
                                                     style={{width: 160}}/>
                        </Col>
                        <Col xl={4} className='commonMarginTop'>
                            <span> 产业选择：</span>
                            <Select placeholder="选择产业" value={this.state.setchIndustry} style={{width: 120}}
                                    onChange={this.onExtractSelect.bind(this, 'setchIndustryId')}>
                                <Option value={"全部"}>全部</Option>
                                {
                                    this.state.industryList.map(values =>
                                        values.industryName !== '其他' ?
                                            <Option value={values.industryName}>{values.industryName}</Option> : ''
                                    )
                                }
                            </Select>
                        </Col>
                        <Col xl={4} className='commonMarginTop'>
                            <span>品牌：</span><Input id={"fetchBrand"} value={this.state.fetchBrand}
                                                   onChange={this.onExtractValue}
                                                   style={{width: 160}}/>
                        </Col>
                        <Col xl={4} className='commonMarginTop'>
                            <Button type="primary" onClick={this.fetch}>查询</Button>
                        </Col>
                    </Row>
                </div>
                <Row type="flex">
                    <Col xl={4} className='commonMarginTop'>
                        <Button type="primary" icon="download"
                                onClick={this.downLoad}>模版下载</Button>
                    </Col>

                    <Col xl={4} className='commonMarginTop'>
                        <Upload {...this.fileProps} fileList={this.state.fileList}>
                            <Button type="primary">
                                <Icon type="upload"/> 上传更新
                            </Button>
                        </Upload>
                    </Col>
                    <Col xl={10} className='commonMarginTop' style={{marginLeft: 10}}>
                        <Alert message="警告：上传更新会把原有数据清空,以EXECL数据为准！" type="warning" showIcon style={{width:400}}/>
                    </Col>
                    <Col xl={4} className='commonMarginTop'>
                         <Button style={{fontColor:'#fffc73'}} onClick={this.showModal1}>统帅仓位维护</Button>
                    </Col>
                </Row>
                <ModalComponent visible={this.state.visible1}
                                modalTitle='统帅仓位维护'
                                hide={this.hideModal1}>
                    <KwMaintain></KwMaintain>
                </ModalComponent>
                <Table loading={this.state.loading} style={{marginTop: '20px'}}
                       dataSource={this.state.dataList} columns={columns} bordered scroll={{ x: 1200 }}/>
            </div>

        );
    }
}

SpotrateMaintain.propTypes = {};
export default SpotrateMaintain;
