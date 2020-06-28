import React, { useState, useEffect } from 'react'
import ToBack from '../components/ToBack'

const DataRow = props => (
  <>
    <div className="card border-0 p-3 mb-2 mt-2 shadow">
      <div className="row">
        <div className="col">
          <div className="pull-left">
            <strong>{props.name}</strong>
          ({props.status})
        </div>
          <div className="pull-right">
            <a style={{ fontSize: 14 }} className="badge badge-pill badge-info" href={`#/岗位/${props.id}?u_id=${props.uuid}`}>
              详情
          </a>
          </div>
          <br></br>
          <span className="text-success">
            {
              props.salary1 && props.salary2 ?
                `${props.salary1}-${props.salary2}` :
                '面议'
            }
          </span>{
            props.salary1 && props.salary2 ? '元月' : ''
          }
          <br></br>
          <span className="pull-left text-muted" style={{ fontSize: 11 }}>
            {props.address2 ? props.address2 : props.address1}/{props.education} | 招聘人数:{props.qty}
          </span>
          <span className="pull-right text-muted text-small" style={{ fontSize: 11 }}>
            投递于: {props.datime}
          </span>
        </div>
      </div>
    </div>
  </>
)


const Delivery = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'))
    if (_auth === null) {
      window.location = '#登录'
    } else {
      fetch(`./api/delivery/user/${_auth.id}`)
        .then(res => res.json())
        .then(res => {
          if (res.message) {
            window.alert(res.message)
          } else {
            setList(res.content)
          }
        })
    }
  }, [])


  return (
    <div className="container-fluid" style={{ fontSize: 14 }}>
      <ToBack category="投递情况" />
      <div className="mt-1"></div>
      {
        list && list.map((item, inx) =>
          <DataRow key={inx}  {...item} />)
      }
    </div>
  )

}

export default Delivery