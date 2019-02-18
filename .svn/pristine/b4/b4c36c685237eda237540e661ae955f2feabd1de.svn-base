import React, {Component} from 'react';
import {Layout, Menu,Dropdown,Avatar,Icon } from 'antd';
import Cookies from 'js-cookie';
const {Header} = Layout;
class CHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            username:Cookies.get('username')||''
        }
    }
    onLogout(){
        Cookies.remove('username', { path: '' });
        window.location.href='#/login';
    }
    backHome(){
            window.location.href='/';
    }
  render() {
      const menu = (
          <Menu theme="dark">
              <Menu.Item>
                  <div  onClick={()=>{this.onLogout()}} rel="noopener noreferrer" href="javascript:;"><Icon type="logout"/>
                      <span style={{marginLeft:'10px'}}>退出登录</span></div>
              </Menu.Item>
          </Menu>
      );
    return (
        <Header className="header" style={{paddingLeft:24}}>
          <div className="logo" onClick={()=>{this.backHome()}} style={{float:'left'}}><img src={require('../assets/logo.png')}/></div>
          <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{lineHeight: '64px'}}
          >
              <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" style={{float:'right'}}>
                      <Avatar icon="user"/>
                      {
                          this.state.username
                              ?<span style={{marginLeft:'10px',color:'#C0C0C0'}}>欢迎：{this.state.username}</span>
                              :<span style={{marginLeft:'10px',color:'#C0C0C0'}}>欢迎您</span>
                      }
                      <Icon type="down" style={{color: '#C0C0C0' }}/>
                  </a>
              </Dropdown>
          </Menu>
        </Header>
    );
  }
}
export default CHeader;
