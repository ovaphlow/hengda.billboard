import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  Title, Navbar, InputRowField, BackwardButton,
} from '../../Components';
import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function Detail(props) {
  const { category } = props;
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await window.fetch(`/api/settings/school/${id}?uuid=${t_uuid}`);
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
    if (props.category === '新增') {
      const response = await window.fetch('/api/settings/school/', {
        method: 'POST',
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
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/settings/school/${id}?uuid=${uuid}`, {
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

  return (
    <>
      <Title />
      <Navbar category="系统设置" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="院校" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              院校
            </h3>
            <hr />

            <Toolbar />

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
