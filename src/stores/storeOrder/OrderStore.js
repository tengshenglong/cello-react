import {computed, observable, action} from 'mobx';
import moment from 'moment';
import Cookies from 'js-cookie';
import Config from '../../common/Config';
import  MUtil from '../../common/util/mm';
const _mm=new MUtil();

export default class OrderStore {

  @observable month;
  @observable startDate;
  @observable endDate;
  @observable invsorts;
  @observable invsort;
  @observable storeOrders;
  @observable loading='';
  @observable masterTotalNum='';
  @observable masterTotalAmount='';
  @observable bangTotalNum='';
  @observable bangTotalAmount='';
  @observable orderTypes;
  @observable orderType;
  @observable mantr;




  constructor() {
      this.dateFormat = 'YYYY-MM-DD';
      this.monthFormat = 'YYYY-MM';
      this.totalNum = '';
      this.totalAmount = '';

      this.invsorts = []; //产品组
      this.orderTypes = ['主站', '京东帮'];
      this.orderType = '';
      this.invsort = '';
      this.mantr = '';
      this.startDate = moment(moment() - 24*60*60*1000).format("YYYY-MM-DD");
      this.endDate = moment(moment() - 24*60*60*1000).format("YYYY-MM-DD");
      this.storeOrders = [];

      this.month = moment().format(this.monthFormat);
      this.loading = {
          spinning: false,
          size: 'large'
      };
  }
    @action
   downUrlByMonth= () => {
      if(_mm.loginStatus()==false){
          return;
      }
       const currentUserId= Cookies.get('username');
       window.location.href= `${Config.REPORT_URL_PREFIX}order-store/export/byMonth?currentUserId=${currentUserId}&month=${this.month}&invsort=${this.invsort}`;
  };

  @action
  downUrlByDay = ()=> {
      if(_mm.loginStatus()==false){
          return;
      }
      const currentUserId= Cookies.get('username');
      window.location.href= `${Config.REPORT_URL_PREFIX}order-store/export/byDay?currentUserId=${currentUserId}&start=${this.startDate}&end=${this.endDate}&invsort=${this.invsort}`;
  };

  @action
  fetchOrdersByMonth = () => {
      if(_mm.loginStatus()==false){
          return;
      }
      const currentUserId= Cookies.get('username');
      let api = `${Config.REPORT_URL_PREFIX}order-store/byMonth?currentUserId=${currentUserId}&month=${this.month}`;
      //let api = `http://10.153.176.20:8080/report/order-store/byMonth?currentUserId=${currentUserId}&month=${this.month}`;
    if (this.invsort !== '' && this.invsort !== undefined) {
      api += `&invsort=${this.invsort}`;
    }
    //if (this.orderType !== '' && this.orderType !== undefined) {
    //  api += `&orderType=${this.orderType}`;
    //}
      if (this.mantr !== '' && this.mantr !== undefined) {
          api += `&mantr=${this.mantr}`;
      }
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
        .then((orders) => {
            this.loading= {
                spinning:false,
                size:'large'
            };
          if(orders.orderStoreList.length==0){
            _mm.errorTips('没有数据');
            this.storeOrders = orders.orderStoreList;
              this.masterTotalNum=orders.masterTotalNum;
              this.masterTotalAmount=orders.masterTotalAmount;
              this.bangTotalNum=orders.bangTotalNum;
              this.bangTotalAmount=orders.bangTotalAmount;
          }else{
            this.storeOrders = orders.orderStoreList;
              this.masterTotalNum=orders.masterTotalNum;
              this.masterTotalAmount=orders.masterTotalAmount;
              this.bangTotalNum=orders.bangTotalNum;
              this.bangTotalAmount=orders.bangTotalAmount;
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
  fetchOrdersByDay = () => {
      if(_mm.loginStatus()==false){
          return;
      };
      const currentUserId= Cookies.get('username');
      let api = `${Config.REPORT_URL_PREFIX}order-store/byDay?currentUserId=${currentUserId}&start=${this.startDate}&end=${this.endDate}`;
      //let api = `http://10.153.176.20:8080/report/order-store/byDay?currentUserId=${currentUserId}&start=${this.startDate}&end=${this.endDate}`;
    if (this.invsort !== '' && this.invsort !== undefined) {
      api += `&invsort=${this.invsort}`;
    }
      //if (this.orderType !== '' && this.orderType !== undefined) {
      //    api += `&orderType=${this.orderType}`;
      //}
      if (this.mantr !== '' && this.mantr !== undefined) {
          api += `&mantr=${this.mantr}`;
      }
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
        .then((orders) => {
            this.loading= {
                spinning:false,
                size:'large'
            };
            if(orders.orderStoreList.length==0){
                _mm.errorTips('没有数据');
                this.storeOrders = orders.orderStoreList;
                this.masterTotalNum=orders.masterTotalNum;
                this.masterTotalAmount=orders.masterTotalAmount;
                this.bangTotalNum=orders.bangTotalNum;
                this.bangTotalAmount=orders.bangTotalAmount;
            }else{
                this.storeOrders = orders.orderStoreList;
                this.masterTotalNum=orders.masterTotalNum;
                this.masterTotalAmount=orders.masterTotalAmount;
                this.bangTotalNum=orders.bangTotalNum;
                this.bangTotalAmount=orders.bangTotalAmount;
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
  fetchCusts = () => {
      let invSortList=JSON.parse(localStorage.a).invSortList;
      this.invsorts = invSortList;
  };

  @action
  dateClick = value => {
    this.startDate = value.format(this.dateFormat);
    this.endDate = value.format(this.dateFormat);
  };

  @action
  monthChange = value => {
    this.month = value.format(this.monthFormat);
  };

  @action
  invSortChange = (value) => {
    if (undefined === value) {
      this.invsort = '';
    } else {
      this.invsort = value;
    }
  };
    @action
        orderTypeChange = (value) => {
            if (undefined === value) {
                this.orderType = '';
            } else {
                this.orderType = value;
            }
        };
    @action
        conditionChange= (e) =>{
                this.mantr=encodeURI(e.target.value);
        };
}