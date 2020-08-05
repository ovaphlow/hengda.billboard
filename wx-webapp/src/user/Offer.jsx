import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

const DataRow = ({
  recruitment_name, datime, enterprise_name, remark, address, phone1, phone2, mianshishijian,
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
        <span className="text-success">
          {enterprise_name}
        </span>
        <br />
        {
          remark && (
            <>
              <span className="pull-left text-muted" style={{ fontSize: 11 }}>
                {remark}
              </span>
              <br />
            </>
          )
        }
        <span className="text-muted" style={{ fontSize: 11 }}>
          面试地点:
          {' '}
          {address}
        </span>
        <br />
        <span className="text-muted" style={{ fontSize: 11 }}>
          联系电话1:
          {' '}
          {phone1}
        </span>
        <br />
        {
          phone2 && (
            <>
              <span className="text-muted" style={{ fontSize: 11 }}>
                联系电话2:
                {' '}
                {phone2}
              </span>
              <br />
            </>
          )
        }
        <span className="text-muted" style={{ fontSize: 11 }}>
          面试时间:
          {' '}
          {mianshishijian}
        </span>
      </div>
    </div>
  </div>
);

DataRow.propTypes = {
  recruitment_name: PropTypes.bool.isRequired,
  datime: PropTypes.string.isRequired,
  enterprise_name: PropTypes.func.isRequired,
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

  useEffect(() => {
    let jobId = -1;
    const _auth = JSON.parse(localStorage.getItem('auth'));

    if (_auth === null) {
      window.location = '#登录';
      return;
    }
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
    return (() => {
      if (jobId !== -1) {
        window.clearInterval(jobId);
      }
    });
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
        {list && list.map((item) => <DataRow key={item.id} {...item} />)}
      </div>
      <Navbar category="我的" totalFlg={totalFlg} />
    </>
  );
};

export default Offer;
