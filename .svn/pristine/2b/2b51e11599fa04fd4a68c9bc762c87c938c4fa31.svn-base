/**
 * Created by guotaidou on 2018/6/17.
 */
import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis,Bar, CartesianGrid,LabelList, Tooltip, Legend} from 'recharts';
class CustomizedAxisTick extends Component {
    render () {
        const {x, y, stroke, payload} = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
            </g>
        );
    }
}
export default CustomizedAxisTick;
