import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ToBack from '../../components/ToBack';
import { JournalTabs, DateTitle } from '../Components';

const DataRow = ({ address, datime, ip }) => (
  <>
    <div className="row">
      <div className="col">
        <div className="pull-left">
          <strong>{address}</strong>
        </div>
        <div className="pull-right text-muted" style={{ fontSize: 11 }}>
          {datime}
        </div>
        <br />
        <span className="pull-left text-muted">
          {ip}
        </span>
      </div>
    </div>
    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
  </>
);

DataRow.propTypes = {
  address: PropTypes.string.isRequired,
  datime: PropTypes.string.isRequired,
  ip: PropTypes.string.isRequired,
};

const LoginJournal = () => {
  const [list, setList] = useState({});

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth === null) {
      window.location = '#登录';
    } else {
      fetch(`/api/common-user/journal/${auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            const data = {};
            const today = moment().format('YYYY-MM-DD');
            res.content.forEach((item) => {
              let date = item.datime.split(' ')[0];
              if (today === date) {
                date = '今天';
              }
              if (data[date]) {
                data[date].push(item);
              } else {
                data[date] = [item];
              }
            });
            setList(data);
          }
        });
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="card mt-2">
        <ToBack category="操作记录" href="#我的" />
        <JournalTabs category="登录" />
        <div className="card-body">
          <div className="tab-content">
            <div className="tab-pane fade show active">
              {
                Object.getOwnPropertyNames(list).map((key) => (
                  <React.Fragment key={key}>
                    <DateTitle text={key} />
                    <div className="mt-2" />
                    {list[key].map((item) => <DataRow key={item.id} {...item} />)}
                  </React.Fragment>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginJournal;
