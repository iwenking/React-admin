import React, { Component } from 'react';
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig';
import './index.less'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {logout} from '../../redux/actions'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class header extends Component {

    state = {
        currentTime: formateDate(Date.now())
    }

    getTime = () => {
        this.timer = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000);
    }

    getTitle = () => {
        const path = this.props.location.pathname;
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title

    }

    logout = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定退出吗？',
            onOk: () => {
                this.props.logout()
            }
        });
    }

    componentDidMount() {
        this.getTime()
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const { currentTime } = this.state;
        const username = this.props.user.username;
        // const title = this.getTitle()
        const title = this.props.headTitle
        return (
            <div className='header'>
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <i onClick={this.logout}>退出</i>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ headTitle: state.headTitle ,user:state.user}),
    {logout}
)(withRouter(header));