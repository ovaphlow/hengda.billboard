import React, { useState, useEffect } from 'react';

import { View } from './Components';

const Feeback = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));

    fetch(`./api/feedback/企业用户/${_auth.id}`)
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
    <View category="投诉">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <h3 className="pull-left">(意见反馈/投诉)记录</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">提交时间</th>
                  <th scope="col">内容</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item) => (
                    <tr key={item.id}>
                      <td>{item.datime}</td>
                      <td>{item.content}</td>
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

export default Feeback;
