import React from 'react'
import ReactQuill from 'react-quill'

const RichEditor = props => {

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      // ['link', 'image'],
    ],
  }

  const formats = [
    'header',
    'align',
    'bold', 'italic', 'underline', 'blockquote',
    // 'link', 'image'
  ]

  const _onChange = text => {
    props.handleChange({
      target: {
        value: text,
        name: props.name
      }
    })
  }

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      placeholder="请填写内容"
      value={props.value}
      onChange={_onChange} />
  )
}

export default RichEditor