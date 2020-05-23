import React from 'react';
import PropTypes from 'prop-types';

export default function InputRowField({
  caption, type, value, autoComplete, placeholder, onChange,
}) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{caption || ''}</label>
      <div className="col-sm-10">
        <input
          type={type || 'text'}
          value={value}
          autoComplete={autoComplete || ''}
          placeholder={placeholder || ''}
          className="form-control input-borderless"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

InputRowField.propTypes = {
  caption: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
