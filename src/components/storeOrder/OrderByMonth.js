import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Col,Table,List,Card} from 'antd';
import moment from 'moment';
import Cookies from 'js-cookie';
import Bread from '../../common/Bread';//头部面包屑导航组件
import  MUtil from '../../common/util/mm';//公共函数
import Config from '../../common/Config';//地址配置信息
import AlertInfo from '../../common/commonComponents/AlertInfo';//提示信息组件
import ConditionHeader from '../../common/commonComponents/ConditionHeader';//查询条件组件
import commonStore from '../../stores/commonStore/commonStore';
import DownloadComponent from "../../common/commonComponents/DownloadComponent";
const _mm=new MUtil();
@inject('store')
@observer
class OrderByMonth extends Component {
  constructor(props) {
    super(props);
    this.store=new commonStore();
    this.store.dataList=[];
    this.store.masterTotalNum='';
    this.store.masterTotalAmount='';
    this.store.bangTotalNum='';
    this.store.bangTotalAmount='';
    this.state={
      month:_mm.getCurrentTime('month').format('YYYY-MM'),//月份时间
      monthFormat:'YYYY-MM',
      invsort:'',//产品组
      matnr:'',//物料编码
      currentUserId:Cookies.get('username')//用户ID
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
  //获取查询条件数据
  receiveData=(data)=>{
    this.setState(data)
  };
  //发送fetch请求
  fetch=()=>{
    let url=`${Config.REPORT_URL_PREFIX}order-store/byMonth?currentUserId=${this.state.currentUserId}`
        +`&month=${this.state.month}&invsort=${this.state.invsort}&mantr=${this.state.matnr}`;
    this.store.fetchData(url);
  };
  render() {
    //table表头文字
    const columns = [
      {
        title: '出库月份',
        key: 'gmtCreate',
        align:'center',
        render: ((order) => (
            <span title ={moment(order.gmtCreate).format(this.state.monthFormat)}> {moment(order.gmtCreate).format(this.state.monthFormat)} </span>))
      },
      {
        title: '产品组',
        dataIndex: 'invSort',
        align:'center',
        key: 'invSort',
        render: function(data) {
          return <span title ={data}>{data}</span>;
        }
      }, {
        title: '物料编码',
        dataIndex: 'matCode',
        align:'center',
        key: 'matCode',
        render: function(data) {
          return <span title ={data}>{data}</span>;
        }
      }, {
        title: '型号描述',
        dataIndex: 'matName',
        align:'center',
        key: 'matName',
        render: function(data) {
          return <span title ={data}>{data}</span>;
        }
      }, {
        title: '（主+帮）数量',
        dataIndex: 'orderAmt',
        align:'center',
        key: 'orderAmt',
        render: function(data) {
          return <span title ={data}>{data}</span>;
        }
      }, {
        title: '主站数量',
        dataIndex: 'siteOrderAmt',
        align:'center',
        key: 'siteOrderAmt',
        render: function(data) {
          return <span title ={data}>{data}</span>;
        }
      }, {
        title: '京东帮数量',
        dataIndex: 'jdbOrderAmt',
        align:'center',
        key: 'jdbOrderAmt',
        render: function(data) {
          return <span title ={data}>{data}</span>;
        }
      }, {
        title: '海尔供价',
        dataIndex: 'unitPrice',
        align:'center',
        key: 'unitPrice',
        render: function(data) {
          return <span title ={data}>{data}</span>;
        }
      }, {
        title: '海尔开票价',
        key: 'retailPrice',
        align:'center',
        dataIndex: 'retailPrice',
        render: function(data) {
          return <span title ={data}>{data}</span>;
        }
      }, {
        title: '供价总额',
        align:'center',
        key: 'unitTotle',
        render: ((order) => (
            <span title ={(order.unitPrice * order.orderAmt).toFixed(2)}>{(order.unitPrice * order.orderAmt).toFixed(2)}</span>
        )
        )
      }, {
        title: '开票价总额',
        align:'center',
        key: 'retailTotle',
        render: ((order) =>(
            <span title ={(order.retailPrice * order.orderAmt).toFixed(2)}>{(order.retailPrice * order.orderAmt).toFixed(2)}</span>
        )
        )
      }

    ];
    const data = [
      {
        title: '主站出库总数',
        value: this.store.masterTotalNum
      },
      {
        title: '主站开票总额',
        value: this.store.masterTotalAmount
      },
      {
        title: '京东帮出库总数',
        value: this.store.bangTotalNum
      },
      {
        title: '京东帮开票总额',
        value: this.store.bangTotalAmount
      }
    ];
    //下载地址
    let downloadUrl =`${Config.REPORT_URL_PREFIX}order-store/export/byMonth?currentUserId=${this.state.currentUserId}`
        +`&month=${this.state.month}&invsort=${this.state.invsort}`;
    let salt = JSON.parse(localStorage.a).salt.toString();
    return (
        <div className='allBorder'>
          <Bread></Bread>
          <ConditionHeader
                           search='true'
                           month='true'
                           invsort='true'
                           matnr='true'
                           receiveData={this.receiveData}
                           fetch={this.fetch}>
              {
                  salt.indexOf('D')!==-1 ? <DownloadComponent downLoadUrl={downloadUrl} buttonName={'下载'} downStyle={{marginBottom:-10}}/>:''
              }
          </ConditionHeader>
          <AlertInfo/>
          <List style={{marginTop:'20px'}}
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card style={{
                        textAlign:'center'}}
                         title={item.title}>{item.value}</Card>
                    </List.Item>
                )}
              />
          <Table loading={this.store.loading}
                 pagination={{ current:this.store.currentPage,
                 onChange:this.store.pageChange}}
                 bordered size='middle'
                 dataSource={this.store.dataList}
                 columns={columns}  />
        </div>
    );
  }
}

OrderByMonth.propTypes = {};

export default OrderByMonth;
