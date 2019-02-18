/**
 * Created by guotaidou on 2018/8/28.
 */
import {computed, observable, action} from 'mobx';
import moment from 'moment';
import Cookies from 'js-cookie';
import Config from '../../common/Config';
import  MUtil from '../../common/util/mm';


const _mm=new MUtil();
export default class commonStore {
    dateFormat = 'YYYY-MM-DD';

    @observable currentPage;
    @observable loading;
    @observable data;
    @observable dataList;
    @observable evalusteLines;
    @observable dataList1;
    @observable masterTotalNum;
    @observable masterTotalAmount;
    @observable bangTotalNum;
    @observable bangTotalAmount;
    @observable totaltarget;
    @observable totaltq;
    @observable totalNum;
    @observable totalPrice;
    @observable invSortData;
    @observable largeAreaData;
    @observable industryData;
    @observable areaData;
    @observable popGMVData;
    @observable masterData;
    @observable totalReality;
    @observable totalTarget;
    @observable totalAmount;
    @observable totalAmounts;
    @observable totalPv;
    @observable lastPv;
    @observable rate;
    @observable totalUv;
    @observable spinShow;
    @observable totalElement;


    constructor() {
        this.currentPage = 1,
            this.data = [],
            this.dataList = [],
            this.evalusteLines = [],
            this.dataList1 = [],
            this.loading = {
                spinning: false,
                size: 'large'
            },
            this.masterTotalNum = '',
            this.masterTotalAmount = '',
            this.bangTotalNum = '',
            this.bangTotalAmount = '',
            this.totaltarget = '',
            this.totaltq = '',
            this.totalPrice = '',
            this.invSortData = [{name: '无数据', value: 0}],
            this.areaData = [{name: '无数据', value: 100}],
            this.largeAreaData = [{name: '无数据', value: 100}],
            this.industryData = [{name: '无数据', value: 0}],
            this.popGMVData = [{name: '无数据', value: 100}],
            this.masterData = [{name: '无数据', value: 100}],
            this.totalReality = '',
            this.totalTarget = '',
            this.totalPv = '',
            this.lastPv = '',
            this.rate = '',
            this.totalUv = '',
            this.totalAmount = '',
            this.totalNum = '',
            this.spinShow = 'none'
            this.totalElement = 0
    }
    @action
        pageChange = (page) => {
            this.currentPage=page;
        };
    @action
        fetchData=(url,startDate,endDate)=>{
            //判断登陆状态
            if(_mm.loginStatus()==false){
                return;
            }
            if(startDate){
                const myDate = new Date();
                const year = myDate.getFullYear();
                const start = new Date(startDate).getTime();
                const end = new Date(endDate).getTime();
                const now6 = new Date(`${year}-06-18`).getTime();
                const now11 = new Date(`${year}-11-11`).getTime();
                if(start!=end){
                    if(now6==start||now6==end||now11==start||now11==end){
                        _mm.errorTips('618和双11只能查询单天，不能在区间当中！');
                        return;
                    }else{
                        if((now6>start&&now6<end)||(now11>start&&now11<end)){
                            _mm.errorTips('618和双11只能查询单天，不能在区间当中！');
                            return;
                        }
                    }
                }
                const date=new Date(endDate).getTime()-new Date(startDate).getTime();
                const days=Math.floor(date/(24*3600*1000));
                if(days>7){
                    _mm.errorTips("时间间隔不能大于7天");
                    return;
                }
            }
            this.loading={
                spinning:true,
                size:'large'
            };
            this.spinShow='block';
            this.currentPage=1;
            _mm.FetchUtil.init()
                .setUrl(url)
                .setHeader({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                .dofetch()
                .then((data) => {
                    this.loading={
                        spinning:false,
                        size:'large'
                    };
                    this.spinShow='none';
                    if(data.dataList==null||data.dataList.length==0){
                        _mm.errorTips('没有数据');
                        this.dataList=[];
                        this.masterTotalNum = '';
                        this.masterTotalAmount = '';
                        this.bangTotalNum = '';
                        this.bangTotalAmount = '';
                        this.totaltarget = '';
                        this.totaltq = '';
                        this.totalPrice = '';
                        this.totalReality = '';
                        this.totalTarget = '';
                        this.totalAmount = '';
                        this.totalAmounts = '';
                        this.totalNum = '';
                        this.totalPv = '';
                        this.lastPv = '';
                        this.rate = '';
                        this.totalUv = '';
                        this.totalElement = 0;
                        if(data.dataList1){
                            this.dataList1 = [];
                        }
                        if(data.evalusteLines){
                            this.evalusteLines = [];
                        }
                        if(data.invSortData){
                            this.invSortData = data.invSortData.length<=0?[{name: '无数据', value: 0}]:data.invSortData.sort(this.compare("value","desc"));
                            this.largeAreaData = data.largeAreaData.length<=0?[{name: '无数据', value: 100}]:data.largeAreaData.sort(this.compare("value","desc"));
                        }
                        if(data.areaData){
                            this.areaData = data.areaData.length<=0?[{name: '无数据', value: 100}]:data.areaData.sort(this.compare("value","desc"));
                            this.industryData = data.industryData.length<=0?[{name: '无数据', value: 0}]:data.industryData.sort(this.compare("value","desc"));
                        }
                        if(data.popGMVData){
                            this.popGMVData = data.popGMVData.length<=0?[{name: '无数据', value: 100}]:data.popGMVData.sort(this.compare("value","desc"));
                        }
                        if(data.masterData){
                            this.masterData = data.masterData.length<=0?[{name: '无数据', value: 100}]:data.masterData.sort(this.compare("value","desc"));
                        }
                    }else{
                        this.dataList = data.dataList;
                        this.masterTotalNum = data.masterTotalNum;
                        this.masterTotalAmount = data.masterTotalAmount;
                        this.bangTotalNum = data.bangTotalNum;
                        this.bangTotalAmount = data.bangTotalAmount;
                        this.totaltarget = data.totaltarget;
                        this.totaltq = data.totaltq;
                        this.totalNum = data.totalNum;
                        this.totalPrice = data.totalPrice;
                        this.totalReality = data.totalReality;
                        this.totalTarget = data.totalTarget;
                        this.totalAmount = data.totalAmount;
                        this.totalAmounts = data.totalAmounts;
                        this.totalPv = data.totalPv;
                        this.lastPv = data.lastPv;
                        this.rate = data.rate;
                        this.totalUv = data.totalUv;
                        this.totalElement = data.totalElement;
                        if(data.dataList1){
                            this.dataList1 = data.dataList1;
                        }
                        if(data.evalusteLines){
                            this.evalusteLines = data.evalusteLines;
                        }
                        if(data.invSortData){
                            this.invSortData = data.invSortData.length<=0?[{name: '无数据', value: 0}]:data.invSortData.sort(this.compare("value","desc"));
                            this.largeAreaData = data.largeAreaData.length<=0?[{name: '无数据', value: 100}]:data.largeAreaData.sort(this.compare("value","desc"));
                        }
                        if(data.areaData){
                            this.areaData = data.areaData.length<=0?[{name: '无数据', value: 100}]:data.areaData.sort(this.compare("value","desc"));
                            this.industryData = data.industryData.length<=0?[{name: '无数据', value: 0}]:data.industryData.sort(this.compare("value","desc"));
                        }
                        if(data.popGMVData){
                            this.popGMVData = data.popGMVData.length<=0?[{name: '无数据', value: 100}]:data.popGMVData.sort(this.compare("value","desc"));
                        }
                        if(data.masterData){
                            this.masterData = data.masterData.length<=0?[{name: '无数据', value: 100}]:data.masterData.sort(this.compare("value","desc"));
                        }
                    }
                })
                .catch((error) => {
                    this.loading={
                        spinning:false,
                        size:'large'
                    };
                    this.spinShow='none';
                    _mm.errorTips(error);
                });
        };
        fetchData1=(url,startDate,endDate)=>{
            //判断登陆状态
            if(_mm.loginStatus()==false){
                return;
            }
            if(startDate){
                const myDate = new Date();
                const year = myDate.getFullYear();
                const start = new Date(startDate).getTime();
                const end = new Date(endDate).getTime();
                const now6 = new Date(`${year}-06-18`).getTime();
                const now11 = new Date(`${year}-11-11`).getTime();
                if(start!=end){
                    if(now6==start||now6==end||now11==start||now11==end){
                        _mm.errorTips('618和双11只能查询单天，不能在区间当中！');
                        return;
                    }else{
                        if((now6>start&&now6<end)||(now11>start&&now11<end)){
                            _mm.errorTips('618和双11只能查询单天，不能在区间当中！');
                            return;
                        }
                    }
                }
                const date=new Date(endDate).getTime()-new Date(startDate).getTime();
                const days=Math.floor(date/(24*3600*1000));
                if(days>7){
                    _mm.errorTips("时间间隔不能大于7天");
                    return;
                }
            }
            this.spinShow='block';
            this.currentPage=1;
            _mm.FetchUtil.init()
                .setUrl(url)
                .setHeader({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                .dofetch()
                .then((data) => {
                    this.loading={
                        spinning:false,
                        size:'large'
                    };
                    this.spinShow='none';
                    this.evalusteLines=[];
                    this.evalusteLines = data.evalusteLines;
                })
                .catch((error) => {
                    this.loading={
                        spinning:false,
                        size:'large'
                    };
                    this.spinShow='none';
                    _mm.errorTips(error);
                });
        };
    @action
        fetchDataPost=(url,params)=>{
            //判断登陆状态
            if(_mm.loginStatus()==false){
                return;
            }
            this.loading={
                spinning:true,
                size:'large'
            };
            this.currentPage=1;
            _mm.FetchUtil.init()
                .setUrl(url)
                .setMethod('POST')
                .setBody(params)
                .setHeader({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }).dofetch()
                .then((data) => {
                    this.loading={
                        spinning:false,
                        size:'large'
                    };
                    if(data.dataList==null||data.dataList.length==0){
                        _mm.errorTips('没有数据');
                        this.dataList=[];
                    }else{}
                    this.dataList=data.dataList;


                })
                .catch((error) => {
                    this.loading={
                        spinning:false,
                        size:'large'
                    };
                    _mm.errorTips(error);
                });
        };
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
}