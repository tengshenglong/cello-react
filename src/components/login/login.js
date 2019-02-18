/**
 * Created by guotaidou on 2018/5/14.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Cookies from 'js-cookie';
import Config from '../../common/Config.js';
import '../../common/css/login.css';
import  MUtil from '../../common/util/mm';
import  User from '../../common/service/user-service';
import {inject, observer} from "mobx-react/index";

const _user=new User();
const _mm=new MUtil();
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props){
        super(props);

        this.state={
            username:Cookies.get('username')||'',
            password:'',
            redirect:_mm.getUrlParam('redirect')||'/',
            loading:false
        }
    }
    componentWillMount(){
        _mm.BrowerHeadTitle();
    }
    componentDidMount(){
        if(this.state.username){
            this.props.history.push(this.state.redirect);
        }
        document.addEventListener("keydown",this.handleEnterKey);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown",this.handleEnterKey);
    }
    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let loginInfo={
                cn:this.state.username,
                pwd:this.state.password
            },
            checkResult=_user.checkLoginInfo(loginInfo);

        //验证通过
        if(checkResult.status){
            this.setState({
                loading:true
            });
            let params={
                username:escape(loginInfo.cn),
                pwd:escape(loginInfo.pwd).replace(/\+/g,'%2B'),
                password:'admin'
            };
            _mm.FetchUtil.init()
                .setUrl(`${Config.REPORT_URL_PREFIX}login`)
                .setMethod('POST')
                .setHeader({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                .setBody(params)
                .dofetch()
                .then((data) => {
                    this.setState({
                        loading:false
                    });
                    if(data.flag===true){
                        const inFifteenMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
                        Cookies.set('username', this.state.username, { expires: inFifteenMinutes, path: '' });
                        localStorage.a=JSON.stringify(data);
                        this.props.history.push(this.state.redirect);
                    }else{
                                    _mm.errorTips(data.message);
                                }
                })
                .catch((error) => {
                    this.setState({
                        loading:false
                    });
                    _mm.errorTips(error);
                });
        }
        //验证信息不通过
        else{
            _mm.errorTips(checkResult.msg);
        }
    };
    handleEnterKey = (e) => {
        if(e.keyCode === 13){
            this.handleSubmit(e);
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="loginPage">
                <div className="loginLogo"><img src={require('../../assets/logo.png')} alt=""/></div>
                <div className="loginPageContainer">
                    <div className="font-style">登录页</div>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '输入用户名!' }]
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text"
                               name="username" placeholder="用户名"
                               onChange={e=>this.onInputChange(e)}
                            />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '输入密码!' }]
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} name="password"
                               name="password"
                               type="password" placeholder="密码"
                               onChange={e=>this.onInputChange(e)}
                            />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}  className="login-form-button">
                        登陆
                    </Button>
                </FormItem>
            </Form>
                </div>
            </div>
        );
    }
}
export default NormalLoginForm;



