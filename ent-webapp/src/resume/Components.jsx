import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const Sidebar = ({ category }) => (
  <div className="list-group bg-white shadow sidebar">
    <a
      href="#简历/列表"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '列表' && 'text-primary'
      }`}
    >
      已收到的简历
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#/简历/检索"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '检索' && 'text-primary'
      }`}
    >
      简历检索
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>

    <a
      href="#简历/收藏"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '收藏' && 'text-primary'
      }`}
    >
      我的收藏
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
    <a
      href="#简历/推荐"
      className={`list-group-item list-group-item-action border-0 font-weight-bold ${
        category === '推荐' && 'text-primary'
      }`}
    >
      系统推荐
      <span className="pull-right">
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </span>
    </a>
  </div>
);

Sidebar.propTypes = {
  category: PropTypes.string.isRequired,
};

export const View = ({ category, children }) => (
  <div className="row px-5 mt-4">
    <div className="col-md-2 ">
      <Sidebar category={category} />
    </div>
    <div className="col-md-10">{children}</div>
  </div>
);

View.propTypes = {
  category: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export const ResumeView = (props) => {
  const {
    name,
    gender,
    birthday,
    address2,
    phone,
    email,
    bar,
    qiwanghangye,
    qiwangzhiwei,
    yixiangchengshi,
    school,
    education,
    date_begin,
    date_end,
    ziwopingjia,
  } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    if (props.common_user_id) {
      document.getElementById("ziwopingjia").innerHTML = ziwopingjia;
      fetch(`./api/common-user-file/${props.common_user_id}/简历/`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setList(() => res.content);
          }
        });
    }
  }, [props, ziwopingjia]);

  const age = (birthday1) => {
    if (birthday1 && birthday1 !== '') {
      return `${parseInt(moment().format('YYYY'), 10) - parseInt(birthday1.slice(0, 4), 10)}岁`;
    } else {
      return '0岁';
    }
  };

  const phoneHide = (phone1) => {
    if (phone1 && phone1.length === 11) {
      return `${phone1[0]}${phone1[1]}${phone1[2]} **** ${phone1[7]}${phone1[8]}${phone1[9]}${phone1[10]}`;
    } else {
      return '错误的号码格式';
    }
  };

  const emailHide = (email1) => {
    if (email1 && email1.split('@').length > 1) {
      const strs = email1.split('@');
      return `${strs[0].replace(/./g, '*')}@${strs[1]}`;
    } else {
      return '错误的邮箱格式';
    }
  };

  return (
    <>
      <div className="row">
        <div className="col item-middle">
          {/* <img
            className="img-fluid pull-left"
            style={{ height: 100 }}
            alt=""
            src={require('../components/img/user.jpg')} /> */}
          <div>
            <h3>{name}</h3>
            <span className="text-muted">
              {gender}
              &nbsp;|&nbsp;
              {age(birthday)}
              &nbsp;|&nbsp;
              {address2}
              <br />
              <FontAwesomeIcon icon={faPhoneAlt} fixedWidth />
              {phoneHide(phone)} &nbsp;
              <FontAwesomeIcon icon={faEnvelope} fixedWidth />
              {emailHide(email)}
            </span>
          </div>
        </div>
        <div className="col">{bar}</div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>求职意向</h4>
          <span className="text-muted">
            期望行业:&nbsp;
            {qiwanghangye}/{qiwangzhiwei}
            <br />
            期望地点:&nbsp;
            {yixiangchengshi}
          </span>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>毕业院校</h4>
          <span style={{ fontSize: 'larger' }}>{school}</span>
          <span className="text-muted">
            /{education}
            <br />
            在校时间: {date_begin}
            &nbsp; - &nbsp;
            {date_end}
          </span>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>自我评价</h4>
          <div className="text-muted" id="ziwopingjia"></div>
        </div>
      </div>
      <hr />
      <div className="row mb-2">
        <div className="col">
          <h4>相关证书</h4>
          {list &&
            list.map((item) => <img key={item.id} className="img col-3" alt="" src={item.file} />)}
        </div>
      </div>
      <hr />
    </>
  );
};

ResumeView.propTypes = {
  common_user_id: PropTypes.number,
  name: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  address2: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  bar: PropTypes.element,
  qiwanghangye: PropTypes.string,
  qiwangzhiwei: PropTypes.string,
  yixiangchengshi: PropTypes.string,
  school: PropTypes.string,
  education: PropTypes.string,
  date_begin: PropTypes.string,
  date_end: PropTypes.string,
  ziwopingjia: PropTypes.string,
};

ResumeView.defaultProps = {
  common_user_id: undefined,
  name: undefined,
  gender: undefined,
  birthday: undefined,
  address2: undefined,
  phone: undefined,
  email: undefined,
  bar: undefined,
  qiwanghangye: undefined,
  qiwangzhiwei: undefined,
  yixiangchengshi: undefined,
  school: undefined,
  education: undefined,
  date_begin: undefined,
  date_end: undefined,
  ziwopingjia: undefined,
};
