/**
 * Created by 郭泰斗 on 2018/5/14.
 *
 */
import React from 'react';
import { Modal, Button } from 'antd';
import Cookies from 'js-cookie';
import moment from 'moment';

export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - day * oneDay;

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1, 'months');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
        ];
    }

    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

class MUtil{
    constructor() {
        this.downLoad = this.downLoad.bind(this);
        this.errorTips = this.errorTips.bind(this);
        this.loginStatus = this.loginStatus.bind(this);
    }
    //发送Fetch请求GET
    fetchData(url){
        if(this.loginStatus()==false){
            return;
        }
        this.FetchUtil.init()
            .setUrl(url)
            .setHeader({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .dofetch()
            .then((data) => {
                if(data.dataList.length!=0){
                    resolve(data)
                }else{
                    this.errorTips('没有数据！');
                    return data;
                }
            })
            .catch((error) => {
                this.errorTips('数据接口发生错误！')
            });
    }
    //获取当前年份
    getCurrentTime(status){
        if(status=='year'){
            const date=new Date;
            const currentYear=date.getFullYear();
            return currentYear;
        }else if(status=='month'){
            return moment();
        }
    }
    //判断登陆状态
    loginStatus(){
        if(!Cookies.get('username')){
            window.location.href='#/login';
            return false;
        }else{
            const inFifteenMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
            Cookies.set('username', Cookies.get('username'), { expires: inFifteenMinutes, path: '' });
        }
    }
    //浏览器头部页面标题
    BrowerHeadTitle(){
        let hash=window.location.hash.replace("#","");
        if(hash=='/login'){
            document.title='登陆页面';
        }else if(hash=='/'){
            document.title='欢迎页面';
        }else{
            let sliderList=JSON.parse(localStorage.a).rs;
            sliderList.map((data,index)=>{
                if(data.url==hash){
                    document.title=data.name;
                }
            });
        }
    }
    //发送fetch请求
    FetchUtil = {
        init(){
            this.url = '';
            this.method = 'GET';
            this.headers = {};
            this.body_type = 'form';
            this.bodys = {};
            this.credentials = 'omit';
            this.return_type = 'json';
            this.overtime = 0;
            this.firstThen = undefined;
            return this;
        },
        setUrl(url){
            this.url = url;
            return this;
        },
        setMethod(val){
            this.method = val;
            return this;
        },
        setBodyType(val){
            this.body_type = val;
            return this;
        },
        setReturnType(val){
            this.return_type = val;
            return this;
        },
        setOvertime(val){
            this.overtime = val;
            return this;
        },
        setHeader(name, val = null){
            if (typeof name == 'string') {
                this.headers[name] = val;
            } else if (typeof name == 'object') {
                Object.keys(name).map((index)=> {
                    this.headers[index] = name[index];
                });
            }
            return this;
        },
        setBody(name, val = null){
            if (typeof name == 'string') {
                this.bodys[name] = val;
            } else if (typeof name == 'object') {
                Object.keys(name).map((index)=> {
                    this.bodys[index] = name[index];
                });
            }
            return this;
        },
        setCookieOrigin(){
            this.credentials = 'same-origin';
            return this;
        },
        setCookieCors(){
            this.credentials = 'include';
            return this;
        },
        thenStart(then) {
            this.firstThen = then;
            return this;
        },
        dofetch(){
            let options = {};
            options.method = this.method;
            options.credentials = this.credentials;
            options.headers = this.headers;
            if ({} != this.bodys && this.method != 'GET') {
                if ('form' == this.body_type) {
                    this.setHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                    let data = '';
                    Object.keys(this.bodys).map((index) => {
                        let param = encodeURI(this.bodys[index]);
                        data += `${index}=${param}&`;
                    });
                    options.body = data;
                } else if ('file' == this.body_type) {
                    let data = new FormData();
                    Object.keys(this.bodys).map((index) => {
                        data.append(index, this.bodys[index]);
                    });
                    options.body = data;
                } else if ('json' == this.body_type) {
                    options.body = JSON.stringify(this.bodys);
                }
            }

            return Promise.race([
                fetch(this.url, options),
                new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error('request timeout')), this.overtime ? this.overtime : 30 * 60 * 1000);
                })
            ]).then(
                (response) => {
                    if (response.status == 200) {
                        if (this.firstThen) {
                            let tempResponse = this.firstThen(response);
                            if (tempResponse) {
                                return tempResponse;
                            }
                        }
                        return response;
                    }
                    else {
                        throw "请求数据发生错误，请联系技术人员";
                    }
                }
            ).then(
                (response) => {
                    if ('json' == this.return_type) {
                        return response.json();
                    } else if ('text' == this.return_type) {
                        return response.text();
                    } else if ('blob' == this.return_type) {
                        return response.blob();
                    } else if ('formData' == this.return_type) {
                        return response.formData();
                    } else if ('arrayBuffer' == this.return_type) {
                        return response.arrayBuffer();
                    }
                }
            );
        }

    };
    doLogin(){
        //跳转登陆
        window.location.href='/login?redirect='+encodeComponet(window.location.pathname)+'';
    }
    //获取参数
    getUrlParam(name){
        let queryString=window.location.search.split('?')[1]||'';
        let reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
        let result=queryString.match(reg);
        return result? decodeURIComponent(result[2]):null;
    }
    //公共弹出层
    errorTips(errMsg){
        errMsg=errMsg||'好像哪里不对了~';
        Modal.info({
            title: '提示信息',
            content: (
                <div>
                    <p>{errMsg}</p>
                </div>
            ),
            onOk() {}
        });
    }
    //公共下载函数
    downLoad(url,start,end){
        //判断登陆状态
        if(this.loginStatus()==false){
            return;
        }
        if(start){
            const myDate = new Date();
            const year = myDate.getFullYear();
            const startDate = new Date(start).getTime();
            const endDate = new Date(end).getTime();
            const now6 = new Date(`${year}-06-18`).getTime();
            const now11 = new Date(`${year}-11-11`).getTime();
            if(startDate!=endDate){
                if(now6==startDate||now6==endDate||now11==startDate||now11==endDate){
                    this.errorTips('618和双11只能查询单天，不能在区间当中！');
                    return;
                }else{
                    if((now6>startDate&&now6<endDate)||(now11>startDate&&now11<endDate)){
                        this.errorTips('618和双11只能查询单天，不能在区间当中！');
                        return;
                    }
                }
            }
            const date=new Date(endDate).getTime()-new Date(startDate).getTime();
            const days=Math.floor(date/(24*3600*1000));
            if(days>7){
                this.errorTips("时间间隔不能大于7天");
                return;
            }
            window.location.href= url;
        }else{
            window.location.href= url;
        }
    }
}

export default MUtil;