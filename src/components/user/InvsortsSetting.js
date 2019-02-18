import React, {Component} from 'react';
import {Button, message, Input, Row, Select, Breadcrumb,Table, Modal, Radio, Checkbox, Popconfirm, Alert} from 'antd';
import MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
import Cookies from "js-cookie";

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const _mm = new MUtil();

class InvsortsSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: {
                spinning: true,
                size: 'large'
            },
            checkAll: false,
            visible: false,
            industryList: [],//产业数据
            invsortsList: [],//产品组数据

            /*产品组添加信息*/
            invsortsId: "",
            invsortsName: '',
            invsortsCode: '',
            industryId: '',

            industryName: []
        }

    }

    loadingIndustry = () => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        /*查询所有的产业信息*/
        let findAllindustry = `${Config.REPORT_URL_PREFIX}industry/findAllIndustry`;
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
                        industryList: data.dataList
                    });
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };

    loadingInvsorts = () => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        /*查询所有的产品组信息*/
        let findAllindustry = `${Config.REPORT_URL_PREFIX}invsorts/findAllInvsorts`;
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
                        invsortsList: data.dataList,
                        loading: {
                            spinning: false,
                            size: 'large'
                        }
                    });
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };

    componentWillMount() {
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        /*查询所有的产品组*/
        this.loadingInvsorts();
        /*查询所有的产业信息*/
        this.loadingIndustry();
    }


    showEditModal = (record) => {

        console.log(record);
        if (record.invsortsName == null) {
            this.setState({
                invsortsName: ''
            })
        }else{
            this.setState({
                invsortsName: record.invsortsName
            })
        }
       if (record.industry == null) {
            this.setState({
                industryName:[],
                industryId:''
            })
        }else{
           this.setState({
               industryName:[record.industry.industryName],
               industryId:record.industry.id
           })
       }

        this.setState({
            visible: true,
            invsortsId: record.id,
            invsortsCode: record.invsortsCode
        });
    };

    showModal = () => {
        /*查询有没有ID*/
        this.setState({
            visible: true
        });
    };

    handleOk = (e) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let flag = true;
        let messages = "";
        if (this.state.invsortsCode.length == 0) {
            messages += "产品组CODE必须填写！";
            flag = false;
        }
        if (flag) {
            let addUser = `${Config.REPORT_URL_PREFIX}invsorts/addOrUpdateInvsorts?invsortsName=${this.state.invsortsName}&invsortsCode=${this.state.invsortsCode}&industryId=${this.state.industryId}&invsortsId=${this.state.invsortsId}`;
            _mm.FetchUtil.init()
                .setUrl(addUser)
                .setHeader({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                .dofetch()
                .then((data) => {
                    this.setState({
                        visible: false,
                        defaultValue: [],
                        invsortsName: '',
                        invsortsCode: '',
                        industryId: '',
                        industryName: [],
                        invsortsId: ""
                    });
                    if (data.flag) {
                        message.success(data.message);
                        this.loadingInvsorts();
                    } else {
                        _mm.errorTips(data.message);
                    }
                })
        } else {
            _mm.errorTips(messages);
        }
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
            checkAll: false,
            checkedList: [],
            invsortsName: '',
            invsortsCode: '',
            industryId: '',
            industryName: [],
            invsortsId: ""
        });
    };


    onExtractValue = (e) => {
        if (e.target.id == 'invsortsName') {
            this.setState({
                invsortsName: e.target.value
            });
        }
        if (e.target.id == 'invsortsCode') {
            this.setState({
                invsortsCode: e.target.value
            });
        }
    };

    onExtractSelect = (e) => {
        this.setState({
            industryId: e,
            industryName: e
        });
    };


    onDelete = (key) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let findAlUser = `${Config.REPORT_URL_PREFIX}invsorts/delInvsortsById?id=${key}`;
        _mm.FetchUtil.init()
            .setUrl(findAlUser)
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
                    const dataSource = [...this.state.invsortsList];
                    this.setState({invsortsList: dataSource.filter(item => item.id !== key)});
                } else {
                    message.error(data.message);
                }
            })
    };


    // noinspection JSAnnotator
    render() {

        const columns = [{
            title: '产品组CODE',
            dataIndex: 'invsortsCode',
            align: 'center',
            key: 'invsortsCode'
        }, {
            title: '产品组名称',
            dataIndex: 'invsortsName',
            align: 'center',
            key: 'industryName'
        }, {
            title: '所属产业',
            dataIndex: 'industry.industryName',
            align: 'center',
            key: 'industryindustryName'
        }, {
            title: '日期',
            dataIndex: 'createDate',
            align: 'center',
            key: 'createDate'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div>
                        {
                            this.state.invsortsList.length > 1 ?
                                (
                                    <Popconfirm title="是否删除?" onConfirm={() => this.onDelete(record.id)}>
                                        <a href="javascript:;">删除</a>
                                    </Popconfirm>
                                ) : null
                        }
                        {
                                <a href="javascript:void(0)" onClick={() => this.showEditModal(record)} style={{marginLeft: 20}}>修改</a>
                        }
                    </div>
                );
            }
        }];


        return (
            <div className='allBorder'>
                <Bread></Bread>
                <Button style={{marginTop:'20px'}} type="primary" onClick={this.showModal}>添加产品组</Button>

                {/*添加用户的界面*/}
                <Modal
                    title="产业信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    产品组CODE：<span style={{color: 'red'}}>✳</span><Input id="invsortsCode"
                                                                        value={this.state.invsortsCode}
                                                                        onChange={this.onExtractValue}/>
                    <br/><br/>
                    产品组姓名：<Input id="invsortsName" value={this.state.invsortsName} onChange={this.onExtractValue}/>
                    <br/><br/>

                    <div>
                        产业选择：
                        <Select value={this.state.industryName} placeholder="选择产业" style={{width: 120}}
                                onChange={this.onExtractSelect}>
                            {
                                this.state.industryList.map(value =>
                                    <Option value={value.id}>{value.industryName}</Option>
                                )
                            }
                        </Select>
                    </div>
                </Modal>

                <Table style={{marginTop:'20px'}} loading={this.state.loading} dataSource={this.state.invsortsList} columns={columns} bordered/>
            </div>
        );
    }
}

InvsortsSetting.propTypes = {};
export default InvsortsSetting;
