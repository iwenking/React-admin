import React, { Component } from 'react';
import { Card, Select, Button, Input, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const Option = Select.Option;

class ProductHome extends Component {

    state = {
        products: []
    }

    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                width:100,
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                render: () => {
                    return (
                        <span>
                            <i>详情</i>
                            <i>修改</i>
                        </span>
                    )
                }
            },
        ];
    }

    componentWillMount() {
        this.initColumns()
    }

    render() {
        const { products } = this.state;

        const title = (
            <span>
                <Select style={{ width: 150 }}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描叙搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} />
                <Button type='primary'>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary'>
                <PlusOutlined />
                添加商品
            </Button>
        )

        return (
            <div>
                <Card title={title} extra={extra} >
                    <Table dataSource={products} columns={this.columns} rowKey='_id' bordered />
                </Card>
            </div>
        );
    }
}

export default ProductHome;