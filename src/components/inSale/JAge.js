/**
 * Created by guotaidou on 2018/6/21.
 */
import React, {Component} from 'react';
import {Row, Table} from 'antd';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import '../../common/css/JAge.css';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
class JAge extends Component{
    constructor(props) {
        super(props);
        this.state={
            data1:[],
            data2:[],
            loading:{
                spinning:true,
                size:'large'
            }
        }
    }
    componentWillMount(){
        //浏览器网页头部
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()==false){
            return;
        }
    }
    componentDidMount(){
        let url = Config.REPORT_URL_PREFIX+'klMessage/findByCreateDateAndKl';
        this.fetchData(url);
    }
    fetchData(url){
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
                if(data.dataList.length==0){
                    _mm.errorTips('没有数据');
                    this.setState({
                        data1: [],
                        data2: [],
                        loading:{
                            spinning:false,
                            size:'large'
                        }
                    })
                }else {
                    this.setState({
                        data1: data.dataList,
                        data2: data.dataList1,
                        loading:{
                            spinning:false,
                            size:'large'
                        }
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading:{
                        spinning:false,
                        size:'large'
                    }
                });
                _mm.errorTips(error);
            });
    }
    tabeRowClassName=(record,index)=>{
        if(record.industryName=='其他'){
            return 'JAgeOther'
        }
    };
    render(){
        let downloadUrl=`${Config.REPORT_URL_PREFIX}klMessage/downloadExcel`;
        let salt = JSON.parse(localStorage.a).salt.toString();
        const columns = [
            {
                key:1,
                title: '',
                children:[
                    {
                        key:2,
                        title: '',
                        children:[{
                            key:'industryName',
                            dataIndex: 'industryName',
                            align:'center',
                            title: '品类'
                        }]
                    },
                    {
                        key:4,
                        title: '~30',
                        children:[{
                            key:'t30qty',
                            dataIndex: 't30qty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'t30price',
                            dataIndex: 't30price',
                            align:'center',
                            title: '金额'
                        }]
                    },
                    {
                        key:7,
                        title: '30~60',
                        children:[{
                            key:'t60qty',
                            dataIndex: 't60qty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'t60price',
                            dataIndex: 't60price',
                            align:'center',
                            title: '金额'
                        }]
                    },
                    {
                        key:10,
                        title: '60~90',
                        children:[{
                            key:'t90qty',
                            dataIndex: 't90qty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'t90price',
                            dataIndex: 't90price',
                            align:'center',
                            title: '金额'
                        }]
                    },
                    {
                        key:13,
                        title: '90~120',
                        children:[{
                            key:'t120qty',
                            dataIndex: 't120qty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'t120price',
                            dataIndex: 't120price',
                            align:'center',
                            title: '金额'
                        }]
                    },
                    {
                        key:16,
                        title: '120~180',
                        children:[{
                            key:'t180qty',
                            dataIndex: 't180qty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'t180price',
                            dataIndex: 't180price',
                            align:'center',
                            title: '金额'
                        }]
                    },
                    {
                        key:19,
                        title: '180~210',
                        children:[{
                            key:'t210qty',
                            dataIndex: 't210qty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'t210price',
                            dataIndex: 't210price',
                            align:'center',
                            title: '金额'
                        }]
                    },
                    {
                        key:22,
                        title: '210~360',
                        children:[{
                            key:'t360qty',
                            dataIndex: 't360qty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'t360price',
                            dataIndex: 't360price',
                            align:'center',
                            title: '金额'
                        }]
                    },{
                        key:25,
                        title: '360~',
                        children:[{
                            key:'tgreater360qty',
                            dataIndex: 'tgreater360qty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'tgreater360price',
                            dataIndex: 'tgreater360price',
                            align:'center',
                            title: '金额'
                        }]
                    },
                    {
                        key:28,
                        title: 'J库合计',
                        children:[{
                            key:'jkCountQty',
                            dataIndex: 'jkCountQty',
                            align:'center',
                            title: '数量'
                        },{
                            key:'jkCountPrice',
                            dataIndex: 'jkCountPrice',
                            align:'center',
                            title: '金额'
                        }]
                    }
                ]
            }
        ];
        function title(num){
            num==1?columns[0].title='J库库龄现状（实时）':columns[0].title='J库库龄现状（月底）';
            return JSON.stringify(columns);
        }
        const column1=JSON.parse(title(1));
        const column2=JSON.parse(title(2));
        return(
            <div className='JAge allBorder'>
                <Bread></Bread>
                {
                    <Row style={salt.indexOf("D")!==-1?{marginTop:'20px',borderTop:'3px solid #F0F2F5',paddingTop:'20px',paddingBottom:'10px',
                        borderBottom:'3px solid #F0F2F5'}:{marginTop:'20px',paddingTop:'20px',paddingBottom:'10px'}}>
                        {
                            salt.indexOf("D")!==-1 ?   <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} spanSize={6}/>:''
                        }
                    </Row>
                }
                <Table loading={this.state.loading} rowClassName={this.tabeRowClassName} style={{marginTop:'20px'}} rowKey='key' pagination={false} bordered size='middle' columns={column1} dataSource={this.state.data1} />
                <Table loading={this.state.loading} rowClassName={this.tabeRowClassName} style={{marginTop:'20px'}} rowKey='key' pagination={false} bordered size='middle' columns={column2} dataSource={this.state.data2} />
            </div>
        )
    }
}
export default JAge;
