/**
 * Created by guotaidou on 2018/6/7.
 */
import React, {Component} from 'react';
import Config from "../../common/Config";
import Cookies from "js-cookie";
import {Button, Col, message,Row, DatePicker, Table,Transfer ,Tree , Input, Select,Breadcrumb,List,Icon,Modal, Card} from 'antd';
import  MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
const _mm=new MUtil();
const TreeNode = Tree.TreeNode;
class RoleSetting extends Component {
    constructor(props) {
        super(props);
        this.state={
            treeData:[],
            data:[],
            totalData:[],
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            userName: '',
            userId: '',
            title:'添加角色',
            show:'block',
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            loading: {
                spinning: true,
                size: 'large'
            }
        }
    }

    componentWillMount() {
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let findAllResource = `${Config.REPORT_URL_PREFIX}resource/findAllResource`;
        let findAllRole = `${Config.REPORT_URL_PREFIX}role/findAllRole`;

        this.fetchOrders(findAllResource,2);
        this.fetchOrders(findAllRole,1);
    }

    fetchOrders = (url,role) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let api=url;
        let status=role;
        this.setState({
            loading: {
                spinning: true,
                size: 'large'
            }
        });
        _mm.FetchUtil.init()
            .setUrl(api)
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
                if(status==1){
                    this.setState({
                        data:data.dataList
                    });
                }else if(status==2){

                    const treeData=[];
                    data.dataList.map((num,index)=>{
                        if(num.parentId==1){
                            var a= {
                                title:num.name,
                                key:num.id,
                                children:[]
                            };
                            data.dataList.map((data)=>{if(data.parentId==num.id){
                                a.children.push({title:data.name,key:data.id})
                            }});
                            treeData.push(a);
                        }
                    });
                    this.setState({
                        treeData:treeData
                    });
                }else if(status==3){
                    let findAllRole = `${Config.REPORT_URL_PREFIX}role/findAllRole`;
                    this.fetchOrders(findAllRole,1);
                    message.success(data.message);
                }

            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };

    //修改权限
    reviseAuthority = (e)=>{

        let arr1=e.target.value.split(',');
        let arr=[];
        this.state.data.map((num,index)=>{
            if(num.id==arr1[0]){
                num.resources.map((data,index)=>{
                    if(data.id!='1'&&data.parentId!='1'){
                        arr.push(data.id)
                    }
                })
            }
        });
        this.setState({
            userId:arr1[0],
            title:'修改权限',
            show:'none',
            checkedKeys:arr,
            userName:arr1[1]
        });

            this.showModal();
    };
    //添加角色
    addUser=()=>{
        this.setState({
            userName:'',
            title:'添加角色',
            show:'block',
            checkedKeys:[],
            userId:''
        });
        this.showModal();
    };
    //删除角色
    deleteRole=(e)=>{
        let url=`${Config.REPORT_URL_PREFIX}role/delRoleById?id=${e.target.value}`;
        this.fetchOrders(url,3);

    };
    //modal层事件
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        if(!this.state.userName){
            _mm.errorTips('名称不能为空！');
            return;
        }
        let params={
            roleName:this.state.userName,
            resourcesArray:this.state.checkedKeys,
            roleId:this.state.userId
        };
        this.setState({
            confirmLoading: true,
            userName:''
        });
        let url=`${Config.REPORT_URL_PREFIX}role/addOrUpdateRole`;
        _mm.FetchUtil.init()
            .setUrl(url)
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
                    confirmLoading: false
                });
                message.success(data.message);
                let findAllRole = `${Config.REPORT_URL_PREFIX}role/findAllRole`;
                this.fetchOrders(findAllRole,1);
            })
            .catch((error) => {
                _mm.errorTips(error);
            });

        this.setState({
            userName:''
        });

    };
    handleCancel = () => {
        this.setState({
            visible: false,
            userName:''
        });
    };
    //input框事件
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    };
    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };
    //tree事件

    onExpand = (expandedKeys) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };
    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
    };
    onSelect = (selectedKeys, info) => {
        this.setState({ selectedKeys });
    };
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    };


    render() {
        const {treeData, data, visible, confirmLoading, ModalText,userName,title,show} = this.state;
        const state = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const columns = [
            { title: '角色', dataIndex: 'name', key: 'name',align:'center' },
            {
                title: '权限管理',
                key: 'operation',
                align:'center',
                render: (e) => {
                    return <Button type="primary" value={`${e.id},${e.name}`}  onClick={this.reviseAuthority}>权限操作</Button>
                }
            },
            {
                title: '删除角色',
                key: 'delte',
                align:'center',
                render:(e) => {
                    return <Button type="primary" value={e.id}  onClick={this.deleteRole}>删除</Button>
                }
            }
        ];
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <div style={{marginTop:'20px'}}>
                    <Button onClick={this.addUser} type="primary" style={{marginTop:'20px', marginBottom: 16 }}>
                        添加角色
                    </Button>
                    <Modal title={title}
                           visible={visible}
                           onOk={this.handleOk}
                           confirmLoading={confirmLoading}
                           onCancel={this.handleCancel}
                        >
                        <div>

                             <div>
                                 <span>角色名称: <span style={{color: 'red'}}>✳</span></span>
                                 <Input
                                     style={{marginTop:'10px'}}
                                placeholder="请输入角色名称"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffix}
                                value={userName}
                                onChange={this.onChangeUserName}
                                ref={node => this.userNameInput = node}
                                />
                                 <h4 style={{marginTop:'20px'}}>赋予权限</h4>
                             </div>

                            <Tree
                                checkable
                                onExpand={this.onExpand}
                                expandedKeys={this.state.expandedKeys}
                                autoExpandParent={this.state.autoExpandParent}
                                onCheck={this.onCheck}
                                checkedKeys={this.state.checkedKeys}
                                onSelect={this.onSelect}
                                selectedKeys={this.state.selectedKeys}
                                >
                                {this.renderTreeNodes(treeData)}
                            </Tree>

                        </div>
                    </Modal>
                    <Table loading={this.state.loading} bordered={true} columns={columns} dataSource={data} />

                </div>
            </div>
        )
    }
}
export default RoleSetting;
