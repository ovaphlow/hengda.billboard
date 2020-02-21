import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ToBack from '../components/ToBack'
import level from '../components/level.json'


const ProvinceCity = () => {

  const [level1, setLevel1] = useState('')

  const [level2, setLevel2] = useState('')

  const [level2List, setLevel2List] = useState([])

  const [level3, setLevel3] = useState('')

  const [level3List, setLevel3List] = useState([])

  const [resume, setResume] = useState({})

  const { id } = useParams()

  useEffect(() => {
    fetch(`./api/resume/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setResume(res.content)

          if (res.content.address1) {
            const l1 = level.find(item => item.name === res.content.address1)
            if (l1) {
              setLevel2List(l1.children)
              const l2 = l1.children.find(
                item => item.name === res.content.address2)
              if (l2 && l2.children) {
                setLevel3List(l2.children.filter(it => it.province === l2.code.slice(0, 2)))
              }
            }
          }
          setLevel1(res.content.address1)
          setLevel2(res.content.address2)
          setLevel3(res.content.address3)

        } else {
          alert(res.message)
        }
      })
  }, [id])


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
    fetch(`./api/resume/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...resume,
        editType:'修改简历个人信息'
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          window.history.go(-1)
        }
      })
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