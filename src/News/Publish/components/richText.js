import React, {useContext} from 'react';

import UploadPackage from '../mutations/UploadPackage'

import {SessionContext} from 'funweb-lib'

import {Editor} from '@tinymce/tinymce-react';



export default function App(props) {

    const onChange=props.onChange//onChange事件
    let content=props.content//内容
    const handleEditorChange = (content, editor) => {//输入变化
        onChange(content)
    }
    const session = useContext(SessionContext);//session
    if(content)
        content=content.replace('<img src="../storage/','<img src="/storage/')
    else
        content='文件选项可以预览/打印'
    return (
        <div>
            <div>
                <Editor
                    initialValue={content}
                    init={{
                        height: 500,
                        // menubar: 'table',
                        // menubar: 'file edit insert view format table tools help',
                        language: 'zh_CN',
                        // plugins: [
                        //     'advlist autolink lists link image charmap print preview anchor',
                        //     'searchreplace visualblocks code fullscreen',
                        //     'insertdatetime media table paste code help wordcount table advtable'
                        // ],
                        // toolbar:
                        //     'undo redo | formatselect | bold italic backcolor | \
                        //     alignleft aligncenter alignright alignjustify | \
                        //     bullist numlist outdent indent | removeformat | image',
                        images_upload_handler: function (blobInfo, success, failure, progress) {

                            const filename = 'file'
                            const file = blobInfo.blob()

                            const inputs = {[filename]: null}
                            const uploadables = {[filename]: file}
                            UploadPackage.commit(
                                session.environment,
                                inputs,
                                uploadables,
                                (response, errors) => {
                                    if (errors) {
                                        // onError(errors, response);
                                    } else {
                                        success('/storage/' + response.singleUpload.hash);
                                    }
                                },
                            )
                        },
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
        </div>
    );
}

