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
            <div >
                <Editor
                    initialValue={content}
                    init={{
                        height: 500,
                        width:1150,
                        language: 'zh_CN',
                        plugins: 'powerpaste importcss  searchreplace directionality  visualblocks visualchars charmap hr  advlist lists checklist wordcount tinymcespellchecker  imagetools permanentpen pageembed charmap tinycomments mentions linkchecker advtable',
                        toolbar: 'fontselect fontsizeselect formatselect | bold italic underline strikethrough| forecolor backcolor |alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist ',
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
                        branding: false,
                        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;'
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
        </div>
    );
}

