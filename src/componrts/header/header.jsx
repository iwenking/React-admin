import React, { Component } from 'react';
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'
class header extends Component {

    state = {
        currentTime : formateDate(Date.now())
    }

    getTime=()=>{
        setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000);
    }

    componentDidMount (){
        this.getTime()
    }

    render() {
        const {currentTime} = this.state;
        const username = memoryUtils.user.username;
        return (
            <div className='header'>
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <i>退出</i>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default header;