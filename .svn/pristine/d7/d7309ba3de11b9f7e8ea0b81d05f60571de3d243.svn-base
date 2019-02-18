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

class CityLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            visible: false,
            cityName: '',
            cityLevel: '1',
            cityId: '',
            fileList: [],
            fetchCity: ''
        };
        this.fileProps = {
            action: Config.REPORT_URL_PREFIX+'serviceCityLevel/excelUp',
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
            return true;
        });
        this.fetch();
        this.setState({ fileList });
    };

    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.fetch();
    }

    showEditModal = (record) => {
        console.info(record.cityLevel.charAt(0));
        this.setState({
            cityName: record.cityName,
            cityLevel: record.cityLevel.charAt(0),
            cityId: record.id,
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
            cityName: '',
            cityLevel: '1',
            cityId: ''
        });
    };
    handleOk = (e) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        let flag = true;
        let messages = "";
        if (this.state.cityName.trim() === '') {
            messages += '请填写城市名称';
            flag = false;
        }
        if (flag) {
            let url = `${Config.REPORT_URL_PREFIX}cityLevel/saveOrUpdate?cityName=${this.state.cityName}&cityLevel=${this.state.cityLevel}&cityId=${this.state.cityId}`;
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
                        cityName: '',
                        cityLevel: '1',
                        cityId: ''
                    });
                    if (data.flag) {
                        message.success(data.message);
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
        let url = `${Config.REPORT_URL_PREFIX}cityLevel/findAll?cityName=${this.state.fetchCity}`;
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
        let url = `${Config.REPORT_URL_PREFIX}cityLevel/delById?cityId=${key}`;
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
                    this.fetch();
                } else {
                    message.error(data.message);
                }
            })

    };
    onExtractValue = (e) => {
        if (e.target.id === 'cityName') {
            this.setState({
                cityName: e.target.value
            });
        } else if (e.target.id === 'fetchCity') {
            this.setState({
                fetchCity: e.target.value
            });
        }
    };
    onChangeNum = (name, value) => {
       if (isNaN(value) === true && value) {
            if (name === 'cityLevel') {
                _mm.errorTips('城市等级必须为数字');
                this.setState({
                    cityLevel: '1'
                });
            }
        } else {
            if (name === 'cityLevel') {
                this.setState({
                    cityLevel: value
                });
            }
        }
    };
    //input框失去焦点
    blur = (e) => {
        if (this.state.cityLevel == undefined) {
            if (e.target.name == 'cityLevel') {
                this.setState({
                    cityLevel: '1'
                });
            }
        }
    };
    downLoad = () => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        window.location.href = `${Config.REPORT_URL_PREFIX}cityLevel/downTemplate`
    };

    render() {
        const columns = [{
            title: '城市名称',
            dataIndex: 'cityName',
            align: 'center',
            key: 'cityName',
            width: 300
        }, {
            title: '线级',
            dataIndex: 'cityLevel',
            align: 'center',
            key: 'cityLevel',
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
                <Row type="flex">
                    <Col span={4} className='commonMarginTop'>
                        <Button type="primary" onClick={this.showModal}>新增线级城市</Button>
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
                    <Col span={6} className='commonMarginTop'>
                        <span className='tagRight'>城市名称：</span>
                        <Input placeholder="请输入" className='commonWidth' id="fetchCity" name="fetchCity" type="text"
                               onChange={this.onExtractValue}/>
                    </Col>
                    <Col span={4} className='commonMarginTop'>
                        <Button type="primary" onClick={this.fetch}>查询</Button>
                    </Col>
                </Row>
                <Modal
                    title="线级城市"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.hideModal}
                >
                    城市名称：<span style={{color: 'red'}}>✳</span><Input id={"cityName"} value={this.state.cityName}
                                                                     onChange={this.onExtractValue}
                                                                     style={{width: 200}}/>
                    <br/><br/>
                    城市等级：
                    <span className='starColor'>✳</span>
                    <InputNumber value={this.state.cityLevel} className='commonWidth'
                                 min={1} max={10} name='cityLevel' onBlur={this.blur}
                                 onChange={this.onChangeNum.bind(this, 'cityLevel')} style={{width: 50}}/>
                </Modal>

                <Table loading={this.state.loading} style={{marginTop: '20px'}}
                       dataSource={this.state.dataList} columns={columns} bordered/>
            </div>
        )
    }
}

export default CityLevel;
