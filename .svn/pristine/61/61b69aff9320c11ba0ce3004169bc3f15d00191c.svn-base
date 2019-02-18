/**
 * Created by guotaidou on 2018/6/1.
 */
import React from 'react';
import {computed, observable, action} from 'mobx';




export default class LoginStatusStore {
    @observable loginStatus=[];

    @action receiveStatus = (data) => {
        this.loginStatus=data;
        console.log(this.loginStatus)
    }
}