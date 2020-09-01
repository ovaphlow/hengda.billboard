import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ToBack from '../../components/ToBack';
import { RecruitmentRow, RecruitRow, RecommendRow } from '../../components/DataRow';
import { JournalTabs, DateTitle } from '../Components';

const BrowseJournal = () => {
  const [list, setList] = useState({});
  const [auth, setAuth] = useState(0);

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth !== null) {
      setAuth(_auth);
      fetch(`./api/journal/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            const data = {};
            const today = moment().format('YYYY-MM-DD');
            res.content.forEach((item) => {
              let date = item.journal_date.split(' ')[0];
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

  const dataRow = (item) => {
    let row;
    if (item.data_category === '岗位') {
      row = <RecruitmentRow {...item} />;
    } else if (item.data_category === '校园招聘') {
      row = <RecruitRow {...item} />;
    } else if (item.data_category === '推荐信息') {
      row = <RecommendRow {...item} />;
    }
    return row;
  };

  const handleLogIn = async () => {
    window.location = '#/登录';
  };

  return (
    <>
      {auth === 0 ? (
        <div className="container-fluid">
          <ToBack category="操作记录" href="#我的" />
          <div className="chat-login">
            <h6>登录后可以查看操作记录</h6>
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
        <div className="container-fluid">
          <div className="card mt-2">
            <ToBack category="操作记录" href="#我的" />
            <JournalTabs category="浏览" />
            <div className="card-body">
              <div className="tab-content">
                <div className="tab-pane fade show active ">
                  {Object.getOwnPropertyNames(list).map((key) => (
                    <React.Fragment key={key}>
                      <DateTitle text={key} />
                      <div className="mt-2" />
                      {list[key].map((item) => (
                        <div key={item.id}>
                          {dataRow(item)}
                          <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrowseJournal;
