import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import AddForm from './AddForm'




class user extends Component {

    state = {
        users: [],
        roles: [],
        user: {},
        isShowAdd: false

    }

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => {
                    return this.roleName[role_id]
                }
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <i style={{ marginRight: 10 }} onClick={() => { this.showUpdate(user) }}>修改</i>
                        <i onClick={() => { this.deleteUser(user) }}>删除</i>
                    </span>
                )
            }
        ]
    }

    initRoleName = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})

        this.roleName = roleNames
    }

    getUsers = async () => {
        const result = await reqUsers();
        if (result.status === 0) {
            const { users, roles } = result.data;
            this.initRoleName(roles)
            this.setState({
                users,
                roles
            })
        }
    }

    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    message.success('删除用户成功!')
                    this.getUsers()
                } else {
                    message.error('删除用户失败')
                }
            },
            onCancel() { },
        });
    }

    addUser = (params = true) => {
        this.setState({
            isShowAdd: params,
        })
    }

    addOrUpdateUser = async (user) => {
        if (!user.password) {
            user._id = this.state.users.find(users => user.username ===users.username )._id
        }
        const result = await reqAddOrUpdateUser(user);
        if (result.status === 0) {
            message.success(`${user._id ? '添加' : '修改'}用户成功!`)
            this.getUsers()
            this.addUser(false);
        } else {
            message.error(`${user._id ? '添加' : '修改'}用户失败!`)
        }
    }

    showUpdate = (user) => {
        this.setState({
            isShowAdd: true,
            user
        })
    }


    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getUsers()
    }


    render() {
        const { users, isShowAdd, roles ,user} = this.state

        const title = <Button type='primary' onClick={this.addUser}>创建用户</Button>

        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    bordered
                    dataSource={users}
                    columns={this.columns}
                    pagination={{ defaultCurrent: 5, showQuickJumper: true }}
                />
                <AddForm isShowAdd={isShowAdd} addUser={this.addUser} roles={roles} addOrUpdateUser={this.addOrUpdateUser} user={user} />
            </Card>
        );
    }
}

export default user;