import React, { useState, useEffect } from 'react'

import Title from '../components/Title'
import Navbar from '../components/Navbar'
import PlayImg from '../components/PlayImg'
import { TextCheckbox } from '../components/Button'
import { RecruitmentRow } from '../components/DataRow'
import CityDropdowns from '../components/CityDropdowns'


const List = () => {

  const [types, setTypes] = useState({})

  const [list, setList] = useState([])

  const [city, setCity] = useState('')

  useEffect(() => {
    fetch(`./api/recruitment/search/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        status:'在招'
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setList(res.content)
        } else {
          alert(res.message)
        }
      })
  }, [])

  const _onCheckboxChange = ({ value, checked }) => {
    search({
      city: city,
      ...types,
      [value]: checked
    })
    setTypes(types => ({
      ...types,
      [value]: checked
    }))
  }

  const handleChange = val => {
    search({
      city: val,
      status:'在招',
      ...types
    })
    setCity(val)
  }

  const search = param => {
    fetch(`./api/recruitment/search/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(param)
    })
      .then(res => res.json())
      .then(res => {
        if (res.content) {
          setList(res.content)
        } else {
          alert(res.message)
        }
      })
  }

  return (
    <>
      <div className="container-fluid">
        <Title category="岗位" />
        <PlayImg category="小程序-岗位" />
        <div className="row mt-1 mb-1" style={{ fontSize: 12 }} >
          <div className="col">
            <CityDropdowns handleChange={handleChange}/>
          </div>
          <div className="col flex-end">
            <div className="pull-right text-primary">
              <TextCheckbox value="兼职" onChange={_onCheckboxChange}>
                兼职
              </TextCheckbox>
              |
              <TextCheckbox value="全职" onChange={_onCheckboxChange}>
                全职
              </TextCheckbox>
              |
              <TextCheckbox value="实习" onChange={_onCheckboxChange}>
                实习
              </TextCheckbox>
            </div>
          </div>
        </div>
        {list && list.map(item => <RecruitmentRow key={item.id} {...item} />)}
      </div>
      <Navbar category="岗位" />
    </>

  )

}


export default List