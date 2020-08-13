import React, { useState, useEffect } from 'react';

import { View } from './Components';

const Offer = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));

    if (_auth === null) {
      window.location = '#登录';
      return;
    }

    fetch(`./api/offer/ent/${_auth.enterprise_id}`)
      .then((res) => res.json())
      .then((res) => {
        setList(res.content);
      });
  }, []);

  return (
    <View category="邀请" totalFlg>
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <h3>面试邀请</h3>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">编号</th>
                  <th scope="col">面试职位</th>
                  <th scope="col">面试人</th>
                  <th scope="col">面试地点</th>
                  <th scope="col">联系电话1</th>
                  <th scope="col">联系电话2</th>
                  <th scope="col">面试时间</th>
                  <th scope="col">发送时间</th>
                  <th scope="col">状态</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.recruitment_name}</td>
                      <td>{item.user_name}</td>
                      <td>{item.address}</td>
                      <td>{item.phone1}</td>
                      <td>{item.phone2}</td>
                      <td>{item.mianshishijian}</td>
                      <td>{item.datime}</td>
                      <td>{item.status}</td>
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

export default Offer;
