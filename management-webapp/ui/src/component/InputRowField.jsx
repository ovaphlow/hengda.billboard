import React from 'react';

export default function InputRowField(props) {
  const {
    caption, type, value, autocomplete, placeholder, onChange,
  } = props;

  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{caption || ''}</label>
      <div className="col-sm-10">
        <input
          type={type || 'text'}
          value={value}
          autoComplete={autocomplete || ''}
          placeholder={placeholder || ''}
          className="form-control input-borderless"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
