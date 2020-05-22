import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import {
  Title, Navbar, InputRowField, BackwardButton,
} from '../Components';
import SideNav from './component/SideNav';
import { YUAN_GONG_SHU_LIANG } from '../constant';
import EnterpriseUserList from '../enterprise-user/component/List';
import RecruitmentDataList from '../recruitment/component/DataList';

export default function Detail(props) {
  const { category } = props;
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [yingyezhizhao, setYingyezhizhao] = useState('');
  const [yingyezhizhao_tu, setYingyezhizhaoTu] = useState('');
  const [faren, setFaren] = useState('');
  const [zhuceriqi, setZhuceriqi] = useState('');
  const [zhuziguimo, setZhuziguimo] = useState('');
  const [yuangongshuliang, setYuangongshuliang] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [address4, setAddress4] = useState('');

  useEffect(() => {
    if (props.category === '编辑') {
      (async () => {
        const t_uuid = new URLSearchParams(location.search).get('uuid');
        setUUID(t_uuid);
        const response = await fetch(`/api/enterprise/${id}?uuid=${t_uuid}`);
        const res = await response.json();
        if (res.message) {
          window.console.error(res.message);
          return;
        }
        setName(res.content.name);
        setYingyezhizhao(res.content.yingyezhizhao);
        setYingyezhizhaoTu(res.content.yingyezhizhao_tu);
        setFaren(res.content.faren);
        setZhuceriqi(res.content.zhuceriqi);
        setZhuziguimo(res.content.zhuziguimo);
        setYuangongshuliang(res.content.yuangongshuliang);
        setAddress1(res.content.address1);
        setAddress2(res.content.address2);
        setAddress3(res.content.address3);
        setAddress4(res.content.address4);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async () => {
    if (!window.confirm('确定删除当前数据？')) return;
    const response = await window.fetch(`/api/enterprise/${id}?uuid=${uuid}`, {
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
    if (props.category === '新增') {
      const response = await window.fetch('/api/enterprise/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          yingyezhizhao,
          faren,
          zhuceriqi,
          zhuziguimo,
          yuangongshuliang,
          address1,
          address2,
          address3,
          address4,
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          yingyezhizhao,
          faren,
          zhuceriqi,
          zhuziguimo,
          yuangongshuliang,
          address1,
          address2,
          address3,
          address4,
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
      <Navbar category="企业" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category={category} />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {category}
              {' '}
              企业
            </h3>
            <hr />

            <div className="row">
              <div className="col">
                <div className="card shadow">
                  <div className="card-header">
                    企业信息
                  </div>

                  <div className="card-body">
                    <InputRowField caption="名称" value={name || ''} onChange={(event) => setName(event.target.value)} />

                    <InputRowField
                      caption="营业执照"
                      value={yingyezhizhao || ''}
                      onChange={(event) => setYingyezhizhao(event.target.value)}
                    />

                    <InputRowField
                      caption="法人"
                      value={faren || ''}
                      onChange={(event) => setFaren(event.target.value)}
                    />

                    <InputRowField
                      caption="注册日期"
                      value={zhuceriqi || ''}
                      onChange={(event) => setZhuceriqi(event.target.value)}
                    />

                    <InputRowField
                      caption="注资规模"
                      value={zhuziguimo || ''}
                      onChange={(event) => setZhuziguimo(event.target.value)}
                    />

                    <InputRowField
                      caption="地址"
                      value={address1 || ''}
                      onChange={(event) => setAddress1(event.target.value)}
                    />

                    <InputRowField
                      caption=""
                      value={address2 || ''}
                      onChange={(event) => setAddress2(event.target.value)}
                    />

                    <InputRowField
                      caption=""
                      value={address3 || ''}
                      onChange={(event) => setAddress3(event.target.value)}
                    />

                    <InputRowField
                      caption=""
                      value={address4 || ''}
                      onChange={(event) => setAddress4(event.target.value)}
                    />

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label text-right">员工数量</label>
                      <div className="col-sm-10">
                        <select
                          value={yuangongshuliang}
                          className="form-control input-borderless"
                          onChange={(event) => setYuangongshuliang(event.target.value)}
                        >
                          <option value="未选择">未选择</option>
                          {YUAN_GONG_SHU_LIANG.map((it) => (
                            <option key={YUAN_GONG_SHU_LIANG.indexOf(it)} value={it}>{it}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="text-muted text-center">
                      营业执照
                      <br />
                      <img src={yingyezhizhao_tu} className="img-fluid" alt={name} />
                    </p>
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
                        <i className="fa fa-fw fa-save" />
                        保存
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {category === '编辑' && (
                <div className="col-4">
                  <div className="card shadow">
                    <div className="card-header">
                      企业用户
                    </div>

                    <div className="card-body">
                      {
                        id && uuid && (
                          <EnterpriseUserList enterprise_id={id} enterprise_uuid={uuid} />
                        )
                      }
                    </div>

                    <div className="card-footer text-center" style={{ display: 'none' }}>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          onClick={() => { window.location = `#企业用户/新增?enterprise_id=${id}&enterprise_uuid=${uuid}`; }}
                        >
                          <i className="fa fa-fw fa-plus" />
                          添加用户
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow mt-3">
                    <div className="card-header">发布的职位</div>
                    <div className="card-body">
                      <RecruitmentDataList enterprise_id={id} enterprise_uuid={uuid} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
