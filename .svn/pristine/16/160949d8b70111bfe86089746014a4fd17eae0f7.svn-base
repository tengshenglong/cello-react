import React, {Component} from 'react';
import {Button, message,Breadcrumb, Input, Select, Table, Modal, Checkbox, Popconfirm} from 'antd';
import MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
import Cookies from "js-cookie";
import styles from '../../common/css/test.css';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const _mm = new MUtil();

class IndustrySetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: {
                spinning: true,
                size: 'large'
            },
            visible: false,
            sonDate: [],
            industryName: '',
            industryId: ''
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
                        industryList: data.dataList,
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
        /*查询所有的产业*/
        this.loadingIndustry();
    }
    showModal = () => {
        /*查询有没有ID*/
        this.setState({
            visible: true
        });
    };

    showEditModal = (record) => {
        this.setState({
            visible: true,
            industryName: record.industryName,
            industryId: record.id
        });
    };

    handleOk = (e) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let flag = true;
        let messages = "";
        if (this.state.industryName.length == 0) {
            flag = false;
            messages += "产业名称必须填写";
        }
        if (flag) {
            let addUser = `${Config.REPORT_URL_PREFIX}industry/addOrUpdateIndustry?industryName=${this.state.industryName}&industryId=${this.state.industryId}`;
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
                        industryName: '',
                        industryId: ''
                    });
                    if (data.flag) {
                        message.success(data.message);
                    } else {
                        _mm.errorTips(data.message);
                    }

                    this.loadingIndustry()
                })
        } else {
            _mm.errorTips(messages);
        }


    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
            industryName: '',
            industryId: ''
        });
    };


    onExtractValue = (e) => {
        if (e.target.id == 'industryName') {
            this.setState({
                industryName: e.target.value
            });
        }
    };


    onDelete = (key) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let findAlUser = `${Config.REPORT_URL_PREFIX}industry/delIndustryById?id=${key}`;
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
                    const dataSource = [...this.state.industryList];
                    this.setState({industryList: dataSource.filter(item => item.id !== key)});
                } else {
                    message.error(data.message);
                }
            })

    };
    onCancelInvsorts = (record) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        if(record.invsortsName==null){
            record.invsortsName=''
        }
        let addUser = `${Config.REPORT_URL_PREFIX}invsorts/addOrUpdateInvsorts?invsortsName=${record.invsortsName}&invsortsCode=${record.invsortsCode}&invsortsId=${record.id}&industryId=`;
        _mm.FetchUtil.init()
            .setUrl(addUser)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.flag) {
                    message.success(data.message);
                    this.loadingIndustry();
                } else {
                    _mm.errorTips(data.message);
                }
            })
    };
    expandedRowRender = (expanded, record) => {
        const columns = [
            {title: '产品组CODE', dataIndex: 'invsortsCode',align:'center'},
            {title: '产品组名称', dataIndex: 'invsortsName',align:'center'},
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <div>
                            <Popconfirm title="是否取消关联该产品组？" onConfirm={() => this.onCancelInvsorts(record)}>
                                <a href='javascript:;'>取消关联</a>
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];
        return (
            <Table
                columns={columns}
                dataSource={expanded.invsortsList}
                pagination={false}
                showHeader={true}
            />
        );
    };

    render() {

        const columns = [{
            title: '产业名称',
            dataIndex: 'industryName',
            align: 'center',
            key: 'industryName'
        }, {
            title: '创建日期',
            dataIndex: 'createDate',
            align: 'center',
            key: 'createDate'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div>
                        {this.state.industryList.length > 1 ?
                            (
                                <Popconfirm title="删除产业将会删除所属产品组！是否继续？" onConfirm={() => this.onDelete(record.id)}>
                                    <a href="javascript:;">删除</a>
                                </Popconfirm>
                            ) : null}

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
                <Button style={{marginTop:'20px'}} type="primary" onClick={this.showModal}>添加产业</Button>

                <Modal
                    title="产业信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    产业名称：<span style={{color: 'red'}}>✳</span><Input id={"industryName"} value={this.state.industryName}
                                                                     onChange={this.onExtractValue}/>
                    <br/><br/>

                </Modal>

                <Table style={{marginTop:'20px'}}
                    loading={this.state.loading}
                    className="components-table-demo-nested"
                    columns={columns}
                    dataSource={this.state.industryList}
                    expandedRowRender={this.expandedRowRender}
                />
            </div>
        );
    }
}
IndustrySetting.propTypes = {};
export default IndustrySetting;
