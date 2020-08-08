import React, {useContext} from 'react';

import UploadPackage from '../mutations/UploadPackage'

import {SessionContext} from 'funweb-lib'

import {Editor} from '@tinymce/tinymce-react';



export default function App(props) {

    const onChange=props.onChange
    const handleEditorChange = (content, editor) => {
        onChange(content)
        console.log('Content was updated:', content);
    }
    const session = useContext(SessionContext);

    return (
        <div>
            <div>
                <Editor
                    initialValue="<p>This is the initial content of the editor</p>"
                    init={{
                        height: 500,
                        // menubar: 'table',
                        menubar: 'file edit insert view format table tools help',
                        language: 'zh_CN',
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount table advtable'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | image',
                        images_upload_handler: function (blobInfo, success, failure, progress) {

                            const filename = 'file'
                            const file = blobInfo.blob()

                            const inputs = {[filename]: null}
                            console.log('filename', filename);
                            const uploadables = {[filename]: file}
                            UploadPackage.commit(
                                session.environment,
                                inputs,
                                uploadables,
                                (response, errors) => {
                                    console.log('response', response);
                                    if (errors) {
                                        // onError(errors, response);
                                    } else {
                                        // failure('Image upload failed due to a XHR Transport error. Code: ');
                                        // console.log('http://127.0.0.1:8080/storage/' + response.data.singleUpload.hash);
                                        success('http://127.0.0.1:8080/storage/' + response.singleUpload.hash);
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

