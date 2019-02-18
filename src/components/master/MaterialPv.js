/**
 * Created by guotaidou on 2018/6/26.
 */
import React, {Component} from 'react';
import moment from 'moment';
import {Button, Col, DatePicker, Row, Select, Table,Breadcrumb,List,Tag, Card ,Input,Spin,Transfer,Modal} from 'antd';
import '../../common/css/TotalOutStoreTable.css';
import {LineChart, Line, XAxis, YAxis,Bar, CartesianGrid,LabelList, Tooltip, Legend,ResponsiveContainer} from 'recharts';
import Cookies from 'js-cookie';
import Bread from '../../common/Bread';
import Config from "../../common/Config";
import CustomizedAxisTick from './CustomizedAxisTick';
import  MUtil from '../../common/util/mm';
const _mm=new MUtil();
const Option = Select.Option;
const ButtonGroup = Button.Group;
class MaterialPv extends Component {
    constructor(props) {
        super(props);
        this.state={
            dateType:'7',
            currentUserId:Cookies.get('username'),
            stringData:[],
            buttonType:'false',
            spinShow:'none',
            mockData: [],
            targetKeys: [],
            selectedKeys:[],
            pu:'pv',
            res:[],
            visible: false,
            block:'none'
        }

    }
    componentWillMount(){
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.getList();
    }
    componentDidMount() {
        let api =`${Config.REPORT_URL_PREFIX}master/findMaterialCode?currentUserId=${this.state.currentUserId}`;
        this.fetchOrders(api)
    }
    getList =() =>{
        let params={
            dateType:this.state.dateType,
            pu:this.state.pu,
            array:this.state.targetKeys
        };
        this.setState({
            spinShow:'block'
        });
        let url=`${Config.REPORT_URL_PREFIX}master/getList?currentUserId=${this.state.currentUserId}`;
        _mm.FetchUtil.init()
            .setUrl(url)
            .setMethod('POST')
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .setBody(params)
            .dofetch()
            .then((orders) => {
                this.setState({
                    spinShow:'none'
                });
                if(orders.dataList.length>0){
                    var  data=orders.dataList[0];
                    var res = [];
                    for(var key in data ){
                        if( key!='orderDate'){
                            res.push(key)
                        }
                    }
                    this.setState({
                        stringData:orders.dataList,
                        res:res,
                        targetKeys:res
                    });
                    this.setState({block:'block'})

                }else{
                    _mm.errorTips('没有数据!');
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };
    fetchOrders = (url) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        this.setState({
            spinShow:'block'
        });
        let api=url;
        _mm.FetchUtil.init()
            .setUrl(api)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                const mockData=[];
                this.setState({
                    spinShow:'none'
                });
                if(data.dataList==0){
                    _mm.errorTips(data.message);
                }else{
                    for(var i=0;i<data.dataList.length;i++){
                        const dataMock = {
                            key: data.dataList[i],
                            title: data.dataList[i],
                            description: data.dataList[i]
                        };
                        mockData.push(dataMock);
                    }
                    this.setState({
                        mockData:mockData
                    })
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };
    handleSearch = () => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        if(this.state.targetKeys.length==0){
            _mm.errorTips('物料不能为空');
                return;
        }
        let params={
            dateType:this.state.dateType,
            pu:this.state.pu,
            array:this.state.targetKeys
        };
        this.setState({
            spinShow:'block'
        });

        let url=`${Config.REPORT_URL_PREFIX}master/MaterialViewdata`;
        _mm.FetchUtil.init()
            .setUrl(url)
            .setMethod('POST')
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .setBody(params)
            .dofetch()
            .then((orders) => {
                this.setState({
                    spinShow:'none'
                });
                var  data=orders.dataList[0];
                var res = [];
                for(var key in data ){
                    if( key!='orderDate'){
                        res.push(key)
                    }
                }
                this.setState({
                    stringData:orders.dataList,
                    res:res
                });
            })
            .catch((error) => {
                _mm.errorTips(error);
            });
    };
    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue.toUpperCase()) > -1;
    };
    handleChange = (targetKeys,direction) => {

        if(direction=='right'){
            if(targetKeys.length>7){
                _mm.errorTips('不能超过7条物料');
                return;
            }
            this.setState({ targetKeys },function(){
                console.log(this.state.targetKeys)
            });
        }else{
            this.setState({ targetKeys });
        }
    };
    selectChange=(value)=> {
        if(isNaN(value)==true){
            this.setState({
                pu:value
            })
        }else{
            this.setState({
                dateType:value
            })
        }
    };
    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e) => {
        this.setState({
            visible: false
        });
        if(this.state.targetKeys){
            this.setState({block:'block'})
        }else{
            this.setState({block:'none'})
        }
    };

    handleCancel = (e) => {
        this.setState({ targetKeys:[] });
        this.setState({
            visible: false
        });
        this.setState({block:'none'})
    };

    render(){
        return(
            <div className='allBorder'>
                <Bread></Bread>
                <div style={{border:'2px solid #E8E8E8'}}>
                    <Row
                        style={{marginTop:'20px',paddingBottom:'20px',borderBottom:'2px solid #E8E8E8'}}
                        className='rowStyle' type="flex" justify="start">
                        <Col span={3} className='colStyle'>
                                <Select defaultValue="7" style={{ width: 120}} onChange={this.selectChange}>
                                    <Option value="7">近7天</Option>
                                    <Option value="15">近15天</Option>
                                    <Option value="30">近30天</Option>
                                </Select>
                        </Col>
                        <Col span={3} className='colStyle'>
                                <Select defaultValue="pv" style={{ width: 120}} onChange={this.selectChange}>
                                    <Option value="pv">pv</Option>
                                    <Option value="uv">uv</Option>
                                </Select>
                        </Col>
                        <Col span={3} className='colStyle'>
                            <Button type="primary" onClick={this.showModal}>点击选择物料</Button>
                        </Col>
                        <Modal
                            title="选择物料"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            closable='false'
                            style={{width:'500px'}}
                            >
                            <Transfer
                                listStyle={{
                                        width: 200,
                                        height: 300
                                    }}
                                titles={['待选择物料', '已选择物料']}
                                dataSource={this.state.mockData}
                                showSearch
                                filterOption={this.filterOption}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                render={item => item.title}
                                />
                        </Modal>
                        <Col span={2} className='colStyle'>
                            <Button  type="primary" onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                    <div style={{marginTop:10,borderBottom:'2px solid #E8E8E8',display:`${this.state.block}`}}>
                        <Row className='rowStyle' type="flex" justify="start" style={{marginBottom:10}}>
                            <Col span={16} className='colStyle'>
                                <span style={{marginRight:5}}>已选择物料:</span>
                                {
                                    this.state.targetKeys.map((data,index)=>{
                                        var randomColor='';
                                        switch(index){
                                            case 0:
                                                randomColor='#DB156F';
                                                break;
                                            case 1:
                                                randomColor='#005DAB';
                                                break;
                                            case 2:
                                                randomColor='#F2C44B';
                                                break;
                                            case 3:
                                                randomColor='#67ED62';
                                                break;
                                            case 4:
                                                randomColor='#B971F2';
                                                break;
                                            case 5:
                                                randomColor='#31EAD1';
                                                break;
                                            case 6:
                                                randomColor='#3E4000';
                                                break;
                                        }
                                         return <Tag color={randomColor}>{data}</Tag>

                                    })
                                 }
                            </Col>
                        </Row>
                    </div>
                    <Row className='rowStyle'>
                        <Col span={24} style={{position:'relative'}}>
                            <Spin
                                style={{display:`${this.state.spinShow}`,
                                 position:'absolute',zIndex:'10',top:'40%',left:'50%'}}
                                size="large"/>
                            <ResponsiveContainer width='100%' height={450}>
                                <LineChart  data={this.state.stringData}
                                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="orderDate" height={60} tick={<CustomizedAxisTick/>} >
                                    </XAxis>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend />
                                    {
                                        this.state.res.map((data,index)=>{
                                            var randomColor='';
                                            switch(index){
                                                case 0:
                                                    randomColor='#DB156F';
                                                    break;
                                                case 1:
                                                    randomColor='#005DAB';
                                                    break;
                                                case 2:
                                                    randomColor='#F2C44B';
                                                    break;
                                                case 3:
                                                    randomColor='#67ED62';
                                                    break;
                                                case 4:
                                                    randomColor='#B971F2';
                                                    break;
                                                case 5:
                                                    randomColor='#31EAD1';
                                                    break;
                                                case 6:
                                                    randomColor='#3E4000';
                                                    break;
                                            }
                                            return(<Line  type="monotone" dataKey={data} stroke={randomColor}  strokeWidth={2}/>)
                                        })
                                    }
                                </LineChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default MaterialPv;
