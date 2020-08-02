import React, { Component } from 'react';
import logo from "./../../assets/imgs/logo.png"
import './login.less'
import { Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux'
import { Login } from '../../redux/actions'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';


class login extends Component {
    render() {
        // const user = memoryUtils.user
        const user = this.props.user
        if (user && user._id) {
            return <Redirect to="/home"></Redirect>
        }

        const errorMsg = this.props.user.errorMsg
        if (errorMsg) {
            message.error(errorMsg)
        }

        const onFinish = values => {
            const { username, password } = values
            this.props.Login(username, password)

        };

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, whitespace: true, message: '请填写您的用户名!' },
                                { min: 4, message: '用户名最少4位!' },
                                { max: 12, message: '用户名最多12位!' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或者下划线组成!' },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请填写你的密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}


export default connect(
    state => ({ user: state.user }),
    { Login }
)(login);