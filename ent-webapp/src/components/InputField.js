import React, { useState, useEffect } from 'react'
import moment from 'moment'


export const TextField = props => (
  <div className="form-group">
    <label>{props.category}</label>
    <input type="text"
      id={props.id}
      name={props.name}
      value={props.value || ''}
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
      value={props.value || ''}
      onChange={props.handleChange}
      className={props.className ? props.className : `form-control form-control-sm rounded-0`} >
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


export const IndustryField = props => {


  const [industry, setIndustry] = useState([])

  const [position, setPosition] = useState([])


  useEffect(() => {
    const _industry = JSON.parse(localStorage.getItem('industry'))
    const fun = () => {
      fetch(`./api/common-data/hangye/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            localStorage.setItem('industry', JSON.stringify({
              date: parseInt(moment().add(7, 'days').format('YYYYMMDD')),
              data: res.content
            }))
            setIndustry(p => res.content)
          }
        })
    }

    if (_industry !== null) {
      if (_industry.date - moment().format('YYYYMMDD') < 1) {
        fun()
      } else {
        setIndustry(p => _industry.data)
      }
    } else {
      fun()
    }
  }, [])


  useEffect(() => {
    if (industry.length > 0) {
      if (props.industry && props.industry !== '') {
        let master = industry.find(item => item.name === props.industry)
        if (!master) {
          master = industry[0]
          props.handleChange({
            target: {
              name: 'industry',
              value: industry[0].name
            }
          })
        }
        const _position = industry.filter(item => item.master_id === master.id)
        setPosition(_position)
      } else {
        const _position = industry.filter(item => item.master_id === industry[0].id)
        setPosition(_position)
        props.handleChange({
          target: {
            name: 'industry',
            value: industry[0].name
          }
        })
      }

    }
  }, [industry, props])

  useEffect(() => {
    if (position.length > 0) {
      if (props.position && props.position !== '') {
        if (!position.find(item => item.name === props.position)) {
          props.handleChange({
            target: {
              name: 'position',
              value: position[0].name
            }
          })
        }
      } else {
        props.handleChange({
          target: {
            name: 'position',
            value: position[0].name
          }
        })
      }
    }
  }, [position, props])


  const handleIndustry = e => {
    const { value, name } = e.target
    const _position = industry.filter(item => item.master_id === industry.find(it => it.name === value).id)
    setPosition(_position)
    props.handleChange({
      target: {
        name: name,
        value: value
      }
    })
  }

  return (
    <>
      <div className="col">
        <SelectField
          category="所属行业"
          name="industry"
          value={props.industry}
          handleChange={handleIndustry} >
          {
            industry && industry.filter(item => item.master_id === 0).map((item, inx) =>
              <option key={inx}>{item.name}</option>)
          }
        </SelectField>
      </div>
      <div className="col">
        <SelectField
          category="所属职位"
          name="position"
          value={props.position}
          handleChange={props.handleChange} >
          {
            position.map((item, inx) =>
              <option key={inx}>{item.name}</option>)
          }
        </SelectField>
      </div>
    </>
  )

}

export const IndustrySearchField = props => {
  
  const [industry, setIndustry] = useState([])

  const [position, setPosition] = useState([])


  useEffect(() => {
    const _industry = JSON.parse(localStorage.getItem('industry'))
    const fun = () => {
      fetch(`./api/common-data/hangye/`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            localStorage.setItem('industry', JSON.stringify({
              date: parseInt(moment().add(7, 'days').format('YYYYMMDD')),
              data: res.content
            }))
            setIndustry(p => res.content)
          }
        })
    }

    if (_industry !== null) {
      if (_industry.date - moment().format('YYYYMMDD') < 1) {
        fun()
      } else {
        setIndustry(p => _industry.data)
      }
    } else {
      fun()
    }
  }, [])


  const handleIndustry = e => {
    const { value, name } = e.target
    if (value === '') {
      setPosition([])
    } else { 
      setPosition(industry.filter(item => item.master_id === industry.find(it => it.name === value).id))
    }
    props.handleChange({
      target: {
        name: name,
        value: value
      }
    })
    props.handleChange({
      target: {
        name: 'qiwangzhiwei',
        value: ''
      }
    })
  }

  return (
    <>
      <div className="col">
        <SelectField
          category="期望行业"
          name="qiwanghangye"
          value={props.industry}
          handleChange={handleIndustry} >
          <option></option>
          {
            industry && industry.filter(item => item.master_id === 0).map((item, inx) =>
              <option key={inx}>{item.name}</option>)
          }
        </SelectField>
      </div>
      <div className="col">
        <SelectField
          category="期望职位"
          name="qiwangzhiwei"
          value={props.position}
          handleChange={props.handleChange} >
          <option></option>
          {
            position.map((item, inx) =>
              <option key={inx}>{item.name}</option>)
          }
        </SelectField>
      </div>
    </>
  )
}