import React, { Component } from 'react';
import { Card, Form, Input, Select, Cascader, Upload, Modal, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { TextArea } = Input

class addUpate extends Component {




    render() {


        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                            },
                        ],
                    },
                ],
            },
        ];

        const title = (
            <span>
                <ArrowLeftOutlined style={{ color: '#1DA57A', marginRight: 15 }} onClick={() => this.props.history.goBack()} />
                <span>添加商品</span>
            </span>
        )

        const layout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 8,
            },
        };

        const tailLayout = {
            wrapperCol: {
                offset: 2,
                span: 8,
            },
        };

        const onFinish = values => {
            console.log('Success:', values);
        };

        return (
            <div>
                <Card title={title}>
                    <Form {...layout} onFinish={onFinish}>
                        <Form.Item
                            label="商品名称"
                            name="name"
                            rules={[{ required: true, message: '请输入商品名称' }]}
                        >
                            <Input placeholder='商品名称' />
                        </Form.Item>

                        <Form.Item
                            label="商品描述"
                            name="desc"
                            rules={[{ required: true, message: '请输入商品描述' }]}
                        >
                            <TextArea
                                placeholder="请输入商品描述"
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="商品价格"
                            name="price"
                            rules={[
                                { required: true, message: '请输入商品价格' },
                                { pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, message: '输入的价格必须大于0' },
                            ]}
                        >
                            <Input addonAfter="元" type='number' placeholder='商品价格' />
                        </Form.Item>

                        <Form.Item
                            label="商品分类"
                            name="detail"
                            rules={[{ required: true, message: '请选择商品分类' }]}
                        >
                            <Cascader options={options} placeholder="Please select" />
                        </Form.Item>

                        <Form.Item
                            label="商品图片"
                            name="imgs"
                        >
                            <Cascader options={options} placeholder="Please select" />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        );
    }
}

export default addUpate;