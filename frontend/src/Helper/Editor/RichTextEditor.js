import React, { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor, } from 'react-draft-wysiwyg';
import { convertToHTML, } from 'draft-convert';
import DOMPurify from 'dompurify';
import './RichTextStyle.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function RichTextEditor() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  // const  [convertedContent, setConvertedContent] = useState(null);
  // const convertContentToHTML = () => {
  //   let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
  //   setConvertedContent(currentContentAsHTML);
  // }

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentState = editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);
    console.log('raw state:', rawState);
    console.log('raw state type:', typeof (rawState));

    const convertedContent = convertFromRaw(rawState);
    console.log("content: " + convertedContent);
    console.log('content type:', typeof (convertedContent));
  }


  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  const options = ['inline', 'blockType', 'fontSize',
   'fontFamily', 'list', 'textAlign',
    'colorPicker', 'link','image',]

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: options,
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
        }}

        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
    </div>
  )
}