import React, {Component} from 'react';
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";
import DataSet from "@antv/data-set/build/data-set";
import {ResponsiveContainer} from 'recharts';
import moment from "moment/moment";

class DoubleCharts extends Component {

    constructor(props){
        super(props);
        this.state={
            data:this.props.data
        }
    }

    render(){
        const ds = new DataSet();
        const dv = ds.createView().source(this.props.data);
        const dataList1=[];
        const dataList2=[];
        for (let i=30;i>=1;i--){
            dataList1.push(" "+moment(moment() - 24*60*60*1000*i).format("YYYY-MM-DD").toString()+". ",)
        }
        for (let i=7;i>=1;i--){
            dataList2.push(" "+moment(moment() - 24*60*60*1000*i).format("YYYY-MM-DD").toString()+". ",)
        }
        const a=this.props.type==='week'?dataList2:dataList1;
        dv.transform({
            type: "fold",
            fields:a,
            // 展开字段集
            key: "日期",
            // key字段
            value: "销额" // value字段
        });
        return(
            <ResponsiveContainer width='100%' height={295}>

            <Chart data={dv} forceFit={true}>
                <Axis name="日期" />
                <Axis name="销额" />
                <Legend />
                <Tooltip
                    crosshairs={{
                        type: "y"
                    }}
                />
                <Geom
                    type="interval"
                    position="日期*销额"
                    color={"name"}
                    adjust={[
                        {
                            type: "dodge",
                            marginRatio: 1 / 32
                        }
                    ]}
                />
            </Chart>
            </ResponsiveContainer>
        )
    }
}
export default DoubleCharts