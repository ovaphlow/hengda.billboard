import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  Title, Navbar, InputRowField, BackwardButton,
} from '../../Components';
import SideNav from '../component/SideNav';

export default function Detail2(props) {
  const { category } = props;
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [master_id, setMasterID] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (props.category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      const t_master_id = new URLSearchParams(location.search).get('master_id');
      setMasterID(t_master_id);
      (async () => {
        const response = await window.fetch(`/api/settings/industry/2nd/${id}?uuid=${t_uuid}&master_id=${t_master_id}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setName(res.content.name);
        setComment(res.content.comment);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (!name) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (props.category === '新增') {
      const t_master_id = new URLSearchParams(location.search).get('master_id');
      const response = await window.fetch(`/api/settings/industry/2nd/?master_id=${t_master_id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          master_id: id,
          name,
          comment,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/settings/industry/2nd/${id}?uuid=${uuid}&master_id=${master_id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          comment,
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
    const response = await window.fetch(`/api/settings/industry/2nd/${id}?uuid=${uuid}&master_id=${master_id}`, {
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
      <Navbar category="系统设置" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="行业" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              二级行业
            </h3>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <InputRowField
                  caption="名称"
                  value={name || ''}
                  onChange={(event) => setName(event.target.value)}
                />

                <InputRowField
                  caption="备注"
                  value={comment || ''}
                  onChange={(event) => setComment(event.target.value)}
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
                    onClick={handleSubmit}
                  >
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
