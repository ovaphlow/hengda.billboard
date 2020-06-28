import React from 'react'

export function InputField(props) {
  return (
    <div className="form-group row input-label">
      <label className="col-4 col-form-label text-right text-muted">{props.category}</label>
      <div className="col-8">
        <input
          type="text"
          name={props.name}
          value={props.value || ''}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          className="form-control-plaintext input-f"
          onChange={props.handleChange}
        />
      </div>
    </div>
  )
}

export function SelectField(props) {
  return (
    <div className="form-group row input-label">
      <label className="col-4 col-form-label text-right text-muted">
        {props.category}
      </label>
      <div className="col-8">
        <select type="text"
          name={props.name}
          value={props.value || ''}
          className=" form-control-plaintext input-f"
          onChange={props.handleChange}>
          {props.children}
        </select>
      </div>
    </div>
  )
}

export function JournalTabs(props) {
  return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link pl-2 pr-2 ${props.category === '浏览' && 'active'} `}
            href="#我的/记录/浏览">浏览</a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link pl-2 pr-2 ${props.category === '登录' && 'active'} `}
            href="#我的/记录/登录">登录</a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link pl-2 pr-2 ${props.category === '编辑' && 'active'} `}
            href="#我的/记录/编辑">编辑</a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link pl-2 pr-2 ${props.category === '举报' && 'active'} `}
            href="#我的/记录/举报">举报</a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link pl-2 pr-2 ${props.category === '反馈/投诉' && 'active'} `}
            href="#我的/记录/投诉">反馈/投诉</a>
        </li>
      </ul>
  )
}

export function DateTitle(props) {
  return (
    <div style={{ borderLeft: ".25rem solid#007bff", fontSize: 13 }}>
      <span >&nbsp;&nbsp;{props.text}</span>
    </div>
  )
}