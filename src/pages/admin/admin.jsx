import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';
import LeftNav from '../../componrts/left-nav/left-nav';
import Header from '../../componrts/header/header';
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Pie from "../charts/pie";
import Line from "../charts/line";

const { Sider, Content } = Layout;

class admin extends Component {

    render() {
        const user =this.props.user;

        if (!user || !user._id) {
            return <Redirect to="/login"></Redirect>
        }
        return (
            <Layout style={{ minHeight: "100%" }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{ backgroundColor: "#fff",margin:20 }}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/bar' component={Bar}></Route>
                            <Route path='/pie' component={Pie}></Route>
                            <Route path='/line' component={Line}></Route>
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(
    state =>({user:state.user}),
    {}
    )(admin);