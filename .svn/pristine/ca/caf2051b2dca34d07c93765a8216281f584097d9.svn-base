import {computed, observable, action} from 'mobx';
import Config from '../../common/Config';
import Cookies from 'js-cookie';
import React from 'react';
import  MUtil from '../../common/util/mm';

const _mm=new MUtil();
export default class BangViewStore {
    dateFormat = 'YYYY-MM-DD';
    RADIAN = Math.PI / 180;

    @observable startTime;
    @observable endTime;
    @observable invSortData;
    @observable largeAreaData;
    @observable shopData;
    @observable totalNum;
    @observable totalAmount;
    @observable data;
    @observable loading='';


    constructor() {
        this.startTime = '';
        this.endTime = '';
        this.invSortData = [{name: '无数据', value: 0}];
        this.largeAreaData = [{name: '无数据', value: 100}];
        this.shopData = [];
        this.totalNum = 0;
        this.totalAmount = 0;
        this.data = [];
        this.loading= {
            spinning:false,
            size:'large'
        };

    }

    //排序
    @action
    compare= (property,turn) =>{
        return function(a,b){
            const value1 = a[property];
            const value2 = b[property];
            if (turn==="desc") {
                return value2 - value1;
            }else{
                return value1 - value2;
            }

        };
    };

    @action
    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index , fill,name}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const x  = cx + radius * Math.cos(-midAngle * this.RADIAN);
        const y = cy  + radius * Math.sin(-midAngle * this.RADIAN);

        const sin = Math.sin(-this.RADIAN * midAngle);
        const cos = Math.cos(-this.RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        return (
            <g>
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                <text x={x} y={y} fill="white" textAnchor={'middle'} 	dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                {name === '无数据' ? <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                                        fill="#333">{`${name}`}</text> :
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                          fill="#333">{`${name}(${value})`}</text>}
            </g>
        );
    };
    @action
    fetchByDay  = () =>  {
        if(_mm.loginStatus()==false){
            return;
        };
        if (this.startTime===""||this.endTime===""||this.startTime===undefined||this.endTime===undefined) {
            _mm.errorTips("时间不能为空！");
            return false;
        }
        const currentUserId= Cookies.get('username');
        let api =`${Config.REPORT_URL_PREFIX}bangReport/dayReport?currentUserId=${currentUserId}&startTime=${this.startTime}&endTime=${this.endTime}`;
        this.loading= {
            spinning:true,
            size:'large'
        };

        _mm.FetchUtil.init()
            .setUrl(api)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((resultData) => {
                this.loading= {
                    spinning:false,
                    size:'large'
                };
                if(resultData.largeAreaData.length==0){
                    _mm.errorTips('没有数据');
                    this.invSortData =resultData.invSortData.length<=0?[{name: '无数据', value: 0}]:resultData.invSortData.sort(this.compare("value","desc"));
                    this.shopData =resultData.shopData;
                    this.largeAreaData = resultData.largeAreaData.length<=0?[{name: '无数据', value: 100}]:resultData.largeAreaData.sort(this.compare("value","desc"));
                }else{
                    this.invSortData =resultData.invSortData.length<=0?[{name: '无数据', value: 0}]:resultData.invSortData.sort(this.compare("value","desc"));
                    this.shopData =resultData.shopData;
                    this.largeAreaData = resultData.largeAreaData.length<=0?[{name: '无数据', value: 100}]:resultData.largeAreaData.sort(this.compare("value","desc"));
                    console.log(this.largeAreaData)
                }
            })
            .catch((error) => {
                this.loading= {
                    spinning:false,
                    size:'large'
                };
                _mm.errorTips(error);
            });

    };
    @action
    dateChange = value => {
        if (value[0]===undefined||value[1]===undefined) {
            this.startTime='';
            this.endTime= '';
        }else{
            this.startTime=value[0].format(this.dateFormat);
            this.endTime= value[1].format(this.dateFormat);
        }

    };
}