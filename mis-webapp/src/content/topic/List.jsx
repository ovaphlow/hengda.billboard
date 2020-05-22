import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Title from '../../component/Title';
import Navbar from '../../component/Navbar';
import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function List() {
  const [list, setList] = useState([]);
  const [filter_title, setFilterTitle] = useState('');
  const [filter_date, setFilterDate] = useState('');

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/content/topic/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setList(res.content);
    })();
  }, []);

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/content/topic/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        date: filter_date,
        title: filter_title,
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setList(res.content);
  };

  return (
    <>
      <Title />
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="热门话题" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>热门话题</h3>
            <hr />

            <Toolbar />

            <div className="card shadow">
              <div className="card-header">
                <div className="row">
                  <div className="input-group col">
                    <div className="input-group-prepend">
                      <span className="input-group-text">标题</span>
                    </div>
                    <input
                      type="text"
                      value={filter_title || ''}
                      aria-label="标题"
                      className="form-control"
                      onChange={(event) => setFilterTitle(event.target.value)}
                    />
                  </div>

                  <div className="input-group col">
                    <div className="input-group-prepend">
                      <span className="input-group-text">日期</span>
                    </div>
                    <input
                      type="date"
                      value={filter_date || ''}
                      aria-label="日期"
                      className="form-control"
                      onChange={(event) => setFilterDate(event.target.value)}
                    />
                  </div>
                </div>

                <div className="m-2" />

                <div className="btn-group pull-right">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => window.location.reload(true)}
                  >
                    <i className="fa fa-fw fa-refresh" />
                    重置
                  </button>

                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleFilter}>
                    <i className="fa fa-fw fa-search" />
                    查询
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="list-group">
                  {
                    list.map((it) => (
                      <a href={`#平台内容/热门话题/${it.id}?uuid=${it.uuid}`} className="list-group-item list-group-item-action" key={it.id}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{it.title}</h5>
                          <small>
                            {moment(it.date).format('YYYY-MM-DD')}
                            {' '}
                            {it.time}
                          </small>
                        </div>
                        <p className="mb-1" />
                        {/* <small></small> */}
                      </a>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
