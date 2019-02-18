import {observable, action} from 'mobx';
import Config from '../../common/Config';
import React from 'react';
import {Input} from 'antd';
import {computed} from "mobx/lib/mobx";


const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

export default class ServiceShopStore {

    @observable serviceStore;
    @observable regionName;
    @observable list;
    @observable data;
    @observable count;
    @observable addable;
    @observable cacheData;


    constructor() {
        this.serviceStore = '';
        this.regionName = '';
        this.list = [];
        this.data = [];
        this.count = 0;
        this.addable = false;
        this.cacheData = [];
    }

    @action
    conditionChange= (e) =>{
        if (e.target.name==="serviceStore") {
            this.serviceStore = e.target.value;
        }else{
            this.regionName = e.target.value;
        }
    };
    @action
    renderColumns= (text, record, column) => {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    };
    @action
    handleChange= (value, key, column) => {
        const newData = this.data;
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            target[column] = value;
            this.data=newData;
        }
    };
    @action
    edit= (key) => {
        this.addable=true ;
        const newData = this.data;
        const target = newData.filter(item => key === item.id)[0];

        if (target) {
            target.editable = true;
            this.data=newData;
        }
    };
    @action
    save= (record,type) => {
        const newData = this.data;
        const target = newData.filter(item => record.id === item.id)[0];
        if (target) {
            delete target.editable;
            delete target.type;
            this.data=newData;
            this.cacheData = newData.map(item => ({ ...item }));
        }
    };
    @action
    cancel= (key) => {
        const newData = this.data;
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
            delete target.editable;
            this.data=newData;
        }
    };

    @action
    handleAdd = () => {
        const { count, data } = this;

        const newData = {id:count + 1,serviceStore:'',city:'',regionName:'',type:true};
        newData.editable = true;
        this.data=[newData,...data];
        this.count=count + 1;
    };
    @action
    onDelete = (key) => {
        const dataSource = [...this.data];
        this.data= dataSource.filter(item => item.id !== key);
    };
    @action
    fetchOrders = () => {
        const { count, data } = this;
        this.data=[{id:'1',serviceStore:'123',city:'333',regionName:'3333'},
                    {id:'2',serviceStore:'123',city:'333',regionName:'3333'}];
        this.count=count + 1;

        this.cacheData=[{id:'1',serviceStore:'123',city:'333',regionName:'3333'}];
    };
}