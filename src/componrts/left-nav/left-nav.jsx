import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import './index.less'



const { SubMenu } = Menu;

class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            } else {

                const cItem = item.children.find(cItem => cItem.key === path); 
                if (cItem) {
                    this.openKey = item.key;
                }
                return (
                    <SubMenu key={item.key} title={item.title} icon={item.icon}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentWillMount(){
        this.meunNodes = this.getMenuNodes(menuList)
    }

    render() {

        const path = this.props.location.pathname;
        const openKey = this.openKey;

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
                    selectedKeys={[path]}
                    defaultOpenKeys = {[openKey]}
                >
                    {
                        this.meunNodes
                    }
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftNav);