import React, {Component} from 'react';
import {Button, Col, Row, DatePicker, Table, Input, Select,Breadcrumb} from 'antd';
import {inject, observer} from "mobx-react/index";
import Bread from '../../common/Bread';
import BangExcelStore from "../../stores/shop/BangExcelStore";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import '../../common/css/baseStyle.css';
import  MUtil from '../../common/util/mm';
const _mm=new MUtil();
@inject('store')
@observer
class BangExcel extends Component {


    constructor(props) {
        super(props);

        props.store.bangExcelStore = new BangExcelStore();

        this.store = props.store.bangExcelStore;
        this._download = this.store.download;
        this._onChange = this.store.onChange;
    }
    componentWillMount(){
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
    }
    render() {
        return <div className='allBorder'>
            <Bread></Bread>
            <Row className='rowStyle' style={{marginTop:'20px',
          borderTop:'3px solid #F0F2F5',paddingTop:'40px'}}>

                <Col xl={4} className='colStyle'>
                    <div>
                        <span style={{color:'red'}}>✳</span>  <DatePicker  onChange={this._onChange.bind(this,"1")} />
                    </div>

                </Col>
                <Col xl={2} className='colStyle'>
                    <Button onClick={this._download} type="primary" icon="download">
                        按天导出
                    </Button>
                </Col>
            </Row>
            <Row className='rowStyle' style={{marginTop:'20px'}}>

                <Col xl={8} className='colStyle'>
                    <div>
                        <span style={{color:'red'}}>✳</span>
                        <RangePicker
                            allowClear={false}
                            onChange={this._onChange.bind(this,"2")}
                        />
                    </div>
                </Col>
                <Col xl={2} className='colStyle'>
                    <Button onClick={this._download} type="primary" icon="download">
                        按时间段下载
                    </Button>
                </Col>
            </Row>
            <Row className='rowStyle' style={{marginTop:'20px'}}>
                <Col xl={4} className='colStyle'>
                    <div>
                        <span style={{color:'red'}}>✳</span> <MonthPicker   onChange={this._onChange.bind(this,"3")}/>
                    </div>

                </Col>
                <Col xl={2} className='colStyle'>
                    <Button onClick={this._download} type="primary" icon="download">
                        按月导出
                    </Button>
                </Col>
            </Row>
        </div>;
    }
}

BangExcel.propTypes = {};

export default BangExcel;
