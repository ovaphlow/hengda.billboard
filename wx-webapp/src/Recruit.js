import React, { useState, useEffect } from 'react'

import Title from './components/Title'
import Navbar from './components/Navbar'
import PlayImg from './components/PlayImg'
import { TextCheckbox } from './components/Button'


const RecruitRow = props => (
  <>
    <div className="row" >
      <div className="col">
        <div className="pull-left">
          <strong>哈尔滨华德学院</strong>
        </div>
        <div className="pull-right">
          <a href="#/">
            详情
          <i className="fa fa-fw fa-lg  fa-angle-right"></i>
          </a>
        </div>
        <br></br>
        <span className="text-muted">
          工作地点:哈尔滨 | 招聘人数:2
        </span>
        <br></br>
        <span>
          哈尔滨华德学院(双选会)
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}/>
  </>
)

const Recruit = () => {

  const [types, setTypes] = useState({})

  
  useEffect(()=> {
    console.info(types)
  },[types])

  const _onCheckboxChange = ({val,checked}) => {
    setTypes(types => ({
      ...types,
      [val]:checked
    }))
  }

  return (
    <>
      <div className="container-fluid">
        <Title category="校园招聘" />
        <PlayImg category="小程序-校园招聘"/>
        <div className="row mt-2 mb-2" style={{fontSize:12}}>
          <div className="col">
            城市
          </div>
          <div className="col">
            <div className="pull-right text-primary">
              <TextCheckbox value="宣讲会" onChange={_onCheckboxChange}>
                宣讲会
              </TextCheckbox>
              |
              <TextCheckbox value="双选会" onChange={_onCheckboxChange}>
                双选会
              </TextCheckbox>
            </div>
          </div>
        </div>
        <RecruitRow/>
        <RecruitRow/>
        <RecruitRow/>
      </div>
      <Navbar category="校园招聘" />
    </>

  )

}


export default Recruit