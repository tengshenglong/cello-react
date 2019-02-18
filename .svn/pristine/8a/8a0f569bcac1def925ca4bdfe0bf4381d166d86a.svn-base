/**
 * Created by guotaidou on 2018/6/11.
 */
import React, {Component} from 'react';
import Config from "../../common/Config";
import Cookies from "js-cookie";
import {Button, Col,message, Row, DatePicker, Table,Transfer ,Tree , Input, Select,Breadcrumb,List,Icon,Modal, Card} from 'antd';
import  MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
const _mm=new MUtil();
const TreeNode = Tree.TreeNode;
class menuManage extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            treeData:[],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            visible: false,
            title:'菜单管理',
            confirmLoading: false,
            userName:'',
            userId:'',
            tagChildName:'',
            tagChildUrl:'',
            addShow:'none',
            changeShow:'none',
            firstShow:'none',
            location:'',//父菜单位置
            submenu:''//子菜单位置
        }
    }

    componentWillMount() {
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let findAllResource = `${Config.REPORT_URL_PREFIX}resource/findAllResource`;
        this.fetchOrders(findAllResource,2);

    }
    fetchOrders = (url,role) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let api=url;
        let status=role;
        _mm.FetchUtil.init()
            .setUrl(api)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {

                if(status==1){
                    message.success(data.message);
                    let findAllResource = `${Config.REPORT_URL_PREFIX}resource/findAllResource`;
                    this.fetchOrders(findAllResource,2);
                }else if(status==2){

                    this.handleCancel();
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
                        treeData:treeData,
                        data:data.dataList
                    });
                }else if(status==3){
                    message.success(data.message);
                    let findAllResource = `${Config.REPORT_URL_PREFIX}resource/findAllResource`;
                    this.fetchOrders(findAllResource,2);
                }else if(status==4){
                    message.success(data.message);
                    let findAllResource = `${Config.REPORT_URL_PREFIX}resource/findAllResource`;
                    this.fetchOrders(findAllResource,2);
                }else if(status==5){
                    message.success(data.message);
                    let findAllResource = `${Config.REPORT_URL_PREFIX}resource/findAllResource`;
                    this.fetchOrders(findAllResource,2);
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
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

    };
    onSelect = (selectedKeys, info) => {
        this.setState({
            changeShow:'block',
            firstShow:'none'
        });
        this.state.data.map((num,index)=>{
            if(num.id==selectedKeys[0]){
                this.setState({
                    userName:num.name,
                    location:num.location
                });
                if(num.parentId==1){
                    this.setState({
                        addShow:'block'
                    })
                }else{
                    this.setState({
                        addShow:'none',
                        tagChildUrl:num.url
                    })
                }
            }
        });
        this.setState({
            selectedKeys :selectedKeys,
            visible:true,
            userId:selectedKeys[0]
        });

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
    //input框事件
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    };
    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };
    /*菜单位置*/
    onChangeLocation = (e) => {
        if(isNaN(e.target.value)||e.target.value.indexOf(".")!==-1){
            this.setState({ location: this.state.location });
        }else{
            this.setState({ location: e.target.value });
        }
    };
    /*子菜单位置*/
    onChangezLocation = (e) => {
        if(isNaN(e.target.value)||e.target.value.indexOf(".")!==-1){
            this.setState({ submenu: this.state.submenu });
        }else{
            this.setState({ submenu: e.target.value });
        }
    };
    onChangeTagName = (e) => {
        this.setState({ tagChildName: e.target.value });
    };
    onChangeTagUrl = (e) => {
        this.setState({ tagChildUrl: e.target.value });
    };
    //modal层事件
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {

    };
    handleCancel = () => {
        this.setState({
            visible: false,
            userName:'',
            tagChildName:'',
            tagChildUrl:'',
            selectedKeys: [],
            location:'',
            submenu:''
        });
    };
    //删除菜单
    deleteTag = (e) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let url=`${Config.REPORT_URL_PREFIX}resource/delResourceById?resourceId=${e.target.value}`;
        this.fetchOrders(url,1);
    };
    //修改菜单
    change = (e) =>{
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let parentId='';
        this.state.data.map((num,index)=>{
            if(num.id==e.target.value){
                parentId=num.parentId;
            }
        });
        if(parentId==1){
            var url=`${Config.REPORT_URL_PREFIX}resource/addOrUpdateResource?resourceId=${e.target.value}&parentId=${parentId}&url=/&resourceName=${this.state.userName}&location=${this.state.location}`
        }else{
            var url=`${Config.REPORT_URL_PREFIX}resource/addOrUpdateResource?resourceId=${e.target.value}&parentId=${parentId}&url=${this.state.tagChildUrl}&resourceName=${this.state.userName}&location=${this.state.location}`
        }
        this.fetchOrders(url,3);
    };
    //添加子菜单
    add = (e) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let url=`${Config.REPORT_URL_PREFIX}resource/addOrUpdateResource?resourceId=&parentId=${e.target.value}&resourceName=${this.state.tagChildName}&url=${this.state.tagChildUrl}&location=${this.state.submenu}`;
        this.fetchOrders(url,4)
    };
    //添加一级菜单
    firstClassMenu = (e) => {
        this.setState({
            visible:true,
            firstShow:'block',
            changeShow:'none'
        });
    };
    //确定添加
    addFirstMenu = () => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let url=`${Config.REPORT_URL_PREFIX}resource/addOrUpdateResource?parentId=1&resourceName=${this.state.userName}&resourceId=&url=/&location=${this.state.location}`;
        this.fetchOrders(url,5)

    };
    render(){
        const {tagChildName, firstShow,changeShow,addShow,tagChildUrl,treeData,visible,title,confirmLoading,userName,userId,location,submenu} = this.state;
        const reverseAddShow=addShow=='none'?'block':'none';
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <Button type="primary" style={{marginTop:'20px',marginBottom:'20px'}} onClick={this.firstClassMenu}>添加一级菜单</Button>

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
                <Modal title={title}
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                       footer={null}
                    >
                    <div style={{display:firstShow}}>
                        <h4 style={{marginTop:'20px'}}>添加一级菜单</h4>
                        <span>菜单名称: <span style={{color: 'red'}}>✳</span></span>

                        <Input
                            style={{marginTop:'10px'}}
                            placeholder="请输入菜单名称"
                            value={userName}
                            onChange={this.onChangeUserName}
                            />
                        <span>菜单位置:</span>
                        <Input
                            style={{marginTop:'10px'}}
                            placeholder="请输入数字"
                            value={location}
                            onChange={this.onChangeLocation}
                            />
                        <Button type="primary" style={{marginTop:'20px'}} onClick={this.addFirstMenu}>确定添加</Button>

                    </div>
                    <div style={{display:changeShow}}>
                        <Button type="primary" value={userId} onClick={this.deleteTag}>删除</Button>
                        <div>
                            <h4 style={{marginTop:'20px'}}>修改</h4>
                            <span>菜单名称: <span style={{color: 'red'}}>✳</span></span>
                            <Input
                                style={{marginTop:'10px'}}
                                placeholder="请输入菜单名称"
                                value={userName}
                                onChange={this.onChangeUserName}
                                />
                            <span style={{display:reverseAddShow}}>
                                <span>子菜单路径: <span style={{color: 'red'}}>✳</span></span>

                            <Input
                                style={{marginTop:'10px'}}
                                placeholder="请输入子菜单路径"
                                value={tagChildUrl}
                                onChange={this.onChangeTagUrl}
                                />
                            </span>
                            <span>菜单位置:</span>
                            <Input
                                style={{marginTop:'10px'}}
                                placeholder="请输入数字"
                                value={location}
                                onChange={this.onChangeLocation}
                            />

                            <Button type="primary" style={{marginTop:'20px'}} value={userId} onClick={this.change}>确定修改</Button>
                        </div>

                        <div style={{display:addShow}}>
                            <h4 style={{marginTop:'20px'}}>添加子菜单</h4>
                            <span>子菜单名称: <span style={{color: 'red'}}>✳</span></span>
                            <Input
                                style={{marginTop:'10px'}}
                                placeholder="请输入子菜单名称"
                                value={tagChildName}
                                onChange={this.onChangeTagName}
                                />
                            <span>子菜单路径: <span style={{color: 'red'}}>✳</span></span>
                            <Input
                                placeholder="请输入子菜单路径"
                                style={{marginTop:'10px'}}
                                value={tagChildUrl}
                                onChange={this.onChangeTagUrl}
                                />
                            <span>菜单位置:</span>
                            <Input
                                style={{marginTop:'10px'}}
                                placeholder="请输入数字"
                                value={submenu}
                                onChange={this.onChangezLocation}
                            />
                            <Button type="primary" style={{marginTop:'20px'}} value={userId} onClick={this.add}>确定添加</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

}
export default menuManage;
