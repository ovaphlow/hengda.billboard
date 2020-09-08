import React, { useState, useEffect } from 'react';
import { RecruitmentRow, RecruitRow, RecommendRow } from '../components/DataRow';
import Navbar from '../components/Navbar';

const Favorite = () => {
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState(0);

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth !== null) {
      setAuth(_auth);
      fetch(`./api/favorite/个人用户/${_auth.id}/`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setList(res.content);
          }
        });
    }
  }, []);

  const dateRow = (item) => {
    let row;
    if (item.category2 === '岗位') {
      row = <RecruitmentRow {...item} />;
    } else if (item.category2 === '校园招聘') {
      row = <RecruitRow {...item} />;
    } else if (item.category2 === '推荐信息') {
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
          <div className="chat-login">
            <h6>登录后可以查看收藏</h6>
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
              <h6>您还没有收藏任何信息</h6>
            </div>
          ) : (
            <div>
              <div className="mt-2" />
              {list &&
                list.map((item) => (
                  <div className="card border-0 p-3 user-radius mb-2 mt-2" key={item.id}>
                    {dateRow(item)}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
      <Navbar category="我的" />
    </>
  );
};

export default Favorite;
