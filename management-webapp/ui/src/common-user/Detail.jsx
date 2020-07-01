import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import IconList from '../icon/List';
import useAuth from '../useAuth';

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume_list, setResumeList] = useState([]);

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

  useEffect(() => {
    if (component_option === '编辑') {
      setUUID(new URLSearchParams(location.search).get('uuid'));
    }
  }, []);

  useEffect(() => {
    if (uuid) {
      (async () => {
        const response = await window.fetch(`/api/common-user/${id}?uuid=${uuid}`);
        const res = await response.json();
        setName(res.content.name);
        setEmail(res.content.email);
        setPhone(res.content.phone);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  useEffect(() => {
    if (component_option === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/resume?user_id=${id}`);
        const res = await response.json();
        setResumeList(res.content);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="个人用户" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => { window.history.go(-1); }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">个人用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="common-user.html" className="text-reset text-decoration-none">
                          个人用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        {component_option}
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <span className="lead">
                      用户信息
                    </span>
                    <div className="btn-group float-right">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => { window.location = `favorite.html#/?master_id=${id}`; }}
                      >
                        <IconList />
                        用户收藏
                      </button>

                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => { window.location = `journal.html#/登录?user_category=个人用户&user_id=${id}&user_uuid=${uuid}`; }}
                      >
                        登录记录
                      </button>

                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => { window.location = `journal.html#/浏览?user_category=个人用户&user_id=${id}&user_uuid=${uuid}`; }}
                      >
                        浏览记录
                      </button>

                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => { window.location = `journal.html#/编辑?user_category=个人用户&user_id=${id}&user_uuid=${uuid}`; }}
                      >
                        编辑记录
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>姓名</label>
                          <input
                            type="text"
                            value={name || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="form-group">
                          <label>电话</label>
                          <input
                            type="tel"
                            value={phone || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setPhone(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <label>EMAIL</label>
                          <input
                            type="email"
                            value={email || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <button type="button" className="btn btn-secondary" onClick={() => { window.history.go(-1); }}>
                        返回
                      </button>
                    </div>

                    <div className="btn-group float-right">
                      {component_option === '编辑' && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleRemove}
                        >
                          删除
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {component_option === '编辑' && (
                  <div className="card bg-dark shadow mt-3">
                    <div className="card-header">用户简历</div>

                    <div className="card-body">
                      <div className="list-group">
                        {resume_list.map((it) => (
                          <a href={`resume.html#/${it.id}?master_id=${id}&uuid=${it.uuid}`} className="list-group-item list-group-item-action" key={it.id}>
                            {it.qiwangzhiwei}
                            <span className="float-right text-muted">{it.yixiangchengshi}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="card-footer text-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-info"
                          onClick={() => {
                            window.location = `delivery.html#/?user_id=${id}&user_uuid=${uuid}`;
                          }}
                        >
                          <IconList />
                          投递记录
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}

Detail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
