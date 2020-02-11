import React from 'react'
import Title from './components/Title'
import Navbar from './components/Navbar'



const MessageRow = () => {

  return (
    <div className="row">
      <div 
        style={{
          background: 'url(lib/img/u679.svg)',
          backgroundSize: '100% 100%',
          paddingRight:0
        }}
        className="col-2">
        <span class="badge badge-pill badge-danger pull-right">1</span>   
      </div>
      <div className="col">
        <div className="row ">
          <div className="col">
            <h6 className="pull-left">
              <strong>黑龙江职业学院 </strong>  
            </h6>
            
            <span className="pull-right">
              15:34
            </span>
          </div>
        </div>
        <span className="text-muted">
          你好，周一有时间来面试吗?
        </span>
        <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}/>
      </div>
    </div>
  )
}


const Message = () => {

  return (
    <>
      <div className="container-fluid">
        <Title category="消息" />
        <MessageRow />
        <MessageRow />
        <MessageRow />
      </div>
      <Navbar category="消息"/>
    </>
  )

}

export default Message