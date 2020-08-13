import React, { useState, useEffect } from 'react';

import { View } from './Components';

const Login = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));

    fetch(`./api/journal/login/企业用户/${_auth.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          setList(res.content);
        }
      });
  }, []);

  return (
    <View category="登录">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <h3 className="pull-left">登录记录</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">登录地点</th>
                  <th scope="col">ip地址</th>
                  <th scope="col">登录时间</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item) => (
                    <tr key={item.id}>
                      <td>{item.address}</td>
                      <td>{item.ip}</td>
                      <td>{item.datime}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </View>
  );
};

export default Login;
