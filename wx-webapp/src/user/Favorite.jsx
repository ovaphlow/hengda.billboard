import React, { useState, useEffect } from 'react';
import { RecruitmentRow, RecruitRow, RecommendRow } from '../components/DataRow';
import Navbar from '../components/Navbar';

const Favorite = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth === null) {
      window.location = '#登录';
    } else {
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

  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
        <div className="mt-2" />
        {list &&
          list.map((item) => (
            <div className="card border-0 p-3 user-radius mb-2 mt-2" key={item.id}>
              {dateRow(item)}
            </div>
          ))}
      </div>
      <Navbar category="我的" />
    </>
  );
};

export default Favorite;
