import React, { Component } from 'react';
import { Form, Input, Select, Modal } from 'antd';

const { Option, OptGroup } = Select;

class AddForm extends Component {

    formRef = React.createRef();

    handleCancel = () => {
        Modal.destroyAll();
        this.props.showAdd(false);
    }

    handClick = (name, values) => {
        if (name === 'modalform') {
            Modal.destroyAll();
            console.log('结果', values.values, values.forms);
        }
    }

    handleOk = () => {
        this.formRef.current.submit();
    }

    render() {
        const { showStatus } = this.props

        return (

            <Form.Provider onFormFinish={this.handClick}>
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form name='modalform' ref={this.formRef}>
                        <Form.Item name="selectoption">
                            <Select defaultValue="lucy" style={{ width: '100%' }}>
                                    
                            </Select>
                        </Form.Item>

                        <Form.Item name="inpitarf">
                            <Input placeholder='请输入分类名称' />
                        </Form.Item>

                    </Form>
                </Modal>
            </Form.Provider>
        );
    }
}

export default AddForm;