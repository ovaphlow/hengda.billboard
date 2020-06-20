import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Navbar from '../../component/Navbar';
import SideNav from '../component/SideNav';
import ComponentToolbar from './ComponentToolbar';

export default function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/bulletin/');
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

  return (
    <>
      <Navbar category="系统设置" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>通知/公告</h3>
            <hr />

            <ComponentToolbar />

            <div className="card bg-dark shadow">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th className="text-right">序号</th>
                    <th>标题</th>
                    <th>发送对象</th>
                    <th>截止日期</th>
                    <th>内容</th>
                    <th>地区</th>
                    <th>行业</th>
                    <th>学历</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((it) => (
                    <tr key={it.id}>
                      <td className="text-right">
                        <span className="pull-left">
                          <a href={`#/通知公告/${it.id}?uuid=${it.uuid}`}>
                            <i className="fa fa-fw fa-edit" />
                          </a>
                        </span>
                        {it.id}
                      </td>
                      <td>{it.title}</td>
                      <td>
                        {it.receiver === '企业用户' && (
                          <span className="badge badge-success">{it.receiver}</span>
                        )}

                        {it.receiver === '普通用户' && (
                          <span className="badge badge-info">{it.receiver}</span>
                        )}
                      </td>
                      <td>{moment(it.dday).format('YYYY-MM-DD')}</td>
                      <td>{it.doc.content}</td>
                      <td>
                        {it.doc.address_level1}
                        <br />
                        {it.doc.address_level2}
                      </td>
                      <td>{it.receiver === '企业用户' && it.doc.industry}</td>
                      <td>{it.receiver === '普通用户' && it.doc.education}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
