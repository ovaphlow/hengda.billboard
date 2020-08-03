import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


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
    <div className="row pl-2 pr-2">
      <div className="col">
        <span onClick={toPrevious} className="text-dark">
          <FontAwesomeIcon icon={faChevronLeft} size='lg' fixedWidth />
          {/* {props.category} */}
        </span>
      </div>
      {(props.report || props.complaint) && (
        <div className="col flex-end">
          {
            props.report && (
              <a className="text-danger" href={`#/我的/举报/${props.dataId}/${props.dataType}${props.search}`}>
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
      )}
    </div>
  )
}

export default ToBack