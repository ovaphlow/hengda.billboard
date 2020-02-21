import React from 'react'

import level from '../components/level.json'

const CityDropdowns = props => {

  const [show, setShow] = React.useState(false)

  const [childMenu, setChildMenu] = React.useState([])

  const [province, setProvince] = React.useState('')

  const [value, setValue] = React.useState('')

  const menuShow = () => {
    setShow(!show)
  }

  const childMenuShow = item => {
    if (item.code === '110000' || item.code === '120000' ||
      item.code === '310000' || item.code === '500000') {
      setChildMenu([])
      setShow(false)
      setProvince(item.name)
      setValue(item.name)
      if (props.handleChange) {
        props.handleChange(item.name)
      }
    } else {
      setProvince(item.name)
      setChildMenu(item.children.filter(it => it.province === item.code.slice(0, 2)))
    }
  }

  const handleClick = (item) => {
    setValue(item.name)
    setShow(false)
    if (props.handleChange) {
      props.handleChange(item.name)
    }
  }

  const _class = (v1, v2) => {
    return v1 === v2 ? 'text-primary font-weight-bold' : 'text-muted'
  }

  const clear = () => {
    setShow(false)
    setProvince('')
    setValue('')
    if (props.handleChange) {
      props.handleChange('')
    }
  }


  return (
    <div className="dropdown">
      <button className="btn btn-link btn-sm dropdown-toggle" onClick={menuShow} style={{ padding: 0 }} >
        {value || '城市'}
      </button>
      <div className={`dropdown-menu ${show && 'show'}`} style={{ width: 210, minWidth: 110, height: 215 }}>
        <div className="row" >
          <div className="col border-right" style={{ height: 200, overflowY: 'scroll' }}>
            <span className='font-weight-bold text-danger'
              onClick={clear}>
              &nbsp;&nbsp;&nbsp;清空
            </span>
            <br />
            {level.map((item, inx) =>
              <React.Fragment key={inx}>
                <span className={_class(item.name, province)}
                  onClick={() => childMenuShow(item)}>
                  &nbsp;&nbsp;&nbsp;{item.name}
                </span>
                <br />
              </React.Fragment>
            )}
          </div>
          <div className="col" style={{ height: 200, overflowY: 'scroll' }}>
            {childMenu.map((item, inx) =>
              <React.Fragment key={inx}>
                <span className={_class(item.name, value)}
                  onClick={() => handleClick(item)}>
                  {item.name}
                </span>
                <br />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  )

}

export default CityDropdowns