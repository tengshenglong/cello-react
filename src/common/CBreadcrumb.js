import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

class CBreadcrumb extends Component {
  render() {
    return (
        <Breadcrumb style={{margin: '16px 0'}}></Breadcrumb>
    );
  }
}

CBreadcrumb.propTypes = {};

export default CBreadcrumb;
