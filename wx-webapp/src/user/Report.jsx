import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import ToBack from '../components/ToBack';

const RecruitmentDetail = ({
  name, date, enterprise_name, address1, address2, education, category, salary1, salary2,
}) => (
  <>
    <div className="row">
      <div className="col">
        <h6>{name}</h6>
      </div>
      <div className="col-5">
        <span className="pull-right text-muted" style={{ fontSize: 14 }}>
          {date}
        </span>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <span className="text-muted" style={{ fontSize: 14 }}>
          {enterprise_name}
          <br />
          {address2 || address1}
          {' '}
          |
          {education}
          |
          {category}
        </span>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col">
        <h5 className="text-success">
          {
            salary1 && salary2
              ? `${salary1}-${salary2}/月`
              : '面议'
          }
        </h5>
      </div>
    </div>
  </>
);

RecruitmentDetail.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  enterprise_name: PropTypes.func.isRequired,
  education: PropTypes.string.isRequired,
  address2: PropTypes.string,
  address1: PropTypes.string,
  category: PropTypes.string.isRequired,
  salary1: PropTypes.string,
  salary2: PropTypes.string,
};

RecruitmentDetail.defaultProps = {
  address2: undefined,
  address1: undefined,
  salary1: undefined,
  salary2: undefined,
};

const EnterpriseDetail = ({
  name, zhuziguimo, yuangongshuliang, address1, address2, address3, address4,
}) => (
  <div className="row">
    <div className="col">
      <h5>{name}</h5>
      <span className="text-muted">
        {zhuziguimo}
        {' '}
        |
        {yuangongshuliang}
      </span>
      <br />
      <span className="text-muted">
        {address1}
        -
        {address2}
        -
        {address3}
      </span>
      <br />
      <span className="text-muted">
        详细地址:
        {' '}
        {address4}
      </span>
      <br />
    </div>
  </div>
);

EnterpriseDetail.propTypes = {
  name: PropTypes.string.isRequired,
  zhuziguimo: PropTypes.string.isRequired,
  yuangongshuliang: PropTypes.string.isRequired,
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
  address3: PropTypes.string.isRequired,
  address4: PropTypes.string.isRequired,
};

const Report = () => {
  const [content, setCntent] = useState('');

  const [auth, setAuth] = useState(0);

  const [data, setData] = useState({});

  const { id, category } = useParams();

  const { search } = useLocation();

  useEffect(() => {
    if (category === '岗位') {
      fetch(`./api/recruitment/${id}${search}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.content) {
            setData(res.content);
          } else {
            alert(res.message);
          }
        });
    }
    if (category === '企业') {
      fetch(`./api/enterprise/${id}${search}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setData(res.content);
          }
        });
    }
  }, [id, category, search]);

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth === null) {
      window.location = '#/登录';
    } else {
      setAuth(_auth);
    }
  }, []);

  const handleChange = (e) => {
    setCntent(e.target.value);
  };

  const handleSave = () => {
    if (content === '') {
      window.alert('请填写反馈内容');
      return;
    }
    fetch('./api/report/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        data_id: id,
        data_uuid: data.uuid,
        content,
        category,
        user_id: auth.id,
        user_uuid: auth.uuid,
        user_category: '个人用户',
        datime: moment().format('YYYY-MM-DD HH:mm'),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          alert(res.message);
        } else {
          alert('感谢你的反馈,我们将尽快处理');
          window.history.go(-1);
        }
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card border-0 shadow mt-2">
          <ToBack />
          <div className="card-body">
            <div className="mt-2">
              <h4>举报内容</h4>
            </div>
            <div className="card">
              <div className="card-body">
                {category === '企业' && <EnterpriseDetail {...data} />}
                {category === '岗位' && <RecruitmentDetail {...data} />}
              </div>
            </div>
            <div className="mt-2">
              <h4>举报原因</h4>
            </div>

            <div className="row mt-3">
              <div className="col">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    value={content}
                    onChange={handleChange}
                    rows="6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button type="button" className="btn btn-primary nav-btn" onClick={handleSave}>
            提交
          </button>
        </div>
      </ul>
    </>
  );
};

export default Report;
