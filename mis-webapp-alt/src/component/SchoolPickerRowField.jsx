import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SchoolPickerRowField({ caption, value, onChange }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/settings/school/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setList(res.content);
    })();
  }, []);

  return (
    <div className="form-group">
      <label>{caption || '院校'}</label>
      <select
        value={value}
        className="form-control"
        onChange={onChange}
      >
        <option value="">未选择</option>
        {list.map((it) => (
          <option value={it.name} key={it.id}>{it.name}</option>
        ))}
      </select>
    </div>
  );
}

SchoolPickerRowField.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
};
