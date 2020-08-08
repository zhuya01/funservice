import React, {useState,useContext} from "react";
import {SessionContext} from 'funweb-lib'
import UploadPackage from '../../News/Publish/mutations/UploadPackage'

import {Upload, Modal,message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function () {

    const [previewVisible,setpreviewVisible]=useState(false)
    const [previewImage,setpreviewImage]=useState('')
    const [previewTitle,setpreviewTitle]=useState('')
    const [fileList,setfileList]=useState([])

    const handleCancel = () => setpreviewVisible(false)

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setpreviewImage(file.url || file.preview)
        setpreviewVisible(true)
        setpreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const handleChange = (fileList) => {
        console.log(fileList);
        setfileList(fileList.fileList)
    };

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const session = useContext(SessionContext);
    //文件上传
    const uploadprops = {
        name: 'file',
        beforeUpload(file, fileList) {

            console.log("beforeUpload:", file, fileList);
        },
        customRequest({
                          action,
                          data,
                          file,
                          filename,
                          headers,
                          onError,
                          onProgress,
                          onSuccess,
                          withCredentials,
                      }) {

            const inputs = {[filename]: null}
            const uploadables = {[filename]: file}
            UploadPackage.commit(
                session.environment,
                inputs,
                uploadables,
                (response, errors) => {
                    if (errors) {
                        onError(errors, response);
                    } else {
                        onSuccess(response);
                        console.log(response);
                    }
                },
                onError
            )
            return false;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                // console.log("onChange:", info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className="clearfix">
            <Upload
                {...uploadprops}
                listType="picture-card"
                // fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/png, image/jpeg"
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </div>
    );
}
