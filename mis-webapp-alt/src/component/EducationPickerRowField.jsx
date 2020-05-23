import React from 'react';
import PropTypes from 'prop-types';

import { EDUCATION } from '../constant';

export default function EducationPickerRowField({ caption, value, onChange }) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{caption || '学历'}</label>
      <div className="col-sm-10">
        <select
          value={value}
          className="form-control input-borderless"
          onChange={onChange}
        >
          <option value="">未选择</option>
          {EDUCATION.map((it) => (
            <option key={EDUCATION.indexOf(it)} value={it}>{it}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

EducationPickerRowField.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
