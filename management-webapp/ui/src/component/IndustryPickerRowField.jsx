import React, { useState, useEffect } from 'react';

export default function IndustryPickerRowField(props) {
  const { caption, value, onChange } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/settings/industry/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setList(res.content);
    })();
  }, []);

  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{caption || '行业'}</label>
      <div className="col-sm-10">
        <select
          value={value}
          className="form-control input-borderless"
          onChange={onChange}
        >
          <option value="">未选择</option>
          {
            list.map((it) => (
              <option value={it.name} key={it.id}>{it.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  );
}
