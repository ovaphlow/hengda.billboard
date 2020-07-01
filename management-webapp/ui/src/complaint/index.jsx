import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import moment from 'moment';
import 'css.gg/icons/svg/add.svg';

import { SIGN_IN_URL } from '../constant';
import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import IconMailReply from '../icon/MailReply';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  useEffect(() => {
    const auth = sessionStorage.getItem('mis-auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/"><Complaint /></Route>
      </Switch>
    </Router>
  );
}

function Complaint() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/feedback/complaint/');
      const res = await response.json();
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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav cat="" />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav cat="投诉" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => { window.history.go(-1); }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">投诉</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        投诉
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>投诉</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>状态</th>
                          <th>用户</th>
                          <th>时间</th>
                          <th>内容</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>
                              {it.status === '已处理' ? (
                                <span className="badge badge-secondary">已处理</span>
                              ) : (
                                <span className="badge badge-danger">未处理</span>
                              )}
                            </td>
                            <td>
                              {it.user_category === '企业用户' && (
                                <span className="badge badge-success">{it.user_category}</span>
                              )}
                              {it.user_category === '个人用户' && (
                                <span className="badge badge-info">{it.user_category}</span>
                              )}
                              &nbsp;
                              {it.name}
                              <br />
                              <small className="text-muted">{it.phone}</small>
                            </td>
                            <td>
                              {moment(it.datime).format('YYYY-MM-DD')}
                              <br />
                              <small className="text-muted">{moment(it.datime).format('HH:mm')}</small>
                            </td>
                            <td>{it.content}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-success btn-sm"
                                data-id={it.id}
                                data-user-id={it.user_id}
                                data-user-category={it.user_category}
                                onClick={handleReply}
                              >
                                <IconMailReply />
                                回复
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
