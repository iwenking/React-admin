import React, { Component } from 'react';
import { Card, Table, Button, message } from 'antd';
import { reqRoles, reqAddRole, reqUpdataRole } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from "../../utils/memoryUtils";
import storageUtile from "../../utils/storageUtile";
import AddForm from './AddFrom'
import RolePerm from './rolePerm'

class role extends Component {

    state = {
        roles: [],//所有的roles
        role: {},//选中的role
        isShowAdd: false,
        isRolePerm: false
    }


    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: (auth_time) => formateDate(auth_time)
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
                role.menus.shift()
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
        } else {
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

    updateRole = (flage = true) => {
        this.setState({ isRolePerm: flage })
    }

    showAdd = (flage = true) => {
        this.setState({ isShowAdd: flage })
    }

    UpdataRole = async (params) => {
        params.auth_time = Date.now();
        const result = await reqUpdataRole(params);

        if (result.status === 0) {
            
            this.updateRole(false)

            if (params._id === memoryUtils.user.role_id) {
                console.log('aaaa');
                memoryUtils.user = {}
                storageUtile.removeUser()
                this.props.history.replace('/login')
                message.success('当前角色权限修改成功,请重新登录!')
            } else {
                message.success('设置角色权限成功！')
                this.getRoles()
            }
        } else {
            message.error('设置角色权限失败！')
        }
        console.log(params);
    }

    componentDidMount() {
        this.getRoles()
    }

    render() {

        const { roles, role, isShowAdd, isRolePerm } = this.state;

        const title = (
            <span>
                <Button type='primary' style={{ marginRight: '15px' }} onClick={this.showAdd}>创建角色</Button >
                <Button type='primary' disabled={!role._id} onClick={this.updateRole}>设置角色权限</Button >
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
                    <RolePerm isRolePerm={isRolePerm} role={role} updateRole={this.updateRole} UpdataRole={this.UpdataRole} />
                </Card>
            </div>
        );
    }
}

export default role;