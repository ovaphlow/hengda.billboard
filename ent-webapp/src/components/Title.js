import React from 'react'

const Title = () => {
  return (
    <div className="row bg-white">
      <div className="col px-5 mt-2 mb-2">
        <img className="img-fluid pull-left logo" alt="" src={require('./img/logo.png')}/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img className="img-fluid ad" alt="" src={require('./img/ad.png')} />
      </div>
    </div>
  )
}

export default Title
