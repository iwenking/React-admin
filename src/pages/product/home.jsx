import React, { Component } from 'react';
import { Card, Select, Button, Input, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option;

class ProductHome extends Component {

    state = {
        products: [],
        total: 0,
        searchName: '',
        seachType: 'productName',
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
                width: 100,
                title: '状态',
                render: (product) => {
                    const { status, _id } = product;
                    const newStatus = status === 1 ? 2 : 1;
                    return (
                        <span>
                            <Button type='primary' onClick={()=>this.updataStatus(_id, newStatus)}>{status === 1 ? '下架' : '上架'}</Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <i onClick={() => this.props.history.push('/product/detail', { product })}>详情</i><br />
                            <i>修改</i>
                        </span>
                    )
                }
            },
        ];
    }
    getProducts = async (pageNum = 1) => {
        this.pageNum = pageNum
        const { searchName, seachType } = this.state;
        let res;
        if (searchName) {
            res = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, seachType })
        } else {
            res = await reqProducts(pageNum, PAGE_SIZE);
        }



        if (res.status === 0) {
            const { total, list } = res.data;
            this.setState({
                total,
                products: list
            })
        }
    }

    updataStatus = async(productId, status) => {
        const res = await reqUpdateStatus(productId, status);
        if (res.status === 0) {
            message.success('更新商品成功');
            this.getProducts(this.pageNum)
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        const { products, total, searchName, seachType } = this.state;

        const title = (
            <span>
                <Select defaultValue={seachType} style={{ width: 150 }} onChange={value => this.setState({ seachType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描叙搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} defaultValue={searchName} onChange={event => this.setState({ searchName: event.target.value })} />
                <Button type='primary' onClick={() => { this.getProducts() }}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/product/addUpate')}>
                <PlusOutlined />
                添加商品
            </Button>
        )

        return (
            <div>
                <Card title={title} extra={extra} >
                    <Table dataSource={products} columns={this.columns} rowKey='_id' bordered
                        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true, total: total, onChange: this.getProducts }} />
                </Card>
            </div>
        );
    }
}

export default ProductHome;