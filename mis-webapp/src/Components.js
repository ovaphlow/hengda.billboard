import React from 'react'

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

          <li className={`nav-item ${props.category === '用户' ? 'active' : ''}`}>
            <a href="#管理端用户" className="nav-link">
              管理端用户
            </a>
          </li>

          <li className={`nav-item ${props.category === '企业' ? 'active' : ''}`}>
            <a href="#企业" className="nav-link">
              企业
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${props.category === '当前用户' ? 'active' : ''}`}>
            <a href="#当前用户" className="nav-link text-dark">
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

export function TextRowField(props) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label text-right">{props.caption || ''}</label>
      <div className="col-sm-10">
        <input type="text" name={props.name} value={props.value || ''}
          className="form-control"
          onChange={props.handleChange}
        />
      </div>
    </div>
  )
}