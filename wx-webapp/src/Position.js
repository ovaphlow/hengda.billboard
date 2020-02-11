import React, {useState, useEffect} from 'react'

import Title from './components/Title'
import Navbar from './components/Navbar'
import PlayImg from './components/PlayImg'
import { TextCheckbox } from './components/Button'

const PositionRow = props => (
  <>
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>电子维修工程师</strong>
        </div>
        <div className="pull-right">
          <a style={{ fontSize: 12 }} className="badge badge-pill badge-info" href="#/">
            查看
          </a>
        </div>
        <br></br>
        <span className="text-success">
          5000-8000
        </span>元月
        <br></br>
        <span className="pull-left text-muted">
          上海/本科 | 招聘人数 2人
            </span>
        <span className="pull-right text-muted">
          发布于: 2019/12/14
            </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
)

const Position = () => {

  const [types, setTypes] = useState({})

  const _onCheckboxChange = ({val,checked}) => {
    setTypes(types => ({
      ...types,
      [val]:checked
    }))
  }

  useEffect(()=> {
    console.info(types)
  },[types])

  return (
    <>
      <div className="container-fluid">
        <Title category="岗位" />
        <PlayImg />
        <div className="row mt-2 mb-2" style={{fontSize:12}}>
          <div className="col">
            城市
          </div>
          <div className="col">
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
        <PositionRow/>
        <PositionRow/>
        <PositionRow/>
      </div>
      <Navbar category="岗位" />
    </>

  )

}


export default Position