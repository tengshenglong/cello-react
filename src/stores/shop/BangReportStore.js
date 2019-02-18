import {computed, observable, action} from 'mobx';
import Config from '../../common/Config';
import  MUtil from '../../common/util/mm';

const _mm=new MUtil();
export default class BangReportStore {

    @observable dateByDay;
    @observable dateByWeekOrMonth;
    @observable type;
    @observable reportType;
    @observable flag;
    @observable message;


    constructor() {
        this.dateByDay = '';
        this.dateByWeekOrMonth = '';
        this.type = '';
        this.reportType = '';
        this.flag = '';
        this.message = '';
    }

    @action
    selectChange= (resType,event) =>{
        if (resType==='type'){
            this.type=event
        }else{
            this.reportType=event
        }
    };
    @action
    onChange= (resType,date, dateString) => {
        if (resType==="1") {
            this.startDate=dateString[0];
            this.endDate=dateString[1];
        }else{
            this.startDate= dateString[0];
            this.endDate= dateString[1];
        }
    };
    @action
    fetchByWeekOrMonth= (resMap) =>{
        if(_mm.loginStatus()==false){
            return;
        }
        if (this.startDate===""||this.endDate==="") {
            _mm.errorTips("时间不能为空！");
            return false;
        }
        if (this.reportType==="") {
            _mm.errorTips("统计维度不能为空！");
            return false;
        }
        let api =`${Config.REPORT_URL_PREFIX}bangReport/${resMap}?startTime=${this.startDate}&endTime=${this.endDate}&type=3&reportType=${this.reportType}`;

        fetch(api).then(result => result.json()).then(data => {

            _mm.errorTips(data.message);
        });

    };
    @action
    fetchByDay = (resMap) =>{
        if(_mm.loginStatus()==false){
            return;
        }
        if (this.startDate===""||this.endDate==="") {
            _mm.errorTips("时间不能为空！");
            return false;
        }
        let api =`${Config.REPORT_URL_PREFIX}bangReport/${resMap}?startTime=${this.startDate}&endTime=${this.endDate}`;
        fetch(api).then(result => result.json()).then(data => {
            _mm.errorTips(data.message);
        });

    };
}