import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import Title from '../components/Title'
import Navbar from '../components/Navbar';

const MessageRow = ({
  name, ent_user_id, total, content,
}) => {
  const handleClick = () => {
    window.location = `#消息/${name}/${ent_user_id}`;
  };

  return (
    <div className="card border-0 mt-2 shadow">
      <div className="card-body p-3">
        <div className="row" onClick={handleClick} aria-hidden="true">
          {/* <div
        style={{
          background: 'url(lib/img/u679.svg)',
          backgroundSize: '100% 100%',
          paddingRight: 0
        }}
        className="col-2">
        {

        } &nbsp;
      </div> */}
          <div className="col">
            <div className="row ">
              <div className="col">
                <h6 className="pull-left">
                  <strong>{name}</strong>
                  &nbsp;
                  {total !== 0 ? (<span className="badge badge-danger">{total}</span>) : (<></>)}
                </h6>
              </div>
            </div>
            <span className="text-muted">
              {content}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

MessageRow.propTypes = {
  name: PropTypes.string.isRequired,
  ent_user_id: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const List = () => {
  const [chatList, setChatList] = useState([]);

  const [chatTotal, setChatTotal] = useState([]);

  // const [offerTotal, setOfferTotal] = useState(0)

  const [auth, setAuth] = useState(0);

  useEffect(() => {
    document.title = '消息';
    const _auth = JSON.parse(localStorage.getItem('auth'));
    let jobId1 = -1;
    const jobId2 = -1;
    if (_auth === null) {
      window.location = '#登录';
      return;
    }
    setAuth(_auth);
    fetch(`./api/message/个人用户/${_auth.id}/`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          fetch(`./api/message/common/chat/total/${_auth.id}`)
            .then((res1) => res1.json())
            .then((res1) => {
              setChatTotal(res1.content);
            });
          jobId1 = setInterval(() => {
            fetch(`./api/message/common/chat/total/${_auth.id}`)
              .then((res1) => res1.json())
              .then((res1) => {
                setChatTotal(res1.content);
              });
          }, 900000);
          setChatList(res.content);
        }
      });

    return (() => {
      if (jobId1 !== -1) {
        window.clearInterval(jobId1);
      }
      if (jobId2 !== -1) {
        window.clearInterval(jobId2);
      }
    });
  }, []);

  useEffect(() => {
    if (auth) {
      fetch(`./api/message/个人用户/${auth.id}/`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setChatList(res.content);
          }
        });
    }
  }, [chatTotal, auth]);

  // const handleClick = () => {
  //   window.location = `#消息/邀请/`
  // }

  return (
    <>
      <div className="container-fluid">
        {/* <Title category="消息" /> */}
        {/* <div className="row">
          <div
            style={{
              background: 'url(lib/img/u679.svg)',
              backgroundSize: '100% 100%',
              paddingRight: 0
            }}
            className="col-2">

          </div>
          <div className="col">
            <div className="row " onClick={handleClick}>
              <div className="col">
                <h6 className="pull-left text-primary">
                  <strong>面试邀请</strong>
                  &nbsp;
                  {
                    offerTotal !== 0 ? (<span className="badge badge-pill badge-danger pull-right">
                    {offerTotal}</span>) : (<></>)
                  }
                </h6>
              </div>
            </div>
            <br />
            <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
          </div>
        </div> */}
        {chatList && chatList.map((item) => (
          <MessageRow
            key={item.ent_user_id}
            {...item}
            total={chatTotal.length > 0 && chatTotal
              .find((it) => it.ent_user_id === item.ent_user_id).count}
          />
        ))}
      </div>
      <Navbar category="消息" />
    </>
  );
};

export default List;
