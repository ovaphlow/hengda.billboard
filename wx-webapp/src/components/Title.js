import React from 'react'

const Title = props => {
  return (
    <div className="row">
      <span className="text-dark p-2" style={{ fontSize: 13 }}>
        &nbsp;
      {props.category}
      </span>
    </div>
  )
}

export default Title