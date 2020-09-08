import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const RecruitmentRow = ({
  name,
  id,
  uuid,
  salary1,
  salary2,
  address1,
  address2,
  qty,
  date,
}) => {
  return (
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{name}</strong>
        </div>
        <div className="pull-right">
          <a
            style={{ fontSize: 14 }}
            className="badge badge-pill badge-info"
            href={`#/岗位/${id}?u_id=${uuid}`}
          >
            查看
          </a>
        </div>
        <br />
        <span className="text-success">
          {salary1 && salary2 ? `${salary1}-${salary2}` : '面议'}
        </span>
        {salary1 && salary2 ? '元月' : ''}
        <br />
        <span className="pull-left text-muted" style={{ fontSize: 11 }}>
          {address1}-{address2}
          |人数:
          {qty}
        </span>
        <span className="pull-right text-muted" style={{ fontSize: 11 }}>
          {date}
        </span>
      </div>
    </div>
  );
};
RecruitmentRow.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  salary1: PropTypes.string.isRequired,
  salary2: PropTypes.string.isRequired,
  education: PropTypes.string,
};

RecruitmentRow.defaultProps = {
  education: undefined,
};

export const RecruitmentRow1 = ({
  name,
  id,
  uuid,
  salary1,
  salary2,
  address1,
  address2,
  education,
  qty,
  date,
}) => {
  return (
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{name}</strong>
        </div>
        <div className="pull-right">
          <a
            style={{ fontSize: 14 }}
            className="badge badge-pill badge-info"
            href={`#/岗位/${id}?u_id=${uuid}`}
          >
            查看
          </a>
        </div>
        <br />
        <span className="text-success">
          {salary1 && salary2 ? `${salary1}-${salary2}` : '面议'}
        </span>
        {salary1 && salary2 ? '元月' : ''}
        <br />
        <span className="pull-left text-muted" style={{ fontSize: 11 }}>
          {address1} {address2}/{education}
          |人数:
          {qty}
        </span>
        <span className="pull-right text-muted" style={{ fontSize: 11 }}>
          {date}
        </span>
      </div>
    </div>
  );
};

RecruitmentRow1.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  salary1: PropTypes.number.isRequired,
  salary2: PropTypes.number.isRequired,
  education: PropTypes.string,
};

RecruitmentRow1.defaultProps = {
  education: undefined,
};

export const RecruitRow = ({ name, id, uuid, address2, address3, date, enterprise_name }) => (
  <div className="row">
    <div className="col">
      <div className="pull-left">
        <strong>{name}</strong>
      </div>
      <div className="pull-right">
        <a href={`#/校园招聘/${id}?u_id=${uuid}`}>
          详情
          <FontAwesomeIcon icon={faAngleRight} size="lg" fixedWidth />
        </a>
      </div>
      <br />
      <span className="text-muted" style={{ fontSize: 11 }}>
        举办地点:
        {address2}-{address3}
        <br />
        开始时间:
        {date}
      </span>
      <br />
      <span>{enterprise_name}</span>
    </div>
  </div>
);

RecruitRow.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  address3: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  enterprise_name: PropTypes.string.isRequired,
};

export const RecommendRow = ({ name, id, uuid, address1, address2, qty, enterprise_name }) => (
  <div className="row">
    <div className="col">
      <div className="pull-left">
        <strong>{name}</strong>
      </div>
      <div className="pull-right">
        <a href={`#主页/消息详情/${id}?u_id=${uuid}`}>
          详情
          <FontAwesomeIcon icon={faAngleRight} size="lg" fixedWidth />
        </a>
      </div>
      <br />
      <span className="text-muted" style={{ fontSize: 11 }}>
        工作地点：
        {address1}-{address2}
        |人数:
        {qty}
      </span>
      <br />
      <span>{enterprise_name}</span>
    </div>
  </div>
);

RecommendRow.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  enterprise_name: PropTypes.string.isRequired,
};
