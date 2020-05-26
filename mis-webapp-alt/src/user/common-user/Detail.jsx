import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'blueimp-md5';

import Navbar from '../../component/Navbar';
import SideNav from '../ComponentSideNav';

export default function Detail({ category }) {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume_list, setResumeList] = useState([]);

  useEffect(() => {
    if (category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await window.fetch(`/api/common-user/${id}?uuid=${t_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setName(res.content.name);
        setEmail(res.content.email);
        setPhone(res.content.phone);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (category === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/resume?user_id=${id}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setResumeList(res.content);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async () => {
    if (!window.confirm('确定删除当前数据？')) return;
    const response = await window.fetch(`/api/common-user/${id}?uuid=${uuid}`, {
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
      const response = await window.fetch('/api/common-user/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          password: md5(password),
          email,
          phone,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (category === '编辑') {
      const response = await window.fetch(`/api/common-user/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
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
      <Navbar category="用户" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              普通用户
            </h3>
            <hr />

            <div className="row">
              <div className="col-8">
                <div className="card bg-dark shadow">
                  <div className="card-header">用户信息</div>

                  <div className="card-body">
                    <div className="form-group">
                      <label>姓名</label>
                      <input
                        type="text"
                        value={name || ''}
                        className="form-control"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>

                    {category === '新增' && (
                      <div className="form-group">
                        <label>密码</label>
                        <input
                          type="text"
                          value={password || ''}
                          className="form-control"
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label>EMAIL</label>
                      <input
                        type="email"
                        value={email || ''}
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>电话</label>
                      <input
                        type="tel"
                        value={phone || ''}
                        className="form-control"
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <button type="button" className="btn btn-secondary" onClick={() => { window.history.go(-1); }}>
                        返回
                      </button>
                    </div>

                    <div className="btn-group pull-right">
                      {category === '编辑' && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleRemove}
                        >
                          <i className="fa fa-fw fa-trash-o" />
                          删除
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ display: 'none' }}
                        onClick={handleSubmit}
                      >
                        <i className="fa fa-fw fa-save" />
                        保存
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
                {category === '编辑' && (
                  <div className="card bg-dark shadow">
                    <div className="card-header">用户简历</div>

                    <div className="card-body">
                      <div className="list-group">
                        {resume_list.map((it) => (
                          <a href={`resume.html#/${it.id}?master_id=${id}&uuid=${it.uuid}`} className="list-group-item list-group-item-action" key={it.id}>
                            {it.qiwangzhiwei}
                            <span className="pull-right text-muted">{it.yixiangchengshi}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="card-footer text-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          style={{ display: 'none' }}
                          onClick={() => { window.location = `resume.html#/新增?master_id=${id}`; }}
                        >
                          <i className="fa fa-fw fa-plus" />
                          添加简历
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-info"
                          onClick={() => {
                            window.location = `delivery.html#/?user_id=${id}&user_uuid=${uuid}`;
                          }}
                        >
                          <i className="fa fa-fw fa-list" />
                          投递记录
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {category === '编辑' && (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-block btn-secondary"
                      onClick={() => { window.location = `favorite.html#/?master_id=${id}`; }}
                    >
                      <i className="fa fa-fw fa-list" />
                      用户收藏
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Detail.propTypes = {
  category: PropTypes.string.isRequired,
};
