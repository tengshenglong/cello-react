import React, {Component} from 'react';
import {
    Button,
    message,
    Input,
    Select,
    Table,
    Modal,
    Popconfirm,
    Tree,
    TreeSelect,
    Checkbox, Col, Row
} from 'antd';
import MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const _mm = new MUtil();
class UserSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userList: [],
            industryList: [],//产业数据
            roleList: [],//角色数据
            industrySelect: [],//产业选中数据
            searchIndustrySelect: ['全部'],//查询产业选中数据
            roleSelect: [],//角色选中数据
            searchRoleSelect: ['全部'],//角色选中数据
            /*user的属性*/
            loginName: '',
            name: '',
            industry: '',
            roleId: '',
            registerDate: '',
            userId: '',
            condition:'',//条件搜索
            jurisdiction:'',//权限条件搜索
            jurisdictionValue:['S'],//权限条件搜索
            seachSelect: [],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            searchIndustry:'全部',
            searchRole:'0',
            sudrSettings:[
                { label: '维护权限（维护按钮，上传，模版下载，删除）', value: 'W' },
                { label: '数据下载权限', value: 'D' },
            ],
            userSaltSettings:['S'],
        }

    }

    loadingUser = () => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.setState({
            loading: {
                spinning: true,
                size: 'large'
            }
        });
        let findAlUser = `${Config.REPORT_URL_PREFIX}user/findAllUser?condition=${this.state.condition}&jurisdiction=${this.state.jurisdiction}`
        +`&industry=${this.state.searchIndustry}&roleId=${this.state.searchRole}`;
        _mm.FetchUtil.init()
            .setUrl(findAlUser)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.dataList.length == 0) {
                    _mm.errorTips('没有数据');
                    this.setState({
                        userList: [],
                        loading: {
                            spinning: false,
                            size: 'large'
                        }
                    });
                } else {
                    /*产业回显信息格式化*/
                    let industoryList = this.state.industryList;
                    for (let i = 0; i < data.dataList.length; i++) {
                        for (let j = 0; j < industoryList.length; j++) {
                            if (data.dataList[i].industry == industoryList[j].id) {
                                data.dataList[i].industry = industoryList[j].industryName;
                            }
                            if (data.dataList[i].industry == "all") {
                                data.dataList[i].industry = "全部"
                            }
                        }
                    }
                    this.setState({
                        userList: data.dataList,
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
        if(_mm.loginStatus()===false){
            return;
        }
        /*查询所有的产业信息*/
        let findAllindustry = `${Config.REPORT_URL_PREFIX}industry/getIndustrySelectList`;
        _mm.FetchUtil.init()
            .setUrl(findAllindustry)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {

                if (data.dataList.Length == 0) {
                    _mm.errorTips('没有数据');
                } else {
                    this.setState({
                        industryList: data.dataList
                    });
                }
                /*查询所有的User信息*/
                this.loadingUser();
            })
            .catch((error) => {
                _mm.errorTips(error);
            });

        /*查询所有角色*/
        let findAllRole = `${Config.REPORT_URL_PREFIX}role/findAllRole`;
        //let findAllRole = `http://192.168.1.112:8080/report/role/findAllRole`;
        _mm.FetchUtil.init()
            .setUrl(findAllRole)
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
                        roleList: data.dataList
                    });
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });

    }

    showEditModal = (record) => {
        let salt= record.salt.toString().split(",");
        //由于页面当初显示产业时做了数据格式化，所以回填产业时并没有回填产业ID
        let industoryList = this.state.industryList;
        let industryId='';
        for (let j = 0; j < industoryList.length; j++) {
            if (record.industry === industoryList[j].industryName) {
                industryId = industoryList[j].id;
            }
        }
        this.setState({
            visible: true,
            industrySelect: [record.industry],//产业选中数据
            roleSelect: [record.roleList[0].name],//角色选中数据
            loginName: record.loginName,
            name: record.name,
            userId: record.id,
            roleId: record.roleList[0].id,
            industry: industryId,
            userSaltSettings:salt
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
        if (this.state.loginName.length == 0) {
            messages += '请填写登录账户,';
            flag = false;
        }
        if (this.state.name.length == 0) {
            messages += '请填写姓名,';
            flag = false;
        }
        if (this.state.industry.length == 0) {
            messages += '请选择产业,' + this.state.industry;
            flag = false;
        }
        if (this.state.roleId.length == 0) {
            messages += '请选择角色,';
            flag = false;
        }
        if (flag) {
            let addUser = `${Config.REPORT_URL_PREFIX}user/addOrUpdateUser`;
            /*loginName=${this.state.loginName}&name=${this.state.name}&industry=${this.state.industry}&roleId=${this.state.roleId}&userId=${this.state.userId}&region=${this.state.seachSelect}*/
            let params={
                loginName:this.state.loginName,
                name:this.state.name,
                industry:this.state.industry,
                roleId:this.state.roleId,
                userId:this.state.userId,
                region:this.state.seachSelect,
                salt:this.state.userSaltSettings.toString()
            };
            //let addUser = `http://192.168.1.112:8080/report/user/addOrUpdateUser?loginName=${this.state.loginName}&name=${this.state.name}&industry=${this.state.industry}&roleId=${this.state.roleId}&userId=${this.state.userId}`;
            _mm.FetchUtil.init()
                .setUrl(addUser)
                .setMethod('POST')
                .setHeader({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                .setBody(params)
                .dofetch()
                .then((data) => {
                    this.setState({
                        visible: false,
                        defaultValue: [],
                        industrySelect: [],//产业选中数据
                        roleSelect: [],//角色选中数据
                        loginName: '',
                        name: '',
                        industry: '',
                        roleId: '',
                        registerDate: '',
                        userId: '',
                        seachSelect:[],
                        userSaltSettings:['S']
                    });
                    if (data.flag) {
                        message.success(data.message);
                        this.loadingUser();
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
            industrySelect: [],//产业选中数据
            roleSelect: [],//角色选中数据
            loginName: '',
            name: '',
            industry: '',
            roleId: '',
            registerDate: '',
            userId: '',
            seachSelect:[],
            userSaltSettings:['S']
        });
    };


    onExtractValue = (e) => {
        if (e.target.id == 'loginName') {
            this.setState({
                loginName: e.target.value
            });
        }
        if (e.target.id == 'name') {
            this.setState({
                name: e.target.value
            });
        }
        if (e.target.id == 'condition') {
            this.setState({
                condition: e.target.value
            });
        }
    };

    onExtractSelect = (e) => {
        this.setState({
            industry: e,
            industrySelect: [e]
        });
    };
    onSearchSelect = (e) => {
        this.setState({
            searchIndustry: e,
            searchIndustrySelect: [e]
        });
    };
    onJurisdiction = (value) => {
        this.setState({
            jurisdictionValue: value,
            jurisdiction: value.toString()
        });
    };
    onRoleSelect = (e) => {
        this.setState({
            roleId: e,
            roleSelect: [e]
        });
    };
    onSearchRoleSelect = (e) => {
        this.setState({
            searchRole: e,
            searchRoleSelect: [e]
        });
    };
    onSUDRChange=(checkedValues)=>{
        this.setState({
            userSaltSettings:checkedValues
        });
    };

    onDelete = (key) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let findAlUser = `${Config.REPORT_URL_PREFIX}user/delUserById?id=${key}`;
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
                    const dataSource = [...this.state.userList];
                    this.setState({userList: dataSource.filter(item => item.id !== key)});
                } else {
                    message.error(data.message);
                }
            })
    };

    // noinspection JSAnnotator
    render() {
        const columns = [{
            title: '登录账号',
            dataIndex: 'loginName',
            align: 'center',
            key: 'loginName'
        }, {
            title: '姓名',
            dataIndex: 'name',
            align: 'center',
            key: 'name'
        }, {
            title: '所属产业',
            align: 'center',
            dataIndex: 'industry',
            key: 'industry'
        }, {
            title: '所属角色',
            dataIndex: 'roleList[0].name',
            align: 'center',
            key: 'invSorts'
        }, {
            title: '拥有权限',
            dataIndex: 'salt',
            align: 'center',
            render: (text, record) => {
                text=text.replace("S",'查询');
                text=text.replace("W",'维护');
                text=text.replace("D",'下载');
                return <span>{text}</span>
            }
        }, {
            title: '创建日期',
            dataIndex: 'registerDate',
            align: 'center',
            key: 'registerDate'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div>
                        {
                                <Popconfirm title="是否删除?" onConfirm={() => this.onDelete(record.id)}>
                                    <a href="javascript:;">删除</a>
                                </Popconfirm>
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
                <Row className='rowStyle' type="flex" justify="start" style={{marginTop: '20px',borderBottom: '3px solid #F0F2F5',borderTop: '3px solid #F0F2F5',padding:'20px 0 20px 0'}}>
                    <Col xxl={5}  className='colStyle'>
                        <span style={{marginRight: '10px'}}>账号或姓名：</span>
                        <Input placeholder="请输入" style={{width: '150px'}} id="condition"
                               type="text"
                               onChange={this.onExtractValue}/>
                    </Col>
                    <Col xxl={4} className='colStyle'>
                        产业选择：
                        <Select placeholder="选择产业" value={this.state.searchIndustrySelect} style={{width: 120}}
                                onChange={this.onSearchSelect}>
                            {
                                this.state.industryList.map(values =>
                                    values.industryName !== '其他' ?
                                        <Option value={values.id}>{values.industryName}</Option>: ''
                                )
                            }
                        </Select>
                    </Col>
                    <Col xxl={5} className='colStyle'>
                        角色选择:
                        <Select placeholder="选择角色" value={this.state.searchRoleSelect} style={{width: 200}}
                                onChange={this.onSearchRoleSelect}>
                            <Option value={0}>全部</Option>
                            {
                                this.state.roleList.map(values =>
                                    <Option value={values.id}>{values.name}</Option>
                                )
                            }
                        </Select>
                    </Col>
                    <Col xxl={7} className='colStyle' >
                        权限选择：
                        <Select placeholder="权限选择"  style={{width: 310}} mode="multiple" value={this.state.jurisdictionValue}
                                onChange={this.onJurisdiction}>
                                        <Option value={'S'}>{'查询权限'}</Option>
                                        <Option value={'W'}>{'维护权限'}</Option>
                                        <Option value={'D'}>{'下载权限'}</Option>
                        </Select>
                    </Col>

                    <Col xxl={1} className='colStyle' >
                        <Button type="primary" onClick={this.loadingUser}>查询</Button>
                    </Col>
                </Row>
                <Button style={{marginTop:'20px'}} type="primary" onClick={this.showModal}>添加用户</Button>

                {/*添加用户的界面*/}
                <Modal
                    title="用户信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    账户名称：<span style={{color: 'red'}}>✳</span><Input id={"loginName"} value={this.state.loginName}
                                                                     onChange={this.onExtractValue}/>
                    <br/><br/>
                    姓名：<span style={{color: 'red'}}>✳</span><Input id={"name"} value={this.state.name}
                                                                   onChange={this.onExtractValue}/>
                    <br/><br/>

                    <div>
                        产业选择：<span style={{color: 'red'}}>✳</span>
                        <Select placeholder="选择产业" value={this.state.industrySelect} style={{width: 200}}
                                onChange={this.onExtractSelect}>
                            {
                                this.state.industryList.map(values =>
                                    values.industryName !== '其他' ?
                                        <Option value={values.id}>{values.industryName}</Option>: ''
                                )
                            }
                        </Select>
                        <br/>
                        <br/>
                        角色选择：<span style={{color: 'red'}}>✳</span>
                        <Select placeholder="选择角色" value={this.state.roleSelect} style={{width: 200}}
                                onChange={this.onRoleSelect}>
                            {
                                this.state.roleList.map(values =>
                                    <Option value={values.id}>{values.name}</Option>
                                )
                            }
                        </Select>
                        <br/>
                        <br/>
                        操作权限设置
                        <br/>
                        <CheckboxGroup options={this.state.sudrSettings} value={this.state.userSaltSettings} onChange={this.onSUDRChange} />
                    </div>
                </Modal>

                <Table  loading={this.state.loading}   style={{marginTop:'20px'}}
                        dataSource={this.state.userList} columns={columns} bordered/>
            </div>
        );
    }
}

UserSetting.propTypes = {};
export default UserSetting;
