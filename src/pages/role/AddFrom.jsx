import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';
import PropType from 'prop-types'

class AddForm extends Component {

    static propType = {
        isShowAdd: PropType.bool.isShowAdd,
    }

    formRef = React.createRef();

    handleCancel = () => {
        Modal.destroyAll();
        this.props.showAdd(false);
    }

    handClick = (name, values) => {
        if (name === 'addRole') {
            Modal.destroyAll();
            const { roleName } = values.values
            const obj = {
                roleName: roleName
            }

            this.props.AddRole(obj)
        }
    }

    addRole = () => {
        this.formRef.current.submit();
    }

    render() {
        const { isShowAdd } = this.props

        return (

            <Form.Provider onFormFinish={this.handClick}>
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    <Form name='addRole' ref={this.formRef}>
                        <Form.Item name="roleName" label="添加角色" rules={[{ required: true, message: '角色名称必须输入' }]}>
                            <Input placeholder='请输入角色名称' />
                        </Form.Item>

                    </Form>
                </Modal>
            </Form.Provider>
        );
    }
}

export default AddForm;