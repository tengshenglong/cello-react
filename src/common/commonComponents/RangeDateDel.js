/**
 * Created by zhousheng 2018/11/19
 */
import React, {Component} from 'react';
import {Button, Col, Alert, DatePicker, Popconfirm, message} from 'antd';
import  MUtil from '../../common/util/mm';
const _mm=new MUtil();
const {  RangePicker } = DatePicker;
class RangeDateDel extends Component {
    constructor(props){
        super(props);
        this.state=({
            startDate: '',
            endDate:'',
            dateFormat :'YYYY-MM-DD',//日期格式
        });
    }
    //范围时间选择函数
    rangeDateChange = (value) => {
        let startDate=value[0].format(this.state.dateFormat);
        let endDate=value[1].format(this.state.dateFormat);
        this.setState({
            startDate:startDate,
            endDate:endDate
        });
    };
    delOpDate = () => {
        //判断登陆状态
        if(_mm.loginStatus()===false){
            return;
        }
        if (this.state.startDate.trim()===''||this.state.endDate.trim()===''){
            _mm.errorTips("请选择删除日期！");
            return;
        }
        let findAlUser = `${this.props.delUrl}?startDate=${this.state.startDate}&`+
            `endDate=${this.state.endDate}`;
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
                } else {
                    message.error(data.message);
                }
            })
    };
    render(){
        return(
            <Col span={this.props.spanSize}  style={{marginLeft:-1.5,marginBottom:10,borderLeft:'5px solid #F0F2F5',paddingLeft:'5%'}}>
                <Alert message={this.props.promptMsg} type="warning" showIcon style={{bottom:5,width:350}} />
                <span>选择日期:
                        <font style={{color: 'red',marginRight: '2px', display: 'inline-block'}}>*
                            <RangePicker
                                defaultValue={[this.state.startDate, this.state.endDate]}
                                format={this.state.dateFormat}
                                allowClear={false}
                                onChange={this.rangeDateChange.bind(this)}
                            />
                            <Popconfirm title="是否删除？" onConfirm={() => this.delOpDate()} >
                                <Button  type="danger" style={{marginLeft:20,marginTop:5,display:'inline-block'}} >
                                    {this.props.buttonName}
                                </Button>
                            </Popconfirm>
                        </font>
                    </span>
            </Col>
        )
    }
}
export default RangeDateDel;