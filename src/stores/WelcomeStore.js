import {computed, observable, action} from 'mobx';

export default class WelcomeStore {

  @observable text;
  @observable num;

  constructor() {
    this.num = 0;
    this.text = 'Hello Word!';
  }

  @computed
  get sum() {
    return this.num.toString() + this.text;
  }

  @action plus = () => {
    this.num = ++this.num;
  };
  @action minus = () => {
    this.num = --this.num;
  };
}


