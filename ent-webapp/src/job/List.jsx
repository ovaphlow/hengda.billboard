import React, { useEffect, useState } from 'react';
import { View1 } from './Components';

const List = () => {
  const [list, setList] = useState([]);

  const [auth, setAuth] = useState({});

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    if (_auth !== null) {
      setAuth(_auth);
      fetch(`./api/recruitment/enterprise/${_auth.enterprise_id}?u_id=${_auth.enterprise_uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setList(res.content);
          }
        });
    }
  }, []);

  return (
    <View1 category="校园招聘会场次">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <h3 className="pull-left">线上招聘会场次</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">编号</th>
                  <th scope="col">招聘会名称</th>
                  <th scope="col">举办时间</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <a
                            className="btn btn-primary rounded-pill"
                            href={`#招聘会/报名/${item.id}?u_id=${item.uuid}`}
                          >
                            报名
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </View1>
  );
};

export default List;
