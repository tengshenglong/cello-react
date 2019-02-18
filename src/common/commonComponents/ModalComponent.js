/**
 * Created by guotaidou on 2018/8/2.
 */
import React, {Component} from 'react';
import {Button,Modal} from 'antd';
class ModalComponent extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
    handleCancel = (e) => {
        this.props.hide();
    };
    render(){
        return(
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.props.visible}
                    keyboard='true'
                    title={this.props.modalTitle}
                    width='1200px'
                    footer={null}
                    destroyOnClose='true'
                    //onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    {
                        React.Children.map(this.props.children, function (child,index) {
                            return <div span={3} key={index}>{child}</div>;
                        })
                    }
                </Modal>
            </div>
        )
    }
}
export default ModalComponent;