/**
 * Created by guotaidou on 2018/7/19.
 */
import React, {Component} from 'react';
import {Button,Col,Row,Table,Breadcrumb,Upload,Icon,Select,Input,DatePicker,InputNumber,Cascader} from 'antd';
import Config from "../../common/Config";
import moment from 'moment';
import Cookies from 'js-cookie';
import '../css/baseStyle.css';
import  MUtil from '../../common/util/mm';
import Alert from "../../../node_modules/antd/lib/alert";
import Popconfirm from "../../../node_modules/antd/es/popconfirm";
const _mm=new MUtil();
const { MonthPicker, RangePicker } = DatePicker;
class ConditionHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            month:_mm.getCurrentTime('month').format('YYYY-MM'),//月时间
            year: _mm.getCurrentTime('year'),//年份
            dateDay:moment(),//天的时间
            dateFormat :'YYYY-MM-DD',//日期格式
            dateDayMore: moment(),//天的时间
            week:'',//周
            startDate:moment(this.props.start)||moment().format('YYYY-MM-DD'),//开始时间
            endDate:moment(this.props.end)||moment().format('YYYY-MM-DD'),//结束时间
            currentUserId:Cookies.get('username'),//用户ID
            gmName:'',//工贸,
            rgName:'',//小微
            gridName:'',//网格
            bang:'',//京东帮
            bangReport:'',//京东帮数据类型
            exclusiveShop:'',//专卖店
            largeArea:'',//大区
            industry:'',//产业
            pinlei:'',//品类
            matnr:'',//物料编码
            invsort:'',//产品组
            jdOrderNum:'',//京东订单号
            orderType:'',//订单类型
            tgNum:0,//套购数
            orderMoney:0,//订单金额
            storeName: '',//库位名称
            days: 0,//天数
            daysLittle: 0,//小于等于天数
            fileName: "",//文件名
            status:'',//状态信息
            kuPositionCode:'',//库位编码
            passDate:'',//超期状态
            jdSku : "",//京东SKU
            pinPaiName:'',//物料名称
            brandList:[],//品牌
            brand:'',//品牌
            commentGrade:'',//评价等级
            shopName:'',//店铺名称
            orderNumber:'',//订单号
            serviceStore : "",//京东帮专卖店
            dateDayUnnessery:'',//不必须选择的天日期
            cascader:'',//级联菜单
            cascaderList:[],//级联菜单列表
            cityStatusList:[],//线级城市列表
            cityStatus:[],//线级城市值
            matnrData:'',//物料编码
            matnrList:[],//下拉物料编码列表
            matnrList1:[],//下拉物料编码列表
            gmList:[],//工贸列表
            gmData:'',//工贸数据
            regionList:[],//网格工贸
            region:'',//网格工贸数据
            largeAreaData:'',//大区数据
            largeAreaList:[],//大区列表
            city:'',//城市
            invAgingCode:'',//在途在库
            statusList:[] ,//状态列表
            stockOrderNumber:'' //备货单号
        }
    }
    componentWillMount(){
        if(this.props.cascader){
            let urlCascaderList=`${Config.REPORT_URL_PREFIX}orderPriceMaintain/findAllByIndustry?currentUserId=${this.state.currentUserId}`;
            this.fetchData(urlCascaderList,'cascaderList');
        }
        if(this.props.matnrList){
            let urlMatnrList=`${Config.REPORT_URL_PREFIX}order-store/findByUserMatCode?currentUserId=${this.state.currentUserId}&industry=&invsort=&judge=3`;
            this.fetchData(urlMatnrList,'matnrList');
        }
        if(this.props.matnrList1){
            let urlMatnrList1=`${Config.REPORT_URL_PREFIX}order-store/findByUserMatCode?currentUserId=${this.state.currentUserId}&industry=&invsort=&judge=1`;
            this.fetchData(urlMatnrList1,'matnrList1');
        }
        if(this.props.cityStatus){
            let urlcityStatus=`${Config.REPORT_URL_PREFIX}cityLevel/findAllDistinctLevel`;
            this.fetchData(urlcityStatus,'cityStatusList');
        }
        if(this.props.gmList){
            let urlGmList=`${Config.REPORT_URL_PREFIX}orderAreaGm/findByAreaGm?area=${this.state.largeAreaData}`;
            this.fetchData(urlGmList,'gmList');
        }
        if(this.props.regionList){
            let urlRegionList=`${Config.REPORT_URL_PREFIX}regionGrid/getRegionList`;
            this.fetchData(urlRegionList,'regionList');
        }
        if(this.props.brandList){
            let urlBrandList=`${Config.REPORT_URL_PREFIX}bangReport/getBrandList`;
            this.fetchData(urlBrandList,'brandList');
        }
        if(this.props.largeAreaList){
            let urlLargeAreaList=`${Config.REPORT_URL_PREFIX}orderAreaGm/findAllArea`;
            this.fetchData(urlLargeAreaList,'largeAreaList');
        }
        if (this.props.status){
            let urlStatusList=`${Config.REPORT_URL_PREFIX}choice/findChoiceStatus`;
            this.fetchData(urlStatusList,'statusList');
        }
    }
    fetchData = (url,param) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    [param]:data.dataList
                });
            })
            .catch((error) => {
            });
    };
    //选择年月函数
    dateMonth = (date,dateString) => {
        this.setState({
            month: dateString
        });
        this.props.receiveData({month:dateString});
    };
    //范围时间选择函数
    rangeDateChange = (value) => {
        let startDate=value[0].format(this.state.dateFormat);
        let endDate=value[1].format(this.state.dateFormat);
            this.setState({
                startDate:startDate,
                endDate:endDate
            });
            this.props.receiveData({startDate:startDate,endDate:endDate});
    };
    //天时间选择函数
    dateDay = value => {
        let date=value.format(this.state.dateFormat);
        this.setState({
            dateDay:date
        });
        this.props.receiveData({dateDay:date});
    };
    //页面多个日期
    //天时间选择函数
    dateDayMore =(name,value) => {
        let date = value.format(this.state.dateFormat);
        this.setState({
            dateDayMore: date
        });
        this.props.receiveData({[name]: date});
    };
    //不必须选择的天时间选择函数
    dateDayUnnessery = value => {
        if(value!=null){
            let date=value.format(this.state.dateFormat);
            this.setState({
                dateDayUnnessery:date
            });
            this.props.receiveData({dateDayUnnessery:date});
        }else{
            this.setState({
                dateDayUnnessery:''
            });
            this.props.receiveData({dateDayUnnessery:''});
        }

    };
    //输入框帮函数
    conditionChange= (e) =>{
        let value=encodeURI(e.target.value);
        if (e.target.name==="bang") {
            this.setState({
                bang:value
            });
            this.props.receiveData({bang:value});
        }else if(e.target.name==="exclusiveShop"){
            this.setState({
                exclusiveShop:value
            });
            this.props.receiveData({exclusiveShop:value});
        }else if(e.target.name==="regionName"){
            this.setState({
                gmName:value
            });
            this.props.receiveData({gmName:value});
        }else if(e.target.name==="rgName"){
            this.setState({
                rgName:value
            });
            this.props.receiveData({rgName:value});
        }else if(e.target.name==="gridName"){
            this.setState({
                gridName:value
            });
            this.props.receiveData({gridName:value});
        }else if(e.target.name==="matnr"){
            this.setState({
                jdSku:value
            });
            this.props.receiveData({matnr:value});
        } else if (e.target.name === "fileName") {
            this.setState({
                fileName: value
            });
            this.props.receiveData({fileName: value});
        }else if(e.target.name==='jdOrderNum'){
            this.setState({
                jdOrderNum:value
            });
            this.props.receiveData({jdOrderNum:value});
        }else if(e.target.name==='storeName'){
            this.setState({
                storeName:value
            });
            this.props.receiveData({storeName:value});
        }else if(e.target.name==='kuPositionCode'){
            this.setState({
                kuPositionCode:value
            });
            this.props.receiveData({kuPositionCode:value});
        }else if(e.target.name==='jdSku'){
            this.setState({
                jdSku:value
            });
            this.props.receiveData({jdSku:value});
        }else if(e.target.name==='shopName'){
            this.setState({
                shopName:value
            });
            this.props.receiveData({shopName:value});
        }else if(e.target.name==='pinPaiName'){
             this.setState({
                pinPaiName:value
            });
            this.props.receiveData({pinPaiName:value});
        }else if(e.target.name==='orderNumber'){
            this.setState({
                orderNumber:value
            });
            this.props.receiveData({orderNumber:value});
        }else if(e.target.name==='serviceStore'){
            this.setState({
                serviceStore:value
            });
            this.props.receiveData({serviceStore:value});
        }else if(e.target.name==='city'){
            this.setState({
                city:value
            });
            this.props.receiveData({city:value});
        }else if(e.target.name==='stockOrderNumber'){
            this.setState({
                stockOrderNumber:value
            });
            this.props.receiveData({stockOrderNumber:value});
        }else{
            this.setState({
                largeArea:value
            });
            this.props.receiveData({largeArea:value});
        }
    };
    //订单类型
    orderTypeChange=(value)=>{
        if (undefined === value) {
            this.setState({
                orderType:''
            });
            this.props.receiveData({orderType:''});
        } else {
            this.setState({
                orderType:value
            });
            this.props.receiveData({orderType:encodeURI(value)});
        }
    };
    //店铺类型
    shopTypeChange=(value)=>{
        if (undefined === value) {
            this.setState({
                shopType:''
            });
            this.props.receiveData({shopType:''});
        } else {
            this.setState({
                shopType:value
            });
            this.props.receiveData({shopType:encodeURI(value)});
        }
    };
    //生态
    ecologyChange=(value)=>{
        if (undefined === value) {
            this.setState({
                ecology:''
            });
            this.props.receiveData({ecology:''});
        } else {
            this.setState({
                ecology:value
            });
            this.props.receiveData({ecology:encodeURI(value)});
        }
    };
    //input框失去焦点
    blur=(e)=>{
        if(this.state.tgNum==undefined||this.state.orderMoney==undefined){
            if(e.target.name=='tgNum'){
                this.setState({
                    tgNum:'0'
                });
                this.props.receiveData({tgNum:'0'})
            } else if (e.target.name == 'days') {
                this.setState({
                    days: '0'
                });
                this.props.receiveData({days: '0'})
            } else if (e.target.name == 'daysLittle') {
                this.setState({
                    daysLittle: '0'
                });
                this.props.receiveData({daysLittle: '0'})
            }else{
                this.setState({
                    orderMoney:'0'
                });
                this.props.receiveData({orderMoney:'0'})
            }
        }
    };
    //input数字输入框改变
    onChangeNum=(name,value)=>{
        if(isNaN(value)==true && value){
            if(name=='tgNum'){
                _mm.errorTips('套购数必须为数字');
                this.setState({
                    tgNum:'0'
                });
                this.props.receiveData({tgNum:'0'})
            } else if (name == 'days') {
                _mm.errorTips('天数必须为数字');
                this.setState({
                    days: '0'
                });
                this.props.receiveData({days: '0'})
            } else if (name == 'daysLittle') {
                _mm.errorTips('天数必须为数字');
                this.setState({
                    daysLittle: '0'
                });
                this.props.receiveData({daysLittle: '0'})
            }else{
                _mm.errorTips('订单金额必须为数字');
                this.setState({
                    orderMoney:'0'
                });
                this.props.receiveData({orderMoney:'0'})
            }
        }else{
            if(name=='tgNum'){
                this.setState({
                    tgNum:value
                });
                this.props.receiveData({tgNum:value})
            } else if (name == 'days') {
                this.setState({
                    days: value
                });
                this.props.receiveData({days: value})
            } else if (name == 'daysLittle') {
                this.setState({
                    daysLittle: value
                });
                this.props.receiveData({daysLittle: value})
            }else{
                this.setState({
                    orderMoney:value
                });
                this.props.receiveData({orderMoney:value})
            }
        }
    };
    //年份选择
    yearChange = (dateString) => {
        this.setState({
            year: dateString
        });
        this.props.receiveData({year:dateString});
    };
    //下拉框选择函数
    selectChange = (status,event) =>{
        this.setState({
            [status] : event.toString()
        });
        if(status=='largeAreaData'){
            let url=`${Config.REPORT_URL_PREFIX}orderAreaGm/findByAreaGm?area=${encodeURI(event.toString())}`;
            this.fetchData(url,'gmList');
            this.selectChange('gmData','');
        }
        if(status=='industry'){
            let url=`${Config.REPORT_URL_PREFIX}order-store/findByUserMatCode?currentUserId=${this.state.currentUserId}&industry=${encodeURI(event.toString())}&judge=3`;
            this.fetchData(url,'matnrList');
            this.selectChange('matnrData','');
        }
        this.props.receiveData({[status]:encodeURI(event.toString())});
    };
    //级联菜单
    cascaderChange=(value)=>{
        let industry=value[0]||'';
        let invsort=value[1]||'';
        let price=value[2]||'';
        let url=`${Config.REPORT_URL_PREFIX}order-store/findByUserMatCode?currentUserId=${this.state.currentUserId}&industry=${industry}&invsort=${invsort}&judge=3`;
        this.fetchData(url,'matnrList');
        this.selectChange('matnrData','');
        this.props.receiveData({industry:encodeURI(industry)});
        this.props.receiveData({invsort:encodeURI(invsort)});
        this.props.receiveData({price:encodeURI(price)});
    };
    //导出函数
    exportFunc=(url)=>{
        window.location.href= url;
    };
    render() {
        let industryList=JSON.parse(localStorage.a).industryList;
        let invSortList=JSON.parse(localStorage.a).invSortList;
        const Option = Select.Option;
        const children = [];
        for (let i = 2000; i < 2050; i++) {
            children.push(<Option key={i} value={i.toString()}>{i.toString()}</Option>);
        }
        const weekChildren = [];
        for (let i = 1; i < 53; i++) {
            weekChildren.push(<Option key={i}>{i}</Option>);
        }
        return (
            <div style={this.props.style?this.props.style:{marginTop:'20px',
          borderTop:'3px solid #F0F2F5',paddingTop:'10px',paddingBottom:'20px',
          borderBottom:'3px solid #F0F2F5'}}>
                <Row type="flex">
                    {
                        this.props.month?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>选择年月：</span>
                                <MonthPicker  onChange={this.dateMonth} placeholder="请选择"
                                              defaultValue={_mm.getCurrentTime('month')} allowClear={false}/>
                                <span className='starColor'>*</span>
                            </Col>:''
                    }
                    {
                        this.props.startDate?
                        <Col xl={10} className='commonMarginTop'>
                            <span className='tagRight'>选择日期：</span>
                            <RangePicker
                                defaultValue={[this.state.startDate, this.state.endDate]}
                                format={this.state.dateFormat}
                                allowClear={false}
                                onChange={this.rangeDateChange.bind(this)}
                                />
                            <span className='starColor'>*</span>
                        </Col>:''
                    }
                    {
                        this.props.year?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>选择年份：</span>
                            <Select
                                className='commonWidth'
                                placeholder="请选择"
                                defaultValue={this.state.year}
                                onSelect={this.yearChange.bind(this)}
                                >
                                {children}
                            </Select>
                            <span className='starColor'>*</span>
                        </Col>:''
                    }
                    {
                        this.props.week?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>&#12288;到货周：</span>
                                <Select
                                    className='commonWidth'
                                    showSearch
                                    placeholder="请选择"
                                    id="week"
                                    name="week"
                                    optionFilterProp="children"
                                    onChange={this.selectChange.bind(this,'week')}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    <Option value="">全部</Option>
                                    {weekChildren}
                                </Select>
                            </Col>:''
                    }
                    {
                        this.props.dateDay?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>选择日期：</span>
                            <DatePicker defaultValue={this.state.dateDay} allowClear={false}
                                        onChange={this.dateDay}/>
                            <span className='starColor'>*</span>
                        </Col>:''
                    }
                    {
                        this.props.dateDayMore ?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>选择日期：</span>
                                <DatePicker defaultValue={this.state.dateDayMore} allowClear={false}
                                            onChange={this.dateDayMore.bind(this,this.props.dateName)}/>
                                <span className='starColor'>*</span>
                            </Col> : ''
                    }
                    {
                        this.props.dateDayUnnessery?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>选择日期：</span>
                            <DatePicker defaultValue={this.state.dateDayUnnessery} allowClear={true}
                                        onChange={this.dateDayUnnessery}/>
                        </Col>:''
                    }
                    {
                        this.props.bang?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>&#12288;京东帮：</span>
                            <Input placeholder="请输入" className='commonWidth'  id="bang" name="bang" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.exclusiveShop?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>&#12288;专卖店：</span>
                            <Input placeholder="请输入" className='commonWidth'  id="exclusiveShop" name="exclusiveShop" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.serviceStore?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>京东帮专卖店：</span>
                            <Input placeholder="请输入" className='commonWidth'  id="serviceStore" name="serviceStore" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.matnr?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>物料编码：</span>
                            <Input placeholder="请输入"  className='commonWidth' id="matnr" name="matnr"
                                   type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.gmName?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>工贸名称：</span>
                                <Input placeholder="请输入" className='commonWidth' id="regionName" name="regionName" type="text"
                                       onChange={this.conditionChange.bind(this)}/>
                            </Col>  :''
                    }
                    {
                        this.props.rgName?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>小微名称：</span>
                                <Input placeholder="请输入" className='commonWidth' id="rgName" name="rgName" type="text"
                                       onChange={this.conditionChange.bind(this)}/>
                            </Col>  :''
                    }
                    {
                        this.props.gridName?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>网格名称：</span>
                                <Input placeholder="请输入" className='commonWidth' id="gridName" name="gridName" type="text"
                                       onChange={this.conditionChange.bind(this)}/>
                            </Col>  :''
                    }
                    {
                        this.props.largeArea?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>大区名称：</span>
                            <Input placeholder="请输入" className='commonWidth'  id="largeArea" name="largeArea" type="text"
                                   onChange={this.conditionChange.bind(this)}/>

                        </Col>:''
                    }
                    {
                        this.props.shopName?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>店铺名称：</span>
                            <Input placeholder="请输入" className='commonWidth'  id="shopName" name="shopName" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.pinPaiName?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>物料名称：</span>
                            <Input placeholder="请输入" className='commonWidth'  id="pinPaiName" name="pinPaiName" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.orderNumber?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>&#12288;订单号：</span>
                            <Input placeholder="请输入" className='commonWidth' id="orderNumber" name="orderNumber" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.stockOrderNumber?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>&#12288;备货单号：</span>
                            <Input placeholder="请输入" className='commonWidth' id="stockOrderNumber" name="stockOrderNumber" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.jdOrderNum?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>京东订单号：</span>
                            <Input placeholder="请输入" className='commonWidth' id="jdOrderNum" name="jdOrderNum" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.storeName?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>库位名称：</span>
                            <Input placeholder="请输入" className='commonWidth' id="storeName" name="storeName" type="text"
                                   onChange={this.conditionChange.bind(this)}/>
                        </Col>:''
                    }
                    {
                        this.props.kuPositionCode?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>库位编码：</span>
                                <Input placeholder="请输入" className='commonWidth' id="kuPositionCode" name="kuPositionCode"
                                       type="text"
                                       onChange={this.conditionChange.bind(this)}/>
                            </Col>:''
                    }
                    {
                        this.props.jdSku?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>京东sku：</span>
                                <Input placeholder="请输入" className='commonWidth' id="jdSku" name="jdSku" type="text"
                                       onChange={this.conditionChange.bind(this)}/>
                            </Col>:''
                    }
                    {
                        this.props.fileName ?
                            <Col xl={10} className='commonMarginTop'>
                                <span className='tagRight'>文件名：</span>
                                <Input placeholder="请输入" className='commonWidth' id="fileName" name="fileName" style={{width:370}}
                                       type="text"
                                       onChange={this.conditionChange.bind(this)}/>
                                <span className='starColor'>*</span>
                            </Col> : ''
                    }
                    {
                        this.props.city?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>城市：</span>
                                <Input placeholder="请输入" className='commonWidth' id="city" name="city" type="text"
                                       onChange={this.conditionChange.bind(this)}/>
                            </Col>:''
                    }
                    {
                        this.props.cascader?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>产业信息：</span>
                                <Cascader options={this.state.cascaderList} changeOnSelect={true} onChange={this.cascaderChange} style={{width:'200px'}} expandTrigger="hover" placeholder="请选择" />
                            </Col>:''
                    }
                    {
                        this.props.status?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>状态信息：</span>
                            <Select
                                className='commonWidth'
                                showSearch
                                placeholder="请选择"
                                defaultValue=""
                                id="status"
                                name="status"
                                optionFilterProp="children"
                                onChange={this.selectChange.bind(this,'status')}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                <Option value="">全部</Option>
                                {
                                    this.state.statusList.map((data,index) =>
                                        <Option key={index} value={data} title={data}>{data}</Option>
                                    )
                                }
                                {/*<Option value="车辆已离园">车辆已离园</Option>
                                <Option value="已返单">已返单</Option>
                                <Option value="待评审">待评审</Option>
                                <Option value="到达客户">到达客户</Option>
                                <Option value="等待中心小微发货">等待中心小微发货</Option>
                                <Option value="等待发货">等待发货</Option>*/}
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.commentGrade?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>评价等级：</span>
                            <Select   className='commonWidth' defaultValue='' onChange={this.selectChange.bind(this,'commentGrade')}>
                                <Option value="">全部</Option>
                                <Option value="好评">好评</Option>
                                <Option value="中评">中评</Option>
                                <Option value="差评">差评</Option>
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.passDate?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>超期状态：</span>
                            <Select  className='commonWidth' defaultValue="" onChange={this.selectChange.bind(this,'passDate')}>
                                <Option value="">全部</Option>
                                <Option value="1">超期</Option>
                                <Option value="0">未超期</Option>
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.bangReport?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>京东帮数据类型：</span>
                            <Select  className='commonWidth' defaultValue="" onChange={this.selectChange.bind(this,'bangReport')}>
                                <Option value="">请选择</Option>
                                <Option value="1">产业</Option>
                                <Option value="2">店铺</Option>
                                <Option value="3">sku</Option>
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.orderType?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>订单类型：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                      onChange={this.orderTypeChange}>
                                <Option value="">全部</Option>
                                <Option value="1">主站</Option>
                                <Option value="2">京东帮</Option>
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.invAgingCode?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>在途在库：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                      onChange={this.selectChange.bind(this,'invAgingCode')}>
                                <Option value="">全部</Option>
                                <Option value="0">在途</Option>
                                <Option value="1">在库</Option>
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.shopType?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>店铺类型：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue="全部"
                                      onChange={this.shopTypeChange}>
                                <Option value="全部">全部</Option>
                                <Option value="京东帮">京东帮</Option>
                                <Option value="专卖店">专卖店</Option>
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.ecology?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>生态：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue="全部"
                                      onChange={this.ecologyChange}>
                                <Option value="全部">全部</Option>
                                <Option value="主站">主站</Option>
                                <Option value="京东帮">京东帮</Option>
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.industry?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>产业类别：</span>
                                <Select
                                    className='commonWidth'
                                    showSearch
                                    placeholder="请选择"
                                    defaultValue=""
                                    id="industry"
                                    name="industry"
                                    optionFilterProp="children"
                                    onChange={this.selectChange.bind(this,'industry')}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    <Option value="">全部</Option>
                                    {
                                        industryList.map((data,index) =>
                                                <Option key={index} value={data.industryName}>{data.industryName}</Option>
                                        )
                                    }
                                </Select>
                            </Col>:''
                    }
                    {
                        this.props.pinlei?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>品类：</span>
                                <Select
                                    className='commonWidth'
                                    showSearch
                                    placeholder="请选择"
                                    defaultValue=""
                                    id="pinlei"
                                    name="pinlei"
                                    optionFilterProp="children"
                                    onChange={this.selectChange.bind(this,'industry')}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    <Option value="">全部</Option>
                                    {
                                        industryList.map((data,index) =>
                                                <Option key={index} value={data.industryName}>{data.industryName}</Option>
                                        )
                                    }
                                </Select>
                            </Col>:''
                    }
                    {
                        this.props.invsort?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>&#12288;产品组：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                    onChange={this.selectChange.bind(this,'invsort')}>
                                <Option value="">全部</Option>
                                {
                                    invSortList.map((data,index) =>
                                            <Option key={index} value={data.invsortsCode}>{data.invsortsCode}-{data.invsortsName}</Option>
                                    )
                                }
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.matnrList?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>物料编码：</span>
                            <Select  className='commonWidth' placeholder="请选择"
                                     optionFilterProp="children"
                                     showSearch
                                     defaultValue=''
                                     value={this.state.matnrData}
                                     onChange={this.selectChange.bind(this,'matnrData')}
                                     filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                <Option value="">全部</Option>
                                {
                                    this.state.matnrList.map((data,index) =>
                                            <Option key={index} value={data.hrsku} title={data.skuName}>{data.hrsku}</Option>
                                    )
                                }
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.matnrList1?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>物料编码：</span>
                            <Select  className='commonWidth' placeholder="请选择"
                                     optionFilterProp="children"
                                     showSearch
                                     defaultValue=''
                                     value={this.state.matnrData}
                                     onChange={this.selectChange.bind(this,'matnrData')}
                                     filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                <Option value="">全部</Option>
                                {
                                    this.state.matnrList1.map((data,index) =>
                                            <Option key={index} value={data.hrsku} title={data.skuName}>{data.hrsku}</Option>
                                    )
                                }
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.cityStatus?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>线级城市：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                    onChange={this.selectChange.bind(this,'cityStatus')}>
                                <Option value="">全部</Option>
                                {
                                    this.state.cityStatusList.map((data,index) =>
                                            <Option key={index} value={data}>{data}</Option>
                                    )
                                }
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.largeAreaList?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>大区名称：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                    onChange={this.selectChange.bind(this,'largeAreaData')}>
                                <Option value="">全部</Option>
                                {
                                    this.state.largeAreaList.map((data,index) =>
                                            <Option key={index} value={data}>{data}</Option>
                                    )
                                }
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.matnrPv?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>PV/UV：</span>
                                <Select defaultValue="PV" className='commonWidth'
                                        onChange={this.selectChange.bind(this,'matnrPv')}>
                                    <Option value="0">PV</Option>
                                    <Option value="1">UV</Option>
                                    <Option value="2">转化率</Option>
                                    <Option value="3">客单价</Option>
                                </Select>
                            </Col>:''
                    }
                    {
                        this.props.matnrUv?
                            <Col xl={6} className='commonMarginTop'>
                                <span className='tagRight'>统计类型：</span>
                                <Select defaultValue="0" className='commonWidth'
                                        onChange={this.selectChange.bind(this,'matnrUv')}>
                                    <Option value="0">pv</Option>
                                    <Option value="1">uv</Option>
                                    <Option value="2">转化率</Option>
                                    <Option value="3">客单价</Option>
                                </Select>
                            </Col>:''
                    }
                    {
                        this.props.gmList?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>工贸名称：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                     value={this.state.gmData}
                                     onChange={this.selectChange.bind(this,'gmData')}>
                                <Option value="">全部</Option>
                                {
                                    this.state.gmList.map((data,index) =>
                                            <Option key={index} value={data}>{data}</Option>
                                    )
                                }
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.regionList?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>工贸名称：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                     onChange={this.selectChange.bind(this,'region')}>
                                <Option value="">全部</Option>
                                {
                                    this.state.regionList.map((data,index) =>
                                            <Option key={index} value={data}>{data}</Option>
                                    )
                                }
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.brandList?
                        <Col xl={6} className='commonMarginTop'>
                            <span className='tagRight'>品牌：</span>
                            <Select  className='commonWidth' placeholder="请选择" defaultValue=""
                                     onChange={this.selectChange.bind(this,'brand')}>
                                <Option value="">全部</Option>
                                {
                                    this.state.brandList.map((data,index) =>
                                            <Option key={index} value={data}>{data}</Option>
                                    )
                                }
                            </Select>
                        </Col>:''
                    }
                    {
                        this.props.tgNum?
                        <Col xl={5} className='commonMarginTop'>
                            <span className='tagRight'>套购数≥：</span>
                            <InputNumber defaultValue={this.state.tgNum} value={this.state.tgNum} className='commonWidth'
                                         min={0}  max={10000000} name='tgNum' onBlur={this.blur}
                                         onChange={this.onChangeNum.bind(this,'tgNum')} />
                            <span className='starColor'>*</span>
                        </Col>:''
                    }
                    {
                        this.props.days ?
                            <Col xl={5} className='commonMarginTop'>
                                <span className='days'>天数≥：</span>
                                <InputNumber defaultValue={this.state.days} value={this.state.days} className='commonWidth'
                                             min={0} max={10000000} name='days' onBlur={this.blur}
                                             onChange={this.onChangeNum.bind(this, 'days')}/>
                                <span className='starColor'>*</span>
                            </Col> : ''
                    }
                    {
                        this.props.daysLittle ?
                            <Col xl={5} className='commonMarginTop'>
                                <span className='daysLittle'>天数≤：</span>
                                <InputNumber defaultValue={this.state.daysLittle} value={this.state.daysLittle} className='commonWidth'
                                             min={0} max={10000000} name='daysLittle' onBlur={this.blur}
                                             onChange={this.onChangeNum.bind(this, 'daysLittle')}/>
                                <span className='starColor'>*</span>
                            </Col> : ''
                    }
                    {
                        this.props.orderMoney?
                        <Col xl={5} className='commonMarginTop'>
                            <span className='tagRight'>订单金额≥：</span><InputNumber
                            defaultValue={this.state.orderMoney}  value={this.state.orderMoney} className='commonWidth'
                            min={0} max={10000000} name='orderMoney' onBlur={this.blur}
                            onChange={this.onChangeNum.bind(this,'orderMoney')} />
                        </Col>:''
                    }
                    {
                        this.props.search?
                            <Col xl={2} className='commonMarginTop'>
                                <Button type="primary" onClick={this.props.fetch}>查询</Button>
                            </Col>:''
                    }
                    {
                        this.props.exportButton?
                            <Col xl={2} className='commonMarginTop'>
                                <Button type="primary" onClick={this.exportFunc.bind(this,this.props.exportUrl)}>导出</Button>
                            </Col>:''
                    }
                    {
                        this.props.delete ?
                            <Col xl={2} className='commonMarginTop'>
                                <Popconfirm title="是否清洗？" onConfirm={this.props.deleteFunc}>
                                    <Button type="danger">清洗</Button>
                                </Popconfirm>
                            </Col> : ''
                    }
                    {
                        this.props.fresh ?
                            <Col xl={2} className='commonMarginTop'>
                                <Popconfirm title="是否更新？" onConfirm={this.props.freshFunc.bind(this,this.props.freshType)}>
                                    <Button type="danger">更新</Button>
                                </Popconfirm>
                            </Col> : ''
                    }
                    {
                        this.props.downLoad?
                            <Col xl={2} className='commonMarginTop'>
                                <Button   type="primary" icon="download" onClick={_mm.downLoad.bind(this,this.props.downLoadUrl,this.props.start,this.props.end)}>下载</Button>
                            </Col>:''
                    }
                    {
                        React.Children.map(this.props.children, function (child,index) {
                            return <Col xxl={2} className='commonMarginTop' key={index}>{child}</Col>;
                        })
                    }
                    {
                        this.props.alert ?
                            <Col xl={6} className='commonMarginTop'>
                                <Alert message={this.props.alertMessage} type="info"/>
                            </Col> : ''
                    }
                </Row>
            </div>
        );
    }
}
export default ConditionHeader;