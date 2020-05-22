import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Title from '../component/Title';
import Navbar from '../component/Navbar';
import InputRowField from '../component/InputRowField';
import BackwardButton from '../component/BackwardButton';
import SideNav from './component/SideNav';

export default function UserDetail(props) {
  const { category } = props;
  const { id, user_id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await fetch(`/api/enterprise/${id}/user/${user_id}?uuid=${t_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setName(res.content.name);
        setUsername(res.content.username);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch(`/api/enterprise/${id}/user/`, {
        method: 'POST',
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
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${id}/user/${user_id}?uuid=${uuid}`, {
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
      <Navbar />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              企业用户
            </h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <InputRowField caption="姓名" value={name || ''} onChange={(event) => setName(event.target.value)} />

                <InputRowField caption="用户名" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ display: 'none' }}
                    onClick={handleSubmit}
                  >
                    <i className="fa fa-fw fa-edit" />
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
