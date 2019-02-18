import React, {Component} from 'react';
import {
    Button,
    message,
    Input,
    Row,
    Select,
    Table,
    Modal,
    Checkbox,
    Popconfirm,
    Col
} from 'antd';
import MUtil from '../../common/util/mm';
import Bread from '../../common/Bread';
import Config from "../../common/Config";

const Option = Select.Option;
const _mm = new MUtil();

class PriceMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: {
                spinning: true,
                size: 'large'
            },
            visible: false,
            dataList: [],
            endPrice: '',
            startPrice: '',
            industry: '',
            invsort: '',
            setchIndustry: '全部',
            setchInvsort: '全部',
            industrySelect: [],//产业选中数据
            industryList: [],
            invsortList: [],
            id: '',
        }

    }

    //发送fetch请求
    fetch = () => {
        let url = `${Config.REPORT_URL_PREFIX}orderPriceMaintain/findList?industry=${this.state.setchIndustry}&invsort=${this.state.setchInvsort}`;
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

    componentWillMount() {
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        this.setState({
            industryList: JSON.parse(localStorage.a).industryList
        });
        this.fetch();
        this.fetchInvsorts('');
    }

    onExtractSelect = (id, value) => {
        if (id === 'setchIndustryId') {
            this.setState({
                setchIndustry: value,
                setchInvsort: '全部'
            }, function () {
                this.fetchInvsorts(value)
            });
        } else if (id === 'setchInvsortId') {
            this.setState({
                setchInvsort: value
            })
        } else if (id === 'industryId') {
            this.setState({
                industry: value,
                invsort: ''
            }, function () {
                this.fetchInvsorts(value)
            })
        } else if (id === "invsortId") {
            this.setState({
                invsort: value
            })
        }
    };

    fetchInvsorts = (e) => {
        /*异步查询产品组*/
        let addUser = `${Config.REPORT_URL_PREFIX}invsorts/findAllInvsorts?industry=${e}`;
        _mm.FetchUtil.init()
            .setUrl(addUser)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if (data.flag) {
                    this.setState({
                        invsortList: data.dataList,
                    });
                } else {
                }
            })
    };

    showEditModal = (record) => {
        console.log( record.startPrice);
        console.log( record.endPrice);
        let endPrice = record.endPrice;
        if (record.endPrice === 2147483647) {
            endPrice = '-'
        }
        this.setState({
            visible: true,
            id: record.id,
            industry: record.industryName,
            invsort: record.invsortsCode,
            startPrice: record.startPrice,
            endPrice: endPrice
        });
    };


    showModal = () => {
        //为防止添加或修改弹出层修改产业导致展示页面中的产品组变化,每次保存和关闭是重新查询产品组
        this.fetchInvsorts('');
        this.setState({
            visible: true
        });
    };

    handleOk = () => {
        let industry = this.state.industry;
        let invsort = this.state.invsort;
        let startPrice = this.state.startPrice;
        let endPrice = this.state.endPrice === '-' ? 2147483647 : this.state.endPrice;
        if (industry === '' || invsort === '' || startPrice === '' || endPrice === '') {
            _mm.errorTips(' ✳ 为必填或必选项 ');
            return
        }
        if (startPrice >= endPrice) {
            _mm.errorTips(' 起始价位段应当小于终止价位段 ');
            return
        }
        let url = `${Config.REPORT_URL_PREFIX}orderPriceMaintain/addOrUpdate?`;
        url+=`industry=${industry}&invsort=${invsort}&startPrice=${startPrice}&endPrice=${endPrice}&id=${this.state.id}`;
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    visible: false,
                    industry: '',
                    invsort: '',
                    startPrice: '',
                    endPrice: '',
                    setchIndustry:'全部',
                    setchInvsort:'全部',
                    id:''
                });
                if (data.flag) {
                    message.success(data.message);
                    this.fetch();
                    //为防止添加或修改弹出层修改产业导致展示页面中的产品组变化,每次保存和关闭是重新查询产品组
                    this.fetchInvsorts('')
                } else {
                    _mm.errorTips(data.message);
                }
            })


    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
            industry: '',
            invsort: '',
            startPrice: '',
            endPrice: '',
            setchIndustry:'全部',
            setchInvsort:'全部',
            id:''
        },function(){
            //为防止添加或修改弹出层修改产业导致展示页面中的产品组变化,每次保存和关闭是重新查询产品组
            this.fetchInvsorts('')
        });
    };

    onDelete = (key) => {
        //判断登陆状态
        if (_mm.loginStatus() == false) {
            return;
        }
        let url = `${Config.REPORT_URL_PREFIX}orderPriceMaintain/delById?id=${key}`;
        _mm.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }).dofetch()
            .then((data) => {
                this.setState({
                    visible: false
                });
                if (data.flag) {
                    message.success(data.message);
                    const dataSource = [...this.state.dataList];
                    this.setState({dataList: dataSource.filter(item => item.id !== key)});
                } else {
                    message.error(data.message);
                }
            })
    };

    onExtractValue = (e) => {
        if (e.target.id === 'endPrice') {
            if (e.target.value === '-') {
                if (this.state.endPrice !== '-' || this.state.endPrice.length === 0) {
                    this.setState({
                        endPrice: e.target.value.trim()
                    });
                }
            } else if (isNaN(e.target.value) === false && this.state.endPrice !== '-') {
                if (e.target.value < 2147483647) {
                    this.setState({
                        endPrice: e.target.value.trim()
                    });
                } else {
                    this.setState({
                        endPrice: '-'
                    });
                }
            } else if (e.target.value.trim() === '') {
                this.setState({
                    endPrice: ''
                });
            }
        } else if (e.target.id === 'startPrice') {
            if (isNaN(e.target.value) === false ) {
                if (e.target.value < 2147483647) {
                    this.setState({
                        startPrice: e.target.value.trim()
                    });
                }
            }
        }
    };


    render() {
        const columns = [{
            title: '产业名称',
            dataIndex: 'industryName',
            align: 'center',
            key: 'industryName'
        }, {
            title: '产品组CODE',
            dataIndex: 'invsortsCode',
            align: 'center',
            key: 'invsortsCode'
        }, {
            title: '起始价位段',
            align: 'center',
            dataIndex: 'startPrice',
            key: 'startPrice'
        }, {
            title: '终止价位段',
            dataIndex: 'endPrice',
            align: 'center',
            key: 'endPrice',
            render: function (data) {
                return <span title={data === 2147483647 ? "以上" : data}>{data === 2147483647 ? "以上" : data}</span>;
            }
        }, {
            title: '操作日期',
            dataIndex: 'submitDate',
            align: 'center',
            key: 'submitDate'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div>
                        {
                            (
                                <Popconfirm title="是否删除?" onConfirm={() => this.onDelete(record.id)}>
                                    <a href="javascript:;">删除</a>
                                </Popconfirm>
                            )
                        }
                        {
                            <a href="javascript:void(0)" onClick={() => this.showEditModal(record)}
                               style={{marginLeft: 20}}>修改</a>
                        }
                    </div>
                );
            }
        }];

        return (

            <div className='allBorder'>
                <Bread></Bread>
                {/*添加用户的界面*/}
                <Modal
                    title="价位段操作"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    产业选择：<span style={{color: 'red'}}>✳</span>
                    <Select placeholder="选择产业" value={this.state.industry} style={{width: 120}}
                            onChange={this.onExtractSelect.bind(this, 'industryId')}>
                        {
                            this.state.industryList.map(values =>
                                values.industryName !== '其他' ?
                                    <Option value={values.industryName}>{values.industryName}</Option> : ''
                            )
                        }
                    </Select>
                    <br/><br/>
                    产品组选择：<span style={{color: 'red'}}>✳</span>
                    <Select placeholder="选择产业" value={this.state.invsort} style={{width: 120}}
                            onChange={this.onExtractSelect.bind(this, 'invsortId')}>
                        {
                            this.state.invsortList.map(values =>
                                <Option value={values.invsortsCode}>{values.invsortsCode}</Option>
                            )
                        }
                    </Select>
                    <br/><br/>
                    起始价位段：
                    <span style={{color: 'red'}}>✳</span><Input id={"startPrice"} value={this.state.startPrice}
                                                                onChange={this.onExtractValue}
                                                                style={{width: 200}}/>
                    <br/><br/>
                    终止价位段：
                    <span style={{color: 'red'}}>✳</span><Input id={"endPrice"} value={this.state.endPrice}
                                                                onChange={this.onExtractValue}
                                                                style={{width: 200}}/><span> 提示："-" 为 "以上"</span>
                </Modal>
                <Row type="flex">
                    <Col xl={3} className='commonMarginTop'>
                        <Button type="primary" onClick={this.showModal}> 价位段操作 </Button>
                    </Col>
                    <Col xl={4} className='commonMarginTop'>
                        产业选择：
                        <Select placeholder="选择产业" value={this.state.setchIndustry} style={{width: 120}}
                                onChange={this.onExtractSelect.bind(this, 'setchIndustryId')}>
                            <Option value={'全部'}>全部</Option>
                            {

                                this.state.industryList.map(values =>
                                    <Option value={values.industryName}>{values.industryName}</Option>
                                )
                            }
                        </Select>
                    </Col>
                    <Col xl={4} className='commonMarginTop'>
                        产品组选择：
                        <Select placeholder="选择产业" value={this.state.setchInvsort} style={{width: 120}}
                                onChange={this.onExtractSelect.bind(this, 'setchInvsortId')}>
                            <Option value={'全部'}>全部</Option>
                            {
                                this.state.invsortList.map(values =>
                                    <Option value={values.invsortsCode}>{values.invsortsCode}</Option>
                                )
                            }
                        </Select>
                    </Col>
                    <Col xl={4} className='commonMarginTop'>
                        <Button type="primary" onClick={this.fetch}>查询</Button>
                    </Col>
                </Row>

                <Table loading={this.state.loading} style={{marginTop: '20px'}}
                       dataSource={this.state.dataList} columns={columns} bordered/>
            </div>
        );
    }
}

PriceMaintain.propTypes = {};
export default PriceMaintain;
