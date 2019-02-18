import React, {Component} from 'react';
import {Button, Col, Row, DatePicker, Table, Input, Select,Breadcrumb} from 'antd';
import {inject, observer} from "mobx-react/index";
import Bread from '../../common/Bread';
import BangReportStore from "../../stores/shop/BangReportStore";
import '../../common/css/baseStyle.css';
import  MUtil from '../../common/util/mm';
const _mm=new MUtil();
const { RangePicker } = DatePicker;
@inject('store')
@observer
class BangReport extends Component {

    constructor(props) {
        super(props);
        props.store.bangReportStore = new BangReportStore();

        this.store = props.store.bangReportStore;
        this._selectChange = this.store.selectChange;
        this._onChange = this.store.onChange;
        this._fetchByWeekOrMonth = this.store.fetchByWeekOrMonth;
        this._fetchByDay = this.store.fetchByDay;
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        };
    }
    componentWillMount(){
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
    }
    render() {
        const dateFormat = 'YYYY-MM';
        return <div className='allBorder'>
            <Bread></Bread>
            <Row style={{marginTop:'40px', borderTop:'3px solid #F0F2F5'
            ,paddingTop:'40px'}} className='rowStyle'>

                <Col xl={4} className='colStyle'>
                    <div>
                        <RangePicker  onChange={this._onChange.bind(this,'1')}/>
                    </div>
                </Col>
                <Col xl={4} className='colStyle'>
                    <Button onClick={this._fetchByDay.bind(this,'reportInvSort')}>按天统计产业</Button>
                </Col>
                <Col xl={4} className='colStyle'>
                    <Button onClick={this._fetchByDay.bind(this,'reportShop')}>按天统计店铺</Button>
                </Col>
                <Col xl={4} className='colStyle'>
                    <Button onClick={this._fetchByDay.bind(this,'reportSku')}>按天统计Sku</Button>
                </Col>
                <Col xl={4} className='colStyle'>
                    <Button onClick={this._fetchByDay.bind(this,'reportAllByDay')}>按天统计全部</Button>
                </Col>
            </Row>
            <Row className='rowStyle' style={{marginTop:'20px'}}>
                <Col xl={4} className='colStyle'>
                    <div>
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="统计维度"
                            optionFilterProp="children"
                            onChange={this._selectChange.bind(this,'reportType')}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <option value="2">产业&nbsp;</option>
                            <option value="3">店铺&nbsp;</option>
                            <option value="5">sku&nbsp;</option>
                            <option value="6">全部&nbsp;</option>
                        </Select>
                    </div>

                </Col>
                <Col xl={4} className='colStyle'>
                    <div>
                        <RangePicker
                            onChange={this._onChange.bind(this,'2')}
                            format={dateFormat}
                        />
                    </div>
                </Col>
                <Col xl={2} className='colStyle'>
                    <Button onClick={this._fetchByWeekOrMonth.bind(this,"shopDataMode")}>统计实时数据</Button>
                </Col>
            </Row>
        </div>;
    }
}

BangReport.propTypes = {};

export default BangReport;
