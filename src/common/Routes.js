import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Welcome from '../components/Welcome';
import OrderByMonth from '../components/storeOrder/OrderByMonth';
import OrderByDay from '../components/storeOrder/OrderByDay';
import OrderNum from '../components/storeOrder/OrderNum';
import StepsComponent from '../components/storeOrder/StepsComponent';
import LesArea from '../components/storeOrder/LesArea';
import LesCity from '../components/storeOrder/LesCity';
import LesTop from '../components/storeOrder/LesTop';
import PriceMaintain from '../components/storeOrder/PriceMaintain';
import ShopData from '../components/shop/ShopData';
import BangReport from '../components/shop/BangReport';
import TargetRunView from '../components/shop/TargetRunView';
import BangExcel from '../components/shop/BangExcel';
import BangView from "../components/shop/BangView";
import ServiceShop from "../components/shop/ServiceShop";
import BangTarget from "../components/shop/BangTarget";
import IndustrySale from "../components/shop/IndustrySale";
import ChannelDown from "../components/shop/ChannelDown";
import OrderChoice from "../components/storeOrder/OrderChoice";
import StockPrediction from "../components/storeOrder/StockPrediction";
import XWSum from "../components/storeOrder/XWSum";
import DailyAnalysis from "../components/storeOrder/DailyAnalysis";
import InSaleTable from "../components/inSale/InSaleTable";
import JAge from "../components/inSale/JAge";
import JDetail from "../components/inSale/JDetail";
import SpotrateMaintain from "../components/inSale/SpotrateMaintain";
import JDstoreList from "../components/shop/JDstoreList";
import TotalOutStore from "../components/storeOrder/TotalOutStore";
import ListExport from "../components/storeOrder/ListExport";
import LesTarget from "../components/storeOrder/LesTarget";
import RoleSetting from "../components/user/RoleSetting";
import menuManage from "../components/user/menuManage";
import IndustrySetting from "../components/user/IndustrySetting";
import InvsortsSetting from "../components/user/InvsortsSetting";
import UserSetting from "../components/user/UserSetting";
import MasterExcel from "../components/master/MasterExcel";
import JDindustry from "../components/master/JDindustry";
import PvView from "../components/master/PvView";
import MaterialPv from "../components/master/MaterialPv";
import MasterStatistic from "../components/master/MasterStatistic";
import MatnrPv from "../components/master/MatnrPv";
import MasterDetail from "../components/master/MasterDetail";
import WLPV from "../components/master/WLPV";
import POPExcel from "../components/pop/POPExcel";
import POPMaintain from "../components/pop/POPMaintain";
import OfficialBrandPOP from "../components/pop/OfficialBrandPOP";
import IndustryGvmStatistic from "../components/pop/IndustryGvmStatistic";
import EnterRate from "../components/shop/EnterRate";
import SaleStatistic from "../components/shop/SaleStatistic";
import HrEvaluate from "../components/custService/HrEvaluate";
import EvaluateStatics from "../components/custService/EvaluateStatics";
import BackHandle from "../components/management/BackHandle";
import Tasks from "../components/management/Tasks";
import RegionGrid from "../components/shop/RegionGrid";
import TotalPage from "../components/totalPage/TotalPage";
import GridStore from "../components/shop/GridStore";
// import Statistics from "../components/totalPage/Statistics";

const Routes = () => (
    <Switch>
        <Route path="/" exact component={Welcome}/>

        <Route path="/totalPage/TotalPage" component={TotalPage}/>
        {/*<Route path="/totalPage/Statistics" component={Statistics}/>*/}
        <Route path="/orderStore/byMonth" component={OrderByMonth}/>
        <Route path="/orderStore/byDay" component={OrderByDay}/>
        <Route path="/orderStore/OrderNum" component={OrderNum}/>
        <Route path="/orderStore/LesTarget" component={LesTarget}/>
        <Route path="/orderStore/StepsComponent" component={StepsComponent}/>
        <Route path="/orderStore/LesArea" component={LesArea}/>
        <Route path="/orderStore/LesCity" component={LesCity}/>
        <Route path="/orderStore/LesTop" component={LesTop}/>
        <Route path="/orderStore/PriceMaintain" component={PriceMaintain}/>
        <Route path="/orderStore/XWSum" component={XWSum}/>
        <Route path="/orderStore/DailyAnalysis" component={DailyAnalysis}/>
        <Route path="/shop/ShopData" component={ShopData}/>
        <Route path="/shop/BangReport" component={BangReport}/>
        <Route path="/shop/BangExcel" component={BangExcel}/>
        <Route path="/shop/BangView" component={BangView}/>
        <Route path="/shop/ServiceShop" component={ServiceShop}/>
        <Route path="/shop/BangTarget" component={BangTarget}/>
        <Route path="/shop/IndustrySale" component={IndustrySale}/>
        <Route path="/shop/TargetRunView" component={TargetRunView}/>
        <Route path="/shop/ChannelDown" component={ChannelDown}/>
        <Route path="/shop/RegionGrid" component={RegionGrid}/>
        <Route path="/shop/JDstoreList" component={JDstoreList}/>
        <Route path="/shop/GridStore" component={GridStore}/>
        <Route path="/orderStore/OrderChoice" component={OrderChoice}/>
        <Route path="/orderStore/StockPrediction" component={StockPrediction}/>
        <Route path="/inSale/InSaleTable" component={InSaleTable}/>
        <Route path="/inSale/JAge" component={JAge}/>
        <Route path="/inSale/JDetail" component={JDetail}/>
        <Route path="/inSale/SpotrateMaintain" component={SpotrateMaintain}/>
        <Route path="/orderStore/TotalOutStore" component={TotalOutStore}/>
        <Route path="/orderStore/ListExport" component={ListExport}/>
        <Route path="/user/RoleSetting" component={RoleSetting}/>
        <Route path="/user/menuManage" component={menuManage}/>
        <Route path="/user/IndustrySetting" component={IndustrySetting}/>
        <Route path="/user/InvsortsSetting" component={InvsortsSetting}/>
        <Route path="/user/UserSetting" component={UserSetting}/>
        <Route path="/master/MasterExcel" component={MasterExcel} />
        <Route path="/master/PvView" component={PvView} />
        <Route path="/master/MaterialPv" component={MaterialPv} />
        <Route path="/master/MasterStatistic" component={MasterStatistic} />
        <Route path="/master/MatnrPv" component={MatnrPv} />
        <Route path="/master/MasterDetail" component={MasterDetail} />
        <Route path="/master/JDindustry" component={JDindustry} />
        <Route path="/master/WLPV" component={WLPV} />
        <Route path="/pop/POPExcel" component={POPExcel}/>
        <Route path="/pop/POPMaintain" component={POPMaintain}/>
        <Route path="/pop/IndustryGvmStatistic" component={IndustryGvmStatistic}/>
        <Route path="/pop/OfficialBrandPOP" component={OfficialBrandPOP}/>
        <Route path="/shop/EnterRate" component={EnterRate}/>
        <Route path="/shop/SaleStatistic" component={SaleStatistic}/>
        <Route path="/customerService/HrEvaluate" component={HrEvaluate}/>
        <Route path="/customerService/EvaluateStatics" component={EvaluateStatics}/>
        <Route path="/management/BackHandle" component={BackHandle}/>
        <Route path="/management/Tasks" component={Tasks}/>
        <Route render={() => <h1>找不到此页面</h1>}/>
    </Switch>
);
export default Routes;
