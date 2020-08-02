import React, { Component } from 'react';
import { Form, Input, Modal, Tree } from 'antd';
import PropType from 'prop-types'
import menuList from '../../config/menuConfig';


class rolePerm extends Component {

    static propType = {
        isRolePerm: PropType.bool.isRolePerm,
        role: PropType.object.role
    }
    state = {
        treeData: [],
        checkedKeys:[]
    }

    formRef = React.createRef();

    updateRole = () => {
        this.formRef.current.submit();
    }

    handleCancel = () => {
        this.props.updateRole(false);
        Modal.destroyAll();
        window.location.reload()
    }

    handClick = (name, values) => {
        if (name === 'addRole') {
            Modal.destroyAll();
            let obj = {...this.props.role}
            obj.menus = this.state.checkedKeys
            this.props.UpdataRole(obj)
        }
    }

    getTreeData = () => {
        let treeData = [];
        menuList.forEach((item, index) => {
            treeData.push({
                title: item.title,
                key: item.key,
            })

            if (!!item.children) {
                treeData[index].children = []
                item.children.forEach(idx => {
                    treeData[index].children.push({
                        title: idx.title,
                        key: idx.key,
                    })
                })
            }
        })

        this.setState({
            treeData
        })
    }

    onCheck = checkedKeys => {
        this.setState({checkedKeys})
    };

    componentWillMount() {
        
        this.getTreeData()
    }

    componentWillReceiveProps(nextProps){
        const role = nextProps.role;
        this.setState({
            role
        })
    }

    render() {
        const { isRolePerm, role } = this.props
        const { treeData } = this.state

        return (
            <Form.Provider onFormFinish={this.handClick}>
                <Modal
                    title="设置角色权限"
                    visible={isRolePerm}
                    onOk={this.updateRole}
                    onCancel={this.handleCancel}
                >
                    <Form name='addRole' ref={this.formRef}
                        initialValues={{
                            role: role.name,

                        }}
                    >
                        <Form.Item name="role" label="角色名称">
                            <Input disabled />
                        </Form.Item>

                        <Tree
                            checkable
                            defaultExpandAll={true}
                            defaultCheckedKeys={role.menus}
                            treeData={treeData}
                            onCheck={this.onCheck}
                        />

                    </Form>
                </Modal>
            </Form.Provider>
        );
    }
}

export default rolePerm;