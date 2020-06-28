import React, { useState, useEffect } from 'react'

// import Title from '../components/Title'
import Navbar from '../components/Navbar'
import PlayImg from '../components/PlayImg'
import { TextCheckbox } from '../components/Button'
import CityDropdowns from '../components/CityDropdowns'

const RecruitRow = props => (
  <>
    <div className="row" >
      <div className="col">
        <div className="pull-left">
          <strong>{props.title}</strong>
        </div>
        <div className="pull-right">
          <a href={`#/校园招聘/${props.id}?u_id=${props.uuid}`}>
            详情
          <i className="fa fa-fw fa-lg  fa-angle-right"></i>
          </a>
        </div>
        <br></br>
        <span className="text-muted">
          举办地点:{`${props.address_level2}-${props.address_level3}`} | 开始时间:{props.date}
        </span>
        <br></br>
        <span>
          {props.school}({props.category})
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
)


const List = () => {

  const [types, setTypes] = useState({})

  const [list, setList] = useState([])

  const [city, setCity] = useState('')

  const _onCheckboxChange = ({ name, checked }) => {
    search({
      city: city,
      ...types,
      [name]: checked
    })
    setTypes(types => ({
      ...types,
      [name]: checked
    }))
  }

  useEffect(() => {
    document.title = '校园招聘'
    fetch(`./api/campus/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({})
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


  const handleChange = val => {
    search({
      city: val,
      ...types
    })
    setCity(val)
  }


  const search = param => {
    fetch(`./api/campus/`, {
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
        {/* <Title category="校园招聘" /> */}
        <PlayImg category="小程序-校园招聘" />
        <div className="card border-0 mt-2 shadow">
          <div className="card-body">
          <div className="row mb-3" style={{ fontSize: 14 }}>
            <div className="col">
              <CityDropdowns handleChange={handleChange} />
            </div>
            <div className="col">
              <div className="pull-right text-primary">
                <TextCheckbox value="宣讲会" name="category1" onChange={_onCheckboxChange}>
                  宣讲会
              </TextCheckbox>
                <TextCheckbox value="双选会" name="category2" onChange={_onCheckboxChange}>
                  双选会
              </TextCheckbox>
              </div>
            </div>
          </div>
          {
            list && list.map((item, inx) => <RecruitRow key={inx} {...item} />)
          }
          </div>
        </div>
      </div>
      <Navbar category="校园招聘" />
    </>
  )


}

export default List 