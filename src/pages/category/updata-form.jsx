import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';
import PropType from 'prop-types'


class UpdateForm extends Component {

    static propType = {
        category: PropType.string.isRequire,
        updateCategory:PropType.func.isRequire
    }

    formRef = React.createRef();

    handleCancel = () => {
        Modal.destroyAll();
        this.props.showAdd(false);
    }

    handClick = (name, values) => {
        if (name === 'modalform') {
            Modal.destroyAll();
            this.props.updateCategory(values.values.inpitarf ? values.values.inpitarf : this.props.category.name)
        }
    }

    handleOk = () => {
        this.formRef.current.submit();
        // this.formRef.current.resetFields();
    }

    render() {
        const { showStatus, category } = this.props

        return (

            <Form.Provider onFormFinish={this.handClick}>
                <Modal
                    title="更新分类"
                    visible={showStatus === 3}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form name='modalform' ref={this.formRef} 
                        initialValues={{
                            inpitarf: category.name,
                            
                        }}
                    >
                        <Form.Item name="inpitarf" rules={[{ required: true, message: '分类名称必须输入' }]}>
                            <Input placeholder='请输入分类名称' />
                        </Form.Item>
                    </Form>
                </Modal>
            </Form.Provider>
        );
    }
}

export default UpdateForm;