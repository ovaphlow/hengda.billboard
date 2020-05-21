import React, { useState } from 'react';

import { Title, Navbar } from '../../Components';
import { BANNER_CATEGORY } from '../../constant';
import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function List() {
  const [list, setList] = useState([]);
  const [filter_category, setFilterCategory] = useState('小程序-首页');
  const [filter_status, setFilterStatus] = useState('启用');

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/content/banner/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        category: filter_category,
        status: filter_status,
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
            <SideNav category="banner" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>BANNER</h3>
            <hr />

            <Toolbar />

            <div className="card shadow">
              <div className="card-header">
                <div className="row">
                  <div className="form-group col-4 col-lg-2 mb-0">
                    <select
                      value={filter_category || ''}
                      className="form-control"
                      onChange={(event) => setFilterCategory(event.target.value)}
                    >
                      {BANNER_CATEGORY.map((it) => (
                        <option key={BANNER_CATEGORY.indexOf(it)} value={it}>{it}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-4 col-lg-2 mb-0">
                    <select
                      value={filter_status || ''}
                      className="form-control"
                      onChange={(event) => setFilterStatus(event.target.value)}
                    >
                      <option value="启用">启用</option>
                      <option value="未启用">未启用</option>
                    </select>
                  </div>

                  <div className="btn-group pull-right">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleFilter}
                    >
                      <i className="fa fa-fw fa-search" />
                      检索
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  {
                    list.map((it) => (
                      <div className="card" style={{ width: '18rem', marginLeft: '1rem', marginBottom: '1rem' }} key={it.id}>
                        <img src={it.data_url} className="card-img-top" alt={it.title} />
                        <div className="card-body">
                          <h5 className="card-title">
                            {it.title}
                            <span className="pull-right">
                              {
                                it.status === '启用' ? (
                                  <span className="badge badge-success">{it.status}</span>
                                ) : (
                                  <span className="badge badge-danger">{it.status}</span>
                                )
                              }
                            </span>
                          </h5>
                          <p className="card-text">{it.comment}</p>
                        </div>

                        <div className="card-footer text-center">
                          <a href={`#平台内容/banner/${it.id}?uuid=${it.uuid}`} className="btn btn-outline-info btn-sm">
                            查看
                          </a>
                        </div>
                      </div>
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
