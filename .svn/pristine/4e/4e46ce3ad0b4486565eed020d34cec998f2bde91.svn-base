/**
 * Created by guotaidou on 2018/7/18.
 */
import React, {Component} from 'react';
import {Alert} from 'antd';
class AlertInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            info:this.props.info||'本页面数据时间统计维度为LES出库单创建时间，请知悉！'
        }
    }
    render() {
        return (
            <div style={{marginTop:10}}>
                <Alert message={this.state.info} type="info"/>
            </div>
        );
    }
}
export default AlertInfo;
