import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';


const { Option, OptGroup } = Select;

class AddForm extends Component {

    state = {
        data:{}
    }

    getState = ()=>{
        console.log(this);
    }


    render() {

          var onFinish = values => {
            console.log('Success:', values);
          };

        return (
            <Form
            onFinish={onFinish}
            onClick = {this.getState}
            >
                <Form.Item>
                    <Select defaultValue="lucy" style={{ width: '100%' }}>
                        <OptGroup label="Manager">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </OptGroup>
                        <OptGroup label="Engineer">
                            <Option value="Yiminghe">yiminghe</Option>
                        </OptGroup>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Input placeholder='请输入分类名称' />
                </Form.Item>

            </Form>
        );
    }
}

export default AddForm;