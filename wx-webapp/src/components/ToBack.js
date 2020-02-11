import React from 'react'


const ToBack = () => {
  
  const toPrevious = () => {
    window.history.go(-1)
  }

  return (
    <div className="row">
      <span className="text-dark p-2" style={{ fontSize: 13 }}>
        <i onClick={toPrevious}
          className="fa fa-fw fa-chevron-left fa-lg text-muted"></i>
      </span>
    </div>
  )

}

export default ToBack