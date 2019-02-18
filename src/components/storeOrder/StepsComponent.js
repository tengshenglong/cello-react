import React, {Component,PureComponent } from 'react';
import Bread from '../../common/Bread';
import '../../common/css/baseStyle.css';
import '../../common/css/StepsComponent.css';
import  MUtil from '../../common/util/mm';
const _mm=new MUtil();
import { Steps, Button, message } from 'antd';
const Step = Steps.Step;

const stepsComponent = [{
    title: 'First',
    content: <div style={{color:'red'}}>填自己的内容，内容多可以单拿出一个页面引入进来。</div>,
}, {
    title: 'Second',
    content: 'Second-content',
}, {
    title: 'Last',
    content: 'Last-content',
}];
class StepsComponent extends Component  {


    constructor(props) {
        super(props);

        this.state = {
            current: 0,
        };
    }
    componentWillMount(){
        _mm.BrowerHeadTitle();
        //判断登陆状态
        if(_mm.loginStatus()===false){
            return;
        }
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const { current } = this.state;
        return <div className='allBorder'>

            <Bread/>
            <Steps current={current}>
                {stepsComponent.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">{stepsComponent[this.state.current].content}</div>
            <div className="steps-action">
                {
                    this.state.current < stepsComponent.length - 1
                    &&
                    <Button type="primary" onClick={() => this.next()}>Next</Button>
                }
                {
                    this.state.current === stepsComponent.length - 1
                    &&
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                }
                {
                    this.state.current > 0
                    &&
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()} >
                        Previous
                    </Button>
                }
            </div>
        </div>;
    }
}


export default StepsComponent;
