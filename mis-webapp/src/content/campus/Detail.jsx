import React, { useState, useEffect } from 'react';
import {
  useLocation, useParams,
} from 'react-router-dom';

import ReactQuill from 'react-quill';
import {
  Title, Navbar, BackwardButton, InputRowField, SchoolPickerRowField,
} from '../../Components';
import SideNav from '../component/SideNav';
import Toolbar from './component/Toolbar';

export default function Detail(props) {
  const { cat } = props;
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = useState('');
  const [address_keys, setAddressKeys] = useState([]);
  const [address_values, setAddressValues] = useState([]);
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

  useEffect(() => {
    if (props.category === '编辑') {
      const t_uuid = new URLSearchParams(location.search).get('uuid');
      setUUID(t_uuid);
      (async () => {
        const response = await window.fetch(`/api/content/campus/${id}?uuid=${t_uuid}`);
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
  }, []);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/lib/address.json');
      const res = await response.json();
      const keys = Object.keys(res);
      setAddressKeys(keys);
      const values = Object.values(res);
      setAddressValues(values);
      const arr = [];
      keys.forEach((e, index) => {
        if (e.slice(-4) === '0000') {
          arr.push(values[index]);
        }
      });
      setArr1(arr);
    })();
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

  const handleSubmit = async () => {
    if (props.category === '新增') {
      const response = await window.fetch('/api/content/campus/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
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
        }),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/content/campus/${id}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
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
      <Navbar category="平台内容" />

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-3 col-lg-2">
            <SideNav category="校园招聘" />
          </div>

          <div className="col-9 col-lg-10">
            <h3>
              {cat}
              {' '}
              校园招聘
            </h3>
            <hr />

            <Toolbar />

            <div className="card shadow">
              <div className="card-body">
                <InputRowField
                  caption="标题"
                  value={title || ''}
                  onChange={(event) => setTitle(event.target.value)}
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">日期</label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      value={date || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">时间</label>
                  <div className="col-sm-10">
                    <input
                      type="time"
                      value={time || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setTime(event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">地址</label>
                  <div className="col-sm-10">
                    <select
                      value={address_level1 || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setAddressLevel1(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {arr1.map((it) => (
                        <option key={arr1.indexOf(it)} value={it}>{it}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right" />
                  <div className="col-sm-10">
                    <select
                      value={address_level2 || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setAddressLevel2(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {arr2.map((it) => (
                        <option key={arr2.indexOf(it)} value={it}>{it}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right" />
                  <div className="col-sm-10">
                    <select
                      value={address_level3 || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setAddressLevel3(event.target.value)}
                    >
                      <option value="">未选择</option>
                      {arr3.map((it) => (
                        <option key={arr3.indexOf(it)} value={it}>{it}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <InputRowField
                  value={address_level4 || ''}
                  placeholder="详细地址"
                  onChange={(event) => setAddressLevel4(event.target.value)}
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">类型</label>
                  <div className="col-sm-10">
                    <select
                      value={category || ''}
                      className="form-control input-borderless"
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option value="">未选择</option>
                      <option>双选会</option>
                      <option>宣讲会</option>
                    </select>
                  </div>
                </div>

                <SchoolPickerRowField
                  value={school || ''}
                  onChange={(event) => setSchool(event.target.value)}
                />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label text-right">内容</label>
                  <div className="col-sm-10">
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
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <BackwardButton />
                </div>

                <div className="btn-group pull-right">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleRemove}
                  >
                    <i className="fa fa-fw fa-trash-o" />
                    删除
                  </button>

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
