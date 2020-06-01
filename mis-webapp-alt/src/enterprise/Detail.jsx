import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { YUAN_GONG_SHU_LIANG } from '../constant';
import Navbar from '../component/Navbar';
import SideNav from '../user/ComponentSideNav';
import IndustryPicker from '../component/IndustryPicker';
import RecruitmentList from '../recruitment/component/List';

export default function Detail({ category }) {
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
  const [industry, setIndustry] = useState('');
  const [intro, setIntro] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (category === '编辑') {
      (async () => {
        const t_uuid = new URLSearchParams(location.search).get('uuid');
        setUUID(t_uuid);
        const response = await fetch(`/api/enterprise/${id}?uuid=${t_uuid}`);
        const res = await response.json();
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
        setIndustry(res.content.industry);
        setIntro(res.content.intro);
        setUrl(res.content.url);
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
    const data = {
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
      industry,
      intro,
      url,
    };

    if (category === '新增') {
      const response = await window.fetch('/api/enterprise/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (category === '编辑') {
      const response = await window.fetch(`/api/enterprise/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
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
      <Navbar category="企业" />

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col">
            <h3>企业</h3>
            <hr />

            <div className="card bg-dark shadow">
              <div className="card-header">
                企业信息
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>名称</label>
                      <input
                        type="text"
                        value={name || ''}
                        className="form-control"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="form-group">
                      <label>法人</label>
                      <input
                        type="text"
                        value={faren || ''}
                        className="form-control"
                        onChange={(event) => setFaren(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>营业执照</label>
                      <input
                        type="text"
                        value={yingyezhizhao || ''}
                        className="form-control"
                        onChange={(event) => setYingyezhizhao(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>注册日期</label>
                      <input
                        type="text"
                        value={zhuceriqi || ''}
                        className="form-control"
                        onChange={(event) => setZhuceriqi(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>注资规模</label>
                      <input
                        type="text"
                        value={zhuziguimo || ''}
                        className="form-control"
                        onChange={(event) => setZhuziguimo(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>员工数量</label>
                      <select
                        value={yuangongshuliang}
                        className="form-control"
                        onChange={(event) => setYuangongshuliang(event.target.value)}
                      >
                        <option value="未选择">未选择</option>
                        {YUAN_GONG_SHU_LIANG.map((it) => (
                          <option key={YUAN_GONG_SHU_LIANG.indexOf(it)} value={it}>{it}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>地址</label>
                      <input
                        type="text"
                        value={address1 || ''}
                        className="form-control"
                        onChange={(event) => setAddress1(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <input
                        type="text"
                        value={address2 || ''}
                        className="form-control"
                        onChange={(event) => setAddress2(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <input
                        type="text"
                        value={address3 || ''}
                        className="form-control"
                        onChange={(event) => setAddress3(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label />
                  <input
                    type="text"
                    value={address4 || ''}
                    className="form-control"
                    onChange={(event) => setAddress4(event.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="col-4">
                    <IndustryPicker
                      caption="所属行业"
                      value={industry || ''}
                      onChange={(event) => setIndustry(event.target.value)}
                    />
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>网址</label>
                      <input type="text" value={url} placeholder="https://" className="form-control" onChange={(event) => setUrl(event.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>简介</label>
                  <textarea rows="5" value={intro} className="form-control" onChange={(event) => setIntro(event.target.value)} />
                </div>

                <p className="text-muted text-center">
                  营业执照
                  <br />
                  <img src={yingyezhizhao_tu} className="img-fluid" alt={name} />
                </p>
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

            <div className="card bg-dark shadow mt-4">
              <div className="card-header">发布的职位</div>
              <div className="card-body">
                <RecruitmentList enterprise_id={id} enterprise_uuid={uuid} />
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
