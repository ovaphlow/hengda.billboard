import React, { useEffect, useState } from 'react';
import { RecruitRow1 } from '../components/DataRow';
// import CityDropdowns from '../components/CityDropdowns';
import Navbar from '../components/Navbar';

const KeywordSearch = () => {
  const [list, setList] = useState([]);

  // const [city, setCity] = useState('');

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    document.title = '校园招聘查询';
  }, []);

  const search = () => {
    fetch('./api/campus/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        city: '',
        category1: true,
        category2: true,
        keyword: keyword,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setList(res.content);
        } else {
          alert(res.message);
        }
      });
  };

  // const handleChange = (val) => {
  //   search({
  //     city: val,
  //     keyword,
  //   });
  //   setCity(val);
  // };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const _οnkeypress = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && event.target.value !== '') {
      search({
        keyword: event.target.value,
      });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row pb-2 pt-1 bg-transparent">
          <div className="col">
            <input
              type="text"
              id="search"
              className="w-100 border-0 text-center rounded-pill"
              placeholder="按照企业/学校名称查询"
              onChange={handleChange}
              onKeyPress={_οnkeypress}
              autoFocus
              style={{ outline: 0, height: 35 }}
            />
          </div>
        </div>
        <div className="card border-0 shadow">
          <div className="card-body">
            <div className="row mb-3" style={{ fontSize: 14 }}>
              <div className="col">{/* <CityDropdowns handleChange={handleChange} /> */}</div>
            </div>
            {list && list.map((item) => <RecruitRow1 key={item.id} {...item} />)}
          </div>
        </div>
      </div>
      <Navbar category="校园招聘" />
    </>
  );
};

export default KeywordSearch;
