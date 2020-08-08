import React, {useState,useContext} from "react";
import {SessionContext} from 'funweb-lib'
import UploadPackage from '../mutations/UploadPackage'

import {Upload,Modal,message,Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';








export default function (props) {

    const onFileChange=props.onChange

    const session = useContext(SessionContext);

    //文件上传
    const uploadprops = {
        name: 'file',
        beforeUpload(file, fileList) {

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
                onFileChange(info.file)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return(
        <Upload  {...uploadprops} >
            <Button type={'primary'}>
                <UploadOutlined/>上传文件
            </Button>
        </Upload>
    )
}
