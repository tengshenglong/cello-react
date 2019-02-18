import React, {Component} from 'react';
import moment from 'moment';
import Cookies from "js-cookie";
import '../../common/css/baseStyle.css';
import {Button,Col,Row,DatePicker,Table,message,Pagination,Upload,Icon,Breadcrumb,Select,Input,Card,Alert,Divider,Popconfirm} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
const _mm = new MUtil();

class BackHandle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            data: [],
            dateFormat: 'YYYY-MM-DD',
            addable: false,
            loading: {
                spinning: false,
                size: 'large'
            },
            dateDay1: moment().format('YYYY-MM-DD'),//开始时间
            dateMonth: moment().format('YYYY-MM'),//开始时间
            month:moment().format('YYYY-MM'),//开始时间
            dateDay3: moment().format('YYYY-MM-DD'),//开始时间
            dateDay5: moment().format('YYYY-MM-DD'),
            dateDay6: moment().format('YYYY-MM-DD'),
            fileName: '',//文件名
            days: 0, //天数
            daysLittle: 0,//小于等于的天数
            bangReport:''
        };
    }

    //获取查询条件数据
    receiveData = (data) => {
        this.setState(data)
    };

    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
    }
    deleteFunc = () => {
        if (this.state.daysLittle == 0){
            _mm.errorTips("请选择天数!")
        }else {
            let findAlUser = `${Config.REPORT_URL_PREFIX}taskController/task?type=2&name=queryDate,days&value=${this.state.dateDay1},${this.state.daysLittle}`;
            _mm.FetchUtil.init()
                .setUrl(findAlUser)
                .setHeader({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }).dofetch()
                .then((data) => {
                    this.setState({
                        visible: false,
                        data: ''
                    });
                    if (data.flag) {
                        message.success(data.message);
                    } else {
                        message.error(data.message);
                    }
                })
        }
    };
    freshFunc = (freshType) => {
        let findAlUser;
        if (freshType == 1) {
            findAlUser = `${Config.REPORT_URL_PREFIX}taskController/task?type=3&name=month&value=${this.state.month}`
        } else if (freshType == 2) {
            findAlUser = `${Config.REPORT_URL_PREFIX}taskController/task?type=4&name=dataTime&value=${this.state.dateDay3}`
        } else if (freshType == 3) {
            // if (this.state.fileName == '') {
            //     _mm.errorTips("文件名不能为空！");
            //     return
            // }
            findAlUser = `${Config.REPORT_URL_PREFIX}taskController/task?type=1&name=fileName&value=${this.state.fileName}`
        } else if(freshType == 4) {
            if(this.state.bangReport==0){
                _mm.errorTips("请选择数据类型");
                return
            }
            findAlUser = `${Config.REPORT_URL_PREFIX}taskController/task?type=5&name=mouth,bangReport&value=${this.state.month},${this.state.bangReport}`

        } else if(freshType == 5){

            findAlUser = `${Config.REPORT_URL_PREFIX}taskController/task?type=6&name=dataTime&value=${this.state.dateDay5}`
        }else if(freshType == 6){
            findAlUser = `${Config.REPORT_URL_PREFIX}edwPrice/findEdwAndSave?dateTiem=${this.state.dateDay6}`
        }
        // findAlUser = freshType == 1 ? `${Config.REPORT_URL_PREFIX}ChannelDown/manual/Update?dataTime=${this.state.dateDay}` :
        //     `${Config.REPORT_URL_PREFIX}regionTarget/manual/update?dataTime=${this.state.dateDay}`;
        this.freshFetch(findAlUser);
    };
    freshFetch = (url) => {
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }).dofetch()
            .then((data) => {
                this.setState({
                    visible: false,
                    data: ''
                });
                if (data.flag) {
                    message.success(data.message);
                } else {
                    message.error(data.message);
                }
            })
    };

    render() {
        // //下载地址
        // let downloadUrl = `${Config.REPORT_URL_PREFIX}shop/ftp/Down?fileName=${this.state.fileName}`;
        let deleteUrl=`${Config.REPORT_URL_PREFIX}redis/delAll`;
        let updateUrl=`${Config.REPORT_URL_PREFIX}taskController/task?type=7&name=&value=`;
        return <div className='allBorder'>
            <Bread></Bread>
            <br/>
            <span style={{
                marginLeft: '40%', lineHeight: '1.4rem',
                fontSize: '1.2rem',
                color: '#272727',
                marginTop: '50px',
                paddingBottom: '20px'
            }}>京东帮</span>
            <br/>
            <ConditionHeader
                style={{
                    marginTop: '20px',
                    borderTop: '3px solid #F0F2F5', paddingTop: '10px', paddingBottom: '10px',
                    borderBottom: '0px solid #F0F2F5'
                }}
                fresh='true'
                fileName='true'
                // downLoadUrl={downloadUrl}//下载地址
                freshFunc={this.freshFunc}
                freshType='3'
                alert='true'
                alertMessage='京东帮销售数据下载'
                receiveData={this.receiveData}>
            </ConditionHeader>
            <ConditionHeader
                style={{
                    marginTop: '10px',
                    borderTop: '0px solid #F0F2F5', paddingTop: '10px', paddingBottom: '10px',
                    borderBottom: '0px solid #F0F2F5'
                }}
                month='true'
                freshFunc={this.freshFunc}
                freshType='4'
                alert='true'
                bangReport='true'
                alertMessage='按月统计京东帮数据'
                fresh='true'
                receiveData={this.receiveData}>
            </ConditionHeader>
            <ConditionHeader
                style={{
                    marginTop: '10px',
                    borderTop: '0px solid #F0F2F5', paddingTop: '10px', paddingBottom: '10px',
                    borderBottom: '0px solid #F0F2F5'
                }}
                month='true'
                freshFunc={this.freshFunc}
                freshType='1'
                alert='true'
                alertMessage='按月更新专卖店实际数量'
                fresh='true'
                receiveData={this.receiveData}>
            </ConditionHeader>
            <ConditionHeader
                style={{
                    marginTop: '10px',
                    borderTop: '0px solid #F0F2F5', paddingTop: '10px', paddingBottom: '10px',
                    borderBottom: '0px solid #F0F2F5'
                }}
                dateDayMore='true'
                dateName='dateDay5'
                freshFunc={this.freshFunc}
                freshType='5'
                alert='true'
                alertMessage='按天更新专卖店实际数量'
                fresh='true'
                receiveData={this.receiveData}>
            </ConditionHeader>
            <ConditionHeader
                style={{
                    marginTop: '10px',
                    borderTop: '0px solid #F0F2F5', paddingTop: '10px', paddingBottom: '20px',
                    borderBottom: '3px solid #F0F2F5'
                }}
                dateDayMore='true'
                dateName='dateDay3'
                freshFunc={this.freshFunc}
                freshType='2'
                alert='true'
                alertMessage='网格进入率手动更新数据'
                fresh='true'
                receiveData={this.receiveData}>
            </ConditionHeader>
            <br/>
            <span style={{
                marginLeft: '40%', lineHeight: '1.4rem',
                fontSize: '1.2rem',
                color: '#272727',
                marginTop: '20px',
                paddingBottom: '20px'
            }}>LES出库数据</span>
            <br/>
            <ConditionHeader
                style={{
                    marginTop: '20px',
                    borderTop: '3px solid #F0F2F5', paddingTop: '10px', paddingBottom: '20px',
                    borderBottom: '3px solid #F0F2F5'
                }}
                dateDayMore='true'
                dateName='dateDay1'
                daysLittle='true'
                deleteFunc={this.deleteFunc}
                alert='true'
                alertMessage='LES出库数据清洗,从所选日期开始(包括)往后计算所选天数的数据'
                delete='true'
                receiveData={this.receiveData}>
            </ConditionHeader>
            <br/>
            <span style={{
                marginLeft: '40%', lineHeight: '1.4rem',
                fontSize: '1.2rem',
                color: '#272727',
                marginTop: '50px',
                paddingBottom: '20px'
            }}>缓存</span>
            <br/>
            <div style={{marginTop: '20px',
                    borderTop: '3px solid #F0F2F5', paddingTop: '10px', paddingBottom: '20px',
                    borderBottom: '3px solid #F0F2F5'}}>
                <Row type='flex'>
                    <Col xl={2} className='commonMarginTop'>
                        <Button type="primary" onClick={this.freshFetch.bind(this, deleteUrl)}>清除缓存</Button>
                    </Col>
                    <Col xl={6} className='commonMarginTop'>
                        <Alert message='清除缓存' type="info"/>
                    </Col>
                </Row>
            </div>
            <br/>
            <span style={{
                marginLeft: '40%', lineHeight: '1.4rem',
                fontSize: '1.2rem',
                color: '#272727',
                marginTop: '50px',
                paddingBottom: '20px'
            }}>进销存数据更新</span>
            <br/>
            <div style={{marginTop: '20px',
                borderTop: '3px solid #F0F2F5', paddingTop: '10px', paddingBottom: '20px',
                borderBottom: '3px solid #F0F2F5'}}>
                <Row type='flex'>
                    <Col xl={2} className='commonMarginTop'>
                        <Button type="primary" onClick={this.freshFetch.bind(this, updateUrl)}>更新</Button>
                    </Col>
                    <Col xl={6} className='commonMarginTop'>
                        <Alert message='进销存数据更新' type="info"/>
                    </Col>
                </Row>
            </div>
            <br/>
            <span style={{
                marginLeft: '40%', lineHeight: '1.4rem',
                fontSize: '1.2rem',
                color: '#272727',
                marginTop: '50px',
                paddingBottom: '20px'
            }}>EDW价格下载</span>
            <br/>
            <div style={{marginTop: '20px',
                borderTop: '3px solid #F0F2F5', paddingTop: '10px', paddingBottom: '20px',
                borderBottom: '3px solid #F0F2F5'}}>
            <ConditionHeader
                style={{
                    marginTop: '10px',
                    borderTop: '0px solid #F0F2F5', paddingTop: '10px', paddingBottom: '10px',
                    borderBottom: '0px solid #F0F2F5'
                }}
                dateDayMore='true'
                dateName='dateDay6'
                freshFunc={this.freshFunc}
                freshType='6'
                alert='true'
                alertMessage='按天下载EDW价格数据;SHOP_SALES_DATA数据为T-1的物料'
                fresh='true'
                receiveData={this.receiveData}>
            </ConditionHeader>
            </div>
        </div>;
    }
}

BackHandle.propTypes = {};

export default BackHandle;
