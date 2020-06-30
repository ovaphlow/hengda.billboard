import React, { useState, useEffect } from 'react';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import Footer from '../component/Footer';
import IconAdd from '../icon/Add';
import IconChevronLeft from '../icon/ChevronLeft';
import IconRename from '../icon/Rename';

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/content/recommend/');
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

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
                <LeftNav cat="推荐信息" />
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
                      <IconChevronLeft />
                      返回
                    </button>
                  </div>
                  <span className="h1">推荐信息</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        推荐信息
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
                      <caption>推荐信息</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>分类</th>
                          <th>标题</th>
                          <th>发布/截止日期</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">
                              <span className="pull-left">
                                <a href={`#/${it.id}?uuid=${it.uuid}`}>
                                  <IconRename />
                                </a>
                              </span>
                              {it.id}
                            </td>
                            <td>{it.category}</td>
                            <td>{it.title}</td>
                            <td>
                              {it.date1}
                              <br />
                              {it.date2}
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
        <Footer />
      </footer>
    </div>
  );
}
