import {computed, observable, action} from 'mobx';
import moment from 'moment';
import Cookies from 'js-cookie';
import Config from '../../common/Config';
import  MUtil from '../../common/util/mm';


const _mm=new MUtil();
export default class BangExcelStore {
    dateFormat = 'YYYY-MM-DD';

    @observable queryDate;
    @observable type;
    @observable week;
    @observable month;
    @observable yearForWeek;
    @observable yearForMonth;
    @observable startDate;
    @observable endDate;


    constructor() {
        this.queryDate=moment().format(this.dateFormat);
        this.type='';
        this.week='';
        this.month='';
        this.yearForWeek='';
        this.yearForMonth='';
        this.startDate='';
        this.endDate='';
    }
    @action
    download = () => {
        const currentUserId= Cookies.get('username');
        let api =`${Config.REPORT_URL_PREFIX}bangReport/report?currentUserId=${currentUserId}&type=${this.type}`;
        if(this.type==="1"){
            if (this.queryDate===""||this.queryDate===undefined) {
                _mm.errorTips("时间不能为空！");
                return false;
            }else{
                api+=`&queryDate=${this.queryDate}`;
            }
        }else if (this.type==="2"){
            if (this.startDate===""||this.startDate===undefined) {
                _mm.errorTips("时间不能为空！");
                return ;
            }
            const date=new Date(this.endDate).getTime()-new Date(this.startDate).getTime();
            const days=Math.floor(date/(24*3600*1000));
            if(days>7){
                _mm.errorTips("时间间隔不能大于7天");
                return;
            }
                api+=`&startTime=${this.startDate}&endTime=${this.endDate}`;

        }else{
            if (this.yearForMonth===""||this.yearForMonth===undefined) {
                _mm.errorTips("时间不能为空！");
                return false;
            }else{
                api+=`&month=${this.month}&yearForMonth=${this.yearForMonth}`;
            }
        }
        window.location.href=api;

    };
    @action
    onChange= (type,date, dateString) => {
        this.type=type;
        if (type==="1") {
            this.queryDate=dateString;
        }else if (type==="2"){
            this.startDate=moment(date[0]).format('YYYY-MM-DD');
            this.endDate=moment(date[1]).format('YYYY-MM-DD');
        }else{
            this.yearForMonth=dateString.substring(0,4);
            this.month=parseInt(dateString.substring(5,7));
        }
    }
}