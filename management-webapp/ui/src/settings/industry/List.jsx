import React, { useState, useEffect } from 'react';

import Title from '../../component/Title';
import Navbar from '../../component/Navbar';
import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/settings/industry/');
      const res = await response.json();
      if (res.message) {
        window.console.error(res.message);
        return;
      }
      setList(res.content);
    })();
  }, []);

  return (
    <>
      <Title />
      <Navbar category="系统设置" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="行业" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>行业</h3>
            <hr />

            <Toolbar />

            <div className="card shadow">
              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-right">序号</th>
                      <th>名称</th>
                      <th>备注</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      list.map((it) => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#系统设置/行业/${it.id}?uuid=${it.uuid}`}>
                              <i className="fa fa-fw fa-edit" />
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.name}</td>
                          <td>{it.comment}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
