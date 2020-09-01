import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';

const DataRow = ({ title, content }) => (
  <div className="card border-0 p-3 user-radius mb-2 mt-2">
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{title}</strong>
        </div>
        <br />
        <span className="text-success">{content}</span>
      </div>
    </div>
  </div>
);

DataRow.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const SysMessage = () => {
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState(0);

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'));

    if (_auth !== null) {
      setAuth(_auth);
      fetch(`./api/message/sys/common/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          setList(res.content);
        });
    }
  }, []);

  const handleLogIn = async () => {
    window.location = '#/登录';
  };

  return (
    <>
      {auth === 0 ? (
        <div className="container-fluid">
          <div className="chat-login">
            <h6>登录后可以查看系统消息</h6>
            <button
              type="button"
              style={{ width: '25%' }}
              className="btn btn-block mx-auto rounded-pill button-background text-white font-weight"
              onClick={handleLogIn}
            >
              登&nbsp;录
            </button>
          </div>
        </div>
      ) : (
        <div className="container-fluid" style={{ fontSize: 14 }}>
          {list &&
            list.map(({ id, title, content }) => (
              <DataRow key={id} title={title} content={content} />
            ))}
        </div>
      )}
      <Navbar category="我的" />
    </>
  );
};

export default SysMessage;
