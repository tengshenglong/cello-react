import React, {Component} from 'react';
import {
    Button,
    Col,
    DatePicker,
    Row,
    Select,
    Upload,
    Icon,
    Table,
    Breadcrumb,
    List,
    Card,
    Input,
    Spin,
    Alert,
    Popconfirm, Modal, InputNumber, message
} from 'antd';
import AlertInfo from '../../common/commonComponents/AlertInfo';//提示信息组件
import MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';
import ConditionHeader from '../../common/commonComponents/ConditionHeader';
import Cookies from "js-cookie";
const _mm = new MUtil();
//地址配置信息

class GridData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUserId:Cookies.get('username'),//用户ID
            dataList: [],
            gmName: '',
            region: '',
            gridName:'',
            fileList: [],
        };
        this.fileProps = {
            action: Config.REPORT_URL_PREFIX+'regionGrid/excelUp',
            onChange: this.excelUp,
            multiple: true
        };
    }
    componentWillMount() {
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.fetch();
    }
    //获取查询条件数据
    receiveData=(data)=>{
        this.setState(data)
    };
    fetch = () => {
        let url = `${Config.REPORT_URL_PREFIX}regionGrid/findAll?regionName=${this.state.region}&gridName=${this.state.gridName}`;
        this.fetchData(url);
    };
    fetchData = (url) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.setState({
            loading: {
                spinning: true,
                size: 'large'
            }
        });
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    loading: {
                        spinning: false,
                        size: 'large'
                    }
                });
                if (data.dataList.length == 0) {
                    _mm.errorTips('没有数据');
                    this.setState({
                        dataList: data.dataList
                    })
                } else {
                    this.setState({
                        dataList: data.dataList
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading: {
                        spinning: false,
                        size: 'large'
                    }
                });
                _mm.errorTips(error);
            });
    };
    excelUp = (info) => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let fileList = info.fileList;
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (info.file.status === 'error') {
                _mm.errorTips("数据异常，请联系管理员！");
                return
            }
            if (file.response) {
                _mm.errorTips(`${info.file.name} ${file.response.message}`);
                return file.response.status === 'success';
            }
            return true;
        });
        this.fetch();
        this.setState({ fileList });
    };
    downLoad = () => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        window.location.href = `${Config.REPORT_URL_PREFIX}regionGrid/mould`
    };
    export = () => {
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
        let api =`${Config.REPORT_URL_PREFIX}regionGrid/exports`;
        window.location.href=api;
    };
    render() {
        const columns = [{
            title: '工贸',
            dataIndex: 'regionName',
            align: 'center',
            key: 'regionName',
            width: 100
        },{
            title: '省',
            dataIndex: 'province',
            align: 'center',
            key: 'province',
            width: 100
        },{
            title: '市',
            dataIndex: 'city',
            align: 'center',
            key: 'city',
            width: 100
        },{
            title: '县',
            dataIndex: 'county',
            align: 'center',
            key: 'county',
            width: 100
        },{
            title: '网格名称',
            dataIndex: 'gridName',
            align: 'center',
            key: 'gridName',
            width: 100
        }
        ];
        return (
            <div >
                <Row>
                    <Col span={6} className='commonMarginTop'>
                        <Button type="primary" icon="download"
                                onClick={this.downLoad}>模版下载</Button>
                    </Col>
                    <Col span={6} className='commonMarginTop'>
                        <Upload {...this.fileProps} fileList={this.state.fileList}>
                            <Button type="primary">
                                <Icon type="upload"/> 上传更新
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={6} className="commonMarginTop"style={{marginLeft:-1.5,marginBottom:10,borderLeft:'3px solid #F0F2F5',paddingLeft:'10%'}}>
                        <Button onClick={this.export} type="primary" icon="download">
                            导出
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Alert message="导出数据为京东帮专卖店无法匹配数据" type="warning" showIcon style={{bottom:5,width:300,marginTop:10}} />
                    </Col>
                </Row>
                <ConditionHeader
                        search='true'
                        regionList='true'
                        gridName='true'
                        receiveData={this.receiveData}
                        fetch={this.fetch}>
                </ConditionHeader>

                <Table loading={this.state.loading} style={{marginTop: '20px'}}
                       dataSource={this.state.dataList} columns={columns} bordered/>
            </div>
        )
    }
}
export default GridData;
