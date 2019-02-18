/**
 * Created by guotaidou on 2018/6/17.
 */
import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis,Bar, CartesianGrid,LabelList, Tooltip, Legend} from 'recharts';
class CustomTooltip extends Component {
    render() {
        const { active } = this.props;

        if (active) {
            const { payload, label } = this.props;
            // console.log(payload);
            return (
                <div className="custom-tooltip" style={{backgroundColor:'Gainsboro '}}>
                    <p className="label">{`日期 : ${label}`}</p>
                    {
                        payload!==[] && payload !== null ?payload.map((value)=>{
                            return(
                                <p className="label" style={{color:value.stroke}}>{`${value.name} : ${value.value}%`}</p>
                            )
                        }):null
                    }
                </div>
            );
        }

        return null;
    }
}
export default CustomTooltip;
