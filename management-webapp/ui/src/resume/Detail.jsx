import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Navbar from '../component/Navbar';
import IndustryPicker from '../component/IndustryPicker';
import EducationPicker from '../component/EducationPicker';

export default function Detail({ category }) {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [education, setEducation] = useState('');
  const [date_begin, setDateBegin] = useState('');
  const [date_end, setDateEnd] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [ziwopingjia, setZiwopingjia] = useState('');
  const [qiwangzhiwei, setQiwangzhiwei] = useState('');
  const [qiwanghangye, setQiwanghangye] = useState('');
  const [yixiangchengshi, setYixiangchengshi] = useState('');

  useEffect(() => {
    if (category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await window.fetch(`/api/resume/${id}?uuid=${t_uuid}`);
        const res = await response.json();
        setName(res.content.name);
        setPhone(res.content.phone);
        setEmail(res.content.email);
        setGender(res.content.gender);
        setBirthday(res.content.birthday);
        setSchool(res.content.school);
        setMajor(res.content.major);
        setEducation(res.content.education);
        setDateBegin(res.content.date_begin);
        setDateEnd(res.content.date_end);
        setAddress1(res.content.address1);
        setAddress2(res.content.address2);
        setZiwopingjia(res.content.ziwopingjia);
        setQiwangzhiwei(res.content.qiwangzhiwei);
        setQiwanghangye(res.content.qiwanghangye);
        setYixiangchengshi(res.content.yixiangchengshi);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async () => {
    if (!window.confirm('确定删除当前数据？')) return;
    const response = await window.fetch(`/api/resume/${id}?uuid=${uuid}`, {
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
    if (category === '编辑') {
      const response = await window.fetch(`/api/resume/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          gender,
          birthday,
          school,
          major,
          education,
          date_begin,
          date_end,
          address1,
          address2,
          ziwopingjia,
          qiwangzhiwei,
          qiwanghangye,
          yixiangchengshi,
        }),
      });
      const res = response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  return (
    <>
      <Navbar category="普通用户" />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="#/普通用户" className="text-light">普通用户</a>
              </li>
              <li className="breadcrumb-item active">简历</li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="row justify-content-center">
          <div className="btn-group">
            <a href="user.html#/平台用户" className="btn btn-sm btn-info">
              平台用户
            </a>
            <a href="user.html#/企业用户" className="btn btn-sm btn-info">
              企业用户
            </a>
            <a href="user.html#/普通用户" className="btn btn-sm btn-info">
              普通用户
            </a>
          </div>
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="btn-group mb-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => { window.history.go(-1); }}>
            返回
          </button>
        </div>

        <div className="card bg-dark shadow">
          <div className="card-body">
            <div calssName="form-group">
              <label>姓名</label>
              <input
                type="text"
                value={name || ''}
                className="form-control"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="row">
              <div className="col">
                <div calssName="form-group">
                  <label>电话</label>
                  <input
                    type="tel"
                    value={phone || ''}
                    className="form-control"
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div calssName="form-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    value={email || ''}
                    className="form-control"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div calssName="form-group">
                  <label>性别</label>
                  <input
                    type="text"
                    value={gender || ''}
                    className="form-control"
                    onChange={(event) => setGender(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div calssName="form-group">
                  <label>出生日期</label>
                  <input
                    type="date"
                    value={birthday || ''}
                    className="form-control"
                    onChange={(event) => setBirthday(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <labe>毕业院校</labe>
              <input
                type="text"
                value={school}
                className="form-control"
                onChange={(event) => setSchool(event.target.value)}
              />
            </div>

            <div className="row">
              <div className="col">
                <div calssName="form-group">
                  <label>专业</label>
                  <input
                    type="text"
                    value={major || ''}
                    className="form-control"
                    onChange={(event) => setMajor(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <EducationPicker
                  caption="学历"
                  value={education || ''}
                  onChange={(event) => setEducation(event.target.value)}
                />
              </div>

              <div className="col">
                <div calssName="form-group">
                  <label>开始日期</label>
                  <input
                    type="date"
                    value={date_begin || ''}
                    className="form-control"
                    onChange={(event) => setDateBegin(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div calssName="form-group">
                  <label>结束日期</label>
                  <input
                    type="date"
                    value={date_end || ''}
                    className="form-control"
                    onChange={(event) => setDateEnd(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>住址</label>
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
            </div>

            <hr />

            <div className="form-group">
              <label>自我评价</label>
              <ReactQuill
                formats={[
                  'header', 'align', 'bold', 'italic',
                  'underline', 'blockquote']}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'blockquote'],
                  ],
                }}
                readOnly
                placeholder="请填写内容"
                value={ziwopingjia || ''}
                onChange={setZiwopingjia}
              />
            </div>

            <div className="row">
              <div className="col">
                <div calssName="form-group">
                  <label>期望职位</label>
                  <input
                    type="text"
                    value={qiwangzhiwei || ''}
                    className="form-control"
                    onChange={(event) => setQiwangzhiwei(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <IndustryPicker
                  caption="期望行业"
                  value={qiwanghangye || ''}
                  onChange={(event) => setQiwanghangye(event.target.value)}
                />
              </div>

              <div className="col">
                <div className="form-group">
                  <label>意向城市</label>
                  <input
                    type="text"
                    value={yixiangchengshi || ''}
                    className="form-control"
                    onChange={(event) => setYixiangchengshi(event.target.value)}
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
    </>
  );
}

Detail.propTypes = {
  category: PropTypes.string.isRequired,
};
