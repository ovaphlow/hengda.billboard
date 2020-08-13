import React from 'react';
import PropTypes from 'prop-types';

export const Modal = (props) => {
  const { show, title, children, handleSave } = props;
  const close = () => {
    props.close();
  };

  return (
    <div
      className={`modal fade ${show && 'show modal-show'}`}
      style={{ position: 'absolute', overflow: 'inherit' }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow border-1 rounded-0">
          <div className="modal-header">
            <h5 className="modal-title">{title} </h5>
            <button className="close" type="button" onClick={close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body ">{children}</div>
          <div className="modal-footer">
            <button onClick={handleSave} className="btn btn-primary w-100" type="button">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export const Modal1 = (props) => {
  const { show, title, children, handleSave } = props;
  const close = () => {
    props.close();
  };

  return (
    <div
      className={`modal fade ${show && 'show modal-show'}`}
      style={{ position: 'absolute', overflow: 'inherit' }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow border-1 rounded-0">
          <div className="modal-header">
            <h5 className="modal-title">{title} </h5>
            <button className="close" type="button" onClick={close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body ">{children}</div>
          <div className="modal-footer">
            <button onClick={handleSave} className="btn btn-primary w-100" type="button">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal1.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default Modal;
