import React, {useState} from 'react'

import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../css/react-draft-wysiwyg.global.css'


export default function F() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

    console.log(htmlToDraft(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
            {/*<textarea
                style={{height:'300px',width:'500px'}}
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
            <div dangerouslySetInnerHTML={{__html:draftToHtml(convertToRaw(editorState.getCurrentContent()))}}></div>*/
            }
        </div>
    )
}
