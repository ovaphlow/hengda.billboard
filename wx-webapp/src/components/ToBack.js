import React from 'react'


const ToBack = props => {

  const toPrevious = () => {
    if (props.handleBack) {
      props.handleBack()
    }
    if (props.href) {
      window.location = props.href
    } else {
      window.history.go(-1)
    }
  }

  return (
    <div className="row p-2 bg-light">
      <div className="col" style={{ padding: 0 }}>
        <span onClick={toPrevious} className="text-left text-dark">
          <i 
            className="fa fa-fw fa-chevron-left fa-lg text-muted"></i>
          {props.category}
        </span>
      </div>
      <div className="col flex-end" style={{ padding: 0 }}>
        {
          props.report && (
            <a className="text-danger" href={`#/我的/举报/${props.dataId}/${props.dataType}`}>
              举报
            </a>
          )
        }
        {
          props.complaint && (
            <a className="text-danger" href="#/举报">
              投诉
            </a>
          )
        }
      </div>
    </div>
  )
}

export default ToBack