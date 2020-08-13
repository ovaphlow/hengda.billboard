import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from './Components';

const ChatRow = ({ name, active, total, text, handleClick, handleKeyDown }) => (
  <div
    className={`row chat-item border-bottom ${active && 'chat-item-active'} `}
    onClick={handleClick}
    onKeyDown={handleKeyDown}
    role="button"
    tabIndex="0"
  >
    <div className="col p-3">
      <div className="chat-text-box">
        {name}
        <br />
        <span className="text-muted">
          {!active && total !== 0 ? (
            <span className="badge badge-pill badge-danger">{total}</span>
          ) : (
            <></>
          )}{' '}
          &nbsp;
          {text}
        </span>
      </div>
    </div>
  </div>
);

ChatRow.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  total: PropTypes.bool,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func,
};

ChatRow.defaultProps = {
  total: undefined,
  handleKeyDown: undefined,
};

const LetfMessage = ({ name, datime, content }) => (
  <div className="row p-2">
    <div className="col">
      <div className="pull-left message-text shadow border rounded p-2">
        {name} {datime}
        <br />
        &nbsp;&nbsp;&nbsp;
        {content}
      </div>
    </div>
  </div>
);

LetfMessage.propTypes = {
  name: PropTypes.string.isRequired,
  datime: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const RightMessage = ({ name, datime, content }) => (
  <div className="row p-2">
    <div className="col">
      <div className="pull-right message-text shadow border rounded p-2">
        {name} {datime}
        <br />
        &nbsp;&nbsp;&nbsp;
        {content}
      </div>
    </div>
  </div>
);

RightMessage.propTypes = {
  name: PropTypes.string.isRequired,
  datime: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

// const Mianshi = props => (
//   <>
//     <div className="row p-2 ">
//       <div className="col">
//         面试邀请
//     </div>
//     </div>
//     <hr className="m-1" />
//     <div className="row p-2  mt-2">
//       <div className="col" style={{ maxWidth: 400 }} >
//         {props.remark}
//       </div>
//     </div>
//     <div className="row p-2">
//       <div className="col">
//         <span className="text-muted" style={{ fontSize: 15 }}>
//           面试地点: {props.address}<br />
//           面试时间: {props.datime}<br />
//           面试岗位: {props.recruitment_name}<br />
//           联系电话: {props.phone}<br />
//         </span>
//       </div>
//     </div>
//   </>
// )

const Audition = () => {
  const [text, setText] = useState('');

  const [chatList, setChatList] = useState([]);

  const [nowUser, setNowUser] = useState(0);

  const [auth, setAuth] = useState(0);

  const [totalFlg, setTotalFlg] = useState(false);

  const [contentList, setContentList] = useState([]);

  const [chatTotal, setChatTotal] = useState([]);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    let jobId1 = -1;
    if (_auth !== null) {
      setAuth(_auth);
      fetch(`./api/message/企业用户/${_auth.id}/`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            if (res.content.length > 0) {
              setNowUser(res.content[0]);
              jobId1 = setInterval(() => {
                fetch(`./api/message/ent/chat/total/${_auth.id}`)
                  .then((res1) => res1.json())
                  .then((res1) => {
                    setChatTotal(res1.content);
                  });
              }, 900000);
              fetch(`./api/message/ent/chat/total/${_auth.id}`)
                .then((res1) => res1.json())
                .then((res1) => {
                  setChatTotal(res1.content);
                });
              fetch(`./api/message/ent/content/${_auth.id}/${res.content[0].common_user_id}`)
                .then((res1) => res1.json())
                .then((res1) => {
                  setTotalFlg(false);
                  setContentList(res1.content);
                });
            }
            setChatList(res.content);
          }
        });
    }
    return () => {
      if (jobId1 !== -1) {
        window.clearInterval(jobId1);
      }
    };
  }, []);

  useEffect(() => {
    if (auth) {
      if (nowUser) {
        fetch(`./api/message/ent/content/${auth.id}/${nowUser.common_user_id}`)
          .then((res) => res.json())
          .then((res) => {
            setContentList(res.content);
          });
      }
      fetch(`./api/message/企业用户/${auth.id}/`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setChatList(res.content);
          }
        });
    }
  }, [chatTotal, auth, nowUser]);

  useEffect(() => {
    const div = document.getElementById('chat-body');
    div.scrollTop = div.scrollHeight;
  }, [contentList]);

  const handleClick = (user) => {
    if (user.common_user_id === nowUser.common_user_id) {
      return;
    }
    setText('');
    setNowUser(user);
    setTotalFlg(true);
  };

  const handleChange = (event) => {
    setText(event.target.value.trim());
  };

  const handlePush = () => {
    if (text === '') {
      return;
    }
    const data = {
      category: 'ent_to_common',
      ent_user_id: auth.id,
      common_user_id: nowUser.common_user_id,
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
          fetch(`./api/message/ent/chat/total/${auth.id}`)
            .then((res1) => res1.json())
            .then((res1) => {
              setText('');
              setChatTotal(res1.content);
            });
        }
      });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handlePush();
      return false;
    }
  };

  return (
    <View category="会话" totalFlg={totalFlg}>
      <div className="row bg-white shadow ">
        <div className="col-2 border">
          <div className="row  border-bottom">
            <div className="col p-2">近期消息</div>
          </div>
          <div className="row chat-list">
            <div className="col">
              {chatList &&
                chatList.map((item) => (
                  <ChatRow
                    key={item.name}
                    name={item.name}
                    text={item.content}
                    total={
                      chatTotal.length > 0 &&
                      chatTotal.find((it) => (it.common_user_id === item.common_user_id).count)
                    }
                    handleClick={() => handleClick(item)}
                    active={item.common_user_id === nowUser.common_user_id}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="col-10 border">
          {nowUser ? (
            <div className="row  border-bottom">
              <div className="col text-center p-2">{nowUser.name}</div>
            </div>
          ) : (
            ''
          )}
          <div id="chat-body" className="row border-bottom chat-body">
            <div className="col mt-3">
              {contentList &&
                contentList.map((item) => {
                  return item.category === 'common_to_ent' ? (
                    <LetfMessage name={nowUser.name} {...item} key={item.id} />
                  ) : (
                    <RightMessage key={item.id} name="我" {...item} text={item.content} />
                  );
                })}
            </div>
          </div>
          {nowUser ? (
            <div className="row textarea-row border-bottom">
              <div className="col-12 textarea-col">
                <textarea
                  value={text}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="message-textarea"
                  placeholder="请填写内容"
                />
              </div>

              <div className="col-12 ">
                {text === '' || !nowUser ? (
                  <button className="btn btn-sm btn-secondary pull-right" type="button" disabled>
                    发送
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-primary pull-right"
                    type="button"
                    onClick={handlePush}
                  >
                    发送
                  </button>
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </View>
  );
};

export default Audition;
