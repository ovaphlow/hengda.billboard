import React from 'react'

export function InputField(props) {
  return (
    <div className="col">
      <div className="form-group">
        <span className="text-muted" style={{ fontSize: 13 }}>
          {props.category}
        </span>
        <input type="text"
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          className="input-control"
          onChange={props.handleChange}
        />
      </div>
    </div>
  )
}

export function SelectField(props) {
  return (
    <div className="col">
      <div className="form-group">
        <span className="text-muted" style={{ fontSize: 13 }}>
          {props.category}
        </span>
        <select type="text"
          name={props.name}
          value={props.value}
          className="input-control"
          onChange={props.handleChange}>
          {props.children}
        </select>
      </div>
    </div>
  )
}

