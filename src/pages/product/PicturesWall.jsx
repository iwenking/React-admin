import React from 'react';
import propTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { resDeleteImg } from '../../api/index'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {

    static propTypes = {
        imgs: propTypes.array
    }

    constructor(props) {
        super(props);
        let fileList = []
        const { imgs } = this.props;
        if (imgs && imgs.length > 0) {
            fileList  =  imgs.map((img,index) =>({
                uid :-index,
                name:img,
                status:'done',
                url:'/upload/'+imgs

           }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList 
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = async ({ file, fileList }) => {

        if (file.status === 'done') {
            const result = file.response;
            if (result.status === 0) {
                message.success('上传图片成功!');
                const { name } = result.data;
                file = fileList[fileList.length - 1];
                file.name = name;
            } else {
                message.error('上传图片失败!');
            }
        } else if (file.status === 'removed') {
            const result = await resDeleteImg(file.name);
            if (result.status === 0) {
                message.success('删除图片成功!');
            } else {
                message.success('删除图片失败!');
            }
        }

        this.setState({ fileList })
    };

    //获取已上传图片文件名的数组
    getItems = () => {
        return this.state.fileList.map(file => file.name)
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload"
                    name='image'
                    accept='image/*'
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall