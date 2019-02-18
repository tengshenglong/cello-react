import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import  MUtil from '../common/util/mm';
import '../common/css/style.css';
const _mm=new MUtil();

class Welcome extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    _mm.BrowerHeadTitle();
    //判断登陆状态
    if(_mm.loginStatus()==false){
      return;
    }
  }

  render() {
    return (
      <div style={{position:'absolute' ,textAlign:'center',width:'100%',height:'100%',backgroundImage:`url(${require("../assets/background.jpg")})` }}>
          <div style={{paddingTop:'10%'}}>
            <div><img src={require('../assets/welcomeLogo.png')} alt=""/></div>
            <div style={{fontSize:'62px',color:'#026ADA'}}>HBDM报表管理系统</div>
          </div>
      </div>
    );
  }
}
export default Welcome;
