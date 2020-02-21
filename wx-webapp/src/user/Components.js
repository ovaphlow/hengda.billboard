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

export function JournalTabs(props) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          className={`nav-link ${props.category === '浏览' && 'active'} `}
          href="#我的/记录/浏览">浏览</a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${props.category === '登录' && 'active'} `}
          href="#我的/记录/登录">登录</a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${props.category === '编辑' && 'active'} `}
          href="#我的/记录/编辑">编辑</a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${props.category === '举报' && 'active'} `}
          href="#我的/记录/举报">举报</a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${props.category === '反馈/投诉' && 'active'} `}
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