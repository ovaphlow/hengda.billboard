import React, {useEffect, useState} from 'react'
import { TextCheckbox } from '../components/Button'
import { RecruitmentRow } from '../components/DataRow'
import CityDropdowns from '../components/CityDropdowns'
import Navbar from '../components/Navbar'

const KeywordSearch = props => {

  const [types, setTypes] = useState({})

  const [list, setList] = useState([])

  const [city, setCity] = useState('哈尔滨市')

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    document.title = '岗位/企业查询'
  }, [])

  const _onCheckboxChange = ({ value, checked }) => {
    search({
      city: city,
      ...types,
      keyword: keyword,
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
      status: '在招',
      keyword: keyword,
      ...types
    })
    setCity(val)
  }


  const search = param => {
    fetch(`./api/recruitment/keyword-search/`, {
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


  const _οnkeypress = event => { 
    const keyCode = event.which || event.keyCode
    if(keyCode === 13 && event.target.value !== ''){
      search({
        city: city,
        status: '在招',
        keyword: event.target.value,
        ...types
      })
      setKeyword(event.target.value)
    }
  }


  return (
    <>
      <div className="container-fluid bg-white">
        <div className="row pb-2 pt-1">
          <div className="col">
            <input type="text"
              id="search"
              className="w-100 border-0 text-center"
              placeholder="按照企业/职位名称查询"
              onKeyPress={_οnkeypress}
              autoFocus
              style={{ outline: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }} />
          </div>
        </div>
        <div className="row mt-1 mb-1" style={{ fontSize: 14 }} >
          <div className="col">
            <CityDropdowns defaultValue="哈尔滨市" handleChange={handleChange} />
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
      <Navbar category="首页" />
    </>
  )

}

export default KeywordSearch