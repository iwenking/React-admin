import React, { Component } from 'react';
import { Card, Table, Button, message } from 'antd';
import { reqRoles, reqAddRole } from '../../api'
import AddForm from './AddFrom'

class role extends Component {

    state = {
        roles: [],//所有的roles
        role: {},//选中的role
        isShowAdd: false,
    }


    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }

    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
            },
        }
    }

    AddRole = async (params) => {
        const result = await reqAddRole(params);
        if (result.status === 0) {
            this.showAdd(false)
            this.getRoles()
            message.success('添加角色成功!')
        }else{
            message.error('添加角色失败!')
        }
    }

    componentWillMount() {
        this.initColumns()
    }
    getRoles = async () => {
        const result = await reqRoles();
        if (result.status === 0) {
            const roles = result.data
            this.setState({
                roles
            })
        }
    }

    showAdd = (flage = true) => {
        this.setState({ isShowAdd: flage })
    }

    componentDidMount() {
        this.getRoles()
    }




    render() {

        const { roles, role, isShowAdd } = this.state;

        const title = (
            <span>
                <Button type='primary' style={{ marginRight: '15px' }} onClick={this.showAdd}>创建角色</Button >
                <Button type='primary' disabled={!role._id}>设置角色权限</Button >
            </span>
        )

        return (

            <div>
                <Card title={title} >
                    <Table
                        rowKey='_id'
                        bordered
                        dataSource={roles}
                        columns={this.columns}
                        pagination={{ defaultCurrent: 5, showQuickJumper: true }}
                        rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
                        onRow={this.onRow}
                    />
                    <AddForm isShowAdd={isShowAdd} showAdd={this.showAdd} AddRole={this.AddRole} />
                </Card>
            </div>
        );
    }
}

export default role;