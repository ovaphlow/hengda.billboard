import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import PropTypes from 'prop-types';

const RichEditor = (props) => {
  const { value } = props;
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      // ['link', 'image'],
    ],
  };

  const formats = [
    'header',
    'align',
    'bold',
    'italic',
    'underline',
    'blockquote',
    // 'link', 'image'
  ];

  const _onChange = (text) => {
    props.handleChange({
      target: {
        value: text,
        name: props.name,
      },
    });
  };

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      placeholder="请填写内容"
      value={value}
      onChange={_onChange}
    />
  );
};

RichEditor.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default RichEditor;
