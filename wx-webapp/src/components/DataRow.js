import React from 'react'


export const RecruitmentRow = props => (
  <>
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{props.name}</strong>
        </div>
        <div className="pull-right">
          <a style={{ fontSize: 12 }} className="badge badge-pill badge-info" href={`#/岗位/${props.id}`}>
            查看
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
        <span className="pull-left text-muted">
          {props.address1} {props.address2}/{props.education} | 招聘人数:{props.qty}
        </span>
        <span className="pull-right text-muted">
          发布于: {props.date}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
)
