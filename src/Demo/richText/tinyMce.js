import React,{useContext} from 'react';
import '../css/react-draft-wysiwyg.global.css'
import UploadPackage from '../js/UploadPackage'
import {SessionContext} from 'funweb-lib'

import { Editor } from '@tinymce/tinymce-react';


function App () {

   const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
    }

    const session=useContext(SessionContext);

        return (
           <div className={'aaa'}>
               aaaaaaaaaaaaaaaaaaaaaaaa
               <div style={{'height':'200px'}}>
                   <Editor
                       initialValue="<p>This is the initial content of the editor</p>"
                       init={{
                           height: 200,
                           menubar: 'table',
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

                               const filename='file'
                               const file=blobInfo.blob()

                               const inputs = {[filename]: null}
                               console.log('filename',filename);
                               const uploadables = {[filename]: file}
                               UploadPackage.commit(
                                   session.environment,
                                   inputs,
                                   uploadables,
                                   (response, errors) => {
                                       console.log('response',response);
                                       if (errors) {
                                           // onError(errors, response);
                                       } else {
                                           // failure('Image upload failed due to a XHR Transport error. Code: ');
                                           // console.log('http://127.0.0.1:8080/storage/' + response.data.singleUpload.hash);
                                           success('http://127.0.0.1:8080/storage/'+response.singleUpload.hash);
                                       }
                                   },

                               )

                           /*    var xhr, formData;

                               xhr = new XMLHttpRequest();
                               xhr.withCredentials = false;
                               xhr.open('POST', '/api/v1/graphql');

                               // xhr.upload.onprogress = function (e) {
                               //     progress(e.loaded / e.total * 100);
                               // };

                               xhr.onload = function() {
                                   var json;

                                   if (xhr.status < 200 || xhr.status >= 300) {
                                       failure('HTTP Error: ' + xhr.status);
                                       return;
                                   }

                                   console.log('xhr.responseText',xhr.responseText);
                                   json = JSON.parse(xhr.responseText);

                                   if (!json || typeof json.location != 'string') {
                                       failure('Invalid JSON: ' + xhr.responseText);
                                       return;
                                   }

                                   success(json.location);
                               };

                               xhr.onerror = function () {
                                   failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
                               };
*/
                              /* formData = new FormData();
                               formData.append('operations',`{"query":"mutation UploadPackageMutation(\\n  $file: Upload!\\n) {\\n  singleUpload(file: $file) {\\n    id\\n    hash\\n    type\\n    size\\n  }\\n}\\n","variables":{"file":null}}`)
                               formData.append('map','{"0":["variables.file"]}')
                               formData.append('0', blobInfo.blob(), blobInfo.filename());

                               xhr.send(formData);*/
                           },

                       }}
                       onEditorChange={handleEditorChange}
                   />
               </div>
               aaaaaaaaaaaaaaaaaaaaaaaa
           </div>

        );
}


export default App;

/*
* This is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the editorThis is the initial content of the edito
*
* */
