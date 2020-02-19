import React, {useState, useEffect} from 'react'

import Title from '../components/Title'
import Navbar from '../components/Navbar'
import PlayImg from '../components/PlayImg'
import { TextCheckbox } from '../components/Button'
import { RecruitmentRow } from '../components/DataRow'

const List = () => {

  const [types, setTypes] = useState({})

  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`./api/recruitment`)
    .then(res => res.json())
    .then(res => {
      if (res.content) {
        setList(res.content)
      } else {
        alert(res.message)
      }
    })
  },[])



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
        {list&&list.map(item => <RecruitmentRow key={item.id} {...item}/>)}
      </div>
      <Navbar category="岗位" />
    </>

  )

}


export default List