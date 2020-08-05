import React from 'react';
import PropsTypes from 'prop-types';

const TextRowField = ({
  caption, name, value, handleChange,
}) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label text-right">{caption || ''}</label>
    <div className="col-sm-10">
      <input
        type="text"
        name={name}
        value={value || ''}
        className="form-control"
        onChange={handleChange}
      />
    </div>
  </div>
);

TextRowField.propTypes = {
  caption: PropsTypes.string.isRequired,
  name: PropsTypes.string.isRequired,
  value: PropsTypes.string.isRequired,
  handleChange: PropsTypes.func.isRequired,
};

export default TextRowField;
