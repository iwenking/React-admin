import React, { Component } from 'react';
import { Card, Form, Input, Cascader, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCategorys, resAddOrUpdateProduct } from '../../api/index'
import PicturesWall from './PicturesWall'
import RichTestEditor from './richTestEditor'

const { TextArea } = Input


class addUpate extends Component {

    state = {
        options: [],
    }
    constructor(props) {
        super(props)
        //创建用来保存ref标识的标签对象的容器
        this.Pictures_wall = React.createRef()
        this.richTest_editor = React.createRef()
    }

    initOptions = async (categorys) => {
        const options = categorys.map(c => ({
            label: c.name,
            value: c._id,
            isLeaf: false,
        }))

        const { isUpdate, product } = this;
        const { pCategoryId } = product;

        if (isUpdate && pCategoryId !== '0') {
            const subCategorys = await this.getCategorys(pCategoryId);
            const childrenOptions = subCategorys.map(c => ({
                label: c.name,
                value: c._id,
                isLeaf: true,
            }))

            const targetOption = options.find(option => option.value === pCategoryId);
            targetOption.children = childrenOptions;

        }

        this.setState({ options })
    }

    getCategorys = async (parentId = 0) => {
        const res = await reqCategorys(parentId);
        if (res.status === 0) {
            const categorys = res.data;
            if (parentId === 0) {
                this.initOptions(categorys)
            } else {
                return categorys
            }
        }
    }

    componentDidMount() {
        this.getCategorys()
    }
    componentWillMount() {
        const product = this.props.location.state;
        this.isUpdate = !!product;
        this.product = product || {};
    }

    loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        const subCategorys = this.getCategorys(targetOption.value);


        targetOption.loading = false;

        if (subCategorys && subCategorys.length > 0) {
            const coptions = subCategorys.map(c => ({
                label: c.name,
                value: c._id,
                isLeaf: true,
            }))
            targetOption.children = coptions
        } else {
            targetOption.isLeaf = true
        }

        this.setState({
            options: [...this.state.options],
        });


    };



    render() {
        const { isUpdate, product } = this;
        const { pCategoryId, categoryId, imgs, detail } = product;
        const categoryIds = [];
        if (isUpdate) {
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

        const title = (
            <span>
                <ArrowLeftOutlined style={{ color: '#1DA57A', marginRight: 15 }} onClick={() => this.props.history.goBack()} />
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
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

        const onFinish = async values => {
            const imgs = this.Pictures_wall.current.getItems();
            const detail = this.richTest_editor.current.getDetail();
            values.imgs = imgs
            values.detail = detail

            const { name, desc, price, categoryIds } = values
            let pCategoryId, categoryId;
            if (categoryIds.length === 1) {
                pCategoryId = '0'
                categoryId = categoryIds[0]
            } else {
                pCategoryId = categoryIds[0]
                categoryId = categoryIds[1]
            }

            const product = { name, desc, price, imgs, detail, pCategoryId, categoryId }

            if (isUpdate) {
                product._id = this.product._id
            }
            const result = await resAddOrUpdateProduct(product)
            if (result.status === 0) {
                message.success(`${isUpdate ? '更新' : '添加'}商品成功!`);
                this.props.history.goBack()
            } else {
                message.error(`${isUpdate ? '更新' : '添加'}商品失败!`);
            }
        };

        return (

            <div>
                <Card title={title}>
                    <Form {...layout} onFinish={onFinish}
                        initialValues={{
                            name: product.name,
                            desc: product.desc,
                            price: product.price,
                            categoryIds: categoryIds
                        }}
                    >
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
                            name="categoryIds"
                            rules={[{ required: true, message: '请选择商品分类' }]}
                        >
                            <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                placeholder='请指定商品分类'
                            />
                        </Form.Item>

                        <Form.Item
                            label="商品图片"
                            name="imgs"
                        >
                            <PicturesWall ref={this.Pictures_wall} imgs={imgs} />
                        </Form.Item>

                        <Form.Item
                            label="商品详情"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 20 }}
                            name="detail"
                        >
                            <RichTestEditor ref={this.richTest_editor} detail={detail} />
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