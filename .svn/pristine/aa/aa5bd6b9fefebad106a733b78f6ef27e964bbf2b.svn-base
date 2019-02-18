import React, {Component} from 'react';
import {BrowserRouter  as Router,Switch,Redirect,Route,Link} from 'react-router-dom';
import './App.css';
import {Breadcrumb, Layout, Menu,Form} from 'antd';
import Routes from './common/Routes';
import CHeader from './common/CHeader';
import CSider from './common/CSider';
import NormalLoginForm from './components/login/login';
import OutStore from './components/login/OutStore';

import CBreadcrumb from './common/CBreadcrumb';

const {Content} = Layout;
const Login = Form.create()(NormalLoginForm);


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            bowerHeight:document.body.clientHeight-64-24-24
        }
    }
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/outStore" component={OutStore}/>
        <Route path="/" render={props=>(
                      <Layout style={{height:'100%',minHeight:'100%'}}>
                        <CHeader/>
                        <Layout>
                            <CSider/>
                            <Layout style={{
                             padding: '24px 24px 24px'
                             }}>
                                <Content
                                      style={{
                                        background: '#fff',
                                        position:'relative',
                                        overflow:'auto',
                                        height:this.state.bowerHeight
                                      }}>
                                 <Routes/>
                                 </Content>
                            </Layout>
                         </Layout>
                      </Layout>
                        )}/>
      </Switch>
    );
  }
}

export default App;
