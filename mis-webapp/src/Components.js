import React, { useState, useEffect } from 'react'

import { EDUCATION } from './constant'

export function Title() {
  return (
    <h1 className="text-light title-color" style={{ marginTop: -48 }}>
      &nbsp;
      #TITLE#学子就业网
    </h1>
  )
}

export function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark sticky-top title-color" style={{ marginTop: '-8px' }}>
      <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        className="navbar-toggler"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${props.category === '首页' ? 'active' : ''}`}>
            <a href="#/" className="nav-link">
              <i className="fa fa-fw fa-home"></i>
              首页
              <span className="sr-only">(current)</span>
            </a>
          </li>

          <li className={`nav-item ${props.category === '平台内容' ? 'active' : ''}`}>
            <a href="#平台内容/banner" className="nav-link">
              平台内容
            </a>
          </li>

          <li className={`nav-item ${props.category === '管理端用户' ? 'active' : ''}`}>
            <a href="#管理端用户" className="nav-link">
              管理端用户
            </a>
          </li>

          <li className={`nav-item ${props.category === '企业' ? 'active' : ''}`}>
            <a href="#企业" className="nav-link">
              企业
            </a>
          </li>

          <li className={`nav-item ${props.category === '普通用户' ? 'active' : ''}`}>
            <a href="#普通用户" className="nav-link">
              普通用户
            </a>
          </li>

          <li className={`nav-item ${props.category === '投诉及反馈' ? 'active' : ''}`}>
            <a href="#投诉及反馈/投诉" className="nav-link">
              投诉及反馈
            </a>
          </li>

          <li className={`nav-item ${props.category === '举报' ? 'active' : ''}`}>
            <a href="#举报" className="nav-link">
              举报
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${props.category === '系统设置' ? 'active' : ''}`}>
            <a href="#系统设置/院校" className="nav-link text-dark">
              <i className="fa fa-fw fa-cogs"></i>
              系统设置
            </a>
          </li>

          <li className={`nav-item ${props.category === '当前用户' ? 'active' : ''}`}>
            <a href="#当前用户/修改密码" className="nav-link text-dark">
              <i className="fa fa-fw fa-user-o"></i>
              当前用户
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export function BackwardButton() {
  return (
    <button type="button" className="btn btn-outline-secondary" onClick={() => window.history.go(-1)}>
      返回
    </button>
  )
}

export function RefreshButton(props) {
  return (
    <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.reload(true)}>
      <i className="fa fa-fw fa-refresh"></i>
      {props.caption || '刷新'}
    </button>
  )
}

export function InputRowField(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{props.caption || ''}</label>
      <div className="col-sm-10">
        <input type={props.type || 'text'} value={props.value}
          autoComplete={props.autocomplete || ''} placeholder={props.placeholder || ''}
          className="form-control input-borderless"
          onChange={props.onChange}
        />
      </div>
    </div>
  )
}

export function SchoolPickerRowField(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/settings/school/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setList(res.content)
    })()
  }, [])

  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{props.caption || '院校'}</label>
      <div className="col-sm-10">
        <select value={props.value} className="form-control input-borderless"
          onChange={props.onChange}
        >
          <option value="">未选择</option>
          {
            list.map(it => (
              <option value={it.name} key={it.id}>{it.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

export function IndustryPickerRowField(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/settings/industry/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setList(res.content)
    })()
  }, [])

  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{props.caption || '行业'}</label>
      <div className="col-sm-10">
        <select value={props.value} className="form-control input-borderless"
          onChange={props.onChange}
        >
          <option value="">未选择</option>
          {
            list.map(it => (
              <option value={it.name} key={it.id}>{it.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

export function EducationPickerRowField(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{props.caption || '学历'}</label>
      <div className="col-sm-10">
        <select value={props.value} className="form-control input-borderless"
          onChange={props.onChange}
        >
          <option value="">未选择</option>
          {
            EDUCATION.map((it, index) => (
              <option value={it} key={index}>{it}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

export function AddressLevel3PickerRowField(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/lib/address.json`)
      const res = await response.json()
      const keys = Object.keys(res)
      const values = Object.values(res)
      let _arr = []
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].slice(-2) === '00' && keys[i].slice(-4) !== '0000') {
          _arr.push(values[i])
        }
      }
      setList(_arr)
    })()
  }, [])

  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{props.caption || '城市'}</label>
      <div className="col-sm-10">
        <input type="text" value={props.value} autoComplete={props.autocomplete || 'address-level3'}
          list="component.address-level3.list"
          className="form-control input-borderless"
          onChange={props.onChange}
        />
        <datalist id="component.address-level3.list">
          {
            list.map((it, index) => (
              <option value={it} key={index} />
            ))
          }
        </datalist>
      </div>
    </div>
  )
}
