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

class KwMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            visible: false,
            fetchRegionName:'',
            fetchWhCode:'',
            brandName:'统帅',//只维护统帅
            whCode:'',
            regionName: '',
            kwId:'',
        };
    }

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
        this.setState({
            whCode:record.whCode,
            regionName: record.regionName,
            kwId:record.id,
            visible: true,
        })
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
            whCode:'',
            regionName: '',
            kwId:'',
        });
    };

    handleOk = (e) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        let flag = true;
        let messages = "";
        if (this.state.regionName.trim() === '') {
            messages += '请填写库位名称  ';
            flag = false;
        }
        if (this.state.whCode.trim() === '') {
            messages += '请填写库位编码';
            flag = false;
        }
        if (flag) {
            let url = `${Config.REPORT_URL_PREFIX}kwMaintain/saveOrUpdate?regionName=${this.state.regionName}&whCode=${this.state.whCode}&brandName=${this.state.brandName}&kwId=${this.state.kwId}`;
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
                        whCode:'',
                        regionName: '',
                        kwId:'',
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
        let url = `${Config.REPORT_URL_PREFIX}kwMaintain/findList?regionName=${this.state.fetchRegionName}&whCode=${this.state.fetchWhCode}&brandName=${this.state.brandName}`;
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
        let url = `${Config.REPORT_URL_PREFIX}kwMaintain/delById?kwId=${key}`;
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }).dofetch()
            .then((data) => {
                this.setState({
                    visible: false,
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
        if (e.target.id === 'fetchRegionName') {
            this.setState({
                fetchRegionName: e.target.value
            });
        }else if(e.target.id === 'fetchWhCode'){
            this.setState({
                fetchWhCode: e.target.value
            });
        }else if(e.target.id === 'regionName'){
            this.setState({
                regionName: e.target.value
            });
        }else if(e.target.id === 'whCode') {
            this.setState({
                whCode: e.target.value
            });
        }
    };


    render() {
        const columns = [{
            title: '库位名称',
            dataIndex: 'regionName',
            align: 'center',
            key: 'regionName',
            width: 200
        }, {
            title: '库位编码',
            dataIndex: 'whCode',
            align: 'center',
            key: 'whCode',
            width: 200
        }, {
            title: '操作日期',
            dataIndex: 'submitDate',
            align: 'center',
            key: 'submitDate',
            width: 200
        },{
            title: '操作',
            dataIndex: 'operation',
            width: 200,
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
                        <Button type="primary" onClick={this.showModal}>新增统帅库位</Button>
                    </Col>
                </Row>
                <Row type="flex" style={{marginTop:'20px',
                    borderTop:'3px solid #F0F2F5',paddingTop:'10px',paddingBottom:'20px',
                    borderBottom:'3px solid #F0F2F5'}}>
                    <Col span={6} className='commonMarginTop'>
                        <span className='tagRight'>库位名称：</span>
                        <Input placeholder="请输入" className='commonWidth' id="fetchRegionName" name="fetchRegionName" type="text"
                               onChange={this.onExtractValue}/>
                    </Col>
                    <Col span={6} className='commonMarginTop'>
                        <span className='tagRight'>库位编码：</span>
                        <Input placeholder="请输入" className='commonWidth' id="fetchWhCode" name="fetchWhCode" type="text"
                               onChange={this.onExtractValue}/>
                    </Col>
                    <Col span={4} className='commonMarginTop'>
                        <Button type="primary" onClick={this.fetch}>查询</Button>
                    </Col>
                </Row>
                <Modal
                    title="库位维护"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.hideModal}
                >
                    库位名称：<span style={{color: 'red'}}>✳</span><Input id={"regionName"} value={this.state.regionName}
                                                                     onChange={this.onExtractValue}
                                                                     style={{width: 200}}/>
                    <br/><br/>
                    库位编码：
                    <span style={{color: 'red'}}>✳</span><Input id={"whCode"} value={this.state.whCode}
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

export default KwMaintain;
