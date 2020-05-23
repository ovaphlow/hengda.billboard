import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function AddressLevel3PickerRowField({
  caption, value, autoComplete, onChange,
}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/lib/address.json');
      const res = await response.json();
      const keys = Object.keys(res);
      const values = Object.values(res);
      const arr = [];
      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i].slice(-2) === '00' && keys[i].slice(-4) !== '0000') {
          arr.push(values[i]);
        }
      }
      setList(arr);
    })();
  }, []);

  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{caption || '城市'}</label>
      <div className="col-sm-10">
        <input
          type="text"
          value={value}
          autoComplete={autoComplete || 'address-level3'}
          list="component.address-level3.list"
          className="form-control input-borderless"
          onChange={onChange}
        />
        <datalist id="component.address-level3.list">
          {list.map((it) => (
            <option key={list.indexOf(it)} value={it} label={it} />
          ))}
        </datalist>
      </div>
    </div>
  );
}

AddressLevel3PickerRowField.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
