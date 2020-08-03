import React from 'react';

export function TextRowField(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{props.caption || ''}</label>
      <div className="col-sm-10">
        <input
          type="text"
          name={props.name}
          value={props.value || ''}
          className="form-control"
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}
