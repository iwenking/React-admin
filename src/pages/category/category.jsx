import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { reqCategorys, reqUpdateCategory } from '../../api'
import AddForm from './add-form'
import UpdateForm from './updata-form'
import './category.less'


class category extends Component {

    state = {
        categorys: [],
        loading: false,
        showStatus: 0,
        parentId: '0',//当前需要显示的分类列表ID
        parentName: '',
        subCategorys: [],//耳机分类列表

    }
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (params) => (
                    <span>
                        <i onClick={() => { this.showUpdate(params) }}>修改分类</i>
                        {this.state.parentId === '0' ? <i style={{ display: 'inline-block', marginLeft: '10px' }} onClick={() => { this.showSubCategorys(params) }}>查看子分类</i> : null}
                    </span>
                ),
            },
        ];
    }
    getCategorys = async () => {
        // this.setState({ loading: true })
        const { parentId } = this.state;
        const data = await reqCategorys(parentId)
        if (data.status === 0) {
            const categorys = data.data;
            if (parentId === '0') {
                this.setState({ categorys })
            } else {
                this.setState({ subCategorys: categorys })
            }
            // this.setState({ categorys: categorys, loading: false })
        } else {
            message.error('获取分类列表失败')
        }

    }

    getSate() {
        console.log(this);

    }
    showAdd = (flage = true) => {

        this.setState({ showStatus: flage ? 1 : 2 })
    }
    showUpdate = (params) => {
        this.category = params
        this.setState({ showStatus: 3 })
    }

    updateCategory = async (params) => {
        this.setState({ showStatus: 2 })
        const categoryId = this.category._id;
        const categoryName = params;
        
        const res = await reqUpdateCategory(categoryId, categoryName)
        if(res.status === 0){
            this.getCategorys()
        }
    }

    handleCancel = () => {
        this.setState({
            showStatus: 0,
        })
        Modal.destroyAll();
    }
    showSubCategorys = (params) => {
        this.setState({
            parentId: params._id,
            parentName: params.name
        }, () => {
            this.getCategorys()
        })

    }
    showFirstCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: "",
            subCategorys: []
        })
    }


    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategorys()
    }


    render() {

        const { categorys, loading, showStatus, subCategorys, parentId, parentName } = this.state
        
        const category = this.category || '';
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <i onClick={this.showFirstCategorys} style={{ marginRight: '10px' }}>一级分类列表</i>
                <ArrowRightOutlined />
                <i style={{ marginLeft: '10px' }}>{parentName}</i>
            </span>
        );
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <div>
                <Card title={title} extra={<i>{extra}</i>}>
                    <Table rowKey="_id" loading={loading} bordered dataSource={parentId === '0' ? categorys : subCategorys} columns={this.columns} pagination={{ defaultCurrent: 5, showQuickJumper: true }} />

                    <AddForm showStatus={showStatus} showAdd={this.showAdd} />

                    <UpdateForm showStatus={showStatus} category={category} showAdd={this.showAdd} updateCategory={this.updateCategory} />
                </Card>
            </div>
        );
    }
}

export default category;