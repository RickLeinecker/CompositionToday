import { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor, } from 'react-draft-wysiwyg';
import { convertToHTML, } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichTextStyle.css'

export function RichTextConverter({ content }) {
  const json = JSON.parse(content);
  console.log(json);
  
  const contentState = convertFromRaw(JSON.parse(content))
  console.log("contentState: " + contentState);
  
  const html = convertToHTML(contentState);
  
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  return (
    <> 
      <div className="card-text">
        <div className="preview" dangerouslySetInnerHTML={createMarkup(html)}></div>
      </div>
    </>
  )

}



export default function RichTextEditor({ handleChange, content }) {

  // make api call to check for existing content
  // if no content exists, create empty editor
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  if (content) {
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))));
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
    'colorPicker', 'link', 'image',]

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
    </div>
  )
}