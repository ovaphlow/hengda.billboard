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
        <span className="text-success">
          {content}
        </span>
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

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'));

    if (_auth === null) {
      window.location = '#登录';
      return;
    }
    fetch(`./api/message/sys/common/${_auth.id}`)
      .then((res) => res.json())
      .then((res) => {
        setList(res.content);
      });
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
        {
          list && list.map(
            ({ id, title, content }) => <DataRow key={id} title={title} content={content} />,
          )
        }
      </div>
      <Navbar category="我的" />
    </>
  );
};

export default SysMessage;
