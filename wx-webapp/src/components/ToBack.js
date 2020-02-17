import React from 'react'


const ToBack = props => {
  
  const toPrevious = () => {
    if (props.handleBack) {
      props.handleBack()
    }
    window.history.go(-1)
  }

  return (
    <div className="row">
      <span className="text-dark p-2" style={{ fontSize: 15 }}>
        <i onClick={toPrevious}
          className="fa fa-fw fa-chevron-left fa-lg text-muted"></i>
        {props.category}
      </span>
    </div>
  )
}

export default ToBack