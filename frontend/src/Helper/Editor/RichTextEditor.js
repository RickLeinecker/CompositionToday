import React, { useEffect, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor, } from 'react-draft-wysiwyg';
import { convertToHTML, } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichTextStyle.css'


export default function RichTextEditor({ handleChange, content }) {

  // make api call to check for existing content
  // if no content exists, create empty editor
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  if (content) {
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))));
  }

  // const  [convertedContent, setConvertedContent] = useState(null);
  // const convertContentToHTML = () => {
  //   let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
  //   setConvertedContent(currentContentAsHTML);
  // }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentState = editorState.getCurrentContent();
    // const rawState = convertToRaw(contentState);
    // const convertedContent = convertFromRaw(rawState);
    handleChange(saveContent(contentState), "contentText")
  }

  const saveContent = (content) => {
    const contentItem = JSON.stringify(convertToRaw(content));
    return contentItem;
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