import React, { useState, useEffect } from 'react';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import IconAdd from '../icon/Add';
import IconRename from '../icon/Rename';
import useAuth from '../useAuth';

export default function List() {
  const auth = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/mis-user/');
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
                <LeftNav component_option="平台用户" />
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
                  <span className="h1">平台用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        平台用户
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <a href="#/新增" className="btn btn-secondary">
                      <IconAdd />
                      新增
                    </a>
                  </div>
                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>平台用户</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>姓名</th>
                          <th>用户名</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">
                              <a href={`#/${it.id}?uuid=${it.uuid}`} className="float-left">
                                <IconRename />
                              </a>
                              {it.id}
                            </td>
                            <td>{it.name}</td>
                            <td>{it.username}</td>
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
