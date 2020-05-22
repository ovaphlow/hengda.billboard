import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Title from '../component/Title';
import Navbar from '../component/Navbar';
import InputRowField from '../component/InputRowField';
import BackwardButton from '../component/BackwardButton';
import SideNav from '../enterprise/component/SideNav';

export default function Detail(props) {
  const { category } = props;
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [enterprise_id, setEnterpriseID] = useState(0);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const t_master_id = new URLSearchParams(location.search).get('enterprise_id');
    setEnterpriseID(t_master_id);
    if (category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await fetch(`/api/enterprise-user/${t_master_id}?uuid=${t_uuid}&enterprise_id=${id}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setName(res.content.name);
        setUsername(res.content.username);
        setPhone(res.content.phone);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise-user/${id}?uuid=${uuid}&enterprise_id=${enterprise_id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
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

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await window.fetch(`/api/enterprise-user/${id}?uuid=${uuid}&enterprise_id=${enterprise_id}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
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

                {category === '新增' && (
                  <InputRowField
                    caption="密码"
                    value={password || ''}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                )}

                <InputRowField
                  caption="电话"
                  value={phone || ''}
                  onChange={(event) => setPhone(event.target.value)}
                />
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
