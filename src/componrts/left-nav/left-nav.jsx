import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

import './index.less'



const { SubMenu } = Menu;

class LeftNav extends Component {
    render() {
        return (
            <div>
                <Link className="left-nav" to="/">
                    <header className="left-nav-header">
                        <img src="/images/logo.png" alt="logo" />
                        <h1>管理后台</h1>
                    </header>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                            首页
                    </Menu.Item>
                
                    <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                        <Menu.Item key="5" icon={<PieChartOutlined />}>品类管理</Menu.Item>
                        <Menu.Item key="6" icon={<PieChartOutlined />}>商品管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="9" icon={<PieChartOutlined />}>Option 9</Menu.Item>
                        <Menu.Item key="10" icon={<PieChartOutlined />}>Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default LeftNav;