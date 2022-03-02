import { IconButton } from '@mui/material'
import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


class MyEditor extends React.Component {
    editor: any
  onClickSave = () => {
    if (this.editor) {
      const canvas = this.editor.getImage().toBlob();
      console.log(canvas);
    }
  }

  setEditorRef = (editor: any) => (this.editor = editor)


  render() {
    return (
    <div>
      <AvatarEditor
        ref={this.setEditorRef}
        image={`https://serv.pizzagami.fr:${process.env.https}/api/images/a27cba5e-ed7c-42f9-aaca-fbb69dc0e94f.png`}
        width={250}
        height={250}
        border={50}
        scale={1.2}
      />
        <IconButton color="primary" onClick={this.onClickSave}><AddCircleOutlineIcon /></IconButton>
      </div>
    )
  }
}

export default MyEditor