import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import moment from 'moment';

import { Title, Navbar } from './Components';

export default function FeedbackRouter() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = '#登录';
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/投诉及反馈/投诉"><Complaint /></Route>
        <Route path="/投诉及反馈/意见反馈"><Feedback /></Route>
      </Switch>
    </Router>
  );
}

function SideNav(props) {
  const { category } = props;

  return (
    <div className="list-group">
      <h6 className="text-muted">
        <strong>选择功能</strong>
      </h6>

      <div>
        <a
          href="#投诉及反馈/投诉"
          className={`text-small list-group-item list-group-item-action ${category === '投诉' ? 'active' : ''}`}
        >
          投诉
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>

        <a
          href="#投诉及反馈/意见反馈"
          className={`text-small list-group-item list-group-item-action ${category === '意见反馈' ? 'active' : ''}`}
        >
          意见反馈
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right" />
          </span>
        </a>
      </div>
    </div>
  );
}

function Complaint() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/feedback/complaint/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setData(res.content);
    })();
  }, []);

  const handleReply = async (event) => {
    const content = window.prompt('对投诉回复的内容');
    const response = await window.fetch('/api/feedback/complaint/reply', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: event.target.getAttribute('data-id'),
        user_id: event.target.getAttribute('data-user-id'),
        user_category: event.target.getAttribute('data-user-category'),
        category: '系统消息',
        title: '对用户投诉内容的回复',
        content,
        datime: moment().format('YYYY-MM-DD'),
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location.reload(true);
  };

  return (
    <>
      <Title />
      <Navbar category="投诉及反馈" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="投诉" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>投诉</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <ul className="list-group">
                  {data.map((it) => (
                    <li key={it.id} className="list-group-item list-group-itme-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">
                          {it.user_category === '企业用户' && (
                            <span className="badge badge-success">{it.user_category}</span>
                          )}
                          {it.user_category === '个人用户' && (
                            <span className="badge badge-info">{it.user_category}</span>
                          )}
                          &nbsp;
                          {it.name}
                          (
                          {it.username}
                          )
                        </h5>
                        <small className="text-muted">
                          {it.status === '已处理' ? (
                            <span className="badge badge-secondary">已处理</span>
                          ) : (
                            <span className="badge badge-danger">未处理</span>
                          )}
                        </small>
                      </div>
                      <p className="mb-1">{it.content}</p>
                      <small className="text-muted">
                        {moment(it.datime).format('YYYY-MM-DD HH:mm:ss')}
                      </small>
                      <div className="btn-group pull-right">
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm"
                          data-id={it.id}
                          data-user-id={it.user_id}
                          data-user-category={it.user_category}
                          onClick={handleReply}
                        >
                          <i className="fa fa-fw fa-reply" data-id={it.id} data-user-id={it.user_id} data-user-category={it.user_category} />
                          回复
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Feedback() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/feedback/feedback/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setData(res.content);
    })();
  }, []);

  const handleReply = async (event) => {
    const content = window.prompt('对用户意见反馈内容的回复');
    const response = await window.fetch('/api/feedback/feedback/reply', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: event.target.getAttribute('data-id'),
        user_id: event.target.getAttribute('data-user-id'),
        category: '系统消息',
        title: '对用户意见反馈内容的回复',
        content,
        datime: moment().format('YYYY-MM-DD'),
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location.reload(true);
  };

  return (
    <>
      <Title />
      <Navbar category="投诉及反馈" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="意见反馈" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>意见反馈</h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <ul className="list-group">
                  {data.map((it) => (
                    <li key={it.id} className="list-group-item list-group-itme-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">
                          {it.user_category === '企业用户' && (
                            <span className="badge badge-success">{it.user_category}</span>
                          )}
                          {it.user_category === '个人用户' && (
                            <span className="badge badge-info">{it.user_category}</span>
                          )}
                          &nbsp;
                          {it.name}
                          (
                          {it.username}
                          )
                        </h5>
                        <small>
                          {it.status === '已处理' ? (
                            <span className="badge badge-secondary">已处理</span>
                          ) : (
                            <span className="badge badge-danger">未处理</span>
                          )}
                        </small>
                      </div>
                      <p className="mb-1">{it.content}</p>
                      <small className="text-muted">
                        {moment(it.datime).format('YYYY-MM-DD HH:mm:ss')}
                      </small>
                      <div className="btn-group pull-right">
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm"
                          data-id={it.id}
                          data-user-id={it.user_id}
                          data-user-category={it.user_category}
                          onClick={handleReply}
                        >
                          <i className="fa fa-fw fa-reply" data-id={it.id} data-user-id={it.user_id} data-user-category={it.user_category} />
                          回复
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
