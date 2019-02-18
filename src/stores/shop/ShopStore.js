import {computed, observable, action} from 'mobx';
import moment from 'moment';
import Cookies from 'js-cookie';
import Config from '../../common/Config';
import  MUtil from '../../common/util/mm';

const _mm=new MUtil();
export default class ShopStore {
    dateFormat = 'YYYY-MM-DD';

    @observable startDate='';
    @observable endDate='';
    @observable totalNum='';
    @observable totalAmount='';
    @observable shopSalesList=[];
    @observable bang='';
    @observable exclusiveShop='';
    @observable regionName='';
    @observable industry='';
    @observable largeArea='';
    @observable loading='';
    @observable currentUserId='';
    @observable jdOrderNo='';

    constructor() {
        this.startDate='';
        this.endDate='';
        this.totalNum='';
        this.totalAmount='';
        this.shopSalesList=[];
        this.bang='';
        this.exclusiveShop='';
        this.regionName='';
        this.industry='';
        this.largeArea='';
        this.jdOrderNo='';
        this.currentUserId=Cookies.get('username');
        this.loading= {
            spinning:false,
            size:'large'
        };
    }

    @action
    dateChange = value => {
        if(value.length!=0){
                this.startDate=value[0].format(this.dateFormat);
                this.endDate=value[1].format(this.dateFormat);
        }else{
                this.startDate='';
                this.endDate='';
        }
    };
    @action
    selectChange= (industry,event) =>{
        this.industry=encodeURI(industry.toString());
    };
    @action
    conditionChange= (e) =>{
        if (e.target.name==="bang") {
            this.bang=encodeURI(e.target.value);
        }else if(e.target.name==="exclusiveShop"){
            this.exclusiveShop=encodeURI(e.target.value);
        }else if(e.target.name==="regionName"){
            this.regionName=encodeURI(e.target.value);
        }else if(e.target.name==="jdOrderNo"){
            this.jdOrderNo=encodeURI(e.target.value);
        }else{
            this.largeArea=encodeURI(e.target.value);
        }
    };
    @action
    fetchOrders = () => {
        if(_mm.loginStatus()==false){
            return;
        }
        const currentUserId= Cookies.get('username');
        if(this.startDate===''||this.startDate==undefined){
            _mm.errorTips("时间不能为空");
            return;
        }
        const date=new Date(this.endDate).getTime()-new Date(this.startDate).getTime();
        const days=Math.floor(date/(24*3600*1000));
        if(days>7){
            _mm.errorTips("时间间隔不能大于7天");
            return;
        }
        this.loading= {
            spinning:true,
            size:'large'
        };
        let api =`${Config.REPORT_URL_PREFIX}shop/shopList?currentUserId=${currentUserId}&start=${this.startDate}&end=${this.endDate}`;
        if (this.bang !== '' && this.bang !== undefined) {
            api += `&bang=${this.bang}`;
        }
        if (this.exclusiveShop !== '' && this.exclusiveShop !== undefined) {
            api += `&exclusiveShop=${this.exclusiveShop}`;
        }
        if (this.regionName !== '' && this.regionName !== undefined) {
            api += `&regionName=${this.regionName}`;
        }
        if (this.industry !== '' && this.industry !== undefined) {
            api += `&industry=${this.industry}`;
        }
        if (this.largeArea !== '' && this.largeArea !== undefined) {
            api += `&largeArea=${this.largeArea}`;
        }
        if (this.jdOrderNo !== '' && this.jdOrderNo !== undefined) {
            api += `&jdOrderNo=${this.jdOrderNo}`;
        }
        _mm.FetchUtil.init()
            .setUrl(api)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((orders) => {
                this.loading= {
                    spinning:false,
                    size:'large'
                };
                if(orders.shopSalesList.length==0){
                    _mm.errorTips('没有数据');
                    this.shopSalesList=orders.shopSalesList;
                    this.totalNum =orders.totalNum;
                    this.totalAmount= orders.totalAmount;
                }else{
                    this.shopSalesList=orders.shopSalesList;
                    this.totalNum =orders.totalNum;
                    this.totalAmount= orders.totalAmount;
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
    downUrl =() => {
        if(_mm.loginStatus()==false){
            return;
        }
        const currentUserId= Cookies.get('username');
        if(this.startDate===''||this.startDate==undefined){
            _mm.errorTips("时间不能为空");
            return;
        }
        const date=new Date(this.endDate).getTime()-new Date(this.startDate).getTime();
        const days=Math.floor(date/(24*3600*1000));
        if(days>7){
            _mm.errorTips("时间间隔不能大于7天");
            return;
        }
        window.location.href= `${Config.REPORT_URL_PREFIX}shop/excel?currentUserId=${currentUserId}&start=${this.startDate}&end=${this.endDate}`
              +`&bang=${this.bang}&bang=${this.exclusiveShop}&regionName=${this.regionName}&industry=${this.industry}`
             +`&largeArea=${this.largeArea}`;
    }
}