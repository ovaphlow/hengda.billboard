import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import ToBack from '../components/ToBack';
import { searchFavorite } from '../recruitment/Details';
import { _EditJournal, FavoriteJournal, _BrowseJournal } from '../commonFetch';

const Details = () => {
  const [item, setItem] = useState(0);

  const [favorite, setFavorite] = useState(false);

  const [auth, setAuth] = useState(0);

  const [schedule, setSchedule] = useState(false);

  const { id } = useParams();

  const { search } = useLocation();

  useEffect(() => {
    fetch(`./api/campus/${id}${search}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.content) {
          setItem(res.content);
          if (document.getElementById('content') !== null) {
            document.getElementById('content').innerHTML = res.content.content;
          }
          _BrowseJournal(
            {
              data_id: id,
              data_uuid: res.content.uuid,
              category: '校园招聘',
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
        category2: '校园招聘',
      }).then((res) => {
        if (res.content) {
          setFavorite(res.content);
        }
      });

      fetch(`./api/common-user-schedule/user/${_auth.id}/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setSchedule(res.content);
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
            category2: '校园招聘',
          },
          (res) => {
            if (res.message === '') {
              searchFavorite({
                user_id: auth.id,
                data_id: id,
                category1: '个人用户',
                category2: '校园招聘',
              }).then((res1) => {
                if (res1.content) {
                  setFavorite(res1.content);
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

  const handleSchedule = () => {
    if (auth) {
      fetch('./api/common-user-schedule/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          common_user_id: auth.id,
          campus_id: id,
          name: item.title,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          _EditJournal(
            {
              category2: '日程',
              data_id: item.id,
              data_uuid: item.uuid,
              remark: `将<${item.title}>加入日程`,
            },
            () => {},
          );
          setSchedule({ id: res.content });
        });
    } else {
      window.location = '#登录';
    }
  };

  const deleteSchedule = () => {
    if (auth) {
      fetch(`./api/common-user-schedule/${schedule.id}?d=${id}&uuid=${auth.uuid}&u=${auth.id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          _EditJournal(
            {
              category2: '日程',
              data_id: item.id,
              data_uuid: item.uuid,
              remark: `将<${item.title}>移出日程`,
            },
            () => {},
          );
          setSchedule(false);
        });
    } else {
      window.location = '#登录';
    }
  };

  const favoriteIcon = () => {
    if (favorite) {
      return <FontAwesomeIcon icon={faStar} style={{ color: '#FFFF00' }} fixedWidth />;
    } else {
      return <FontAwesomeIcon icon={faStar} fixedWidth />;
    }
  };

  const scheduleButton = () => {
    if (schedule) {
      return (
        <button type="button" className="btn btn-danger nav-btn" onClick={deleteSchedule}>
          <FontAwesomeIcon icon={faMinusCircle} fixedWidth />
          移出日程
        </button>
      );
    } else {
      return (
        <button type="button" className="btn btn-success nav-btn" onClick={handleSchedule}>
          <FontAwesomeIcon icon={faPlusCircle} fixedWidth />
          加入日程
        </button>
      );
    }
  };

  return (
    <>
      <div className="container-fluid" style={{ fontSize: 14 }}>
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
                举办方:
                {item.school}
              </div>
            </div>
            <div className="row">
              <div className="col">
                举办时间: {item.date} {item.time}
              </div>
            </div>
            <div className="row">
              <div className="col">
                举办地点: {item.address_level1}-{item.address_level2}-{item.address_level3}
                <br />
                {item.address_level4}
              </div>
            </div>
            <div className="row">
              <div className="col">简介:</div>
            </div>
            <div className="row ">
              <div className="col editor-body" id="content" />
            </div>
          </div>
        </div>
      </div>
      <div className="recommond-bottom" />
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="row text-center nav-row">
          <button
            type="button"
            className="btn btn-light nav-btn text-muted"
            onClick={handleFavorite}
          >
            {favoriteIcon()}
            收藏
          </button>
        </div>
        <div className="col-4 nav-col">{scheduleButton()}</div>
      </ul>
    </>
  );
};

export default Details;
