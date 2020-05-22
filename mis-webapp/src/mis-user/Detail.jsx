import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import md5 from 'blueimp-md5';

import Title from '../component/Title';
import Navbar from '../component/Navbar';
import BackwardButton from '../component/BackwardButton';
import SideNav from './component/SideNav';

export default function Detail(props) {
  const { category } = props;
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (category === '编辑') {
      (async () => {
        const t_uuid = new URLSearchParams(location.search).get('uuid');
        setUUID(t_uuid);
        const response = await fetch(`/api/mis-user/${id}?uuid=${t_uuid}`);
        const res = await response.json();
        setName(res.content.name);
        setUsername(res.content.username);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async () => {
    if (!window.confirm('确定删除当前数据？')) return;
    const response = await window.fetch(`/api/mis-user/${id}?uuid=${uuid}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  const handleSubmit = async () => {
    if (category === '新增') {
      const response = await fetch('/api/mis-user/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          username,
          password: md5('112332'),
          name,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (category === '编辑') {
      const response = await fetch(`/api/mis-user/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  return (
    <>
      <Title />
      <Navbar category="管理端用户" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category={category} />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              管理端用户
            </h3>
            <hr />

            {category === '新增' && (
              <div className="alert alert-warning">
                新增用户的默认密码为112332
              </div>
            )}

            <div className="card shadow">
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">姓名</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={name || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">用户名</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={username || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  {category === '编辑' && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={handleRemove}
                    >
                      <i className="fa fa-fw fa-trash-o" />
                      删除
                    </button>
                  )}
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    <i className="fa fa-fw fa-save" />
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
