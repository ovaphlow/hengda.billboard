import React, { useEffect, useState } from 'react';

import { View } from './Components';

import { TextField1, SelectField1 } from '../components/InputField';
import { _EditJournal } from '../commonFetch';

const Revise = () => {
  const [data, setData] = useState({
    zhuziguimo: '',
    yuangongshuliang: '',
    yingyezhizhao_tu: '',
    phone: '',
    url: '',
    intro: '',
  });

  const [required, setRequired] = useState({
    zhuziguimo: false,
    yuangongshuliang: false,
    yingyezhizhao_tu: false,
    phone: false,
    intro: false,
  });

  const [auth, setAuth] = useState(0);

  const [number, setNumber] = useState(0);

  useEffect(() => {
    const _auth = JSON.parse(sessionStorage.getItem('auth'));
    if (_auth === null) {
      window.location = '#登录';
      return;
    } else {
      setAuth(_auth);
      fetch(`./api/enterprise/${_auth.enterprise_id}?u_id=${_auth.uuid}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(window.message);
          } else {
            setData(res.content);
          }
        });
    }
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIntroChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setNumber(value.length);
    if (value.length > 500) {
      document.getElementById('number').style.color = '#ff2121';
      document.getElementById('hide').style.display = 'block';
      document.getElementById('preservation').disabled = true;
    } else {
      document.getElementById('number').style.color = '#7a858c';
      document.getElementById('hide').style.display = 'none';
      document.getElementById('preservation').disabled = false;
    }
  };

  const handleSave = () => {
    let flg = false;
    const _req = {};
    Object.getOwnPropertyNames(required).forEach((key) => {
      if (!data[key] || data[key] === '') {
        _req[key] = '请填写内容!';
        flg = true;
      } else {
        _req[key] = false;
      }
    });

    if (flg) {
      window.console.info(_req);
      setRequired(_req);
      return;
    }
    fetch(`./api/enterprise/${auth.enterprise_id}?u_id=${data.uuid}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
        } else {
          _EditJournal(
            {
              category2: '企业信息',
              data_id: data.id,
              data_uuid: data.uuid,
              remark: '编辑企业信息',
            },
            () => {},
          );
          window.alert('操作成功');
          window.location = '#我的/信息';
        }
      });
  };

  return (
    <View category="企业信息">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">基本信息</h3>
                <span className="text-danger">(带有*符号的选项为必填项)</span>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-3 col-md-4">
                <TextField1
                  category="注资规模"
                  name="zhuziguimo"
                  value={data.zhuziguimo}
                  handleChange={handleChange}
                  req={required.zhuziguimo}
                  required
                />
              </div>
              <div className="col-3 col-md-4">
                <SelectField1
                  category="员工数量"
                  name="yuangongshuliang"
                  value={data.yuangongshuliang}
                  handleChange={handleChange}
                  req={required.yuangongshuliang}
                  required
                >
                  <option> </option>
                  <option>50 人以下</option>
                  <option>50-100 人</option>
                  <option>100-200 人</option>
                  <option>200-500 人</option>
                  <option>500 人以上</option>
                </SelectField1>
              </div>

              <div className="col-3 col-md-4">
                <TextField1
                  category="电话号码"
                  name="phone"
                  value={data.phone}
                  handleChange={handleChange}
                  req={required.phone}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3 className="pull-left">企业网址</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <input
                    type="text"
                    name="url"
                    value={data.url || ''}
                    onChange={handleChange}
                    className="form-control form-control-sm rounded-0"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3 className="pull-left">
                  <span className="text-danger">*</span>
                  公司简介
                </h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <textarea
                    name="intro"
                    value={data.intro}
                    onChange={handleIntroChange}
                    rows="4"
                    className={`form-control form-control-sm rounded-0 ${
                      required.intro ? 'is-invalid' : ''
                    }`}
                  />
                  <span id="number" className="pull-right" style={{ color: '#7a858c' }}>
                    {number}/500
                  </span>
                  <span
                    id="hide"
                    className="pull-left"
                    style={{ color: '#ff2121', display: 'none' }}
                  >
                    请输入1-500个字符
                  </span>
                  <div className="invalid-feedback">{required.intro || ''}</div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row mt-2">
              <div className="col">
                <h3 className="pull-left">
                  <span className="text-danger">*</span>
                  营业执照
                  <span className="text-danger">
                    {required.yingyezhizhao_tu ? `(${required.yingyezhizhao_tu})` : ''}
                  </span>
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <img id="img" src={data.yingyezhizhao_tu} className="w-50" alt="" />
              </div>
            </div>
            <hr />
            <div className="row mt-2">
              <div className="col">
                <a className="pull-left btn btn-primary" href="#/我的/信息">
                  返回
                </a>
                <button
                  id="preservation"
                  className="pull-right btn btn-success"
                  type="button"
                  onClick={handleSave}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default Revise;
