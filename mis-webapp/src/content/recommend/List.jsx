import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Title, Navbar } from '../../Components';
import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    window.fetch('/api/content/recommend/')
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          setList(res.content);
        }
      });
  }, []);

  return (
    <>
      <Title />
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="推荐信息" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>推荐信息</h3>
            <hr />

            <Toolbar />

            <div className="card shadow">
              <div className="card-body">
                <div className="list-group">
                  {
                    list.map((it) => (
                      <a href={`#平台内容/推荐信息/${it.id}?uuid=${it.uuid}`} className="list-group-item list-group-item-action" key={it.id}>
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
