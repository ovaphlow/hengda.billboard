import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Navbar from '../../component/Navbar';

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

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active" aria-current="page">通知公告</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="#/通知公告" className="btn btn-sm btn-info">
              通知/公告
            </a>

            <a href="#/行业" className="btn btn-sm btn-success">
              行业
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-header">
            <a href="#/通知公告/新增" className="btn btn-sm btn-secondary">
              <i className="fa fa-fw fa-plus" />
              新增
            </a>
          </div>

          <div className="card-body">
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
    </>
  );
}
