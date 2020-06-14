import React, { Component } from 'react';
import { Card, List, } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api/index'

const Item = List.Item



class detail extends Component {

    state = {
        Cname1: '',
        Cname2: '',
    }

    async componentDidMount() {
        const { pCategoryId, categoryId } = this.props.location.state.product;

        if (pCategoryId === '0') {
            const res = await reqCategory(categoryId);
            const cname = res.data.name;
            this.setState({
                Cname1: cname
            })
        } else {
            // const res1 = await reqCategory(pCategoryId);
            // const res2 = await reqCategory(categoryId);
            // const Cname1 = res1.data.name;
            // const Cname2 = res2.data.name;

            const res = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
            const Cname1 = res[0].data.name;
            const Cname2 = res[1].data.name;

            this.setState({
                Cname1,
                Cname2
            })
        }


    }


    render() {
        const { name, dsc, price, detail, imgs } = this.props.location.state.product
        const { Cname1, Cname2 } = this.state

        const title = (
            <span>
                <ArrowLeftOutlined style={{ color: '#1DA57A', marginRight: 15 }} onClick={() => this.props.history.goBack()} />
                <span>商品详情</span>
            </span>
        )

        return (
            <div>
                <Card title={title} className='product-detail'>
                    <List>
                        <Item>
                            <span className='left'>商品名称:</span>
                            <span>{name}</span>
                        </Item>
                        <Item>
                            <span className='left'>商品描叙:</span>
                            <span>{dsc}</span>
                        </Item>
                        <Item>
                            <span className='left'>商品价格:</span>
                            <span>{price}元</span>
                        </Item>
                        <Item>
                            <span className='left'>所属分类:</span>
                            <span>{Cname1} {Cname2 ? '-->' + Cname2 : null} </span>
                        </Item>
                        <Item>
                            <span className='left'>商品图片:</span>
                            {
                                imgs.map(img => (
                                    <img className='product-img' src={BASE_IMG_URL + img} key={img} alt='img' />
                                ))
                            }
                        </Item>
                        <Item>
                            <span className='left'>商品详情:</span>
                            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                        </Item>
                    </List>
                </Card>
            </div>
        );
    }
}

export default detail;