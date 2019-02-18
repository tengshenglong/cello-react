import WelcomeStore from './WelcomeStore';
import OrderStore from './storeOrder/OrderStore';
import ShopStore from './shop/ShopStore';
import BangExcelStore from "./shop/BangExcelStore";
import BangReportStore from "./shop/BangReportStore";
import BangViewStore from "./shop/BangViewStore";
import commonStore from "./commonStore/commonStore";

class Store {
  constructor() {
    this.welcomeStore = new WelcomeStore();
    this.orderStore = new OrderStore();
    this.shopStore = new ShopStore();
    this.bangExcelStore = new BangExcelStore();
    this.bangReportStore = new BangReportStore();
    this.bangViewStore = new BangViewStore();
    this.commonStore=new commonStore();
  }
}

const stores = new Store();
export default stores;
