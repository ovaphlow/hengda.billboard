import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import moment from 'moment';

import { SIGN_IN_URL } from '../constant';
import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import useAuth from '../useAuth';

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
        <Route path="/"><Report /></Route>
      </Switch>
    </Router>
  );
}

function Report() {
  const auth = useAuth();
  const [data, setData] = useState([]);

  const handleRedirect = (event) => {
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    const category = event.target.getAttribute('data-category');
    if (category === '岗位') {
      window.location = `recruitment.html#/${id}?uuid=${uuid}`;
    } else if (category === '企业') {
      window.location = `enterprise.html#/${id}?uuid=${uuid}`;
    } else if (category === '简历') {
      window.location = `resume.html#/${id}?uuid=${uuid}`;
    }
  };

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/report/');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="举报" />
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
                  <span className="h1">举报</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        举报
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>举报</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>用户</th>
                          <th>时间</th>
                          <th>类别</th>
                          <th>内容</th>
                          <th className="text-right">举报对象</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
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
                            <td>{moment(it.datime).format('YYYY-MM-DD')}</td>
                            <td>{it.category}</td>
                            <td>{it.content}</td>
                            <td className="text-right">
                              <button
                                type="button"
                                data-id={it.data_id}
                                data-category={it.category}
                                data-uuid={it.data_uuid}
                                className="btn btn-sm btn-danger"
                                onClick={handleRedirect}
                              >
                                查看
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
