import React from 'react'

export const TextField = props => (
  <div className="form-group">
    <label>{props.category}</label>
    <input type="text"
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      className="form-control form-control-sm rounded-0" />
  </div>
)


export const SelectField = props => (
  <div className="form-group">
    <label>{props.category}</label>
    <select type="text"
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      className={props.className?props.className:`form-control form-control-sm rounded-0`} >
      {props.children}
    </select>
  </div>
)

export const DateField = props => (
  <div className="form-group">
    <label>{props.category}</label>
    <input type="date"
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      className="form-control form-control-sm rounded-0" />
  </div>
)