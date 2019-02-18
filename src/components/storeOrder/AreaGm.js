import React, {Component} from 'react';
import {
    Button,
    Col,
    DatePicker,
    Row,
    Select,
    Upload,
    Icon,
    Table,
    Breadcrumb,
    List,
    Card,
    Input,
    Spin,
    Popconfirm, Modal, InputNumber, message
} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息

const _mm = new MUtil();

class AreaGm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            visible: false,
            orderGm: '',
            orderQy: '',
            orderXw: '',
            orderId: '',
            fileList: [],
            fetchGm: '',
            fetchQy: '',
            fetchXw: '',
            largeAreaList:[]
        };
        this.fileProps = {
            action: Config.REPORT_URL_PREFIX+'serviceAreaGm/excelUp',
            onChange: this.excelUp,
            multiple: true
        };
    }
    excelUp = (info) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
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
            this.fetch();
            return true;
        });
        this.setState({ fileList });
    };

    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.fetchArea();
        this.fetch();
    }

    /*区域下拉选查询*/
    fetchArea=()=>{
        let url=`${Config.REPORT_URL_PREFIX}orderAreaGm/findAllArea`;
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
                        size: 'large'
                    }
                });
                if (data.dataList.length == 0) {
                    _mm.errorTips('没有数据');
                    this.setState({
                        largeAreaList: data.dataList
                    })
                } else {
                    this.setState({
                        largeAreaList: data.dataList
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading: {
                        size: 'large'
                    }
                });
                _mm.errorTips(error);
            });
    };

    showEditModal = (record) => {
        this.setState({
            orderGm: record.orderGm,
            orderQy: record.orderQy,
            orderXw: record.orderXw,
            orderId: record.id,
            visible: true,
        });
    };

    //模板显示函数
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    //模板隐藏函数
    hideModal = () => {
        this.setState({
            visible: false,
            orderGm: '',
            orderQy: '',
            orderId: ''
        });
    };
    /*区域下拉框改变事件*/
    selectChange = (e) =>{
        this.setState({
            fetchQy: e
        });
    };

    handleOk = (e) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        let flag = true;
        let messages = "";
        if (this.state.orderGm.trim() === '') {
            messages += '请填写工贸名称  ';
            flag = false;
        }
        if (this.state.orderQy.trim() === '') {
            messages += '请填写区域名称';
            flag = false;
        }
        if (flag) {
            let url = `${Config.REPORT_URL_PREFIX}orderAreaGm/saveOrUpdate?orderGm=${this.state.orderGm}&orderQy=${this.state.orderQy}&orderId=${this.state.orderId}&orderXw=${this.state.orderXw}`;
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
                        orderGm: '',
                        orderQy: '',
                        orderId: ''
                    });
                    if (data.flag) {
                        message.success(data.message);
                        this.fetchArea();
                        this.fetch();
                    } else {
                        _mm.errorTips(data.message);
                    }
                })
        } else {
            _mm.errorTips(messages);
        }
    };


    //获取查询条件数据
    receiveData = (data) => {
        this.setState(data)
    };
    //发送fetch请求
    fetch = () => {
        let url = `${Config.REPORT_URL_PREFIX}orderAreaGm/findByAreaOrGm?orderGm=${this.state.fetchGm}&orderQy=${this.state.fetchQy}&orderXw=${this.state.fetchXw}`;
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
    onDelete = (key) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        let url = `${Config.REPORT_URL_PREFIX}orderAreaGm/delById?orderId=${key}`;
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }).dofetch()
            .then((data) => {
                this.setState({
                    visible: false,
                    fetchGm: '',
                    fetchQy: '',
                });
                if (data.flag) {
                    message.success(data.message);
                    this.fetchArea();
                    this.fetch();
                } else {
                    message.error(data.message);
                }
            })

    };
    onExtractValue = (e) => {
        if (e.target.id === 'fetchGm') {
            this.setState({
                fetchGm: e.target.value
            });
        }else if(e.target.id === 'orderGm'){
            this.setState({
                orderGm: e.target.value
            });
        }else if(e.target.id === 'orderQy'){
            this.setState({
                orderQy: e.target.value
            });
        }else if(e.target.id === 'orderXw'){
            this.setState({
                orderXw: e.target.value
            });
        }else if(e.target.id === 'fetchXw'){
            this.setState({
                fetchXw: e.target.value
            });
        }
    };

    downLoad = () => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        window.location.href = `${Config.REPORT_URL_PREFIX}orderAreaGm/downTemplate`
    };

    render() {
        const columns = [{
            title: '工贸名称',
            dataIndex: 'orderGm',
            align: 'center',
            key: 'orderGm',
            width: 300
        }, {
            title: '所属区域',
            dataIndex: 'orderQy',
            align: 'center',
            key: 'orderQy',
            width: 300
        },{
            title: '所属小微',
            dataIndex: 'orderXw',
            align: 'center',
            key: 'orderXw',
            width: 300
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 300,
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
            <div>
                <Row type="flex" >
                    <Col span={4} className='commonMarginTop'>
                        <Button type="primary" onClick={this.showModal}>新增区域工贸</Button>
                    </Col>

                    <Col span={4} className='commonMarginTop'>
                        <Button type="primary" icon="download"
                                onClick={this.downLoad}>模版下载</Button>
                    </Col>
                    <Col span={4} className='commonMarginTop'>
                        <Upload {...this.fileProps} fileList={this.state.fileList}>
                            <Button type="primary">
                                <Icon type="upload"/> 上传更新
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <Row type="flex" style={{marginTop:'20px',
                    borderTop:'3px solid #F0F2F5',paddingTop:'10px',paddingBottom:'20px',
                    borderBottom:'3px solid #F0F2F5'}}>
                    <Col span={6} className='commonMarginTop'>
                        <span className='tagRight'>工贸名称：</span>
                        <Input placeholder="请输入" className='commonWidth' id="fetchGm" name="fetchGm" type="text"
                               onChange={this.onExtractValue}/>
                    </Col>
                    <Col span={6} className='commonMarginTop'>
                        <span className='tagRight'>所属区域：</span>
                        <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                 onChange={this.selectChange}>
                            <Option value="">全部</Option>
                            {
                                this.state.largeAreaList.map((data,index) =>
                                    <Option key={index} value={data}>{data}</Option>
                                )
                            }
                        </Select>
                    </Col>
                    <Col span={6} className='commonMarginTop'>
                        <span className='tagRight'>所属小微：</span>
                        <Input placeholder="请输入" className='commonWidth' id="fetchXw" name="fetchXw" type="text"
                               onChange={this.onExtractValue}/>
                    </Col>
                    <Col span={4} className='commonMarginTop'>
                        <Button type="primary" onClick={this.fetch}>查询</Button>
                    </Col>
                </Row>
                <Modal
                    title="区域工贸"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.hideModal}
                >
                    工贸名称：<span style={{color: 'red'}}>✳</span><Input id={"orderGm"} value={this.state.orderGm}
                                                                     onChange={this.onExtractValue}
                                                                     style={{width: 200}}/>
                    <br/><br/>
                    所属区域：
                    <span style={{color: 'red'}}>✳</span><Input id={"orderQy"} value={this.state.orderQy}
                                                                onChange={this.onExtractValue}
                                                                style={{width: 200}}/>
                    <br/><br/>
                    所属小微：
                    <span style={{color: 'red'}}>✳</span><Input id={"orderXw"} value={this.state.orderXw}
                                                                onChange={this.onExtractValue}
                                                                style={{width: 200}}/>
                    <br/><br/>
                </Modal>


                <Table loading={this.state.loading} style={{marginTop: '20px'}}
                       dataSource={this.state.dataList} columns={columns} bordered/>
            </div>
        )
    }
}

export default AreaGm;
