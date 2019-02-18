/**
 * Created by guotaidou on 2018/7/30.
 */
import React, {Component} from 'react';
import {Button,Upload,Col,Icon} from 'antd';
import  MUtil from '../../common/util/mm';
const _mm=new MUtil();
class UpLoad extends Component {
    constructor(props){
        super(props);
        this.state=({
            fileList: []
        });
    }
    excelUp = (info) => {
        //判断登陆状态
        if(_mm.loginStatus()===false){
            return;
        }
        let fileList = info.fileList;
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (info.file.status === 'error') {
                _mm.errorTips("数据异常，请联系管理员！");
                return
            }
            if (file.response) {
                _mm.errorTips(`${info.file.name} ${file.response.message}`);
                return file.response.status === 'success';
            }
            return true;
        });
        this.setState({fileList});
    };
    render(){
        let fileProps = {
            action: this.props.uploadUrl,
            onChange: this.excelUp,
            multiple: true
        };
        return(
            <Col xl={this.props.spanSize === undefined ? 2 : this.props.spanSize} style={this.props.upStyle===undefined ? {marginLeft:-1.5,marginBottom:10,} :this.props.upStyle}>
                <Upload {...fileProps} fileList={this.state.fileList} >
                    <Button type="primary">
                        <Icon type="upload"/>{this.props.buttonName}
                    </Button>
                </Upload>
            </Col>
        )
    }
}
export default UpLoad;