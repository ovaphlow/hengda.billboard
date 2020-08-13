import React, { useState, useEffect } from 'react';
import { View } from './Components';

const Sys = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    if (_auth !== null) {
      fetch(`/api/message/sys/ent/${_auth.id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            setList(res.content);
          }
        });
    } else {
      window.location = '#登录';
    }
  }, []);

  return (
    <View category="系统">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row mb-3">
              <h3 className="col pull-left">系统消息</h3>
            </div>
            {list &&
              list.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="row">
                    <div className="col ">
                      <strong>{item.title}</strong>
                      <br />
                      <div className="text-secondary">{item.content}</div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </View>
  );
};

export default Sys;
