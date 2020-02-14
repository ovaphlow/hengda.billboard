import React, { useState, useEffect } from 'react'

import ToBack from '../components/ToBack'
import level from '../components/level.json'

const ProvinceCity = () => {

  const [level1, setLevel1] = useState('')

  const [level2, setLevel2] = useState('')

  const [level2List, setLevel2List] = useState([])

  const [level3, setLevel3] = useState('')

  const [level3List, setLevel3List] = useState([])

  const [resume, setResume] = useState({})

  useEffect(() => {
    const _resume = JSON.parse(sessionStorage.getItem('resume'))
    if (_resume !== null) {
      if (_resume.address1) {
        const l1 = level.find(item => item.name === _resume.address1)  
        if (l1) {
          setLevel2List(l1.children)
          const l2 = l1.children.find(
            item => item.name === _resume.address2)
          if (l2 && l2.children) {
            setLevel3List(l2.children.filter(it => it.province === l2.code.slice(0, 2)))
          }
        }         
      }
      setLevel1(_resume.address1)
      setLevel2(_resume.address2)
      setLevel3(_resume.address3)
      setResume(_resume)
    }
  }, [])


  const level1Click = item => {
    setLevel1(item.name)
    setLevel2List(item.children)
  }

  const level2Click = item => {
    setLevel2(item.name)
    let data = []
    if (item.children) {
      data = item.children.filter(it => it.province === item.code.slice(0, 2))
    }
    setLevel3List(data)
  }

  const level3Click = item => {
    setLevel3(item.name)
  }

  const _class = (it1, it2) => {
    return it1 === it2.name ? 'text-primary font-weight-bold' : 'text-muted'
  }

  const handleSave = () => {
    sessionStorage.setItem('resume', JSON.stringify({
      ...resume,
      address1:level1,
      address2:level2,
      address3:level3,
    }))
    window.history.go(-1)
  }

  return (
    <>
      <div className="container-fluid">
        <ToBack />
        <div className="mt-2">
          <h4>请选择现居住地</h4>
        </div>
        <hr />
        <div className="row mt-3" style={{ fontSize: 14 }}>
          <div className="col pre-scrollable">
            {level.map(item =>
              <p className={_class(level1, item)}
                onClick={() => { level1Click(item) }} key={item.code}>{item.name}</p>
            )}
          </div>
          <div className="col pre-scrollable">
            {level2List.map(item =>
              <p className={_class(level2, item)}
                onClick={() => { level2Click(item) }} key={item.code}>{item.name}</p>
            )}
          </div>
          <div className="col pre-scrollable">
            {level3List.map(item =>
              <p className={_class(level3, item)}
                onClick={() => { level3Click(item) }} key={item.code}>{item.name}</p>
            )}
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button className="btn btn-primary nav-btn" onClick={handleSave}>
            确定
          </button>
        </div>
      </ul>
    </>
  )
}

export default ProvinceCity