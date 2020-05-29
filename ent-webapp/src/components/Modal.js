import React from 'react'

const Modal = props => {

  const close = () => {
    props.close()
  }

  return (
    <div className={`modal fade ${props.show && 'show modal-show'}`} style={{ position: 'absolute', overflow: 'inherit' }} tabIndex="-1" >
      <div className="modal-dialog" >
        <div className="modal-content shadow border-1 rounded-0" >
          <div className="modal-header">
            <h5 className="modal-title">{props.title} </h5>
            <button className="close" onClick={close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body ">
            {props.children}
          </div>
          <div className="modal-footer">
            <button
              onClick={props.handleSave}
              className="btn btn-primary w-100">确定</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal