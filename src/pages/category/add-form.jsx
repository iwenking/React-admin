import React, { Component } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import PropType from 'prop-types'

const { Option } = Select;

class AddForm extends Component {

    static propType = {
        showStatus: PropType.number.isRequire,
        showAdd: PropType.func.isRequire,
        addCategory: PropType.func.isRequire,
        parentId: PropType.string.isRequired,
        categorys: PropType.array.isRequired
    }

    formRef = React.createRef();

    handleCancel = () => {
        Modal.destroyAll();
        this.props.showAdd(false);
    }

    handClick = (name, values) => {
        if (name === 'modalform') {
            Modal.destroyAll();
            const { parentId, categoryName } = values.values
            const obj = {
                parentId: parentId || this.props.parentId,
                categoryName: categoryName
            }

            this.props.addCategory(obj)
        }
    }

    handleOk = () => {
        this.formRef.current.submit();
    }

    render() {
        const { showStatus, categorys, parentId } = this.props

        return (

            <Form.Provider onFormFinish={this.handClick}>
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form name='modalform' ref={this.formRef}>
                        <Form.Item name="parentId">
                            <Select defaultValue={parentId} style={{ width: '100%' }}>
                                <Option value='0'>一级分类</Option>
                                {
                                    categorys.map(item =>
                                        <Option value={item._id} key={item._id}>{item.name}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item name="categoryName" rules={[{ required: true, message: '分类名称必须输入' }]}>
                            <Input placeholder='请输入分类名称' />
                        </Form.Item>

                    </Form>
                </Modal>
            </Form.Provider>
        );
    }
}

export default AddForm;