import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter  as Router} from 'react-router-dom';
import {Provider} from 'mobx-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import stores from './stores/Store';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

const Index = () => {
  return (
      <Router>
        <Provider store={stores}>
            <LocaleProvider locale={zh_CN}><App /></LocaleProvider>
        </Provider>
      </Router>
  );
};

ReactDOM.render(<Index/>, document.getElementById('root'));
registerServiceWorker();
