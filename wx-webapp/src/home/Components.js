import React from 'react'

export const MessageRow = props => (
  <>
    <div className="row" style={{ fontSize: 11 }} onClick={props.toDetails}>
      <div className="col">
        <div className="pull-left">
          <strong>{props.title}</strong>
        </div>
        <div className="pull-right">
          <a href={`#主页/消息详情/${props.id}`}>
            详情
          <i className="fa fa-fw fa-lg  fa-angle-right"></i>
          </a>
        </div>
        <br></br>
        <span className="text-muted">
          工作地点：{props.address} | 招聘人数: {props.num}
        </span>
        <br></br>
        <span>
          {props.org}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}/>
  </>
)


export const TopicCard = props => (
  <>
    <div className="col bg-info text-light rounded" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} onClick={props.toDetails}>
      {props.title}
    </div>
    &nbsp;&nbsp;
  </>
)