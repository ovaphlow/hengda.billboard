import React, { useEffect, useState } from 'react';
import watermark from 'watermarkjs';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { View } from './Components';

import { TextField, SelectField } from '../components/InputField';
import { _EditJournal } from '../commonFetch';

const Update = () => {
  const [data, setData] = useState({
    yingyezhizhao: '',
    faren: '',
    zhuceriqi: '',
    zhuziguimo: '',
    yuangongshuliang: '',
    yingyezhizhao_tu: '',
    address1: '',
    address2: '',
    address3: '',
    address4: '',
    phone: '',
    code: '',
    url: '',
    industry: '',
    intro: '',
  });

  const [required, setRequired] = useState({
    yingyezhizhao: false,
    faren: false,
    zhuceriqi: false,
    zhuziguimo: false,
    yuangongshuliang: false,
    yingyezhizhao_tu: false,
    address1: false,
    address2: false,
    address3: false,
    address4: false,
    phone: false,
    intro: false,
    industry: false,
  });

  const [auth, setAuth] = useState(0);

  const [level, setLevel] = useState([]);

  const [address, setAddress] = useState([]);

  const [city, setCity] = useState([]);

  const [area, setArea] = useState([]);

  const [industry, setIndustry] = useState([]);

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
      fetch('./api/common-data/hangye/')
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            window.alert(res.message);
          } else {
            localStorage.setItem(
              'industry',
              JSON.stringify({
                date: parseInt(moment().add(7, 'days').format('YYYYMMDD'), 10),
                data: res.content,
              }),
            );
            setIndustry(() => res.content);
          }
        });
    }
    fetch('/lib/address.json')
      .then((res) => res.json())
      .then((res) => {
        setAddress(res);
        setLevel(
          Object.getOwnPropertyNames(res)
            .filter((item) => item.slice(2, 7) === '0000')
            .map((code) => ({
              code,
              name: res[code],
            })),
        );
      });
  }, []);

  useEffect(() => {
    if (level.length > 0) {
      const a1 = level.find((item) => item.name === data.address1);
      if (a1) {
        setCity(
          Object.getOwnPropertyNames(address)
            .filter(
              (it) =>
                a1.code.slice(0, 2) === it.slice(0, 2) && it.slice(4, 7) === '00' && it !== a1.code,
            )
            .map((code) => ({
              code,
              name: address[code],
            })),
        );
      }
    }
  }, [data, level, address]);

  useEffect(() => {
    if (city.length > 0) {
      const a2 = city.find((item) => item.name === data.address2);
      if (a2) {
        setArea(
          Object.getOwnPropertyNames(address)
            .filter((it) => a2.code.slice(0, 4) === it.slice(0, 4) && it !== a2.code)
            .map((code) => ({
              code,
              name: address[code],
            })),
        );
      }
    }
  }, [data, city, address]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // fetch(`./api/email/check/`, {
    //   method: 'PUT',
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify({
    //     email: data.email,
    //     user_id: auth.id,
    //     code: data.code ? data.code : '',
    //     user_category: '企业用户'
    //   })
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     if (res.message) {
    //       window.alert(res.message)
    //     } else {
    //       if (res.content) {
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
    //     } else {
    //       window.alert('验证码错误!')
    //     }
    //   }
    // })
  };

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    if (e.target.files[0].size >= 300000) {
      window.alert('超出图片大小上限!(300KB)');
      return;
    }
    watermark([e.target.files[0]])
      .dataUrl(
        watermark.text.center('仅用于公示,其他用途无效', '100px Josefin Slab', '#FE0000', 0.5),
      )
      .then((url) => {
        setData({
          ...data,
          yingyezhizhao_tu: url,
        });
      });
  };

  const handleUpload = () => {
    document.getElementById('file').click();
  };

  const handleProvince = (e) => {
    const { value } = e.target;
    if (value !== '') {
      const a1 = level.find((item) => item.name === value);
      if (a1) {
        setCity(
          Object.getOwnPropertyNames(address)
            .filter(
              (it) =>
                a1.code.slice(0, 2) === it.slice(0, 2) && it.slice(4, 7) === '00' && it !== a1.code,
            )
            .map((code) => ({
              code,
              name: address[code],
            })),
        );
      }
      setData({
        ...data,
        address1: value,
        address2: '',
        address3: '',
      });
      setArea([]);
    } else {
      setData({
        ...data,
        address1: value,
        address2: value,
        address3: value,
      });
      setCity([]);
      setArea([]);
    }
  };

  const handleCity = (e) => {
    const { value } = e.target;
    if (value !== '') {
      setData({
        ...data,
        address2: value,
        address3: '',
      });
      const a2 = city.find((item) => item.name === value);
      if (a2) {
        setArea(
          Object.getOwnPropertyNames(address)
            .filter((it) => a2.code.slice(0, 4) === it.slice(0, 4) && it !== a2.code)
            .map((code) => ({
              code,
              name: address[code],
            })),
        );
      }
    } else {
      setData({
        ...data,
        address2: value,
        address3: value,
      });
      setArea([]);
    }
  };

  // const checkEmail = () => {
  //   const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  //   return reg.test(data.email)
  // }

  // const handleCode = () => {
  //   fetch(`./api/ent-user/checkEmail`, {
  //     method: 'PUT',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify({
  //       email: data.email,
  //       id: data.id
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.message) {
  //         window.alert(res.message)
  //       } else {
  //         fetch(`./api/email/`, {
  //           method: 'PUT',
  //           headers: { 'content-type': 'application/json' },
  //           body: JSON.stringify({
  //             email: data.email,
  //             user_id: auth.id,
  //             user_category: '企业用户'
  //           })
  //         })
  //           .then(res => res.json())
  //           .then(res => {
  //             if (res.message) {
  //               window.alert(res.message)
  //             } else {
  //               window.alert('验证码已发送到公司邮箱')
  //             }
  //           })
  //       }
  //     })
  // }

  return (
    <View category="企业信息">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">基本信息</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-3 col-md-4">
                <TextField
                  category="企业号"
                  name="yingyezhizhao"
                  value={data.yingyezhizhao}
                  handleChange={handleChange}
                  req={required.yingyezhizhao}
                  required
                />
              </div>
              <div className="col-3 col-md-4">
                <TextField
                  category="法人"
                  name="faren"
                  value={data.faren}
                  handleChange={handleChange}
                  req={required.faren}
                  required
                />
              </div>
              <div className="col-3 col-md-4">
                <div className="form-group">
                  <label>
                    <span className="text-danger">*</span>
                    注册日期
                  </label>
                  <input
                    type="date"
                    name="zhuceriqi"
                    value={data.zhuceriqi}
                    onChange={handleChange}
                    className={`form-control form-control-sm rounded-0 ${
                      required.zhuceriqi ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">{required.zhuceriqi}</div>
                </div>
              </div>
              <div className="col-3 col-md-4">
                <TextField
                  category="注资规模"
                  name="zhuziguimo"
                  value={data.zhuziguimo}
                  handleChange={handleChange}
                  req={required.zhuziguimo}
                  required
                />
              </div>
              <div className="col-3 col-md-4">
                <SelectField
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
                </SelectField>
              </div>
              <div className="col-3 col-md-4">
                <SelectField
                  category="所属行业"
                  name="industry"
                  value={data.industry}
                  handleChange={handleChange}
                  req={required.industry}
                  required
                >
                  <option> </option>
                  {industry
                    .filter((item) => item.master_id === 0)
                    .map((item) => (
                      <option key={item.id}>{item.name}</option>
                    ))}
                </SelectField>
              </div>

              <div className="col-3 col-md-4">
                <TextField
                  category="电话号码"
                  name="phone"
                  value={data.phone}
                  handleChange={handleChange}
                  req={required.phone}
                  required
                />
              </div>
              {/* <div className="col-3 col-md-4">
                <TextField
                  category="所属行业" />
              </div> */}
              {/* <div className="col-3 col-md-4">
                <TextField
                  category="所属行业" />
              </div> */}
              {/* <div className="col-3 col-md-4">
                <div className="form-group">
                  <label>验证码</label>
                  <div className="input-group mb-3">
                    <input type="text" value={data.code || ''} name="code"
                      onChange={handleChange}
                      className="form-control form-control-sm rounded-0" />
                    <div className="input-group-append">
                      <button className="btn btn-sm btn-primary rounded-0"
                        onClick={handleCode} disabled={!checkEmail()}>
                        发送验证码
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
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
                    onChange={handleChange}
                    rows="4"
                    className={`form-control form-control-sm rounded-0 ${
                      required.intro ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">{required.intro || ''}</div>
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col">
                <h3 className="pull-left">公司地址</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-3 col-md-4">
                <SelectField
                  category="省/直辖市"
                  name="address1"
                  value={data.address1}
                  handleChange={handleProvince}
                  req={required.address1 || ''}
                  required
                >
                  <option> </option>
                  {level.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </SelectField>
              </div>
              <div className="col-3 col-md-4">
                <SelectField
                  category="市"
                  name="address2"
                  value={data.address2}
                  handleChange={handleCity}
                  req={required.address2}
                  required
                >
                  <option> </option>
                  {city.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </SelectField>
              </div>
              <div className="col-3 col-md-4">
                <SelectField
                  category="区"
                  name="address3"
                  value={data.address3}
                  handleChange={handleChange}
                  req={required.address3}
                  required
                >
                  <option> </option>
                  {area.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </SelectField>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField
                  category="详细地址"
                  name="address4"
                  value={data.address4}
                  handleChange={handleChange}
                  req={required.address4}
                  required
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <h3 className="pull-left">
                  <span className="text-danger">*</span>
                  营业执照
                  <span className="text-danger">
                    {required.yingyezhizhao_tu ? `(${required.yingyezhizhao_tu})` : ''}
                  </span>
                </h3>
                <div className="pull-right">
                  <button className="btn btn-primary" type="button" onClick={handleUpload}>
                    <FontAwesomeIcon icon={faUpload} fixedWidth />
                    选择图片
                  </button>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file"
                    accept="image/png, image/jpeg"
                  />
                </div>
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
                <a className="pull-left btn btn-primary" href="#信息">
                  返回
                </a>
                <button className="pull-right btn btn-success" type="button" onClick={handleSave}>
                  保存并提交审核
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default Update;
