import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import TopNav from '../component/TopNav';
import LeftNav from '../component/LeftNav';
import BottomNav from '../component/BottomNav';
import { useAddressKeys, useAddressValues, useAddressLevel1ValueList } from '../useAddress';
import useAuth from '../useAuth';

export default function Detail({ component_option }) {
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const address_keys = useAddressKeys();
  const address_values = useAddressValues();
  const address_level1_values = useAddressLevel1ValueList();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address_level1, setAddressLevel1] = useState('');
  const [address_level2, setAddressLevel2] = useState('');
  const [address_level3, setAddressLevel3] = useState('');
  const [address_level4, setAddressLevel4] = useState('');
  const [title, setTitle] = useState('');
  const [school, setSchool] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    const data = {
      title,
      content,
      date,
      time,
      address_level1,
      address_level2,
      address_level3,
      address_level4,
      school,
      category,
    };

    if (component_option === '新增') {
      const response = await window.fetch('/api/content/campus/', {
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
    } else if (component_option === '编辑') {
      const response = await window.fetch(`/api/content/campus/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
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
    const response = await window.fetch(`/api/content/campus/${id}?uuid=${uuid}`, {
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
        const response = await window.fetch(`/api/content/campus/${id}?uuid=${uuid}`);
        const res = await response.json();
        if (res.message) {
          window.alert(res.message);
          return;
        }
        setTitle(res.content.title);
        setContent(res.content.content);
        setDate(res.content.date);
        setTime(res.content.time);
        setAddressLevel1(res.content.address_level1);
        setAddressLevel2(res.content.address_level2);
        setAddressLevel3(res.content.address_level3);
        setAddressLevel4(res.content.address_level4);
        setSchool(res.content.school);
        setCategory(res.content.category);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  useEffect(() => {
    setArr1(address_level1_values);
  }, []);

  useEffect(() => {
    const arr = [];
    setArr2(arr);
    setArr3(arr);
    for (let i = 0; i < address_values.length; i += 1) {
      if (address_values[i] === address_level1) {
        const code = address_keys[i];
        for (let j = 0; j < address_keys.length; j += 1) {
          if (address_keys[j].slice(0, 2) === code.slice(0, 2) && address_keys[j].slice(-2) === '00') {
            if (address_keys[j].slice(-4) !== '0000') arr.push(address_values[j]);
          }
        }
        return;
      }
    }
    setArr2(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address_level1]);

  useEffect(() => {
    const arr = [];
    setArr3(arr);
    address_values.forEach((e, index) => {
      if (e === address_level2) {
        const code = address_keys[index];
        address_keys.forEach((it, i) => {
          if (it.slice(0, 4) === code.slice(0, 4) && it.slice(-2) !== '00') {
            arr.push(address_values[i]);
          }
        });
      }
    });
    setArr3(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address_level2]);

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
                <LeftNav component_option="校园招聘" />
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
                  <span className="h1">校园招聘</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        校园招聘
                      </li>
                      <li className="breadcrumb-item active">
                        校园招聘
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        <div className="mb-3">
                          <label className="form-label">类型</label>
                          <select
                            value={category || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setCategory(event.target.value)}
                          >
                            <option value="">未选择</option>
                            <option>双选会</option>
                            <option>宣讲会</option>
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">标题</label>
                          <input
                            type="text"
                            value={title || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setTitle(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">日期</label>
                          <input
                            type="date"
                            value={date || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setDate(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">时间</label>
                          <input
                            type="time"
                            value={time || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setTime(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">地址</label>
                          <select
                            value={address_level1 || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setAddressLevel1(event.target.value)}
                          >
                            <option value="">未选择</option>
                            {arr1.map((it) => (
                              <option key={arr1.indexOf(it)} value={it}>{it}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">&nbsp;</label>
                          <select
                            value={address_level2 || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setAddressLevel2(event.target.value)}
                          >
                            <option value="">未选择</option>
                            {arr2.map((it) => (
                              <option key={arr2.indexOf(it)} value={it}>{it}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">&nbsp;</label>
                          <select
                            value={address_level3 || ''}
                            className="form-control input-underscore"
                            onChange={(event) => setAddressLevel3(event.target.value)}
                          >
                            <option value="">未选择</option>
                            {arr3.map((it) => (
                              <option key={arr3.indexOf(it)} value={it}>{it}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label />
                      <input
                        type="text"
                        value={address_level4 || ''}
                        className="form-control input-underscore"
                        onChange={(event) => setAddressLevel4(event.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">院校</label>
                      <input
                        type="text"
                        value={school}
                        className="form-control input-underscore"
                        onChange={(event) => setSchool(event.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">内容</label>
                      <ReactQuill
                        formats={[
                          'header', 'align', 'bold', 'italic',
                          'underline', 'blockquote', 'link', 'image']}
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            [{ align: [] }],
                            ['bold', 'italic', 'underline', 'blockquote'],
                            ['link', 'image'],
                          ],
                        }}
                        placeholder="请填写内容"
                        value={content}
                        onChange={setContent}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="btn-group">
                      <button type="button" className="btn btn-secondary" onClick={() => { window.history.go(-1); }}>
                        返回
                      </button>
                    </div>

                    <div className="btn-group float-right">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleRemove}
                      >
                        删除
                      </button>

                      <button
                        type="button"
                        className="btn btn-primary"
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
