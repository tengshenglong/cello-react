import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Layout, Menu} from 'antd';
import Cookies from 'js-cookie';
import OrderChoice from "../components/storeOrder/OrderChoice";
import {inject, observer} from "mobx-react/index";
const {SubMenu} = Menu;
const {Sider} = Layout;

class CSider extends Component {
    constructor(props){
        super(props);
        this.state={
            username:Cookies.get('username')||'',
            collapsed: false,
            openKeys:[],
            bowerHeight:document.body.clientHeight-112
        }
    }
    componentWillMount(){

    }
    onCollapse = (collapsed) => {
        if(collapsed){
            this.setState({ openKeys:[] });
        }
        this.setState({ collapsed });
    };
    onOpenChange = (openKeys) => {
        this.setState({openKeys: [openKeys[openKeys.length-1]] });
    };
  render() {
      if(localStorage.a){
          var  loginStatus=JSON.parse(localStorage.a).rs;
      }else{
          var loginStatus=[];
      }
      return (
        <Sider width={200} style={{background: '#fff',overflow:'auto',height:this.state.bowerHeight,paddingBottom:0}} collapsible
               collapsed={this.state.collapsed}
               onCollapse={this.onCollapse}
            >
          <Menu
              mode='inline'
              theme="dark"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              style={{minHeight:'100%', borderRight: 0}}
          >
              {
                  loginStatus.map((num,index)=>{
                     if(num.parentId==1){

                         return  (<SubMenu  key={num.id} title={<span><Icon type="inbox"/><span>{num.name}</span></span>}>
                         {
                             loginStatus.map((data)=>{if(data.parentId==num.id){
                                return (
                                    <Menu.Item key={data.id}>
                                        <Link to={data.url}>{data.name}</Link>
                                    </Menu.Item>
                                )
                             }})
                         }
                         </SubMenu>)
                      }
                  })
              }
          </Menu>
        </Sider>
    );
  }
}

export default CSider;
