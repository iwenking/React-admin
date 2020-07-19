import React, { PureComponent } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import PropType from 'prop-types'

const { Option } = Select;

class AddForm extends PureComponent {

    static propType = {
        isShowAdd: PropType.bool.isRequired,
        roles: PropType.array.isRequired,
        user: PropType.object.isRequired
    }

    formRef = React.createRef();

    handleCancel = () => {
        Modal.destroyAll();
        this.props.addUser(false);
        window.location.reload()
    }

    handClick = (name, values) => {
        if (name === 'addRole') {
            Modal.destroyAll();
            const obj = {
                ...values.values
            }

            this.props.addOrUpdateUser(obj)
        }
    }

    addRole = () => {
        this.formRef.current.submit();
    }

    render() {
        const { isShowAdd, roles, user } = this.props
        const tailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };

        return (

            <Form.Provider onFormFinish={this.handClick}>
                <Modal
                    title={user ? '修改用户' : '添加用户'}
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    <Form name='addRole' ref={this.formRef}
                        {...tailLayout}
                        initialValues={{
                            _id: user._id,
                            username: user.username,
                            password: user.password,
                            phone: user.phone,
                            email: user.email,
                            role_id: user.role_id,
                        }}
                    >
                        <Form.Item name="username" label="用户名" rules={[{ required: true, message: '用户名必须输入' }]}>
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                        {
                            user._id ? null : (
                                <Form.Item name="password" label="密码" rules={[{ required: true, message: '密码必须输入' }]}>
                                    <Input type='password' placeholder='请输入密码' />
                                </Form.Item>
                            )
                        }

                        <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '手机号必须输入' }]}>
                            <Input placeholder='请输入手机号' />
                        </Form.Item>
                        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '邮箱必须输入' }]}>
                            <Input placeholder='请输入邮箱' />
                        </Form.Item>

                        <Form.Item name="role_id" label="角色" rules={[{ required: true, message: '角色必须选择' }]}>
                            <Select placeholder='请选择角色'>
                                {
                                    roles.map(role => {
                                        return <Option key={role._id} value={role._id}>{role.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal>
            </Form.Provider>
        );
    }
}

export default AddForm;