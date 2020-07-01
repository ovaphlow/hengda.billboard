import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import IndustryPicker from '../component/IndustryPicker';
import EducationPicker from '../component/EducationPicker';

export default function Detail({ component_option }) {
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
    if (component_option === '编辑') {
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
    if (component_option === '编辑') {
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
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav cat="" />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav cat="个人用户" />
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
                  <span className="h1">简历</span>
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
                        简历
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <div calssName="form-group">
                      <label>姓名</label>
                      <input
                        type="text"
                        value={name || ''}
                        className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                        className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                            className="form-control input-underscore"
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
                          <label>期望岗位</label>
                          <input
                            type="text"
                            value={qiwangzhiwei || ''}
                            className="form-control input-underscore"
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
                            className="form-control input-underscore"
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

                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ display: 'none' }}
                        onClick={handleSubmit}
                      >
                        保存
                      </button>
                    </div>
                  </div>
                </div>
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
