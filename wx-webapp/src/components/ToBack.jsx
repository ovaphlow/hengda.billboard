import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ToBack = (props) => {
  const { report, complaint, dataId, dataType, search } = props;

  const toPrevious = () => {
    if (props.handleBack) {
      props.handleBack();
    }
    if (props.href) {
      window.location = props.href;
    } else {
      window.history.go(-1);
    }
  };

  return (
    <div className="row pl-2 pr-2 pt-3">
      <div className="col">
        <span onClick={toPrevious} className="text-dark" aria-hidden="true">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" fixedWidth />
          {/* {props.category} */}
        </span>
      </div>
      {(report || complaint) && (
        <div className="col flex-end">
          {report && (
            <a className="text-danger" href={`#/我的/举报/${dataId}/${dataType}${search}`}>
              举报
            </a>
          )}
          {complaint && (
            <a className="text-danger" href="#/举报">
              投诉
            </a>
          )}
        </div>
      )}
    </div>
  );
};

ToBack.propTypes = {
  report: PropTypes.bool,
  handleBack: PropTypes.func,
  complaint: PropTypes.string,
  href: PropTypes.string,
  dataId: PropTypes.string,
  dataType: PropTypes.string,
  search: PropTypes.string,
};

ToBack.defaultProps = {
  report: undefined,
  handleBack: undefined,
  complaint: undefined,
  href: undefined,
  dataId: undefined,
  dataType: undefined,
  search: undefined,
};

export default ToBack;
