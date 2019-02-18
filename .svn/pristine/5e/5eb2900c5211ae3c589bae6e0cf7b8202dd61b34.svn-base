/**
 * Created by guotaidou on 2018/6/28.
 */
import React, {Component} from 'react';
import {Button, Col, Row, Table, Popconfirm, Modal, Input, DatePicker} from 'antd';
import Bread from '../../common/Bread';
import moment from 'moment';
import Config from "../../common/Config";
import MUtil from '../../common/util/mm';
import {message} from "antd/lib/index";
import ModalComponent from "../../common/commonComponents/ModalComponent";
import '../../common/css/JAge.css';

const _mm = new MUtil();

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visiblea: false,
            jobClassName: '',
            jobGroupName:'',
            jobDescription:'',
            cronExpression:'',
            dataList: [],
            addOrUpdate:0,
            disabled:true,
            loading: {
                spinning: true,
                size: 'large'
            },
            jobProcess:[],
            timemillis:''
        }
    }

    componentWillMount() {
        _mm.BrowerHeadTitle();
        if (_mm.loginStatus() == false) {
            return;
        }
        this.fetchData();
    }

    showEditModal = (record) => {
        this.setState({
            visible: true,
            jobClassName: record.jobClassName,
            jobGroupName: record.triggerGroup,
            jobDescription:record.description,
            cronExpression:record.timeZoneId,
            addOrUpdate:1
        });
    };
    handleOk = (e) => {
        if (_mm.loginStatus() == false) {
            return;
        }
        let jobClassName=this.state.jobClassName;
        let jobGroupName=this.state.jobGroupName;
        let jobDescription=this.state.jobDescription;
        let cronExpression=this.state.cronExpression;

        if(jobClassName.trim()===''||jobGroupName.trim()===''||jobDescription.trim()===''||cronExpression.trim()===''){
            _mm.errorTips("请全部填写！");
            return;
        }
        let findAlUser =`${Config.SCHEDULE_URL_PREFIX}job/addjob`;
        if(this.state.addOrUpdate!==0){
            findAlUser=`${Config.SCHEDULE_URL_PREFIX}job/reschedulejob`;
        }
        let params = {
            jobClassName: jobClassName,
            jobGroupName: jobGroupName,
            jobDescription:jobDescription,
            cronExpression:cronExpression
        };
        _mm.FetchUtil.init()
            .setUrl(findAlUser)
            .setMethod('POST')
            .setBody(params)
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
                    this.fetchData();
                } else {
                    message.error(data.message);
                }
            });
        this.setState({
            visible: false,
            jobClassName: '',
            jobGroupName:'',
            jobDescription:'',
            cronExpression:'',
            addOrUpdate:0,
            disabled:true
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
            disabled:false
        });
    };
    handleCancel = (e) => {
        this.setState({
            visible: false,
            jobClassName: '',
            jobGroupName:'',
            jobDescription:'',
            cronExpression:'',
            addOrUpdate:0,
            disabled:true
        });
    };
    fetchData = () => {
        if (_mm.loginStatus() == false) {
            return;
        }
        this.setState({
            loading: {
                spinning: true,
                size: 'large'
            }
        });
        let params = {
            jobDescription:this.state.jobDescription,
            jobClassName:this.state.jobClassName
        };
        /*查询所有的定时任务*/
        let findTasksAll = `${Config.SCHEDULE_URL_PREFIX}job/queryjob`;
        _mm.FetchUtil.init()
            .setUrl(findTasksAll)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .setMethod('POST')
            .setBody(params)
            .dofetch()
            .then((data) => {
                if (data.dataList.length === 0) {
                    _mm.errorTips('没有数据');
                    this.setState({
                        loading: {
                            spinning: false,
                            size: 'large'
                        },
                        dataList: []
                    })
                } else {
                    this.setState({
                        loading: {
                            spinning: false,
                            size: 'large'
                        },
                        dataList: data.dataList
                    })
                }
            })
            .catch((error) => {
                _mm.errorTips(error);
                this.setState({
                    loading: {
                        spinning: false,
                        size: 'large'
                    },
                    dataList: []
                })
            });
    };
    conditionChange = (e) => {
        this.setState({
            kuPosition: encodeURI(e.target.value)
        })
    };
    tabeRowClassName=(record,index)=>{
        if(record.state=='异常'){
            return 'TasksOther'
        }
    };
    onExecute = (record) => {
        if (_mm.loginStatus() == false) {
            return;
        }
        let findAlUser = `${Config.SCHEDULE_URL_PREFIX}job/resumejob`;
        let params = {
            jobClassName: record.jobClassName,
            jobGroupName: record.triggerGroup
        };
        _mm.FetchUtil.init()
            .setUrl(findAlUser)
            .setMethod('POST')
            .setBody(params)
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
                    this.fetchData();
                } else {
                    message.error(data.message);
                }
            })
    };
    onPause = (record) => {
        if (_mm.loginStatus() == false) {
            return;
        }
        let findAlUser = `${Config.SCHEDULE_URL_PREFIX}job/pausejob`;
        let params = {
            jobClassName: record.jobClassName,
            jobGroupName: record.triggerGroup
        };
        _mm.FetchUtil.init()
            .setUrl(findAlUser)
            .setMethod('POST')
            .setBody(params)
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
                    this.fetchData();
                } else {
                    message.error(data.message);
                }
            })
    };
    //模板显示函数
    showProcessModal = (jobClassName,record) => {
        this.setState({
            jobClassName:jobClassName,
            visiblea: true,
            modalTitle:`类名：${jobClassName}  ( 描述：${record.description} )---执行状态`
        },function(){
            this.fetchProcess();
        });
    };
    fetchProcess=()=>{
        let findByJobProcess = `${Config.SCHEDULE_URL_PREFIX}job/findByJobProcess?jobClassName=${this.state.jobClassName}&timemillis=${this.state.timemillis}`;
        _mm.FetchUtil.init()
            .setUrl(findByJobProcess)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }).dofetch()
            .then((data) => {
                if (data.dataList.length>0) {
                    this.setState({
                        jobProcess: data.dataList
                    });
                } else {
                    this.setState({
                        jobProcess: []
                    })
                }
            });
    };

    //模板隐藏函数
    hideModal= ()=> {
        this.setState({
            visiblea: false,
            jobGroupName:'',
            jobClassName:'',
            timemillis:''
        });
    };
    onDelete = (record) => {
        if (_mm.loginStatus() == false) {
            return;
        }
        let findAlUser = `${Config.SCHEDULE_URL_PREFIX}job/deletejob`;
        let params = {
            jobClassName: record.jobClassName,
            jobGroupName: record.triggerGroup
        };
        _mm.FetchUtil.init()
            .setUrl(findAlUser)
            .setMethod('POST')
            .setBody(params)
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
                    this.fetchData();
                } else {
                    message.error(data.message);
                }
            })
    };
    onDateProcess=(date, dateString)=>{
       if (dateString.length>0){
           let starttime = dateString.replace(new RegExp("-","gm"),"/");
           var starttimeHaoMiao = (new Date(starttime)).getTime();
           this.setState({
               timemillis: starttimeHaoMiao
           },function(){
               this.fetchProcess();
           });
       }else {
           this.setState({
               timemillis:''
           },function(){
               this.fetchProcess();
           });
       }
    };

    onExtractValue = (e) => {
        if (e.target.id === 'jobClassName') {
            this.setState({
                jobClassName: e.target.value
            });
        }
        if (e.target.id === 'jobGroupName') {
            this.setState({
                jobGroupName: e.target.value
            });
        }
        if (e.target.id === 'cronExpression') {
            this.setState({
                cronExpression: e.target.value
            });
        }
        if (e.target.id === 'jobDescription') {
            this.setState({
                jobDescription: e.target.value
            });
        }
        if (e.target.id === 'messages') {
            this.setState({
                jobDescription: e.target.value
            });
        }
        if (e.target.id === 'classPath') {
            this.setState({
                jobClassName: e.target.value
            });
        }
    };

    render() {
        const  jobColumns=[
            {
                title: '开始时间',
                dataIndex: 'startDate',
                key: 'startDate',
                align: 'center',
                width:200,
                render: (data) => {
                    return <span title={new moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")}>{new moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")}</span>;
                }
            },
            {
                title: '结束时间',
                dataIndex: 'endDate',
                key: 'endDate',
                align: 'center',
                width:200,
                render: (data) => {
                    return <span title={data===0?"暂无":new moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")}>{data===0?"暂无":new moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")}</span>;
                }
            },
            {
                title: '运行状况',
                dataIndex: 'state',
                key: 'state',
                align: 'center',
                width:200,
                render: (data) => {
                    return <span title={data}>{data}</span>;
                }
            }
        ];


        const columns = [
            {
                title: '类路径',
                dataIndex: 'jobClassName',
                key: 'jobClassName',
                align: 'center',
                render: (data, record) => {
                    return <span  title ={data}><a href='javascript:;' onClick={this.showProcessModal.bind(this,data,record)}>{data}</a></span>;
                }
            },
            {
                title: '分组名称',
                dataIndex: 'triggerGroup',
                key: 'triggerGroup',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '描述信息',
                dataIndex: 'description',
                key: 'description',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '状态',
                dataIndex: 'triggerState',
                key: 'triggerState',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: 'CRON表达式',
                dataIndex: 'timeZoneId',
                key: 'timeZoneId',
                align: 'center',
                render: function (data) {
                    return <span title={data}>{data}</span>;
                }
            },
            {
                title: '创建日期',
                dataIndex: 'createTime',
                key: 'createTime',
                align: 'center',
                render: function(data) {
                    return <span title ={data===null?"":new moment(new Date(data)).format("YYYY-MM-DD")}>{ data===null?"":new moment(new Date(data)).format("YYYY-MM-DD")}</span>;
                }
            },
            {
                title: '上一次执行时间',
                dataIndex: 'prevFireTime',
                key: 'prevFireTime',
                align: 'center',
                render: function(data) {
                    return <span title ={data===-1?"暂无":new moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")}>{ data===-1?"暂无":new moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")}</span>;
                }
            }, {
                title: '下一次执行时间',
                dataIndex: 'nextFireTime',
                key: 'nextFireTime',
                align: 'center',
                render: function(data,record) {
                    return <span title ={record.triggerState==="异常"||record.triggerState==="暂停执行"||record.triggerState==="完成(可能异常中断)"?"暂无":new moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")}>{ record.triggerState==="异常"||record.triggerState==="暂停执行"||record.triggerState==="完成(可能异常中断)"?"暂无":new moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")}</span>;
                }
            },{
                title: '操作',
                align: 'center',
                dataIndex: 'operation',
                width:200,
                render: (text, record) => {
                    return (
                        <div>
                            {
                                (
                                    <Popconfirm title="是否执行?" onConfirm={() => this.onExecute(record)}>
                                        <a href="javascript:;">执行</a>
                                    </Popconfirm>
                                )
                            }
                            {
                                (
                                    <Popconfirm title="是否暂停?" onConfirm={() => this.onPause(record)}>
                                        <a href="javascript:;" style={{marginLeft: 20}}>暂停</a>
                                    </Popconfirm>
                                )
                            }
                            {
                                <a href="javascript:void(0) " onClick={() => this.showEditModal(record)}
                                   style={{marginLeft: 20}}>修改</a>
                            }
                            {
                                (
                                    <Popconfirm title="是否删除?" onConfirm={() => this.onDelete(record)}>
                                        <a href="javascript:;" style={{marginLeft: 20}}>删除</a>
                                    </Popconfirm>
                                )
                            }
                        </div>
                    );
                }
            }
        ];
        return (
            <div className='allBorder'>
                <Bread></Bread>
                <Button style={{marginTop:'20px'}} type="primary" onClick={this.showModal}>添加定时任务</Button>

                <div style={{
                    marginTop: '20px',
                    borderTop: '3px solid #F0F2F5', paddingTop: '40px', paddingBottom: '40px',
                    borderBottom: '3px solid #F0F2F5'
                }}>
                    <Row className='rowStyle' type="flex" justify="start">
                        <Col xl={6} className='colStyle'>
                            <span style={{marginRight: '10px'}}>类路径：</span>
                            <Input placeholder="请输入" style={{width: '150px'}} id="classPath"
                                   type="text"
                                   onChange={this.onExtractValue}/>
                        </Col>
                        <Col xl={4} className='colStyle'>
                            <span style={{marginRight: '10px'}}>描述：</span>
                            <Input placeholder="请输入" style={{width: '150px'}} id="messages"
                                   type="text"
                                   onChange={this.onExtractValue}/>
                        </Col>
                        <Col xl={2} className='colStyle'>
                            <Button type="primary" onClick={this.fetchData}>查询</Button>
                        </Col>
                    </Row>
                </div>

                <Modal
                    title="定时任务信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    类路径：<span style={{color: 'red'}}>✳</span><Input id={"jobClassName"} value={this.state.jobClassName}
                                                                     onChange={this.onExtractValue} disabled={this.state.disabled}/>
                    <br/><br/>
                    分组名称：<span style={{color: 'red'}}>✳</span><Input id={"jobGroupName"} value={this.state.jobGroupName}
                                                                   onChange={this.onExtractValue} disabled={this.state.disabled}/>
                    <br/><br/>
                    CRON表达式：<span style={{color: 'red'}}>✳</span><Input id={"cronExpression"} value={this.state.cronExpression}
                                                                   onChange={this.onExtractValue}/>
                    <br/><br/>
                    描述：<span style={{color: 'red'}}>✳</span><Input id={"jobDescription"} value={this.state.jobDescription}
                                                                   onChange={this.onExtractValue}/>
                    <br/><br/>

                </Modal>
                <ModalComponent visible={this.state.visiblea}
                                modalTitle={this.state.modalTitle}
                                hide={this.hideModal}>
                    <DatePicker onChange={this.onDateProcess}/>
                  <div className={'Tasks'}>
                      <Table loading={this.state.loading} style={{marginTop: '20px'}}
                             rowClassName={this.tabeRowClassName}
                             dataSource={this.state.jobProcess} columns={jobColumns} bordered/>
                  </div>
                </ModalComponent>


                <div style={{ marginTop: '40px'}}>
                    <Table loading={this.state.loading} style={{marginTop: '20px'}}
                           dataSource={this.state.dataList}
                           columns={columns} bordered  scroll={{x:200}}/>
                </div>
            </div>
        )
    }
}

export default Tasks;
