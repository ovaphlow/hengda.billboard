import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import ToBack from '../components/ToBack';
import { searchFavorite } from '../recruitment/Details';
import { FavoriteJournal, _BrowseJournal } from '../commonFetch';

const RecommendDetails = () => {
  const { id } = useParams();

  const { search } = useLocation();

  const [item, setItem] = useState(0);

  const [auth, setAuth] = useState(0);

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    fetch(`./api/recommend/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setItem(res.content);
          document.getElementById('content').innerHTML = res.content.content;
          _BrowseJournal(
            {
              data_id: id,
              data_uuid: res.content.uuid,
              category: '推荐信息',
            },
            () => {},
          );
        } else {
          alert(res.message);
        }
      });
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth !== null) {
      setAuth(_auth);
      searchFavorite({
        user_id: _auth.id,
        data_id: id,
        category1: '个人用户',
        category2: '推荐信息',
      }).then((res) => {
        if (res.content) {
          setFavorite(() => res.content);
        }
      });
    }
  }, [id, search]);

  const handleFavorite = () => {
    if (auth) {
      if (favorite) {
        fetch(`./api/favorite/${favorite.id}/`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.message === '') {
              setFavorite(false);
            } else {
              alert(res.message);
            }
          });
      } else {
        FavoriteJournal(
          {
            data_id: id,
            data_uuid: item.uuid,
            category2: '推荐信息',
          },
          (res) => {
            if (res.message === '') {
              searchFavorite({
                user_id: auth.id,
                data_id: id,
                category1: '个人用户',
                category2: '推荐信息',
              }).then((res1) => {
                if (res1.content) {
                  setFavorite(() => res1.content);
                }
              });
            } else {
              alert(res.message);
            }
          },
        );
      }
    } else {
      window.location = '#登录';
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card border-0 shadow mt-2 interface-bottom">
          <ToBack category={item.title} />
          <div className="card-body">
            <div className="row">
              <div className="col strong-center">
                <strong>{item.title}</strong>
                <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                发布时间：
                {item.date1}
              </div>
            </div>
            <div className="row">
              <div className="col">
                截止日期：
                {item.date2}
              </div>
            </div>
            <div className="row">
              <div className="col">
                所属省份：
                {item.address_level1}
              </div>
            </div>
            <div className="row">
              <div className="col">
                工作地点：
                {item.address_level2}
              </div>
            </div>
            <div className="row">
              <div className="col">
                单位：
                {item.publisher}
              </div>
            </div>
            <div className="row">
              <div className="col">
                招聘人数：
                {item.qty}
              </div>
            </div>
            <div className="row">
              <div className="col">
                报名方式：
                {item.baomignfangshi}
              </div>
            </div>
            <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
            <div className="row mt-3">
              <div className="col editor-body" id="content" />
            </div>
          </div>
        </div>
      </div>
      <div className="recommond-bottom" />
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <div className="col-2 nav-col" />
          <div className="col nav-col" />
          <div className="col-2 nav-col" />
          <div className="col-5 nav-col">
            <button type="button" className="btn btn-primary nav-btn" onClick={handleFavorite}>
              {favorite ? (
                <FontAwesomeIcon icon={faStar} style={{ color: '#FFFF00' }} fixedWidth />
              ) : (
                <FontAwesomeIcon icon={faStar} fixedWidth />
              )}
              收藏
            </button>
          </div>
        </div>
      </ul>
    </>
  );
};

export default RecommendDetails;
