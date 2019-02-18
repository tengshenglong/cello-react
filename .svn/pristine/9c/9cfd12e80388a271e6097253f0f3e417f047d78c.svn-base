/**
 * Created by guotaidou on 2018/8/3.
 */
import React, {Component} from 'react';
import {Cascader} from 'antd';
class Cascader extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
    function onChange(value) {
        console.log(value);
    }
    render(){
        const options = [{
            value: '冰箱',
            label: '冰箱',
            children: [{
                value: '产品组',
                label: '产品组',
                children: [{
                    value: '冰箱',
                    label: '冰箱'
                }]
            },{
                value: '价位段',
                label: '价位段',
                children: [{
                    value: '1000-2000',
                    label: '1000-2000'
                }]
            }]
        }];
        return(
            <div>
                <Cascader options={options} onChange={onChange} placeholder="Please select" />
            </div>
        )
    }
}
export default Cascader;
