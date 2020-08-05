import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

// import Title from '../components/Title'
import Navbar from '../components/Navbar';
import PlayImg from '../components/PlayImg';
import TextCheckbox from '../components/Button';
import { RecommendRow, TopicCards } from './Components';
import RECOMMEND_TYPE from '../constant';

const HomePage = () => {
  const [recommendList, setRecommendList] = useState([]);

  const [topicList, setTopicList] = useState([]);

  const [recommendTypes, setRecommendTypes] = useState({});

  const [auth, setAuth] = useState(0);

  useEffect(() => {
    document.title = '龙江学子就业平台';
    const _auth = localStorage.getItem('auth');
    if (_auth !== null) {
      setAuth(JSON.parse(_auth));
    }
    fetch('./api/topic/common/')
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setTopicList(res.content);
        }
      });
    fetch('./api/recommend/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setRecommendList(res.content);
        }
      });
  }, []);

  const _onCheckboxChange = ({ name, checked }) => {
    setRecommendTypes((types) => ({
      ...types,
      [name]: checked,
    }));
    fetch('./api/recommend/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...recommendTypes,
        [name]: checked,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setRecommendList(res.content);
        } else {
          alert(res.message);
        }
      });
  };

  // const _οnkeypress = event => {
  //   const keyCode = event.which || event.keyCode
  //   if(keyCode === 13 && event.target.value !== ''){
  //     // window.location=`#主页/查询/${event.target.value}`
  //   }
  // }

  return (
    <>
      <div className="container-fluid">
        <PlayImg category="小程序-首页" />
        <div className="row pb-2 pt-2" style={{ backgroundColor: '#f5f5f5' }}>
          {
            auth === 0 ? (
              <div className="col text-center">
                <a className="text-black-50" href="#登录">
                  <strong className="text-primary">登录</strong>
                  完善信息，为您精准推荐职位信息
                </a>
              </div>
            ) : (
              <div className="col">
                <input
                  type="text"
                  className="w-100 border-0 text-center rounded-pill"
                  placeholder="按照企业/职位名称查询"
                  onClick={() => { window.location = '#主页/查询/'; }}
                  style={{ outline: 0, height: 35 }}
                />
              </div>
            )
          }
        </div>

        <div className="p-2 border-0 bg-white rounded card-body shadow ">
          <div>
            <h6>
              <FontAwesomeIcon icon={faFire} size="lg" className="text-danger" fixedWidth />
              热门话题
            </h6>
          </div>
          <TopicCards list={topicList} />
        </div>
        <div className="mt-2 p-2 border-0 bg-white rounded card-body shadow ">
          <div className="row p-2">
            <div className="col">
              <h6 className="pull-left">
                <FontAwesomeIcon icon={faThumbsUp} size="lg" className="text-warning" fixedWidth />
                推荐信息
              </h6>
              <ul
                className="pull-right"
                style={{
                  marginBottom: 0,
                  display: 'flex',
                  paddingLeft: 0,
                  listStyle: 'none',
                }}
              >
                {RECOMMEND_TYPE.map((item) => (
                  <li className="nav-item" key={item.name}>
                    <TextCheckbox name={item.name} onChange={_onCheckboxChange}>
                      {item.value}
                    </TextCheckbox>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {
            recommendList && recommendList.map((item) => <RecommendRow key={item.id} {...item} />)
          }
        </div>
        <br />
      </div>

      <Navbar category="首页" />
    </>
  );
};

export default HomePage;
