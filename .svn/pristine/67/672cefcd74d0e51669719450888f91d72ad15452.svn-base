/**
 * Created by guotaidou on 2018/7/5.
 */
import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import Cookies from 'js-cookie';
class Bread extends Component {
    constructor(props) {
        super(props);
        this.state={
            parentTag:'',
            childTag:''
        }
    }
    componentWillMount(){
        let sliderList=JSON.parse(localStorage.a).rs;
        let hash=window.location.hash.replace("#","");
        let parentId='';
        sliderList.map((data,index)=>{
            if(data.url==hash){
                this.setState({
                    childTag:data.name
                });
                parentId=data.parentId;
            }
        });
        sliderList.map((data,index)=>{
            if(data.id==parentId){
                this.setState({
                    parentTag:data.name
                });
            }
        });
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.parentTag}</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.childTag}</Breadcrumb.Item>
                </Breadcrumb>
                <h2 style={{marginTop:'20px'}}>{this.state.childTag}</h2>
            </div>
        )
    }
}
export default Bread;