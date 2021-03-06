import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import ToBack from '../components/ToBack';

const LetfMessage = ({ name, datime, content }) => (
  <div className="row p-2">
    <div className="col">
      {/* <div className="pull-left pr-2" >
        <img className="rounded-circle message-img" src="lib/img/u868.png" alt="" />
      </div> */}
      <div className="pull-left message-text shadow border rounded p-2">
        {name} {datime}
        <br />
        &nbsp;&nbsp;&nbsp;
        {content}
      </div>
    </div>
  </div>
);

const RightMessage = ({ name, datime, content }) => (
  <div className="row p-2">
    <div className="col">
      {/* <div className="pull-right pl-2" >
        <img className="rounded-circle message-img" src="lib/img/u868.png" alt="" />
      </div> */}
      <div className="pull-right message-text shadow border rounded p-2">
        {name} {datime}
        <br />
        &nbsp;&nbsp;&nbsp;
        {content}
      </div>
    </div>
  </div>
);

const messagePropType = {
  name: PropTypes.string.isRequired,
  datime: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

LetfMessage.propTypes = messagePropType;
RightMessage.propTypes = messagePropType;

// const Mianshi = props => (
//   <>
//     <div className="row p-2 ">
//       <div className="col">
//         面试邀请
//       </div>
//     </div>
//     <hr className="m-1" />
//     <div className="row p-2  mt-2" style={{ fontSize: 14 }}>
//       <div className="col" >
//         {props.remark}
//       </div>
//     </div>
//     <div className="row p-2">
//       <div className="col">
//         <span className="text-muted" style={{ fontSize: 10 }}>
//           面试地点: {props.address}<br />
//           面试时间: {props.datime}<br />
//           面试岗位: {props.recruitment_name}<br />
//           联系电话: {props.phone}<br />
//         </span>
//       </div>
//     </div>
//   </>
// )

const Chat = () => {
  const { user_id, title } = useParams();

  const [contentList, setContentList] = useState([]);

  const [text, setText] = useState('');

  const [auth, setAuth] = useState(0);

  useEffect(() => {
    let jobId = -1;
    const _auth = JSON.parse(localStorage.getItem('auth'));
    if (_auth === null) {
      window.location = '#登录';
    } else {
      setAuth(_auth);
      fetch(`./api/message/common/content/${user_id}/${_auth.id}/`)
        .then((res) => res.json())
        .then((res) => {
          setContentList(res.content.filter((item) => item.content !== ''));
        });
      jobId = setInterval(() => {
        fetch(`./api/message/common/content/${user_id}/${_auth.id}/`)
          .then((res) => res.json())
          .then((res) => {
            setContentList(res.content.filter((item) => item.content !== ''));
          });
      }, 900000);
    }
    return () => {
      if (jobId !== -1) {
        window.clearInterval(jobId);
      }
    };
  }, [user_id]);

  useEffect(() => {
    document.documentElement.scrollTop = document.body.scrollHeight;
  }, [contentList]);

  const handleChange = (event) => {
    setText(event.target.value.trim());
  };

  const handlePush = () => {
    if (text === '') {
      return;
    }
    const data = {
      category: 'common_to_ent',
      ent_user_id: user_id,
      common_user_id: auth.id,
      content: text,
    };
    fetch('./api/message/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          setText('');
          fetch(`./api/message/common/content/${user_id}/${auth.id}/`)
            .then((res1) => res1.json())
            .then((res1) => {
              setContentList(res1.content.filter((item) => item.content !== ''));
            });
        }
      });
  };

  return (
    <>
      <div className="fixed-top border-bottom" style={{ fontSize: 14 }}>
        <div className="p-1 bg-white">
          <ToBack category={title} />
        </div>
      </div>
      <div className="container-fluid chat-background" id="chat-body" style={{ fontSize: 14 }}>
        <div className="row p-4" />
        <div className="row " id="chat-body3">
          <div className="col" id="chat-body1">
            {contentList &&
              contentList.map((item, inx) => {
                return item.category === 'common_to_ent' ? (
                  <RightMessage key={item.datime + inx.toString()} name="我:" {...item} />
                ) : (
                  <LetfMessage key={item.datime + inx.toString()} name={title} {...item} />
                );
              })}
          </div>
        </div>
      </div>
      <div style={{ height: 50 }} />
      <ul className="nav bg-light nav-light fixed-bottom nav-bottom border-top">
        <div className="input-group ">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            className="form-control rounded-0 h-100 input-f"
            style={{ outline: 'none' }}
            placeholder="请输入内容"
          />
          <div className="input-group-append">
            {text === '' ? (
              <button type="button" className="btn btn-secondary rounded-0">
                发送
              </button>
            ) : (
              <button type="button" onClick={handlePush} className="btn btn-primary rounded-0">
                发送
              </button>
            )}
          </div>
        </div>
      </ul>
    </>
  );
};

export default Chat;
