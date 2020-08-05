import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropsTypes from 'prop-types';
import {
  faHome, faIdCard, faEnvelope, faUser,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  const [message, setMessage] = useState(0);

  const [offer, setOffer] = useState(0);

  const [sys, setSys] = useState(0);

  const [totalFlg, setTotalFlg] = useState(true);

  const { category } = props;

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth !== null) {
      fetch(`./api/message/common/total/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.content) {
            setMessage(res.content);
          } else {
            setMessage(0);
          }
        });
      fetch(`./api/offer/common/total/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.content) {
            setOffer(res.content);
          } else {
            setOffer(0);
          }
        });
      fetch(`./api/message/sys/total/个人用户/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.content) {
            setSys(res.content);
          } else {
            setSys(0);
          }
        });
    }
    const jobId = setInterval(() => {
      if (_auth !== null) {
        fetch(`./api/message/common/total/${_auth.id}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.content) {
              setMessage(res.content);
            } else {
              setMessage(0);
            }
          });
        fetch(`./api/offer/common/total/${_auth.id}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.content) {
              setOffer(res.content);
            } else {
              setOffer(0);
            }
          });
        fetch(`./api/message/sys/total/个人用户/${_auth.id}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.content) {
              setSys(res.content);
            } else {
              setSys(0);
            }
          });
      }
    }, 900000);
    return (() => window.clearInterval(jobId));
  }, []);

  useEffect(() => {
    const { totalFlg: _totalFlg } = props;
    if (totalFlg === _totalFlg) {
      return;
    }
    setTotalFlg(_totalFlg);
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth !== null && _totalFlg) {
      fetch(`./api/message/ent/total/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.content) {
            setMessage(res.content);
          } else {
            setMessage(0);
          }
        });
      fetch(`./api/message/sys/total/个人用户/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          setSys(res.content);
        });
    }
  }, [props, totalFlg]);

  return (
    <>
      <div style={{ height: 60 }} />
      <ul className="nav bg-white nav-light fixed-bottom border-top text-center  nav-bottom justify-content-center" style={{ fontSize: 11 }}>
        <li className="nav-item">
          <a href="#/" className={`nav-link ${category === '首页' ? 'text-primary' : 'text-muted'} `}>
            <FontAwesomeIcon icon={faHome} size="2x" fixedWidth />
            <br />
            首页
          </a>
        </li>

        <li className="nav-item">
          <a href="#岗位" className={`nav-link ${category === '岗位' ? 'text-primary' : 'text-muted'} `}>
            <FontAwesomeIcon icon={faIdCard} size="2x" fixedWidth />
            <br />
            岗位
          </a>
        </li>

        <li className="nav-item">
          <a href="#校园招聘" className={`nav-link ${category === '校园招聘' ? 'text-primary' : 'text-muted'} `}>
            <img style={{ width: 35, height: 25 }} src="lib/img/icon.png" alt="" />
            <br />
            校园招聘
          </a>
        </li>
        <li className="nav-item">

          <a href="#消息" className={`nav-link ${category === '消息' ? 'text-primary' : 'text-muted'} `}>
            <span className={`${message !== 0 ? 'message-point' : ''}`}>
              <FontAwesomeIcon icon={faEnvelope} size="2x" fixedWidth />
            </span>
            <br />
            消息
          </a>
        </li>
        <li className="nav-item">
          <a href="#我的" className={`nav-link ${category === '我的' ? 'text-primary' : 'text-muted'} `}>
            <span className={`${(offer + sys) !== 0 ? 'message-point' : ''}`}>
              <FontAwesomeIcon icon={faUser} size="2x" fixedWidth />
            </span>
            <br />
            <span className="">我的</span>
          </a>
        </li>
      </ul>
    </>
  );
};

Navbar.propTypes = {
  category: PropsTypes.string.isRequired,
  totalFlg: PropsTypes.bool.isRequired,
};

export default Navbar;
