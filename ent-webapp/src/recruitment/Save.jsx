import React, { useState, useEffect } from 'react';
import {
  TextField1,
  TextField,
  SelectField,
  SelectField1,
  IndustryField,
} from '../components/InputField';
import RichEditor from '../components/RichEditor';
import { View1 } from './Components';
import { _EditJournal } from '../commonFetch';

const Save = () => {
  const [data, setData] = useState({
    name: '',
    category: '',
    industry: '',
    position: '',
    status: '',
    education: '',
    salary1: '',
    salary2: '',
    qty: '',
    address1: '',
    address2: '',
    address3: '',
    description: '',
    requirement: '',
  });

  const [required, setRequired] = useState({
    name: false,
    salary1: false,
    salary2: false,
    address1: false,
    address2: false,
    address3: false,
  });

  const [city, setCity] = useState([]);

  const [area, setArea] = useState([]);

  const [level, setLevel] = useState([]);

  const [address, setAddress] = useState([]);

  const [number, setNumber] = useState(0);

  const [number1, setNumber1] = useState(0);

  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    if (auth !== null) {
      setData((p) => ({
        ...p,
        enterprise_id: auth.enterprise_id,
        enterprise_uuid: auth.enterprise_uuid,
        user_id: auth.id,
      }));
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

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIntroChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    let value1 = value.replace(/<\/?.+?>/g, '');
    setNumber(value1.length);
    if (value1.length > 200) {
      document.getElementById('number').style.color = '#ff2121';
      document.getElementById('hide').style.display = 'block';
      document.getElementById('preservation').disabled = true;
    } else {
      document.getElementById('number').style.color = '#7a858c';
      document.getElementById('hide').style.display = 'none';
      document.getElementById('preservation').disabled = false;
    }
  };

  const handleIntroChange1 = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    let value1 = value.replace(/<\/?.+?>/g, '');
    setNumber1(value1.length);
    if (value1.length > 200) {
      document.getElementById('number1').style.color = '#ff2121';
      document.getElementById('hide1').style.display = 'block';
    } else {
      document.getElementById('number1').style.color = '#7a858c';
      document.getElementById('hide1').style.display = 'none';
    }
  };

  useEffect(() => {
    if (number > 200 || number1 > 200) {
      document.getElementById('preservation').disabled = true;
    } else {
      document.getElementById('preservation').disabled = false;
    }
  }, [number, number1]);

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

    fetch('./api/recruitment/', {
      method: 'POST',
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
              category2: '岗位',
              data_id: res.content.id,
              data_uuid: res.content.uuid,
              remark: `新增岗位<${data.name}>`,
            },
            () => {},
          );
          window.alert('操作成功');
          window.location = '#岗位/列表';
        }
      });
  };

  const handleProvince = (e) => {
    const { value } = e.target;
    window.console.info(value);
    if (value !== '') {
      setData({
        ...data,
        address1: value,
        address2: '',
        address3: '',
      });
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

  return (
    <View1 category="我的职位">
      <div className="row bg-white shadow">
        <div className="col card rounded-0">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="pull-left">新增岗位</h3>
                <span className="text-danger">(带有*符号的选项为必填项)</span>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <TextField1
                  category="职位名称"
                  name="name"
                  value={data.name}
                  req={required.name}
                  handleChange={handleChange}
                  required
                />
              </div>
              <IndustryField
                industry={data.industry}
                position={data.position}
                handleChange={handleChange}
              />
              <div className="col">
                <SelectField
                  category="职位类型"
                  name="category"
                  value={data.category}
                  handleChange={handleChange}
                >
                  <option> </option>
                  <option>全职</option>
                  <option>兼职</option>
                  <option>实习</option>
                </SelectField>
              </div>
              <div className="col">
                <SelectField
                  category="学历要求"
                  name="education"
                  value={data.education}
                  handleChange={handleChange}
                >
                  <option> </option>
                  <option>不限</option>
                  <option>高中及以上</option>
                  <option>大专及以上</option>
                  <option>本科及以上</option>
                  <option>硕士及以上</option>
                  <option>硕士</option>
                </SelectField>
              </div>
              <div className="col">
                <TextField
                  category="招聘人数"
                  name="qty"
                  value={data.qty}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <SelectField1
                  category="省"
                  name="address1"
                  value={data.address1}
                  req={required.address1}
                  handleChange={handleProvince}
                  required
                >
                  <option> </option>
                  {level.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </SelectField1>
              </div>
              <div className="col-2">
                <SelectField1
                  category="市"
                  name="address2"
                  value={data.address2}
                  req={required.address2}
                  handleChange={handleCity}
                  required
                >
                  <option> </option>
                  {city.map((item, inx) => (
                    <option key={item.id + inx.toString()}>{item.name}</option>
                  ))}
                </SelectField1>
              </div>
              <div className="col-2">
                <SelectField1
                  category="区/县"
                  name="address3"
                  value={data.address3}
                  req={required.address3}
                  handleChange={handleChange}
                  required
                >
                  <option> </option>
                  {area.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </SelectField1>
              </div>
              <div className="col-4">
                <label>
                  <span className="text-danger">*</span>
                  薪资要求
                  <span className="text-danger">(单位：/月)</span>
                </label>
                <div className="row pl-3 pr-3">
                  <input
                    type="text"
                    name="salary1"
                    value={data.salary1}
                    onChange={handleChange}
                    className={`col form-control form-control-sm rounded-0 ${
                      required.salary1 ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback col-3">{required.salary1}</div>
                  -
                  <input
                    type="text"
                    name="salary2"
                    value={data.salary2}
                    onChange={handleChange}
                    className={`col form-control form-control-sm rounded-0 ${
                      required.salary2 ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback col-3">{required.salary2}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>职位要求</label>
                  <RichEditor
                    value={data.requirement}
                    name="requirement"
                    handleChange={handleIntroChange}
                  />
                  <span id="number" className="pull-right" style={{ color: '#7a858c' }}>
                    {number}/200
                  </span>
                  <span
                    id="hide"
                    className="pull-left"
                    style={{ color: '#ff2121', display: 'none' }}
                  >
                    请输入1-200个字符
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>工作内容</label>
                  <RichEditor
                    value={data.description}
                    name="description"
                    handleChange={handleIntroChange1}
                  />
                  <span id="number1" className="pull-right" style={{ color: '#7a858c' }}>
                    {number1}/200
                  </span>
                  <span
                    id="hide1"
                    className="pull-left"
                    style={{ color: '#ff2121', display: 'none' }}
                  >
                    请输入1-200个字符
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <a className="btn btn-primary" href="#岗位/列表">
                  返回
                </a>
              </div>
              <div className="col">
                <button
                  id="preservation"
                  className="pull-right btn btn-success"
                  onClick={handleSave}
                  type="button"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View1>
  );
};

export default Save;
