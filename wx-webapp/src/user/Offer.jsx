import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

const DataRow = ({
  recruitment_name,
  datime,
  enterprise_name,
  remark,
  address,
  phone1,
  phone2,
  mianshishijian,
}) => (
  <div className="card border-0 p-3 user-radius mb-2 mt-2">
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{recruitment_name}</strong>
        </div>
        <div className="pull-right">
          <span className="pull-right text-muted" style={{ fontSize: 11 }}>
            {datime}
          </span>
        </div>
        <br />
        <span className="text-success">{enterprise_name}</span>
        <br />
        {remark && (
          <>
            <span className="pull-left text-muted" style={{ fontSize: 11 }}>
              {remark}
            </span>
            <br />
          </>
        )}
        <span className="text-muted" style={{ fontSize: 11 }}>
          面试地点: {address}
        </span>
        <br />
        <span className="text-muted" style={{ fontSize: 11 }}>
          联系电话1: {phone1}
        </span>
        <br />
        {phone2 && (
          <>
            <span className="text-muted" style={{ fontSize: 11 }}>
              联系电话2: {phone2}
            </span>
            <br />
          </>
        )}
        <span className="text-muted" style={{ fontSize: 11 }}>
          面试时间: {mianshishijian}
        </span>
      </div>
    </div>
  </div>
);

DataRow.propTypes = {
  recruitment_name: PropTypes.string.isRequired,
  datime: PropTypes.string.isRequired,
  enterprise_name: PropTypes.string.isRequired,
  remark: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone1: PropTypes.string.isRequired,
  phone2: PropTypes.string,
  mianshishijian: PropTypes.string.isRequired,
};

DataRow.defaultProps = { phone2: undefined };

const Offer = () => {
  const [list, setList] = useState([]);

  const [totalFlg, setTotalFlg] = useState(false);

  const [auth, setAuth] = useState(0);

  useEffect(() => {
    let jobId = -1;
    const _auth = JSON.parse(localStorage.getItem('auth'));

    if (_auth !== null) {
      setAuth(_auth);
      fetch(`./api/offer/common/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          setList(res.content);
          setTotalFlg(true);
        });

      jobId = setInterval(() => {
        fetch(`./api/offer/common/${_auth.id}`)
          .then((res) => res.json())
          .then((res) => {
            setList(res.content);
          });
      }, 900000);
      return () => {
        if (jobId !== -1) {
          window.clearInterval(jobId);
        }
      };
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
            <h6>登录后可以查看邀请</h6>
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
          {list.length === 0 ? (
            <div className="chat-login">
              <h6>您还没有新的面试邀请</h6>
            </div>
          ) : (
            <div>{list && list.map((item) => <DataRow key={item.id} {...item} />)}</div>
          )}
        </div>
      )}
      <Navbar category="我的" totalFlg={totalFlg} />
    </>
  );
};

export default Offer;
