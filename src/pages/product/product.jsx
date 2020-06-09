import React, { Component } from 'react';
import { Switch, Route ,Redirect} from 'react-router-dom'
import ProductHome from'./home'
import addUpate from './addUpate'
import detail from './detail'

class product extends Component {
    render() {
        return (
            <Switch>
                <Route path = '/product' component = {ProductHome} exact></Route>
                <Route path = '/product/addUpate' component = {addUpate} exact></Route>
                <Route path = '/product/detail' component = {detail} exact></Route>
                <Redirect to ='/product'/>
            </Switch>
        );
    }
}

export default product;